import React, { useState, useEffect } from 'react';
import { Layout, Tabs, message } from 'antd';
import UploadPanel from './components/UploadPanel';
import KeywordTable from './components/KeywordTable';
import BatchList from './components/BatchList';
import Statistics from './components/Statistics';
import { Batch } from './types';
import { getBatches } from './services/api';
import './App.css';

const { Header, Content } = Layout;
const { TabPane } = Tabs;

const App: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [loading, setLoading] = useState(false);

  const loadBatches = async () => {
    setLoading(true);
    try {
      const data = await getBatches();
      setBatches(data);
      if (data.length > 0 && !selectedBatch) {
        setSelectedBatch(data[0]);
      }
    } catch (error: any) {
      message.error('加载批次列表失败: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBatches();
  }, []);

  const handleUploadSuccess = () => {
    loadBatches();
    message.success('上传成功！');
  };

  const handleBatchSelect = (batch: Batch) => {
    setSelectedBatch(batch);
  };

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <div className="header-content">
          <h1>SEO 页面生成工具</h1>
        </div>
      </Header>
      <Content className="app-content">
        <div className="content-container">
          <Tabs defaultActiveKey="upload" type="card">
            <TabPane tab="上传关键词" key="upload">
              <UploadPanel onSuccess={handleUploadSuccess} />
            </TabPane>

            <TabPane tab="批次管理" key="batches">
              <BatchList
                batches={batches}
                loading={loading}
                onSelect={handleBatchSelect}
                onRefresh={loadBatches}
              />
            </TabPane>

            <TabPane tab="关键词管理" key="keywords" disabled={!selectedBatch}>
              {selectedBatch && (
                <>
                  <Statistics batchId={selectedBatch.id} />
                  <KeywordTable
                    batch={selectedBatch}
                    onUpdate={loadBatches}
                  />
                </>
              )}
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

export default App;
