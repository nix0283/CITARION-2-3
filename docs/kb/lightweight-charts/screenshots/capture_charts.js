const { chromium } = require('playwright');
const path = require('path');

const iframeUrls = [
  { name: 'intro', url: 'https://tradingview.github.io/lightweight-charts/e66b24f4c6d97abb0d3269dee7748f63.html' },
  { name: 'chart-colors', url: 'https://tradingview.github.io/lightweight-charts/14e2052f6e317b7e5e74a019ebc64bc8.html' },
  { name: 'crosshair', url: 'https://tradingview.github.io/lightweight-charts/28da266766af0b9f00869c4752fd9728.html' },
  { name: 'series', url: 'https://tradingview.github.io/lightweight-charts/252eccb3441ffe3f12a6550113b197d2.html' },
  { name: 'data-points', url: 'https://tradingview.github.io/lightweight-charts/b795ff6a950432820e8be9ea63844946.html' },
  { name: 'second-series', url: 'https://tradingview.github.io/lightweight-charts/4ce3dd9dcf7c5ea67e4c322bbbe543e5.html' },
  { name: 'time-scale', url: 'https://tradingview.github.io/lightweight-charts/24ff7b383e9248b136a14a4e39789246.html' },
  { name: 'creating-a-chart', url: 'https://tradingview.github.io/lightweight-charts/fdd4d73df0fa987528278b79ea5f92a8.html' },
  { name: 'price-format', url: 'https://tradingview.github.io/lightweight-charts/c972e27c8b2b922ef2f891411520075c.html' },
  { name: 'finishing-touches', url: 'https://tradingview.github.io/lightweight-charts/e66b24f4c6d97abb0d3269dee7748f63.html' }
];

async function captureScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1200, height: 600 }
  });
  
  for (const item of iframeUrls) {
    const page = await context.newPage();
    try {
      console.log(`Capturing ${item.name}...`);
      await page.goto(item.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000); // Wait for chart to render
      const screenshotPath = path.join(__dirname, `${item.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`Saved: ${screenshotPath}`);
    } catch (error) {
      console.error(`Error capturing ${item.name}: ${error.message}`);
    }
    await page.close();
  }
  
  await browser.close();
  console.log('Done!');
}

captureScreenshots();
