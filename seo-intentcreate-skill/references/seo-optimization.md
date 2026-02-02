# SEO Optimization Rules

## Keyword Placement Strategy

### Critical Placements (Must Include Primary Keyword)

| Location | Priority | Max Length | Notes |
|----------|----------|------------|-------|
| H1 tag | P0 | 60 chars | Place keyword near the beginning |
| Meta title | P0 | 60 chars | Format: `[Primary KW] | [Value Prop] - SEELE AI` |
| Meta description | P0 | 160 chars | Include primary + 1 secondary keyword |
| URL slug | P0 | 5 words | Lowercase, hyphenated: `/ai-game-maker` |
| First paragraph | P0 | — | Within first 100 words of page |
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

## H-Tag Hierarchy

```
H1: [Primary keyword + value prop] (exactly ONE per page)
  H2: Quick Start / Get Started with [keyword] (Module 3)
  H2: Features / Why Choose [product] for [keyword intent] (Module 4)
  H2: [Product] vs Competitors (Module 5)
    H3: [Comparison dimension 1]
    H3: [Comparison dimension 2]
  H2: Who Uses [Product] as [keyword] (Module 6)
    H3: [Persona 1]
    H3: [Persona 2]
  H2: [Primary Keyword] FAQ (Module 7)
```

## Meta Tags

### Title Tag Formula

```
[Primary Keyword] | [Unique Value Prop] - SEELE AI
```

Examples:
- `AI Game Maker | Create Playable Games Instantly - SEELE AI`
- `AI Website Builder | Build Sites with AI - SEELE AI`

### Meta Description Formula

```
[Action verb] [primary keyword context] with SEELE AI. [Key benefit]. [Secondary keyword inclusion]. [CTA].
```

Examples:
- `Create games with AI using SEELE AI's game maker. Build playable 2D and 3D games from text descriptions. No coding needed. Try free today.`

### Open Graph Tags

```html
<meta property="og:title" content="[Same as title tag]">
<meta property="og:description" content="[Same as meta description]">
<meta property="og:type" content="website">
<meta property="og:url" content="https://seele.ai/[slug]">
<meta property="og:image" content="[Page hero image URL]">
```

## FAQ Schema Markup

Every FAQ section must be ready for schema.org FAQPage markup:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question text]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer text]"
      }
    }
  ]
}
```

### FAQ Writing Rules

1. **Questions**: Use actual search queries — check "People Also Ask" patterns
2. **First sentence**: Direct answer (featured snippet target)
3. **Keyword inclusion**: Primary keyword in ≥3 questions
4. **Length**: 2-4 sentences per answer, 40-60 words optimal
5. **Variations**: Use different keyword forms in questions vs answers

### FAQ Question Patterns

| Pattern | Example |
|---------|---------|
| What is [keyword]? | What is an AI game maker? |
| How to [verb] with [keyword]? | How to make a game with AI? |
| Is [keyword] free? | Is SEELE AI game maker free? |
| [Keyword] vs [alternative]? | AI game maker vs coding from scratch? |
| Best [keyword] for [use case]? | Best AI game maker for beginners? |
| Can [keyword] [capability]? | Can AI game makers create 3D games? |

## Long-tail Keyword Strategy

### Coverage Targets

- Module 3 (Quick Start): 6-12 long-tail variations via card titles
- Module 4 (Features): 3-6 variations via feature titles
- Module 6 (Audience): 9-15 variations via persona search terms
- Module 7 (FAQ): 5-8 variations via question phrasing

### Long-tail Generation Patterns

From primary keyword, expand with:
- **Modifier + keyword**: "free AI game maker", "best AI game maker", "online AI game maker"
- **Keyword + context**: "AI game maker for beginners", "AI game maker no coding"
- **Action + keyword**: "create games with AI", "build games using AI", "make games AI"
- **Keyword + output**: "AI game maker 2D", "AI game maker mobile", "AI game maker multiplayer"

## Quality Checklist

Before finalizing a page, verify:

- [ ] Primary keyword in H1, title tag, meta description, URL, first paragraph
- [ ] Exactly one H1 tag on the page
- [ ] H2/H3 hierarchy is logical and includes keyword variations
- [ ] Keyword density is 3-5 per 500 words (not over-stuffed)
- [ ] Meta title ≤60 characters
- [ ] Meta description ≤160 characters
- [ ] At least 2 internal links to related SEELE AI pages
- [ ] Image alt text includes keyword variations
- [ ] FAQ section has ≥5 questions with schema.org readiness
- [ ] Each module targets at least 1 long-tail keyword variation
- [ ] No duplicate content with other Create pages
- [ ] Content reads naturally — keyword usage doesn't feel forced
