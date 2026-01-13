import axios from 'axios';
import { Batch, KeywordsResponse, Statistics } from '../types';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000, // 5分钟超时
});

// 上传关键词文件
export const uploadKeywords = async (
  file: File,
  uploadType: 'main' | 'blog',
  batchName?: string
): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('uploadType', uploadType);
  if (batchName) {
    formData.append('batchName', batchName);
  }

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// 获取批次列表
export const getBatches = async (): Promise<Batch[]> => {
  const response = await api.get('/batches');
  return response.data;
};

// 获取关键词列表
export const getKeywords = async (params: {
  batch_id?: number;
  category?: string;
  status?: string;
  workflow_status?: string;
  page?: number;
  page_size?: number;
}): Promise<KeywordsResponse> => {
  const response = await api.get('/keywords', { params });
  return response.data;
};

// 一键挖掘（分类）
export const classifyKeywords = async (batchId: number): Promise<any> => {
  const response = await api.post('/classify', { batch_id: batchId });
  return response.data;
};

// 生成页面数据
export const generatePages = async (params: {
  mode: 'all' | 'batch' | 'single' | 'by_category';
  batch_id?: number;
  keyword_ids?: number[];
  category?: string;
  page?: number;
  page_size?: number;
}): Promise<any> => {
  const response = await api.post('/generate', params);
  return response.data;
};

// 获取统计信息
export const getStatistics = async (batchId: number): Promise<Statistics> => {
  const response = await api.get('/statistics', { params: { batch_id: batchId } });
  return response.data;
};

export default api;
