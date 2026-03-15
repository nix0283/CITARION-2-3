# How to Create a Grid Bot

**URL:** https://help.cornix.io/en/articles/8116944-how-to-create-a-grid-bot

**Created:** 2026-03-03T11:46:08+00:00

---

How to Create a Grid Bot | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
General Basic ConfigurationGrids SummaryAdvanced SettingsCreate Bot- All Collections
- Trading Bots
- Grid
- How to Create a Grid Bot
# How to Create a Grid Bot
What are the Cornix Grid Bots and how to set them
Written by Hadar Cornix Updated over 3 months agoTable of contents
General Basic ConfigurationGrids SummaryAdvanced SettingsCreate Bot
Cornix Grid Bots are designed to help traders profit by taking advantage of sideways market price action.

To create a new Grid bot, navigate to the Grid Bots page and click "+ Create Bot":


# General Basic Configuration
You can quickly start trading by setting your bot's general basic configuration:
-
Bot Name: Give your bot an indicative name that will help you differentiate easily between your bots.

-
Account: Choose the exchange account to be connected to your bot.

-
Symbol: Choose the desired symbol for your bot.

-
Price Range: Modify the price range to align with your preferred boundaries for processing buy and sell orders. On the right side of the price range, you'll observe the percentage variance between the uppermost and lowermost prices within your selected bracket.

-
Grids: Set the number of grids, with each grid representing a price level functioning as a potential buy or sell within the defined price range. Note that the lowest price grid functions solely as a buy point since there are no grids below it, and conversely, the highest price grid only serves as a selling point due to the absence of grids above it. The grids are spaced by an equal price difference (fixed) unless set otherwise under the advanced settings.

-
Amount Per Trade: Set the total potential amount to be invested in each bot and its corresponding trade (the sum of all Entry orders). You can set it by fixed BTC or USD amount or as Percentage (a flat percentage of your account’s both available and open trade balance of the coin/contract which you are buying with).

For Futures exchanges, set the following parameters as well:
-
Direction: Set your bot's direction for long or short.
-
Margin Type: Choose the desired leverage type (isolated or cross).
-
Multiplier: Choose the leverage level.


For your convenience, while you set your bot, the system will let you know when some parameters are invalid, and will share needs to be changed in order to create a valid bot.
​A dynamic view of the bot's orders will update with every change you make while creating the bot, and will be displayed on the TradingView graph on the right.


In the box below you can view your:
-
Available Balance: The currently available amount of the coin\contract that you are buying with.
-
Bot Amount Value: The total potential amount to be invested by the bot (the sum of all Entry orders).
-
Bot Initial Amount: An estimation of the total amount to be bought when activating the bot, the sum amount of the grids set at a price that is higher than the market price when activating the bot (for a Long bot and lower than the market price for a Short bot).

## Grids Summary
By clicking the Details Icon on the left bottom corner you will be able to view an estimated preview of the bot's orders (grids) and their distance from the market price when activating the bot.


"Is immediate" stands for the grids allocated above the current market price for long (or below for short), that will be bought immediately when activating the bot.


# Advanced Settings
Tailored for proficient users seeking to configure complex strategies (read more).

# Create Bot
Once you’re done setting up your bot correctly, you can create the bot by clicking the "Create Bot" button.
When creating the bot, you will be able to choose between "Create & Activate" or "Create Only":
-
"Create & Activate" - will create the bot and activate it. Once the bot is activated, a trade will be immediately opened.
When opened, the bot will buy the sum amount of the grids located higher than the market price at the current market price, this amount is the bot's initial amount. The amount to be bought immediately is mentioned under the "Create & Activate" option as can be seen in the screenshot below.
-
"Create Only" - will create the bot in an inactive state and a trade won't open until activating the bot.
The following confirmation notification will pop up:


You can view and monitor your bot under the Grid Bots page, as well as the bot's trades under the Trades page.

Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"8116944","anonymous_id":"aec7d182-e861-4834-b767-066816cca602"};
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
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n![Image 1](https://downloads.intercomcdn.com/i/o/813551022/16bd940498be84637b7f0f1b/Screen+Shot+2023-08-23+at+10.58.16.png?expires=1772540100&amp;signature=7db0b0ec5d07e1a783d2c089522135defa23c8ac449d729e990ac1b7f66ffaea&amp;req=fCEkE8x%2FnYNdFb4f3HP0gF%2BW0khJxYs%2FGEuSKpwZYJ69Ec5zARLyEfpPpNNX%0AbYBlNBjgEYGS0my7PA%3D%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/813551022/16bd940498be84637b7f0f1b/Screen+Shot+2023-08-23+at+10.58.16.png?expires=1772540100&amp;signature=7db0b0ec5d07e1a783d2c089522135defa23c8ac449d729e990ac1b7f66ffaea&amp;req=fCEkE8x%2FnYNdFb4f3HP0gF%2BW0khJxYs%2FGEuSKpwZYJ69Ec5zARLyEfpPpNNX%0AbYBlNBjgEYGS0my7PA%3D%3D%0A\n\n**Описание:** The Cornix trading bot dashboard displays key metrics like "Take-Profits Filled" (153) and "Realized PnL" ($7.29), alongside profit graphs (Accumulated Profit, Profit By Day) with time-range toggles (1d, 3d, 1w, etc.). Below, three active grid bots (BTC/USDT, XRP/USDT, BNB/USDT) show details like symbol, amount, and performance, while a right-side panel includes filters (Bot Create Time, Exchanges, Accounts) and a prominent blue "Create Bot" button.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/813611082/81fae2b633d66f3fc05d692d/Screen+Shot+2023-08-23+at+12.17.01.png?expires=1772540100&amp;signature=7311cf3edfa521e90b328ac293fce1f0a1ad64f7dc7e41c45dd62c5d44486761&amp;req=fCEkEMh%2FnYldFb4f3HP0gPFy1djVpnTBLJhmE%2FanPHRTORaOzS%2BY1evqhBQU%0A8eSo067HrR5MX429zQ%3D%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/813611082/81fae2b633d66f3fc05d692d/Screen+Shot+2023-08-23+at+12.17.01.png?expires=1772540100&amp;signature=7311cf3edfa521e90b328ac293fce1f0a1ad64f7dc7e41c45dd62c5d44486761&amp;req=fCEkEMh%2FnYldFb4f3HP0gPFy1djVpnTBLJhmE%2FanPHRTORaOzS%2BY1evqhBQU%0A8eSo067HrR5MX429zQ%3D%3D%0A\n\n**Описание:** The screenshot displays a Cornix trading bot configuration interface for a "DOGE/USDT Long Grid Bot #1." Key UI elements include a text field for the bot name, a dropdown to select the "My-OKX-Spot" account, a symbol selector showing "DOGE/USDT," input fields for price range (0.06 to 0.06529) and grid count (10), and a section for "Amount Per Trade" with a "Fixed Usd Amount" dropdown and a value of 5.96 USD.\n\n---\n\n### Изображение 3\n\n![Image 3](https://downloads.intercomcdn.com/i/o/813611358/2ba5cfb909fd06e118fba4a6/Screen+Shot+2023-08-23+at+12.17.58.png?expires=1772540100&amp;signature=8ba94743e2133864545666297e5f2668f7c1b3eb66d24f220afb6df973385924&amp;req=fCEkEMh%2FnoRXFb4f3HP0gNdHrH5hBB5VK4utpw13dIWgyC8Ekq8nObC%2B8eeu%0AJO8KqQtRohwtmsXjKg%3D%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/813611358/2ba5cfb909fd06e118fba4a6/Screen+Shot+2023-08-23+at+12.17.58.png?expires=1772540100&amp;signature=8ba94743e2133864545666297e5f2668f7c1b3eb66d24f220afb6df973385924&amp;req=fCEkEMh%2FnoRXFb4f3HP0gNdHrH5hBB5VK4utpw13dIWgyC8Ekq8nObC%2B8eeu%0AJO8KqQtRohwtmsXjKg%3D%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with three labeled sections: "Direction" (with "Long" and "Short" toggle buttons, "Long" selected), "Margin Type" (a dropdown menu set to "Isolated"), and "Multiplier" (a dropdown menu set to "10"). The UI uses a clean, minimal design with white input fields, blue toggle highlights, and dropdown arrows for selection.\n\n---\n\n### Изображение 4\n\n![Image 4](https://downloads.intercomcdn.com/i/o/813612564/94bbe00faa5b39aada25ac6e/Screen+Shot+2023-08-23+at+12.20.40.png?expires=1772540100&amp;signature=e46d4ce02d41107ca66b7225832d95fa1e2c85e1d881587d2984f23586536d23&amp;req=fCEkEMh8mIdbFb4f3HP0gDkzU6%2BBTnezvazltEoH71ch3M1eqX7u2YDYSQsd%0A1%2F%2FFEuZ4UYhpkKb3yA%3D%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/813612564/94bbe00faa5b39aada25ac6e/Screen+Shot+2023-08-23+at+12.20.40.png?expires=1772540100&amp;signature=e46d4ce02d41107ca66b7225832d95fa1e2c85e1d881587d2984f23586536d23&amp;req=fCEkEMh8mIdbFb4f3HP0gDkzU6%2BBTnezvazltEoH71ch3M1eqX7u2YDYSQsd%0A1%2F%2FFEuZ4UYhpkKb3yA%3D%3D%0A\n\n**Описание:** The screenshot displays a Cornix trading bot interface featuring a candlestick chart with price data (showing a recent +0.15% change) and horizontal support/resistance lines in red (high price) and green (low price). The left sidebar includes icons for tools like indicators, drawing, and settings, while the bottom has time-frame buttons (1h, 1d, etc.) and a timestamp (11:10:56 UTC+3).\n\n---\n\n### Изображение 5\n\n![Image 5](https://downloads.intercomcdn.com/i/o/813616014/aac5e7a8e0e68f15246844e0/Screen+Shot+2023-08-23+at+12.25.18.png?expires=1772540100&amp;signature=911094012b3793d3b7a21f2de3cdb62293c93b912f9def976a19e3f958947353&amp;req=fCEkEMh4nYBbFb4f3HP0gEXh%2BZJakaKlBh2vZlO2qCj3ad8oRxmUiXjxtmW2%0AgTa3PBPahivRBWJpKw%3D%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/813616014/aac5e7a8e0e68f15246844e0/Screen+Shot+2023-08-23+at+12.25.18.png?expires=1772540100&amp;signature=911094012b3793d3b7a21f2de3cdb62293c93b912f9def976a19e3f958947353&amp;req=fCEkEMh4nYBbFb4f3HP0gEXh%2BZJakaKlBh2vZlO2qCj3ad8oRxmUiXjxtmW2%0AgTa3PBPahivRBWJpKw%3D%3D%0A\n\n**Описание:** The screenshot displays a "Prices Summary" modal window with a table listing 15 price entries. Each row includes a price (with a distance percentage in parentheses), an "Entry Amount (ratio)" column (mostly showing "$0.45 (7.14%)" or "No Entry"), and an "Is Immediate" column with checkmarks (✓) or dashes (–). A close button (×) is in the top-right corner.\n\n---\n\n### Изображение 6\n\n![Image 6](https://downloads.intercomcdn.com/i/o/813619495/980a616a58e0b5b2f679a2c0/Screen+Shot+2023-08-23+at+12.29.09.png?expires=1772540100&amp;signature=2dad4875a6cd0fe95ad511e710957beb7df697042d147d158e2f422e532499e2&amp;req=fCEkEMh3mYhaFb4f3HP0gOqEMyiujpjYYxtAwoZaSP%2FfmoO0fgYvAASymhwK%0AaUIQ1NG3sR7H%2BcbJ5A%3D%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/813619495/980a616a58e0b5b2f679a2c0/Screen+Shot+2023-08-23+at+12.29.09.png?expires=1772540100&amp;signature=2dad4875a6cd0fe95ad511e710957beb7df697042d147d158e2f422e532499e2&amp;req=fCEkEMh3mYhaFb4f3HP0gOqEMyiujpjYYxtAwoZaSP%2FfmoO0fgYvAASymhwK%0AaUIQ1NG3sR7H%2BcbJ5A%3D%3D%0A\n\n**Описание:** The screenshot displays a Cornix trading bot interface with key UI elements: a section showing "Available Balance" (12.1448 USDT, 12.14 USD), "Bot Amount Value" (5.9 USD, 48.58%), and "Bot Initial Amount" (2.62 USD). A blue arrow points to the "Advanced Settings" button, alongside a "Create Bot" button, with a menu icon on the left.\n\n---\n\n### Изображение 7\n\n![Image 7](https://downloads.intercomcdn.com/i/o/813621821/661e9334bbc3e0180d494674/Screen+Shot+2023-08-23+at+12.31.34.png?expires=1772540100&amp;signature=7600053cd5cbbf76b61df2e467dae9225d3dbeeeabd33cd0359f01e1e57fb305&amp;req=fCEkEMt%2FlYNeFb4f3HP0gDUGX4adO8V4QXPFR1mwpCDt%2Ffy%2Bj0jEwLHeT36%2B%0AVhIlqe4NkVDMttjOIA%3D%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/813621821/661e9334bbc3e0180d494674/Screen+Shot+2023-08-23+at+12.31.34.png?expires=1772540100&amp;signature=7600053cd5cbbf76b61df2e467dae9225d3dbeeeabd33cd0359f01e1e57fb305&amp;req=fCEkEMt%2FlYNeFb4f3HP0gDUGX4adO8V4QXPFR1mwpCDt%2Ffy%2Bj0jEwLHeT36%2B%0AVhIlqe4NkVDMttjOIA%3D%3D%0A\n\n**Описание:** The screenshot displays a Cornix trading bot interface with three key financial metrics: "Available Balance" shows 12.1448 USDT (12.14 USD), "Bot Amount Value" indicates 5.9 USD (48.58%), and "Bot Initial Amount" lists 2.62 USD. The UI uses a clean, minimalistic layout with left-aligned labels and right-aligned numerical values, emphasizing clarity for tracking bot performance and balance.\n\n---\n\n### Изображение 8\n\n![Image 8](https://downloads.intercomcdn.com/i/o/813622595/2eab5654f12f56258f7b51be/Screen+Shot+2023-08-23+at+12.29.39.png?expires=1772540100&amp;signature=421a543877581a3eeef09f611c332e43c081bab12a16776ef59b808fc768cf75&amp;req=fCEkEMt8mIhaFb4f3HP0gBNr1d5wxLpL3ErXmnL2GYAWhNGgSMcTn6gfC3xs%0AMlzo3hMF%2B07WoN%2BsqQ%3D%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/813622595/2eab5654f12f56258f7b51be/Screen+Shot+2023-08-23+at+12.29.39.png?expires=1772540100&amp;signature=421a543877581a3eeef09f611c332e43c081bab12a16776ef59b808fc768cf75&amp;req=fCEkEMt8mIhaFb4f3HP0gBNr1d5wxLpL3ErXmnL2GYAWhNGgSMcTn6gfC3xs%0AMlzo3hMF%2B07WoN%2BsqQ%3D%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with key UI elements: an "Available Balance" section displaying 12.1448 USDT (12.14 USD), a "Bot Amount Value" of 5.9 USD (48.58%), and a "Bot Initial Amount" of 2.62 USD. A blue arrow points to the "Advanced Settings" button, while a "Create Bot" button is prominently placed on the right.\n\n---\n\n### Изображение 9\n\n![Image 9](https://downloads.intercomcdn.com/i/o/813623628/c8eb395623a0b2c354d4c010/Screen+Shot+2023-08-23+at+12.33.29.png?expires=1772540100&amp;signature=cdc6c977a464646543387aa053cbc4774f02972a1f5ef7430a1271801d845a03&amp;req=fCEkEMt9m4NXFb4f3HP0gGPYfvfH1MlkY8JPkdc4Sc0EGwHyzjeKQhMwjbNt%0AsKqDSSq71Pw1LBdMWA%3D%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/813623628/c8eb395623a0b2c354d4c010/Screen+Shot+2023-08-23+at+12.33.29.png?expires=1772540100&amp;signature=cdc6c977a464646543387aa053cbc4774f02972a1f5ef7430a1271801d845a03&amp;req=fCEkEMt9m4NXFb4f3HP0gGPYfvfH1MlkY8JPkdc4Sc0EGwHyzjeKQhMwjbNt%0AsKqDSSq71Pw1LBdMWA%3D%3D%0A\n\n**Описание:** The screenshot displays a Cornix trading bot interface with a white background, showing financial metrics: "Available Balance" (12.1448 USDT, 12.14 USD), "Bot Amount Value" (5.9 USD, 48.58%), and "Bot Initial Amount" (2.62 USD). At the bottom, two buttons are visible: a light blue "Advanced Settings" and a blue "Create Bot" (with an arrow pointing to it), alongside a small icon on the left.\n\n---\n\n### Изображение 10\n\n![Image 10](https://downloads.intercomcdn.com/i/o/813625014/5ee0306ac1e3dd9adf056e21/Screen+Shot+2023-08-23+at+12.34.55.png?expires=1772540100&amp;signature=60a572a05359a9ea9f36612ee459ca0a0cf22acb4a89bc0421a3bd72ce43666e&amp;req=fCEkEMt7nYBbFb4f3HP0gPYmeBgLrd6ifIsaB5cqdcgTHDlJD0q98AXnDY1h%0A5CIvu%2FoPuSHA9jyDpA%3D%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/813625014/5ee0306ac1e3dd9adf056e21/Screen+Shot+2023-08-23+at+12.34.55.png?expires=1772540100&amp;signature=60a572a05359a9ea9f36612ee459ca0a0cf22acb4a89bc0421a3bd72ce43666e&amp;req=fCEkEMt7nYBbFb4f3HP0gPYmeBgLrd6ifIsaB5cqdcgTHDlJD0q98AXnDY1h%0A5CIvu%2FoPuSHA9jyDpA%3D%3D%0A\n\n**Описание:** The screenshot shows a modal dialog titled "Activate Grid Bot" with a prompt asking "Do you wish to activate the bot?" Two radio button options are presented: "Create and Activate" (selected, with a blue circle) and "Create Only" (unselected, with a gray circle). At the bottom, there are two buttons: a white "Cancel" button and a blue "Create Bot" button, along with a close (X) icon in the top-right corner of the modal.\n\n---\n\n### Изображение 11\n\n![Image 11](https://downloads.intercomcdn.com/i/o/813629081/3e7a8e6a850dbb93a4e4121f/Screen+Shot+2023-08-23+at+12.39.18.png?expires=1772540100&amp;signature=2af143fc53d035d0a1ce98b4e45c53e6041ef2575df8c4a0c020afacc96e7ab8&amp;req=fCEkEMt3nYleFb4f3HP0gBEWfWAXgPyXdCMlGTPZsRSRKqMabwagB8l8zknc%0AcZXssPKeFXgmzTIQtw%3D%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/813629081/3e7a8e6a850dbb93a4e4121f/Screen+Shot+2023-08-23+at+12.39.18.png?expires=1772540100&amp;signature=2af143fc53d035d0a1ce98b4e45c53e6041ef2575df8c4a0c020afacc96e7ab8&amp;req=fCEkEMt3nYleFb4f3HP0gBEWfWAXgPyXdCMlGTPZsRSRKqMabwagB8l8zknc%0AcZXssPKeFXgmzTIQtw%3D%3D%0A\n\n**Описание:** The screenshot displays a simple, minimalistic UI element: a green checkmark icon (indicating success) followed by the text "Grid bot successfully created" in a clean, sans-serif font. The design is straightforward, with no additional UI components like buttons, menus, or charts—just a clear confirmation message to inform the user of the bot’s creation.\n\n---\n\n### Изображение 12\n\n![Image 12](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow (raven) holding a small yellow object in its beak, perched on a curved line above the brand name “cornix” in bold, dark blue lowercase letters. The design is clean and minimalist, with the crow and text centered against a white background, emphasizing the brand’s visual identity.\n\n---\n\n### Изображение 13\n\n![Image 13](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a clean, minimalistic design. Key UI elements include a sidebar with navigation icons (likely for sections like "Dashboard," "Strategies," "History"), a main content area displaying strategy or trading details, and a top bar with user profile and settings options. The layout emphasizes clarity, with distinct sections for managing trading configurations and monitoring performance.\n\n---\n\n
