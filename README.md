# SEO 页面生成工具

一个自动化的 SEO 页面生成工具，支持关键词上传、智能分类和批量生成页面数据。

## 功能特性

### 1. 关键词上传
- 支持上传 CSV 和 Excel 格式的关键词数据
- 支持两种上传类型：
  - **主站关键词**：需要通过 AI 挖掘分类
  - **Blog 类型**：直接分类为 Blog 页面
- 自动解析关键词、搜索量、KD（难度）、URL 等字段

### 2. 智能分类
- 一键调用外部 AI 服务进行关键词分类
- 支持四种页面类型：
  - Create 页面
  - Tool 页面
  - Templates 页面
  - Blog 页面
- 分批处理，支持大量关键词

### 3. 批量生成
- **一键全部生成**：生成所有已分类的关键词
- **当前页批量生成**：生成当前页面显示的关键词
- **选中项生成**：生成用户选中的特定关键词
- **按类型生成**：按页面类型批量生成
- 调用下游工作流服务生成页面数据

### 4. 数据管理
- 支持关键词列表展示和分页
- 支持按类型和状态筛选
- 实时显示统计信息和进度
- 批次管理，支持多批次操作

## 技术栈

### 后端
- Node.js + Express
- TypeScript
- SQLite 数据库
- Multer（文件上传）
- Axios（HTTP 客户端）

### 前端
- React 18
- TypeScript
- Ant Design 5
- Vite（构建工具）

## 项目结构

```
seo/
├── server/                 # 后端服务
│   ├── src/
│   │   ├── controllers/   # 控制器
│   │   ├── database/      # 数据库配置
│   │   ├── routes/        # 路由
│   │   ├── services/      # 服务层
│   │   └── index.ts       # 入口文件
│   ├── package.json
│   └── tsconfig.json
├── client/                 # 前端应用
│   ├── src/
│   │   ├── components/    # React 组件
│   │   ├── services/      # API 服务
│   │   ├── types/         # 类型定义
│   │   ├── App.tsx        # 主应用
│   │   └── main.tsx       # 入口文件
│   ├── package.json
│   └── vite.config.ts
└── package.json            # 根配置

```

## 快速开始

### 前置要求
- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
# 安装所有依赖（根目录、server、client）
npm run install:all
```

### 配置环境变量

在 `server` 目录下创建 `.env` 文件：

```env
PORT=3001
NODE_ENV=development

# 外部服务配置
CLASSIFICATION_SERVICE_URL=http://localhost:8000/api/classify
WORKFLOW_SERVICE_URL=http://localhost:8000/api/workflow

# 数据库配置
DATABASE_PATH=./data/seo.sqlite
```

### 启动开发服务器

```bash
# 同时启动前后端开发服务器
npm run dev

# 或分别启动
npm run dev:server  # 后端: http://localhost:3001
npm run dev:client  # 前端: http://localhost:3000
```

### 生产构建

```bash
# 构建前后端
npm run build

# 启动生产服务器
npm start
```

## API 接口文档

### 上传关键词
```
POST /api/upload
Content-Type: multipart/form-data

参数:
- file: 文件 (CSV/Excel)
- uploadType: 'main' | 'blog'
- batchName: 批次名称（可选）
```

### 获取批次列表
```
GET /api/batches
```

### 获取关键词列表
```
GET /api/keywords?batch_id=1&page=1&page_size=50

参数:
- batch_id: 批次ID
- category: 分类过滤（可选）
- workflow_status: 状态过滤（可选）
- page: 页码
- page_size: 每页数量
```

### 一键挖掘分类
```
POST /api/classify
Content-Type: application/json

{
  "batch_id": 1
}
```

### 生成页面数据
```
POST /api/generate
Content-Type: application/json

{
  "mode": "all" | "batch" | "single" | "by_category",
  "batch_id": 1,
  "keyword_ids": [1, 2, 3],  // mode=single 时必填
  "category": "create",       // mode=by_category 时必填
  "page": 1,                  // mode=batch 时必填
  "page_size": 50             // mode=batch 时必填
}
```

### 获取统计信息
```
GET /api/statistics?batch_id=1
```

## 外部服务集成

### 分类服务接口

工具会调用外部分类服务来对关键词进行智能分类：

```
POST {CLASSIFICATION_SERVICE_URL}
Content-Type: application/json

请求:
{
  "keywords": [
    {
      "id": 1,
      "keyword": "create resume",
      "search_volume": 1000,
      "kd": 45.5,
      "url": "https://example.com"
    }
  ],
  "upload_type": "main"
}

响应:
{
  "results": [
    {
      "keyword_id": 1,
      "category": "create",
      "confidence": 0.95
    }
  ]
}
```

### 工作流服务接口

工具会调用工作流服务来生成页面数据：

```
POST {WORKFLOW_SERVICE_URL}
Content-Type: application/json

请求:
{
  "keyword_id": 1,
  "keyword": "create resume",
  "category": "create",
  "metadata": {
    "search_volume": 1000,
    "kd": 45.5,
    "url": "https://example.com"
  }
}

响应:
{
  "success": true,
  "page_data": {
    // 生成的页面数据
  }
}
```

## 数据文件格式

### CSV 格式示例

```csv
keyword,search_volume,kd,url
create resume,1000,45.5,https://example.com/resume
make presentation,800,38.2,https://example.com/presentation
design logo,1200,52.3,https://example.com/logo
```

### Excel 格式

支持 `.xlsx` 和 `.xls` 格式，表格需包含以下列：
- keyword（关键词）
- search_volume（搜索量）
- kd（难度）
- url（链接）

支持中文列名：
- 关键词
- 搜索量
- 难度
- 链接

## 使用流程

1. **上传关键词数据**
   - 准备 CSV 或 Excel 文件
   - 选择上传类型（主站/Blog）
   - 点击上传

2. **一键挖掘分类**
   - 进入"关键词管理"标签
   - 点击"一键挖掘分类"按钮
   - 等待分类完成（可实时查看进度）

3. **生成页面数据**
   - 根据需要选择生成方式：
     - 一键全部生成
     - 当前页批量生成
     - 选中特定关键词生成
     - 按类型批量生成
   - 查看生成状态和结果

4. **查看统计和结果**
   - 实时查看统计信息
   - 筛选和导出数据
   - 查看生成结果

## 注意事项

1. **文件大小限制**：上传文件不超过 50MB
2. **并发控制**：工作流生成默认并发数为 5，避免过载
3. **超时设置**：外部服务调用超时时间为 5 分钟
4. **错误处理**：如果外部服务失败，会自动标记并记录错误

## 开发说明

### 添加新的页面类型

1. 更新类型定义 `client/src/types/index.ts`
2. 修改分类逻辑（如需要）
3. 更新前端组件显示

### 自定义外部服务

修改 `server/.env` 文件中的服务 URL：
```env
CLASSIFICATION_SERVICE_URL=你的分类服务地址
WORKFLOW_SERVICE_URL=你的工作流服务地址
```

## 许可证

MIT

## 作者

Claude Code

---

如有问题或建议，欢迎提出 Issue！
