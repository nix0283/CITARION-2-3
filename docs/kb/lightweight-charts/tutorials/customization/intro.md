---
title: Customizing the Chart | Lightweight Charts
source_url: https://tradingview.github.io/lightweight-charts/tutorials/customization/intro
---
# Customization - Introduction
This tutorial provides an introduction to customizing Lightweight Charts™ appearance and functionality. It is not meant as an exhaustive tutorial but rather as a guided tour on how and where to apply options within the API to adjust specific parts of the chart. Along the way, we will provide links to the API documentation which outline the full set of options available for each part of the chart. It is highly recommended that you explore these API links to discover the wide range of possible customization and feature flags contained within Lightweight Charts™.
## What we will be building
Before we get started, let us have a look at what we will be building in this tutorial.
[View iframe: /lightweight-charts/e66b24f4c6d97abb0d3269dee7748f63.html]
[View in a new window](https://tradingview.github.io/lightweight-charts/e66b24f4c6d97abb0d3269dee7748f63.html)

## Image Descriptions

**Chart Visualization:**
- **Chart Type**: Candlestick chart displaying financial time-series price data over time
- **Color Scheme**: Dark navy/black background with blue (bullish/upward price movements) and red (bearish/downward price movements) candlesticks; white text and grid lines
- **Visual Elements**: Candlesticks showing open, high, low, close (OHLC) prices; time axis (x-axis: Dec 2018–May 2019); price axis (y-axis: €144–€212); horizontal dashed reference lines
- **Special Features**: Yellow markers highlighting recent price peaks; purple price label showing current value (€193.59); dark theme for high contrast and readability
## Topics to be covered
The following topics will be covered within the tutorial:
- Styling the main chart
- Styling a series
- Setting a custom price formatter
- Adjusting the Price Scale
- Adjusting the Time Scale
- Customising the Crosshair
- Adding a second series
- Customising the appearance of a few data points
- Setting a different font
## Prerequisite knowledge
The tutorial requires basic knowledge of:
- Javascript
- HTML
- CSS
tip
The tutorial will assume that you've already read the [Getting Started](https://tradingview.github.io/lightweight-charts/docs) section even though we may repeat a few aspects from that guide.
## Terminology
- **Data Series (aka data/dataset):** A collection of data points representing a specific metric over time.
- **Series Type:** A series type specifies how to draw the data on the chart. For example, a line series type will plot the data series on the chart as a series of the data points connected by straight line segments. Available series types: [Series types | Lightweight Charts](https://tradingview.github.io/lightweight-charts/docs/series-types)
- **Series:** A combination of a specified series type and a data series.
- **Price Scale:** Price Scale (or price axis) is a vertical scale that mostly maps prices to coordinates and vice versa.
- **Time Scale:** Time scale (or time axis) is a horizontal scale at the bottom of the chart that displays the time of bars.
- **Crosshair:** Thin vertical and horizontal lines centered on a data point in the chart.
## How to set up the example so you can follow along
This guide makes use of a single HTML file which you can download to your computer and run in the browser without the need for any build steps or web servers. The only thing required is an active internet connection such that the Lightweight Charts™ library can be downloaded from the CDN.
Provided below is the 'starting point' file for the guide which is a simple HTML page scaffolded out with a single div element (`#container`) and a JS function to generate the sample data set. **At this point, you won't see anything on the page until we add the chart in the next step.**
You can either:
- [Download the file](https://tradingview.github.io/lightweight-charts/b75a863c69ac849528696e2770bdb75f.html) and then edit and run the example on your computer,
- or [open this JSFiddle](https://jsfiddle.net/TradingView/5h76xeqk/) and then edit and run the example within the browser.
tip
At the end of each section will be a link to download the example at that stage of the guide, and a full code block.