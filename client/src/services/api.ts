import axios from 'axios';
import { Batch, KeywordsResponse, Statistics } from '../types';
import { mockApi } from './mockData';

// 配置：是否使用 Mock 数据
const USE_MOCK = true; // 改为 false 可切换到真实 API

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000, // 5分钟超时
});

// 上传关键词文件
export const uploadKeywords = async (
  file: File,
  uploadType: 'main' | 'blog' | 'other',
  batchName?: string
): Promise<any> => {
  if (USE_MOCK) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('uploadType', uploadType);
    if (batchName) {
      formData.append('batchName', batchName);
    }
    return await mockApi.uploadKeywords(formData);
  }

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
  if (USE_MOCK) {
    return await mockApi.getBatches();
  }
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
  if (USE_MOCK) {
    return await mockApi.getKeywords(params as any);
  }
  const response = await api.get('/keywords', { params });
  return response.data;
};

// 一键挖掘（分类）
export const classifyKeywords = async (batchId: number): Promise<any> => {
  if (USE_MOCK) {
    return await mockApi.classifyKeywords(batchId);
  }
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
  if (USE_MOCK) {
    return await mockApi.generatePages(params as any);
  }
  const response = await api.post('/generate', params);
  return response.data;
};

// 获取统计信息
export const getStatistics = async (): Promise<Statistics> => {
  if (USE_MOCK) {
    return await mockApi.getStatistics();
  }
  const response = await api.get('/statistics');
  return response.data;
};

export default api;
