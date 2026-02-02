# Keyword Analysis Guide

## Interpreting Keyword Group Data

A keyword group is a set of related keywords that share the same user intent and should be served by a single landing page.

### Input Fields

| Field | Description | Usage |
|-------|-------------|-------|
| keyword | The search term | Primary content targeting |
| search_volume | Monthly searches | Prioritization — higher volume = more important |
| KD (Keyword Difficulty) | 0-100 competition score | Feasibility — lower = easier to rank |
| CPC | Cost per click ($) | Commercial intent indicator — higher CPC = more valuable |
| trend | Search trend direction | Timeliness — rising trends get priority |
| source_url | Competitor page ranking for this keyword | Competitive research input |
| traffic_contribution | % of traffic this keyword drives to the competitor | Importance weighting |

### Identifying Primary vs Secondary Keywords

**Primary keyword** (1 per page):
- Highest search_volume in the group
- Best represents the overall intent
- Used in: H1, meta title, URL slug, first paragraph

**Secondary keywords** (2-5 per page):
- Related terms with meaningful search volume
- Include synonyms, long-tail variations, and adjacent terms
- Used in: H2 headings, subtitle, meta description, body copy

**Long-tail keywords** (5-15 per page):
- Lower volume, more specific queries
- Often question-based ("how to make a game with AI")
- Used in: Quick start titles, FAQ questions, feature descriptions

### Determining Search Intent

Map keyword patterns to intent types:

| Pattern | Intent | Example |
|---------|--------|---------|
| "[noun] maker/generator/creator/builder" | Tool-seeking | "AI game maker" |
| "how to [verb]" | Educational/Tutorial | "how to make a game with AI" |
| "best [noun] tool" | Comparison | "best AI game generator" |
| "[product] vs [product]" | Comparison | "SEELE AI vs Unity" |
| "[noun] template/example" | Quick-start | "AI game template" |
| "[verb] [noun] online/free" | Immediate action | "create game online free" |

### Value Score Calculation

Prioritize keywords by value score:

```
Value Score = (search_volume / (KD + 1)) × Intent_Multiplier
```

Intent multipliers:
- Tool-seeking: 1.5 (highest conversion potential)
- Immediate action: 1.3
- Comparison: 1.1
- Educational: 0.8
- Informational: 0.6
