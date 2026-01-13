import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = process.env.DATABASE_PATH || './data/seo.sqlite';
const dbDir = path.dirname(dbPath);

// 确保数据目录存在
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// 确保上传目录存在
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export const db = new sqlite3.Database(dbPath);

export const initDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // 创建批次表
      db.run(`
        CREATE TABLE IF NOT EXISTS batches (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          upload_type TEXT NOT NULL,
          file_name TEXT NOT NULL,
          total_keywords INTEGER DEFAULT 0,
          processed_keywords INTEGER DEFAULT 0,
          status TEXT DEFAULT 'uploaded',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) reject(err);
      });

      // 创建关键词表
      db.run(`
        CREATE TABLE IF NOT EXISTS keywords (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          batch_id INTEGER NOT NULL,
          keyword TEXT NOT NULL,
          search_volume INTEGER,
          kd REAL,
          url TEXT,
          category TEXT,
          status TEXT DEFAULT 'pending',
          workflow_status TEXT DEFAULT 'not_started',
          result_data TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE
        )
      `, (err) => {
        if (err) reject(err);
      });

      // 创建索引
      db.run(`CREATE INDEX IF NOT EXISTS idx_batch_id ON keywords(batch_id)`, (err) => {
        if (err) reject(err);
      });

      db.run(`CREATE INDEX IF NOT EXISTS idx_category ON keywords(category)`, (err) => {
        if (err) reject(err);
      });

      db.run(`CREATE INDEX IF NOT EXISTS idx_status ON keywords(status)`, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Database initialized successfully');
          resolve();
        }
      });
    });
  });
};
