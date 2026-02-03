# Keyword Analysis Guide

How to analyze keyword data, identify intent, and prioritize keywords for Create page content generation.

---

## Keyword Group Structure

A keyword group is a set of related keywords that share the same user intent and should be served by a single landing page.

### Input Data Fields

| Field | Description | Usage |
|-------|-------------|-------|
| keyword | The search term | Primary content targeting |
| search_volume | Monthly searches | Prioritization — higher volume = more important |
| KD (Keyword Difficulty) | 0-100 competition score | Feasibility — lower = easier to rank |
| CPC | Cost per click ($) | Commercial intent indicator — higher CPC = more valuable |
| trend | Search trend direction | Timeliness — rising trends get priority |
| source_url | Competitor page ranking for this keyword | Competitive research input |
| traffic_contribution | % of traffic this keyword drives to competitor | Importance weighting |

---

## Keyword Classification

### Primary Keyword (1 per page)

The main keyword the entire page targets.

**Selection criteria:**
- Highest search_volume in the group
- Best represents the overall intent
- Reasonable KD (not too competitive for your domain authority)

**Usage locations:**
- H1 title (within first 3 words)
- Meta title (at the beginning)
- URL slug
- First paragraph (first 100 words)
- At least one H2

### Secondary Keywords (2-5 per page)

Related terms that support the primary keyword.

**Selection criteria:**
- Meaningful search volume (typically 30%+ of primary)
- Semantic relationship to primary keyword
- Different angles on the same intent

**Usage locations:**
- Subtitle
- Meta description
- H2 headings
- Feature titles
- Body copy

### Long-tail Keywords (5-15 per page)

Specific, lower-volume queries that capture niche traffic.

**Selection criteria:**
- 3+ words in the query
- Question format or very specific intent
- Lower competition (easier wins)

**Usage locations:**
- Quick start card titles
- FAQ questions
- Feature descriptions
- Persona search term lists

---

## Intent Analysis

### Intent Types for Create Pages

| Pattern | Intent Type | Example | Content Approach |
|---------|------------|---------|------------------|
| "[noun] maker/generator/creator/builder" | Tool-seeking | "AI game maker" | Emphasize the tool, quick results |
| "how to [verb]" | Tutorial | "how to make a game with AI" | Step-by-step, educational |
| "best [noun] tool" | Comparison | "best AI game generator" | Competitive positioning |
| "[product] vs [product]" | Versus | "SEELE AI vs Unity" | Direct comparison |
| "[verb] [noun] online/free" | Immediate action | "create game online free" | Low friction, quick start |
| "[noun] for [audience]" | Audience-specific | "game maker for kids" | Persona-focused messaging |

### Intent → Content Mapping

| Intent Type | H1 Emphasis | Quick Starts | Features | FAQ Focus |
|-------------|-------------|--------------|----------|-----------|
| Tool-seeking | "[Keyword] - [Outcome]" | Specific outputs | Capabilities | How it works |
| Tutorial | "How to [Verb] with [Product]" | Step-by-step entries | Process flow | Prerequisites |
| Comparison | "[Product]: The Best [Keyword]" | Unique differentiators | Comparison points | Why choose us |
| Immediate action | "Free [Keyword] - Start Now" | Fastest paths | Speed, simplicity | Is it free? |

---

## Value Score Calculation

Prioritize keywords by calculating value score:

```
Value Score = (search_volume / (KD + 1)) × Intent_Multiplier
```

### Intent Multipliers

| Intent Type | Multiplier | Rationale |
|-------------|------------|-----------|
| Tool-seeking | 1.5 | Highest conversion potential |
| Immediate action | 1.3 | Ready to use now |
| Comparison | 1.1 | Evaluating options |
| Audience-specific | 1.0 | Baseline |
| Tutorial | 0.8 | May be learning, not buying |
| Informational | 0.6 | Lowest conversion intent |

### Example Calculation

```
Keyword: "AI game maker"
Search Volume: 5000
KD: 45
Intent: Tool-seeking (multiplier: 1.5)

Value Score = (5000 / (45 + 1)) × 1.5 = 163

Keyword: "what is an AI game maker"
Search Volume: 800
KD: 20
Intent: Informational (multiplier: 0.6)

Value Score = (800 / (20 + 1)) × 0.6 = 23

→ "AI game maker" is 7x more valuable as primary keyword
```

---

## Long-tail Expansion

### Expansion Patterns

From the primary keyword, systematically generate long-tail variations:

| Pattern | Formula | Examples from "AI game maker" |
|---------|---------|------------------------------|
| Modifier prefix | [modifier] + [keyword] | free AI game maker, best AI game maker, online AI game maker |
| Audience suffix | [keyword] + for [audience] | AI game maker for beginners, AI game maker for kids |
| Output suffix | [keyword] + [output type] | AI game maker 2D, AI game maker mobile, AI game maker RPG |
| Action reframe | [verb] + [noun] + with AI | create games with AI, build games using AI, make games with AI |
| Question form | how to + [verb] + with [keyword] | how to make a game with AI game maker |
| Comparison | [keyword] vs [alternative] | AI game maker vs Unity, AI game maker vs coding |

### Long-tail Placement Strategy

| Expansion Type | Best Placement |
|----------------|----------------|
| Modifier prefix | Meta description, H2 headings |
| Audience suffix | Target audience section (Module 6) |
| Output suffix | Quick start cards (Module 3) |
| Action reframe | First paragraph, subtitle |
| Question form | FAQ questions (Module 7) |
| Comparison | Comparison section title (Module 5) |

---

## Competitor URL Analysis

When `source_url` data is provided, extract:

1. **Positioning**: How do they frame the product?
2. **Keyword usage**: Which keywords appear in H1, meta tags?
3. **Content structure**: What sections do they include?
4. **Feature claims**: What capabilities do they highlight?
5. **Gaps**: What do they NOT cover that SEELE AI can?

Use these insights to:
- Differentiate SEELE AI positioning
- Identify underserved long-tail keywords
- Build comparison section content
- Find content gaps to fill
