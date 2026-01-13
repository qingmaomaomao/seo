import { Request, Response } from 'express';
import { db } from '../database/init';
import csv from 'csv-parser';
import fs from 'fs';
import xlsx from 'xlsx';

interface KeywordRow {
  keyword: string;
  search_volume?: number;
  kd?: number;
  url?: string;
  [key: string]: any;
}

/**
 * 上传并解析关键词文件
 */
export const uploadKeywords = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { uploadType, batchName } = req.body;

    if (!uploadType || !['main', 'blog'].includes(uploadType)) {
      return res.status(400).json({ error: 'Invalid upload type' });
    }

    const file = req.file;
    const fileName = file.originalname;
    const filePath = file.path;

    // 解析文件
    let keywords: KeywordRow[] = [];

    if (fileName.endsWith('.csv')) {
      keywords = await parseCSV(filePath);
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      keywords = await parseExcel(filePath);
    } else {
      fs.unlinkSync(filePath);
      return res.status(400).json({ error: 'Unsupported file format. Only CSV and Excel files are supported.' });
    }

    if (keywords.length === 0) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ error: 'No keywords found in file' });
    }

    // 创建批次记录
    const batchId = await new Promise<number>((resolve, reject) => {
      db.run(
        `INSERT INTO batches (name, upload_type, file_name, total_keywords, status)
         VALUES (?, ?, ?, ?, 'uploaded')`,
        [batchName || fileName, uploadType, fileName, keywords.length],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });

    // 插入关键词
    const stmt = db.prepare(`
      INSERT INTO keywords (batch_id, keyword, search_volume, kd, url, status)
      VALUES (?, ?, ?, ?, ?, 'pending')
    `);

    for (const kw of keywords) {
      stmt.run([
        batchId,
        kw.keyword,
        kw.search_volume || null,
        kw.kd || null,
        kw.url || null
      ]);
    }

    stmt.finalize();

    // 删除临时文件
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      batch_id: batchId,
      total_keywords: keywords.length,
      message: 'Keywords uploaded successfully'
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * 解析CSV文件
 */
const parseCSV = (filePath: string): Promise<KeywordRow[]> => {
  return new Promise((resolve, reject) => {
    const results: KeywordRow[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data: any) => {
        // 规范化字段名（支持不同的列名格式）
        const normalized: KeywordRow = {
          keyword: data.keyword || data.Keyword || data.KEYWORD || data['关键词'] || '',
          search_volume: parseInt(data.search_volume || data.SearchVolume || data['搜索量'] || '0'),
          kd: parseFloat(data.kd || data.KD || data['难度'] || '0'),
          url: data.url || data.URL || data['链接'] || ''
        };

        if (normalized.keyword) {
          results.push(normalized);
        }
      })
      .on('end', () => resolve(results))
      .on('error', reject);
  });
};

/**
 * 解析Excel文件
 */
const parseExcel = (filePath: string): Promise<KeywordRow[]> => {
  return new Promise((resolve, reject) => {
    try {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(worksheet);

      const results: KeywordRow[] = data.map((row: any) => ({
        keyword: row.keyword || row.Keyword || row.KEYWORD || row['关键词'] || '',
        search_volume: parseInt(row.search_volume || row.SearchVolume || row['搜索量'] || '0'),
        kd: parseFloat(row.kd || row.KD || row['难度'] || '0'),
        url: row.url || row.URL || row['链接'] || ''
      })).filter(kw => kw.keyword);

      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};
