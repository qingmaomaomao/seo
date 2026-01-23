---
name: seo-skill
description: SEO keyword analysis and classification skill for the SEO page generation tool. Use when analyzing keywords, recommending page types (Create/Tool/Templates/Blog), calculating keyword value scores, or providing SEO optimization suggestions based on search volume, KD, source URLs, and traffic contribution data.
---

# SEO Skill

## Overview

This skill provides intelligent keyword analysis and classification for the SEO page generation tool. It evaluates keywords based on search volume, keyword difficulty (KD), source website data, and traffic contribution to recommend optimal page types and prioritization strategies.

## Core Capabilities

### 1. Keyword Quality Assessment

Evaluate keyword potential using multiple metrics:

**Value Score Calculation:**
```
Value Score = Search Volume / (KD + 1) × Intent Multiplier

Intent Multipliers:
- Transactional: 1.5
- Informational: 1.0
- Navigational: 1.2
```

**Competition Index:**
```
Competition Index = (100 - KD) / 100 × Competitor Factor

Competitor Factors:
- High traffic (>5000): 1.5
- Medium traffic (2000-5000): 1.2
- Low traffic (500-2000): 1.0
- No data: 0.8
```

### 2. Page Type Classification

Classify keywords into four page types with confidence scoring:

**Create Pages** - Action-oriented keywords
- Triggers: "create", "make", "design", "build", "generate"
- Example: "create poster online", "make logo free"
- User intent: Create something new

**Tool Pages** - Tool-focused keywords
- Triggers: "tool", "maker", "generator", "creator", "editor", "online", "free"
- Example: "poster maker online", "logo generator free"
- User intent: Find and use a tool

**Templates Pages** - Template-seeking keywords
- Triggers: "template", "templates", "example", "sample"
- Example: "business card template", "resume templates free"
- User intent: Download or customize templates

**Blog Pages** - Informational keywords
- Triggers: "how to", "guide", "tutorial", "tips", "ideas", "best practices"
- Example: "how to design a poster", "poster design tips"
- User intent: Learn and get information

### 3. Classification Decision Logic

**Priority Rules (highest to lowest):**

1. **Explicit keyword match**
   - Contains "template/templates" → Templates
   - Contains "how to/guide/tutorial" → Blog
   - Contains "maker/generator/creator/tool" → Tool
   - Contains "create/make/design/build" → Create

2. **Intent analysis**
   - Transactional → Create/Tool
   - Informational → Blog
   - Navigational → Templates

3. **Word order analysis**
   - Verb-first → Create
   - Noun + tool word → Tool
   - Noun + template → Templates
   - Question word + any → Blog

**Confidence Scoring:**
```
Confidence = (
    keyword_match_score × 0.4 +
    intent_clarity_score × 0.3 +
    competitor_alignment × 0.2 +
    search_pattern_score × 0.1
)

Levels:
- 0.9-1.0: Very certain
- 0.7-0.9: Certain
- 0.5-0.7: Moderately certain (human review recommended)
- <0.5: Uncertain (requires human judgment)
```

### 4. Priority Scoring System

**Overall Priority Score:**
```
Priority Score = (
    Value Score × 0.35 +
    Competition Index × 100 × 0.25 +
    Traffic Potential × 0.20 +
    ROI Score × 0.20
) / 4

Priority Levels:
- P0 (>70): Immediate execution
- P1 (50-70): Execute within 1-2 weeks
- P2 (30-50): Execute within 1 month
- P3 (<30): Schedule or deprioritize
```

### 5. Competitive Analysis

When `source_url` and `traffic_contribution` data is available:

**Analyze competitor strength:**
- Identify which competitor sites dominate keywords
- Calculate traffic value being captured
- Recommend differentiation strategies

**Example insights:**
```
Keyword: "design poster online"
Source: canva.com
Traffic Contribution: 3,500/month
Value Score: 410.96
Recommendation: High-value target. Create differentiated "Create" page
emphasizing features Canva lacks (e.g., AI-powered design, more templates)
```

### 6. Content Strategy Recommendations

For each classified keyword, provide:

**Page Title Suggestion:**
- SEO-optimized (50-60 characters)
- Include primary keyword
- Action-oriented for Create/Tool pages

**Meta Description:**
- 120-155 characters
- Include keyword naturally
- Clear value proposition

**Related Keywords:**
- 3-5 LSI keywords for content optimization
- Semantic variations
- Long-tail opportunities

**Example Output:**
```json
{
  "keyword": "design poster online",
  "category": "create",
  "confidence": 0.92,
  "value_score": 410.96,
  "priority": "P0",
  "recommendations": {
    "title": "Design Poster Online Free - AI-Powered Poster Maker",
    "meta_description": "Create stunning posters online with our free AI-powered design tool. 1000+ templates, drag-and-drop editor, instant download.",
    "related_keywords": [
      "free poster creator",
      "online poster design tool",
      "make poster online",
      "poster generator free"
    ]
  },
  "traffic_potential": {
    "estimated_monthly": 2500,
    "conversion_rate": "3-5%",
    "monthly_conversions": "75-125"
  }
}
```

## Workflow

### Step 1: Receive Keyword Data

Accept keywords with the following fields:
- `keyword` (required): The search term
- `search_volume` (optional): Monthly search volume
- `kd` (optional): Keyword difficulty (0-100)
- `url` (optional): Target URL
- `source_url` (optional): Competitor source (e.g., "canva.com")
- `traffic_contribution` (optional): Traffic to source site

### Step 2: Analyze and Score

For each keyword:
1. Calculate value score
2. Determine search intent
3. Classify into page type
4. Calculate confidence score
5. Compute priority level

### Step 3: Generate Recommendations

Provide:
- Classification with confidence
- Priority ranking
- Content strategy
- Competitive insights (if applicable)
- ROI estimation

### Step 4: Output Results

Return structured JSON or formatted report with:
- Individual keyword analysis
- Summary statistics
- Top opportunities (P0/P1 keywords)
- Recommended action plan

## Resources

### references/

Detailed reference materials for classification rules and scoring algorithms:

- **classification-rules.md** - Complete decision trees, edge cases, and classification examples
- **scoring-formulas.md** - Detailed mathematical formulas and calculation examples
- **competitor-analysis.md** - Competitor analysis strategies and frameworks

### scripts/

Utility scripts for keyword processing:

- **analyze_keywords.py** - Batch keyword analysis script
- **calculate_scores.py** - Score calculation utilities

### assets/

Not needed for this skill. Delete the assets/ directory.

## Usage Examples

### Example 1: Single Keyword Analysis

**User Request:**
"Analyze the keyword 'create logo free' and tell me what type of page to create"

**Process:**
1. Identify keyword triggers: "create" (verb), "free" (modifier)
2. Classify as "create" type (verb-first pattern)
3. Calculate scores based on search volume and KD
4. Provide recommendation

**Output:**
```
Classification: Create
Confidence: 0.95
Priority: P0
Value Score: 1570.35
Recommendation: Create a "Create" page with free logo maker tool
```

### Example 2: Batch Analysis

**User Request:**
"Analyze these 100 keywords from the uploaded file and prioritize them"

**Process:**
1. Load keyword data
2. Batch process all keywords
3. Sort by priority score
4. Group by page type
5. Generate report

**Output:**
```
Total Keywords: 100
- P0: 15 keywords (immediate action)
- P1: 35 keywords (high priority)
- P2: 40 keywords (medium priority)
- P3: 10 keywords (low priority)

By Type:
- Create: 30 keywords
- Tool: 25 keywords
- Templates: 20 keywords
- Blog: 25 keywords

Top 5 Opportunities:
1. "free logo maker" - P0, Create, Score: 1570
2. "design poster online" - P0, Create, Score: 410
...
```

### Example 3: Competitor Analysis

**User Request:**
"Show me which Canva keywords have the highest opportunity"

**Process:**
1. Filter keywords with source_url = "canva.com"
2. Sort by traffic_contribution
3. Calculate opportunity score
4. Recommend targeting strategy

**Output:**
```
Canva Keywords Analysis:
Total: 45 keywords
Total Traffic: 125,000/month

Top Opportunities:
1. "design poster online" - 3,500 traffic, P0
2. "create infographic free" - 2,800 traffic, P0
3. "logo maker online" - 2,100 traffic, P1

Strategy: Focus on P0 keywords with differentiated features
```

## Special Considerations

### Brand Keywords

Keywords containing competitor brand names (e.g., "canva alternative"):
- Apply 0.8 multiplier to base priority
- Add brand opportunity bonus (+10-15 points)
- Emphasize differentiation in recommendations

### Long-tail Keywords

Keywords with 4+ words:
- Apply 0.7 multiplier to base priority
- Add long-tail bonus for low competition (+5-10 points)
- Ideal for blog content batch creation

### Trend-based Adjustments

When search trend data available:
- Rising trend (>20% growth): 1.3× multiplier
- Stable trend (-10% to +10%): 1.0× multiplier
- Declining trend (<-10%): 0.7× multiplier

## Validation and Quality Control

Before finalizing classifications:

1. **Logic Check**: Does classification match user intent?
2. **Competition Check**: Can we compete with this keyword?
3. **Value Check**: Does ROI justify the effort?
4. **Consistency Check**: Similar keywords classified similarly?

For low-confidence classifications (<0.7):
- Flag for human review
- Provide 2-3 alternative classifications
- Explain reasoning for each option
