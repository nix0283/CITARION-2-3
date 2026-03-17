#!/usr/bin/env node
/**
 * TradingView Widgets Documentation Scraper - Puppeteer Version
 * Renders JavaScript pages and extracts content with images
 */

import puppeteer from 'puppeteer';
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
  // Charts widgets - most important
  { url: 'https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/', file: 'charts/advanced-chart.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/charts/mini-chart/', file: 'charts/mini-chart.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/charts/symbol-overview/', file: 'charts/symbol-overview.md' },
  
  // Tickers
  { url: 'https://www.tradingview.com/widget-docs/widgets/tickers/ticker/', file: 'tickers/ticker.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/tickers/ticker-tape/', file: 'tickers/ticker-tape.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/tickers/single-ticker/', file: 'tickers/single-ticker.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/tickers/ticker-tag/', file: 'tickers/ticker-tag.md' },
  
  // Heatmaps
  { url: 'https://www.tradingview.com/widget-docs/widgets/heatmaps/crypto-heatmap/', file: 'heatmaps/crypto-heatmap.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/heatmaps/stock-heatmap/', file: 'heatmaps/stock-heatmap.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/heatmaps/forex-heatmap/', file: 'heatmaps/forex-heatmap.md' },
  
  // Screeners
  { url: 'https://www.tradingview.com/widget-docs/widgets/screeners/screener/', file: 'screeners/screener.md' },
  
  // Watchlists
  { url: 'https://www.tradingview.com/widget-docs/widgets/watchlists/market-overview/', file: 'watchlists/market-overview.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/watchlists/market-quotes/', file: 'watchlists/market-quotes.md' },
  
  // Symbol Details
  { url: 'https://www.tradingview.com/widget-docs/widgets/symbol-details/symbol-info/', file: 'symbol-details/symbol-info.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/symbol-details/technical-analysis/', file: 'symbol-details/technical-analysis.md' },
  
  // Main pages
  { url: 'https://www.tradingview.com/widget-docs/getting-started/', file: 'getting-started.md' },
  { url: 'https://www.tradingview.com/widget-docs/widget-formats/', file: 'widget-formats.md' },
  { url: 'https://www.tradingview.com/widget-docs/theme-builder/', file: 'theme-builder.md' },
];

// Ensure directory exists
function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Analyze image with VLM CLI
function analyzeImage(imagePath) {
  try {
    const prompt = `Analyze this TradingView widget documentation image. Describe: 1. What type of widget is shown 2. Key UI elements and their purpose 3. Any configuration options visible 4. Implementation notes for developers. Be specific and technical.`;
    
    const result = execSync(
      `z-ai vision -p "${prompt}" -i "${imagePath}"`,
      { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024, timeout: 60000 }
    );
    return result.trim();
  } catch (error) {
    return `Image analysis unavailable: ${error.message}`;
  }
}

// Main function
async function main() {
  console.log('🚀 TradingView Widgets Documentation Scraper (Puppeteer)\n');
  
  // Create directories
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }
  
  // Launch browser
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  
  const results = [];
  
  for (let i = 0; i < WIDGET_URLS.length; i++) {
    const { url, file } = WIDGET_URLS[i];
    const outputPath = path.join(BASE_DIR, file);
    
    console.log(`\n[${i + 1}/${WIDGET_URLS.length}] Processing: ${url}`);
    
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });
      
      // Navigate and wait for content
      console.log('  Loading page...');
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      
      // Wait for widget content to load
      await page.waitForSelector('#wizard, .widget-container, main', { timeout: 10000 }).catch(() => {});
      await new Promise(r => setTimeout(r, 2000)); // Extra wait for dynamic content
      
      // Get page title
      const title = await page.title();
      console.log(`  Title: ${title}`);
      
      // Extract content
      const content = await page.evaluate(() => {
        // Get main content area
        const main = document.querySelector('main') || document.querySelector('#wizard') || document.body;
        
        // Extract text content
        const getTextContent = (el) => {
          // Clone to avoid modifying original
          const clone = el.cloneNode(true);
          
          // Remove scripts, styles, nav
          clone.querySelectorAll('script, style, nav, header, footer, .sidebar, .toc').forEach(e => e.remove());
          
          return clone.innerText;
        };
        
        // Extract code blocks
        const codeBlocks = [];
        document.querySelectorAll('pre code, .code-block, [class*="code"]').forEach(code => {
          const text = code.innerText.trim();
          if (text.length > 20 && (text.includes('<') || text.includes('{') || text.includes('function'))) {
            codeBlocks.push(text);
          }
        });
        
        // Extract images
        const images = [];
        document.querySelectorAll('img[src]').forEach(img => {
          if (img.src && !img.src.includes('data:image') && img.width > 100 && img.height > 100) {
            images.push({
              src: img.src,
              alt: img.alt || ''
            });
          }
        });
        
        return {
          text: getTextContent(main),
          codeBlocks: codeBlocks.slice(0, 5),
          images: images.slice(0, 3)
        };
      });
      
      console.log(`  Found ${content.codeBlocks.length} code blocks, ${content.images.length} images`);
      
      // Take screenshot
      const screenshotName = `${path.basename(file, '.md')}_screenshot.png`;
      const screenshotPath = path.join(IMAGES_DIR, screenshotName);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`  Screenshot saved: ${screenshotName}`);
      
      // Analyze screenshot with VLM
      console.log('  Analyzing screenshot with VLM...');
      const screenshotAnalysis = analyzeImage(screenshotPath);
      
      // Download and analyze other images
      const imageAnalyses = [];
      for (let j = 0; j < content.images.length; j++) {
        const img = content.images[j];
        const imgName = `${path.basename(file, '.md')}_img${j + 1}.png`;
        const imgPath = path.join(IMAGES_DIR, imgName);
        
        try {
          const viewSource = await page.goto(img.src, { timeout: 10000 });
          const buffer = await viewSource.buffer();
          fs.writeFileSync(imgPath, buffer);
          await page.goBack();
          
          console.log(`  Analyzing image ${j + 1}...`);
          const analysis = analyzeImage(imgPath);
          imageAnalyses.push({
            src: img.src,
            alt: img.alt,
            localPath: `images/${imgName}`,
            analysis
          });
        } catch (e) {
          console.log(`  ⚠️ Failed to download image: ${e.message}`);
        }
      }
      
      // Build document
      let doc = `# ${title}\n\n`;
      doc += `**Source:** ${url}\n\n---\n\n`;
      
      // Add main content
      doc += `## Documentation Content\n\n`;
      doc += content.text.split('\n').filter(line => line.trim()).join('\n\n');
      doc += '\n\n';
      
      // Add screenshot analysis
      doc += `## Widget Screenshot\n\n`;
      doc += `![${title}](images/${screenshotName})\n\n`;
      doc += `**AI Analysis:**\n${screenshotAnalysis}\n\n---\n\n`;
      
      // Add image analyses
      if (imageAnalyses.length > 0) {
        doc += `## Additional Images\n\n`;
        imageAnalyses.forEach((img, idx) => {
          doc += `### Image ${idx + 1}: ${img.alt || 'Widget Element'}\n\n`;
          doc += `![${img.alt}](../${img.localPath})\n\n`;
          doc += `**AI Analysis:**\n${img.analysis}\n\n---\n\n`;
        });
      }
      
      // Add code examples
      if (content.codeBlocks.length > 0) {
        doc += `## Code Examples\n\n`;
        content.codeBlocks.forEach((code, idx) => {
          const lang = code.includes('<') ? 'html' : code.includes('{') ? 'javascript' : 'text';
          doc += `### Example ${idx + 1}\n\n`;
          doc += '```' + lang + '\n' + code + '\n```\n\n';
        });
      }
      
      // Add AI Agent notes
      doc += `---\n\n## AI Agent Usage Notes\n\n`;
      doc += `- This document contains TradingView Widget documentation\n`;
      doc += `- All images have been analyzed by AI with technical descriptions\n`;
      doc += `- Code examples extracted from the page\n`;
      doc += `- Original URL: ${url}\n`;
      
      // Save file
      ensureDir(outputPath);
      fs.writeFileSync(outputPath, doc);
      console.log(`  ✓ Saved: ${file}`);
      
      results.push({ success: true, url, file });
      
      await page.close();
      
    } catch (error) {
      console.error(`  ✗ Error: ${error.message}`);
      results.push({ success: false, url, error: error.message });
    }
    
    // Delay between requests
    if (i < WIDGET_URLS.length - 1) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  
  await browser.close();
  
  // Summary
  console.log('\n📊 Summary');
  console.log('='.repeat(50));
  
  const successful = results.filter(r => r.success);
  console.log(`✓ Successful: ${successful.length}`);
  console.log(`✗ Failed: ${results.length - successful.length}`);
  console.log(`📸 Screenshots: ${fs.readdirSync(IMAGES_DIR).length}`);
  
  console.log('\n✨ Done!');
}

main().catch(console.error);
