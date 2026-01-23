# 关键词分类规则

## 分类标准

### Create 类型
**特征识别**：
- 关键词包含动作词：create, make, design, build, generate
- 强烈的创建意图
- 通常是工具操作类

**示例**：
- create poster online
- make logo free
- design business card
- build infographic

**页面特点**：
- 提供创建工具或生成器
- 强调易用性和速度
- 通常有模板选择功能

---

### Tool 类型
**特征识别**：
- 关键词包含工具词：tool, maker, generator, creator, editor
- 后缀包含：online, free, app
- 强调工具属性

**示例**：
- poster maker online
- logo generator free
- photo editor tool
- QR code generator

**页面特点**：
- 功能页面，提供特定工具
- 强调功能特性
- 可能有免费/付费版本

---

### Templates 类型
**特征识别**：
- 关键词包含：template, templates, example, sample
- 通常是名词 + template 格式
- 用户需要预设计的内容

**示例**：
- business card template
- resume templates free
- invoice template download
- flyer examples

**页面特点**：
- 展示模板集合
- 支持下载或在线编辑
- 按类别分类

---

### Blog 类型
**特征识别**：
- 疑问词开头：how, what, why, when, which
- 包含教程词：guide, tutorial, tips, ideas, ways
- 信息搜索意图明显

**示例**：
- how to design a poster
- best practices for logo design
- poster design tips
- creative flyer ideas

**页面特点**：
- 教程和指南内容
- 包含步骤说明
- 图文并茂
- 可能包含视频

---

## 分类算法

### 优先级规则（从高到低）

1. **明确关键词匹配**
   - 如果包含 "template/templates" → Templates
   - 如果包含 "how to/guide/tutorial" → Blog
   - 如果包含 "maker/generator/creator/tool" → Tool
   - 如果包含 "create/make/design/build" → Create

2. **意图分析**
   ```
   Intent Score:
   - Transactional (交易型) → Create/Tool
   - Informational (信息型) → Blog
   - Navigational (导航型) → Templates
   ```

3. **词序分析**
   - 动词在前 → Create (如 "create poster")
   - 名词 + 工具词 → Tool (如 "poster maker")
   - 名词 + template → Templates
   - 疑问词 + 任意 → Blog

4. **竞品对标**
   - 查看来源网站的页面类型
   - 参考竞品的关键词布局

### 置信度计算

```python
confidence = (
    keyword_match_score * 0.4 +      # 关键词匹配度
    intent_clarity_score * 0.3 +     # 意图清晰度
    competitor_alignment * 0.2 +     # 竞品对齐度
    search_pattern_score * 0.1       # 搜索模式评分
)
```

**置信度等级**：
- 0.9-1.0: 非常确定
- 0.7-0.9: 确定
- 0.5-0.7: 较确定（建议人工复核）
- < 0.5: 不确定（需要人工判断）

---

## 特殊情况处理

### 模糊关键词

**示例**: "poster"
- 单独的名词可能需要更多上下文
- 检查搜索量和 KD 值
- 如果搜索量高，优先创建 Tool 页面
- 可以创建多个类型页面以覆盖不同意图

### 组合关键词

**示例**: "create poster template"
- 包含多个类型特征
- 优先级：Create > Templates
- 考虑创建综合页面

### 品牌词

**示例**: "canva poster maker"
- 包含竞品品牌
- 建议创建替代方案页面
- 突出差异化优势

### 长尾词

**示例**: "how to create a poster for free online"
- 通常包含多个意图
- 可能需要综合性内容
- Blog + Tool 组合页面

---

## 实际应用示例

### 案例 1: "design poster online"

**分析过程**：
1. 识别关键词：design (动词), poster (名词), online (修饰)
2. 意图判断：Transactional（用户想要设计海报）
3. 类型匹配：包含 "design" → Create 类型
4. 置信度：0.95（非常确定）

**推荐**：Create 类型页面

---

### 案例 2: "poster maker free"

**分析过程**：
1. 识别关键词：poster (名词), maker (工具词), free (修饰)
2. 意图判断：Transactional（寻找工具）
3. 类型匹配：包含 "maker" → Tool 类型
4. 置信度：0.92（非常确定）

**推荐**：Tool 类型页面

---

### 案例 3: "business card template free download"

**分析过程**：
1. 识别关键词：business card (名词), template (类型词)
2. 意图判断：Navigational（寻找模板）
3. 类型匹配：包含 "template" → Templates 类型
4. 置信度：0.98（非常确定）

**推荐**：Templates 类型页面

---

### 案例 4: "how to design a professional poster"

**分析过程**：
1. 识别关键词：how to (疑问), design (动词), professional poster (目标)
2. 意图判断：Informational（学习如何做）
3. 类型匹配：包含 "how to" → Blog 类型
4. 置信度：0.96（非常确定）

**推荐**：Blog 类型页面

---

## 分类决策树

```
开始
  ↓
包含 "template(s)"?
  ├─ Yes → Templates (0.9+)
  └─ No → 继续
       ↓
     包含 "how to/guide/tutorial"?
       ├─ Yes → Blog (0.9+)
       └─ No → 继续
            ↓
          包含 "maker/generator/creator/tool"?
            ├─ Yes → Tool (0.85+)
            └─ No → 继续
                 ↓
               动词开头 (create/make/design/build)?
                 ├─ Yes → Create (0.8+)
                 └─ No → 分析搜索意图
                      ↓
                    基于意图和竞品数据判断
```

---

## 质量控制检查点

### 分类后验证

1. **逻辑验证**
   - 分类是否符合用户搜索意图？
   - 与竞品页面类型是否一致？

2. **流量验证**
   - 该分类的页面能否满足搜索需求？
   - 转化路径是否清晰？

3. **竞争力验证**
   - 是否能与竞品竞争？
   - 差异化优势是否明显？

### 异常处理

**低置信度 (< 0.7)**：
- 标记为需要人工审核
- 提供 2-3 个可能的分类选项
- 附加详细的分析理由

**冲突分类**：
- 记录所有可能的分类
- 提供优先级排序
- 建议创建多个页面类型

**新词/未知模式**：
- 标记为"其他"类型
- 收集更多数据
- 定期review和重新分类
