# Layouts, charts, drawings, indicators, and their interaction

**URL:** https://www.tradingview.com/support/solutions/43000692404-layouts-charts-drawings-indicators-and-their-interaction/

---

- [ Help Center ](/) - / - / [ Layouts, charts, drawings, indicators, and their interaction ](/support/solutions/43000692404-layouts-charts-drawings-indicators-and-their-interaction/) # Layouts, charts, drawings, indicators, and their interaction - [Layout](#section1) - [Chart](#section2) - [Chart settings](#section3) - [Indicators](#section4) - [Drawing tools and synchronization](#section5) - [Autosave](#section6) **Layout** A [layout](/support/solutions/43000746975/) contains charts, their settings, drawing tools, and indicators. It is identified by a unique URL. It is worth noting that watchlists and alerts are not stored in layouts. You can view a list of your layouts in the layouts window. You can download the desired layout there and add it to favorites or delete it. When you try to delete it, we display a dialog that tells you what data is contained in the layout you are about to delete. Be careful when deleting your layouts. It is advisable **to ****name the layouts differently** to avoid confusion and accidentally delete the right one. **If you mistakenly delete a layout, restoring it will not be possible.** **Chart** The chart is a component of the layout. This single picture box displays one series (symbol) and can also display scales, indicators on the series, separate indicator panes, and drawing tools. There can be from 1 to 16 charts in the layout. The maximum number of charts in the layout depends on your subscription level. **Chart settings**: background color, lines, candles, etc The settings can be different for each chart in the layout. These settings are not synchronized between layouts. Only the latest changes will be saved if you work with one layout in several tabs and set different settings for one chart. You can apply the settings of a specific chart to all other charts in the layout by clicking the "Apply to all" button in the chart settings. **Indicators** [Indicators](https://www.tradingview.com/support/solutions/43000543626-what-is-an-indicator/) are not synchronized between layouts and the charts in them. Still, you can apply a specific indicator to all charts in a layout by clicking Add this indicator to the entire layout in the indicator's context menu. Or, from the chart context menu, you can apply all indicators from the current chart to all others by clicking on Apply these indicators to the entire layout . A set of indicators with current settings can be saved as a template on the current chart. When applying a template, the current indicators on the series and additional indicator panes will be removed from the chart, and the indicators from the template will be added. **Drawing objects are not saved in the indicator template, so they are removed from the additional indicator panels when using templates**, even if the template previously contained the same indicators on the chart. **If you accidentally applied an indicator template and removed drawing objects from the indicator panels, immediately click "cancel". Otherwise, the drawing objects cannot be restored.** **Drawing tools and synchronization** [Drawing tools](https://www.tradingview.com/support/solutions/43000703396-drawing-tools/) can be synchronized between layout charts or globally, depending on the selected mode. If synchronization is disabled, drawing objects will be saved only on a specific chart of a particular layout. Synchronization by layout synchronizes the drawings on the current symbol across all charts in the current layout. **Disabling synchronization on a drawing object removes it from other charts**. Global synchronization. Drawing objects will be synchronized across all charts and layouts, which means they will appear even in completely new layouts. **Switching the global synchronization mode on a drawing object will remove it from all other layouts.** Objects are globally synchronized between different windows/tabs/devices in real-time only when the layouts autosave is enabled. If autosave is disabled, objects are synchronized once only after manual saving. Be careful when working with the drawing object menu. **If you delete drawing objects on a symbol not currently open on the chart, the "undo" command will not restore the drawing objects.** **If you mistakenly delete drawing objects from a symbol, they cannot be restored.** **Autosave** If a layout has unsaved changes, a blue "Save" sign is in the top panel under its name. If you see this message, save your layout before closing the page to avoid losing your latest changes. When autosave is enabled, created drawing objects and their changes are saved instantly. Also, saved changes to drawing objects will be displayed on the fly in other tabs where the same layout and symbol are open. In case if you work with the same layout in multiple tabs, we strongly recommend to manually save the layout in every tab after any changes. Previous Previous My drawings do not sync in different devices Next Next How to delete a layout? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43585129155/original/WC9oqjykLI2lKbV1X386t6-xtsynLePe1Q.png?1759942397)

**Описание:** This is a screenshot of the TradingView web platform displaying a chart for **S&P 500 E-mini Futures (ES1)** on a **1-day (1D)** timeframe from the **CME** exchange. Here’s a detailed breakdown of the UI elements:  


### **Top Navigation & URL Bar**  
- **URL**: `https://www.tradingview.com/chart/qN44eQb1/` (unique chart identifier).  
- **Browser Controls**: Back/forward arrows, refresh button, and the URL bar.  


### **Header Bar (Below URL)**  
- **Search Icon + “ES1”**: Search bar for symbols (ES1 = S&P 500 E-mini Futures).  
- **“+” Button**: Add a new chart or symbol.  
- **“D” Button**: Timeframe selector (currently set to “Daily”/1D; tap to switch to other intervals like 1m, 5m, etc.).  
- **“⚙️” (Settings) Icon**: Chart settings (e.g., grid, colors, data feeds).  
- **“Indicators” Dropdown**: Opens the indicator library to add technical indicators (e.g., moving averages, RSI).  
- **“📊” (Chart Type) Icon**: Switch between chart types (e.g., candlestick, line, area).  
- **“Alert” Button**: Set price alerts for the symbol.  


### **Chart Header (Below Header Bar)**  
- **Symbol Info**: “500 S&P 500 E-mini Futures · 1D · CME” (confirms the instrument, timeframe, and exchange).  
- **Price Data**: “O 5,760.25 H 5,773.25 L 5,758.00 C 5,768.50” (Open, High, Low, Close prices for the current session; partially visible).  
- **“D” (Daily) Label**: Confirms the 1-day timeframe.  


### **Left Sidebar (Tools)**  
- **“+” (Chart Layout) Icon**: Add/remove chart panes (e.g., for volume or indicators).  
- **“Trendline” Tool**: Draw trendlines on the chart.  
- **“Lines” Tool**: Draw horizontal/vertical lines.  
- **“Chart Type” Icon**: Switch between chart styles (e.g., candlestick, Heikin-Ashi).  


### **Key UI Purpose**  
This layout is designed for **technical analysis**: users analyze price action (via the chart), apply indicators (via the “Indicators” dropdown), and manage charts/alerts. The red arrow highlights the “Indicators” button, emphasizing its role in adding technical analysis tools.  


All elements support core trading tasks: symbol selection, timeframe adjustment, indicator application, and alert management.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43585129484/original/k288q76txIDqqRvvVLXY9Ga7Zqv7-04qJg.png?1759942481)

**Описание:** The image shows a **TradingView chart interface** with a dropdown menu open, displaying layout management options. Here’s a detailed breakdown:  


### 1. **Top Navigation Bar**  
- **“Tradingview” Dropdown (Highlighted by Red Arrow)**: Clicking this opens the layout menu (shown in the dropdown).  
- **Icons (Right of “Tradingview”)**:  
  - Chart-related tools (e.g., chart type, indicators, layout, screenshot).  
  - **“Publish” Button**: For sharing or publishing the chart.  


### 2. **Dropdown Menu (Layout Management)**  
The menu contains options for organizing and managing chart layouts:  

- **“Save layout”**: Saves the current chart setup.  
- **“Autosave” (Toggle Switch)**: Enables/disables automatic saving of layouts.  
- **“Sharing” (Toggle Switch)**: Controls sharing permissions (with an info icon for details).  
- **“Make a copy…”**: Duplicates the current layout.  
- **“Rename…”**: Renames the current layout.  
- **“Export chart data…”**: Exports chart data (e.g., CSV).  
- **“Create new layout…”**: Starts a new layout from scratch.  
- **“RECENTLY USED” Section**: Lists recently accessed layouts (e.g., “Tradingview (ES1!, 1D)”, “7”, “ES1!, 1”, “CBOE_VIX3M/VIX, 1D”, “5”, “SPY, 5”).  
- **“Open layout…” (Highlighted by Red Arrow)**: Opens a file browser to load a saved layout.  


### 3. **Chart Area**  
- **Candlestick Chart**: Displays price action (green/red candles) for a financial instrument (likely the S&P 500 E-mini, “ES1!”) on a 1-day (1D) timeframe.  
- **Price Axis (Right)**: Shows price levels (e.g., 5,700.00, 5,800.00).  


### 4. **UI Elements & Purpose**  
- **Dropdown Menu**: Central to layout management (saving, loading, sharing, renaming).  
- **Toggle Switches**: For “Autosave” and “Sharing” (quick on/off control).  
- **“Open layout…”**: Critical for loading pre-saved chart configurations.  
- **“Publish” Button**: For sharing charts publicly or with others.  


This interface is designed to help traders customize, save, and share their chart layouts efficiently.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43585129679/original/xvZ9VRePnD-B-Dr8MvdQw0X4VZlfwuRtjA.png?1759942541)

**Описание:** The image shows a **TradingView \


