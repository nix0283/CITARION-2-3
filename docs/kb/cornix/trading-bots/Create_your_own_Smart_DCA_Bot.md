# Create your own Smart DCA Bot

**URL:** https://help.cornix.io/en/articles/6164330-create-your-own-smart-dca-bot

**Created:** 2026-03-03T11:45:17+00:00

---

Create your own Smart DCA Bot | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
Creating a new bot is comprised of 5 Steps:GeneralEntries'Amount Scale' and 'Number of Orders''Price Difference' and 'Price Scale'Take-ProfitsStopAdvanced- All Collections
- Trading Bots
- DCA
- Create your own Smart DCA Bot
# Create your own Smart DCA Bot
How to create your own DCA bot
Written by Hadar Cornix Updated over 3 months agoTable of contents
Creating a new bot is comprised of 5 Steps:GeneralEntries'Amount Scale' and 'Number of Orders''Price Difference' and 'Price Scale'Take-ProfitsStopAdvanced
To create a new bot, under the DCA section, navigate to the "My Bots" page and click the "+ Create Bot" button on the top right corner of the screen:


# Creating a new bot is comprised of 5 Steps:
-
General: set your bot's general basic settings, such as its name, symbol, exchange, amount per trade, and direction and leverage for futures exchanges.
-
Entries: set your entry strategy, including the number of orders, their price, and their size.
-
Take-Profit: set your take-profit order to realize your earnings.
-
Stop: mitigate your risk by setting a stop-loss order and other stop settings.
-
Advanced: set a cooldown time and the number of trades until the bot stops.
On the right side of the screen, under the 'Available Balance' you can see the currently available amount of the coin which is relevant for the bot you are creating, and a dynamic summary of the bot's orders which updates with every change you are making while creating the bot.


For your convenience, while you set your bot, the system will warn you (in red) when something is invalid and will let you know what needs to be changed in order to create a valid bot.

Once you’re done setting up your bot correctly, you can create the bot by clicking the "Create Bot" button on the right side of the screen. When creating the bot, you will be able to choose between "Create" and "Create & Activate":

-
"Create & Activate" - will create the bot and activate it. Once the bot is activated, the first trade will be immediately opened.
-
"Create" - will create the bot in an inactive state and trades won't be opened until activating the bot.
As long as a DCA bot is active, it will always have one open trade (excluding cooldown time). Each time a trade is closed (hits a take-profit or stop-loss target), a new trade will be created automatically with the bot's configurations (unless configured otherwise on the advanced settings).
# General
-
Bot Name: give your bot an indicative name that will help you differentiate easily between your bots.
-
Account: choose the exchange account to be connected to your bot. Please note that the account's auto trading configuration won't be applied for the bot, but only the configuration set for the bot.
-
Symbol: choose the desired symbol for your bot.
-
Amount Per Trade: set the total potential amount to be invested in each of your bot's trades. You can set it by fixed BTC or fixed USD.
For Futures exchanges:
-
Direction: set your bot's direction for long or short.
-
Margin Type: choose the desired leverage type (isolated or cross).
-
Multiplier: choose the leverage level.
# Entries
For each bot, the first entry order will be a market order and the following orders will be calculated based on it and by the settings below:
-
The 'Customize First Entry' toggle will allow you, if enabled, to set a specific amount to be allocated for the first entry order, defined as a percentage out of the total trade amount. Otherwise, if disabled, the allocation for the first order will be set up based on the same parameters as all other entry orders as follows.
## 'Amount Scale' and 'Number of Orders'
The 'Amount Scale' and 'Number of Orders' parameters will determine the amount to be invested in each order
-
'Amount Scale': will determine the multiplier between each following entry order amount and will set the ratio between the orders, in terms of the amount invested in every order.
-
'Number of Orders': will determine the total number of potential entry orders the bot will place in each trade (up to 50 entry orders).
-
'Number of Active Orders': will determine the total possible maximum number of active entry orders the bot will be allowed to place simultaneously on the exchange.

For example:
Amount per trade = 130
The number of orders = 3
Amount Scale = 3

The first order will be for $10 and the following orders will be $30 and $90 respectively.
Amount per trade = 1st Order + 2nd Order (1st Order*amount scale) + 3rd Order (2nd Order*amount scale).
## 'Price Difference' and 'Price Scale'
The 'Price Difference' and 'Price Scale' parameters will determine the orders' price
-
'Price Difference': will set the difference between the first entry (which will be at market price) to the second entry order (which will be set to be at the first entry price minus the price difference percentage).

For Example:
First Entry Price (Market Price) = 100
Price Difference = 1%

The three first entry orders will be placed at 100 (market price), 99 (100 - 100*1%), and 98.01 (99 - 99*1%).
-
'Price Scale' - will set the price difference multiplier from the second entry order and the following orders.

For Example:
First Entry Price (Market Price) = 100
Price Difference = 1%
Price Scale = 2

The formula will be:
(Previous order price - Previous order price* Price difference* Price scale^ Previous index number)
​Here's an example for a calculation of 5 targets:
1. 100 (market price)
2. 99 (100 - 100*1%*2^0)
3. 97.02 (99 - 99*1%*2^1)
4. 93.14 (97.02 - 97.02*1%*2^2)
5. 85.68 (93.14-93.14*1%*2^3)
-
'Max Order Price Difference': will show you the price difference (distance) in percentages between the first and last orders, taking into consideration all of the parameters above.
-
'Trailing': if enabled will apply Trailing Entry based on the chosen percentage for all entry orders, except for the first entry order which is a market order.
# Take-Profits
-
'Take-Profit Distance Percent': will set your take-profit order as a percentage above the entry price (baseline).
-
'Take-Profit Baseline': will determine if the 'Take-Profit Distance Percent' will be above the first entry or above the average entry price. The baseline will be updated based on the actual price(s) of the entries fulfilled.
-
'Trailing': if enabled will apply Trailing Take-Profit based on the chosen percentage.
# Stop
-
'Stop-loss Percent': will set your stop-loss order as a percentage below the entry price (baseline).
-
'Stop-loss Baseline': will determine if the 'Stop-loss Percent' will be in accordance with the first entry or the average entry price.
-
'Number of Continuous Stops Before Bot is Stopped': in order to protect yourself, this feature allows you to define the total number of continuous stop-loss orders that will be executed by the bot before it is automatically deactivated so that no more positions are opened without manually re-activating it.
-
'Stop-loss Timeout': The Stop Loss Timeout feature allows you to define a timeout period by which to delay the closing of a trade with a stop-loss order, in case you suspect the price will change again in the desired direction shortly, and you don't want to close (sell) your position immediately when reaching the stop-loss price.
# Advanced
-
'Cooldown After Trade Close': allows you to set an amount of time before a new trade will open automatically after a trade is closed. Leaving it with "0" will cause a new trade to open up immediately when a trade is closed.
-
'Number of Trades Until Bot Stop': this allows you to define the total number of trades that will be created by the bot before it is automatically deactivated so that no more positions are opened without manually re-activating it.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"6164330","anonymous_id":"8a2aeec3-f568-4ed4-bef2-7101181acb62"};
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
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n![Image 1](https://downloads.intercomcdn.com/i/o/503843807/4c5086e1828280bd6386e0a4/Screenshot+2022-04-27+160825.png?expires=1772540100&amp;signature=6ad1efed79b10f5d89a570697bd360e8c198c256da58967dca6a7e99cf4aa6ee&amp;req=cSAkHs19lYFYFb4f3HP0gGwJxu8OlysPH9XCGk1YYWRrpvn4ouBCiwBjNymS%0An5JFcakKmqOe3f9S%2Bw%3D%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/503843807/4c5086e1828280bd6386e0a4/Screenshot+2022-04-27+160825.png?expires=1772540100&amp;signature=6ad1efed79b10f5d89a570697bd360e8c198c256da58967dca6a7e99cf4aa6ee&amp;req=cSAkHs19lYFYFb4f3HP0gGwJxu8OlysPH9XCGk1YYWRrpvn4ouBCiwBjNymS%0An5JFcakKmqOe3f9S%2Bw%3D%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a dark blue theme, featuring a top navigation bar with tabs (General, Entries, Take-Profits, Stop, Advanced). On the left, "General Settings" includes fields for Bot Name ("BTC/USDT Long Bot"), Account ("My-KuCoin"), Symbol ("BTC/USDT"), and "Amount Per Trade" (set to "Fixed Usd Amount" with a $50 value). On the right, sections display "Available Balance" (45.27745 USDT), a "Create Bot" button, "Entry Orders Summary" (listing 5 price/distance and **URL:** https://downloads.intercomcdn.com/i/o/503843807/4c5086e1828280bd6386e0a4/Screenshot+2022-04-27+160825.png?expires=1772540100&amp;signature=6ad1efed79b10f5d89a570697bd360e8c198c256da58967dca6a7e99cf4aa6ee&amp;req=cSAkHs19lYFYFb4f3HP0gGwJxu8OlysPH9XCGk1YYWRrpvn4ouBCiwBjNymS%0An5JFcakKmqOe3f9S%2Bw%3D%3D%0A\n\n**Описание:**0 ratio entries), and "Take-Profit Order Summary" (showing 39333.5 (1%) at 100% ratio).\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/503854544/7c4cab96f97215e770d9970c/image.png?expires=1772540100&amp;signature=1ff5385eaa22e1a787bda354ab6aff202aa4c16f02d27d03fb1e26973befac9e&amp;req=cSAkHsx6mIVbFb4f3HP0gNVjetsSyXgE3vCBEWT5FkEahWwfKHK2JsRHwl%2Bq%0AW0avIciH2brPU5iGGg%3D%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/503854544/7c4cab96f97215e770d9970c/image.png?expires=1772540100&amp;signature=1ff5385eaa22e1a787bda354ab6aff202aa4c16f02d27d03fb1e26973befac9e&amp;req=cSAkHsx6mIVbFb4f3HP0gNVjetsSyXgE3vCBEWT5FkEahWwfKHK2JsRHwl%2Bq%0AW0avIciH2brPU5iGGg%3D%3D%0A\n\n**Описание:** The Cornix trading bot interface features a dark blue theme with a left sidebar containing navigation options like "Portfolio," "Trades," and "Bots," with "DCA" highlighted. The main section displays "My Bots" and "Public Bots" tabs, three data panels (Closed Trades, Accumulated Profit, Profit By Day), and a "Create Bot" button in the top right, with a message indicating no DCA bots are created yet.\n\n---\n\n### Изображение 3\n\n![Image 3](https://downloads.intercomcdn.com/i/o/503868208/2246162af37d835539065053/image.png?expires=1772540100&amp;signature=d21e0da4bdc69d661d27450140e72cae2529dc52e7309b2c1891350094692259&amp;req=cSAkHs92n4FXFb4f3HP0gOHNtVk8noSOkB7JVORikAUc3XwWOoN%2Fd9ITIPO0%0AOOy9QI12j1PG9qeiUg%3D%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/503868208/2246162af37d835539065053/image.png?expires=1772540100&amp;signature=d21e0da4bdc69d661d27450140e72cae2529dc52e7309b2c1891350094692259&amp;req=cSAkHs92n4FXFb4f3HP0gOHNtVk8noSOkB7JVORikAUc3XwWOoN%2Fd9ITIPO0%0AOOy9QI12j1PG9qeiUg%3D%3D%0A\n\n**Описание:** The screenshot shows a dark blue "Confirm Bot Creation" modal with a title, a question asking if the user wishes to activate the bot, a note about immediate trading, and three buttons: "Cancel" (left), "Create" (middle), and "Create & Activate" (right, highlighted). Two white arrows point to the "Create" and "Create & Activate" buttons, and a close (X) icon is in the top-right corner.\n\n---\n\n### Изображение 4\n\n![Image 4](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue raven holding a yellow object in its beak, perched on a curved line above the bold, dark blue text “cornix.” The design is clean and minimalist, with the logo centered against a white background, emphasizing the brand’s visual identity.\n\n---\n\n### Изображение 5\n\n![Image 5](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot displays a Cornix trading bot interface with a clean, minimalistic design. Key UI elements include a sidebar with navigation options (likely for settings, strategies, or account management), a central dashboard area (possibly showing trading metrics or bot status), and a top bar with user profile or account details. The layout emphasizes clarity, with distinct sections for navigation and content, typical of trading bot platforms.\n\n---\n\n
