# SEO Optimization Rules

Complete SEO guidelines for Create landing pages.

---

## Keyword Placement Strategy

### Critical Placements (Must Include Primary Keyword)

| Location | Priority | Max Length | Notes |
|----------|----------|------------|-------|
| H1 tag | P0 | 60 chars | Place keyword within first 3 words |
| Meta title | P0 | 60 chars | Format: `[Primary KW] - [Value Prop] | SEELE AI` |
| Meta description | P0 | 160 chars | Include primary + 1 secondary keyword |
| URL slug | P0 | 5 words | Lowercase, hyphenated: `/ai-game-maker` |
| First paragraph | P0 | — | Within first 100 words of visible content |
| At least one H2 | P1 | — | Use secondary keyword variation |

### Secondary Placements (Include Where Natural)

- Image alt text (1-2 instances)
- Quick start card titles (long-tail variations)
- Feature section titles
- FAQ questions (3+ instances)
- Internal anchor text

### Keyword Density Rules

- Primary keyword: 3-5 occurrences per 500 words
- Secondary keywords: 1-2 occurrences each per 500 words
- Never force keywords — readability always wins
- Use natural variations (plural, verb form, reordered)

---

## H-Tag Hierarchy

Every page must follow this structure:

```
H1: [Primary keyword + value prop] (exactly ONE per page)
│
├── H2: Quick Start / Get Started with [keyword] (Module 3)
│
├── H2: Features / Why Choose [product] for [keyword] (Module 4)
│   ├── H3: [Feature 1 title]
│   ├── H3: [Feature 2 title]
│   └── H3: [Feature 3 title]
│
├── H2: [Product] vs Competitors / Compare [keyword] Tools (Module 5)
│
├── H2: Who Uses [Product] for [keyword] (Module 6)
│   ├── H3: [Persona 1]
│   ├── H3: [Persona 2]
│   └── H3: [Persona 3]
│
└── H2: [Primary Keyword] FAQ / Frequently Asked Questions (Module 7)
```

---

## Meta Tags

### Title Tag Formula

```
[Primary Keyword] - [Unique Value Prop] | SEELE AI
```

**Rules:**
- Keep under 60 characters (Google truncates at ~60)
- Primary keyword at the beginning
- Brand name at the end

**Examples:**
- `AI Game Maker - Create Games in Minutes | SEELE AI`
- `AI Website Builder - Build Sites with AI | SEELE AI`
- `AI Code Generator - Generate Code Instantly | SEELE AI`

### Meta Description Formula

```
[Action verb] [primary keyword context] with SEELE AI. [Key benefit]. [Secondary keyword inclusion]. [CTA].
```

**Rules:**
- Keep under 160 characters
- Include primary keyword once, secondary keyword once
- End with a call-to-action

**Examples:**
```
Create games with AI using SEELE AI's game maker. Build playable 2D and 3D games from text descriptions. No coding required. Try free today.
```

### Open Graph Tags

Include for social sharing:

```html
<meta property="og:title" content="[Same as title tag]">
<meta property="og:description" content="[Same as meta description]">
<meta property="og:type" content="website">
<meta property="og:url" content="https://seele.ai/[slug]">
<meta property="og:image" content="[Hero image URL, 1200x630px recommended]">
```

---

## FAQ Schema Markup

Every FAQ section must be structured for schema.org FAQPage markup:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is an AI game maker?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An AI game maker is a tool that uses artificial intelligence to generate playable games from text descriptions. With tools like SEELE AI, you describe your game idea and the AI creates the code, graphics, and mechanics automatically."
      }
    },
    {
      "@type": "Question",
      "name": "How do I make a game with AI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To make a game with AI, describe your game idea in plain text, including the genre, mechanics, and style you want. SEELE AI processes your description and generates a playable game in minutes. No coding or game development experience is required."
      }
    }
  ]
}
```

### FAQ Writing Rules

1. **Questions**: Use actual search query patterns — mirror "People Also Ask"
2. **First sentence**: Direct, complete answer (featured snippet target)
3. **Keyword inclusion**: Primary keyword in at least 3 questions
4. **Length**: 2-4 sentences per answer, 40-60 words optimal for snippets
5. **Variations**: Use different keyword forms across questions

---

## Long-tail Keyword Strategy

### Why Long-tail Matters

- Less competition, easier to rank
- Higher intent, better conversion
- More total traffic when aggregated

### Coverage Targets by Module

| Module | Long-tail Target | How to Embed |
|--------|-----------------|--------------|
| Module 3 (Quick Start) | 6-12 variations | Card titles ("Create a Platformer Game") |
| Module 4 (Features) | 3-6 variations | Feature titles and descriptions |
| Module 6 (Audience) | 9-15 variations | Persona search terms lists |
| Module 7 (FAQ) | 5-8 variations | Question phrasing |

### Long-tail Generation Patterns

From a primary keyword like "AI game maker", expand:

| Pattern | Examples |
|---------|----------|
| Modifier + keyword | "free AI game maker", "best AI game maker", "online AI game maker" |
| Keyword + context | "AI game maker for beginners", "AI game maker no coding" |
| Action + keyword | "create games with AI", "build games using AI", "make games with AI" |
| Keyword + output | "AI game maker 2D", "AI game maker mobile games", "AI multiplayer game maker" |
| Keyword + comparison | "AI game maker vs Unity", "AI game maker vs GameMaker" |

---

## Internal Linking

### Requirements

- Minimum 2 internal links per Create page
- Link to related SEELE AI pages (other Create pages, features, pricing)

### Anchor Text Rules

- Use descriptive, keyword-rich anchor text
- Vary anchor text across links (don't repeat exact phrases)
- Link naturally within content flow

**Example:**
```
If you're interested in web development, check out our [AI website builder](link)
for creating responsive sites, or explore our [AI code generator](link) for
full-stack development.
```

---

## Image Optimization

### Alt Text Rules

- Include keyword variation naturally
- Describe what the image shows
- Keep under 125 characters

**Example:**
```html
<img src="game-preview.png" alt="AI game maker interface showing a platformer game being created in SEELE AI">
```

### File Naming

- Use lowercase, hyphenated names
- Include keyword when relevant
- Example: `ai-game-maker-preview.png`

---

## Quality Checklist

Before finalizing a page, verify:

### Critical (Must Pass)
- [ ] Primary keyword in H1, title tag, meta description, URL, first paragraph
- [ ] Exactly one H1 tag on the page
- [ ] Meta title ≤60 characters
- [ ] Meta description ≤160 characters
- [ ] H2/H3 hierarchy is logical

### Important
- [ ] Keyword density is 3-5 per 500 words (not over-stuffed)
- [ ] At least 2 internal links to related SEELE AI pages
- [ ] Image alt text includes keyword variations
- [ ] FAQ section has 5+ questions with schema.org readiness
- [ ] Each module targets at least 1 long-tail keyword variation

### Final Review
- [ ] No duplicate content with other Create pages
- [ ] Content reads naturally — keyword usage doesn't feel forced
- [ ] All placeholder text has been replaced
- [ ] CTAs are clear and action-oriented
