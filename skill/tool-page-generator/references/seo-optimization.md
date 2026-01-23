# SEO Optimization Strategies

This document provides comprehensive SEO optimization guidelines, formulas, and checklists for tool landing pages.

## Meta Tags Optimization

### Title Tag Formula

**Structure:**
```
[Primary Keyword] - [Modifier] | [Brand Name]
```

**Character limits:** 50-60 characters (Google displays ~50-60 chars)

**Examples:**

```html
<!-- Single keyword, direct approach -->
<title>3D Model Generator - Free AI Tool | SEELE AI</title>

<!-- Multiple keywords, feature emphasis -->
<title>Text to 3D Converter - Create Models Instantly | SEELE AI</title>

<!-- Niche/specific approach -->
<title>Sprite Sheet Generator for Games - Free Tool | SEELE AI</title>

<!-- High KD keyword, differentiation -->
<title>AI 3D Generator - No Skills Required | SEELE AI</title>
```

**Modifiers to Use:**
- Free / Free Online
- AI / AI-Powered
- No Skills Required / Easy
- For [Use Case] (e.g., "for Games")
- Fast / Instant
- Online Tool
- Generator / Converter / Creator

**Title Tag Best Practices:**
- Primary keyword at the beginning (left-aligned)
- Include compelling modifier (benefit or differentiation)
- Brand name at end (after pipe or dash)
- Don't keyword stuff
- Make it click-worthy (not just SEO-optimized)

### Meta Description Formula

**Structure:**
```
[Action verb] [primary keyword] [benefit/feature]. [Secondary benefit]. [CTA with keyword].
```

**Character limits:** 150-160 characters (Google displays ~150-160 chars)

**Examples:**

```html
<!-- Generator tool -->
<meta name="description" content="Create 3D models from text with AI. Generate game-ready assets in seconds, no modeling experience needed. Try our free 3D model generator now.">

<!-- Converter tool -->
<meta name="description" content="Convert images to 3D models instantly with AI. Upload any image and get a downloadable 3D file in GLB, FBX, or OBJ format. Free online tool.">

<!-- Editor tool -->
<meta name="description" content="Edit sprite sheets online with our AI-powered tool. Adjust animations, resize frames, and export in any format. Free sprite sheet editor for game devs.">
```

**Meta Description Best Practices:**
- Include primary keyword naturally (ideally in first sentence)
- Focus on benefits and outcomes, not just features
- Include a clear call-to-action
- Use active voice and action verbs
- Don't duplicate title tag exactly
- Entice clicks (think of it as ad copy)

### Keywords Meta Tag

**Note:** Less important for modern SEO, but still used by some search engines.

```html
<meta name="keywords" content="3d model generator, ai 3d generator, text to 3d, 3d creator, free 3d tool, game asset generator">
```

**Guidelines:**
- 5-10 keywords/phrases
- Include primary, secondary, and long-tail variations
- Separate with commas
- Don't keyword stuff
- Use actual search terms (from keyword research)

## Open Graph Meta Tags

**Purpose:** Control how page appears when shared on social media (Facebook, LinkedIn, Discord, etc.)

### Complete OG Template

```html
<!-- Essential OG Tags -->
<meta property="og:title" content="3D Model Generator - Free AI Tool">
<meta property="og:description" content="Create game-ready 3D models from text descriptions in seconds. No 3D modeling experience required. Free online AI tool.">
<meta property="og:image" content="https://seeleai.com/assets/og-images/3d-generator-preview.jpg">
<meta property="og:url" content="https://seeleai.com/tools/3d-model-generator">
<meta property="og:type" content="website">

<!-- Additional OG Tags -->
<meta property="og:site_name" content="SEELE AI">
<meta property="og:locale" content="en_US">

<!-- Twitter Card Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="3D Model Generator - Free AI Tool">
<meta name="twitter:description" content="Create game-ready 3D models from text descriptions in seconds. Try our free AI-powered generator.">
<meta name="twitter:image" content="https://seeleai.com/assets/og-images/3d-generator-preview.jpg">
```

**OG Image Requirements:**
- Recommended size: 1200×630 pixels (1.91:1 ratio)
- Format: JPG or PNG
- File size: Under 8MB
- Content: Show the tool in action or example output
- Include text overlay with tool name (readable at small sizes)

## Schema.org Structured Data

### SoftwareApplication Schema

**Purpose:** Help search engines understand the tool and potentially show rich snippets.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SEELE AI 3D Model Generator",
  "description": "AI-powered 3D model generator that creates game-ready assets from text descriptions. Free online tool with commercial licensing.",
  "url": "https://seeleai.com/tools/3d-model-generator",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "Web browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "featureList": [
    "AI-powered 3D model generation",
    "Text to 3D conversion",
    "Multiple export formats (GLB, FBX, OBJ)",
    "Commercial license included",
    "Interactive 3D preview",
    "No installation required"
  ],
  "screenshot": "https://seeleai.com/assets/screenshots/3d-generator-tool.jpg",
  "author": {
    "@type": "Organization",
    "name": "SEELE AI",
    "url": "https://seeleai.com"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1247",
    "bestRating": "5",
    "worstRating": "1"
  }
}
</script>
```

**Note on ratings:** Only include aggregateRating if you have actual user ratings. Never fabricate data.

### FAQ Schema

**Purpose:** Increase chances of appearing in FAQ rich snippets in search results.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does the AI 3D model generator work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our AI analyzes your text description and generates a 3D model based on patterns learned from millions of 3D assets. The process typically takes 20-30 seconds and produces game-ready models in your chosen format."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use generated models in commercial games?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! All 3D models generated with our tool come with full commercial rights. You can use them in games, applications, or any project—even commercial ones—without additional licensing fees."
      }
    },
    {
      "@type": "Question",
      "name": "What file formats are supported?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can download models in GLB (recommended), FBX, or OBJ formats. These formats are compatible with Unity, Unreal Engine, Blender, and most 3D software used in game development."
      }
    }
  ]
}
</script>
```

**Best Practice:** Include 3-10 questions from your FAQ section in schema markup.

### HowTo Schema (Optional)

**Purpose:** Appear in "How to" rich snippets for process-oriented searches.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Generate 3D Models with AI",
  "description": "Step-by-step guide to creating 3D models from text using SEELE AI's generator",
  "totalTime": "PT2M",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Describe Your Model",
      "text": "Type a text description of what you want to create. Be as detailed or simple as you like—our AI understands natural language.",
      "position": 1
    },
    {
      "@type": "HowToStep",
      "name": "Customize Settings",
      "text": "Choose your preferred style (realistic, cartoon, low-poly) and adjust the complexity level. Select your output format (GLB, FBX, OBJ).",
      "position": 2
    },
    {
      "@type": "HowToStep",
      "name": "Generate & Download",
      "text": "Click generate and watch your 3D model come to life in seconds. Preview it in our interactive viewer, then download it for use in your project.",
      "position": 3
    }
  ]
}
</script>
```

## On-Page SEO Elements

### URL Structure

**Formula:**
```
https://[domain]/tools/[primary-keyword-slug]
```

**Examples:**
- ✅ `https://seeleai.com/tools/3d-model-generator`
- ✅ `https://seeleai.com/tools/text-to-3d`
- ✅ `https://seeleai.com/tools/sprite-sheet-generator`
- ❌ `https://seeleai.com/tool?id=123`
- ❌ `https://seeleai.com/3d_model_gen_tool`

**Best Practices:**
- Use hyphens, not underscores
- Lowercase only
- Include primary keyword
- Keep short (3-5 words max)
- Avoid unnecessary words (the, a, an, for)
- Match user search intent

### Heading Structure

**Semantic Hierarchy:**

```html
<h1>Primary Keyword - Tool Name</h1>
  <h2>Secondary Feature or Section</h2>
    <h3>Sub-point or Detail</h3>
  <h2>Another Major Section</h2>
    <h3>Detail 1</h3>
    <h3>Detail 2</h3>
```

**Example for 3D Generator:**

```html
<h1>AI 3D Model Generator</h1>

<h2>Why Use Our 3D Model Generator?</h2>
  <h3>AI-Powered Generation</h3>
  <h3>Game-Ready Exports</h3>
  <h3>Instant Preview</h3>

<h2>How It Works</h2>
  <h3>Step 1: Describe Your Model</h3>
  <h3>Step 2: Customize Settings</h3>
  <h3>Step 3: Generate & Download</h3>

<h2>Perfect For</h2>
  <h3>Game Developers</h3>
  <h3>3D Artists</h3>
  <h3>Content Creators</h3>

<h2>Example 3D Models</h2>

<h2>Related Tools</h2>

<h2>Frequently Asked Questions</h2>
  <h3>How does the AI 3D model generator work?</h3>
  <h3>Can I use generated models in commercial games?</h3>
```

**Heading Best Practices:**
- Only ONE H1 per page (the main title)
- Include primary keyword in H1
- Include secondary keywords in H2s naturally
- Use H2-H6 for semantic structure (not styling)
- Don't skip levels (H2 → H4 without H3)
- Make headings descriptive (not generic like "Introduction")

### Keyword Placement Strategy

**Priority Locations for Primary Keyword:**

1. **Title tag** (highest weight)
2. **H1 heading** (very high weight)
3. **First 100 words** (high weight)
4. **URL slug** (high weight)
5. **Meta description** (moderate weight)
6. **Image alt text** (moderate weight)
7. **H2 headings** (moderate weight - at least 1-2)
8. **Body content** (natural frequency - 1-2% density)
9. **Internal links** (anchor text)
10. **Schema markup** (name, description fields)

**Keyword Density Formula:**

```
Keyword Density = (Number of keyword appearances / Total words) × 100

Target: 1-2% for primary keyword
```

**Example:**
- Page length: 2,000 words
- Primary keyword: "3d model generator"
- Target appearances: 20-40 times
- Distribution: Title (1), H1 (1), H2s (2-3), Body (15-35), Alt text (1-2)

**Avoid:**
- Keyword stuffing (>3% density)
- Unnatural repetition
- Forcing keywords where they don't fit
- Exact-match overuse (use variations and synonyms)

### Image SEO

**Alt Text Formula:**

```
alt="[What's in image] - [Keyword context] - [Tool/brand name]"
```

**Examples:**

```html
<!-- Hero/feature images -->
<img src="3d-generator-interface.jpg"
     alt="AI 3D model generator interface showing text input and preview - SEELE AI tool">

<!-- Example outputs -->
<img src="robot-model-example.jpg"
     alt="3D robot model generated from text prompt - 3D model generator example">

<!-- Process screenshots -->
<img src="step-1-input.jpg"
     alt="Step 1 enter text prompt in 3D generator - how to use tool">

<!-- Related tool cards -->
<img src="sprite-generator-icon.jpg"
     alt="Sprite generator tool icon - create game sprites">
```

**Best Practices:**
- Every image must have alt text (accessibility + SEO)
- Include keyword naturally (don't stuff)
- Be descriptive (helps visually impaired users)
- Keep under 125 characters
- Don't start with "image of" or "picture of"

**File Naming:**

```
✅ 3d-model-generator-interface.jpg
✅ text-to-3d-example-robot.png
❌ IMG_1234.jpg
❌ screenshot-2024-01-15.png
```

### Internal Linking Strategy

**Anchor Text Formula:**

```
Link to [target page] with anchor text containing that page's target keyword
```

**Examples:**

```html
<!-- From 3D Generator page to Sprite Generator page -->
<p>
  Also check out our <a href="/tools/sprite-generator">sprite generator</a>
  to create 2D game characters.
</p>

<!-- From any tool page to main product -->
<p>
  Take your generated assets further with
  <a href="/game-builder">SEELE AI's game builder</a> to create complete games.
</p>

<!-- From blog/guide to tool page -->
<p>
  You can quickly prototype 3D assets using our
  <a href="/tools/3d-model-generator">AI 3D model generator</a> before
  finalizing designs.
</p>
```

**Internal Linking Guidelines:**
- 3-5 internal links per tool page (minimum)
- Link to related tools (horizontal linking)
- Link to main product/service (vertical linking)
- Use keyword-rich anchor text (not "click here")
- Open in same tab (keep users on site)
- Ensure bidirectional linking (if A→B, then B→A)

## Technical SEO Checklist

### Page Speed Optimization

**Target Metrics:**
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.5s

**Optimization Strategies:**

```html
<!-- Lazy load below-the-fold images -->
<img src="example.jpg" loading="lazy" alt="...">

<!-- Preload critical resources -->
<link rel="preload" href="/fonts/main-font.woff2" as="font" type="font/woff2" crossorigin>

<!-- Defer non-critical JavaScript -->
<script src="/js/analytics.js" defer></script>

<!-- Use modern image formats -->
<picture>
  <source srcset="hero.webp" type="image/webp">
  <source srcset="hero.jpg" type="image/jpeg">
  <img src="hero.jpg" alt="...">
</picture>

<!-- Minimize render-blocking CSS -->
<style>
  /* Critical CSS inlined */
  .hero { ... }
</style>
<link rel="preload" href="/css/non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### Mobile Responsiveness

**Viewport Configuration:**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Mobile-Friendly Checklist:**
- [ ] Text is readable without zooming (min 16px font size)
- [ ] Tap targets are at least 44×44 pixels
- [ ] Content fits screen width (no horizontal scrolling)
- [ ] Images scale responsively
- [ ] Forms are easy to fill on mobile
- [ ] No intrusive interstitials or popups
- [ ] Mobile navigation is accessible

### Semantic HTML

**Use proper HTML5 elements:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta tags -->
</head>
<body>
  <header>
    <nav><!-- Main navigation --></nav>
  </header>

  <main>
    <article>
      <h1>Tool Name</h1>

      <section class="hero">
        <!-- Hero content -->
      </section>

      <section class="features">
        <!-- Features -->
      </section>

      <!-- More sections -->
    </article>
  </main>

  <aside>
    <!-- Related tools, sidebar content -->
  </aside>

  <footer>
    <!-- Footer content -->
  </footer>
</body>
</html>
```

**Benefits:**
- Better accessibility (screen readers)
- Improved SEO (search engines understand structure)
- Easier maintenance

### Canonical URL

**Purpose:** Avoid duplicate content issues if page is accessible via multiple URLs.

```html
<link rel="canonical" href="https://seeleai.com/tools/3d-model-generator">
```

**When to Use:**
- If page has URL parameters (utm_source, etc.)
- If accessible via HTTP and HTTPS
- If accessible with/without www
- If accessible with trailing slash

### Robots Meta Tag

**Allow Indexing (default, can omit):**

```html
<meta name="robots" content="index, follow">
```

**Prevent Indexing (for staging/test pages):**

```html
<meta name="robots" content="noindex, nofollow">
```

## Content Quality Signals

### E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)

**For Tool Pages:**

**Experience:**
- Provide real examples of tool outputs
- Show actual use cases
- Include user testimonials (if available)

**Expertise:**
- Explain how the tool works
- Provide technical details when relevant
- Link to authoritative sources

**Authoritativeness:**
- Link from high-authority pages to tool page
- Get external backlinks (mentions in blogs, forums)
- Build topical authority (multiple related tools)

**Trustworthiness:**
- Be transparent about tool limitations
- Provide accurate information
- Include privacy policy, terms of service
- Use HTTPS
- Show contact information

### Content Freshness

**Update Signals:**
- Add new examples regularly
- Update FAQ with new questions
- Refresh statistics/data periodically
- Improve features list as tool evolves
- Add schema lastReviewed date

```html
<script type="application/ld+json">
{
  "@type": "SoftwareApplication",
  "datePublished": "2024-01-15",
  "dateModified": "2024-03-20",
  ...
}
</script>
```

## Local SEO (If Applicable)

**Only if targeting specific regions:**

```html
<!-- hreflang for international targeting -->
<link rel="alternate" hreflang="en" href="https://seeleai.com/tools/3d-generator">
<link rel="alternate" hreflang="es" href="https://seeleai.com/es/herramientas/generador-3d">
<link rel="alternate" hreflang="fr" href="https://seeleai.com/fr/outils/generateur-3d">
```

## SEO Validation Checklist

Before launching tool page:

### Meta Tags
- [ ] Title tag is 50-60 characters with primary keyword
- [ ] Meta description is 150-160 characters with CTA
- [ ] Keywords meta tag includes 5-10 relevant terms
- [ ] OG tags complete (title, description, image, url)
- [ ] Twitter card tags included
- [ ] OG image is 1200×630px and under 8MB

### Structured Data
- [ ] SoftwareApplication schema added and valid
- [ ] FAQ schema added for FAQ section
- [ ] Schema validated with Google's Rich Results Test
- [ ] No fabricated data (ratings, reviews)

### On-Page SEO
- [ ] URL is clean and includes primary keyword
- [ ] H1 contains primary keyword (only one H1)
- [ ] H2-H6 used in proper hierarchy
- [ ] Primary keyword in first 100 words
- [ ] Keyword density is 1-2%
- [ ] All images have descriptive alt text with keywords
- [ ] 3-5 internal links to related pages
- [ ] Anchor text is keyword-rich

### Technical SEO
- [ ] Page loads in under 3 seconds
- [ ] Mobile-responsive design
- [ ] No console errors
- [ ] HTTPS enabled
- [ ] Canonical URL set
- [ ] Proper semantic HTML (header, main, footer)
- [ ] Viewport meta tag configured
- [ ] Images lazy-loaded below fold

### Content Quality
- [ ] 1,500-2,500 words total
- [ ] Reading level: 8th-10th grade
- [ ] No spelling/grammar errors
- [ ] No placeholder text remaining
- [ ] All links work (no 404s)
- [ ] FAQ answers common questions
- [ ] Honest about limitations

### Validation Tools to Use
- [ ] Google Search Console - URL inspection
- [ ] Google Rich Results Test - Schema validation
- [ ] PageSpeed Insights - Performance check
- [ ] Mobile-Friendly Test - Mobile usability
- [ ] W3C Validator - HTML validation
- [ ] Screaming Frog (if available) - Comprehensive audit

## Post-Launch SEO Tasks

**Week 1:**
- Submit URL to Google Search Console
- Request indexing
- Monitor for crawl errors

**Week 2-4:**
- Track rankings for target keywords
- Monitor traffic in Google Analytics
- Check for broken links
- Update content based on user feedback

**Ongoing:**
- Build internal links from new content
- Update examples and images
- Refresh FAQ with new questions
- Monitor and respond to user reviews
- Track competitor changes
