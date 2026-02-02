---
name: seo-intentcreate-skill
description: Generate SEO-optimized "Create" landing pages for SEELE AI based on keyword groups and competitor analysis. Use this skill when given a set of SEO keywords (with search volume, KD, competitor URLs, etc.) that target a specific product intent (e.g., "AI Game Maker", "AI Website Builder", "Vibe Coding Tool") and need to produce a complete landing page with hero section, quick starts, feature showcase, comparison table, target audience, and FAQ — all optimized for search engine ranking.
---

# SEO Intent Create Page Generator

Generate intent-specific landing pages for SEELE AI that match user search intent and maximize SEO performance.

## Context

SEELE AI is a game-generation large model capable of creating games, interactive content, websites, and more. Different users search with different product definitions (AI Game Maker, AI Code Generator, AI Website Builder, etc.). Each keyword group needs a dedicated "Create" landing page that:

- Targets the specific keyword intent
- Reuses the same core product (SEELE AI) with different positioning
- Maximizes SEO keyword density and long-tail coverage
- Drives conversions through intent-aligned CTAs

## Workflow

Generating a Create page involves these steps:

1. **Analyze keywords and intent** — Parse keyword group data, identify primary/secondary keywords, understand search intent
2. **Research competitors** — Analyze competitor landing pages from provided URLs, extract positioning patterns
3. **Generate page modules** — Produce content for each of the 7 page modules sequentially
4. **Apply HTML templates** — For modules 4 (features) and 5 (comparison), read the provided HTML template from assets/, modify only the copywriting, and output the complete code
5. **SEO quality check** — Verify keyword density, meta tags, schema markup readiness, and long-tail coverage

## Input Specification

The skill expects the following input data:

```
- keyword_group: Primary keyword + related keywords (e.g., "AI Game Maker", "ai game creator", "make games with ai")
- keyword_data: Per-keyword metrics (search_volume, KD, CPC, trend)
- competitor_urls: List of competitor landing page URLs for this intent
- product_angle: How SEELE AI maps to this keyword intent
```

## Page Modules

Each Create page consists of 7 modules, generated in order:

### Module 1: Hero Title & Subtitle

Generate a compelling H1 title and subtitle that:
- Place the primary keyword in the H1 (ideally at the beginning)
- Include a secondary keyword in the subtitle
- Communicate the core value proposition for this specific intent
- Keep H1 under 60 characters, subtitle under 160 characters

Output: `{ h1, subtitle, meta_title, meta_description }`

### Module 2: Generation Action Block

This module is a **fixed product component** — do not generate content for it. Skip and proceed to Module 3.

### Module 3: Quick Start Options

Generate 6-12 quick start cards that:
- Align with the current keyword theme (e.g., for "AI Game Maker" → "Make a Platformer", "Create an RPG", etc.)
- Each card has: title (include a long-tail keyword variation), description (1 sentence), CTA text
- Cover diverse sub-intents to capture long-tail search traffic
- Provide the fastest path for users to start experiencing the product from the current intent

Output: Array of `{ title, description, cta_text }`

See [references/page-modules.md](references/page-modules.md) for detailed quick start patterns.

### Module 4: Core Features Section

Showcase 3-6 product features framed from the current keyword perspective.

Each feature consists of:
- Feature image (generate using image generation tool)
- Feature title (include relevant keyword)
- Feature subtitle/description (2-3 sentences, SEO-conscious)
- CTA button text + link

**Implementation**: Read the HTML template from `assets/feature-section-template.html`, modify ONLY the text content (titles, descriptions, CTA text), and output the complete HTML. Do NOT modify the UI structure or styling.

### Module 5: Comparison Section

A comparison between SEELE AI and competitors, positioned favorably for SEELE.

Consists of:
- Section title + subtitle
- Comparison table (SEELE AI vs 2-3 competitors)
- Comparison dimensions should align with the keyword intent

**Implementation**: Read the HTML template from `assets/compare-section-template.html`, modify ONLY the text content, and output the complete HTML. Do NOT modify the UI structure or styling.

See [references/competitor-analysis.md](references/competitor-analysis.md) for comparison framing strategies.

### Module 6: Target Audience Section

Define 3-5 user persona groups relevant to this keyword intent:
- Each persona: title, description, common search terms they use
- Strategically embed expanded search terms and long-tail keywords in the descriptions
- Connect each persona to SEELE AI's capabilities

Output: Array of `{ persona_title, description, search_terms[], cta_text }`

### Module 7: FAQ Section

Generate 5-8 FAQ items that:
- Use actual search queries as questions (from "People Also Ask" style queries)
- Include the primary keyword in at least 3 questions
- Answers should be 2-4 sentences, naturally embedding secondary keywords
- Structure answers for featured snippet eligibility (clear, direct first sentence)
- Include schema.org FAQPage markup readiness

Output: Array of `{ question, answer }`

See [references/seo-optimization.md](references/seo-optimization.md) for FAQ SEO best practices.

## SEO Guidelines

- **Keyword density**: Primary keyword should appear 3-5 times per 500 words across the page
- **H-tag hierarchy**: One H1, multiple H2s (one per module), H3s within modules
- **Internal linking**: Include at least 2 internal links to related SEELE AI pages
- **Long-tail coverage**: Each module should target at least 1-2 long-tail keyword variations
- **Meta tags**: Generate title tag (≤60 chars), meta description (≤160 chars), include primary keyword in both

See [references/seo-optimization.md](references/seo-optimization.md) for comprehensive SEO rules.

## Output Format

For each page, produce these deliverables:

1. **Page metadata** — meta_title, meta_description, target_keywords, slug
2. **Module 1 output** — H1, subtitle text
3. **Module 3 output** — Quick start cards JSON
4. **Module 4 output** — Complete HTML with updated copy (from template)
5. **Module 5 output** — Complete HTML with updated copy (from template)
6. **Module 6 output** — Target audience personas JSON
7. **Module 7 output** — FAQ items JSON with schema.org markup

## Resources

### references/

- **[keyword-analysis.md](references/keyword-analysis.md)** — How to interpret keyword data, identify primary/secondary keywords, and determine search intent from a keyword group
- **[page-modules.md](references/page-modules.md)** — Detailed specification for each page module, including quick start patterns, feature framing, and audience segmentation strategies
- **[seo-optimization.md](references/seo-optimization.md)** — SEO rules for keyword placement, meta tags, FAQ schema markup, long-tail strategies, and quality checklist
- **[competitor-analysis.md](references/competitor-analysis.md)** — How to analyze competitor landing pages and build favorable comparison positioning

### assets/

HTML templates for modules that require template-based output. Read the template, modify only the text copy, output complete HTML.

- **feature-section-template.html** — Module 4 (Core Features) HTML template
- **compare-section-template.html** — Module 5 (Comparison) HTML template

These templates will be provided by the user. Placeholder files exist until the actual templates are supplied.
