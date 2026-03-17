#!/usr/bin/env node
/**
 * TradingView Widgets Documentation Scraper - No Auth Version
 * Uses native fetch and z-ai CLI for image analysis
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');
const IMAGES_DIR = path.join(BASE_DIR, 'images');

// Widget URLs
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
];

// Ensure directory exists
function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Fetch page with curl
function fetchWithCurl(url) {
  try {
    const result = execSync(
      `curl -sL -A "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36" ` +
      `-H "Accept: text/html,application/xhtml+xml" ` +
      `-H "Accept-Language: en-US,en;q=0.9" ` +
      `"${url}"`,
      { encoding: 'utf-8', maxBuffer: 50 * 1024 * 1024 }
    );
    return result;
  } catch (error) {
    console.error(`  ✗ Curl failed: ${error.message}`);
    return null;
  }
}

// Extract images from HTML
function extractImages(html, baseUrl) {
  const images = [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  
  while ((match = imgRegex.exec(html)) !== null) {
    let imgUrl = match[1];
    if (imgUrl.startsWith('//')) {
      imgUrl = 'https:' + imgUrl;
    } else if (imgUrl.startsWith('/')) {
      imgUrl = new URL(imgUrl, baseUrl).href;
    }
    const altMatch = match[0].match(/alt=["']([^"']*)["']/i);
    images.push({ url: imgUrl, alt: altMatch ? altMatch[1] : '' });
  }
  
  return [...new Map(images.map(img => [img.url, img])).values()];
}

// Extract code blocks from HTML
function extractCodeBlocks(html) {
  const codeBlocks = [];
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
    if (code.length > 10) {
      codeBlocks.push({ language, code });
    }
  }
  
  return codeBlocks;
}

// Download image
function downloadImage(url, outputPath) {
  try {
    execSync(
      `curl -sL "${url}" -o "${outputPath}"`,
      { encoding: 'utf-8' }
    );
    return fs.existsSync(outputPath) && fs.statSync(outputPath).size > 0;
  } catch (error) {
    return false;
  }
}

// Analyze image with VLM CLI
function analyzeImage(imagePath) {
  try {
    const prompt = `Analyze this TradingView widget documentation image. Describe: 1. What type of widget is shown 2. Key UI elements and their purpose 3. Any configuration options visible 4. Implementation notes. Be specific and technical for developers.`;
    
    const result = execSync(
      `z-ai vision -p "${prompt}" -i "${imagePath}"`,
      { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 }
    );
    return result.trim();
  } catch (error) {
    return `Image analysis unavailable: ${error.message}`;
  }
}

// HTML to Markdown conversion
function htmlToMarkdown(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n')
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '\n$1\n')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    .replace(/<\/?ul[^>]*>/gi, '\n')
    .replace(/<\/?ol[^>]*>/gi, '\n')
    .replace(/<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<(strong|b)[^>]*>(.*?)<\/(strong|b)>/gi, '**$2**')
    .replace(/<(em|i)[^>]*>(.*?)<\/(em|i)>/gi, '*$2*')
    .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
}

// Process a single URL
async function processUrl(urlInfo, index, total) {
  const { url, file } = urlInfo;
  const outputPath = path.join(BASE_DIR, file);
  
  console.log(`\n[${index + 1}/${total}] Processing: ${url}`);
  
  // Fetch page
  const html = fetchWithCurl(url);
  if (!html) {
    return { success: false, url, error: 'Failed to fetch' };
  }
  
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)</i);
  const title = titleMatch ? titleMatch[1].split('|')[0].trim() : 'TradingView Widget Documentation';
  
  // Extract main content
  let content = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ||
                html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)?.[1] ||
                html;
  
  // Extract elements
  const images = extractImages(content, url);
  const codeBlocks = extractCodeBlocks(content);
  const markdown = htmlToMarkdown(content);
  
  console.log(`  Found ${images.length} images, ${codeBlocks.length} code blocks`);
  
  // Build document
  let doc = `# ${title}\n\n**Source:** ${url}\n\n---\n\n`;
  doc += `## Documentation Content\n\n${markdown}\n\n`;
  
  // Process images with VLM
  if (images.length > 0) {
    doc += `## Visual Elements\n\n`;
    
    const maxImages = Math.min(images.length, 3);
    for (let i = 0; i < maxImages; i++) {
      const img = images[i];
      const imgExt = img.url.split('.').pop().split('?')[0] || 'png';
      const imgFileName = `${path.basename(file, '.md')}_img${i + 1}.${imgExt}`;
      const imgPath = path.join(IMAGES_DIR, imgFileName);
      
      console.log(`  Downloading image ${i + 1}/${maxImages}...`);
      const downloaded = downloadImage(img.url, imgPath);
      
      if (downloaded) {
        console.log(`  Analyzing image with VLM...`);
        const analysis = analyzeImage(imgPath);
        
        doc += `### Image ${i + 1}: ${img.alt || 'Widget Preview'}\n\n`;
        doc += `![${img.alt || 'Preview'}](images/${imgFileName})\n\n`;
        doc += `**AI Analysis:**\n${analysis}\n\n`;
        doc += `*Original: ${img.url}*\n\n---\n\n`;
      }
    }
  }
  
  // Add code examples
  if (codeBlocks.length > 0) {
    doc += `## Code Examples\n\n`;
    codeBlocks.forEach((block, i) => {
      doc += `### Example ${i + 1} (${block.language})\n\n`;
      doc += '```' + block.language + '\n' + block.code + '\n```\n\n';
    });
  }
  
  // Add AI Agent notes
  doc += `---\n\n## AI Agent Usage Notes\n\n`;
  doc += `- This document contains TradingView Widget documentation\n`;
  doc += `- Use this information to understand widget configuration options\n`;
  doc += `- Code examples should be adapted to your specific implementation needs\n`;
  doc += `- Images have been analyzed by AI with technical descriptions\n`;
  doc += `- Original URL: ${url}\n`;
  
  // Save file
  ensureDir(outputPath);
  fs.writeFileSync(outputPath, doc);
  console.log(`  ✓ Saved: ${file}`);
  
  return { success: true, url, file };
}

// Main
async function main() {
  console.log('🚀 TradingView Widgets Documentation Scraper (No Auth)\n');
  
  // Create directories
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }
  
  const results = [];
  for (let i = 0; i < WIDGET_URLS.length; i++) {
    const result = await processUrl(WIDGET_URLS[i], i, WIDGET_URLS.length);
    results.push(result);
    
    // Delay
    if (i < WIDGET_URLS.length - 1) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  
  // Summary
  console.log('\n📊 Summary');
  console.log('='.repeat(50));
  
  const successful = results.filter(r => r.success);
  console.log(`✓ Successful: ${successful.length}`);
  console.log(`✗ Failed: ${results.length - successful.length}`);
  console.log(`📸 Images: ${fs.readdirSync(IMAGES_DIR).length}`);
  console.log(`📄 Files: ${WIDGET_URLS.length}`);
  
  console.log('\n✨ Done!');
}

main().catch(console.error);
