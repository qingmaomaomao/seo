import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Progress } from 'antd';
import {
  FileTextOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { getStatistics } from '../services/api';
import { Statistics as StatisticsType } from '../types';

interface StatisticsProps {
  batchId: number;
}

const Statistics: React.FC<StatisticsProps> = ({ batchId }) => {
  const [stats, setStats] = useState<StatisticsType | null>(null);
  const [loading, setLoading] = useState(false);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await getStatistics(batchId);
      setStats(data);
    } catch (error) {
      console.error('Failed to load statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 5000); // 每5秒刷新一次
    return () => clearInterval(interval);
  }, [batchId]);

  if (!stats) return null;

  const generatedPercent =
    stats.total > 0 ? Math.round((stats.generated_count / stats.total) * 100) : 0;

  return (
    <div style={{ marginBottom: 24 }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总关键词"
              value={stats.total}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="已生成"
              value={stats.generated_count}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <Progress
              percent={generatedPercent}
              size="small"
              style={{ marginTop: 8 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="处理中"
              value={stats.processing_count}
              prefix={<LoadingOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="失败"
              value={stats.failed_count}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="Create 页面"
              value={stats.create_count}
              valueStyle={{ fontSize: 18 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="Tool 页面"
              value={stats.tool_count}
              valueStyle={{ fontSize: 18 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="Templates 页面"
              value={stats.templates_count}
              valueStyle={{ fontSize: 18 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="Blog 页面"
              value={stats.blog_count}
              valueStyle={{ fontSize: 18 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Statistics;
