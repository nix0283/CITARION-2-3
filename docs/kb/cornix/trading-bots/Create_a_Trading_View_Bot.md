# Create a Trading View Bot

**URL:** https://help.cornix.io/en/articles/6248036-create-a-trading-view-bot

**Created:** 2026-03-03T11:45:46+00:00

---

Create a Trading View Bot | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
Here’s how to create a bot and connect it to TradingView alerts:Creating a new bot involves 5 steps:Create Trade and Close Trade Webhooks:General:Entries:Take-Profits:Stop:Advanced:- All Collections
- Trading Bots
- Trading View
- Create a Trading View Bot
# Create a Trading View Bot
How to create a bot triggered by TradingView alerts
Written by Hadar Cornix Updated over 2 months agoTable of contents
Here’s how to create a bot and connect it to TradingView alerts:Creating a new bot involves 5 steps:Create Trade and Close Trade Webhooks:General:Entries:Take-Profits:Stop:Advanced:
TradingView Bots execute trades automatically based on a pre-configured strategy when triggered by TradingView alerts connected via Webhooks.


## Here’s how to create a bot and connect it to TradingView alerts:
To create a new bot, navigate to the TradingView section and click the "+ Create Bot" button on the top right corner of the screen.

# Creating a new bot involves 5 steps:
-
General: configure your bot’s basic settings, including its name, symbol, exchange, trade amount, and (for futures) direction and leverage.
-
Entries: set your entry strategy, including the number of orders, their price, and their size.
-
Take-Profit: set your take-profit orders to realize your earnings.
-
Stop: mitigate your risk by setting a stop-loss order and other stop settings.
-
Advanced: set cooldown time and the number of trades until the bot stops.

Under the 'Available Balance' you can see the current available amount of the coin which is relevant to the bot you are creating, and a dynamic summary of the bot's orders which updates with every change while creating the bot.

For your convenience, while you set your bot, the system will warn you (in red) when something is invalid and will let you know what needs to be changed in order to create a valid bot.

Once you’re done setting up your bot, you can create the bot by clicking the "Create Bot" button on the right side of the screen. When creating the bot, you will be able to choose between "Create" and "Create & Activate":
-
"Create & Activate" - will create the bot and activate it. Once the bot is activated, when an alert is triggered a trade will be created.
-
"Create" - will create the bot in an inactive state and trades won't be opened until activating the bot.
## Create Trade and Close Trade Webhooks:
-
The Create Trade Webhook integration is necessary for trades to open up by the bot when alerts are triggered. By applying your Create Trade Webhook into an alert, when the alert trigger is reached, the bot will open a trade with a buy market order (by default), or create a trade by the bot's configuration (Entries, Take Profits and Stop).
-
The Close Trade Webhook, if integrated with a Trading View alert, will market sell and close any open trades that were created by this bot, when the alert is triggered.


The Create/Close Trade Webhooks, and Webhook URL will also be available for later use. The Webhooks will be visible on each bot and the Webhook URL can be copied by clicking the "Webhook URL" button on the top right corner of Trading View Bots page.

Additional information on how to create trading view alerts on TradingView.com, and connect them by using a Webhook URL and Create/Close Trade Webhook.

💡 Note!
As long as a TradingView bot is active, it will create a new trade every time a TradingView alert connected with a webhook to the bot is triggered, unless configured otherwise in the advanced settings.

## General:
-
Bot Name: give your bot an indicative name that will help you differentiate easily between your bots.
-
Account: choose the exchange account to be connected to your bot.
-
Symbol: choose the desired symbol for your bot.
-
Use symbol from alert [NEW]: the bot will not be limited to a specific symbol, and the symbol will be taken from the Trading View alert.
-
Amount Per Trade: set the total potential amount to be invested in each of your bot's trades. You can set it by fixed BTC or fixed USD.

For Futures exchanges:

-
Direction: set your bot's direction for long or short.
-
Margin Type: choose the desired leverage type (isolated or cross).
-
Multiplier: choose the leverage level.



## Entries:
If the Entries toggle is off, the bot will only place a default buy market order when a trade opens. Enabling the Entries toggle allows you to configure an advanced entry strategy in addition to the default order. By default, the bot uses the DCA method, but you can also choose a custom method.

For each bot, the first entry order will be a market order and will serve as a base order, as the subsequent orders will be calculated based on it and in accordance with the settings below:
-
The 'Customize First Entry' toggle will allow you, if enabled, to set a specific amount to be allocated for the first entry order, defined as a percentage out of the total trade amount. Otherwise, if disabled, the allocation for the first order will be set up based on the same parameters as all other entry orders as follows.
The 'Amount Scale' and 'Number of Orders' parameters will determine the amount to be invested in each order:
-
'Amount Scale': will determine the multiplier between each following entry order amount and will set the ratio between the orders, in terms of the amount invested in every order.
-
'Number of Orders': will determine the total number of potential entry orders the bot will place in each trade (up to 50 entry orders).
-
'Number of Active Orders': will determine the total possible number of active entry orders the bot will be allowed to place simultaneously on the exchange.

For example:
Amount per trade = 130
The number of orders = 3
Amount Scale = 3

The first order will be for $10 and the following orders would be $30 and $90 respectively.

Amount per trade = 1st Order + 2nd Order (1st Order*amount scale) + 3rd Order (2nd Order*amount scale).
The 'Price Difference' and 'Price Scale' parameters will determine the orders' price:
-
'Price Difference': will set the difference between the first entry (which will be at market price) to the second entry order (which will be set to be at the first entry price minus the price difference percentage).

For Example:
First Entry Price (Market Price) = 100
Price Difference = 1%

The three first entry orders will be placed at 100 (market price), 99 (100 - 100*1%), and 98.01 (99 - 99*1%).
-
'Price Scale' - will set the price difference multiplier from the second entry order and the subsequent orders.

For Example:
First Entry Price (Market Price) = 100
Price Difference = 1%
Price Scale = 2

The three first entry orders will be placed at 100 (market price), 99 (100 - 100*1%), and 97.02 (99 - 99*1%*2).
-
'Max Order Price Difference': will show you the price difference (distance) in percentages between the first and last orders, taking into consideration all of the parameters above.
-
'Trailing': if enabled will apply Trailing Entry based on the chosen percentage for all entry orders, except for the first entry order which is a market order.

# Take-Profits:
Enable the Take-Profits toggle in order to add take-profit orders to your bot and customize your strategy.
-
'Take-Profit Distance Percent' sets your take-profit order as a percentage above the entry price (baseline).
-
'Take-Profit Baseline' determines whether the 'Take-Profit Distance Percent' is calculated from the first entry or the average entry price. The baseline updates automatically based on the executed entry prices..
If you wish to add more than one take-profit, enable the Take-Proft strategy toggle and you will be able to set your take-profit strategy based on the DCA parameters or using the custom method in the same manner as with entry orders.
-
'Trailing': if enabled will apply Trailing Take-Profit based on the chosen percentage.

# Stop:
Enable the Stop-Loss toggle in order to add a stop-loss order and other stop settings.
-
'Stop-loss Percent': will set your stop-loss order as a percentage below the entry price (baseline).
-
'Stop-loss Baseline': will determine if the 'Stop-loss Percent' will be in accordance with the first entry or the average entry price.
-
'Number of Continuous Stops Before Bot is Stopped': in order to protect yourself, this feature allows you to define the total number of continuous stop-loss orders that will be executed by the bot before it is automatically deactivated so that no more positions are opened without manually re-activating it.
-
'Stop-loss Timeout': The Stop Loss Timeout lets you delay closing a trade when the stop-loss is reached. This is useful if you expect the price to move back in your favor shortly and don’t want to sell immediately.
# Advanced:
-
'Cooldown Between Open Trades': Cooldown Between Open Trades' sets a minimum time interval (in seconds) after opening a trade during which no new trades will open, even if alerts are triggered.
-
'Cooldown After Trade Close': allows you to set a minimum time interval (in seconds) after a trade was closed that no new trades will open up. That means that even if an alert is triggered during that time period, a new trade will not be opened.
-
'Number of Trades Until Bot Stop': this allows you to define the total number of trades that will be created by the bot before it is automatically deactivated so that no more positions are opened without manually re-activating it.
-
'Number of Simultaneous Trades': this setting allows you to control the maximum number of simultaneous cycles for your trading bot. Anyway, no more than 3 trades will open up simultaneously on the same symbol (for the same direction) per exchange account (client).
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"6248036","anonymous_id":"2f5d619d-b46e-4c02-b0d8-6988414bb641"};
(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/wrsw0nb0';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();

@keyframes intercom-lightweight-app-launcher {
from {
opacity: 0;
transform: scale(0.5);
}
to {
opacity: 1;
transform: scale(1);
}
}
@keyframes intercom-lightweight-app-gradient {
from {
opacity: 0;
}
to {
opacity: 1;
}
}
@keyframes intercom-lightweight-app-messenger {
0% {
opacity: 0;
transform: scale(0);
}
40% {
opacity: 1;
}
100% {
transform: scale(1);
}
}
.intercom-lightweight-app {
position: fixed;
z-index: 2147483001;
width: 0;
height: 0;
font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
.intercom-lightweight-app-gradient {
position: fixed;
z-index: 2147483002;
width: 500px;
height: 500px;
bottom: 0;
right: 0;
pointer-events: none;
background: radial-gradient(
ellipse at bottom right,
rgba(29, 39, 54, 0.16) 0%,
rgba(29, 39, 54, 0) 72%);
animation: intercom-lightweight-app-gradient 200ms ease-out;
}
.intercom-lightweight-app-launcher {
position: fixed;
z-index: 2147483003;
padding: 0 !important;
margin: 0 !important;
border: none;
bottom: 20px;
right: 20px;
max-width: 48px;
width: 48px;
max-height: 48px;
height: 48px;
border-radius: 50%;
background: #0071b2;
cursor: pointer;
box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.06), 0 2px 32px 0 rgba(0, 0, 0, 0.16);
transition: transform 167ms cubic-bezier(0.33, 0.00, 0.00, 1.00);
box-sizing: content-box;
}
.intercom-lightweight-app-launcher:hover {
transition: transform 250ms cubic-bezier(0.33, 0.00, 0.00, 1.00);
transform: scale(1.1)
}
.intercom-lightweight-app-launcher:active {
transform: scale(0.85);
transition: transform 134ms cubic-bezier(0.45, 0, 0.2, 1);
}
.intercom-lightweight-app-launcher:focus {
outline: none;

}
.intercom-lightweight-app-launcher-icon {
display: flex;
align-items: center;
justify-content: center;
position: absolute;
top: 0;
left: 0;
width: 48px;
height: 48px;
transition: transform 100ms linear, opacity 80ms linear;
}
.intercom-lightweight-app-launcher-icon-open {

opacity: 1;
transform: rotate(0deg) scale(1);

}
.intercom-lightweight-app-launcher-icon-open svg {
width: 24px;
height: 24px;
}
.intercom-lightweight-app-launcher-icon-open svg path {
fill: rgb(255, 255, 255);
}
.intercom-lightweight-app-launcher-icon-self-serve {

opacity: 1;
transform: rotate(0deg) scale(1);

}
.intercom-lightweight-app-launcher-icon-self-serve svg {
height: 44px;
}
.intercom-lightweight-app-launcher-icon-self-serve svg path {
fill: rgb(255, 255, 255);
}
.intercom-lightweight-app-launcher-custom-icon-open {
max-height: 24px;
max-width: 24px;

opacity: 1;
transform: rotate(0deg) scale(1);

}
.intercom-lightweight-app-launcher-icon-minimize {

opacity: 0;
transform: rotate(-60deg) scale(0);

}
.intercom-lightweight-app-launcher-icon-minimize svg path {
fill: rgb(255, 255, 255);
}
/* Extended launcher styles */
.intercom-lightweight-app-launcher.intercom-launcher-extended {
width: calc(180px - 30px);
max-width: calc(180px - 30px);
height: calc(45px - 26px);
max-height: calc(45px - 26px);
border-radius: 12px;
display: flex;
align-items: center;
justify-content: flex-start;
padding: 12px 16px 12px 12px !important;
gap: 6px;
/* Use theme background instead of hardcoded gradient */
background: #0071b2;
border: 1px solid rgba(255, 255, 255, 0.15);
box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);

}
.intercom-lightweight-app-launcher.intercom-launcher-extended .intercom-lightweight-app-launcher-icon {
position: relative;
width: 24px;
height: 24px;
}
.intercom-lightweight-app-launcher-text {
/* Match text color with launcher icon */
color: rgb(255, 255, 255);
font-size: 14px;
font-weight: 600;
line-height: 1.5;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
max-width: 140px;
opacity: 1;
transition: opacity 80ms linear;
}
.intercom-lightweight-app-messenger {
position: fixed;
z-index: 2147483003;
overflow: hidden;
background-color: #ffffff;
animation: intercom-lightweight-app-messenger 250ms cubic-bezier(0, 1, 1, 1);
transform-origin: bottom right;

width: 400px;
height: calc(100% - 104px);
max-height: 704px;
min-height: 250px;
right: 20px;
bottom: 84px;
box-shadow: 0 5px 40px rgba(0,0,0,0.16);

border-radius: 24px;
}
.intercom-lightweight-app-messenger-header {
height: 64px;
border-bottom: none;
background: #ffffff;
}
.intercom-lightweight-app-messenger-footer{
position:absolute;
bottom:0;
width: 100%;
height: 80px;
background: #ffffff;
font-size: 14px;
line-height: 21px;
border-top: 1px solid rgba(0, 0, 0, 0.05);
box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.05);
}
@media print {
.intercom-lightweight-app {
display: none;
}
}
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/2005013586/4b383a030c4e15190087902df1ea/image.png?expires=1772540100&amp;signature=ac96b0573aeac5fe38592eed2d60574570a267d48c30e84d75fdaf659c257e50&amp;req=diAnE8l%2FnoRXX%2FMW1HO4zSQeUYIwKB%2BWpwrTowMwo6b5Eg%2BMnLLSC2G2OnKU%0Aq%2BWMbk9w0PG4%2FgePMBA%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/2005013586/4b383a030c4e15190087902df1ea/image.png?expires=1772540100&amp;signature=ac96b0573aeac5fe38592eed2d60574570a267d48c30e84d75fdaf659c257e50&amp;req=diAnE8l%2FnoRXX%2FMW1HO4zSQeUYIwKB%2BWpwrTowMwo6b5Eg%2BMnLLSC2G2OnKU%0Aq%2BWMbk9w0PG4%2FgePMBA%3D%0A\n\n**Описание:** The Cornix trading bot interface displays a "Create TradingView Bot" setup page with a left sidebar containing navigation (Workspaces, Dashboard, Trades, etc.) and a main panel featuring tabs (General, Entries, etc.) for bot configuration. The right side shows a 1-hour BTC/USDT price chart with trading indicators, while the top includes live trading buttons, crypto price widgets (BTC/USDT, ETH/USDT, ADA/USDT), and a "Create Bot" button.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/2005021136/c3a7d08d546b08cbb789f2f10dcd/image.png?expires=1772540100&amp;signature=dafd73be76440b3a3e7267ee0aab9412f0f5c8f0bbe57b55bb93e844f6ba8d6a&amp;req=diAnE8l8nIBcX%2FMW1HO4zUHmPvmxBH%2FdQ4lq1cw%2B9KF0JgvSFXVeOjvQCAyX%0AfgoP%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/2005021136/c3a7d08d546b08cbb789f2f10dcd/image.png?expires=1772540100&amp;signature=dafd73be76440b3a3e7267ee0aab9412f0f5c8f0bbe57b55bb93e844f6ba8d6a&amp;req=diAnE8l8nIBcX%2FMW1HO4zUHmPvmxBH%2FdQ4lq1cw%2B9KF0JgvSFXVeOjvQCAyX%0AfgoP%0A\n\n**Описание:** The screenshot shows a "Create TradingView Bot" modal with a two - step progress bar (the first step "Create Bot" is completed, marked by a checkmark, and the second step "Get UUIDs" is the current one, indicated by a blue circle with "2"). A green checkmark icon and the text "TradingView Bot Created Successfully!" are displayed prominently. Below, there are two webhook sections ("Create Trade Webhook" and "Close Trade Webhook") each with a UUID, a blue "Webhook URL" button, and a "Finish" button at the bottom.\n\n---\n\n### Изображение 3\n\n![Image 3](https://downloads.intercomcdn.com/i/o/wrsw0nb0/2005029315/addce9d8da2007cdd5d79210bcf6/image.png?expires=1772540100&amp;signature=584a7929289174ab90e842f85ed99cdc923017b39d0cfd12ce8992be391f2330&amp;req=diAnE8l8lIJeXPMW1HO4zWYy6nFKCCCd%2Fc84ofdw4NkZ4LLJocVCTzvIbhCk%0AvcMz%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/2005029315/addce9d8da2007cdd5d79210bcf6/image.png?expires=1772540100&amp;signature=584a7929289174ab90e842f85ed99cdc923017b39d0cfd12ce8992be391f2330&amp;req=diAnE8l8lIJeXPMW1HO4zWYy6nFKCCCd%2Fc84ofdw4NkZ4LLJocVCTzvIbhCk%0AvcMz%0A\n\n**Описание:** The screenshot shows the "General" tab of a Cornix trading bot configuration interface, with tabs for "Entries," "Take-Profits," "Stop," and "Advanced" at the top. Key UI elements include a "Bot Name" field (set to "Trading View Bot"), an "Account" dropdown (selected as "My Binance Futures"), a highlighted "Symbol" section with a dropdown ("From TV Alert") and a toggle for "Use symbol from alert" (enabled), an "Amount Per Trade" field (5000 USD, set to "Fixed Usd Amount"), and a "Bot Amount Value" display (5000 USD) at the bottom, plus a blue "Create Bot" button.\n\n---\n\n### Изображение 4\n\n![Image 4](https://downloads.intercomcdn.com/i/o/wrsw0nb0/2005043395/7ba95e28a58296a809d851c4cc7d/image.png?expires=1772540100&amp;signature=41cfe3b6469117f131767eecbbb222ab2223c4f8896f078e7bc02f3b268814ed&amp;req=diAnE8l6noJWXPMW1HO4zXGNXJTPfyAQqm%2FqpOuBIbqPllFWf%2FH4bDMI%2BbMU%0A6SUaHwSl7KuLj6AWe%2Fk%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/2005043395/7ba95e28a58296a809d851c4cc7d/image.png?expires=1772540100&amp;signature=41cfe3b6469117f131767eecbbb222ab2223c4f8896f078e7bc02f3b268814ed&amp;req=diAnE8l6noJWXPMW1HO4zXGNXJTPfyAQqm%2FqpOuBIbqPllFWf%2FH4bDMI%2BbMU%0A6SUaHwSl7KuLj6AWe%2Fk%3D%0A\n\n**Описание:** The Cornix trading bot interface displays a left sidebar with navigation options like "TradingView Bots" (expanded) and "My Bots" (highlighted), alongside a main section showing "My TradingView Bots" with two active bots (BTC/USDT TV Bot and TV Bot #2) featuring details like symbol, amount, and trade webhooks. Top UI elements include cryptocurrency price widgets (BTC/USDT, ETH/USDT, ADA/USDT), a "Create Bot" button, and charts for "Accumulated Profit" and "Profit By Day" with time filters (1d, 3d, 1w, 1m, 3m, 1y).\n\n---\n\n### Изображение 5\n\n![Image 5](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow (raven) with a yellow beak, perched above the lowercase text “cornix” in a bold, dark blue font. The design is minimalistic, with the crow and text centered on a white background, emphasizing the brand’s visual identity.\n\n---\n\n### Изображение 6\n\n![Image 6](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a dark-themed UI. Key elements include a sidebar with navigation icons (e.g., home, settings), a central dashboard displaying trading metrics (e.g., profit, trades), and a top bar with user profile and notification icons. The layout is clean, with a focus on data visualization and easy access to trading tools.\n\n---\n\n
