# Hero Section Design Patterns

This document provides comprehensive UI/UX patterns for designing Hero sections across different tool types, with Vue 3 implementation examples.

## Core Hero Architecture

Every Hero section must include these 5 components:

1. **Input Zone** - Where users provide data
2. **Parameter Controls** - Adjustable settings
3. **Action Trigger** - Generate/convert button
4. **Result Display** - Output visualization
5. **Conversion CTA** - Link to main SEELE AI product

## Pattern 1: Generator Tools

**Use for:** "generator", "creator", "maker" keywords
**Examples:** 3D model generator, sprite generator, texture creator

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│  Hero Headline + Subheadline                   │
├─────────────────────────────────────────────────┤
│  Input Zone (Text/Prompt)                      │
├─────────────────────────────────────────────────┤
│  Parameters (Style, Quality, Size...)          │
├─────────────────────────────────────────────────┤
│  [Generate Button]                             │
├─────────────────────────────────────────────────┤
│  Result Display (Preview + Download)           │
│                                                 │
│  [Create Full Game with SEELE AI →]           │
└─────────────────────────────────────────────────┘
```

### Vue Implementation Example

```vue
<template>
  <div class="hero-section generator-tool">
    <!-- Headline -->
    <div class="hero-header">
      <h1>{{ toolName }}</h1>
      <p class="subtitle">{{ description }}</p>
    </div>

    <!-- Input Zone -->
    <div class="input-zone">
      <label for="prompt">Describe what you want to create</label>
      <textarea
        id="prompt"
        v-model="prompt"
        placeholder="E.g., a futuristic robot character with blue accents"
        rows="3"
        :disabled="isGenerating"
      />
    </div>

    <!-- Parameters -->
    <div class="parameters">
      <div class="param-group">
        <label>Style</label>
        <select v-model="style">
          <option value="realistic">Realistic</option>
          <option value="cartoon">Cartoon</option>
          <option value="lowpoly">Low Poly</option>
          <option value="pixelart">Pixel Art</option>
        </select>
      </div>

      <div class="param-group">
        <label>Complexity: {{ complexity }}</label>
        <input
          type="range"
          v-model="complexity"
          min="1"
          max="10"
          step="1"
        />
      </div>

      <div class="param-group">
        <label>Output Format</label>
        <select v-model="outputFormat">
          <option value="glb">GLB (recommended)</option>
          <option value="fbx">FBX</option>
          <option value="obj">OBJ</option>
        </select>
      </div>
    </div>

    <!-- Action Button -->
    <button
      class="generate-btn"
      @click="generate"
      :disabled="!prompt || isGenerating"
    >
      <span v-if="!isGenerating">Generate {{ outputType }}</span>
      <span v-else>
        <span class="spinner"></span> Generating... {{ progress }}%
      </span>
    </button>

    <!-- Result Display -->
    <div v-if="result" class="result-zone">
      <div class="result-viewer">
        <!-- 3D viewer component or image display -->
        <ModelViewer :model-url="result.url" />
      </div>

      <div class="result-actions">
        <button @click="download" class="download-btn">
          <DownloadIcon /> Download {{ outputFormat.toUpperCase() }}
        </button>
        <button @click="regenerate" class="secondary-btn">
          <RefreshIcon /> Regenerate
        </button>
      </div>
    </div>

    <!-- Conversion CTA -->
    <div v-if="result" class="conversion-cta">
      <div class="cta-content">
        <h3>Love this {{ outputType }}?</h3>
        <p>Use it in a complete game with SEELE AI's game generator</p>
        <a href="/game-builder" class="cta-button">
          Create Full Game →
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const prompt = ref('')
const style = ref('realistic')
const complexity = ref(5)
const outputFormat = ref('glb')
const isGenerating = ref(false)
const progress = ref(0)
const result = ref(null)

const toolName = 'AI 3D Model Generator'
const description = 'Create game-ready 3D models from text descriptions in seconds'
const outputType = '3D Model'

const generate = async () => {
  isGenerating.value = true
  progress.value = 0

  try {
    // Simulate progress
    const progressInterval = setInterval(() => {
      progress.value += 10
      if (progress.value >= 90) clearInterval(progressInterval)
    }, 500)

    // Call SEELE AI API
    const response = await fetch('/api/v1/generate/3d', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: prompt.value,
        style: style.value,
        complexity: complexity.value,
        format: outputFormat.value
      })
    })

    const data = await response.json()
    result.value = data

    clearInterval(progressInterval)
    progress.value = 100
  } catch (error) {
    console.error('Generation failed:', error)
    // Show error message to user
  } finally {
    isGenerating.value = false
  }
}

const download = () => {
  const link = document.createElement('a')
  link.href = result.value.url
  link.download = `model-${Date.now()}.${outputFormat.value}`
  link.click()
}

const regenerate = () => {
  result.value = null
  generate()
}
</script>

<style scoped>
.hero-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.hero-header {
  text-align: center;
  margin-bottom: 2rem;
}

.hero-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.125rem;
  color: #666;
}

.input-zone {
  margin-bottom: 1.5rem;
}

.input-zone textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
}

.parameters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.param-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.param-group select,
.param-group input[type="range"] {
  width: 100%;
}

.generate-btn {
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.generate-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.result-zone {
  margin-top: 2rem;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 12px;
}

.result-viewer {
  min-height: 400px;
  background: white;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.result-actions {
  display: flex;
  gap: 1rem;
}

.download-btn {
  flex: 1;
  padding: 0.75rem 1.5rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.conversion-cta {
  margin-top: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
  border-radius: 12px;
  text-align: center;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  background: #2d3436;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: transform 0.2s;
}

.cta-button:hover {
  transform: scale(1.05);
}
</style>
```

## Pattern 2: Converter Tools

**Use for:** "converter", "to", "transform" keywords
**Examples:** Image to 3D, text to sprite, format converter

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│  Hero Headline + Subheadline                   │
├──────────────┬──────────────────────────────────┤
│  Input Side  │  Output Side                     │
│              │                                   │
│  [Upload]    │  [Preview Result]               │
│  Settings    │  [Download]                     │
│              │                                   │
│  [Convert →] │                                  │
├──────────────┴──────────────────────────────────┤
│  [Create Full Game with SEELE AI →]           │
└─────────────────────────────────────────────────┘
```

### Vue Implementation Example

```vue
<template>
  <div class="hero-section converter-tool">
    <div class="hero-header">
      <h1>{{ toolName }}</h1>
      <p class="subtitle">{{ description }}</p>
    </div>

    <div class="converter-layout">
      <!-- Input Side -->
      <div class="input-side">
        <h3>Input</h3>

        <!-- File Upload -->
        <div
          class="upload-zone"
          @drop.prevent="handleDrop"
          @dragover.prevent
          @click="triggerFileInput"
        >
          <input
            ref="fileInput"
            type="file"
            :accept="acceptedFormats"
            @change="handleFileSelect"
            hidden
          />

          <div v-if="!inputFile" class="upload-prompt">
            <UploadIcon />
            <p>Drop {{ inputType }} here or click to upload</p>
            <span class="formats">{{ acceptedFormats }}</span>
          </div>

          <div v-else class="file-preview">
            <img v-if="previewUrl" :src="previewUrl" alt="Input preview" />
            <p class="filename">{{ inputFile.name }}</p>
            <button @click.stop="clearInput" class="clear-btn">×</button>
          </div>
        </div>

        <!-- Conversion Settings -->
        <div class="settings">
          <div class="setting-group">
            <label>Output Quality</label>
            <select v-model="quality">
              <option value="draft">Draft (Fast)</option>
              <option value="standard">Standard</option>
              <option value="high">High Quality</option>
            </select>
          </div>

          <div class="setting-group">
            <label>Style</label>
            <select v-model="conversionStyle">
              <option value="auto">Auto</option>
              <option value="realistic">Realistic</option>
              <option value="stylized">Stylized</option>
            </select>
          </div>
        </div>

        <!-- Convert Button -->
        <button
          class="convert-btn"
          @click="convert"
          :disabled="!inputFile || isConverting"
        >
          <span v-if="!isConverting">Convert to {{ outputType }} →</span>
          <span v-else>Converting... {{ progress }}%</span>
        </button>
      </div>

      <!-- Output Side -->
      <div class="output-side">
        <h3>Output</h3>

        <div v-if="!result" class="output-placeholder">
          <p>Your converted {{ outputType }} will appear here</p>
        </div>

        <div v-else class="output-display">
          <!-- Result viewer (3D, image, etc.) -->
          <component :is="resultViewer" :data="result" />

          <div class="output-actions">
            <button @click="downloadResult" class="download-btn">
              <DownloadIcon /> Download {{ outputType }}
            </button>
            <button @click="reset" class="secondary-btn">
              Convert Another
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Conversion CTA -->
    <div v-if="result" class="conversion-cta">
      <h3>Take it further with SEELE AI</h3>
      <p>Turn this {{ outputType }} into a full game in minutes</p>
      <a href="/game-builder" class="cta-button">
        Start Building Your Game →
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const toolName = 'Image to 3D Converter'
const description = 'Transform any image into a 3D model instantly'
const inputType = 'image'
const outputType = '3D Model'
const acceptedFormats = '.jpg,.jpeg,.png,.webp'

const fileInput = ref(null)
const inputFile = ref(null)
const previewUrl = ref(null)
const quality = ref('standard')
const conversionStyle = ref('auto')
const isConverting = ref(false)
const progress = ref(0)
const result = ref(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) processFile(file)
}

const handleDrop = (event) => {
  const file = event.dataTransfer.files[0]
  if (file) processFile(file)
}

const processFile = (file) => {
  inputFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

const clearInput = () => {
  inputFile.value = null
  previewUrl.value = null
  if (fileInput.value) fileInput.value.value = ''
}

const convert = async () => {
  isConverting.value = true
  progress.value = 0

  try {
    const formData = new FormData()
    formData.append('file', inputFile.value)
    formData.append('quality', quality.value)
    formData.append('style', conversionStyle.value)

    // Progress simulation
    const progressInterval = setInterval(() => {
      progress.value += 10
      if (progress.value >= 90) clearInterval(progressInterval)
    }, 600)

    const response = await fetch('/api/v1/convert/image-to-3d', {
      method: 'POST',
      body: formData
    })

    const data = await response.json()
    result.value = data

    clearInterval(progressInterval)
    progress.value = 100
  } catch (error) {
    console.error('Conversion failed:', error)
  } finally {
    isConverting.value = false
  }
}

const downloadResult = () => {
  const link = document.createElement('a')
  link.href = result.value.url
  link.download = `converted-${Date.now()}.glb`
  link.click()
}

const reset = () => {
  clearInput()
  result.value = null
  progress.value = 0
}
</script>

<style scoped>
.converter-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.upload-zone {
  border: 2px dashed #cbd5e0;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-zone:hover {
  border-color: #667eea;
}

.output-placeholder {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  color: #999;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .converter-layout {
    grid-template-columns: 1fr;
  }
}
</style>
```

## Pattern 3: Editor Tools

**Use for:** "editor", "customize", "modify" keywords
**Examples:** Sprite editor, model customizer, texture editor

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│  Hero Headline + Subheadline                   │
├──────────┬──────────────────────────────────────┤
│  Tools   │  Canvas / Preview                    │
│  Panel   │                                       │
│          │  [Interactive editing area]          │
│  [Tool1] │                                       │
│  [Tool2] │                                       │
│  [Tool3] │                                       │
│          │                                       │
├──────────┴──────────────────────────────────────┤
│  [Download Edited Version]                     │
│  [Use in SEELE AI Game Builder →]             │
└─────────────────────────────────────────────────┘
```

### Key Considerations

- Real-time preview as user edits
- Undo/redo functionality required
- Save state in localStorage
- Touch-friendly for mobile

## Pattern 4: Multi-Input Tools

**Use for:** Tools that accept multiple input types
**Examples:** "text OR image to 3D", "multi-format converter"

### Layout Structure (Tabbed Interface)

```
┌─────────────────────────────────────────────────┐
│  Hero Headline + Subheadline                   │
├─────────────────────────────────────────────────┤
│  [Text Input] [Image Upload] [3D Upload]       │ ← Tabs
├─────────────────────────────────────────────────┤
│                                                 │
│  [Active tab content]                          │
│  (Input fields + parameters)                   │
│                                                 │
├─────────────────────────────────────────────────┤
│  [Generate/Convert Button]                     │
├─────────────────────────────────────────────────┤
│  Result Display                                │
└─────────────────────────────────────────────────┘
```

### Vue Implementation Snippet

```vue
<template>
  <div class="multi-input-tool">
    <!-- Tab Navigation -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <component :is="tab.icon" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <component :is="currentTabComponent" @submit="generate" />
    </div>

    <!-- Shared action button and result display -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TextInputTab from './tabs/TextInputTab.vue'
import ImageUploadTab from './tabs/ImageUploadTab.vue'

const activeTab = ref('text')

const tabs = [
  { id: 'text', label: 'From Text', icon: 'TextIcon', component: TextInputTab },
  { id: 'image', label: 'From Image', icon: 'ImageIcon', component: ImageUploadTab }
]

const currentTabComponent = computed(() => {
  return tabs.find(t => t.id === activeTab.value)?.component
})
</script>
```

## Conversion CTA Best Practices

### Placement Strategy

**Before Generation:**
- ❌ Don't show CTA (user hasn't experienced value yet)

**After First Generation:**
- ✅ Show subtle CTA below result (user has seen tool works)
- Text: "Like what you see? Create complete games with SEELE AI"

**After 2+ Generations:**
- ✅ Show prominent CTA (user is engaged)
- Text: "Ready for more? Build full games with these assets"

### CTA Design Principles

```vue
<!-- Subtle CTA (after 1st generation) -->
<div class="conversion-cta subtle">
  <p>
    Love this tool?
    <a href="/game-builder">Create complete games with SEELE AI →</a>
  </p>
</div>

<!-- Prominent CTA (after 2+ generations) -->
<div class="conversion-cta prominent">
  <div class="cta-content">
    <h3>You've generated {{ generationCount }} {{ outputType }}s!</h3>
    <p>Imagine what you could build with SEELE AI's full game generator</p>
    <a href="/game-builder" class="cta-button">
      <GameIcon />
      Start Building Your Game
      <ArrowIcon />
    </a>
  </div>
  <div class="cta-preview">
    <img src="/assets/game-builder-preview.jpg" alt="SEELE AI Game Builder" />
  </div>
</div>
```

### Visual Hierarchy

1. **Primary action**: Generate/Convert button (most prominent)
2. **Secondary action**: Download result (visible but less prominent)
3. **Tertiary action**: Conversion CTA (present but not distracting)

## Mobile Responsiveness

### Key Adaptations

**Input Controls:**
- Stack vertically on mobile (<768px)
- Increase touch target size to min 44×44px
- Use native mobile inputs where possible

**Result Display:**
- Allow full-screen mode for 3D viewers
- Pinch-to-zoom for images
- Swipe gestures for before/after comparisons

**Conversion CTA:**
- Fix to bottom on mobile (sticky CTA)
- Collapse to icon + text on scroll

```vue
<style>
@media (max-width: 768px) {
  .parameters {
    grid-template-columns: 1fr;
  }

  .generate-btn {
    position: sticky;
    bottom: 1rem;
    z-index: 10;
  }

  .conversion-cta.prominent {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    box-shadow: 0 -4px 12px rgba(0,0,0,0.1);
  }
}
</style>
```

## Performance Optimization

### Loading States

Always show clear feedback during generation:

```vue
<template>
  <div class="loading-state" v-if="isGenerating">
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progress + '%' }"></div>
    </div>
    <p class="loading-text">{{ loadingMessage }}</p>
    <p class="loading-subtext">This usually takes {{ estimatedTime }}s</p>
  </div>
</template>

<script setup>
const loadingMessage = computed(() => {
  if (progress.value < 30) return 'Analyzing input...'
  if (progress.value < 60) return 'Generating output...'
  if (progress.value < 90) return 'Applying finishing touches...'
  return 'Almost done!'
})
</script>
```

### Error Handling

```vue
<div v-if="error" class="error-state">
  <ErrorIcon />
  <h3>{{ error.title }}</h3>
  <p>{{ error.message }}</p>
  <button @click="retry">Try Again</button>
  <a href="/support">Contact Support</a>
</div>
```

## Accessibility Considerations

- All interactive elements must be keyboard accessible
- Provide ARIA labels for screen readers
- Use semantic HTML (button, input, select)
- Ensure color contrast ratios meet WCAG AA (4.5:1)
- Add focus indicators for keyboard navigation

```vue
<button
  class="generate-btn"
  @click="generate"
  :disabled="!isValid"
  :aria-label="`Generate ${outputType} from your ${inputType}`"
  :aria-busy="isGenerating"
>
  Generate {{ outputType }}
</button>
```

## Summary Checklist

Before implementing a Hero section:

- [ ] Pattern selected based on keyword intent (generator/converter/editor)
- [ ] All 5 core components included (input, parameters, action, result, CTA)
- [ ] Vue 3 Composition API used
- [ ] API integration planned
- [ ] Loading and error states designed
- [ ] Conversion CTA placement strategy defined
- [ ] Mobile responsive breakpoints added
- [ ] Accessibility requirements met
- [ ] Download/export functionality included
