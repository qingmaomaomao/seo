# Classification Rules Reference

## Decision Tree

```
Keyword Analysis
    ↓
Contains "template(s)"?
    ├─ YES → Templates (confidence: 0.90+)
    └─ NO → Continue
         ↓
    Contains "how to" / "guide" / "tutorial"?
        ├─ YES → Blog (confidence: 0.90+)
        └─ NO → Continue
             ↓
        Contains "maker" / "generator" / "creator" / "tool"?
            ├─ YES → Tool (confidence: 0.85+)
            └─ NO → Continue
                 ↓
            Starts with action verb (create/make/design/build)?
                ├─ YES → Create (confidence: 0.80+)
                └─ NO → Intent-based analysis
                     ↓
                Analyze search intent + competitor data
                     ↓
                Classify with lower confidence (0.50-0.70)
```

## Classification Patterns

### Create Type

**Strong Indicators:**
- Action verbs at start: "create", "make", "design", "build", "generate"
- User wants to produce something
- Verb + noun pattern

**Examples:**
- ✅ "create poster online" → Create (0.95)
- ✅ "make logo free" → Create (0.93)
- ✅ "design business card" → Create (0.90)
- ⚠️ "poster creation" → Create (0.65) - noun form, lower confidence

**Edge Cases:**
- "create account" → NOT Create (system action)
- "creative ideas" → Blog (informational)

### Tool Type

**Strong Indicators:**
- Tool-specific words: "maker", "generator", "creator", "editor", "tool"
- Modifiers: "online", "free", "app"
- Noun + tool word pattern

**Examples:**
- ✅ "poster maker online" → Tool (0.92)
- ✅ "logo generator free" → Tool (0.90)
- ✅ "photo editor tool" → Tool (0.95)
- ⚠️ "design tool tips" → Blog (0.70) - informational about tools

**Edge Cases:**
- "maker space" → NOT Tool (physical location)
- "tool comparison" → Blog (informational)

### Templates Type

**Strong Indicators:**
- Explicit: "template", "templates", "example", "sample"
- Download intent
- Plural forms often stronger signal

**Examples:**
- ✅ "business card template" → Templates (0.98)
- ✅ "resume templates free" → Templates (0.96)
- ✅ "invoice example" → Templates (0.85)
- ⚠️ "template design ideas" → Blog (0.60) - informational

**Edge Cases:**
- "email template" → Templates (yes, but might be code)
- "templating engine" → NOT Templates (technical)

### Blog Type

**Strong Indicators:**
- Question words: "how", "what", "why", "when", "which"
- Informational: "guide", "tutorial", "tips", "ideas", "best"
- Learning intent

**Examples:**
- ✅ "how to design a poster" → Blog (0.96)
- ✅ "best practices for logo design" → Blog (0.93)
- ✅ "poster design tips" → Blog (0.90)
- ⚠️ "quick tips generator" → Tool (0.75) - tool despite "tips"

**Edge Cases:**
- "how-to guide template" → Templates (0.70) - template wins
- "tutorial video maker" → Tool (0.80) - tool wins

## Ambiguous Keywords

### Multi-signal Keywords

**Example: "create poster template"**
- Signals: "create" (Create) + "template" (Templates)
- Resolution: Templates wins (more specific user intent)
- Confidence: 0.75
- Alternative: Create (0.65)

**Example: "poster maker tutorial"**
- Signals: "maker" (Tool) + "tutorial" (Blog)
- Resolution: Blog wins (informational intent)
- Confidence: 0.80
- Alternative: Tool (0.60)

### Brand Keywords

**Pattern: "[Brand] + keyword"**
- "canva alternative" → Tool/Create (depends on context)
- "canva-style poster maker" → Tool (0.85)
- "better than canva" → Blog (0.75) - comparison

**Handling:**
1. Identify brand mention
2. Classify base keyword normally
3. Apply brand multiplier (0.8×)
4. Add opportunity bonus (+10-15)

### Bare Nouns

**Single-word or noun-only keywords:**
- "poster" → Ambiguous (check competition)
  - If high search volume → Tool (0.60)
  - If template-rich SERPs → Templates (0.65)
- "resume" → Templates (0.70) - strong template intent
- "logo" → Tool (0.65) - typical tool query

**Strategy:**
- Check competitor pages
- Default to Tool for high volume
- Flag for human review

## Confidence Calculation Details

### Keyword Match Score (40%)

```
score = 0
if contains_primary_trigger:
    score += 0.4
if contains_secondary_trigger:
    score += 0.2
if word_order_matches_pattern:
    score += 0.4

keyword_match_score = score / max_score
```

### Intent Clarity Score (30%)

```
if single_clear_intent:
    score = 1.0
elif two_possible_intents:
    score = 0.6
elif three_or_more_intents:
    score = 0.3
else:
    score = 0.5  # default
```

### Competitor Alignment (20%)

```
if competitor_has_same_type_page and high_traffic:
    score = 1.0
elif competitor_has_similar_type:
    score = 0.7
elif competitor_has_different_type:
    score = 0.4
else:
    score = 0.6  # no data
```

### Search Pattern Score (10%)

```
if common_pattern_match:
    score = 1.0
elif partial_pattern_match:
    score = 0.6
else:
    score = 0.3
```

## Quality Control Checklist

For each classification:

1. ✅ Does keyword contain obvious trigger words?
2. ✅ Does classification match user search intent?
3. ✅ Do competitors rank with similar page types?
4. ✅ Is confidence score appropriate?
5. ✅ Are edge cases handled correctly?

If any check fails → Flag for review
