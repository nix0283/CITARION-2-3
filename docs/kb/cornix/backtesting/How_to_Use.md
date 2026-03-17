# How to Use

**URL:** https://help.cornix.io/en/articles/9576302-how-to-use-cornix-s-signals-bot-backtesting-feature

**Created:** 2026-03-03T11:50:15+00:00

---

How to Use Cornix's Signals Bot BackTesting Feature | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
Step 1: Select a Trading Strategy to TestStep 2: Choose the Backtest Name and Set its Time FrameStep 3: Set Initial FundsStep 4: Initiate the BacktestStep 5: Review ResultsStep 6: Optimize Your Strategy and Run Additional TestsStep 7: Deploy the Optimized StrategyApply ConfigurationUnapply Configuration- All Collections
- Backtesting
- How to Use Cornix's Signals Bot BackTesting Feature
# How to Use Cornix's Signals Bot BackTesting Feature
Optimize your trading strategies using historical data to maximize your performance
Written by Hadar Cornix Updated over 2 weeks agoTable of contents
Step 1: Select a Trading Strategy to TestStep 2: Choose the Backtest Name and Set its Time FrameStep 3: Set Initial FundsStep 4: Initiate the BacktestStep 5: Review ResultsStep 6: Optimize Your Strategy and Run Additional TestsStep 7: Deploy the Optimized StrategyApply ConfigurationUnapply Configuration
Backtesting is a method used in trading and investment to evaluate the effectiveness of a trading strategy by applying it to historical market data. This process allows traders to understand how a strategy would have performed in the past, helping to assess its potential profitability and risk before deploying it in live markets.

This guide will walk you through the steps of running backtests on your signals bots.

# Step 1: Select a Trading Strategy to Test
-
Navigate to the signals bots section and click the "Create Bot" button on the top right corner of the screen to enter the bot's creation screen.
-
Proceed to set the trading strategy you want to test for your bot. Choose your desired bot configuration from a selected signals channel or customize using advanced settings.
-
Click the Backtesting button to run the backtest. The test will use the bot's selected signals channel, exchange account, and configuration.
# Step 2: Choose the Backtest Name and Set its Time Frame
Select a name that you can easily track later for reviewing and comparing backtest results. Define the time frame for the backtest by selecting specific dates or a range of historical data to analyze the strategy's performance over that period.

# Step 3: Set Initial Funds
Specify the amount of capital to be used as initial funds for the historical test. Note that both the initial funds and the amount per trade chosen can affect the results, as the number of signals selected as trades depends on the amount.

The number of signals published during the selected period will be displayed in parentheses next to the coin. The displayed coins are based on the signals published in the selected channel within the exchange account during the chosen timeframe.

# Step 4: Initiate the Backtest
Once all parameters are set, click the 'Start' button to process the historical data based on your strategy and parameters within the selected timeframe.
-
All activities from the trades that would have opened based on the channel signals will start to show, including all order actions. You will see the accumulated profit of these trades on the graph.
-
All tests performed will be saved in the backtesting history of the selected channel and exchange account.

# Step 5: Review Results
After the backtest is complete, review the detailed metrics provided by Cornix, including:
-
Total Profit/Loss: The overall financial result of the backtest.
-
Number of Trades Executed: The total number of trades performed during the backtest.
-
Win/Loss Ratio: The ratio of winning trades to losing trades.
-
Maximum Drawdown: The maximum percentage decline between the highest and lowest points of the portfolio within the selected time frame.
Read more about the backtest results and statistics.

# Step 6: Optimize Your Strategy and Run Additional Tests
Based on the backtest results, adjust your strategy parameters to improve performance. Run multiple backtests with different parameters to find the optimal settings for your strategy.

*Please note - the advanced feature of 'Min Symbol 24H Volume' is not supported by the Backtesting feature and therefore not taken into account on Backtesting results.

# Step 7: Deploy the Optimized Strategy
## Apply Configuration
Once you are satisfied with your backtest results, deploy the optimized strategy by applying the configuration from a successful backtest to your bot. Click the 3 dots menu on the desired backtest result and click "Apply Configuration".

## Unapply Configuration
Revert to previous configurations if the applied settings do not perform as expected by using the "Unapply Configuration".

Important Notice: Past results do not guarantee future outcomes.



Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"9576302","anonymous_id":"1a4e0c2a-6a24-4dce-8849-6ca93b6b643d"};
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
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n![Image 1](https://downloads.intercomcdn.com/i/o/1114860668/8430b93fcafff466ee2e2144/Frame+15.png?expires=1772540100&amp;signature=a5aaf887df20b912645ff30cc504aba463110bd9b393c6e84f9ff69fbb9d961d&amp;req=dSEmEsF4nYdZUfMW1HO4zcd7Wzeh3wSWgVwP4Fy4ClmVDYKUXC3zkPDLL1S4%0AgfFg%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/1114860668/8430b93fcafff466ee2e2144/Frame+15.png?expires=1772540100&amp;signature=a5aaf887df20b912645ff30cc504aba463110bd9b393c6e84f9ff69fbb9d961d&amp;req=dSEmEsF4nYdZUfMW1HO4zcd7Wzeh3wSWgVwP4Fy4ClmVDYKUXC3zkPDLL1S4%0AgfFg%0A\n\n**Описание:** The screenshot shows the Cornix trading bot interface with a "Bot Name" field (filled with "Cornix Demo #1 Signals Bot"), "Signals Group" and "Account" dropdowns, an "Amount Per Trade" section, and a right panel displaying "Available Balance" (0 USD), "Bot Amount Value", and tabs for "Advanced Settings" and "Backtesting". A blue "Create Bot" button is prominent, and below are sections for "Most Traded Pairs" and "Backtesting History" with a table showing USTT pair data.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/1114866476/f107b6fde1c6d9faca2d27e9/Frame+16.png?expires=1772540100&amp;signature=7f3bcc608fda57172fe3a059730cc9eb3f718565f0f4588270c8be508d44292a&amp;req=dSEmEsF4m4VYX%2FMW1HO4zVyxvVh3XgGQovesaRq7XGe5j2uoR3CZIipZ7nIJ%0A%2FtXRNoaqET%2BT%2BipmCBI%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/1114866476/f107b6fde1c6d9faca2d27e9/Frame+16.png?expires=1772540100&amp;signature=7f3bcc608fda57172fe3a059730cc9eb3f718565f0f4588270c8be508d44292a&amp;req=dSEmEsF4m4VYX%2FMW1HO4zVyxvVh3XgGQovesaRq7XGe5j2uoR3CZIipZ7nIJ%0A%2FtXRNoaqET%2BT%2BipmCBI%3D%0A\n\n**Описание:** The screenshot shows a "Backtest" modal window for the Cornix trading bot, with a header containing the title "Backtest" and a close (×) button. The UI includes fields for "Backtesting Name" (pre-filled with "Cornix Demo #1 Signals Bot"), "Timeframe" (date range 2024-04-15 to 2024-07-15), and "Initial Funds" (showing "USDT (2 signals)" with a value of 10000). At the bottom, there are two buttons: "Cancel" (white) and "Start" (blue, highlighted by a blue arrow).\n\n---\n\n### Изображение 3\n\n![Image 3](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue raven (crow) with a yellow beak holding a small object, perched above the lowercase text “cornix” in a bold, dark blue font. The design is clean and minimalistic, with the bird and text centered against a plain white background, emphasizing the brand’s visual identity.\n\n---\n\n### Изображение 4\n\n![Image 4](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a clean, minimalistic design. Key UI elements include a navigation bar at the top, a central dashboard area displaying trading metrics (e.g., profit/loss, trade history), and a sidebar with options for bot configuration, strategy selection, and account settings. The layout is organized to prioritize quick access to trading controls and performance data.\n\n---\n\n
