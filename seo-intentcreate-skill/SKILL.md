---
name: seo-intentcreate-skill
description: Generate SEO-optimized content for SEELE AI "Create" landing pages. Use this skill when given SEO keyword data (keywords, search volume, KD, competitor URLs) and a target HTML file path. The agent reads the template HTML, generates intent-aligned content for each page module, modifies only the text content in the file, then calls the submit tool to complete.
---

# SEO Intent Create Page Generator

Generate intent-specific landing page content for SEELE AI that matches user search intent and maximizes SEO performance.

## Context

SEELE AI is a game-generation large model capable of creating games, interactive content, websites, and more. Different users search with different product definitions:

- AI Game Maker / AI Game Generator
- AI Code Generator / Vibe Coding Tool
- AI Website Builder / AI Web App Builder
- AI Portfolio Maker / Landing Page Templates
- Three.js Editor
- ...and more

Each keyword intent needs a dedicated "Create" landing page with content tailored to that specific search intent, while the underlying product (SEELE AI) remains the same.

## Workflow

```
1. Receive Input
   ├── Keyword group data (keywords + metrics)
   ├── Competitor URLs (optional)
   └── Target HTML file path

2. Read Target File
   └── Read the HTML template file from the provided path

3. Analyze Keywords & Intent
   ├── Identify primary keyword (highest value)
   ├── Identify secondary keywords
   ├── Determine user intent category
   └── Extract long-tail keyword opportunities

4. Generate Content for Each Module
   ├── Module 1: Hero (H1 + subtitle)
   ├── Module 3: Quick Start options
   ├── Module 4: Core Features
   ├── Module 5: Comparison table
   ├── Module 6: Target audience
   └── Module 7: FAQ

5. Modify HTML File
   └── Replace text content only (preserve HTML structure and styling)

6. Submit
   └── Call the "提交" tool to finalize the page
```

## Input Specification

```yaml
keyword_group:
  primary: "AI Game Maker"  # Main target keyword
  secondary:
    - keyword: "ai game creator"
      search_volume: 2400
      kd: 35
    - keyword: "make games with ai"
      search_volume: 1800
      kd: 28

competitor_urls:  # Optional, for comparison module
  - "https://competitor1.com/ai-game-maker"
  - "https://competitor2.com/game-generator"

target_file: "/path/to/page.html"  # HTML file to modify
```

## Page Modules

Each Create page consists of 7 modules. Module 2 is fixed product UI — skip it.

### Module 1: Hero Title & Subtitle

The first impression. Must capture search intent and communicate value instantly.

**Content to generate:**
- H1 title (≤60 chars, primary keyword at/near beginning)
- Subtitle (≤160 chars, include secondary keyword, state value proposition)
- Meta title (for `<title>` tag)
- Meta description (for `<meta name="description">`)

**SEO requirements:**
- Primary keyword in H1, ideally within first 3 words
- Secondary keyword in subtitle
- Meta title format: `[Primary Keyword] - [Value Prop] | SEELE AI`

See [references/page-modules.md](references/page-modules.md) for title formulas and examples.

### Module 2: Generation Action Block

**SKIP** — This is fixed product UI. Do not modify.

### Module 3: Quick Start Options

Entry points that align with the current keyword theme, designed to capture long-tail traffic and provide immediate value.

**Content to generate:**
- 6-12 quick start cards
- Each card: title, description (1 sentence), CTA text
- Titles should include long-tail keyword variations

**SEO requirements:**
- Each title targets a specific long-tail query
- Cover diverse sub-intents within the main keyword theme
- Use action verbs that match search intent ("Create a...", "Build your...", "Generate...")

**Example for "AI Game Maker":**
```
- "Create a Platformer Game" — Build classic jump-and-run gameplay in minutes → Start Creating
- "Make an RPG Adventure" — Design story-driven games with AI assistance → Try Now
- "Build a Puzzle Game" — Generate brain-teasing mechanics instantly → Get Started
```

See [references/page-modules.md](references/page-modules.md) for patterns by keyword category.

### Module 4: Core Features

Product features framed from the current keyword perspective. Each feature connects SEELE AI capabilities to user needs for this specific intent.

**Content to generate:**
- 3-6 features
- Each feature: title, description (2-3 sentences), CTA text
- Feature images: generate using image generation tool, or specify image requirements

**SEO requirements:**
- Include relevant keywords naturally in titles and descriptions
- Frame features in terms of user benefits, not technical specs
- Each description should include at least one keyword variation

**Content framing:**
- For "AI Game Maker": emphasize game creation, no-code, quick results
- For "Website Builder": emphasize web design, responsive, deployment
- For "Code Generator": emphasize code output, customization, technical control

See [references/page-modules.md](references/page-modules.md) for feature framing strategies.

### Module 5: Comparison Section

Position SEELE AI favorably against competitors. Build trust through transparent comparison.

**Content to generate:**
- Section title + subtitle
- Comparison table (SEELE AI vs 2-3 competitors)
- 5-8 comparison dimensions relevant to the keyword intent
- Below-table summary or CTA

**SEO requirements:**
- Title should include "[Primary Keyword]: SEELE AI vs [Competitors]" pattern
- Comparison dimensions should align with what users search for when comparing tools

**If competitor URLs provided:**
1. Analyze competitor pages for positioning and feature claims
2. Identify SEELE AI advantages
3. Select comparison dimensions that highlight these advantages

See [references/competitor-analysis.md](references/competitor-analysis.md) for analysis framework.

### Module 6: Target Audience

Define who this page is for. Strategic opportunity to embed expanded search terms.

**Content to generate:**
- 3-5 user personas
- Each persona: title, description, common search terms they use, CTA

**SEO requirements:**
- Persona descriptions should naturally include long-tail keywords
- Search terms listed should be actual queries users make
- Connect each persona's needs to SEELE AI's capabilities

**Example personas for "AI Game Maker":**
```
- "Indie Game Developers" — Solo creators who want to prototype quickly
- "Educators & Students" — Teaching game design or learning to code
- "Content Creators" — YouTubers and streamers making interactive content
- "Hobbyists" — People who want to make games for fun, no experience needed
```

See [references/page-modules.md](references/page-modules.md) for persona patterns.

### Module 7: FAQ

Answer real user questions. Prime opportunity for featured snippets and long-tail ranking.

**Content to generate:**
- 5-8 FAQ items
- Each item: question, answer (2-4 sentences)

**SEO requirements:**
- Questions should mirror actual search queries ("How do I...", "What is...", "Can I...")
- Include primary keyword in at least 3 questions
- First sentence of each answer should be direct and complete (featured snippet format)
- Answers should naturally embed secondary keywords

**Question sources:**
- "People Also Ask" patterns for the primary keyword
- Common objections or concerns for this product category
- "How to" and "What is" queries related to the intent

See [references/seo-optimization.md](references/seo-optimization.md) for FAQ schema markup and optimization.

## SEO Guidelines Summary

| Element | Requirement |
|---------|-------------|
| Primary keyword | 3-5 times per 500 words, in H1, meta title, first paragraph |
| H-tag hierarchy | One H1, H2 for each module, H3 within modules |
| Long-tail coverage | Each module targets 1-2 long-tail variations |
| Meta title | ≤60 chars, primary keyword + value prop |
| Meta description | ≤160 chars, primary + secondary keyword, CTA |
| Internal links | 2+ links to related SEELE AI pages |

See [references/seo-optimization.md](references/seo-optimization.md) for complete guidelines.

## File Modification Rules

When modifying the target HTML file:

1. **DO modify:**
   - Text content (headings, paragraphs, list items, button text)
   - Alt text for images
   - Meta tags content (title, description)

2. **DO NOT modify:**
   - HTML structure and tags
   - CSS classes and styles
   - JavaScript code
   - Layout and component structure

3. **Identify content slots:**
   - Look for placeholder text patterns in the template
   - Replace only the placeholder content, preserve surrounding markup

## Resources

### references/

- **[keyword-analysis.md](references/keyword-analysis.md)** — How to analyze keyword data, identify intent, calculate keyword value, and prioritize keywords
- **[page-modules.md](references/page-modules.md)** — Detailed content specifications for each module: title formulas, quick start patterns, feature framing, persona templates
- **[seo-optimization.md](references/seo-optimization.md)** — Complete SEO rules: keyword placement, meta tags, heading hierarchy, FAQ schema, quality checklist
- **[competitor-analysis.md](references/competitor-analysis.md)** — Framework for analyzing competitor pages and building comparison positioning
