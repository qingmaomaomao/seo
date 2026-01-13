import React, { useState } from 'react';
import { Upload, Button, Radio, Input, message, Card, Space, Typography } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { uploadKeywords } from '../services/api';
import type { UploadFile } from 'antd/es/upload/interface';

const { Dragger } = Upload;
const { Text } = Typography;

interface UploadPanelProps {
  onSuccess: () => void;
}

const UploadPanel: React.FC<UploadPanelProps> = ({ onSuccess }) => {
  const [uploadType, setUploadType] = useState<'main' | 'blog'>('main');
  const [batchName, setBatchName] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.warning('请选择要上传的文件');
      return;
    }

    const file = fileList[0].originFileObj as File;
    setUploading(true);

    try {
      await uploadKeywords(file, uploadType, batchName);
      message.success('上传成功！');
      setFileList([]);
      setBatchName('');
      onSuccess();
    } catch (error: any) {
      message.error('上传失败: ' + (error.response?.data?.error || error.message));
    } finally {
      setUploading(false);
    }
  };

  const uploadProps = {
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: (file: File) => {
      const isValidType =
        file.name.endsWith('.csv') ||
        file.name.endsWith('.xlsx') ||
        file.name.endsWith('.xls');

      if (!isValidType) {
        message.error('只支持 CSV 和 Excel 文件格式！');
        return false;
      }

      const isLt50M = file.size / 1024 / 1024 < 50;
      if (!isLt50M) {
        message.error('文件大小不能超过 50MB！');
        return false;
      }

      setFileList([
        {
          uid: file.name,
          name: file.name,
          status: 'done',
          originFileObj: file,
        } as UploadFile,
      ]);
      return false;
    },
    fileList,
  };

  return (
    <Card title="上传关键词数据" style={{ maxWidth: 800, margin: '0 auto' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Text strong>上传类型：</Text>
          <Radio.Group
            value={uploadType}
            onChange={(e) => setUploadType(e.target.value)}
            style={{ marginLeft: 16 }}
          >
            <Radio value="main">主站关键词（需要挖掘分类）</Radio>
            <Radio value="blog">Blog 类型（直接分类为 Blog）</Radio>
          </Radio.Group>
        </div>

        <div>
          <Text strong>批次名称（可选）：</Text>
          <Input
            placeholder="为这批关键词命名，不填则使用文件名"
            value={batchName}
            onChange={(e) => setBatchName(e.target.value)}
            style={{ marginTop: 8 }}
          />
        </div>

        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
          <p className="ant-upload-hint">
            支持 CSV 和 Excel 格式，文件大小不超过 50MB
            <br />
            文件需包含以下列：keyword（关键词）、search_volume（搜索量）、kd（难度）、url（链接）
          </p>
        </Dragger>

        <Button
          type="primary"
          onClick={handleUpload}
          loading={uploading}
          disabled={fileList.length === 0}
          size="large"
          block
          icon={<UploadOutlined />}
        >
          {uploading ? '上传中...' : '开始上传'}
        </Button>
      </Space>
    </Card>
  );
};

export default UploadPanel;
