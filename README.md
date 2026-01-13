# SEO 页面生成工具（纯前端版本）

自动化 SEO 页面生成工具的前端界面，支持关键词上传、AI 分类和批量生成页面数据。

## 功能特性

### 📤 关键词上传
- 支持 CSV 和 Excel 文件格式
- 拖拽上传，方便快捷
- 支持三种类型：
  - **主站关键词**：用于挖掘适合 Create、Tool、Templates 页面的关键词
  - **Blog 关键词**：直接分类为 Blog 页面
  - **其他类型**：其他来源的关键词数据
- 自动解析关键词数据（关键词、搜索量、KD、URL、来源网站、流量贡献等）

### 🎯 一键挖掘分类
- 调用外部 AI 服务对关键词进行智能分类
- 支持四种页面类型：
  - **Create** 页面
  - **Tool** 页面
  - **Templates** 页面
  - **Blog** 页面
- 批量处理，进度实时显示

### 🚀 多种生成模式
- **一键全部生成**：生成所有已分类且未生成的关键词
- **当前页批量生成**：生成当前分页的关键词
- **选中生成**：勾选特定关键词后生成
- **按类型生成**：按页面类型（Create/Tool/Templates/Blog）批量生成

### 📊 数据管理
- 批次管理：查看所有上传批次，跟踪处理进度
- 关键词列表：分页展示，支持筛选和排序
- 竞品分析：展示关键词来源网站（如 canva.com）和为其贡献的流量
- 实时统计：总关键词数、已生成数、处理中、失败数
- 类型统计：各类型页面的数量统计

## 技术栈

- **框架**：React 18 + TypeScript
- **UI 库**：Ant Design 5
- **构建工具**：Vite
- **HTTP 客户端**：Axios
- **数据模式**：Mock 数据（可切换真实 API）

## 项目结构

```
seo/
├── client/                    # 前端应用
│   ├── src/
│   │   ├── components/        # React 组件
│   │   │   ├── UploadPanel.tsx       # 上传面板
│   │   │   ├── BatchList.tsx         # 批次列表
│   │   │   ├── KeywordTable.tsx      # 关键词表格
│   │   │   └── Statistics.tsx        # 统计看板
│   │   ├── services/          # API 服务
│   │   │   ├── api.ts                # API 封装
│   │   │   └── mockData.ts           # Mock 数据
│   │   ├── types/             # TypeScript 类型定义
│   │   │   └── index.ts
│   │   ├── App.tsx            # 主应用组件
│   │   ├── App.css            # 样式文件
│   │   ├── main.tsx           # 应用入口
│   │   └── index.css          # 全局样式
│   ├── index.html             # HTML 模板
│   ├── package.json           # 依赖配置
│   ├── tsconfig.json          # TypeScript 配置
│   └── vite.config.ts         # Vite 配置
├── package.json               # 根配置
└── README.md                  # 项目文档
```

## 快速开始

### 安装依赖

```bash
npm install
```

或者直接在 client 目录安装：

```bash
cd client
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:5173 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `client/dist/` 目录。

### 预览生产构建

```bash
npm run preview
```

## Mock 数据模式

当前项目默认使用 **Mock 数据模式**，无需后端服务即可运行和测试所有功能。

### 切换到真实 API

如果您有真实的后端服务，可以通过以下步骤切换：

1. 打开 `client/src/services/api.ts`
2. 将 `USE_MOCK` 常量改为 `false`：

```typescript
const USE_MOCK = false; // 使用真实 API
```

3. 配置 API 地址（可选）：

创建 `client/.env` 文件：

```env
VITE_API_BASE_URL=http://your-api-server.com/api
```

## API 接口规范

如果需要对接真实后端服务，以下是需要实现的 API 接口：

### 1. 上传关键词

```
POST /api/upload
Content-Type: multipart/form-data

参数：
- file: File（CSV 或 Excel 文件）
- uploadType: 'main' | 'blog' | 'other'
- batchName?: string（可选，批次名称）

响应：
{
  "success": true,
  "batch_id": 1,
  "total_keywords": 1500,
  "message": "Keywords uploaded successfully"
}
```

### 2. 获取批次列表

```
GET /api/batches

响应：
[
  {
    "id": 1,
    "name": "批次名称",
    "upload_type": "main" | "blog" | "other",
    "file_name": "file.xlsx",
    "total_keywords": 1500,
    "classified_keywords": 1200,
    "generated_keywords": 800,
    "status": "uploaded" | "classifying" | "classified" | "error",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T15:45:00Z"
  }
]
```

### 3. 获取关键词列表

```
GET /api/keywords?batch_id=1&page=1&page_size=50&category=create&workflow_status=completed

响应：
{
  "data": [
    {
      "id": 1,
      "batch_id": 1,
      "keyword": "design poster online",
      "search_volume": 10000,
      "kd": 35.5,
      "url": "",
      "source_url": "canva.com",
      "traffic_contribution": 3500,
      "category": "create" | "tool" | "templates" | "blog",
      "status": "pending" | "classified",
      "workflow_status": "not_started" | "processing" | "completed" | "failed",
      "workflow_data": {},
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:35:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "page_size": 50,
    "total": 1500,
    "total_pages": 30
  }
}
```

### 4. 一键挖掘分类

```
POST /api/classify
Content-Type: application/json

请求体：
{
  "batch_id": 1
}

响应：
{
  "success": true,
  "message": "Classification task started"
}
```

### 5. 生成页面数据

```
POST /api/generate
Content-Type: application/json

请求体：
{
  "mode": "all" | "batch" | "single" | "by_category",
  "batch_id": 1,
  "keyword_ids": [1, 2, 3],  // mode=single 时必需
  "category": "create",       // mode=by_category 时必需
  "page": 1,                  // mode=batch 时必需
  "page_size": 50             // mode=batch 时必需
}

响应：
{
  "success": true,
  "message": "Generation task started",
  "count": 100
}
```

### 6. 获取统计信息

```
GET /api/statistics

响应：
{
  "total_keywords": 4300,
  "generated_keywords": 1500,
  "processing_keywords": 100,
  "failed_keywords": 50,
  "category_counts": {
    "create": 1200,
    "tool": 1000,
    "templates": 900,
    "blog": 1200
  }
}
```

## 数据文件格式

### CSV 格式示例

```csv
keyword,search_volume,kd,url,source_url,traffic_contribution
design poster online,10000,35.5,,canva.com,3500
create logo free,8500,42.3,,adobe.com,2100
edit photo tool,12000,28.9,,figma.com,4800
```

### Excel 格式

支持 `.xlsx` 和 `.xls` 格式，列名同上。

### 字段说明

- **keyword**（必需）：关键词
- **search_volume**（可选）：搜索量
- **kd**（可选）：关键词难度（0-100）
- **url**（可选）：目标链接
- **source_url**（可选）：来源网站（如：canva.com、adobe.com）
- **traffic_contribution**（可选）：该关键词为来源网站贡献的流量

### 支持的列名变体

程序会自动识别以下列名（不区分大小写）：
- 关键词：`keyword`, `Keyword`, `KEYWORD`, `关键词`
- 搜索量：`search_volume`, `SearchVolume`, `搜索量`
- KD（难度）：`kd`, `KD`, `难度`
- URL：`url`, `URL`, `链接`
- 来源网站：`source_url`, `SourceUrl`, `来源网站`, `来源`
- 流量贡献：`traffic_contribution`, `TrafficContribution`, `流量贡献`, `流量`

## 界面预览

### 主要功能

1. **上传界面**
   - 拖拽上传文件
   - 选择上传类型
   - 自定义批次名称

2. **批次管理**
   - 查看所有批次
   - 显示进度和状态
   - 点击查看详情

3. **关键词管理**
   - 关键词列表展示
   - 筛选（按类型、状态）
   - 一键挖掘分类
   - 多种生成模式
   - 批量操作

4. **统计看板**
   - 总体统计（总数、已生成、处理中、失败）
   - 类型统计（Create、Tool、Templates、Blog）
   - 实时刷新（每 5 秒）

## 开发说明

### Mock 数据特点

- 自动生成 3 个示例批次
- 每个批次包含 500-2000 个关键词
- 80% 的关键词已分类
- 模拟分类和生成的异步处理
- 随机生成失败案例（约 10%）

### 自定义 Mock 数据

编辑 `client/src/services/mockData.ts` 文件：

```typescript
// 修改初始批次
let mockBatches: Batch[] = [
  // 添加您的批次数据
];

// 修改关键词数量
mockKeywordsDB[newBatch.id] = generateMockKeywords(newBatch.id, 自定义数量);
```

## 部署

### 静态部署

构建后将 `client/dist/` 目录部署到任何静态托管服务：
- Vercel
- Netlify
- GitHub Pages
- 阿里云 OSS
- 腾讯云 COS

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/seo/client/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 如果使用真实 API，配置代理
    location /api {
        proxy_pass http://your-backend-server:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 常见问题

### 1. 如何修改默认端口？

修改 `client/vite.config.ts`：

```typescript
export default defineConfig({
  server: {
    port: 3000, // 修改为您想要的端口
  },
});
```

### 2. 如何处理大文件上传？

在真实 API 模式下，确保后端设置了合适的文件大小限制：

```typescript
// Express 示例
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
```

### 3. 如何自定义页面类型？

修改以下文件中的类型定义：
- `client/src/types/index.ts` - 更新 TypeScript 类型
- `client/src/services/mockData.ts` - 更新 Mock 数据生成逻辑
- `client/src/components/KeywordTable.tsx` - 更新 UI 组件

### 4. 统计数据不刷新？

统计数据每 5 秒自动刷新。如需修改刷新间隔：

```typescript
// client/src/components/Statistics.tsx
const interval = setInterval(loadStats, 10000); // 改为 10 秒
```

## 技术支持

如有问题或建议，请联系开发团队或提交 Issue。

## 许可证

MIT License

---

**注意**：当前版本使用 Mock 数据，适用于前端开发和演示。生产环境请对接真实后端服务。
