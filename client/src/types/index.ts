export interface Batch {
  id: number;
  name: string;
  upload_type: 'main' | 'blog';
  file_name: string;
  total_keywords: number;
  processed_keywords: number;
  status: 'uploaded' | 'classifying' | 'classified' | 'error';
  classified_keywords?: number;
  generated_keywords?: number;
  created_at: string;
  updated_at: string;
}

export interface Keyword {
  id: number;
  batch_id: number;
  keyword: string;
  search_volume?: number;
  kd?: number;
  url?: string;
  category?: 'create' | 'tool' | 'templates' | 'blog';
  status: 'pending' | 'classified';
  workflow_status: 'not_started' | 'processing' | 'completed' | 'failed';
  result_data?: string;
  created_at: string;
  updated_at: string;
}

export interface PaginationInfo {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}

export interface KeywordsResponse {
  data: Keyword[];
  pagination: PaginationInfo;
}

export interface Statistics {
  total: number;
  create_count: number;
  tool_count: number;
  templates_count: number;
  blog_count: number;
  generated_count: number;
  processing_count: number;
  failed_count: number;
}
