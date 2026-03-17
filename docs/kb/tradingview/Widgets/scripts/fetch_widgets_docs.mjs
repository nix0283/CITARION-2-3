#!/usr/bin/env node
/**
 * TradingView Widgets Documentation Scraper
 * Downloads documentation with code examples and image recognition
 */

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

// Widget URLs to fetch
const WIDGET_URLS = [
  // Getting started
  { url: 'https://www.tradingview.com/widget-docs/getting-started/', file: 'getting-started.md' },
  { url: 'https://www.tradingview.com/widget-docs/widget-formats/', file: 'widget-formats.md' },
  { url: 'https://www.tradingview.com/widget-docs/theme-builder/', file: 'theme-builder.md' },
  { url: 'https://www.tradingview.com/widget-docs/markets/', file: 'markets.md' },
  { url: 'https://www.tradingview.com/widget-docs/solutions/', file: 'solutions.md' },
  { url: 'https://www.tradingview.com/widget-docs/tutorials/', file: 'tutorials.md' },
  { url: 'https://www.tradingview.com/widget-docs/accessibility/', file: 'accessibility.md' },
  
  // Widgets overview
  { url: 'https://www.tradingview.com/widget-docs/widgets/', file: 'widgets.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/charts/', file: 'widgets-charts.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/watchlists/', file: 'widgets-watchlists.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/tickers/', file: 'widgets-tickers.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/heatmaps/', file: 'widgets-heatmaps.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/screeners/', file: 'widgets-screeners.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/symbol-details/', file: 'widgets-symbol-details.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/news/', file: 'widgets-news.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/calendars/', file: 'widgets-calendars.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/economics/', file: 'widgets-economics.md' },
  
  // FAQ
  { url: 'https://www.tradingview.com/widget-docs/faq/general/', file: 'faq-general.md' },
  { url: 'https://www.tradingview.com/widget-docs/faq/data/', file: 'faq-data.md' },
  { url: 'https://www.tradingview.com/widget-docs/faq/languages/', file: 'faq-languages.md' },
  { url: 'https://www.tradingview.com/widget-docs/faq/many-widgets/', file: 'faq-many-widgets.md' },
  
  // Charts widgets
  { url: 'https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/', file: 'charts/advanced-chart.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/charts/mini-chart/', file: 'charts/mini-chart.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/charts/symbol-overview/', file: 'charts/symbol-overview.md' },
  
  // Tickers widgets
  { url: 'https://www.tradingview.com/widget-docs/widgets/tickers/ticker/', file: 'tickers/ticker.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/tickers/ticker-tape/', file: 'tickers/ticker-tape.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/tickers/single-ticker/', file: 'tickers/single-ticker.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/tickers/ticker-tag/', file: 'tickers/ticker-tag.md' },
  
  // Heatmaps
  { url: 'https://www.tradingview.com/widget-docs/widgets/heatmaps/crypto-heatmap/', file: 'heatmaps/crypto-heatmap.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/heatmaps/stock-heatmap/', file: 'heatmaps/stock-heatmap.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/heatmaps/etf-heatmap/', file: 'heatmaps/etf-heatmap.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/heatmaps/forex-heatmap/', file: 'heatmaps/forex-heatmap.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/heatmaps/forex-cross-rates/', file: 'heatmaps/forex-cross-rates.md' },
  
  // Screeners
  { url: 'https://www.tradingview.com/widget-docs/widgets/screeners/screener/', file: 'screeners/screener.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/screeners/crypto-mkt-screener/', file: 'screeners/crypto-mkt-screener.md' },
  
  // Watchlists
  { url: 'https://www.tradingview.com/widget-docs/widgets/watchlists/market-overview/', file: 'watchlists/market-overview.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/watchlists/market-quotes/', file: 'watchlists/market-quotes.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/watchlists/market-summary/', file: 'watchlists/market-summary.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/watchlists/stock-market/', file: 'watchlists/stock-market.md' },
  
  // Symbol Details
  { url: 'https://www.tradingview.com/widget-docs/widgets/symbol-details/symbol-info/', file: 'symbol-details/symbol-info.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/symbol-details/company-profile/', file: 'symbol-details/company-profile.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/symbol-details/fundamental-data/', file: 'symbol-details/fundamental-data.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/symbol-details/technical-analysis/', file: 'symbol-details/technical-analysis.md' },
  
  // News
  { url: 'https://www.tradingview.com/widget-docs/widgets/news/top-stories/', file: 'news/top-stories.md' },
  
  // Calendars
  { url: 'https://www.tradingview.com/widget-docs/widgets/calendars/economic-calendar/', file: 'calendars/economic-calendar.md' },
  
  // Economics
  { url: 'https://www.tradingview.com/widget-docs/widgets/economics/economic-map/', file: 'economics/economic-map.md' },
  
  // Tutorials
  { url: 'https://www.tradingview.com/widget-docs/tutorials/web-components/layout-and-sizing/', file: 'tutorials/web-components/layout-and-sizing.md' },
  { url: 'https://www.tradingview.com/widget-docs/tutorials/web-components/styling-and-themes/', file: 'tutorials/web-components/styling-and-themes.md' },
  { url: 'https://www.tradingview.com/widget-docs/tutorials/web-components/configuring/', file: 'tutorials/web-components/configuring.md' },
  { url: 'https://www.tradingview.com/widget-docs/tutorials/iframe/set-widget-size/', file: 'tutorials/iframe/set-widget-size.md' },
  { url: 'https://www.tradingview.com/widget-docs/tutorials/iframe/lazy-loading/', file: 'tutorials/iframe/lazy-loading.md' },
  { url: 'https://www.tradingview.com/widget-docs/tutorials/iframe/build-page/', file: 'tutorials/iframe/build-page.md' },
  { url: 'https://www.tradingview.com/widget-docs/tutorials/iframe/build-page/getting-started/', file: 'tutorials/iframe/build-page/getting-started.md' },
  { url: 'https://www.tradingview.com/widget-docs/tutorials/iframe/build-page/widget-integration/', file: 'tutorials/iframe/build-page/widget-integration.md' },
  { url: 'https://www.tradingview.com/widget-docs/tutorials/iframe/build-page/navigation/', file: 'tutorials/iframe/build-page/navigation.md' },
  { url: 'https://www.tradingview.com/widget-docs/tutorials/iframe/build-page/dynamic-symbols/', file: 'tutorials/iframe/build-page/dynamic-symbols.md' },
  { url: 'https://www.tradingview.com/widget-docs/tutorials/iframe/build-page/conclusion/', file: 'tutorials/iframe/build-page/conclusion.md' },
];

// Ensure directory exists
function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Extract images from HTML
function extractImages(html, baseUrl) {
  const images = [];
  
  // Match img tags
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  
  while ((match = imgRegex.exec(html)) !== null) {
    let imgUrl = match[1];
    
    // Handle relative URLs
    if (imgUrl.startsWith('//')) {
      imgUrl = 'https:' + imgUrl;
    } else if (imgUrl.startsWith('/')) {
      imgUrl = new URL(imgUrl, baseUrl).href;
    }
    
    // Get alt text
    const altMatch = match[0].match(/alt=["']([^"']*)["']/i);
    const alt = altMatch ? altMatch[1] : '';
    
    images.push({ url: imgUrl, alt, tag: match[0] });
  }
  
  // Also match background images in style attributes
  const bgRegex = /background-image:\s*url\(["']?([^"')]+)["']?\)/gi;
  while ((match = bgRegex.exec(html)) !== null) {
    let imgUrl = match[1];
    if (imgUrl.startsWith('//')) {
      imgUrl = 'https:' + imgUrl;
    } else if (imgUrl.startsWith('/')) {
      imgUrl = new URL(imgUrl, baseUrl).href;
    }
    images.push({ url: imgUrl, alt: 'background image', tag: match[0] });
  }
  
  return [...new Map(images.map(img => [img.url, img])).values()];
}

// Extract code blocks from HTML
function extractCodeBlocks(html) {
  const codeBlocks = [];
  
  // Match pre/code blocks
  const codeRegex = /<pre[^>]*><code[^>]*(?:class=["']language-(\w+)["'][^>]*)?>([\s\S]*?)<\/code><\/pre>/gi;
  let match;
  
  while ((match = codeRegex.exec(html)) !== null) {
    const language = match[1] || 'html';
    const code = match[2]
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
    
    codeBlocks.push({ language, code });
  }
  
  // Also match script tags with type module or javascript
  const scriptRegex = /<script(?:\s+type=["'](?:text\/javascript|module)["'])?>([\s\S]*?)<\/script>/gi;
  while ((match = scriptRegex.exec(html)) !== null) {
    const code = match[1].trim();
    if (code.length > 20) { // Only include non-empty scripts
      codeBlocks.push({ language: 'javascript', code });
    }
  }
  
  return codeBlocks;
}

// Clean HTML to text
function htmlToMarkdown(html) {
  return html
    // Remove scripts and styles
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    // Convert headings
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n')
    .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '\n##### $1\n')
    // Convert paragraphs
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '\n$1\n')
    // Convert lists
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    .replace(/<\/?ul[^>]*>/gi, '\n')
    .replace(/<\/?ol[^>]*>/gi, '\n')
    // Convert links
    .replace(/<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    // Convert bold/strong
    .replace(/<(strong|b)[^>]*>(.*?)<\/(strong|b)>/gi, '**$2**')
    // Convert italic/em
    .replace(/<(em|i)[^>]*>(.*?)<\/(em|i)>/gi, '*$2*')
    // Convert code
    .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
    // Convert line breaks
    .replace(/<br\s*\/?>/gi, '\n')
    // Remove remaining tags
    .replace(/<[^>]+>/g, '')
    // Clean up whitespace
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
}

// Analyze image with VLM
async function analyzeImage(zai, imageUrl, context = '') {
  try {
    const prompt = `Analyze this TradingView widget documentation image.
${context ? `Context: ${context}\n` : ''}
Describe:
1. What type of widget or chart is shown
2. Key UI elements and their purpose
3. Any configuration options visible
4. How to implement or use this widget

Be specific and technical for developers.`;

    const response = await zai.chat.completions.createVision({
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: imageUrl } }
          ]
        }
      ],
      thinking: { type: 'disabled' }
    });

    return response.choices[0]?.message?.content || 'Image analysis not available';
  } catch (error) {
    console.error(`  ⚠️ Failed to analyze image ${imageUrl}: ${error.message}`);
    return `Image: ${imageUrl}\n(Analysis failed: ${error.message})`;
  }
}

// Download image
async function downloadImage(url, outputPath) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(outputPath, Buffer.from(buffer));
    return true;
  } catch (error) {
    console.error(`  ⚠️ Failed to download image: ${error.message}`);
    return false;
  }
}

// Process a single URL
async function processUrl(zai, urlInfo, imagesDir, index, total) {
  const { url, file } = urlInfo;
  const outputPath = path.join(BASE_DIR, file);
  
  console.log(`\n[${index + 1}/${total}] Processing: ${url}`);
  
  try {
    // Fetch page content
    const result = await zai.functions.invoke('page_reader', { url });
    
    if (!result.data?.html) {
      console.error(`  ✗ No HTML content received`);
      return { success: false, url, error: 'No HTML content' };
    }
    
    const html = result.data.html;
    const title = result.data.title || 'TradingView Widget Documentation';
    
    // Extract images
    const images = extractImages(html, url);
    console.log(`  Found ${images.length} images`);
    
    // Extract code blocks
    const codeBlocks = extractCodeBlocks(html);
    console.log(`  Found ${codeBlocks.length} code blocks`);
    
    // Convert HTML to markdown
    const markdown = htmlToMarkdown(html);
    
    // Process images with VLM
    const imageAnalyses = [];
    for (let i = 0; i < Math.min(images.length, 5); i++) { // Limit to 5 images per page
      const img = images[i];
      console.log(`  Analyzing image ${i + 1}/${Math.min(images.length, 5)}...`);
      
      // Download image locally
      const imgExt = img.url.split('.').pop().split('?')[0] || 'png';
      const imgFileName = `${path.basename(file, '.md')}_img${i + 1}.${imgExt}`;
      const imgPath = path.join(imagesDir, imgFileName);
      
      const downloaded = await downloadImage(img.url, imgPath);
      
      if (downloaded) {
        // Analyze with VLM
        const analysis = await analyzeImage(zai, img.url, title);
        imageAnalyses.push({
          url: img.url,
          localPath: `images/${imgFileName}`,
          alt: img.alt,
          analysis
        });
      }
    }
    
    // Build the document
    let doc = `# ${title}\n\n`;
    doc += `**Source:** ${url}\n\n---\n\n`;
    
    // Add main content
    doc += `## Documentation Content\n\n`;
    doc += markdown + '\n\n';
    
    // Add code examples
    if (codeBlocks.length > 0) {
      doc += `## Code Examples\n\n`;
      codeBlocks.forEach((block, i) => {
        doc += `### Example ${i + 1} (${block.language})\n\n`;
        doc += '```' + block.language + '\n';
        doc += block.code + '\n';
        doc += '```\n\n';
      });
    }
    
    // Add image analyses
    if (imageAnalyses.length > 0) {
      doc += `## Visual Elements\n\n`;
      imageAnalyses.forEach((img, i) => {
        doc += `### Image ${i + 1}: ${img.alt || 'Widget Preview'}\n\n`;
        doc += `![${img.alt || 'Widget Preview'}](${img.localPath})\n\n`;
        doc += `**AI Analysis:**\n${img.analysis}\n\n`;
        doc += `*Original URL: ${img.url}*\n\n---\n\n`;
      });
    }
    
    // Add AI Agent usage notes
    doc += `---\n\n## AI Agent Usage Notes\n\n`;
    doc += `- This document contains TradingView Widget documentation\n`;
    doc += `- Use this information to understand widget configuration options\n`;
    doc += `- Code examples should be adapted to your specific implementation needs\n`;
    doc += `- Images have been analyzed by AI and contain detailed descriptions\n`;
    doc += `- Original URL: ${url}\n`;
    
    // Ensure directory and write file
    ensureDir(outputPath);
    fs.writeFileSync(outputPath, doc);
    console.log(`  ✓ Saved: ${file}`);
    
    return { success: true, url, file, images: imageAnalyses.length, codeBlocks: codeBlocks.length };
    
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
    return { success: false, url, error: error.message };
  }
}

// Main function
async function main() {
  console.log('🚀 TradingView Widgets Documentation Scraper\n');
  
  // Create images directory
  const imagesDir = path.join(BASE_DIR, 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  // Initialize ZAI
  console.log('Initializing AI SDK...');
  const zai = await ZAI.create();
  console.log('✓ SDK initialized\n');
  
  // Process all URLs
  const results = [];
  for (let i = 0; i < WIDGET_URLS.length; i++) {
    const result = await processUrl(zai, WIDGET_URLS[i], imagesDir, i, WIDGET_URLS.length);
    results.push(result);
    
    // Add delay to avoid rate limiting
    if (i < WIDGET_URLS.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // Summary
  console.log('\n\n📊 Summary');
  console.log('='.repeat(50));
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✓ Successful: ${successful.length}`);
  console.log(`✗ Failed: ${failed.length}`);
  
  let totalImages = 0;
  let totalCodeBlocks = 0;
  successful.forEach(r => {
    totalImages += r.images || 0;
    totalCodeBlocks += r.codeBlocks || 0;
  });
  
  console.log(`📸 Total images analyzed: ${totalImages}`);
  console.log(`💻 Total code blocks extracted: ${totalCodeBlocks}`);
  
  if (failed.length > 0) {
    console.log('\nFailed URLs:');
    failed.forEach(r => console.log(`  - ${r.url}: ${r.error}`));
  }
  
  // Create/update README
  const readme = `# TradingView Widgets Documentation

This folder contains comprehensive TradingView widget documentation with:
- Full documentation content
- Code examples
- AI-analyzed images and screenshots

## Statistics
- **Total pages**: ${successful.length}
- **Images analyzed**: ${totalImages}
- **Code examples**: ${totalCodeBlocks}

## Structure
- \`getting-started.md\` - Introduction to widgets
- \`widget-formats.md\` - iframe vs Web Components
- \`theme-builder.md\` - Theme customization
- \`charts/\` - Chart widget documentation
- \`tickers/\` - Ticker widget documentation
- \`heatmaps/\` - Heatmap widget documentation
- \`screeners/\` - Screener widget documentation
- \`watchlists/\` - Watchlist widget documentation
- \`symbol-details/\` - Symbol detail widgets
- \`news/\` - News widget documentation
- \`calendars/\` - Calendar widget documentation
- \`economics/\` - Economic widget documentation
- \`tutorials/\` - Implementation tutorials
- \`images/\` - Downloaded and analyzed images

## AI Agent Usage
Each document includes:
1. Full documentation content
2. Code examples (HTML, JavaScript)
3. Image descriptions by AI (what the widget looks like, how to use it)
4. Configuration notes

## Source
All content from: https://www.tradingview.com/widget-docs/
`;

  fs.writeFileSync(path.join(BASE_DIR, 'README.md'), readme);
  console.log('\n✓ README.md updated');
  
  console.log('\n✨ Done!');
}

main().catch(console.error);
