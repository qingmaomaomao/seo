import React from 'react';
import { Table, Tag, Button, Space, Progress } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { Batch } from '../types';
import type { ColumnsType } from 'antd/es/table';

interface BatchListProps {
  batches: Batch[];
  loading: boolean;
  onSelect: (batch: Batch) => void;
  onRefresh: () => void;
}

const BatchList: React.FC<BatchListProps> = ({ batches, loading, onSelect, onRefresh }) => {
  const getStatusTag = (status: string) => {
    const statusMap: Record<string, { color: string; text: string }> = {
      uploaded: { color: 'default', text: '已上传' },
      classifying: { color: 'processing', text: '分类中' },
      classified: { color: 'success', text: '已分类' },
      error: { color: 'error', text: '错误' },
    };

    const statusInfo = statusMap[status] || { color: 'default', text: status };
    return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
  };

  const getTypeTag = (type: string) => {
    return type === 'main' ? (
      <Tag color="blue">主站关键词</Tag>
    ) : (
      <Tag color="purple">Blog</Tag>
    );
  };

  const columns: ColumnsType<Batch> = [
    {
      title: '批次名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '类型',
      dataIndex: 'upload_type',
      key: 'upload_type',
      width: 150,
      render: (type: string) => getTypeTag(type),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => getStatusTag(status),
    },
    {
      title: '总关键词',
      dataIndex: 'total_keywords',
      key: 'total_keywords',
      width: 120,
      align: 'center',
    },
    {
      title: '已分类',
      dataIndex: 'classified_keywords',
      key: 'classified_keywords',
      width: 120,
      align: 'center',
      render: (count: number) => count || 0,
    },
    {
      title: '已生成',
      dataIndex: 'generated_keywords',
      key: 'generated_keywords',
      width: 120,
      align: 'center',
      render: (count: number) => count || 0,
    },
    {
      title: '进度',
      key: 'progress',
      width: 200,
      render: (_, record) => {
        const classified = record.classified_keywords || 0;
        const total = record.total_keywords || 1;
        const percent = Math.round((classified / total) * 100);
        return <Progress percent={percent} size="small" />;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 180,
      render: (time: string) => new Date(time).toLocaleString('zh-CN'),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Button type="link" onClick={() => onSelect(record)}>
          查看详情
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button icon={<ReloadOutlined />} onClick={onRefresh} loading={loading}>
          刷新
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={batches}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 个批次`,
        }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
};

export default BatchList;
