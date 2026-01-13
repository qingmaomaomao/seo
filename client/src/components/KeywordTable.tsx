import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Tag,
  Space,
  Select,
  Input,
  message,
  Modal,
  Dropdown,
  Menu,
} from 'antd';
import {
  ReloadOutlined,
  ThunderboltOutlined,
  RocketOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Batch, Keyword, KeywordsResponse } from '../types';
import { getKeywords, classifyKeywords, generatePages } from '../services/api';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';

const { Search } = Input;
const { Option } = Select;

interface KeywordTableProps {
  batch: Batch;
  onUpdate: () => void;
}

const KeywordTable: React.FC<KeywordTableProps> = ({ batch, onUpdate }) => {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 50,
    total: 0,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filters, setFilters] = useState({
    category: undefined as string | undefined,
    workflow_status: undefined as string | undefined,
  });
  const [classifying, setClassifying] = useState(false);
  const [generating, setGenerating] = useState(false);

  const loadKeywords = async (page = pagination.current, pageSize = pagination.pageSize) => {
    setLoading(true);
    try {
      const response: KeywordsResponse = await getKeywords({
        batch_id: batch.id,
        ...filters,
        page,
        page_size: pageSize,
      });

      setKeywords(response.data);
      setPagination({
        current: response.pagination.page,
        pageSize: response.pagination.page_size,
        total: response.pagination.total,
      });
    } catch (error: any) {
      message.error('加载关键词失败: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKeywords();
  }, [batch.id, filters]);

  const handleClassify = async () => {
    Modal.confirm({
      title: '确认挖掘分类',
      content: '将对该批次所有未分类的关键词进行分类，此过程可能需要较长时间。',
      onOk: async () => {
        setClassifying(true);
        try {
          await classifyKeywords(batch.id);
          message.success('分类任务已启动，请稍后刷新查看结果');
          setTimeout(() => {
            loadKeywords();
            onUpdate();
          }, 2000);
        } catch (error: any) {
          message.error('启动分类失败: ' + error.message);
        } finally {
          setClassifying(false);
        }
      },
    });
  };

  const handleGenerate = async (mode: 'all' | 'batch' | 'single' | 'by_category', category?: string) => {
    const params: any = {
      mode,
      batch_id: batch.id,
    };

    if (mode === 'batch') {
      params.page = pagination.current;
      params.page_size = pagination.pageSize;
    } else if (mode === 'single') {
      if (selectedRowKeys.length === 0) {
        message.warning('请先选择要生成的关键词');
        return;
      }
      params.keyword_ids = selectedRowKeys;
    } else if (mode === 'by_category') {
      params.category = category;
    }

    const modeText = {
      all: '全部',
      batch: '当前页',
      single: '选中项',
      by_category: category,
    };

    Modal.confirm({
      title: '确认生成',
      content: `将为 ${modeText[mode]} 的关键词生成页面数据，此过程可能需要较长时间。`,
      onOk: async () => {
        setGenerating(true);
        try {
          await generatePages(params);
          message.success('生成任务已启动，请稍后刷新查看结果');
          setSelectedRowKeys([]);
          setTimeout(() => {
            loadKeywords();
            onUpdate();
          }, 2000);
        } catch (error: any) {
          message.error('启动生成失败: ' + error.message);
        } finally {
          setGenerating(false);
        }
      },
    });
  };

  const getCategoryTag = (category: string | undefined) => {
    if (!category) return <Tag>未分类</Tag>;

    const categoryMap: Record<string, { color: string; text: string }> = {
      create: { color: 'blue', text: 'Create' },
      tool: { color: 'green', text: 'Tool' },
      templates: { color: 'orange', text: 'Templates' },
      blog: { color: 'purple', text: 'Blog' },
    };

    const info = categoryMap[category] || { color: 'default', text: category };
    return <Tag color={info.color}>{info.text}</Tag>;
  };

  const getWorkflowStatusTag = (status: string) => {
    const statusMap: Record<string, { color: string; text: string }> = {
      not_started: { color: 'default', text: '未开始' },
      processing: { color: 'processing', text: '处理中' },
      completed: { color: 'success', text: '已完成' },
      failed: { color: 'error', text: '失败' },
    };

    const info = statusMap[status] || { color: 'default', text: status };
    return <Tag color={info.color}>{info.text}</Tag>;
  };

  const columns: ColumnsType<Keyword> = [
    {
      title: '关键词',
      dataIndex: 'keyword',
      key: 'keyword',
      width: 250,
      fixed: 'left',
    },
    {
      title: '搜索量',
      dataIndex: 'search_volume',
      key: 'search_volume',
      width: 100,
      align: 'right',
      render: (val: number) => val?.toLocaleString() || '-',
    },
    {
      title: 'KD',
      dataIndex: 'kd',
      key: 'kd',
      width: 80,
      align: 'center',
      render: (val: number) => (val !== null && val !== undefined ? val.toFixed(1) : '-'),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (category: string) => getCategoryTag(category),
    },
    {
      title: '生成状态',
      dataIndex: 'workflow_status',
      key: 'workflow_status',
      width: 120,
      render: (status: string) => getWorkflowStatusTag(status),
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      width: 200,
      ellipsis: true,
      render: (url: string) => (url ? <a href={url} target="_blank" rel="noopener noreferrer">{url}</a> : '-'),
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 160,
      render: (time: string) => new Date(time).toLocaleString('zh-CN'),
    },
  ];

  const rowSelection: TableRowSelection<Keyword> = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  const generateMenu = (
    <Menu>
      <Menu.Item key="all" onClick={() => handleGenerate('all')}>
        一键全部生成
      </Menu.Item>
      <Menu.Item key="batch" onClick={() => handleGenerate('batch')}>
        当前页批量生成
      </Menu.Item>
      <Menu.Item key="single" onClick={() => handleGenerate('single')}>
        生成选中项 ({selectedRowKeys.length})
      </Menu.Item>
      <Menu.SubMenu key="category" title="按类型生成">
        <Menu.Item key="create" onClick={() => handleGenerate('by_category', 'create')}>
          Create 页面
        </Menu.Item>
        <Menu.Item key="tool" onClick={() => handleGenerate('by_category', 'tool')}>
          Tool 页面
        </Menu.Item>
        <Menu.Item key="templates" onClick={() => handleGenerate('by_category', 'templates')}>
          Templates 页面
        </Menu.Item>
        <Menu.Item key="blog" onClick={() => handleGenerate('by_category', 'blog')}>
          Blog 页面
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Space style={{ marginBottom: 16 }}>
          <Select
            placeholder="筛选类型"
            style={{ width: 150 }}
            allowClear
            value={filters.category}
            onChange={(value) => setFilters({ ...filters, category: value })}
          >
            <Option value="create">Create</Option>
            <Option value="tool">Tool</Option>
            <Option value="templates">Templates</Option>
            <Option value="blog">Blog</Option>
          </Select>

          <Select
            placeholder="生成状态"
            style={{ width: 150 }}
            allowClear
            value={filters.workflow_status}
            onChange={(value) => setFilters({ ...filters, workflow_status: value })}
          >
            <Option value="not_started">未开始</Option>
            <Option value="processing">处理中</Option>
            <Option value="completed">已完成</Option>
            <Option value="failed">失败</Option>
          </Select>

          <Button icon={<ReloadOutlined />} onClick={() => loadKeywords()}>
            刷新
          </Button>
        </Space>

        <Space style={{ float: 'right' }}>
          <Button
            type="primary"
            icon={<ThunderboltOutlined />}
            onClick={handleClassify}
            loading={classifying}
            disabled={batch.status === 'classifying'}
          >
            一键挖掘分类
          </Button>

          <Dropdown overlay={generateMenu} disabled={generating}>
            <Button type="primary" icon={<RocketOutlined />} loading={generating}>
              生成页面数据 <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={keywords}
        loading={loading}
        rowKey="id"
        rowSelection={rowSelection}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 个关键词`,
          onChange: (page, pageSize) => loadKeywords(page, pageSize),
        }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
};

export default KeywordTable;
