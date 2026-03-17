#!/usr/bin/env python3
"""Capture screenshots of chart iframes for VLM analysis."""

import asyncio
from playwright.async_api import async_playwright
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

IFRAME_URLS = [
    ('intro', 'https://tradingview.github.io/lightweight-charts/e66b24f4c6d97abb0d3269dee7748f63.html'),
    ('chart-colors', 'https://tradingview.github.io/lightweight-charts/14e2052f6e317b7e5e74a019ebc64bc8.html'),
    ('crosshair', 'https://tradingview.github.io/lightweight-charts/28da266766af0b9f00869c4752fd9728.html'),
    ('series', 'https://tradingview.github.io/lightweight-charts/252eccb3441ffe3f12a6550113b197d2.html'),
    ('data-points', 'https://tradingview.github.io/lightweight-charts/b795ff6a950432820e8be9ea63844946.html'),
    ('second-series', 'https://tradingview.github.io/lightweight-charts/4ce3dd9dcf7c5ea67e4c322bbbe543e5.html'),
    ('time-scale', 'https://tradingview.github.io/lightweight-charts/24ff7b383e9248b136a14a4e39789246.html'),
    ('creating-a-chart', 'https://tradingview.github.io/lightweight-charts/fdd4d73df0fa987528278b79ea5f92a8.html'),
    ('price-format', 'https://tradingview.github.io/lightweight-charts/c972e27c8b2b922ef2f891411520075c.html'),
    ('finishing-touches', 'https://tradingview.github.io/lightweight-charts/e66b24f4c6d97abb0d3269dee7748f63.html'),
]

async def capture_screenshots():
    """Capture screenshots of all chart iframes."""
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1200, 'height': 600})
        
        for name, url in IFRAME_URLS:
            page = await context.new_page()
            try:
                print(f"Capturing {name}...")
                await page.goto(url, wait_until='networkidle', timeout=30000)
                await asyncio.sleep(2)  # Wait for chart to render
                screenshot_path = os.path.join(SCRIPT_DIR, f"{name}.png")
                await page.screenshot(path=screenshot_path, full_page=False)
                print(f"Saved: {screenshot_path}")
            except Exception as e:
                print(f"Error capturing {name}: {e}")
            await page.close()
        
        await browser.close()
        print("Done!")

if __name__ == '__main__':
    asyncio.run(capture_screenshots())
