# Page Structure and Content Templates

This document provides detailed templates and guidelines for populating each content module on tool landing pages.

## Overall Page Structure

```
┌─────────────────────────────────────┐
│ 1. Hero Section (functional tool)  │ ← User's primary focus
├─────────────────────────────────────┤
│ 2. Feature Highlights              │ ← Value proposition
├─────────────────────────────────────┤
│ 3. How It Works                    │ ← Process clarity
├─────────────────────────────────────┤
│ 4. Use Cases                       │ ← Target audience relevance
├─────────────────────────────────────┤
│ 5. Examples Gallery                │ ← Social proof & inspiration
├─────────────────────────────────────┤
│ 6. Related Tools                   │ ← Internal linking & SEO
├─────────────────────────────────────┤
│ 7. FAQ                             │ ← Address objections & long-tail SEO
├─────────────────────────────────────┤
│ 8. Footer (standard)               │
└─────────────────────────────────────┘
```

## Module 1: Hero Section

**Covered in `hero-design-patterns.md`**

## Module 2: Feature Highlights

### Purpose
Communicate 3-6 key benefits/capabilities that differentiate the tool.

### Structure Template

```vue
<section class="features-section">
  <div class="container">
    <h2>Why Use Our {{ Tool Name }}?</h2>
    <p class="section-intro">{{ Brief value proposition }}</p>

    <div class="features-grid">
      <!-- Feature 1 -->
      <div class="feature-card">
        <div class="feature-icon">
          <Icon1 />
        </div>
        <h3>{{ Feature Title }}</h3>
        <p>{{ Benefit description (2-3 sentences) }}</p>
      </div>

      <!-- Repeat for 3-6 features -->
    </div>
  </div>
</section>
```

### Writing Guidelines

**Feature Title Formula:**
- Adjective + Noun (e.g., "AI-Powered Generation", "Instant Results")
- OR Benefit Statement (e.g., "No Skills Required", "Export to Any Format")

**Description Guidelines:**
- Focus on USER BENEFIT, not technical feature
- Use active voice
- Keep to 2-3 sentences (40-60 words)
- Include keywords naturally

### Example: 3D Model Generator

```markdown
## Why Use Our AI 3D Model Generator?

Create professional game-ready 3D models without any 3D modeling experience.
Our AI-powered tool transforms your ideas into downloadable assets in seconds.

**Features:**

1. **AI-Powered Generation**
   Generate detailed 3D models from simple text descriptions. No modeling
   skills or expensive software needed—just describe what you want and let
   our AI bring it to life.

2. **Game-Ready Exports**
   Download in GLB, FBX, or OBJ formats optimized for Unity, Unreal Engine,
   and other game engines. All models include proper UV mapping and are
   ready to import into your project.

3. **Instant Preview**
   See your 3D model in an interactive viewer immediately after generation.
   Rotate, zoom, and inspect every angle before downloading to ensure it
   meets your needs.

4. **Commercial License**
   Use generated models in commercial projects, games, and applications.
   All outputs are 100% royalty-free with full commercial rights included.

5. **Customizable Parameters**
   Control style, complexity, and detail level with intuitive sliders.
   Create everything from low-poly game assets to high-detail cinematic
   models with the same tool.

6. **Fast Generation**
   Most models generate in under 30 seconds. Iterate quickly and explore
   multiple design directions without waiting hours for manual modeling.
```

### Feature Selection Strategy

Based on keyword intent:

**For "generator" keywords:**
- Speed of generation
- Quality/detail options
- No skills required
- Export formats
- Commercial licensing

**For "converter" keywords:**
- Format support
- Quality preservation
- Batch processing
- Fast conversion
- No quality loss

**For "editor" keywords:**
- Intuitive interface
- Real-time preview
- Undo/redo
- Preset templates
- Precision controls

## Module 3: How It Works

### Purpose
Reduce friction by showing how simple the process is (typically 3-4 steps).

### Structure Template

```vue
<section class="how-it-works">
  <div class="container">
    <h2>How It Works</h2>
    <p class="section-intro">{{ Process summary sentence }}</p>

    <div class="steps">
      <div class="step">
        <div class="step-number">1</div>
        <h3>{{ Action Title }}</h3>
        <p>{{ What user does }}</p>
        <img src="{{ step-illustration }}" alt="{{ step description }}" />
      </div>

      <!-- Steps 2-4 -->
    </div>

    <div class="cta-wrapper">
      <a href="#hero" class="try-now-btn">Try It Now - It's Free</a>
    </div>
  </div>
</section>
```

### Writing Guidelines

**Step Title Formula:**
- Start with imperative verb (Describe, Upload, Adjust, Generate, Download)
- Keep to 2-4 words

**Step Description:**
- 1-2 sentences
- Emphasize ease ("just", "simply", "automatically")
- Mention time if fast ("in seconds", "instantly")

### Example: Text to 3D Tool

```markdown
## How It Works

Transform your ideas into 3D models in three simple steps—no experience needed.

**Step 1: Describe Your Model**
Type a text description of what you want to create. Be as detailed or simple
as you like—our AI understands natural language and interprets your vision.

**Step 2: Customize Settings**
Choose your preferred style (realistic, cartoon, low-poly) and adjust the
complexity level. You can also select your output format (GLB, FBX, OBJ).

**Step 3: Generate & Download**
Click generate and watch your 3D model come to life in seconds. Preview it
in our interactive viewer, then download it for use in your game or project.

**Step 4: Use in Your Game**
Import your model directly into Unity, Unreal Engine, or any 3D software.
Or take it further by building a complete game with SEELE AI's game builder.
```

### Variations by Tool Type

**Generator Tools:** Describe → Customize → Generate → Download
**Converter Tools:** Upload → Select Format → Convert → Download
**Editor Tools:** Upload → Edit → Preview → Export

## Module 4: Use Cases

### Purpose
Help users see themselves using the tool; target specific audience segments.

### Structure Template

```vue
<section class="use-cases">
  <div class="container">
    <h2>Perfect For</h2>

    <div class="use-case-grid">
      <div class="use-case">
        <div class="use-case-icon">
          <Icon />
        </div>
        <h3>{{ Audience Segment }}</h3>
        <p>{{ Specific benefit for this audience }}</p>
        <ul class="use-case-examples">
          <li>{{ Specific use example 1 }}</li>
          <li>{{ Specific use example 2 }}</li>
          <li>{{ Specific use example 3 }}</li>
        </ul>
      </div>

      <!-- 3-4 use cases -->
    </div>
  </div>
</section>
```

### Writing Guidelines

**Audience Segments for Game/AI Tools:**
- Game developers (indie, mobile, AAA)
- 3D artists / designers
- Content creators / streamers
- Hobbyists / learners
- Marketing / agencies
- Educators / students

**Benefit Statement:**
- Address specific pain point this audience has
- Mention how tool saves time/money/effort

### Example: Sprite Generator

```markdown
## Perfect For

**Indie Game Developers**
Create unique character sprites and animations without hiring an artist.
Generate placeholder assets for prototyping or final sprites for your game.
- Character sprites for platformers and RPGs
- Enemy designs and boss sprites
- Item icons and UI elements

**Game Jam Participants**
Speed up your workflow during time-constrained game jams. Generate sprite
sheets in seconds instead of spending hours on pixel art.
- Quick character iterations
- Rapid prototyping of game concepts
- Last-minute asset creation

**Content Creators**
Design custom sprites for thumbnails, overlays, and animated content. Stand
out with original pixel art without learning complex tools.
- Stream overlays and alerts
- YouTube thumbnail characters
- Social media graphics

**Hobbyists & Learners**
Experiment with game development without artistic barriers. Focus on
programming and game design while AI handles the art.
- Learning game development
- Personal projects and portfolios
- Exploring pixel art styles
```

## Module 5: Examples Gallery

### Purpose
Showcase quality and variety of outputs; provide inspiration; build trust.

### Structure Template

```vue
<section class="examples-gallery">
  <div class="container">
    <h2>Example {{ Output Type }}s</h2>
    <p class="section-intro">{{ Quality/variety statement }}</p>

    <div class="gallery-grid">
      <div class="gallery-item">
        <img src="{{ example-image }}" alt="{{ descriptive alt text }}" />
        <div class="gallery-caption">
          <h4>{{ Example name }}</h4>
          <p class="prompt">Prompt: "{{ The prompt used }}"</p>
          <span class="style-tag">{{ Style used }}</span>
        </div>
      </div>

      <!-- 6-12 examples -->
    </div>

    <p class="gallery-cta">
      Ready to create your own? <a href="#hero">Start generating now</a>
    </p>
  </div>
</section>
```

### Content Strategy

**Variety to Show:**
- Different styles (if applicable)
- Simple → complex examples
- Different use cases
- Different quality settings

**Image Requirements:**
- Minimum 6 examples
- Optimal 8-12 examples
- All images must have descriptive alt text with keywords
- Include generation prompts when relevant (transparency builds trust)

**Where to Get Images:**

1. **Generate with SEELE AI APIs** (preferred)
   - Most authentic representation
   - Shows actual tool capability

2. **Search for similar examples**
   - Use web search for inspiration
   - Create descriptions based on similar tools' outputs
   - Mark as "[Representative example - actual results may vary]" if needed

3. **Stock images as placeholders**
   - Only if generation not yet possible
   - Must replace with real outputs before launch

### Example: 3D Model Generator

```markdown
## Example 3D Models

See the quality and variety our AI can generate from simple text descriptions.

[Gallery Grid with 9 examples]:

1. **Futuristic Robot**
   Prompt: "A humanoid robot with blue glowing accents and sleek armor"
   Style: Realistic | Complexity: 7/10

2. **Fantasy Sword**
   Prompt: "An ornate medieval sword with golden hilt and ruby gem"
   Style: Stylized | Complexity: 5/10

3. **Low-Poly Tree**
   Prompt: "A simple tree with autumn colors, low poly style"
   Style: Low-Poly | Complexity: 3/10

[... 6 more examples ...]
```

## Module 6: Related Tools

### Purpose
Internal linking for SEO; keep users on site; cross-sell other tools.

### Structure Template

```vue
<section class="related-tools">
  <div class="container">
    <h2>Explore More Tools</h2>
    <p class="section-intro">{{ Category description }}</p>

    <div class="tools-grid">
      <a href="{{ tool-url }}" class="tool-card">
        <div class="tool-icon">
          <Icon />
        </div>
        <h3>{{ Tool Name }}</h3>
        <p>{{ One-sentence description }}</p>
        <span class="tool-link">Try it now →</span>
      </a>

      <!-- 3-6 related tools -->
    </div>
  </div>
</section>
```

### Selection Strategy

**Link to tools that:**
1. Use similar inputs (e.g., both accept text prompts)
2. Produce complementary outputs (e.g., 3D models + textures)
3. Serve same audience (e.g., all game development tools)
4. Belong to same workflow (e.g., generate → edit → export)

**Prioritize:**
- Tools that exist (link to real pages)
- Tools with similar or lower KD (boost their ranking)
- Tools targeting related keywords

**Anchor Text:**
- Use target keyword of linked page
- Example: Link to "sprite sheet generator" page with anchor "sprite sheet generator"

### Example: For 3D Model Generator Page

```markdown
## Explore More AI Game Development Tools

**Sprite Generator**
Create 2D character sprites and animations from text descriptions. Perfect
for platformers, RPGs, and retro-style games.

**Texture Generator**
Generate seamless textures and materials for your 3D models. Create wood,
metal, fabric, and fantasy textures instantly.

**Game Map Generator**
Design complete game levels and environments with AI. Generate landscapes,
dungeons, and cityscapes in minutes.

**Character Creator**
Build unique game characters with customizable features. Generate portraits,
sprites, and 3D models of your characters.

**Animation Generator**
Bring your 3D models to life with AI-generated animations. Create walk
cycles, attacks, and custom movements.
```

## Module 7: FAQ

### Purpose
Address objections, concerns, and common questions; target long-tail keywords.

### Structure Template

```vue
<section class="faq">
  <div class="container">
    <h2>Frequently Asked Questions</h2>

    <div class="faq-list">
      <details class="faq-item">
        <summary>
          <h3>{{ Question (natural language) }}</h3>
        </summary>
        <div class="faq-answer">
          <p>{{ Answer (2-4 sentences) }}</p>
        </div>
      </details>

      <!-- 6-10 FAQs -->
    </div>
  </div>
</section>
```

### Question Categories

**1. Functionality Questions** (20%)
- "How does the {{ tool }} work?"
- "What formats can I export?"
- "Can I edit the {{ output }} after generation?"

**2. Quality/Limitation Questions** (20%)
- "How good is the quality?"
- "What are the limitations?"
- "Can it generate {{ specific thing }}?"

**3. Usage Rights Questions** (20%)
- "Can I use this for commercial projects?"
- "Do I own the generated {{ outputs }}?"
- "Are there any copyright issues?"

**4. Technical Questions** (15%)
- "Do I need to install software?"
- "Does it work on mobile?"
- "How long does generation take?"

**5. Pricing Questions** (15%)
- "Is it really free?"
- "Are there usage limits?"
- "Do I need to create an account?"

**6. Comparison Questions** (10%)
- "How is this different from {{ competitor }}?"
- "What makes this better than {{ alternative }}?"

### Writing Guidelines

**Questions:**
- Use natural language (how users actually search)
- Start with who, what, when, where, why, how
- Include long-tail keyword variations
- Mirror search queries

**Answers:**
- Be direct and honest
- Front-load the answer (don't bury it)
- 2-4 sentences ideal
- Link to relevant sections/pages when appropriate

### Example: 3D Model Generator FAQ

```markdown
## Frequently Asked Questions

**How does the AI 3D model generator work?**
Our AI analyzes your text description and generates a 3D model based on
patterns learned from millions of 3D assets. The process typically takes
20-30 seconds and produces game-ready models in your chosen format.

**Can I use generated models in commercial games?**
Yes! All 3D models generated with our tool come with full commercial rights.
You can use them in games, applications, or any project—even commercial
ones—without additional licensing fees.

**What file formats are supported?**
You can download models in GLB (recommended), FBX, or OBJ formats. These
formats are compatible with Unity, Unreal Engine, Blender, and most 3D
software used in game development.

**Do I need 3D modeling experience?**
No experience required! Simply describe what you want in plain English, and
our AI handles the technical 3D modeling. You can adjust complexity and style
with simple sliders—no need to learn complex 3D software.

**How is this different from traditional 3D modeling software?**
Traditional 3D modeling requires hours of manual work and years of experience.
Our AI generates models in seconds from text descriptions, making 3D asset
creation accessible to everyone—perfect for rapid prototyping or when you
need assets quickly.

**Are there any usage limits?**
Free users can generate up to 10 models per day. Need more? SEELE AI Pro
members get unlimited generations plus priority processing and advanced
features.

**Can I edit the model after generation?**
Yes! Download your model and edit it in any 3D software like Blender, Maya,
or directly in game engines like Unity or Unreal. The exported files are
standard formats that work everywhere.

**How long does it take to generate a model?**
Most models generate in 20-40 seconds depending on complexity. Simple low-
poly models can be ready in 15 seconds, while highly detailed models may
take up to a minute.

**Does it work on mobile devices?**
Yes! Our tool works on any device with a web browser, including phones and
tablets. However, for the best experience viewing and interacting with 3D
models, we recommend using a desktop or laptop.

**What if I'm not happy with the result?**
You can regenerate as many times as you'd like (within your daily limit).
Try adjusting your prompt, style, or complexity settings to get different
results. Each generation is unique!
```

## Writing Style Guidelines

### Voice and Tone

**Do:**
- Use active voice
- Write conversationally (but professionally)
- Use "you" and "your" (address user directly)
- Be specific and concrete
- Show enthusiasm (but don't oversell)

**Don't:**
- Use passive voice
- Write in academic/formal style
- Use "one" or "users" (too distant)
- Be vague or use jargon
- Hype with superlatives (no "best", "revolutionary", etc.)

### Readability Standards

- **Reading level**: 8th-10th grade (Flesch-Kincaid)
- **Sentence length**: Average 15-20 words
- **Paragraph length**: 2-4 sentences (60-100 words)
- **Use of lists**: Break down complex info into bullets
- **White space**: Plenty of breathing room between sections

### Keyword Integration

**Natural Placement:**
- Primary keyword in H1, first H2, first paragraph
- Secondary keywords in H2s, H3s throughout
- Long-tail keywords in FAQ questions
- Keyword variations in alt text

**Keyword Density:**
- Primary keyword: 1-2% of total word count
- Don't force keywords where they don't fit naturally
- Use synonyms and related terms

## Content Length Guidelines

### Minimum Word Counts

- **Hero section**: 50-100 words (headline + subheadline + instructions)
- **Features**: 300-500 words total (50-80 per feature × 3-6 features)
- **How It Works**: 150-250 words
- **Use Cases**: 200-400 words (50-100 per use case × 3-4 cases)
- **FAQ**: 400-600 words (50-80 per Q&A × 6-10 FAQs)

**Total page**: 1,500-2,500 words (optimal for SEO without overwhelming users)

### Balancing SEO and UX

**SEO needs**: Sufficient content depth for ranking
**UX needs**: Scannable, not overwhelming

**Solution**: Progressive disclosure
- Show key points visually (icons, headings)
- Allow users to skim easily
- Expand details in FAQ, examples, descriptions
- Use accordion/tabs for optional deep dives

## Image and Media Guidelines

### Alt Text Formula

```
alt="{{ What's in the image }} - {{ Keyword context }} - {{ Tool name }}"
```

**Examples:**
- `alt="3D robot model generated from text - AI 3D model generator - SEELE AI"`
- `alt="Sprite sheet animation example - game sprite generator output"`
- `alt="Step 1: Enter text prompt - how to use 3D generator tool"`

### Image Optimization

- Format: WebP (with JPG fallback)
- Size: Max 200KB per image
- Dimensions: Based on design (typically 400-800px wide)
- Loading: Lazy load below-the-fold images

### When to Include Video

Consider adding a short demo video (30-60 seconds) if:
- Tool workflow is complex
- Visual demonstration adds significant clarity
- Competitor pages lack video (differentiation opportunity)

## Summary Checklist

Before finalizing page content:

- [ ] All 7 content modules included
- [ ] Primary keyword in H1, first paragraph, meta title
- [ ] Secondary keywords in H2s naturally
- [ ] 3-6 features highlighted with user benefits
- [ ] 3-4 step "How It Works" section
- [ ] 3-4 use cases targeting different audiences
- [ ] 6-12 example images with descriptive alt text
- [ ] 3-6 related tool links with keyword-rich anchors
- [ ] 6-10 FAQ questions covering common concerns
- [ ] Reading level: 8th-10th grade
- [ ] Keyword density: 1-2% for primary keyword
- [ ] Total word count: 1,500-2,500 words
- [ ] All images optimized and lazy-loaded
- [ ] Conversion CTAs present but not intrusive
