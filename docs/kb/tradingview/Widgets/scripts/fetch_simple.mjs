#!/usr/bin/env node
/**
 * Simple TradingView Widgets Scraper - Puppeteer Lite
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');
const IMAGES_DIR = path.join(BASE_DIR, 'images');

// Just a few key pages
const URLS = [
  { url: 'https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/', file: 'charts/advanced-chart.md' },
  { url: 'https://www.tradingview.com/widget-docs/widgets/tickers/ticker-tape/', file: 'tickers/ticker-tape.md' },
];

function ensureDir(p) {
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function main() {
  console.log('🚀 Simple Puppeteer Scraper\n');
  
  if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  for (const { url, file } of URLS) {
    console.log(`Processing: ${url}`);
    const page = await browser.newPage();
    
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await new Promise(r => setTimeout(r, 3000)); // Wait for JS
      
      const title = await page.title();
      
      // Get text content
      const text = await page.evaluate(() => {
        const main = document.querySelector('main') || document.body;
        return main.innerText;
      });
      
      // Get code blocks
      const codeBlocks = await page.evaluate(() => {
        const blocks = [];
        document.querySelectorAll('pre, code, [class*="code"]').forEach(el => {
          const text = el.innerText;
          if (text.length > 50 && (text.includes('<script') || text.includes('{'))) {
            blocks.push(text);
          }
        });
        return blocks.slice(0, 3);
      });
      
      // Screenshot
      const screenshot = `${path.basename(file, '.md')}.png`;
      await page.screenshot({ path: path.join(IMAGES_DIR, screenshot) });
      
      // Build doc
      let doc = `# ${title}\n\n**Source:** ${url}\n\n---\n\n`;
      doc += `## Content\n\n${text}\n\n`;
      
      if (codeBlocks.length > 0) {
        doc += `## Code Examples\n\n`;
        codeBlocks.forEach((code, i) => {
          const lang = code.includes('<') ? 'html' : 'javascript';
          doc += `\`\`\`${lang}\n${code}\n\`\`\`\n\n`;
        });
      }
      
      doc += `## Screenshot\n\n![Widget](images/${screenshot})\n\n`;
      doc += `---\n\n**Original URL:** ${url}\n`;
      
      const outputPath = path.join(BASE_DIR, file);
      ensureDir(outputPath);
      fs.writeFileSync(outputPath, doc);
      console.log(`  ✓ Saved: ${file}`);
      
    } catch (e) {
      console.error(`  ✗ Error: ${e.message}`);
    }
    
    await page.close();
  }
  
  await browser.close();
  console.log('\n✨ Done!');
}

main().catch(console.error);
