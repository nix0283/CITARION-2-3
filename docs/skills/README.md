# Skills Integration Documentation

Complete reference for all 18 integrated skills in the CITARION platform. Skills provide specialized capabilities for AI/media processing, document manipulation, web interaction, and development workflows.

---

## Table of Contents

1. [Overview](#overview)
2. [Skills Architecture](#skills-architecture)
3. [AI/Media Skills](#aimedia-skills)
   - [ASR (Speech-to-Text)](#1-asr-speech-to-text)
   - [TTS (Text-to-Speech)](#2-tts-text-to-speech)
   - [LLM (Chat Completions)](#3-llm-chat-completions)
   - [VLM (Vision Language Model)](#4-vlm-vision-language-model)
   - [Image Generation](#5-image-generation)
   - [Video Generation](#6-video-generation)
   - [Video Understanding](#7-video-understanding)
   - [Podcast Generate](#8-podcast-generate)
4. [Document Skills](#document-skills)
   - [PDF](#9-pdf)
   - [DOCX](#10-docx)
   - [XLSX](#11-xlsx)
   - [PPTX](#12-pptx)
5. [Web/Search Skills](#websearch-skills)
   - [Web Search](#13-web-search)
   - [Web Reader](#14-web-reader)
   - [Finance](#15-finance)
6. [Development Skills](#development-skills)
   - [Frontend Design](#16-frontend-design)
   - [Fullstack Dev](#17-fullstack-dev)
   - [Gift Evaluator](#18-gift-evaluator)
7. [Integration Examples](#integration-examples)
8. [Best Practices](#best-practices)

---

## Overview

### What are Skills?

Skills are modular, reusable capabilities that extend the platform's functionality. Each skill:
- Has a dedicated `SKILL.md` documentation file
- Includes reference scripts in `scripts/` directory
- Integrates with the z-ai-web-dev-sdk backend
- Supports both CLI and programmatic usage

### Skills Directory Structure

```
skills/
├── ASR/                    # Speech-to-Text
│   ├── SKILL.md
│   ├── scripts/asr.ts
│   └── LICENSE.txt
├── TTS/                    # Text-to-Speech
│   ├── SKILL.md
│   ├── tts.ts
│   └── LICENSE.txt
├── LLM/                    # Chat Completions
│   ├── SKILL.md
│   └── scripts/chat.ts
├── VLM/                    # Vision Language Model
│   ├── SKILL.md
│   └── scripts/vlm.ts
├── image-generation/       # AI Image Generation
│   ├── SKILL.md
│   └── scripts/image-generation.ts
├── video-generation/       # AI Video Generation
│   ├── SKILL.md
│   └── scripts/video.ts
├── video-understand/       # Video Understanding
│   ├── SKILL.md
│   └── scripts/video-understand.ts
├── podcast-generate/       # Podcast Generation
│   ├── SKILL.md
│   └── generate.ts
├── pdf/                    # PDF Processing
│   ├── SKILL.md
│   └── scripts/
├── docx/                   # DOCX Processing
│   ├── SKILL.md
│   └── scripts/document.py
├── xlsx/                   # Excel Processing
│   ├── SKILL.md
│   └── recalc.py
├── pptx/                   # PPTX Processing
│   └── SKILL.md
├── web-search/             # Web Search
│   ├── SKILL.md
│   └── scripts/web_search.ts
├── web-reader/             # Web Page Reader
│   ├── SKILL.md
│   └── scripts/web-reader.ts
├── finance/                # Finance API
│   ├── SKILL.md
│   └── Finance_API_Doc.md
├── frontend-design/        # Frontend Design
│   ├── SKILL.md
│   ├── examples/
│   └── templates/
├── fullstack-dev/          # Fullstack Development
│   └── SKILL.md
└── gift-evaluator/         # Gift Evaluation
    ├── SKILL.md
    └── html_tools.py
```

---

## Skills Architecture

### Backend SDK Integration

All AI/Media skills use the **z-ai-web-dev-sdk** package:

```typescript
import ZAI from 'z-ai-web-dev-sdk';

// Initialize SDK
const zai = await ZAI.create();

// Use skill-specific APIs
const transcription = await zai.audio.asr.create({ ... });
const audio = await zai.audio.tts.create({ ... });
const completion = await zai.chat.completions.create({ ... });
const vision = await zai.chat.completions.createVision({ ... });
const image = await zai.images.generations.create({ ... });
const video = await zai.video.generations.create({ ... });
const searchResults = await zai.functions.invoke('web_search', { ... });
const pageContent = await zai.functions.invoke('page_reader', { ... });
```

### Important: Backend-Only Usage

**CRITICAL**: The z-ai-web-dev-sdk MUST be used in backend code only. Never use it in client-side code.

```typescript
// ✅ CORRECT: Server-side API route
// app/api/transcribe/route.ts
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(req: Request) {
  const zai = await ZAI.create();
  // ... use SDK
}

// ❌ WRONG: Client-side component
// components/Transcribe.tsx
'use client';
import ZAI from 'z-ai-web-dev-sdk'; // NEVER do this
```

### CLI Usage Pattern

Most skills support command-line usage via the `z-ai` CLI:

```bash
# Speech-to-Text
z-ai asr --file ./audio.wav -o transcript.json

# Text-to-Speech
z-ai tts --input "Hello world" --output ./hello.wav

# Chat
z-ai chat --prompt "What is AI?" --stream

# Vision
z-ai vision -p "Describe this" -i "./photo.jpg"

# Image Generation
z-ai image -p "A sunset" -o ./sunset.png

# Video Generation
z-ai video -p "A cat playing" --poll

# Web Search
z-ai function -n web_search -a '{"query": "AI news"}'

# Web Reader
z-ai function -n page_reader -a '{"url": "https://example.com"}'
```

---

## AI/Media Skills

### 1. ASR (Speech-to-Text)

**Location**: `skills/ASR/`
**Script**: `scripts/asr.ts`

Convert spoken audio into written text using automatic speech recognition.

#### CLI Usage

```bash
# Basic transcription
z-ai asr --file ./audio.wav

# Save to JSON
z-ai asr -f ./recording.mp3 -o transcript.json

# From base64
z-ai asr --base64 "UklGRiQAAABXQVZFZm10..." -o result.json

# Streaming output
z-ai asr -f ./audio.wav --stream
```

#### Backend SDK Integration

```typescript
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function transcribeAudio(audioFilePath: string) {
  const zai = await ZAI.create();
  
  const audioFile = fs.readFileSync(audioFilePath);
  const base64Audio = audioFile.toString('base64');
  
  const response = await zai.audio.asr.create({
    file_base64: base64Audio
  });
  
  return response.text;
}
```

#### Supported Formats
- WAV (.wav)
- MP3 (.mp3)
- M4A (.m4a)
- FLAC (.flac)
- OGG (.ogg)

#### Best Practices
1. Use 16kHz+ sample rate for best results
2. Minimize background noise
3. Implement caching for repeated transcriptions
4. Handle large files by splitting into segments

---

### 2. TTS (Text-to-Speech)

**Location**: `skills/TTS/`
**Script**: `tts.ts`

Convert text into natural-sounding speech audio.

#### API Constraints
- **Max text length**: 1024 characters per request
- **Speed range**: 0.5 to 2.0
- **Volume range**: >0 to 10
- **Streaming**: Only supports PCM format

#### CLI Usage

```bash
# Basic TTS
z-ai tts --input "Hello, world" --output ./hello.wav

# With voice selection
z-ai tts -i "Welcome" -o ./welcome.wav --voice tongtong

# Adjust speed
z-ai tts -i "Faster speech" -o ./fast.wav --speed 1.5

# MP3 format
z-ai tts -i "Hello" -o ./hello.mp3 --format mp3
```

#### Backend SDK Integration

```typescript
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function generateSpeech(text: string, outputPath: string) {
  const zai = await ZAI.create();
  
  const response = await zai.audio.tts.create({
    input: text,
    voice: 'tongtong',
    speed: 1.0,
    response_format: 'wav',
    stream: false
  });
  
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(new Uint8Array(arrayBuffer));
  fs.writeFileSync(outputPath, buffer);
  
  return outputPath;
}
```

#### Available Voices

| Voice | Description |
|-------|-------------|
| `tongtong` | Warm and friendly (default) |
| `chuichui` | Lively and cute |
| `xiaochen` | Calm and professional |
| `jam` | British gentleman |
| `kazi` | Clear and standard |
| `douji` | Natural and fluent |
| `luodo` | Expressive and engaging |

---

### 3. LLM (Chat Completions)

**Location**: `skills/LLM/`
**Script**: `scripts/chat.ts`

Large language model for conversational AI and text generation.

#### CLI Usage

```bash
# Simple question
z-ai chat --prompt "What is the capital of France?"

# With system prompt
z-ai chat -p "Review this code" --system "You are a code reviewer"

# With thinking (chain of thought)
z-ai chat -p "Solve: 2+2" --thinking

# Save to file
z-ai chat -p "Explain AI" -o response.json
```

#### Backend SDK Integration

```typescript
import ZAI from 'z-ai-web-dev-sdk';

async function chat(userMessage: string, systemPrompt?: string) {
  const zai = await ZAI.create();
  
  const messages = [];
  
  if (systemPrompt) {
    messages.push({ role: 'assistant', content: systemPrompt });
  }
  
  messages.push({ role: 'user', content: userMessage });
  
  const completion = await zai.chat.completions.create({
    messages: messages,
    thinking: { type: 'disabled' }
  });
  
  return completion.choices[0]?.message?.content;
}
```

#### Multi-turn Conversation

```typescript
class ConversationManager {
  private messages: Array<{role: string, content: string}> = [];
  private zai: any;
  
  async initialize(systemPrompt: string) {
    this.zai = await ZAI.create();
    this.messages.push({ role: 'assistant', content: systemPrompt });
  }
  
  async sendMessage(userMessage: string) {
    this.messages.push({ role: 'user', content: userMessage });
    
    const completion = await this.zai.chat.completions.create({
      messages: this.messages,
      thinking: { type: 'disabled' }
    });
    
    const response = completion.choices[0]?.message?.content;
    this.messages.push({ role: 'assistant', content: response });
    
    return response;
  }
}
```

---

### 4. VLM (Vision Language Model)

**Location**: `skills/VLM/`
**Script**: `scripts/vlm.ts`

Vision-based AI for image understanding and multimodal interactions.

#### Supported Content Types
- `image_url` - Image files (PNG, JPEG, GIF, WebP)
- `video_url` - Video files (MP4, AVI, MOV)
- `file_url` - Document files (PDF, DOCX, TXT)

#### CLI Usage

```bash
# Describe image from URL
z-ai vision -p "What's in this image?" -i "https://example.com/photo.jpg"

# Analyze local image
z-ai vision -p "Describe the scene" -i "./photo.png"

# Multiple images
z-ai vision -p "Compare these" -i "./photo1.jpg" -i "./photo2.jpg"

# With thinking
z-ai vision -p "Count objects" -i "./crowd.jpg" --thinking
```

#### Backend SDK Integration

```typescript
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function analyzeImage(imagePath: string, question: string) {
  const zai = await ZAI.create();
  
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');
  const mimeType = imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg';
  
  const response = await zai.chat.completions.createVision({
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: question },
        { 
          type: 'image_url', 
          image_url: { url: `data:${mimeType};base64,${base64Image}` }
        }
      ]
    }],
    thinking: { type: 'disabled' }
  });
  
  return response.choices[0]?.message?.content;
}
```

---

### 5. Image Generation

**Location**: `skills/image-generation/`
**Script**: `scripts/image-generation.ts`

AI-powered image creation from text prompts.

#### Supported Sizes
- `1024x1024` - Square
- `768x1344` - Portrait
- `864x1152` - Portrait
- `1344x768` - Landscape
- `1152x864` - Landscape
- `1440x720` - Wide landscape
- `720x1440` - Tall portrait

#### CLI Usage

```bash
# Basic generation
z-ai image -p "A sunset over mountains" -o ./sunset.png

# Specify size
z-ai image -p "A portrait" -o ./portrait.png -s 768x1344

# Hero banner
z-ai image -p "Tech hero image" -o ./hero.png -s 1440x720
```

#### Backend SDK Integration

```typescript
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function generateImage(prompt: string, outputPath: string, size = '1024x1024') {
  const zai = await ZAI.create();
  
  const response = await zai.images.generations.create({
    prompt: prompt,
    size: size
  });
  
  const imageBase64 = response.data[0].base64;
  const buffer = Buffer.from(imageBase64, 'base64');
  fs.writeFileSync(outputPath, buffer);
  
  return outputPath;
}
```

---

### 6. Video Generation

**Location**: `skills/video-generation/`
**Script**: `scripts/video.ts`

AI-powered video generation from text or images using asynchronous tasks.

#### Video Generation Workflow
1. Create task with `video.generations.create()`
2. Poll status with `async.result.query(taskId)`
3. Retrieve video URL when status is `SUCCESS`

#### CLI Usage

```bash
# Text-to-video
z-ai video -p "A cat playing with yarn" --poll

# Image-to-video (use base64 for reliability)
z-ai video --image-url "data:image/png;base64,..." -p "Animate this" --poll

# With quality settings
z-ai video -p "Ocean waves" --quality quality --fps 60 --poll

# With audio
z-ai video -p "Thunder storm" --with-audio --poll
```

#### Backend SDK Integration

```typescript
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function generateVideo(prompt: string) {
  const zai = await ZAI.create();
  
  // Create task
  const task = await zai.video.generations.create({
    prompt: prompt,
    quality: 'speed',
    duration: 5,
    fps: 30
  });
  
  // Poll for results
  let result = await zai.async.result.query(task.id);
  
  while (result.task_status === 'PROCESSING') {
    await new Promise(r => setTimeout(r, 5000));
    result = await zai.async.result.query(task.id);
  }
  
  if (result.task_status === 'SUCCESS') {
    return result.video_result?.[0]?.url || result.video_url;
  }
  
  throw new Error('Video generation failed');
}
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `prompt` | string | - | Text description |
| `image_url` | string/array | - | Base64 image(s) |
| `quality` | 'speed'\|'quality' | 'speed' | Output mode |
| `duration` | 5\|10 | 5 | Duration in seconds |
| `fps` | 30\|60 | 30 | Frame rate |
| `with_audio` | boolean | false | Generate AI audio |

---

### 7. Video Understanding

**Location**: `skills/video-understand/`
**Script**: `scripts/video-understand.ts`

Specialized video content analysis for scene understanding, action detection, and summarization.

#### Supported Video Formats
- MP4 (.mp4)
- AVI (.avi)
- MOV (.mov)
- WebM (.webm)
- MKV (.mkv)

#### CLI Usage

```bash
# Basic analysis
z-ai vision -p "Summarize this video" -i "./video.mp4"

# Action detection
z-ai vision -p "Identify all actions" -i "./sports.mp4" --thinking

# Event timeline
z-ai vision -p "Create a timeline of events" -i "./event.mp4"
```

#### Backend SDK Integration

```typescript
import ZAI from 'z-ai-web-dev-sdk';

async function analyzeVideo(videoUrl: string, prompt: string) {
  const zai = await ZAI.create();
  
  const response = await zai.chat.completions.createVision({
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: prompt },
        { type: 'video_url', video_url: { url: videoUrl } }
      ]
    }],
    thinking: { type: 'enabled' } // Enable for complex analysis
  });
  
  return response.choices[0]?.message?.content;
}
```

#### Use Cases
- Content moderation
- Sports analysis
- Educational content summarization
- Quality assessment
- Event detection

---

### 8. Podcast Generate

**Location**: `skills/podcast-generate/`
**Script**: `generate.ts`

Generate podcast episodes from text content or web search results.

#### Features
- Dual-host dialogue generation (default)
- Single-host mode available
- Duration scales with content (3-20 minutes)
- Outputs both script (Markdown) and audio (WAV)

#### CLI Usage

```bash
# From file
npm run generate -- --input=material.txt --out_dir=output

# From web search
npm run generate -- --topic="Latest AI breakthroughs" --out_dir=output

# With options
npm run generate -- \
  --topic="Quantum computing" \
  --out_dir=output \
  --mode=single-male \
  --duration=8 \
  --voice_host=xiaochen \
  --speed=1.0
```

#### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `--input` | - | Input file path |
| `--topic` | - | Search topic for web mode |
| `--out_dir` | - | Output directory (required) |
| `--mode` | dual | Podcast mode (dual/single-male/single-female) |
| `--duration` | auto | Duration in minutes (3-20) |
| `--host_name` | 小谱 | Host name |
| `--guest_name` | 锤锤 | Guest name |
| `--voice_host` | xiaochen | Host voice |
| `--voice_guest` | chuichui | Guest voice |
| `--speed` | 1.0 | Speech speed (0.5-2.0) |

---

## Document Skills

### 9. PDF

**Location**: `skills/pdf/`
**Scripts**: `scripts/`

Comprehensive PDF manipulation toolkit for extraction, creation, and form handling.

#### Key Scripts
- `convert_pdf_to_images.py` - PDF to image conversion
- `fill_fillable_fields.py` - Form field filling
- `extract_form_field_info.py` - Form field extraction
- `add_zai_metadata.py` - Add Z.ai metadata
- `sanitize_code.py` - Code sanitization

#### Python Libraries
- **pypdf** - Basic operations (merge, split, rotate)
- **pdfplumber** - Text and table extraction
- **reportlab** - PDF creation with styling

#### Creating PDFs with reportlab

```python
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table
from reportlab.lib.styles import getSampleStyleSheet

# Create document
doc = SimpleDocTemplate(
    "output.pdf",
    pagesize=letter,
    title="document_title",
    author="Z.ai",
    creator="Z.ai"
)

story = []
styles = getSampleStyleSheet()

# Add content
story.append(Paragraph("Title", styles['Heading1']))
story.append(Paragraph("Content here...", styles['Normal']))

# Build PDF
doc.build(story)

# Add metadata
import subprocess
subprocess.run(["python", "scripts/add_zai_metadata.py", "output.pdf"])
```

#### Extracting Text

```python
import pdfplumber

with pdfplumber.open("document.pdf") as pdf:
    for page in pdf.pages:
        text = page.extract_text()
        tables = page.extract_tables()
        print(text)
```

---

### 10. DOCX

**Location**: `skills/docx/`
**Script**: `scripts/document.py`

Document creation, editing, and analysis with tracked changes support.

#### Workflows

**Creating New Documents**: Use `docx-js` (JavaScript/TypeScript)
```typescript
import { Document, Paragraph, TextRun, Packer } from 'docx';
import * as fs from 'fs';

const doc = new Document({
    sections: [{
        children: [
            new Paragraph({
                children: [
                    new TextRun({ text: "Hello World", bold: true })
                ]
            })
        ]
    }]
});

Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync("output.docx", buffer);
});
```

**Editing Documents**: Use `python-docx`
```python
from docx import Document

doc = Document('input.docx')

# Add comment
for para in doc.paragraphs:
    if "keyword" in para.text:
        doc.add_comment(
            runs=[para.runs[0]],
            text="Review needed",
            author="Z.ai"
        )

doc.save('output.docx')
```

#### Color Palettes
- "Ink & Zen" - Grayscale wabi-sabi style
- "Wilderness Oasis" - Sage & Deep Forest
- "Terra Cotta Afterglow" - Warm Clay & Greige
- "Midnight Code" - High-Contrast Slate

---

### 11. XLSX

**Location**: `skills/xlsx/`
**Script**: `recalc.py`

Spreadsheet creation, editing, and formula recalculation.

#### Key Features
- Formula preservation and recalculation
- Financial modeling with color conventions
- Chart creation
- Data validation

#### Python Usage with openpyxl

```python
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment

wb = Workbook()
sheet = wb.active

# Add data
sheet['B2'] = "Report Title"
sheet['B3'] = "Revenue"
sheet['C3'] = 100000

# Add formula
sheet['B10'] = '=SUM(B4:B9)'

# Styling
sheet['B2'].font = Font(name='Times New Roman', size=18, bold=True)
sheet['B2'].alignment = Alignment(horizontal='left')

# Save
wb.save('output.xlsx')

# Recalculate formulas
import subprocess
subprocess.run(["python", "recalc.py", "output.xlsx"])
```

#### Financial Color Conventions
- **Blue text**: Hardcoded inputs
- **Black text**: Formulas and calculations
- **Green text**: Cross-sheet references
- **Red text**: External file links
- **Yellow background**: Key assumptions

---

### 12. PPTX

**Location**: `skills/pptx/`
**SKILL.md**: Only

**CRITICAL RULE**: For ANY PPT-related tasks, users MUST use the dedicated AI PPT mode by clicking the 【AI PPT】 button below the input box. DO NOT handle PPT tasks in regular chat.

This skill redirects users to the specialized AI Slides mode which offers:
- Faster processing
- Smarter design
- Better template support
- Optimized workflow

---

## Web/Search Skills

### 13. Web Search

**Location**: `skills/web-search/`
**Script**: `scripts/web_search.ts`

Real-time web search for current information retrieval.

#### CLI Usage

```bash
# Basic search
z-ai function -n web_search -a '{"query": "artificial intelligence"}'

# Limit results
z-ai function -n web_search -a '{"query": "news", "num": 5}'

# Recent results (last N days)
z-ai function -n web_search -a '{"query": "crypto", "recency_days": 7}'

# Save to file
z-ai function -n web_search -a '{"query": "AI"}' -o results.json
```

#### Backend SDK Integration

```typescript
import ZAI from 'z-ai-web-dev-sdk';

async function searchWeb(query: string, numResults = 10) {
  const zai = await ZAI.create();
  
  const results = await zai.functions.invoke('web_search', {
    query: query,
    num: numResults
  });
  
  return results; // Array of SearchFunctionResultItem
}
```

#### Search Result Structure

```typescript
interface SearchFunctionResultItem {
  url: string;          // Full URL
  name: string;         // Page title
  snippet: string;      // Preview text
  host_name: string;    // Domain name
  rank: number;         // Result ranking
  date: string;         // Publication date
  favicon: string;      // Favicon URL
}
```

---

### 14. Web Reader

**Location**: `skills/web-reader/`
**Script**: `scripts/web-reader.ts`

Web page content extraction and article metadata retrieval.

#### CLI Usage

```bash
# Extract page content
z-ai function -n page_reader -a '{"url": "https://example.com"}'

# Save to JSON
z-ai function -n page_reader -a '{"url": "https://news.site.com/article"}' -o article.json
```

#### Backend SDK Integration

```typescript
import ZAI from 'z-ai-web-dev-sdk';

async function readWebPage(url: string) {
  const zai = await ZAI.create();
  
  const result = await zai.functions.invoke('page_reader', {
    url: url
  });
  
  return {
    title: result.data.title,
    url: result.data.url,
    html: result.data.html,
    publishedTime: result.data.publishedTime,
    tokens: result.data.usage.tokens
  };
}
```

---

### 15. Finance

**Location**: `skills/finance/`
**Reference**: `Finance_API_Doc.md`

Comprehensive financial data API for market research and investment analysis.

#### Core Capabilities
- Real-time quotes and market snapshots
- Historical price data
- Financial ratios (P/E, EPS, ROE)
- Technical indicators (MA, RSI, MACD)
- Market news and insider trading data

#### Usage Pattern

```typescript
// Always read Finance_API_Doc.md before using the API
// Use search for stock research
// Example: Search for Zhipu AI stock (2513.HK)
// Use full English name: search=Knowledge+Atlas
```

#### Best Practices
- Read `Finance_API_Doc.md` before using the API
- Use full English company names for search
- Avoid stock codes alone (e.g., "02513.HK" returns empty)

---

## Development Skills

### 16. Frontend Design

**Location**: `skills/frontend-design/`
**Examples**: `examples/`, `templates/`

Transform UI requirements into production-ready frontend code with systematic design tokens.

#### Core Principles
1. **Tokens-First Methodology**: Design tokens → Components → Pages
2. **Dual-Mode Thinking**: Systematic foundation + Creative execution
3. **Accessibility as Constraint**: WCAG AA minimum
4. **Mobile-First Responsive**: 375px → 768px → 1024px+

#### Default Tech Stack
- Framework: React + TypeScript
- Styling: Tailwind CSS
- Components: shadcn/ui
- Theme: CSS custom properties

#### Design Direction Templates
1. **Minimal Premium SaaS** - Enterprise apps, B2B
2. **Bold Editorial** - Marketing sites, portfolios
3. **Soft & Organic** - Consumer apps, wellness
4. **Dark Neon** - Developer tools, gaming
5. **Playful & Colorful** - Consumer apps, creative tools

#### Token Generation

```css
:root {
  /* Colors */
  --background: #ffffff;
  --surface: #f8fafc;
  --text: #0f172a;
  --primary: #3b82f6;
  
  /* Typography */
  --font-size-base: 1rem;
  --line-height-base: 1.5;
  
  /* Spacing (8px system) */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  
  /* Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
}
```

---

### 17. Fullstack Dev

**Location**: `skills/fullstack-dev/`
**SKILL.md**: Complete development guide

Fullstack web development with Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui, and Prisma ORM.

#### Initialization (REQUIRED)

```bash
curl https://z-cdn.chatglm.cn/fullstack/init-fullstack_1773298087387.sh | bash
```

#### Technology Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: Prisma ORM (SQLite)
- **Auth**: NextAuth.js v4
- **State**: Zustand + TanStack Query

#### Important Rules
1. `bun run dev` runs automatically - DO NOT run manually
2. User can only see `/` route in `src/app/page.tsx`
3. Only port 3000 is available
4. `z-ai-web-dev-sdk` MUST be backend-only
5. Check `dev.log` for server logs

#### Prisma Usage

```bash
# 1. Edit schema
vim prisma/schema.prisma

# 2. Push to database
bun run db:push

# 3. Use in code
import { db } from '@/lib/db';
```

---

### 18. Gift Evaluator

**Location**: `skills/gift-evaluator/`
**Script**: `html_tools.py`

Spring Festival gift analysis with visual perception, market valuation, and HTML card generation.

#### Agent Thinking Strategy
1. **Visual Extraction**: Identify brand, vintage, packaging
2. **Valuation Logic**: Price anchoring and social labeling
3. **Creative Synthesis**: Generate critique and strategies

#### Usage Workflow

```bash
python3 html_tools.py generate_gift_card \
    --product_name "Moutai Flying Fairy 53°" \
    --price "¥2899" \
    --evaluation "Your detailed critique here..." \
    --thank_you_json '[{"style":"formal","content":"..."}]' \
    --return_gift_json '[{"target":"elder","item":"...","reason":"..."}]' \
    --vibe_code "luxury" \
    --image_url "/path/to/image.jpg" \
    --output_path "/path/to/output.html"
```

#### Vibe Codes
- `luxury`: High value (> ¥1000), "Hard Currency"
- `standard`: Festive, safe choices (¥200-¥1000)
- `budget`: Practical, funny, or cheap (< ¥200)

---

## Integration Examples

### Combined Skill Pipeline

```typescript
// Example: Research → Summary → Audio Pipeline
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function researchToPodcast(topic: string, outputPath: string) {
  const zai = await ZAI.create();
  
  // 1. Search for information
  const searchResults = await zai.functions.invoke('web_search', {
    query: topic,
    num: 5
  });
  
  // 2. Read top results
  const contents = [];
  for (const result of searchResults.slice(0, 3)) {
    const page = await zai.functions.invoke('page_reader', {
      url: result.url
    });
    contents.push(page.data.html);
  }
  
  // 3. Summarize with LLM
  const summary = await zai.chat.completions.create({
    messages: [{
      role: 'user',
      content: `Summarize this content about ${topic}:\n${contents.join('\n')}`
    }],
    thinking: { type: 'disabled' }
  });
  
  // 4. Generate audio summary
  const ttsResponse = await zai.audio.tts.create({
    input: summary.choices[0]?.message?.content || '',
    voice: 'xiaochen',
    speed: 1.0,
    response_format: 'wav'
  });
  
  const arrayBuffer = await ttsResponse.arrayBuffer();
  const buffer = Buffer.from(new Uint8Array(arrayBuffer));
  fs.writeFileSync(outputPath, buffer);
  
  return outputPath;
}
```

### Vision + Analysis Pipeline

```typescript
// Example: Image Analysis + Web Research
async function analyzeProduct(imagePath: string) {
  const zai = await ZAI.create();
  
  // 1. Analyze image with VLM
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');
  
  const vision = await zai.chat.completions.createVision({
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: 'Identify this product and its key features' },
        { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
      ]
    }],
    thinking: { type: 'disabled' }
  });
  
  const productInfo = vision.choices[0]?.message?.content;
  
  // 2. Search for price/market info
  const searchResults = await zai.functions.invoke('web_search', {
    query: `${productInfo} price review`,
    num: 5
  });
  
  return {
    productInfo,
    marketData: searchResults
  };
}
```

---

## Best Practices

### 1. SDK Instance Management

```typescript
// ✅ CORRECT: Reuse instance
let zaiInstance: any = null;

async function getZAI() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

// ❌ WRONG: Create new instance each time
async function bad() {
  const zai = await ZAI.create(); // Don't do this repeatedly
}
```

### 2. Error Handling

```typescript
async function safeOperation<T>(
  operation: () => Promise<T>,
  retries = 3
): Promise<{ success: boolean; data?: T; error?: string }> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const data = await operation();
      return { success: true, data };
    } catch (error) {
      if (attempt === retries) {
        return { success: false, error: error.message };
      }
      await new Promise(r => setTimeout(r, 1000 * attempt));
    }
  }
  return { success: false, error: 'Max retries exceeded' };
}
```

### 3. Rate Limiting

```typescript
class RateLimiter {
  private requests: number[] = [];
  
  constructor(private maxPerMinute: number) {}
  
  async waitForSlot(): Promise<void> {
    const now = Date.now();
    this.requests = this.requests.filter(t => t > now - 60000);
    
    if (this.requests.length >= this.maxPerMinute) {
      const wait = 60000 - (now - this.requests[0]);
      await new Promise(r => setTimeout(r, wait));
    }
    
    this.requests.push(Date.now());
  }
}
```

### 4. Caching

```typescript
class ResultCache<T> {
  private cache = new Map<string, { data: T; timestamp: number }>();
  
  constructor(private ttlMs: number) {}
  
  get(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.ttlMs) {
      return cached.data;
    }
    return null;
  }
  
  set(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }
}
```

### 5. Backend-Only Enforcement

```typescript
// ✅ CORRECT: API Route (server-side)
// app/api/transcribe/route.ts
import ZAI from 'z-ai-web-dev-sdk';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const zai = await ZAI.create();
  // Use SDK here...
  return NextResponse.json({ result: '...' });
}

// ❌ WRONG: Client component
// components/Transcribe.tsx
'use client';
import ZAI from 'z-ai-web-dev-sdk'; // NEVER import in client code
```

---

## Summary

| Skill | Category | Primary Use Case |
|-------|----------|-----------------|
| ASR | AI/Media | Speech-to-text transcription |
| TTS | AI/Media | Text-to-speech synthesis |
| LLM | AI/Media | Chat completions, text generation |
| VLM | AI/Media | Image/video understanding |
| Image Generation | AI/Media | AI image creation |
| Video Generation | AI/Media | AI video creation |
| Video Understanding | AI/Media | Video content analysis |
| Podcast Generate | AI/Media | Audio content creation |
| PDF | Document | PDF manipulation |
| DOCX | Document | Word document handling |
| XLSX | Document | Spreadsheet operations |
| PPTX | Document | Presentation handling |
| Web Search | Web/Search | Real-time information retrieval |
| Web Reader | Web/Search | Page content extraction |
| Finance | Web/Search | Financial market data |
| Frontend Design | Development | UI/UX development |
| Fullstack Dev | Development | Full-stack web development |
| Gift Evaluator | Development | Gift analysis system |

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Maintained by**: CITARION Platform Team
