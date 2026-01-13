import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadKeywords } from '../controllers/uploadController';
import {
  getBatches,
  getKeywords,
  classifyAllKeywords,
  generatePages,
  getStatistics
} from '../controllers/keywordController';

const router = express.Router();

// 配置文件上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.csv', '.xlsx', '.xls'];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV and Excel files are allowed'));
    }
  }
});

// 上传关键词文件
router.post('/upload', upload.single('file'), uploadKeywords);

// 获取批次列表
router.get('/batches', getBatches);

// 获取关键词列表
router.get('/keywords', getKeywords);

// 一键挖掘（分类）
router.post('/classify', classifyAllKeywords);

// 生成页面数据
router.post('/generate', generatePages);

// 获取统计信息
router.get('/statistics', getStatistics);

export default router;
