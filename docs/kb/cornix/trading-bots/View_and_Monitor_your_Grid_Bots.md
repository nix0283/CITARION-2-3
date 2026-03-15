# View and Monitor your Grid Bots

**URL:** https://help.cornix.io/en/articles/8155383-view-and-monitor-your-grid-bots

**Created:** 2026-03-03T11:46:15+00:00

---

View and Monitor your Grid Bots | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
--body-image: none;
--body-bg-rgb: 255, 255, 255;
--body-border: rgb(230, 230, 230);
--body-primary-color: #1a1a1a;
--body-secondary-color: #737373;
--body-reaction-bg: rgb(242, 242, 242);
--body-reaction-text-color: rgb(64, 64, 64);
--body-toc-active-border: #737373;
--body-toc-inactive-border: #f2f2f2;
--body-toc-inactive-color: #737373;
--body-toc-active-font-weight: 400;
--body-table-border: rgb(204, 204, 204);
--body-color: hsl(0, 0%, 0%);
--footer-bg: rgb(255, 255, 255);
--footer-image: none;
--footer-border: rgb(230, 230, 230);
--footer-color: hsl(211, 10%, 61%);
--header-bg: none;
--header-image: url(https://downloads.intercomcdn.com/i/o/wrsw0nb0/663084/8cd5c29e4b01ccfff3d54c7bd01a/bcb02057784c6c6a633cd138e02ffe33.jpg);
--header-color: hsl(242, 64%, 18%);
--collection-card-bg: rgb(242, 242, 255);
--collection-card-image: none;
--collection-card-color: hsl(201, 97%, 41%);
--card-bg: rgb(255, 255, 255);
--card-border-color: rgb(230, 230, 230);
--card-border-inner-radius: 8px;
--card-border-radius: 10px;
--card-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--search-bar-border-radius: 10px;
--search-bar-width: 100%;
--ticket-blue-bg-color: #dce1f9;
--ticket-blue-text-color: #334bfa;
--ticket-green-bg-color: #d7efdc;
--ticket-green-text-color: #0f7134;
--ticket-orange-bg-color: #ffebdb;
--ticket-orange-text-color: #b24d00;
--ticket-red-bg-color: #ffdbdb;
--ticket-red-text-color: #df2020;
--header-height: 245px;
--header-subheader-background-color: #000000;
--header-subheader-font-color: #FFFFFF;
--content-block-bg: rgb(255, 255, 255);
--content-block-image: none;
--content-block-color: hsl(0, 0%, 10%);
--content-block-button-bg: rgb(51, 75, 250);
--content-block-button-image: none;
--content-block-button-color: hsl(0, 0%, 100%);
--content-block-button-radius: 6px;
--content-block-margin: 0;
--content-block-width: auto;
--primary-color: hsl(242, 64%, 18%);
--primary-color-alpha-10: hsla(242, 64%, 18%, 0.1);
--primary-color-alpha-60: hsla(242, 64%, 18%, 0.6);
--text-on-primary-color: #ffffff}Skip to main content
DashboardAnnouncements ChannelEnglish
English
DashboardAnnouncements ChannelEnglish
English
Search for articles...
Table of contents
The Grid Bots Page OverviewBot Card OverviewDive Into The Bot Details🛠️ Manage Your Bot🚧 Important Notes- All Collections
- Trading Bots
- Grid
- View and Monitor your Grid Bots
# View and Monitor your Grid Bots
How to monitor your Grid Bot performance, access detailed trade data, and manage your active bots easily
Written by Hadar Cornix Updated over 3 months agoTable of contents
The Grid Bots Page OverviewBot Card OverviewDive Into The Bot Details🛠️ Manage Your Bot🚧 Important Notes
Grid Bots offer an automated way to trade within a predefined price range, placing buy and sell orders across multiple levels.
Once your bot is running, it’s important to keep track of its performance and behavior.
This article will walk you through how to view and monitor your Grid Bots, understand key metrics like Realized PnL, and access detailed trade and configuration information.

# The Grid Bots Page Overview
To view your current bots, navigate to the Grid Bots page.
At the top of the screen, you’ll see a quick overview of:
-
Total Take-Profit Orders Filled
-
Total Realized PnL
-
Performance Graphs (Accumulated & Daily)


# Bot Card Overview
Each Bot Card shows the following information:
-
Basic bot details (name, exchange, creation date, symbol, amount)
-
Number of Take-Profit orders filled
-
Realized PnL (total profit/loss from completed take-profit orders)
-
Active Grid Info:
-
Last filled grid
-
Next Entry and Next Take-Profit grids
-
Distance from current market price (%)
ℹ️ Realized PnL represents confirmed profit/loss from filled orders only.


# Dive Into The Bot Details
Click on any bot to access detailed insights:

⚙️ A Visual grid placement (TradingView chart).
⚙️ Active Trade PnL - Estimated PnL if the trade is closed at the current price.
⚙️ General Tab - Displays the full bot configuration and a PNL chart.
⚙️Active Trade Timeline - Displays executed buy/sell orders, as well as the opening and closing of the trade.
⚙️ Grids Tab - Displays:
-
Lists each individual grid
-
Grid-specific PnL (using LIFO model - Last In, First Out)
-
“Matched orders” under "Grid" tab, indicate completed TP orders.


## 🛠️ Manage Your Bot
Open the bot menu (⋯) to:
-
View Active Trade
-
Duplicate, Activate/Deactivate, or Delete the bot
-
Share Bot - Create a link to share your bot’s configuration with others
-
Bulk Actions - Will allow you to make specific changes in multiple bots at once.
-
If you're using a Demo Trading Bot, you'll also have the option to Copy To Live Trading. This button will take you to create the bot on your Live Trading account.

## 🚧 Important Notes
-
Editing a Grid Bot is currently unavailable. As a workaround, you can consider duplicating the bot, set the desired changes on the new bot, and Activate. Make sure do Deactivate the old one if that's your goal.
-
If you manually close a trade that was opened by a Grid Bot, the bot will automatically be deactivated.
-
Grid PnL uses LIFO logic. The exchange's PnL method may be different (FIFO or other).
​
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"8155383","anonymous_id":"d591899a-e766-422c-8793-23579c69300c"};
(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/wrsw0nb0';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1567602433/a14ec69482f1841c3357f2fddfe9/image.png?expires=1772540100&amp;signature=7249efcb5a541caf52ae96224c9c0db0c41c75e9cf2e81d25e275154a78262a2&amp;req=dSUhEc9%2Bn4VcWvMW1HO4zX6G4lIgXd5wPtyh4aS%2BfDxcSwPTqpgkyWSh5VtX%0AsUM6piYvsz9S44uZL28%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1567602433/a14ec69482f1841c3357f2fddfe9/image.png?expires=1772540100&amp;signature=7249efcb5a541caf52ae96224c9c0db0c41c75e9cf2e81d25e275154a78262a2&amp;req=dSUhEc9%2Bn4VcWvMW1HO4zX6G4lIgXd5wPtyh4aS%2BfDxcSwPTqpgkyWSh5VtX%0AsUM6piYvsz9S44uZL28%3D%0A\n\n**Описание:** The Cornix trading bot interface shows the "My Grid Bots" page with a left sidebar containing navigation options (e.g., Dashboard, Trades, Grid Bots—highlighted by an arrow) and a main content area displaying "You don’t have any Grid bots" with a "Create a Grid Bot" button. Top UI elements include tabs for "Live Trading" and "Demo," cryptocurrency price widgets (BTC/USDT, ETH/USDT, ADA/USDT), a "Create Bot" button, and filter/search tools.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1567610527/ebfc5ef5f7b5674fef0b7262fb0e/image.png?expires=1772540100&amp;signature=5fd005bc3a21d5150df7dbb6170853d7e83e78d6dd441709e8bfcaa7020a0370&amp;req=dSUhEc9%2FnYRdXvMW1HO4zf6fhzG4RkR0FkOup95kgURb%2BSb0XEUBuBlAPg5z%0AN8hOScM%2BAfyfS2lBu4Q%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1567610527/ebfc5ef5f7b5674fef0b7262fb0e/image.png?expires=1772540100&amp;signature=5fd005bc3a21d5150df7dbb6170853d7e83e78d6dd441709e8bfcaa7020a0370&amp;req=dSUhEc9%2FnYRdXvMW1HO4zf6fhzG4RkR0FkOup95kgURb%2BSb0XEUBuBlAPg5z%0AN8hOScM%2BAfyfS2lBu4Q%3D%0A\n\n**Описание:** The screenshot displays a Cornix trading bot interface for a **BTC/USDT Grid Bot** (labeled "Active") on the "My Binance Demo - Spot" account. Key UI elements include the Bitcoin logo, bot name, status badge, symbol (BTC/USDT), amount (5000 USD), and metrics like "Take-Profits Filled" (0) and "Realized PnL" ($0). A lower section shows "Active Grid" details: "Last Grid Filled" (#5/50, 1m ago), "Next Entry" (**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1567610527/ebfc5ef5f7b5674fef0b7262fb0e/image.png?expires=1772540100&amp;signature=5fd005bc3a21d5150df7dbb6170853d7e83e78d6dd441709e8bfcaa7020a0370&amp;req=dSUhEc9%2FnYRdXvMW1HO4zf6fhzG4RkR0FkOup95kgURb%2BSb0XEUBuBlAPg5z%0AN8hOScM%2BAfyfS2lBu4Q%3D%0A\n\n**Описание:**07145.75, -0.06%), and "Next Take-Profit" (**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1567610527/ebfc5ef5f7b5674fef0b7262fb0e/image.png?expires=1772540100&amp;signature=5fd005bc3a21d5150df7dbb6170853d7e83e78d6dd441709e8bfcaa7020a0370&amp;req=dSUhEc9%2FnYRdXvMW1HO4zf6fhzG4RkR0FkOup95kgURb%2BSb0XEUBuBlAPg5z%0AN8hOScM%2BAfyfS2lBu4Q%3D%0A\n\n**Описание:**08499.17, 1.19%).\n\n---\n\n### Изображение 3\n\n![Image 3](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1567622631/8084ac099b85883527245640367f/image.png?expires=1772540100&amp;signature=3f63673dfd623cecce6dc462a3d0c946e42bb0880a09bfef4e8879a2de08507c&amp;req=dSUhEc98n4dcWPMW1HO4zYG6GaG23Co3QLZaLXdi%2F4TJJV4HJ9dpgZm89bQ7%0A2h5G%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1567622631/8084ac099b85883527245640367f/image.png?expires=1772540100&amp;signature=3f63673dfd623cecce6dc462a3d0c946e42bb0880a09bfef4e8879a2de08507c&amp;req=dSUhEc98n4dcWPMW1HO4zYG6GaG23Co3QLZaLXdi%2F4TJJV4HJ9dpgZm89bQ7%0A2h5G%0A\n\n**Описание:** The screenshot displays the Cornix trading bot interface for a BTC/USDT Grid Bot, split into two main sections: a left chart area showing price action with candlesticks, volume bars, and a -$0.41 active trade PnL, and a right panel with tabs (General, Active Trade Timeline, Grids) detailing bot settings (account, symbol, amount) and metrics like "Take-Profits Filled" (0) and "Realized PnL" ($0). The UI includes a sidebar with navigation options (Dashboard, Trades, Portfolio) and the chart features timeframes (1h, 1d, 1w) and a timestamp (14:24:40 UTC+3).\n\n---\n\n### Изображение 4\n\n![Image 4](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1567631567/4e75e7e453d6b7dd680036913e5a/image.png?expires=1772540100&amp;signature=b31efe96bd51c9ffea3dc11714c91c512b53296aea322a6980294f68deee7ee9&amp;req=dSUhEc99nIRZXvMW1HO4zdmPzPQALxXMU55dt4TUELCzdJD2wAo6%2BNAxhofn%0AncHU%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1567631567/4e75e7e453d6b7dd680036913e5a/image.png?expires=1772540100&amp;signature=b31efe96bd51c9ffea3dc11714c91c512b53296aea322a6980294f68deee7ee9&amp;req=dSUhEc99nIRZXvMW1HO4zdmPzPQALxXMU55dt4TUELCzdJD2wAo6%2BNAxhofn%0AncHU%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface for a **BTC/USDT Grid Bot** (labeled "Active") connected to "My Binance Demo - Spot." A dropdown menu (triggered by three dots) displays options like "View Active Trade," "Duplicate," "Deactivate," "Delete," "Share," "Copy To Live Trading," and "Bulk Actions." Below, key metrics include "Last Grid Filled" (#6/50, 7m ago), "Next Entry" (**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1567631567/4e75e7e453d6b7dd680036913e5a/image.png?expires=1772540100&amp;signature=b31efe96bd51c9ffea3dc11714c91c512b53296aea322a6980294f68deee7ee9&amp;req=dSUhEc99nIRZXvMW1HO4zdmPzPQALxXMU55dt4TUELCzdJD2wAo6%2BNAxhofn%0AncHU%0A\n\n**Описание:**06469.04, -0.54%), and "Next Take-Profit" (**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1567631567/4e75e7e453d6b7dd680036913e5a/image.png?expires=1772540100&amp;signature=b31efe96bd51c9ffea3dc11714c91c512b53296aea322a6980294f68deee7ee9&amp;req=dSUhEc99nIRZXvMW1HO4zdmPzPQALxXMU55dt4TUELCzdJD2wAo6%2BNAxhofn%0AncHU%0A\n\n**Описание:**07822.46, 0.71%).\n\n---\n\n### Изображение 5\n\n![Image 5](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow holding a small yellow object (likely a coin) in its beak, perched on a curved line above the bold, dark blue text “cornix.” The design is clean and minimalist, with the crow positioned to the left of the text, emphasizing the brand’s identity.\n\n---\n\n### Изображение 6\n\n![Image 6](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a dark-themed UI, featuring a navigation sidebar on the left (likely with menu icons), a central area displaying trading metrics or bot settings, and a top bar with user profile or account details. The design emphasizes clarity and functionality, with distinct sections for bot configuration, trade history, or performance tracking.\n\n---\n\n
