# Page Modules Specification

## Module 1: Hero Title & Subtitle

### Title Formulas

Use these proven H1 patterns, inserting the primary keyword:

- `[Primary Keyword] — Create [outcome] in Minutes`
- `Free [Primary Keyword] | Turn Ideas Into [outcome]`
- `[Primary Keyword]: Build [outcome] with AI`
- `The [Superlative] [Primary Keyword] for [audience]`

### Subtitle Patterns

- Expand on the value proposition with a secondary keyword
- Address the user's pain point + how SEELE AI solves it
- Include a differentiator (e.g., "No coding required", "Powered by AI")

### Examples

**Keyword group**: "AI Game Maker"
```
H1: "AI Game Maker — Create Playable Games in Minutes"
Subtitle: "Turn your ideas into fully playable games with SEELE AI's game generator. No coding required — just describe what you want and watch it come to life."
Meta title: "AI Game Maker | Create Games Instantly - SEELE AI"
Meta description: "Make games with AI using SEELE AI's game maker. Create playable 2D and 3D games from text descriptions. No coding needed. Try free."
```

**Keyword group**: "AI Website Builder"
```
H1: "AI Website Builder — Build Stunning Sites Instantly"
Subtitle: "Design and launch professional websites with SEELE AI. From landing pages to portfolios, describe your vision and get a live site in minutes."
Meta title: "AI Website Builder | Create Websites with AI - SEELE AI"
Meta description: "Build websites with AI using SEELE AI's website builder. Create professional sites from descriptions. No design skills needed. Start free."
```

## Module 3: Quick Start Options

### Design Principles

1. **Intent alignment** — Each card maps to a sub-intent within the keyword group
2. **Long-tail embedding** — Card titles naturally contain long-tail keyword variations
3. **Action-oriented** — CTAs use specific verbs ("Make a Platformer" not "Platformer")
4. **Diversity** — Cover different use cases, difficulty levels, and user types

### Card Structure

```json
{
  "title": "Make a 2D Platformer",
  "description": "Create a classic side-scrolling game with custom characters and levels",
  "cta_text": "Start Creating"
}
```

### Quick Start Patterns by Intent

**For "Game Maker" intents**:
- Genre-based: Platformer, RPG, Puzzle, Racing, Shooter, Adventure
- Mechanic-based: Multiplayer, Physics-based, Turn-based
- Theme-based: Retro, Sci-fi, Fantasy

**For "Website Builder" intents**:
- Type-based: Portfolio, Landing Page, Blog, E-commerce
- Industry-based: Restaurant, Agency, Freelancer, Startup
- Feature-based: Animated, Interactive, Responsive

**For "Code Generator" intents**:
- Language-based: Python, JavaScript, HTML/CSS, React
- App-type: Web App, API, Dashboard, CLI Tool
- Complexity: Starter Template, Full-stack App, Component Library

### Long-tail Keyword Integration

Each quick start card title should naturally embed a long-tail keyword:

| Primary Keyword | Quick Start Title | Embedded Long-tail |
|----------------|-------------------|--------------------|
| AI Game Maker | "Make a Multiplayer Game" | "make a multiplayer game with AI" |
| AI Website Builder | "Build a Portfolio Site" | "build a portfolio site with AI" |
| AI Code Generator | "Generate a React App" | "generate a react app with AI" |

## Module 4: Core Features Section

### Feature Framing Strategy

Frame the same SEELE AI features from the perspective of the current keyword intent:

| SEELE AI Feature | "Game Maker" Framing | "Website Builder" Framing |
|-----------------|---------------------|--------------------------|
| AI Generation | "Describe your game, AI builds it" | "Describe your site, AI designs it" |
| Live Preview | "Play-test instantly" | "Preview on any device" |
| Export | "Export to web or mobile" | "Publish to custom domain" |
| Customization | "Customize every game element" | "Full design control" |

### Feature Copy Guidelines

- Title: 3-8 words, include a keyword variation
- Description: 2-3 sentences, focus on the benefit (not the feature)
- CTA: Action verb + specific outcome ("Start Making Games", "Build Your Site")

## Module 6: Target Audience Section

### Persona Generation Strategy

Create personas that:
1. Represent different user segments searching for this keyword
2. Embed commonly searched terms naturally in descriptions
3. Connect the persona's need to SEELE AI's capabilities

### Example Personas for "AI Game Maker"

```json
[
  {
    "persona_title": "Indie Game Developers",
    "description": "Solo developers and small teams looking to prototype game ideas quickly. Skip months of coding and create playable game demos in hours.",
    "search_terms": ["indie game maker", "game prototype tool", "solo game development"],
    "cta_text": "Start Prototyping"
  },
  {
    "persona_title": "Educators & Students",
    "description": "Teachers creating educational games and students learning game design. Build interactive learning experiences without programming knowledge.",
    "search_terms": ["educational game maker", "game design for students", "no-code game builder"],
    "cta_text": "Create Learning Games"
  },
  {
    "persona_title": "Content Creators",
    "description": "YouTubers, streamers, and social media creators making unique gaming content. Generate custom games to share with your audience.",
    "search_terms": ["make games for YouTube", "custom game creator", "create games for content"],
    "cta_text": "Make Shareable Games"
  }
]
```
