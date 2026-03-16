# Widget Tutorials: Integration Details

**Source:** https://www.tradingview.com/widget-docs/tutorials/iframe/build-page/widget-integration

---

Home / Tutorials / Iframe / Build a page / Widget integrationtype: iframe# Widget integration
In this section, we will discuss the integration of each TradingView widget, with detailed instructions regarding code embedding and widget placement. Each widget provides different insights into a company or stock’s performance, and as such, they will each play a unique role on our web page.

## Matching the widgets to your page design
All the widgets have two themes to choose from: ‘light’ and ‘dark’. In this tutorial, we will use the ‘light’ theme because it matches our existing page design, which has a white background color.

TipPlease note that we are also utilizing the `isTransparent` option for the widget. This ensures a seamless integration into the page by removing the outer border and making the widget appear as part of the page. This feature is especially helpful if your page does not have a pure white or black background color (for the dark theme option).

## Integrating the Legacy Ticker Tape Widget
We’ll start by integrating the Legacy Ticker Tape widget into our webpage. The Legacy Ticker Tape gives a real-time representation of the performance of a group of symbols.

Head to the configurator for the Legacy Ticker Tape widget, customise the settings as you see fit and then copy the code to be embedded in the page.

Getting the widget into the page is as simple as copy-pasting the embed code inside the element on the page where you would like it to appear. In this case we want to insert the code inside this element:

- HTML`<nav id="ticker-tape"></nav>`" data-copied=Copied!>which would end up looking like this:

HTML`<nav id="ticker-tape"> <!-- TradingView Widget BEGIN --> <div class="tradingview-widget-container"> <div class="tradingview-widget-container__widget"></div> <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js" async> { "symbols": [ { "description": "", "proName": "NASDAQ:TSLA" }, { "description": "", "proName": "NASDAQ:AAPL" }, { "description": "", "proName": "NASDAQ:NVDA" }, { "description": "", "proName": "NASDAQ:MSFT" }, { "description": "", "proName": "NASDAQ:AMZN" }, { "description": "", "proName": "NASDAQ:GOOGL" }, { "description": "", "proName": "NASDAQ:META" }, { "description": "", "proName": "NYSE:BRK.B" }, { "description": "", "proName": "NYSE:LLY" }, { "description": "", "proName": "NYSE:UNH" }, { "description": "", "proName": "NYSE:V" }, { "description": "", "proName": "NYSE:WMT" } ], "showSymbolLogo": true, "colorTheme": "light", "isTransparent": false, "displayMode": "adaptive", "locale": "en" } </script> </div> <!-- TradingView Widget END --></nav>`      " data-copied=Copied!>WarningThe majority of widgets require that either the height is defined within the widget options, or if ‘Use container size’ is selected that the container element should have a specific height defined by the CSS rule / style for that element.

However, Legacy Ticker Tape is one of the widgets which doesn’t require this and will instead occupy enough height to display it’s contents automatically. So we can adjust the skeleton styles to remove the CSS manually setting a height for the `#ticker-tape` element.

CSS`.skeleton,#ticker-tape, /* ← remove this line*/#symbol-info,#advanced-chart,#company-profile,#fundamental-data,#technical-analysis,#top-stories,#ticker-tape { text-align: center; padding: 16px; font-size: 24px; background: rgba(0, 0, 0, 0.075); border-radius: 4px;}
#ticker-tape { width: 100%; margin-bottom: var(--gap-size); height: 75px; /* ← remove this line*/}`This will remove the skeleton styling on that element and set height to the default of `auto`.

## Integrating the Symbol Info Widget
Next, we will add the Symbol Info widget, which provides useful details related to a specific symbol. The widget displays key summary metrics for the symbol, including the current price and fundamental data such as the symbol’s market cap.

Symbol Info is another widget which doesn’t require a specific height to be set for the container and will instead automatically adjust it’s height to fit it’s content.

So adding the Symbol info widget follows the same steps as the Legacy Ticker Tape widget.

Configure the widget on the Wizard page
- Grab the embed code
- paste it within the desired element on the page (`<section id="symbol-info"></section>`)
- and adjust the CSS to remove the skeleton styling and predefined height.

You should end up with the HTML element looking like this:

HTML`<section id="symbol-info"> <!-- TradingView Widget BEGIN --> <div class="tradingview-widget-container"> <div class="tradingview-widget-container__widget"></div> <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js" async> { "symbol": "NASDAQ:AAPL", "width": "100%", "locale": "en", "colorTheme": "light", "isTransparent": true } </script> </div> <!-- TradingView Widget END --></section>`      " data-copied=Copied!>and the CSS being updated like this:

CSS`.skeleton,#symbol-info, /* ← remove this line*/#advanced-chart,#company-profile,#fundamental-data,
#symbol-info { height: 175px; /* ← remove this line*/}`TipNote that we are using the `isTransparent` option for the widget so that it fits more seamlessly into the page since the outer border will be removed and the widget will appear part of the page.

## Adding the Advanced Chart Widget
The Advanced Chart widget is one of the most valuable widgets for visualizing stock data. It provides various chart types, technical indicators, and drawing tools for efficient technical analysis.

Just like all the widgets, integrating the Advanced Chart widget is as simple as configuring your options, copying the embed code, and pasting it into the desired section of your page.

However, this is the first widget we’ve encountered during this tutorial which offers additional configuration for height of the widget. When ‘Use container size’ is selected then the widget will automatically grow to fill the size of the containing widget. Thus it is important to define a height for the container element if you make use of the autosize option.

In this case we are setting the height of the container to 500px via the CSS rules for that element:

CSS`#advanced-chart { height: 500px;}`Don’t forget to remove the skeleton styles for the `#advanced-chart` selector as you’ve previously done for the Legacy Ticker Tape and Symbol Info widgets.

## Integrating the remaining Widgets (Company Profile, Fundamental Data, Technical Analysis, Top Stories)
The remaining widgets, namely the Company Profile, Fundamental Data, Technical Analysis, and Top Stories widgets provide detailed information about the company, its financials, technical analysis of the stock, and news related to the company respectively.

Embed each of these widgets in their respective `<section id=""></section>` that matches the widget name. You can get the code for these widgets like the others from TradingView’s widget page.

Remember to adjust parameters such as `"symbol"`, `"colorTheme"`, `"isTransparent"` and `"locale"` etc., to match your specific requirements and match the style of your page.

That’s it — you’ve now integrated each of the TradingView widgets into your webpage. This combination will provide an in-depth overview of any stock your page visitors choose to view.

## Complete code

```
<!doctype html><html lang="en"> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Stock Details</title> <style> :root { --gap-size: 32px; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; color: #000; }
 * { box-sizing: border-box; }
 body { margin: 0; padding: 0; display: flex; flex-direction: column; align-items: center; background: #fff; }
 header, footer { display: flex; width: 100%; align-items: center; background: rgba(0, 0, 0, 0.05); gap: 12px; }
 header { justify-content: space-between; padding: 0 var(--gap-size); gap: calc(var(--gap-size) * 2); box-shadow: rgba(0, 0, 0, 0.05) 0 2px 6px 0; flex-direction: row; z-index: 1; }
 header #site-logo { font-weight: 600; font-size: 32px; padding: 16px; background: var( --18-promo-gradient-02, linear-gradient(90deg, #00bce5 0%, #2962ff 100%) ); -webkit-text-fill-color: transparent; -webkit-background-clip: text; background-clip: text; }
 header input[type='search'] { padding: 10px; width: 100%; height: 32px; max-width: 400px; border: 1px solid #ccc; border-radius: 20px; }
 footer { flex-direction: column; padding: calc(var(--gap-size) * 0.5) var(--gap-size); margin-top: var(--gap-size); border-top: solid 2px rgba(0, 0, 0, 0.1); justify-content: center; }
 footer p, #powered-by-tv p { margin: 0; font-size: 12px; color: rgba(0, 0, 0, 0.6); }
 main { display: grid; width: 100%; padding: 0 calc(var(--gap-size) * 0.5); max-width: 960px; grid-template-columns: 1fr 1fr; grid-gap: var(--gap-size); }
 .span-full-grid, #symbol-info, #advanced-chart, #company-profile, #fundamental-data { grid-column: span 2; }
 .span-one-column, #technical-analysis, #top-stories, #powered-by-tv { grid-column: span 1; }
 #ticker-tape { width: 100%; margin-bottom: var(--gap-size); }
 #advanced-chart { height: 500px; }
 #company-profile { height: 390px; }
 #fundamental-data { height: 490px; }
 #technical-analysis, #top-stories { height: 425px; }
 #powered-by-tv { display: flex; background: #f8f9fd; border: solid 1px #e0e3eb; text-align: justify; flex-direction: column; gap: 8px; font-size: 14px; padding: 16px; border-radius: 6px; }
 #powered-by-tv a, #powered-by-tv a:visited { color: #2962ff; }
 @media (max-width: 800px) { main > section, .span-full-grid, #technical-analysis, #top-stories, #powered-by-tv { grid-column: span 2; } } </style> </head> <body> <header> <a id="site-logo" href="#">TradingVista</a> <input type="search" placeholder="Search..." /> </header> <nav id="ticker-tape"> <!-- TradingView Widget BEGIN --> <div class="tradingview-widget-container"> <div class="tradingview-widget-container__widget"></div> <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js" async > { "symbols": [ { "description": "", "proName": "NASDAQ:TSLA" }, { "description": "", "proName": "NASDAQ:AAPL" }, { "description": "", "proName": "NASDAQ:NVDA" }, { "description": "", "proName": "NASDAQ:MSFT" }, { "description": "", "proName": "NASDAQ:AMZN" }, { "description": "", "proName": "NASDAQ:GOOGL" }, { "description": "", "proName": "NASDAQ:META" }, { "description": "", "proName": "NYSE:BRK.B" }, { "description": "", "proName": "NYSE:LLY" }, { "description": "", "proName": "NYSE:UNH" }, { "description": "", "proName": "NYSE:V" }, { "description": "", "proName": "NYSE:WMT" } ], "showSymbolLogo": true, "colorTheme": "light", "isTransparent": false, "displayMode": "adaptive", "locale": "en" } </script> </div> <!-- TradingView Widget END --> </nav> <main> <section id="symbol-info"> <!-- TradingView Widget BEGIN --> <div class="tradingview-widget-container"> <div class="tradingview-widget-container__widget"></div> <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js" async > { "symbol": "NASDAQ:AAPL", "width": "100%", "locale": "en", "colorTheme": "light", "isTransparent": true } </script> </div> <!-- TradingView Widget END --> </section> <section id="advanced-chart"> <!-- TradingView Widget BEGIN --> <div class="tradingview-widget-container" style="height: 100%; width: 100%" > <div class="tradingview-widget-container__widget" style="height: calc(100% - 32px); width: 100%" ></div> <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js" async > { "autosize": true, "symbol": "NASDAQ:AAPL", "interval": "D", "timezone": "Etc/UTC", "theme": "light", "style": "1", "locale": "en", "allow_symbol_change": true, "calendar": false, "support_host": "https://www.tradingview.com" } </script> </div> <!-- TradingView Widget END --> </section> <section id="company-profile"> <!-- TradingView Widget BEGIN --> <div class="tradingview-widget-container"> <div class="tradingview-widget-container__widget"></div> <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js" async > { "width": "100%", "height": "100%", "colorTheme": "light", "isTransparent": true, "symbol": "NASDAQ:AAPL", "locale": "en" } </script> </div> <!-- TradingView Widget END --> </section> <section id="fundamental-data"> <!-- TradingView Widget BEGIN --> <div class="tradingview-widget-container"> <div class="tradingview-widget-container__widget"></div> <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-financials.js" async > { "colorTheme": "light", "isTransparent": true, "largeChartUrl": "", "displayMode": "adaptive", "width": "100%", "height": "100%", "symbol": "NASDAQ:AAPL", "locale": "en" } </script> </div> <!-- TradingView Widget END --> </section> <section id="technical-analysis"> <!-- TradingView Widget BEGIN --> <div class="tradingview-widget-container"> <div class="tradingview-widget-container__widget"></div> <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js" async > { "interval": "15m", "width": "100%", "isTransparent": true, "height": "100%", "symbol": "NASDAQ:AAPL", "showIntervalTabs": true, "displayMode": "single", "locale": "en", "colorTheme": "light" } </script> </div> <!-- TradingView Widget END --> </section> <section id="top-stories"> <!-- TradingView Widget BEGIN --> <div class="tradingview-widget-container"> <div class="tradingview-widget-container__widget"></div> <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js" async > { "feedMode": "symbol", "symbol": "NASDAQ:AAPL", "colorTheme": "light", "isTransparent": true, "displayMode": "regular", "width": "100%", "height": "100%", "locale": "en" } </script> </div> <!-- TradingView Widget END --> </section> <section id="powered-by-tv"> <svg xmlns="http://www.w3.org/2000/svg" width="157" height="21"> <use href="/widget-docs/tradingview-logo.svg#tradingview-logo" ></use> </svg> <p> Charts and financial information provided by TradingView, a popular charting & trading platform. Check out even more <a href="https://www.tradingview.com/features/" >advanced features</a > or <a href="https://www.tradingview.com/widget/" >grab charts</a > for your website. </p> </section> </main> <footer> <p> This example page is part of a tutorial for integrating TradingView widgets into your website. </p> <p> <a href="https://www.tradingview.com/widget-docs/tutorials/iframe/build-page/#build-a-page" >View the tutorial</a > </p> </footer> </body> <script></script></html>
```
    Stock Details     TradingVista                                                                 Charts and financial information provided by TradingView, a popular charting & trading platform. Check out even more advanced features or grab charts for your website. 

 

---

## AI Agent Usage Notes

- This document contains TradingView Widget documentation
- Use this information to understand widget configuration options
- Code examples should be adapted to your specific implementation needs
- Original URL: https://www.tradingview.com/widget-docs/tutorials/iframe/build-page/widget-integration
