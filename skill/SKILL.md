# SEO 关键词分析 Skill

## 触发条件
- 命令：`/analyze-keywords`
- 触发词：分析关键词、关键词建议、SEO 优化

## 目的
为 SEO 页面生成工具提供智能的关键词分析和优化建议

## 能力

### 1. 关键词质量评估
- 评估关键词的搜索价值
- 计算关键词难度得分
- 分析竞争度

### 2. 关键词分类建议
- 判断适合的页面类型（Create/Tool/Templates/Blog）
- 提供分类依据
- 推荐优先级

### 3. 流量潜力分析
- 评估流量贡献价值
- 与竞品对比分析
- 给出优化建议

### 4. 内容策略建议
- 推荐相关 LSI 关键词
- 建议内容结构
- 提供页面标题和描述模板

## 执行流程

1. **接收输入**
   - 关键词列表
   - 搜索量数据
   - KD 值
   - 来源网站信息

2. **数据分析**
   - 计算关键词价值指数 = 搜索量 / (KD + 1)
   - 分析关键词意图（信息型/交易型/导航型）
   - 评估竞争难度

3. **分类推荐**
   - Create: 动词开头 + 工具类词（如 "create poster"）
   - Tool: 工具名 + 在线/免费（如 "poster maker online"）
   - Templates: 模板类关键词（如 "business card templates"）
   - Blog: 教程类词（如 "how to design poster"）

4. **生成报告**
   - 分类结果及置信度
   - 优化建议
   - 预期流量和转化

## 输入格式

```json
{
  "keywords": [
    {
      "keyword": "design poster online",
      "search_volume": 10000,
      "kd": 35.5,
      "source_url": "canva.com",
      "traffic_contribution": 3500
    }
  ]
}
```

## 输出格式

```json
{
  "analysis": [
    {
      "keyword": "design poster online",
      "recommended_category": "create",
      "confidence": 0.92,
      "value_score": 281.7,
      "intent": "transactional",
      "priority": "high",
      "suggestions": {
        "title": "Design Poster Online - Free Poster Maker Tool",
        "meta_description": "Create stunning posters online with our free design tool...",
        "related_keywords": ["poster creator", "online poster design", "free poster maker"]
      },
      "traffic_potential": {
        "estimated_monthly_traffic": 2500,
        "conversion_rate_estimate": "3-5%",
        "competitive_advantage": "medium"
      }
    }
  ],
  "summary": {
    "total_analyzed": 1,
    "high_priority": 1,
    "recommended_actions": [
      "创建 Create 类型页面，重点突出免费和在线功能",
      "优化页面速度以提升用户体验",
      "添加模板预览功能吸引用户"
    ]
  }
}
```

## 使用示例

### 示例 1：分析单个关键词

```
/analyze-keywords "design poster online"
```

### 示例 2：批量分析

```
/analyze-keywords 请分析以下关键词：
- create logo free
- poster template
- how to make infographic
```

### 示例 3：结合数据分析

```
根据上传的关键词数据，使用 /analyze-keywords 为前 100 个关键词提供分类建议
```

## 最佳实践

1. **数据准备**
   - 确保关键词数据完整（搜索量、KD、来源）
   - 清洗重复关键词
   - 按搜索量排序

2. **分类策略**
   - 高搜索量低难度：优先处理
   - 与竞品重叠：重点优化
   - 长尾词：批量生成 Blog 内容

3. **质量控制**
   - 人工复核高价值关键词
   - 定期更新关键词数据
   - 跟踪实际转化效果

## 参考文件

详细的分析算法和评分标准请查看 `references/` 目录：
- `scoring-algorithm.md` - 关键词评分算法
- `classification-rules.md` - 分类规则详解
- `seo-best-practices.md` - SEO 最佳实践

## 性能优化

- **推荐模型**: Claude Sonnet 4.5（平衡速度和质量）
- **上下文需求**: 20K tokens
- **批处理**: 支持，建议每批 50-100 个关键词
- **缓存策略**: 相似关键词可复用分析结果

## 更新日志

- v1.0.0 (2026-01-23): 初始版本，支持基础关键词分类
- v1.1.0 (计划中): 添加 AI 生成的页面标题和描述
- v2.0.0 (计划中): 集成实时搜索趋势数据
