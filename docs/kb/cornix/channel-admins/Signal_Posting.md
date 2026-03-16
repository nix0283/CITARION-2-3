# Signal Posting

**URL:** https://help.cornix.io/en/articles/5814956-signal-posting

**Created:** 2026-03-03T11:54:42+00:00

---

Signal Posting | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
How to post signals?'Free Text' SignalsMain Format Rules:Amount Per Trade:PricesBreakout Signals:Leveraged Signals:Entry Zone Signals:Close Signal on Take Profit\ Stop Loss Before Entry:Free Text Signal Format:'Publish Signal' Feature GuidedFree TextSignal posting limitations- All Collections
- Channel Admins
- Signals Management
- Signal Posting
# Signal Posting
Written by Hadar Cornix Updated over 2 months agoTable of contents
How to post signals?'Free Text' SignalsMain Format Rules:Amount Per Trade:PricesBreakout Signals:Leveraged Signals:Entry Zone Signals:Close Signal on Take Profit\ Stop Loss Before Entry:Free Text Signal Format:'Publish Signal' Feature GuidedFree TextSignal posting limitations
# How to post signals?
Posting signals on your channel can be done in one of two ways:
1) Sending a 'Free Text' directly into your channel (Easier and faster).
2) Using the 'Publish Signals' feature on your Telegram Admin Panel (More Powerful).

# 'Free Text' Signals
The quickest and easiest way to post a signal is to drop the text into your channel's chat. The format needs to follow certain posting rules, otherwise the bot will not be able to read and parse it correctly.
##
Main Format Rules:
-
Always include the full coin pair name (for example BTC/USD).
-
Always include the "Buy" or "Entry" keyword in the message.
-
Always include either the "Sell" or "Stop" keywords in the message.
-
For Take Profit targets you can use either "Take Profit", "Sell", "Target"
or "TP".
-
You can include up to 10 Take-profits and up to 10 Entry targets.
-
There can only be one Stop Loss target.
-
All targets must be specified as prices and not as percentages. To place targets based on distance percentage, users can set specific entry/ take-profit strategies on their personal Signals Bot.
-
If you include a Trailing Configuration, the formatting must match the example below exactly. Just change the numerical values as needed.
-
A stop loss price can't be above the entry price for a long signal, or below the entry price for a short signal.
-
It is not obligatory to write LONG or SHORT. Cornix will do this automatically based on the buy and sell prices.
-
Try to avoid variations of the keywords, like "S/L" etc. Instead, type out the word "Stop".
-
Try to minimize the usage of unicode emojis like a diamond, unnecessary spaces, irrelevant texts etc.
## Amount Per Trade:
-
It is optional to include an "Amount per trade" configuration in your signal.
-
For the regular "Amount Per Trade as Percentage", use the following formats:
-
Amount per trade 5%
-
Amount: 45.0%
-
Amount 5%
-
Invest up to 5% of your portfolio
-
Capital invested : 2% 5% Max
-
When setting the amount per trade as "Risk percentage", use the formats:
-
Risk management: Risk 1% - 1.5% of your portfolio
-
Risk management 0.5%
-
RM: 10.0%
-
Amount: 1.0% Risk
-
Any other combination that includes the text "Risk Management" or "RM"
### ❗Important Notes:
-
The limit for this setting is up to 20% amount per trade or 20% risk percentage.
-
When setting a range for the amount, or multiple options for amounts, only one option will be parsed with the signal. It will be the first one mentioned on your text.
For example:
​"Use between 3% and 4% of your portfolio" In this case the bot will take 3% amount per trade.
-
The word "Risk" alone will not get parsed as "Risk percentage", therefore you must include the full text of "Risk management" or "RM".
## Prices
-
Prices in the Satoshi range can be abbreviated and will work fine,
eg. 0.00030000 can be written as 30000 or 30K.
-
Entry prices written as 100-200 will be translated into TWO entries.
-
In order to create an Entry Zone, add the word ‘Zone’ before the prices.
​eg. Entry/ Buy zone: 100-200.
-
Multiple prices can be sent in one line. They will be sorted automatically based on the trade's/signal's direction.
eg. Buy 100 300 200 400.
-
To buy at the current price use the text "Buy at current price", for example:
BTCUSDT
Buy at current price
Sell at 80000 - 81000
Stop at 50000
​❗Note: this will not generate a market order for the trades, instead it will create a limit buy order with the current market price.
## Breakout Signals:
-
Breakout signals will be triggered when adding the words 'above' (for long) or 'below' (for short) for your entries.
eg. Enter above 200-100 or Enter Below 100-200. This will wait before buying, making it a Breakout signal.
-
Another way to define s Breakout signal is to specify "Signal Type: Breakout" (by default signal is parsed as "Signal Type: Regular")
-
Breakout signals can only include up to 2 entry prices.
## Leveraged Signals:
-
Leverage signals should have a leverage indication, it can be one or more of these 3 options:
-
The keyword 'Leverage' or 'Lev' and then the desired leverage type & level.
-
The leverage type & level alone. eg. Cross x20/ Isolated x5.
-
Mentioning the leveraged exchanges names, for example: "Exchanges: Bybit USDT, Binance Futures". In case no leverage type and level are mentioned, the bot will use the default of Isolated x1.
## Entry Zone Signals:
-
Admins can specify a buy zone (a range) rather than a fixed entry price. Example: `Entry Zone: 100-200`.
-
For entry-zone signals, the notification message will be "Entered entry zone", instead of “entries achieved”.
-
The number of entry orders that will be created on the user's account, for an entry zone signals, depends in the Entry Strategy, which can be set on the channel's trading configuration, or on the user's Signals Bot entry strategy.
## Close Signal on Take Profit\ Stop Loss Before Entry:
When a signal is published directly in the channel (Free Text Signal), a dynamic “Close Trade on Take Profit\SL before Entry” mechanism is enabled:
-
If the signal was posted when the current market price is above the price of the first TP minus 0.5%, we assume this signal was created for the future and we won’t close it if reached Take Profit\SL before Entry.
-
If the signal was posted when the current market price is below the price of the first TP minus 0.5% then we will close it on Take Profit\SL before Entry.
When a signal is published through the bot (Signals > Publish), both for free text and guided methods, you will be asked if you want to start tracking the signal right now or only when reaching the entry:
-
"Start tracking the signal right now" means that the signal will get closed if take profit or stop loss hit before the entry price is reached.
-
"Start tracking the signal when reaching the entry” means that the signal will not get closed in case take profit or stop loss hit before entry price is reached.
## Free Text Signal Format:
This is an example for a format that you can use by copy-pasting it to your channel and changing the values. Note that this is not the only option, and any other format will also work, as long as you're following the guidelines mentioned above.

⚡⚡ #BTC/USDT ⚡⚡
Exchanges: Binance Futures
Signal Type: Regular (Long)
Leverage: Isolated (5X)

Entry Zone:
38766.9 - 38766.9

Take-Profit Targets:
1) 38766.9
2) 38766.9

Stop Targets:
1) 38766.9

Trailing Configuration:
Entry: Percentage (0.5%)
Take-Profit: Percentage (0.5%)
Stop: Moving Target - Trigger: Target (1)

Notes:
-
This method is the quickest way to copy-paste a signal, but it has limitations: target ratios % and risk allocation mentions will not get parsed using this option.

-
If you wish to use a Percentage Trigger for Trailing Stop Loss, the format will be:
Stop: Breakeven - Trigger: Percent (1%)
Once a signal with the correct format is posted, it will be immediately transformed into the same message, but with the Cornix follow buttons added below.


# 'Publish Signal' Feature
The 'Signals' > 'Publish' feature can be accessed from the Telegram bot main menu, under the Admin Panel section:
​
You can choose between two options: Guided and Free Text.


## Guided
The 'Guided' option will guide you step by step, and will finally ask you to manually set the prices, once confirmed it will be automatically posted on the channel.
The Guided feature allows you to set some advanced settings to your signals. When using the Guided path, a "published by" text will be added to the signals with the admin's name (this can be disabled by contacting the Cornix support).

## Free Text
The 'Free Text' option is similar to the raw free text signal posting option in the channel's chat, but with one major difference:
Once you enter your intended raw text signal, the bot will follow up with some additional questions on Trailing Entry/ TP/ Stop-loss, the intended risk usage, and the signal's ratios. You'll also be able to chose if the signal will stay open if Take Profit or Stop Loss hit before Entries.

# Signal posting limitations
-
The maximum amount of signals that can be published on the channel per minute is 7.
-
The number of open signals that can be managed simultaneously on the channel is based on the number of active users in the channel. Read more.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"5814956","anonymous_id":"5c7fa41d-3305-4a9b-9c77-ab9fa1bc0fee"};
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
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1834386058/92b2f38e1fd5cf826b4367f6a90e/image.png?expires=1772541000&amp;signature=c30ab151b65cffb19491b902ecfc384e8b4d855f3b4dfff32b976be9efeaa326&amp;req=dSgkEsp2m4FaUfMW1HO4zfluQPmS0vsZ3NBL8yGHnwXRYSC2UAdOtAD4QD5z%0ACIh%2FrrKLXDuZMnv8DBo%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1834386058/92b2f38e1fd5cf826b4367f6a90e/image.png?expires=1772541000&amp;signature=c30ab151b65cffb19491b902ecfc384e8b4d855f3b4dfff32b976be9efeaa326&amp;req=dSgkEsp2m4FaUfMW1HO4zfluQPmS0vsZ3NBL8yGHnwXRYSC2UAdOtAD4QD5z%0ACIh%2FrrKLXDuZMnv8DBo%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a white card displaying the bot name "Cornix", trading pair "BTC/USDT", leverage "Lev x10", buy price "90000", sell price "110000", and stop-loss "SL 85000". Below the card are three green buttons: "View Signal" (with a chart icon), "One Click Follow" (with a lightning icon), and "Set Auto Trading" (with a robot icon), set against a light green background with subtle doodles.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1834388800/f5e27d894086f20ba15bbf16d4cd/image.png?expires=1772541000&amp;signature=4b763e55cb1b1197c65c629a3f0d22b578fced08837f284ba25e37a36d353966&amp;req=dSgkEsp2lYlfWfMW1HO4zc8rV2piPdxgRNhzTsxCTft5ALkDbQ5Lzhrx8yve%0Au6pIfPyc%2BWOagEKcDJI%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1834388800/f5e27d894086f20ba15bbf16d4cd/image.png?expires=1772541000&amp;signature=4b763e55cb1b1197c65c629a3f0d22b578fced08837f284ba25e37a36d353966&amp;req=dSgkEsp2lYlfWfMW1HO4zc8rV2piPdxgRNhzTsxCTft5ALkDbQ5Lzhrx8yve%0Au6pIfPyc%2BWOagEKcDJI%3D%0A\n\n**Описание:** The screenshot shows a mobile app's "Admin Panel" interface with a green-themed design. At the top, a white header displays "Admin Panel: Choose option" and the time "6:14 PM". Below, a blue-outlined "Publish" button is prominently featured, surrounded by other green buttons: "Open Signals", "Closed Signals", "Export Signals History", "Main Menu", and "Back".\n\n---\n\n### Изображение 3\n\n![Image 3](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1834390207/9a47cc9056eca8aa7b57c983ff78/image.png?expires=1772541000&amp;signature=1c034aae81faf7188538ee7b0c6a6bcaebeba9b444bc1be8266faffaa35d08d8&amp;req=dSgkEsp3nYNfXvMW1HO4zYSjYupZdhdlldZXX4Q8zzo2FIFhj9dqgJTSG9si%0AQWej2ae0AYB%2Fm39SCnU%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1834390207/9a47cc9056eca8aa7b57c983ff78/image.png?expires=1772541000&amp;signature=1c034aae81faf7188538ee7b0c6a6bcaebeba9b444bc1be8266faffaa35d08d8&amp;req=dSgkEsp3nYNfXvMW1HO4zYSjYupZdhdlldZXX4Q8zzo2FIFhj9dqgJTSG9si%0AQWej2ae0AYB%2Fm39SCnU%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a green-themed design. At the top, a white text box displays "Signals > Publish Signal: How would you like to create a signal to publish?" with a timestamp "6:14 PM" on the right. Below, two large green buttons labeled "Guided" and "Free Text" offer signal creation options, and two smaller green buttons at the bottom read "Main Menu" (with a left arrow) and "Back" (with a left arrow).\n\n---\n\n### Изображение 4\n\n![Image 4](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow (or raven) holding a small yellow object in its beak, positioned above the lowercase text “cornix” in a bold, dark blue font. The design is clean and minimalistic, with the bird perched on a subtle curved line beneath it, emphasizing the brand’s visual identity.\n\n---\n\n### Изображение 5\n\n![Image 5](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a clean, minimalistic design. Key UI elements include a sidebar (likely for navigation) and a main content area (possibly displaying trading settings or bot status), though specific details like charts, buttons, or input fields are not visible in the provided image. The interface appears structured for easy access to trading automation features.\n\n---\n\n
