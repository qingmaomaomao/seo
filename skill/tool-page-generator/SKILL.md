---
name: tool-page-generator
description: Automated SEO-optimized tool page generator for SEELE AI product. Use when you need to create a fully functional tool landing page based on target keywords, competitor analysis, and SEO requirements. This skill analyzes keywords (like "text to 3d", "3d generator"), researches competitors, designs tool functionality, develops Vue-based Hero interactions, fills content modules, and optimizes SEO metadata. Ideal for scaling SEO through programmatic tool page generation in the AI/gaming domain.
---

# Tool Page Generator

## Overview

This skill automates the creation of SEO-optimized, fully functional tool landing pages for SEELE AI (an AI game generation product). It takes target keywords, competition data, and competitor URLs as input, then produces a complete Vue-based tool page with working functionality, SEO-friendly content, and conversion optimization to drive users toward the main product.

**Core Value**: Transform keyword research into production-ready tool pages that both rank well in search engines AND provide genuine utility to users.

## Workflow

### 1. Input Analysis

**What You Receive:**
- **Target keywords** (1-5 keywords, e.g., "text to 3d", "3d generator", "image to 3d")
- **SEO metrics** for each keyword:
  - KD (Keyword Difficulty, 0-100)
  - Search volume (monthly searches)
- **Competitor URLs** (0-10 URLs of competing pages, may be content pages not necessarily tools)
- **Base Vue project** (pre-configured with SEO-friendly layout structure)
- **API capabilities** (text generation, image generation, 3D model generation, action generation, skeleton binding, etc.)

**Analysis Steps:**
1. **Keyword Intent Analysis** (refer to `references/keyword-analysis.md`)
   - Identify primary vs secondary keywords
   - Determine user intent (creation, conversion, editing, etc.)
   - Assess technical complexity

2. **Competitor Research**
   - Visit each competitor URL
   - Extract:
     - Tool functionality patterns
     - Content structure
     - Feature descriptions
     - User flow design
   - If no competitor provided or they're not tools, perform web search for similar tools

3. **Tool Concept Design**
   - Synthesize keyword intent + competitor insights
   - Define what the tool should do
   - Determine which SEELE AI APIs to use
   - Design conversion hooks to main product

### 2. Hero Section Development

**Goal**: Create an interactive, functional tool interface that users can immediately use.

**Design Approach** (see `references/hero-design-patterns.md` for detailed patterns):

**Standard Hero Structure:**
```vue
<div class="hero-section">
  <!-- Input Area -->
  <div class="input-zone">
    [Text input / File upload / Prompt textarea]
  </div>

  <!-- Parameter Controls -->
  <div class="parameters">
    [Sliders / Dropdowns / Toggles based on API requirements]
  </div>

  <!-- Action Button -->
  <button @click="generate">Generate [Output Type]</button>

  <!-- Result Display -->
  <div class="result-zone">
    [3D viewer / Image display / Animation preview / Download button]
  </div>

  <!-- Conversion CTA -->
  <div class="conversion-cta">
    <button class="prominent">Create Full Game with SEELE AI →</button>
  </div>
</div>
```

**Implementation Requirements:**
- Use Vue 3 composition API
- Integrate with provided SEELE AI APIs
- Handle loading states and errors gracefully
- Add export/download functionality appropriate to output type
- Make conversion CTA visually prominent but not intrusive
- Ensure mobile responsiveness

**Example for "text to 3d" keyword:**
- Input: Text prompt textarea
- Parameters: Model complexity slider, texture quality dropdown
- Action: "Generate 3D Model" button
- Result: Interactive 3D model viewer with rotate/zoom controls + GLB download button
- CTA: "Use this 3D model in your game → Create with SEELE AI"

### 3. Content Module Population

**Pre-defined UI Modules** (user will provide final structure later):

Typical structure includes:
1. **Tool Feature Highlights** - 3-6 key capabilities
2. **How It Works** - Step-by-step process explanation
3. **Use Cases** - Who should use this tool and why
4. **Examples/Gallery** - Visual demonstrations of outputs
5. **Related Tools** - Internal links to other tool pages
6. **FAQ** - Common questions addressing user intent

**Content Generation Strategy** (see `references/page-structure.md`):

For each module:
- **Text Content**:
  - Write SEO-optimized copy incorporating target keywords naturally
  - Maintain 8th-10th grade reading level
  - Focus on benefits over features
  - Use active voice and clear language

- **Image Assets**:
  - Generate images using SEELE AI APIs when possible (e.g., example outputs)
  - Search for relevant stock images when needed (use web search tools)
  - Ensure all images have descriptive alt text with keywords
  - Optimize for web (suggest compression if files are large)

- **Internal Linking**:
  - Identify 3-5 related tool pages to link to
  - Use keyword-rich anchor text
  - Place links naturally in context

### 4. SEO Optimization

**Meta Information** (see `references/seo-optimization.md` for formulas):

Update these fields in the Vue page:

```vue
<head>
  <title>[Primary Keyword] - Free Online [Tool Type] | SEELE AI</title>
  <meta name="description" content="[150-160 char description with keywords and CTA]">
  <meta name="keywords" content="[comma-separated target keywords]">

  <!-- Open Graph -->
  <meta property="og:title" content="[Title variant]">
  <meta property="og:description" content="[Description variant]">
  <meta property="og:image" content="[Hero image or example output]">

  <!-- Schema.org -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "[Tool Name]",
    "description": "[Tool Description]",
    "applicationCategory": "DesignApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
  </script>
</head>
```

**On-Page SEO Checklist:**
- [ ] H1 tag contains primary keyword
- [ ] URL slug is keyword-optimized (e.g., `/tools/text-to-3d-generator`)
- [ ] First paragraph includes primary keyword within first 100 words
- [ ] Image alt tags include relevant keywords
- [ ] Internal links to 3-5 related pages
- [ ] Page loads in <3 seconds
- [ ] Mobile-responsive design
- [ ] Semantic HTML structure (header, main, section, footer)

### 5. Quality Assurance

Before delivering the final page:

1. **Functionality Test**:
   - [ ] Hero tool generates expected output
   - [ ] API integrations work correctly
   - [ ] Download/export functions properly
   - [ ] Error handling displays user-friendly messages

2. **Content Review**:
   - [ ] No placeholder text remaining
   - [ ] All images load correctly
   - [ ] Internal links point to valid pages
   - [ ] Grammar and spelling are correct

3. **SEO Validation**:
   - [ ] Meta tags are complete and optimized
   - [ ] Keyword density is 1-2% (not stuffed)
   - [ ] Headings follow H1 > H2 > H3 hierarchy
   - [ ] Schema markup is valid (test with Google's tool)

4. **Conversion Optimization**:
   - [ ] CTA button is prominent and clear
   - [ ] Value proposition for main product is visible
   - [ ] User flow from tool to main product is smooth

## Usage Examples

### Example 1: Single Keyword - "3D Model Generator"

**Input:**
```
Keywords: ["3d model generator"]
KD: 45
Volume: 8,100/month
Competitor URLs: [
  "https://example.com/3d-tools",
  "https://competitor.com/model-maker"
]
Base Project: /path/to/vue-template
APIs: {
  text_to_3d: "/api/v1/generate/3d",
  download_model: "/api/v1/export/glb"
}
```

**Process:**
1. Analyze "3d model generator" → intent is creating 3D assets from scratch
2. Visit competitor URLs → observe they use text prompts + parameter controls
3. Design tool: Text input → Generate button → 3D viewer → Download GLB
4. Develop Hero with Vue + Three.js viewer integration
5. Fill modules:
   - Features: "AI-Powered Generation", "Multiple Formats", "Game-Ready Assets"
   - How It Works: "1. Describe your model 2. Adjust settings 3. Generate & download"
   - Use Cases: "Game developers, 3D artists, hobbyists"
6. Generate example images showing various 3D models
7. Update meta:
   - Title: "3D Model Generator - Free AI-Powered Tool | SEELE AI"
   - Description: "Create stunning 3D models instantly with AI. Free online 3D model generator for game assets, animations, and more. No skills required."
8. Add conversion CTA: "Use these models in your game → Try SEELE AI Game Builder"

**Output:** Complete Vue page at `/tools/3d-model-generator.vue`

### Example 2: Multiple Keywords - 3D Conversion Tools

**Input:**
```
Keywords: ["text to 3d", "image to 3d", "3d converter"]
KD: [52, 38, 41]
Volume: [5,400, 3,200, 2,100]/month
Competitor URLs: []
Base Project: /path/to/vue-template
APIs: {
  text_to_3d: "/api/v1/generate/3d/from-text",
  image_to_3d: "/api/v1/generate/3d/from-image"
}
```

**Process:**
1. Analyze keywords → all relate to converting inputs to 3D
2. No competitors provided → search for "text to 3d tool" and "image to 3d converter"
3. Find that most tools offer multiple input methods
4. Design unified tool: Tab interface (Text Input | Image Upload) → shared parameter controls → generate → 3D viewer
5. Develop Hero with tab switching logic
6. Fill modules focusing on conversion capabilities and format flexibility
7. Search for example images showing before/after conversions
8. Optimize meta for all three keywords (primary: "text to 3d")
9. Add related tools links: "3D Model Generator", "Sprite Generator", "Game Asset Creator"

**Output:** Complete Vue page at `/tools/text-to-3d.vue` optimized for multiple keywords

### Example 3: Niche Tool - "Sprite Sheet Generator"

**Input:**
```
Keywords: ["sprite sheet generator", "game sprite maker"]
KD: [28, 35]
Volume: [1,800, 1,200]/month
Competitor URLs: ["https://piskelapp.com"]
Base Project: /path/to/vue-template
APIs: {
  generate_sprite: "/api/v1/generate/sprite",
  create_sheet: "/api/v1/sprites/compile"
}
```

**Process:**
1. Lower competition → good opportunity
2. Visit Piskel → observe frame-by-frame editing approach
3. Design different approach: AI-generated sprites from text descriptions
4. Hero: "Describe your character" textarea → style dropdown (pixel art, 2D, isometric) → "Generate Sprite Animations" → preview with animation controls → export spritesheet
5. Fill modules emphasizing ease vs manual frame creation
6. Generate example spritesheets for common game characters
7. Target game developers and indie creators in use cases
8. Add internal links to "3D Model Generator", "Game Map Generator"

**Output:** Complete Vue page at `/tools/sprite-sheet-generator.vue`

## Special Considerations

### Handling Edge Cases

**1. No Competitor Data Available**
- Use web search extensively to find 3-5 similar tools
- Analyze common patterns across results
- If truly novel concept, design based on user intent and technical capabilities

**2. Keywords with Ambiguous Intent**
- Refer to `references/keyword-analysis.md` for disambiguation strategies
- When in doubt, choose the interpretation with higher commercial value
- Add FAQ section addressing multiple interpretations

**3. Limited API Capabilities**
- If exact functionality isn't available, find closest alternative
- Clearly communicate limitations in tool description
- Focus on what the tool CAN do well
- Consider hybrid approaches (e.g., use image generation + text overlay for certain effects)

**4. High Keyword Difficulty (KD > 70)**
- Focus on long-tail variations in content
- Create exceptional user experience to differentiate
- Add unique features competitors lack
- Invest more in example quality and detailed documentation

### Conversion Strategy Balance

**Don't Over-Promote:**
- Primary goal is providing genuine utility
- Conversion CTAs should enhance, not distract from tool functionality
- Place main CTA AFTER user has generated at least one result
- Use secondary CTAs subtly in content sections

**When to Emphasize Conversion:**
- User has successfully used the tool
- Output quality impresses them
- They attempt to use advanced features (suggest main product for more capabilities)
- After 2-3 generations (implies high engagement)

### Content Authenticity

- **Never fabricate statistics** about SEELE AI capabilities
- If uncertain about API features, note as "[Verify with API docs]" for human review
- Use realistic example outputs (don't overstate quality)
- Be honest about limitations vs competitors

## Resources

### references/

Detailed documentation loaded into context during execution:

- **keyword-analysis.md** - Strategies for interpreting user intent from keywords, disambiguation techniques, and search behavior patterns
- **hero-design-patterns.md** - Comprehensive UI/UX patterns for different tool types (generators, converters, editors), Vue implementation examples
- **page-structure.md** - Content templates for each module type, writing guidelines, example structures
- **seo-optimization.md** - Meta tag formulas, schema markup templates, keyword placement strategies, technical SEO checklist

### scripts/

Currently empty. May include automation scripts in future versions:
- Batch page generation from CSV
- SEO audit automation
- API integration testing

### assets/

Currently empty. May include templates in future versions:
- Vue component boilerplates for common tool patterns
- SVG icons for feature highlights
- CSS utility classes for conversion CTAs
