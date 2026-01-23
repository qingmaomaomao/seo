# Scoring Formulas Reference

## Value Score

### Formula
```
Value Score = (Search Volume / (KD + 1)) × Intent Multiplier
```

### Intent Multipliers
- **Transactional**: 1.5 (user ready to act)
- **Informational**: 1.0 (user researching)
- **Navigational**: 1.2 (user looking for specific destination)

### Examples

**Example 1: High-value transactional keyword**
```
Keyword: "create poster online"
Search Volume: 10,000
KD: 35.5
Intent: Transactional

Value Score = 10,000 / (35.5 + 1) × 1.5
           = 10,000 / 36.5 × 1.5
           = 273.97 × 1.5
           = 410.96
```

**Example 2: Informational keyword**
```
Keyword: "how to design poster"
Search Volume: 5,000
KD: 20
Intent: Informational

Value Score = 5,000 / (20 + 1) × 1.0
           = 5,000 / 21
           = 238.10
```

## Competition Index

### Formula
```
Competition Index = ((100 - KD) / 100) × Competitor Factor
```

### Competitor Factors
- High traffic (>5000): 1.5
- Medium traffic (2000-5000): 1.2
- Low traffic (500-2000): 1.0
- No data: 0.8

### Examples

**Example 1: With traffic data**
```
Keyword: "design poster online"
KD: 35.5
Traffic Contribution: 3,500

Competitor Factor: 1.2 (medium traffic)
Competition Index = (100 - 35.5) / 100 × 1.2
                  = 64.5 / 100 × 1.2
                  = 0.645 × 1.2
                  = 0.774 (77.4%)
```

**Example 2: No traffic data**
```
Keyword: "create infographic tool"
KD: 45
Traffic Contribution: null

Competitor Factor: 0.8 (no data)
Competition Index = (100 - 45) / 100 × 0.8
                  = 55 / 100 × 0.8
                  = 0.44 (44%)
```

## Traffic Potential

### Formula
```
Traffic Potential = Search Volume × CTR × Conversion Rate × Competition Index
```

### CTR by Position
- Position 1: 28.5%
- Position 2: 15.7%
- Position 3: 11.0%
- Position 4-5: 8.0%
- Position 6-10: 3.5%

### Assumed Position
- New page: Position 5-8 (CTR: 5%)
- Optimized page: Position 2-4 (CTR: 12%)
- Authority page: Position 1-2 (CTR: 22%)

### Conversion Rates by Type
- Create: 3-5% (avg: 4%)
- Tool: 2-4% (avg: 3%)
- Templates: 4-6% (avg: 5%)
- Blog: 1-2% (avg: 1.5%)

### Example

```
Keyword: "design poster online"
Search Volume: 10,000
Assumed Position: 5 (CTR: 8%)
Type: Create (Conversion: 4%)
Competition Index: 0.774

Traffic Potential = 10,000 × 0.08 × 0.04 × 0.774
                  = 24.77 conversions/month
```

## Priority Score

### Formula
```
Priority Score = (
    Value Score × 0.35 +
    Competition Index × 100 × 0.25 +
    Traffic Potential × 0.20 +
    ROI Score × 0.20
) / 4
```

### Weight Distribution
- Value Score: 35% (most important)
- Competition Index: 25% (feasibility)
- Traffic Potential: 20% (expected results)
- ROI Score: 20% (business value)

### Example Calculation

```
Keyword: "design poster online"

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

**Priority Level: P0** (>70, immediate action)

## ROI Estimation

### Cost Breakdown

**Page Development:**
- Create: $800-1,200 (includes tool dev)
- Tool: $600-1,000
- Templates: $400-600 (template acquisition)
- Blog: $200-400 (content creation)

**SEO Costs:**
- Link building: $200-500
- Content optimization: $100-200
- Technical SEO: $100-300

### Revenue Calculation

```
Annual Revenue = Monthly Traffic × Conversion Rate × AOV × 12

AOV (Average Order Value):
- Freemium to Premium: $20-50
- Direct Sale: $30-100
- Subscription: $10-30/month
```

### ROI Formula

```
ROI = ((Annual Revenue - Total Cost) / Total Cost) × 100%
```

### Example

```
Keyword: "design poster online"

Monthly Traffic: 800 visits
Conversion Rate: 4%
AOV: $30
Total Cost: $1,500

Annual Revenue = 800 × 0.04 × $30 × 12
              = 32 × $30 × 12
              = $11,520

ROI = ($11,520 - $1,500) / $1,500 × 100%
    = $10,020 / $1,500 × 100%
    = 668%
```

## Adjustments and Multipliers

### Brand Keywords

```
Adjusted Priority = Base Priority × 0.8 + Brand Bonus

Brand Bonus:
- High volume (>10k): +15
- Medium volume (5k-10k): +10
- Low volume (<5k): +5
```

### Long-tail Keywords

```
Adjusted Priority = Base Priority × 0.7 + Long-tail Bonus

Long-tail Bonus:
- Very low KD (<20): +10
- Low KD (20-40): +5
- Medium KD (>40): +2
```

### Trend Multipliers

```
Trend-adjusted Value = Base Value × Trend Multiplier

Multipliers:
- Rising (>20% growth): 1.3
- Stable (-10% to +10%): 1.0
- Declining (<-10%): 0.7
```

## Quick Reference Table

| Priority Level | Score Range | Action Timeline |
|----------------|-------------|-----------------|
| P0 | >70 | Immediate |
| P1 | 50-70 | 1-2 weeks |
| P2 | 30-50 | 1 month |
| P3 | <30 | Schedule/deprioritize |

| Value Score | Category |
|-------------|----------|
| >300 | High value |
| 100-300 | Medium value |
| <100 | Low value |

| Competition Index | Competitiveness |
|-------------------|-----------------|
| >0.7 | Strong |
| 0.4-0.7 | Moderate |
| <0.4 | Weak |

| ROI | Assessment |
|-----|------------|
| >500% | Excellent |
| 200-500% | Good |
| 100-200% | Fair |
| <100% | Poor |
