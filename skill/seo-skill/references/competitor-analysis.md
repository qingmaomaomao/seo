# Competitor Analysis Reference

## Overview

When `source_url` and `traffic_contribution` data is available, perform detailed competitive analysis to inform strategy.

## Analysis Framework

### 1. Competitor Identification

**From keyword data:**
```
source_url: "canva.com"
traffic_contribution: 3,500

Interpretation:
- Canva ranks for this keyword
- Captures 3,500 monthly visits from it
- Indicates strong positioning
```

**Common competitors in design space:**
- canva.com
- adobe.com
- figma.com
- venngage.com
- piktochart.com
- crello.com
- visme.com

### 2. Traffic Aggregation

**Group by source_url:**
```
Canva keywords analysis:
Total keywords: 45
Total traffic: 125,000/month
Average traffic/keyword: 2,778

Top traffic keywords:
1. "design poster online" - 3,500
2. "create infographic free" - 2,800
3. "logo maker online" - 2,100
```

### 3. Opportunity Scoring

**Formula:**
```
Opportunity Score = Traffic Contribution × (1 - KD/100) × Market Factor

Market Factors:
- Dominant player (>50% market share): 0.8
- Strong player (30-50%): 1.0
- Moderate player (10-30%): 1.2
- Weak player (<10%): 1.5
```

**Example:**
```
Keyword: "design poster online"
Traffic: 3,500
KD: 35.5
Canva market position: Strong (40%)

Opportunity = 3,500 × (1 - 35.5/100) × 1.0
           = 3,500 × 0.645 × 1.0
           = 2,257.5
```

## Competitive Strategies

### Strategy 1: Direct Competition

**When to use:**
- High-value keywords (value score >300)
- Moderate difficulty (KD 20-50)
- Strong traffic potential

**Approach:**
1. Match core features
2. Add unique differentiators
3. Superior user experience
4. Better pricing/value

**Example:**
```
Target: "create poster online" (Canva: 3,500 traffic)

Differentiation:
- AI-powered design suggestions ⭐
- More free templates (Canva limits to 250,000)
- Faster rendering
- No account required for basic features
- Better export quality
```

### Strategy 2: Feature Differentiation

**When to use:**
- Competitor has feature gaps
- Niche user needs unmet
- Technical advantages available

**Approach:**
1. Identify feature gaps
2. Build superior alternatives
3. Target specific user segments
4. Emphasize unique capabilities

**Example:**
```
Target: "logo generator with AI" (Adobe: 2,100 traffic)

Gaps in Adobe:
- Complex interface
- Requires account
- Limited AI features
- Expensive

Our advantages:
- Pure AI generation ⭐
- No account needed
- Free tier with full features
- Simple, focused interface
```

### Strategy 3: Long-tail Dominance

**When to use:**
- High competition on head terms
- Low KD long-tail opportunities
- Content-rich approach viable

**Approach:**
1. Target specific variations
2. Build comprehensive guides
3. Create specialized tools
4. Dominate niche searches

**Example:**
```
Instead of: "poster maker" (KD: 65)
Target these:
- "poster maker for students" (KD: 25)
- "scientific poster maker" (KD: 18)
- "event poster creator free" (KD: 22)
- "vintage poster generator" (KD: 20)
```

### Strategy 4: Alternative Positioning

**When to use:**
- Strong brand keywords available
- Users seeking alternatives
- Competitor has negative sentiment

**Approach:**
1. Target "[competitor] alternative" keywords
2. Comparison content
3. Migration guides
4. Feature comparison tables

**Example:**
```
Target keywords:
- "canva alternative free"
- "better than canva"
- "canva vs [our brand]"
- "switch from canva"

Content strategy:
- Honest comparison tables
- Migration guide: "Import from Canva"
- Feature gaps we fill
- Pricing advantages
```

## Competitive Intelligence

### Data Points to Track

**Per Competitor:**
```
1. Total keywords ranking for
2. Total estimated traffic
3. Average KD of their keywords
4. Top traffic keywords (top 10)
5. Market share estimate
6. Feature strengths/weaknesses
7. Pricing strategy
8. User sentiment
```

### Traffic Distribution Analysis

**Example analysis:**
```
Canva traffic distribution:
- Create keywords: 45,000 (36%)
- Tool keywords: 55,000 (44%)
- Template keywords: 20,000 (16%)
- Blog keywords: 5,000 (4%)

Insight: Canva strong in Tool and Create,
weaker in Templates. Opportunity!
```

### Gap Analysis

**Identify underserved areas:**
```
High search volume + Low competition from leaders = Opportunity

Example findings:
- "poster template for research" (volume: 2,400, leader traffic: 120)
- "poster maker API" (volume: 800, leader traffic: 40)
- "bulk poster generator" (volume: 600, leader traffic: 30)

Strategy: Build features targeting these gaps
```

## Prioritization Matrix

### Factor Scoring

| Factor | Weight | Canva | Adobe | Figma |
|--------|--------|-------|-------|-------|
| Traffic | 30% | 9 | 7 | 5 |
| Feature gaps | 25% | 6 | 4 | 8 |
| User sentiment | 20% | 7 | 5 | 8 |
| Technical advantage | 15% | 5 | 6 | 7 |
| Market opportunity | 10% | 8 | 6 | 7 |
| **Weighted Score** | | **7.25** | **5.75** | **6.75** |

**Interpretation:**
- Focus on Canva keywords (highest score)
- Secondary focus on Figma gaps
- Adobe less priority (mature, feature-complete)

## Action Plans

### For High-Traffic Keywords

**Template:**
```
Keyword: [keyword]
Competitor: [source]
Traffic: [traffic_contribution]
Current Strategy: [their approach]

Our Approach:
1. Feature parity: [list core features to match]
2. Differentiation: [our unique advantages]
3. Content strategy: [supporting content]
4. Technical approach: [how we'll build it]
5. Launch timeline: [P0/P1/P2]

Success Metrics:
- Target ranking: Top 3 within 6 months
- Target traffic: [traffic_contribution × 0.3]
- Conversion goal: [estimated conversions]
```

### Example Action Plan

```
Keyword: "design poster online"
Competitor: Canva
Traffic: 3,500/month
Current: Drag-and-drop editor, 250k templates

Our Approach:
1. Feature parity:
   - Drag-and-drop interface ✓
   - Template library (500k+ to beat Canva)
   - Export options (PNG, PDF, SVG)

2. Differentiation:
   ⭐ AI-powered design assistant
   ⭐ No account required
   ⭐ Faster performance (WebGL rendering)
   ⭐ Better free tier

3. Content strategy:
   - "Design Poster Online" landing page
   - Tutorial: "How to design a professional poster"
   - Comparison: "Canva vs [Brand]"

4. Technical:
   - React + WebGL canvas
   - AI model for suggestions
   - CDN for templates

5. Timeline: P0 (immediate start)

Success Metrics:
- Ranking: Top 3 in 6 months
- Traffic: 1,000/month (30% of Canva)
- Conversions: 40/month (4% CR)
```

## Monitoring and Iteration

### Track Competitor Changes

**Monthly checks:**
1. New features launched
2. Ranking changes
3. Traffic shifts
4. Pricing updates
5. User feedback trends

### Adjust Strategy

**If competitor improves:**
- Reassess differentiation
- Enhance unique features
- Consider new angles

**If we gain traction:**
- Double down on working strategies
- Expand to related keywords
- Build on momentum

## Red Flags

**Avoid these mistakes:**

1. ❌ Copying without differentiation
2. ❌ Ignoring feature gaps
3. ❌ Targeting too-difficult keywords initially
4. ❌ Neglecting user experience
5. ❌ Competing on price alone

**Instead:**

1. ✅ Build meaningfully better
2. ✅ Focus on user pain points
3. ✅ Start with winnable battles
4. ✅ Deliver superior experience
5. ✅ Compete on unique value
