# 关键词评分算法

## 核心评分指标

### 1. 价值指数 (Value Score)

**公式**：
```
Value Score = Search Volume / (KD + 1) × Intent Multiplier
```

**说明**：
- **Search Volume**: 月搜索量
- **KD**: 关键词难度 (0-100)
- **Intent Multiplier**: 意图乘数
  - Transactional (交易型): 1.5
  - Informational (信息型): 1.0
  - Navigational (导航型): 1.2

**示例计算**：
```
关键词: "design poster online"
Search Volume: 10,000
KD: 35.5
Intent: Transactional

Value Score = 10,000 / (35.5 + 1) × 1.5
           = 10,000 / 36.5 × 1.5
           = 273.97 × 1.5
           = 410.96
```

**价值等级**：
- **高价值** (> 300): 优先处理
- **中价值** (100-300): 标准处理
- **低价值** (< 100): 低优先级或批量处理

---

### 2. 竞争力指数 (Competition Index)

**公式**：
```
Competition Index = (100 - KD) / 100 × Competitor Factor
```

**Competitor Factor 计算**：
```python
if traffic_contribution > 5000:
    factor = 1.5  # 高流量贡献，竞品依赖强
elif traffic_contribution > 2000:
    factor = 1.2  # 中等流量
elif traffic_contribution > 500:
    factor = 1.0  # 低流量
else:
    factor = 0.8  # 无显著流量数据
```

**示例**：
```
关键词: "design poster online"
KD: 35.5
Traffic Contribution: 3,500 (来自 canva.com)

Competitor Factor = 1.2
Competition Index = (100 - 35.5) / 100 × 1.2
                  = 0.645 × 1.2
                  = 0.774 (77.4%)
```

**竞争力等级**：
- **强竞争力** (> 0.7): 值得投入资源
- **中等竞争力** (0.4-0.7): 谨慎评估
- **弱竞争力** (< 0.4): 低优先级

---

### 3. 流量潜力评分 (Traffic Potential Score)

**公式**：
```
Traffic Potential = Search Volume × CTR × Conversion Rate × Competition Index
```

**CTR 估算**（基于排名位置）：
- 第 1 位: 28.5%
- 第 2 位: 15.7%
- 第 3 位: 11.0%
- 第 4-5 位: 8.0%
- 第 6-10 位: 3.5%
- 11-20 位: 1.0%

**假设目标排名**：
- 新页面：第 5-8 位 (CTR: 5%)
- 优化页面：第 2-4 位 (CTR: 12%)
- 权威页面：第 1-2 位 (CTR: 22%)

**Conversion Rate 估算**（按类型）：
- Create 页面: 3-5%
- Tool 页面: 2-4%
- Templates 页面: 4-6%
- Blog 页面: 1-2%

**示例计算**：
```
关键词: "design poster online"
Search Volume: 10,000
假设排名: 第 5 位 (CTR: 8%)
页面类型: Create (Conversion: 4%)
Competition Index: 0.774

Traffic Potential = 10,000 × 0.08 × 0.04 × 0.774
                  = 24.77 次转化/月
```

---

### 4. ROI 预估分数 (ROI Score)

**公式**：
```
ROI Score = (Expected Revenue - Cost) / Cost × 100
```

**成本估算**：
- **页面开发成本**:
  - Create: $800-1200 (包含工具开发)
  - Tool: $600-1000
  - Templates: $400-600 (模板采购)
  - Blog: $200-400 (内容创作)

- **SEO 成本**:
  - 外链建设: $200-500
  - 内容优化: $100-200
  - 技术优化: $100-300

**收入估算**：
```
Expected Revenue = Monthly Traffic × Conversion Rate × Average Order Value × 12 months
```

**示例**：
```
关键词: "design poster online"
月流量: 800 访问
转化率: 4%
客单价: $30
总成本: $1,500

年收入 = 800 × 0.04 × $30 × 12 = $11,520
ROI = ($11,520 - $1,500) / $1,500 × 100 = 668%
```

**ROI 等级**：
- **优秀** (> 500%): 立即执行
- **良好** (200-500%): 高优先级
- **一般** (100-200%): 标准优先级
- **较差** (< 100%): 重新评估

---

## 综合评分系统

### 优先级总分 (Priority Score)

**公式**：
```
Priority Score = (
    Value Score × 0.35 +
    Competition Index × 100 × 0.25 +
    Traffic Potential × 0.20 +
    ROI Score × 0.20
) / 4
```

**权重说明**：
- Value Score (35%): 最重要，直接影响流量
- Competition Index (25%): 可行性评估
- Traffic Potential (20%): 实际效果预期
- ROI Score (20%): 商业价值

**示例计算**：
```
关键词: "design poster online"

Value Score: 410.96
Competition Index: 0.774 (77.4%)
Traffic Potential: 24.77
ROI Score: 668%

Priority Score = (
    410.96 × 0.35 +
    77.4 × 0.25 +
    24.77 × 0.20 +
    668 × 0.20
) / 4
= (143.84 + 19.35 + 4.95 + 133.6) / 4
= 301.74 / 4
= 75.44
```

**优先级分级**：
- **P0 - 最高优先级** (Score > 70): 立即执行
- **P1 - 高优先级** (Score 50-70): 1-2 周内执行
- **P2 - 中优先级** (Score 30-50): 1 个月内执行
- **P3 - 低优先级** (Score < 30): 排期或放弃

---

## 特殊场景调整

### 品牌词调整

如果关键词包含竞品品牌：
```
Adjusted Priority = Base Priority × 0.8 + Brand Opportunity Bonus
```

**Brand Opportunity Bonus**：
- 高流量品牌词 (> 10,000 搜索量): +15
- 中等流量品牌词 (5,000-10,000): +10
- 低流量品牌词 (< 5,000): +5

### 长尾词调整

如果关键词长度 > 4 个词：
```
Adjusted Priority = Base Priority × 0.7 + Long Tail Bonus
```

**Long Tail Bonus**：
- 非常低竞争 (KD < 20): +10
- 低竞争 (KD 20-40): +5
- 中等竞争 (KD > 40): +2

### 趋势调整

基于搜索趋势数据：
```
Trend Multiplier:
- 上升趋势 (> 20%增长): 1.3
- 稳定趋势 (-10% ~ +10%): 1.0
- 下降趋势 (< -10%): 0.7
```

---

## 批量评分流程

### 第一步：数据预处理
```python
1. 去重
2. 标准化（小写、去空格）
3. 补充缺失数据（搜索量、KD）
4. 验证数据有效性
```

### 第二步：批量计算
```python
for keyword in keywords:
    keyword.value_score = calculate_value_score(keyword)
    keyword.competition_index = calculate_competition_index(keyword)
    keyword.traffic_potential = calculate_traffic_potential(keyword)
    keyword.roi_score = calculate_roi_score(keyword)
    keyword.priority_score = calculate_priority_score(keyword)
```

### 第三步：排序和分组
```python
# 按优先级排序
keywords.sort(key=lambda x: x.priority_score, reverse=True)

# 按分类分组
groups = {
    'P0': keywords where priority_score > 70,
    'P1': keywords where 50 <= priority_score <= 70,
    'P2': keywords where 30 <= priority_score < 50,
    'P3': keywords where priority_score < 30
}
```

### 第四步：输出报告
```json
{
  "total_keywords": 1000,
  "by_priority": {
    "P0": 50,
    "P1": 200,
    "P2": 450,
    "P3": 300
  },
  "top_10_keywords": [...],
  "recommended_actions": [...]
}
```

---

## 实战案例

### 案例 1: 高价值关键词

**输入数据**：
```json
{
  "keyword": "free logo maker",
  "search_volume": 45000,
  "kd": 42,
  "source_url": "canva.com",
  "traffic_contribution": 12000
}
```

**计算过程**：
1. Value Score = 45000 / (42 + 1) × 1.5 = 1570.35
2. Competition Index = (100 - 42) / 100 × 1.5 = 0.87
3. Traffic Potential = 45000 × 0.05 × 0.03 × 0.87 = 58.73
4. ROI Score = 850%

**Priority Score** = (1570.35 × 0.35 + 87 × 0.25 + 58.73 × 0.20 + 850 × 0.20) / 4
                   = 177.52

**结论**: P0 级别，立即执行！

---

### 案例 2: 中等价值关键词

**输入数据**：
```json
{
  "keyword": "business card template",
  "search_volume": 8000,
  "kd": 55,
  "source_url": "adobe.com",
  "traffic_contribution": 2800
}
```

**计算过程**：
1. Value Score = 8000 / (55 + 1) × 1.2 = 171.43
2. Competition Index = (100 - 55) / 100 × 1.2 = 0.54
3. Traffic Potential = 8000 × 0.05 × 0.05 × 0.54 = 10.8
4. ROI Score = 320%

**Priority Score** = 52.1

**结论**: P1 级别，高优先级处理

---

### 案例 3: 低价值长尾词

**输入数据**：
```json
{
  "keyword": "how to create a professional poster for free online",
  "search_volume": 800,
  "kd": 18,
  "source_url": null,
  "traffic_contribution": null
}
```

**计算过程**：
1. Value Score = 800 / (18 + 1) × 1.0 = 42.11
2. Competition Index = (100 - 18) / 100 × 0.8 = 0.656
3. Traffic Potential = 800 × 0.05 × 0.015 × 0.656 = 0.39
4. ROI Score = 120%

**调整**: 长尾词 Bonus = +10

**Priority Score** = 28.5 + 10 = 38.5

**结论**: P2 级别，排期处理，适合批量 Blog 内容生成

---

## 评分系统优化建议

### 定期校准

1. **每月回顾**
   - 对比实际流量和预测流量
   - 调整 CTR 和转化率估算
   - 更新成本数据

2. **A/B 测试**
   - 测试不同类型页面的转化率
   - 优化评分权重
   - 验证 ROI 假设

3. **数据积累**
   - 记录所有页面的实际表现
   - 建立历史数据库
   - 机器学习优化

### 自动化工具

建议开发自动评分工具：
```python
def auto_score_keywords(keywords_list):
    """
    自动批量评分关键词
    """
    results = []
    for kw in keywords_list:
        score = {
            'keyword': kw.keyword,
            'value_score': calculate_value(kw),
            'priority': calculate_priority(kw),
            'recommended_category': classify(kw),
            'estimated_roi': estimate_roi(kw)
        }
        results.append(score)

    return sorted(results, key=lambda x: x['priority'], reverse=True)
```
