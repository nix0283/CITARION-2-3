# Why do I receive a “non-tradable symbol” message on AMP?

**URL:** https://www.tradingview.com/support/solutions/43000703853-why-do-i-receive-a-non-tradable-symbol-message-on-amp/

---

- [ Help Center ](/) - / - / [ Why do I receive a “non-tradable symbol” message on AMP? ](/support/solutions/43000703853-why-do-i-receive-a-non-tradable-symbol-message-on-amp/) # Why do I receive a “non-tradable symbol” message on AMP? If you would like to trade futures on AMP via TradingView you need to have a subscription for the real-time data on the ** broker platform** from CQG **data provider**. In case data package is purchased on TradingView, the orders can not be placed. However, we support data verification that can be enabled via Live AMP accounts, so you will not have to pay twice. For more information on verification, please follow the [link](https://www.tradingview.com/chart/?solution=43000479666). Previous Previous Why do I receive error “username/password is incorrect”? Next Next Why can't orders be modified? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43413395985/original/eDdN-fDDGdtInW1KA9OnCQyml08BTQtXiA.png?1685449157)

**Описание:** This TradingView interface displays a **datafeed selection modal** for configuring market data subscriptions. Here’s a detailed breakdown:  


### 1. Header & Dropdown  
- **Title**: *“Which Datafeed? (Multiple Checkbox - please select all you want enabled)*” (instruction for selecting datafeeds).  
- **Dropdown Menu**: A dropdown (currently showing “CQG”) with a list of datafeed options:  
  - *“- Please Select -”* (placeholder).  
  - *“CQG”* (highlighted in blue, indicating it’s the current selection).  
  - *“Rithmic”*, *“MetaTrader 5 (MT5) - CQG”*, *“NEW TT-W”*, *“Sierra Chart - Denali - CQG (No Data - Order Routing only)”*, *“DISABLE All Exchange Data”* (options to switch datafeed providers).  


### 2. Checkbox List (Market Data Subscriptions)  
Below the dropdown, a list of **checkboxes** (all unchecked) for selecting specific market data packages:  
- *“NYMEX - $10.00 – Energies (Market-Depth)”* (NYMEX energy futures, market-depth data).  
- *“COMEX - $10.00 – Metals (Market-Depth)”* (COMEX metals futures, market-depth data).  
- *“Bundle - $3.00 – All CME markets - (Top-of-Book)”* (CME bundle, top-of-book data).  
- *“CME - $1.00 – Equity Indices, Currencies, Meats, Softs (Top-of-Book)”* (CME equity indices, currencies, meats, softs, top-of-book data).  
- *“CBOT - $1.00 – Financials, Grains (Top-of-Book)”* (CBOT financials, grains, top-of-book data).  
- *“NYMEX - $1.00 – Energies (Top-of-Book)”* (NYMEX energies, top-of-book data).  
- *“COMEX - $1.00 – Metals (Top-of-Book)”* (COMEX metals, top-of-book data).  


### Purpose  
This modal allows users to:  
- Choose a **datafeed provider** (via the dropdown).  
- Select **specific market data packages** (via checkboxes) with pricing and data type (e.g., *Market-Depth* vs. *Top-of-Book*) details.  

The interface is designed for traders to customize their market data subscriptions, balancing cost and data granularity.


**Описание:** This is a **TradingView datafeed configuration interface** for selecting market data sources and subscriptions. Here’s a detailed breakdown:  


### 1. Top Section: Datafeed Selection Dropdown  
- **Label**: *“Which Datafeed? (Multiple Checkbox - please select all you want enabled)*” (instruction for multi-select).  
- **Dropdown Menu**: A dropdown (currently showing “CQG”) with a list of datafeed options:  
  - *“- Please Select -”* (placeholder).  
  - **CQG** (highlighted in blue, indicating it’s selected).  
  - *Rithmic, MetaTrader 5 (MT5) - CQG, NEW TT-W, Sierra Chart - Denali - CQG (No Data - Order Routing only), DISABLE All Exchange Data* (other datafeed choices).  


### 2. Bottom Section: Market Data Subscriptions (Checkboxes)  
A list of **exchange/market data subscriptions** (each with a checkbox, all unchecked):  
- *NYMEX - $10.00 – Energies (Market-Depth)* (NYMEX energy futures, market-depth data).  
- *COMEX - $10.00 – Metals (Market-Depth)* (COMEX metals futures, market-depth data).  
- *Bundle - $3.00 – All CME markets - (Top-of-Book)* (CME bundle, top-of-book data).  
- *CME - $1.00 – Equity Indices, Currencies, Meats, Softs (Top-of-Book)* (CME products, top-of-book data).  
- *CBOT - $1.00 – Financials, Grains (Top-of-Book)* (CBOT products, top-of-book data).  
- *NYMEX - $1.00 – Energies (Top-of-Book)* (NYMEX energy futures, top-of-book data).  
- *COMEX - $1.00 – Metals (Top-of-Book)* (COMEX metals futures, top-of-book data).  


### Purpose  
This interface lets users **select a datafeed provider** (e.g., CQG) and **subscribe to specific market data feeds** (with pricing details, e.g., $10.00 for market-depth, $1.00 for top-of-book) for trading or analysis. The “Market-Depth” vs. “Top-of-Book” labels indicate data granularity (full order book vs. best bid/ask).


![Image 2](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 3](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

