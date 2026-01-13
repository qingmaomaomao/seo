import { Request, Response } from 'express';
import { db } from '../database/init';
import { classifyKeywords, generatePageDataBatch, KeywordData } from '../services/externalService';

/**
 * 获取所有批次列表
 */
export const getBatches = async (req: Request, res: Response) => {
  try {
    db.all(
      `SELECT b.*,
        COUNT(CASE WHEN k.category IS NOT NULL THEN 1 END) as classified_keywords,
        COUNT(CASE WHEN k.workflow_status = 'completed' THEN 1 END) as generated_keywords
       FROM batches b
       LEFT JOIN keywords k ON b.id = k.batch_id
       GROUP BY b.id
       ORDER BY b.created_at DESC`,
      [],
      (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json(rows);
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * 获取关键词列表（支持分页和过滤）
 */
export const getKeywords = async (req: Request, res: Response) => {
  try {
    const {
      batch_id,
      category,
      status,
      workflow_status,
      page = 1,
      page_size = 50
    } = req.query;

    let whereClause = '1=1';
    const params: any[] = [];

    if (batch_id) {
      whereClause += ' AND batch_id = ?';
      params.push(batch_id);
    }

    if (category) {
      whereClause += ' AND category = ?';
      params.push(category);
    }

    if (status) {
      whereClause += ' AND status = ?';
      params.push(status);
    }

    if (workflow_status) {
      whereClause += ' AND workflow_status = ?';
      params.push(workflow_status);
    }

    // 获取总数
    const countQuery = `SELECT COUNT(*) as total FROM keywords WHERE ${whereClause}`;
    const totalResult: any = await new Promise((resolve, reject) => {
      db.get(countQuery, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    const total = totalResult.total;
    const offset = (Number(page) - 1) * Number(page_size);

    // 获取数据
    const dataQuery = `
      SELECT * FROM keywords
      WHERE ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;

    db.all(dataQuery, [...params, Number(page_size), offset], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        data: rows,
        pagination: {
          page: Number(page),
          page_size: Number(page_size),
          total,
          total_pages: Math.ceil(total / Number(page_size))
        }
      });
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * 一键挖掘（分类所有关键词）
 */
export const classifyAllKeywords = async (req: Request, res: Response) => {
  try {
    const { batch_id } = req.body;

    if (!batch_id) {
      return res.status(400).json({ error: 'batch_id is required' });
    }

    // 获取批次信息
    const batch: any = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM batches WHERE id = ?', [batch_id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!batch) {
      return res.status(404).json({ error: 'Batch not found' });
    }

    // 更新批次状态
    db.run('UPDATE batches SET status = ? WHERE id = ?', ['classifying', batch_id]);

    // 获取未分类的关键词
    const keywords: KeywordData[] = await new Promise((resolve, reject) => {
      db.all(
        'SELECT id, keyword, search_volume, kd, url FROM keywords WHERE batch_id = ? AND category IS NULL',
        [batch_id],
        (err, rows: any[]) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });

    if (keywords.length === 0) {
      return res.json({ message: 'All keywords already classified', total: 0 });
    }

    // 异步处理分类（分批调用外部服务）
    processClassification(batch_id, keywords, batch.upload_type);

    res.json({
      message: 'Classification started',
      total: keywords.length,
      batch_id
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * 异步处理分类
 */
const processClassification = async (
  batchId: number,
  keywords: KeywordData[],
  uploadType: string
) => {
  try {
    const batchSize = 100; // 每批处理100个关键词

    for (let i = 0; i < keywords.length; i += batchSize) {
      const batch = keywords.slice(i, i + batchSize);

      // 调用外部分类服务
      const results = await classifyKeywords(batch, uploadType);

      // 更新数据库
      const stmt = db.prepare('UPDATE keywords SET category = ?, status = ? WHERE id = ?');

      for (const result of results) {
        stmt.run([result.category, 'classified', result.keyword_id]);
      }

      stmt.finalize();

      // 更新批次进度
      db.run(
        'UPDATE batches SET processed_keywords = ? WHERE id = ?',
        [Math.min(i + batchSize, keywords.length), batchId]
      );
    }

    // 更新批次状态为已完成
    db.run('UPDATE batches SET status = ? WHERE id = ?', ['classified', batchId]);

    console.log(`Classification completed for batch ${batchId}`);
  } catch (error: any) {
    console.error('Classification error:', error);
    db.run('UPDATE batches SET status = ? WHERE id = ?', ['error', batchId]);
  }
};

/**
 * 生成页面数据（支持多种模式）
 */
export const generatePages = async (req: Request, res: Response) => {
  try {
    const {
      mode, // 'all' | 'batch' | 'single' | 'by_category'
      batch_id,
      keyword_ids,
      category,
      page,
      page_size = 50
    } = req.body;

    let keywordsToGenerate: any[] = [];

    // 根据不同模式获取关键词
    if (mode === 'all') {
      // 生成所有已分类且未生成的关键词
      keywordsToGenerate = await new Promise((resolve, reject) => {
        db.all(
          `SELECT id, keyword, category, search_volume, kd, url
           FROM keywords
           WHERE batch_id = ? AND category IS NOT NULL AND workflow_status = 'not_started'`,
          [batch_id],
          (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          }
        );
      });
    } else if (mode === 'batch') {
      // 生成当前页的关键词
      const offset = (page - 1) * page_size;
      keywordsToGenerate = await new Promise((resolve, reject) => {
        db.all(
          `SELECT id, keyword, category, search_volume, kd, url
           FROM keywords
           WHERE batch_id = ? AND category IS NOT NULL AND workflow_status = 'not_started'
           LIMIT ? OFFSET ?`,
          [batch_id, page_size, offset],
          (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          }
        );
      });
    } else if (mode === 'single') {
      // 生成单个关键词
      if (!keyword_ids || keyword_ids.length === 0) {
        return res.status(400).json({ error: 'keyword_ids is required for single mode' });
      }

      const placeholders = keyword_ids.map(() => '?').join(',');
      keywordsToGenerate = await new Promise((resolve, reject) => {
        db.all(
          `SELECT id, keyword, category, search_volume, kd, url
           FROM keywords
           WHERE id IN (${placeholders})`,
          keyword_ids,
          (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          }
        );
      });
    } else if (mode === 'by_category') {
      // 按类型生成
      if (!category) {
        return res.status(400).json({ error: 'category is required for by_category mode' });
      }

      keywordsToGenerate = await new Promise((resolve, reject) => {
        db.all(
          `SELECT id, keyword, category, search_volume, kd, url
           FROM keywords
           WHERE batch_id = ? AND category = ? AND workflow_status = 'not_started'`,
          [batch_id, category],
          (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          }
        );
      });
    } else {
      return res.status(400).json({ error: 'Invalid mode' });
    }

    if (keywordsToGenerate.length === 0) {
      return res.json({ message: 'No keywords to generate', total: 0 });
    }

    // 更新状态为处理中
    const stmt = db.prepare('UPDATE keywords SET workflow_status = ? WHERE id = ?');
    for (const kw of keywordsToGenerate) {
      stmt.run(['processing', kw.id]);
    }
    stmt.finalize();

    // 异步处理生成
    processGeneration(keywordsToGenerate);

    res.json({
      message: 'Generation started',
      total: keywordsToGenerate.length
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * 异步处理生成
 */
const processGeneration = async (keywords: any[]) => {
  try {
    const keywordsData = keywords.map(kw => ({
      id: kw.id,
      keyword: kw.keyword,
      category: kw.category,
      metadata: {
        search_volume: kw.search_volume,
        kd: kw.kd,
        url: kw.url
      }
    }));

    // 调用工作流服务（控制并发）
    const results = await generatePageDataBatch(keywordsData, 5);

    // 更新数据库
    const stmt = db.prepare(
      'UPDATE keywords SET workflow_status = ?, result_data = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    );

    for (const result of results) {
      if (result.success) {
        stmt.run(['completed', JSON.stringify(result.data), result.keyword_id]);
      } else {
        stmt.run(['failed', JSON.stringify({ error: result.error }), result.keyword_id]);
      }
    }

    stmt.finalize();

    console.log(`Generation completed for ${results.length} keywords`);
  } catch (error: any) {
    console.error('Generation error:', error);

    // 将所有关键词标记为失败
    const stmt = db.prepare('UPDATE keywords SET workflow_status = ? WHERE id = ?');
    for (const kw of keywords) {
      stmt.run(['failed', kw.id]);
    }
    stmt.finalize();
  }
};

/**
 * 获取统计信息
 */
export const getStatistics = async (req: Request, res: Response) => {
  try {
    const { batch_id } = req.query;

    const stats: any = await new Promise((resolve, reject) => {
      db.get(
        `SELECT
          COUNT(*) as total,
          COUNT(CASE WHEN category = 'create' THEN 1 END) as create_count,
          COUNT(CASE WHEN category = 'tool' THEN 1 END) as tool_count,
          COUNT(CASE WHEN category = 'templates' THEN 1 END) as templates_count,
          COUNT(CASE WHEN category = 'blog' THEN 1 END) as blog_count,
          COUNT(CASE WHEN workflow_status = 'completed' THEN 1 END) as generated_count,
          COUNT(CASE WHEN workflow_status = 'processing' THEN 1 END) as processing_count,
          COUNT(CASE WHEN workflow_status = 'failed' THEN 1 END) as failed_count
         FROM keywords
         WHERE batch_id = ?`,
        [batch_id],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });

    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
