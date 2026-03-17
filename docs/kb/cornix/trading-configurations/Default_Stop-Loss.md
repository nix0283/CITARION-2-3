# Default Stop-Loss

**URL:** https://help.cornix.io/en/articles/5814860-default-stop-loss

**Created:** 2026-03-03T11:48:19+00:00

---

Default Stop-Loss | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
⚙️ How to set it🧠 How Does it WorkHow Can Default Stop Loss Affect the Trade's Entries? Default Stop Loss FormulaAutomated Leverage Adjustments- All Collections
- Trading Configurations
- Trading Configuration - Stop
- Default Stop-Loss
# Default Stop-Loss
How to set a default stop loss configuration in your Signals Bot
Written by Cristian Marin Updated over 9 months agoTable of contents
⚙️ How to set it🧠 How Does it WorkHow Can Default Stop Loss Affect the Trade's Entries? Default Stop Loss FormulaAutomated Leverage Adjustments
# ⚙️ How to set it
Signals Bots Page > Create/ Edit > Advanced Settings (at the right bar) > 'Stop' Section > Stop > Personal.
When​ setting your Default Stop-Loss, you will have to choose a "Stop Loss Distance Percentage" and a "Stop-Loss Baseline".
The Distance Percentage value can be anything between 0.01 - 100%
The Baseline can be the trade's Average Entries, or the trade's First Entry.
#
🧠 How Does it Work
Default stop percentage will determine how much percent to set your default stop below the *weighted average entry price or the first entry price.
*The weighted average entry price is calculated based on the signal’s entries, and after applying your own entry configuration on them.

For example, let's assume you chose default stop of 10% and you've got the following signal:
Long Signal
BTC/USD
Entry:
1: 8500 (20%)
2: 8000 (80%)
Take Profit:
1: 9500 (100%)
First, notice that the weighted average entry price is 8100 (8000*80% + 8500*20%). We chose 10% as the default stop and therefore our stop loss price will be 7290 (8100-10%).


## How Can Default Stop Loss Affect the Trade's Entries?
In some cases, the DSL (which is calculated as % deduction from the weighted average entry price) is higher than some of the entry orders. In this case the bot will remove the entry orders that are lower than the stop loss from the trade.

For example:
DSL: 2%
X/USDT
Leverage: 1x
Entry:
1. 100 (25%)
2. 98 (25%)
3. 96 (25%)
4. 94 (25%)
Take Profit:
1. 120 (100%)

In this case the weighted average entry price is 97 (100*25%+ 98*25%+ 96 *25%+ 94* 25%), and our trade's stop loss price will be 95.06.
​
97*(1-0.02) = 95.06
Since the stop price (95.06) is higher than the lowest entry (94), the bot will remove this entry and redistribute its partial amount, as follows:

DSL: 2%
X/USDT
Leverage: 1x
Entry:
1. 100 (33.3%)
2. 98 (33.3%)
3. 96 (33.4%)
Take Profit:
1. 120 (100%)
Stop Loss:
95.06 (100%)

Since the last entry was removed the new weighted average entry price is 98 (100*33.3%+ 98*33.3%+ 96 *33.4%) with a stop still at 95.06, which makes effective DSL to be 3%, although the configuration is set to DSL 2%.


## Default Stop Loss Formula
LONG Trades
weighted_avg_entry_price * (1 - (default_stop_loss/leverage))SHORT Trades
weighted_avg_entry_price * (1 + (default_stop_loss/leverage))


## Automated Leverage Adjustments
Please note that for automated trades with leverage, the bot will automatically divide the default stop loss percentage by the trade's leverage to keep your effective stop loss percentage (learn more on the Automated Configuration Leverage Adjustment).

*Weighted average is a calculation that takes into account the varying degrees of importance of the numbers in a data set. In calculating a weighted average, each number in the data set is multiplied by a predetermined weight before the final calculation is made.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"5814860","anonymous_id":"6ee33f12-8984-4708-9b81-d7be1d9480a4"};
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
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n<!-- Image description: The screenshot shows the "Stop" tab of the Cornix trading bot's "Create Signals Bot" interface, with the "Personal" stop-loss mode selected. Key UI elements include tabs (General, Entries, Take-Profits, Stop, Advanced), a "Stop-Loss Distance Percent" field set to 10%, a "Stop-Loss Baseline" dropdown (set to "Average Entries"), and toggles for "Skip Signals Without Stop-Loss" (Off), "Stop-Loss Timeout" (Off), and "Leveraged Trailing" (Channel). The top displays "Live Trading"/"Demo" buttons and BTC/USD price ($86,009.43, +2.91%). -->
![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1431722550/397acf1366fa6cc265decaca6d69/image.png?expires=1772540100&amp;signature=e58acb752e39b7624ff8ac169dcc5cd9665a0cad5d725c6edb419d9cbd2b65ca&amp;req=dSQkF858n4RaWfMW1HO4zXLLvNKfy1jpE55utj2ueO1XSfV4hMEmJlnrT0Su%0AAsCOAvszOp4%2Btj3iNKM%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1431722550/397acf1366fa6cc265decaca6d69/image.png?expires=1772540100&amp;signature=e58acb752e39b7624ff8ac169dcc5cd9665a0cad5d725c6edb419d9cbd2b65ca&amp;req=dSQkF858n4RaWfMW1HO4zXLLvNKfy1jpE55utj2ueO1XSfV4hMEmJlnrT0Su%0AAsCOAvszOp4%2Btj3iNKM%3D%0A\n\n**Описание:** The screenshot shows the "Stop" tab of the Cornix trading bot's "Create Signals Bot" interface, with a blue-highlighted section displaying stop-loss settings. The UI includes tabs (General, Entries, Take-Profits, Stop, Advanced) at the top, toggle options ("Off," "Channel," "Personal") for stop-loss configuration, input fields for "Stop-Loss Distance Percent" (set to 10%) and "Stop-Loss Baseline" (set to "Average Entries"), and additional options like "Skip Signals Without Stop-Loss," "Stop-Loss Timeout," and "Leveraged Trailing" below. The top-right corner shows the BTC/USD price ($86,009.43, +2.91%) and "Live Trading"/"Demo" mode buttons.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow (raven) holding a small yellow object in its beak, perched on a curved line above the bold, dark blue text “cornix.” The design is clean and minimalistic, with the logo centered on a plain white background, emphasizing the brand’s visual identity.\n\n---\n\n### Изображение 3\n\n![Image 3](https://static.intercomassets.com/avatars/7621376/square_128/WhatsApp_Image_2024-07-28_at_09.17.24_c4fe6c8e-1722176280.jpg)\n\n**URL:** https://static.intercomassets.com/avatars/7621376/square_128/WhatsApp_Image_2024-07-28_at_09.17.24_c4fe6c8e-1722176280.jpg\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a clean, minimalistic design. The UI features a top navigation bar with tabs like "Dashboard," "Trading," and "Settings," alongside a user profile icon and a "Start Trading" button. Below, the main section displays trading metrics (e.g., profit, trades) in a grid layout, with a sidebar for strategy selection and a central area for real-time trade logs or charts.\n\n---\n\n
