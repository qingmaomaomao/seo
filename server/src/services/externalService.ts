import axios from 'axios';

const CLASSIFICATION_SERVICE_URL = process.env.CLASSIFICATION_SERVICE_URL || 'http://localhost:8000/api/classify';
const WORKFLOW_SERVICE_URL = process.env.WORKFLOW_SERVICE_URL || 'http://localhost:8000/api/workflow';

export interface KeywordData {
  id: number;
  keyword: string;
  search_volume?: number;
  kd?: number;
  url?: string;
}

export interface ClassificationResult {
  keyword_id: number;
  category: 'create' | 'tool' | 'templates' | 'blog';
  confidence?: number;
}

export interface WorkflowResult {
  keyword_id: number;
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * 调用外部分类服务
 */
export const classifyKeywords = async (
  keywords: KeywordData[],
  uploadType: string
): Promise<ClassificationResult[]> => {
  try {
    // 如果是blog类型，直接返回blog分类
    if (uploadType === 'blog') {
      return keywords.map(kw => ({
        keyword_id: kw.id,
        category: 'blog' as const,
        confidence: 1.0
      }));
    }

    // 调用外部分类服务
    const response = await axios.post(CLASSIFICATION_SERVICE_URL, {
      keywords,
      upload_type: uploadType
    }, {
      timeout: 300000, // 5分钟超时
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data.results || [];
  } catch (error: any) {
    console.error('Classification service error:', error.message);

    // 如果外部服务失败，返回默认分类
    // 实际应用中可以根据需要调整策略
    return keywords.map(kw => ({
      keyword_id: kw.id,
      category: 'create' as const,
      confidence: 0.5
    }));
  }
};

/**
 * 调用工作流服务生成页面数据
 */
export const generatePageData = async (
  keywordId: number,
  keyword: string,
  category: string,
  metadata?: any
): Promise<WorkflowResult> => {
  try {
    const response = await axios.post(WORKFLOW_SERVICE_URL, {
      keyword_id: keywordId,
      keyword,
      category,
      metadata
    }, {
      timeout: 300000, // 5分钟超时
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return {
      keyword_id: keywordId,
      success: true,
      data: response.data
    };
  } catch (error: any) {
    console.error(`Workflow service error for keyword ${keyword}:`, error.message);

    return {
      keyword_id: keywordId,
      success: false,
      error: error.message
    };
  }
};

/**
 * 批量调用工作流服务
 */
export const generatePageDataBatch = async (
  keywords: Array<{
    id: number;
    keyword: string;
    category: string;
    metadata?: any;
  }>,
  concurrency: number = 5
): Promise<WorkflowResult[]> => {
  const results: WorkflowResult[] = [];

  // 分批处理，控制并发数
  for (let i = 0; i < keywords.length; i += concurrency) {
    const batch = keywords.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map(kw => generatePageData(kw.id, kw.keyword, kw.category, kw.metadata))
    );
    results.push(...batchResults);
  }

  return results;
};
