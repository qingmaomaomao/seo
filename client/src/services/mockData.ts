import { Batch, Keyword, Statistics } from '../types';

// Mock 批次数据
let mockBatches: Batch[] = [
  {
    id: 1,
    name: '主站关键词批次 2024-01',
    upload_type: 'main',
    file_name: 'main_keywords_2024_01.xlsx',
    total_keywords: 1500,
    classified_keywords: 1200,
    generated_keywords: 800,
    status: 'classified',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T15:45:00Z',
  },
  {
    id: 2,
    name: 'Blog 关键词批次 2024-01',
    upload_type: 'blog',
    file_name: 'blog_keywords_2024_01.csv',
    total_keywords: 800,
    classified_keywords: 800,
    generated_keywords: 600,
    status: 'classified',
    created_at: '2024-01-10T09:20:00Z',
    updated_at: '2024-01-12T14:30:00Z',
  },
  {
    id: 3,
    name: '主站关键词批次 2024-02',
    upload_type: 'main',
    file_name: 'main_keywords_2024_02.xlsx',
    total_keywords: 2000,
    classified_keywords: 500,
    generated_keywords: 100,
    status: 'classifying',
    created_at: '2024-01-20T11:00:00Z',
    updated_at: '2024-01-20T11:30:00Z',
  },
];

// Mock 关键词数据生成器
const generateMockKeywords = (batchId: number, count: number): Keyword[] => {
  const categories = ['create', 'tool', 'templates', 'blog'];
  const statuses = ['not_started', 'processing', 'completed', 'failed'];
  const keywords = [
    'design poster online',
    'create infographic free',
    'make logo generator',
    'edit photo tool',
    'video editor online',
    'presentation maker',
    'resume builder',
    'invoice template',
    'business card designer',
    'flyer maker',
    'social media post creator',
    'email signature generator',
    'QR code maker',
    'chart creator',
    'mind map tool',
    'flowchart maker',
    'diagram tool',
    'wireframe designer',
    'mockup generator',
    'icon creator',
  ];

  const result: Keyword[] = [];
  for (let i = 0; i < count; i++) {
    const baseKeyword = keywords[i % keywords.length];
    const keyword = `${baseKeyword} ${i + 1}`;
    const hasCategory = Math.random() > 0.2; // 80% 已分类
    const category = hasCategory ? categories[Math.floor(Math.random() * categories.length)] : undefined;

    let workflowStatus = 'not_started';
    if (category) {
      const rand = Math.random();
      if (rand > 0.6) workflowStatus = 'completed';
      else if (rand > 0.4) workflowStatus = 'processing';
      else if (rand > 0.35) workflowStatus = 'failed';
    }

    result.push({
      id: i + 1,
      batch_id: batchId,
      keyword,
      search_volume: Math.floor(Math.random() * 50000) + 1000,
      kd: Math.random() * 100,
      url: category === 'blog' ? `https://example.com/blog/${keyword.replace(/\s+/g, '-')}` : '',
      category: category as any,
      workflow_status: workflowStatus as any,
      workflow_data: workflowStatus === 'completed' ? { generated: true } : null,
      status: hasCategory ? 'classified' : 'pending',
      created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  return result;
};

// 存储所有关键词
const mockKeywordsDB: Record<number, Keyword[]> = {
  1: generateMockKeywords(1, 1500),
  2: generateMockKeywords(2, 800),
  3: generateMockKeywords(3, 2000),
};

let nextBatchId = 4;
let nextKeywordId = 10000;

/**
 * Mock API 延迟模拟
 */
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock API 服务
 */
export const mockApi = {
  /**
   * 获取批次列表
   */
  async getBatches(): Promise<Batch[]> {
    await delay(300);
    return [...mockBatches].sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  /**
   * 获取关键词列表
   */
  async getKeywords(params: {
    batch_id: number;
    category?: string;
    workflow_status?: string;
    page?: number;
    page_size?: number;
  }) {
    await delay(400);

    let keywords = mockKeywordsDB[params.batch_id] || [];

    // 筛选
    if (params.category) {
      keywords = keywords.filter(k => k.category === params.category);
    }
    if (params.workflow_status) {
      keywords = keywords.filter(k => k.workflow_status === params.workflow_status);
    }

    // 分页
    const page = params.page || 1;
    const pageSize = params.page_size || 50;
    const total = keywords.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const data = keywords.slice(start, end);

    return {
      data,
      pagination: {
        page,
        page_size: pageSize,
        total,
        total_pages: Math.ceil(total / pageSize),
      },
    };
  },

  /**
   * 上传关键词文件
   */
  async uploadKeywords(formData: FormData): Promise<{
    success: boolean;
    batch_id: number;
    total_keywords: number;
    message: string;
  }> {
    await delay(1000);

    const file = formData.get('file') as File;
    const uploadType = formData.get('uploadType') as string;
    const batchName = formData.get('batchName') as string;

    const totalKeywords = Math.floor(Math.random() * 1000) + 500;

    const newBatch: Batch = {
      id: nextBatchId++,
      name: batchName || file.name,
      upload_type: uploadType as 'main' | 'blog',
      file_name: file.name,
      total_keywords: totalKeywords,
      classified_keywords: 0,
      generated_keywords: 0,
      status: 'uploaded',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    mockBatches.push(newBatch);
    mockKeywordsDB[newBatch.id] = generateMockKeywords(newBatch.id, totalKeywords);

    return {
      success: true,
      batch_id: newBatch.id,
      total_keywords: totalKeywords,
      message: 'Keywords uploaded successfully',
    };
  },

  /**
   * 一键挖掘分类
   */
  async classifyKeywords(batchId: number): Promise<{ success: boolean; message: string }> {
    await delay(800);

    // 模拟分类处理
    const batch = mockBatches.find(b => b.id === batchId);
    if (!batch) {
      throw new Error('Batch not found');
    }

    batch.status = 'classifying';
    batch.updated_at = new Date().toISOString();

    // 模拟异步分类
    setTimeout(() => {
      const keywords = mockKeywordsDB[batchId];
      if (keywords) {
        const categories = ['create', 'tool', 'templates', 'blog'];
        let classified = 0;

        keywords.forEach(kw => {
          if (!kw.category) {
            kw.category = categories[Math.floor(Math.random() * categories.length)] as any;
            kw.status = 'classified';
            kw.updated_at = new Date().toISOString();
            classified++;
          }
        });

        batch.status = 'classified';
        batch.classified_keywords = keywords.filter(k => k.category).length;
        batch.updated_at = new Date().toISOString();
      }
    }, 3000);

    return {
      success: true,
      message: 'Classification task started',
    };
  },

  /**
   * 生成页面数据
   */
  async generatePages(params: {
    mode: 'all' | 'batch' | 'single' | 'by_category';
    batch_id: number;
    category?: string;
    keyword_ids?: number[];
    page?: number;
    page_size?: number;
  }): Promise<{ success: boolean; message: string; count: number }> {
    await delay(1000);

    const keywords = mockKeywordsDB[params.batch_id];
    if (!keywords) {
      throw new Error('Keywords not found');
    }

    let targetKeywords: Keyword[] = [];

    switch (params.mode) {
      case 'all':
        targetKeywords = keywords.filter(k => k.category && k.workflow_status === 'not_started');
        break;
      case 'batch':
        const page = params.page || 1;
        const pageSize = params.page_size || 50;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        targetKeywords = keywords.slice(start, end).filter(k => k.category && k.workflow_status === 'not_started');
        break;
      case 'single':
        targetKeywords = keywords.filter(k => params.keyword_ids?.includes(k.id));
        break;
      case 'by_category':
        targetKeywords = keywords.filter(k => k.category === params.category && k.workflow_status === 'not_started');
        break;
    }

    // 模拟异步生成
    setTimeout(() => {
      targetKeywords.forEach(kw => {
        kw.workflow_status = Math.random() > 0.1 ? 'completed' : 'failed';
        kw.workflow_data = kw.workflow_status === 'completed' ? { generated: true, timestamp: new Date().toISOString() } : null;
        kw.updated_at = new Date().toISOString();
      });

      // 更新批次统计
      const batch = mockBatches.find(b => b.id === params.batch_id);
      if (batch) {
        batch.generated_keywords = keywords.filter(k => k.workflow_status === 'completed').length;
        batch.updated_at = new Date().toISOString();
      }
    }, 2000);

    return {
      success: true,
      message: 'Generation task started',
      count: targetKeywords.length,
    };
  },

  /**
   * 获取统计数据
   */
  async getStatistics(): Promise<Statistics> {
    await delay(200);

    const allKeywords = Object.values(mockKeywordsDB).flat();
    const totalKeywords = allKeywords.length;
    const generatedKeywords = allKeywords.filter(k => k.workflow_status === 'completed').length;
    const processingKeywords = allKeywords.filter(k => k.workflow_status === 'processing').length;
    const failedKeywords = allKeywords.filter(k => k.workflow_status === 'failed').length;

    const categoryCounts = {
      create: allKeywords.filter(k => k.category === 'create').length,
      tool: allKeywords.filter(k => k.category === 'tool').length,
      templates: allKeywords.filter(k => k.category === 'templates').length,
      blog: allKeywords.filter(k => k.category === 'blog').length,
    };

    return {
      total_keywords: totalKeywords,
      generated_keywords: generatedKeywords,
      processing_keywords: processingKeywords,
      failed_keywords: failedKeywords,
      category_counts: categoryCounts,
    };
  },
};
