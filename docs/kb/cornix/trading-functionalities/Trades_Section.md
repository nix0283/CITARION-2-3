# Trades Section

**URL:** https://help.cornix.io/en/articles/5814942-trades-section

**Created:** 2026-03-03T11:52:37+00:00

---

Trades Section | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
Trade Details:Close Trade:Edit Trade:CancelEdit ConfigurationMove nearest entrySell partiallyShare resultsBulk actions- All Collections
- Trading Functionalities
- Mobile App - General
- Trades Section
# Trades Section
How to view, manage, and edit your trades, including closing options, order editing, and trade configurations.
Written by Nikita Shirokov Updated over 4 months agoTable of contents
Trade Details:Close Trade:Edit Trade:CancelEdit ConfigurationMove nearest entrySell partiallyShare resultsBulk actions
Let’s go over the details available for each trade.

On the main screen, you will see a list of your trades with basic details such as the symbol, invested amount, and trade progress.
The colored graph indicates the progress of the trade.
The green color indicates the ratio between the amount filled and the amount allocated to the trade.
The orange indicates the ratio between the amount sold and the amount that potentially will be sold.
In the middle, you can see your current profit or loss (in %), along with how long the trade has been active.

When you click on the three dots button, you will see a drop-down menu with all possible actions for this trade:

Let's get through each one:

## Trade Details:
In this section, you will see all the details related to this trade under the General tab. Then, you can use the Timeline tab to see when each order of this trade was filled, along with a TradingView chart with your orders marked on it. The Orders tab will show all the orders of the trade, their ratios (%), prices, filled amounts and status. The Last Configuration tab shows trailing settings that are applied to this trade.

On top of the page, you can use buttons to close or edit the trade, along with a share results button:




## Close Trade:
On Cornix, you will always have 2 options when closing a trade, giving you the flexibility of trade management:

-
Sell at Current Price - Will close your trade and will sell all existing trade coins at market price, using a market order.
-
Keep Coins - Will close your trade and will leave any amount from the filled entries untouched in your exchange account. Meaning the trade will appear as closed on Cornix and an open position will remain active on the exchange for that symbol.
## Edit Trade:
In this section, you are able to add an amount to an already opened trades

Add USDT amount - Selecting this option allows you to add an amount to the pending entry targets. The amount added will be divided between the pending entry targets according to the amount percentages for each target. For example, if there are three entry targets with the following percentages: 25%, 25% and 50% and the first target of 25% was already filled, then when adding the new amount to the trade the amount will be divided between the two remaining entry targets with percentages of 25% and 50%. Since the second remaining entry target has twice the percentage as the first, then the percentages will be normalized to 100% such that 33.33% of the added amount will be added the the first entry target (that originally had 25%), and the remaining 66.66% of the added amount will be added to the second entry target (that originally had 50%).

Add Existing Amount - If you already hold coins for this symbol, you can select an existing amount to use in the trade. The existing amount selected for the trade will be immediately divided between the pending take-profit targets. When adding an existing amount, you will see a new entry order with the newly added amount. The new order will be created with a fulfilled status with the note "Existing Amount".

### Edit Order
Additionally, you can edit each order (that was not filled yet) of your trade:

Let's go through each of the options:

### Edit
Clicking the Edit button will open the order edit modal. In this modal, you will be able to change the order price. For entry orders, you will also be able to edit the amount that will be used for the entry order. For take-profit orders, you will be able to edit the ratio of the order. For stop orders, only the price will be editable, since the stop will always cover 100% of the trade amount.

Make sure to enter a valid price and amount based on the messages shown in the modal.

*Note that when editing a trade that was opened automatically, it will then be considered a 'manually opened' trade, and the auto-trading configuration will no longer apply on the edited trade.

## Cancel
Clicking the Cancel button will remove the order from the trade without redistribution.

Entry orders - Cancelling entry orders will decrease the total amount allocated for the trade by the order amount. For take-profit orders.

Take-profit orders - Cancelling a take-profit order will decrease the total amount that will be used for the take-profit targets in the trade and might mean that some of the allocated amount to the trade will be left in the exchange account when the trade closes.

Stop orders - Cancelling the stop order will remove the stop order from the trade completely and will leave the trade without any active stop-loss order. Please note that if you have an active trailing stop configuration, the stop order will be reactivated once the next take-profit target is achieved according to your trailing stop configuration.

### Cancel and redistribute
Clicking the Cancel and redistribute button will remove the order from the trade with redistribution to the other orders of the same type. This option is not available for stop orders since we currently only allow one stop order per trade.

Entry orders - Cancelling and redistributing an entry order will cancel the order and remove the entry target from the trade. In this case, instead of removing the order amount from the trade like the previous option, the order amount will now be redistributed among the remaining pending entry orders.

Take-profit orders - Cancelling and redistributing a take-profit order will cancel the order and remove it from the trade.
In this case, instead of removing the order percent from the trade like the previous option, the order percent will be redistributed among the remaining pending take-profit targets.
​
### Move to current price
Selecting this option will move the order price to the current price.

*After applying the needed changes, don't forget to click 'Save' in the top right corner of the page.

## Edit Configuration
Here you can edit Trailing Entry, Trailing Take Profit, and Trailing Stop Loss settings for the selected trade

## Move nearest entry
This option will be available for the trades that have at least one pending (not filled) entry order


## Sell partially
This option will be available for the trades that have at least one filled entry order


It allows you to manually sell part of the filled amount of the selected trade

## Share results
This option allows you to generate and share a beautiful picture showing the current result of the selected trade, along with your personal referral QR code:


## Bulk actions
This feature allows you to select and close several trades at the same time.






Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"5814942","anonymous_id":"19b45933-fd56-4f57-88c0-29d7e87b25df"};
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
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n<!-- Image description: The screenshot shows a Cornix trading bot interface for a BTC/USDT open trade. At the top, there’s a header with a Bitcoin icon, “BTC/USDT - Open Trade,” and a close (×) button. Below, a blue oval highlights three buttons: a trash can (delete), a pencil (edit), and a “Share Results” button with a share icon. At the bottom, four tabs are visible: “General,” “Timeline,” “Orders,” and “Configuration” (the latter is highlighted in blue, indicating it’s the active tab). -->
<!-- Image description: The Cornix trading bot screenshot displays a **BTC/USDT** trading pair card with key metrics: a price of **$4,927**, a volume of **101,619.6** (red), a value of **0.485** (gray), and a **-0.55%** progress indicator (green circle, 30m duration). At the top, there are dropdown menus for **Symbol**, **Amount**, and **Progress**, plus a filter icon. The card includes a Bitcoin logo, a bot icon, and a three-dot menu for additional options. -->
![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1820859769/73d507338e2d9f7537b8af1c30ae/photo_2025-11-09_17-25-33.jpg?expires=1772541000&amp;signature=513e071da81f8b932b351994bf073b143f6a63adfc1d14b358ff304fb5a5b6cd&amp;req=dSglFsF7lIZZUPMW1HO4zZ4sQbXPl4l9tURcGgUFzMYIkm8%2F83FCJUWBKJuM%0AMyl88w6wcxA%2Bhkp1gYI%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1820859769/73d507338e2d9f7537b8af1c30ae/photo_2025-11-09_17-25-33.jpg?expires=1772541000&amp;signature=513e071da81f8b932b351994bf073b143f6a63adfc1d14b358ff304fb5a5b6cd&amp;req=dSglFsF7lIZZUPMW1HO4zZ4sQbXPl4l9tURcGgUFzMYIkm8%2F83FCJUWBKJuM%0AMyl88w6wcxA%2Bhkp1gYI%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a top bar containing three dropdown menus labeled "Symbol," "Amount," and "Progress," plus a sort icon. Below, a card displays the BTC/USDT trading pair, featuring a Bitcoin icon, a bot icon, a USDT icon with the amount "101,619.6," a price of "$4,927," a value of "0.485," a green circular progress indicator showing "-0.55%" and "30m," and a three-dot menu icon on the right.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1820860850/783773c62e111479a391299fff01/photo_2025-11-09_17-27-55.jpg?expires=1772541000&amp;signature=a9f0ce2f8740f974f800f14112de16f01060184593cc7aaa0e61d3dd2704bdd3&amp;req=dSglFsF4nYlaWfMW1HO4zZQwtJzvD6YVsQiS1OM7AVoVjTT2qgD9wNCRw4rp%0AekkGQZQFs9tIFDXwI18%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1820860850/783773c62e111479a391299fff01/photo_2025-11-09_17-27-55.jpg?expires=1772541000&amp;signature=a9f0ce2f8740f974f800f14112de16f01060184593cc7aaa0e61d3dd2704bdd3&amp;req=dSglFsF4nYlaWfMW1HO4zZQwtJzvD6YVsQiS1OM7AVoVjTT2qgD9wNCRw4rp%0AekkGQZQFs9tIFDXwI18%3D%0A\n\n**Описание:** The screenshot displays a "Trade Actions" menu from the Cornix trading bot, featuring a vertical list of options. Each option includes an icon and text: "Trade Details" (info icon), "Close Trade" (trash icon), "Edit Orders" (pencil icon), "Edit Configuration" (gear icon), "Move Nearest Entry" (up arrow, grayed out), "Sell Partially" (percentage icon), "Share Results" (share icon), and "Bulk Actions" (lightning icon). The menu has a clean, white background with dark text and icons, organized in a simple, scrollable list format.\n\n---\n\n### Изображение 3\n\n![Image 3](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1820868179/afd63966910a96fd920d0022a715/photo_2025-11-09_17-37-11.jpg?expires=1772541000&amp;signature=37b0a5fc2123019d188eb5bcbe557527418d5260df2a9c5999bb39b46c4e3b52&amp;req=dSglFsF4lYBYUPMW1HO4zeW7gtxW0xqF%2BNJutGYo%2Bowa2e0XVgUmzXv%2BnqCv%0AHmLXSsUtrSwUZynM%2BUo%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1820868179/afd63966910a96fd920d0022a715/photo_2025-11-09_17-37-11.jpg?expires=1772541000&amp;signature=37b0a5fc2123019d188eb5bcbe557527418d5260df2a9c5999bb39b46c4e3b52&amp;req=dSglFsF4lYBYUPMW1HO4zeW7gtxW0xqF%2BNJutGYo%2Bowa2e0XVgUmzXv%2BnqCv%0AHmLXSsUtrSwUZynM%2BUo%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface for a BTC/USDT open trade, with a header displaying the pair and status. A blue oval highlights three UI elements: a trash can (delete), a pencil (edit), and a "Share Results" button with a share icon. Below, four tabs—"General," "Timeline," "Orders," "Configuration"—are visible, with "Configuration" highlighted in blue.\n\n---\n\n### Изображение 4\n\n![Image 4](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1820873364/b50328a7142f874a562d2256b6fe/photo_2025-11-09_17-41-44.jpg?expires=1772541000&amp;signature=9f3be7d0055d4ecdc0608ebcae1f2403f1ac778ca7029ec6421804ff0ff788d5&amp;req=dSglFsF5noJZXfMW1HO4zeiJ9oZ2Ec5TExQQtXKLdqju7I%2FF0kt6TqZWBomI%0AaLJLxxiLEwkgbMlm3bs%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1820873364/b50328a7142f874a562d2256b6fe/photo_2025-11-09_17-41-44.jpg?expires=1772541000&amp;signature=9f3be7d0055d4ecdc0608ebcae1f2403f1ac778ca7029ec6421804ff0ff788d5&amp;req=dSglFsF5noJZXfMW1HO4zeiJ9oZ2Ec5TExQQtXKLdqju7I%2FF0kt6TqZWBomI%0AaLJLxxiLEwkgbMlm3bs%3D%0A\n\n**Описание:** The screenshot shows a "Close Trade" modal dialog from the Cornix trading bot. It includes a header with the title, a question asking what to do with existing coins, two radio button options ("Sell coins at current price" selected, "Keep coins" unselected), and two action buttons ("Cancel" and "OK") at the bottom.\n\n---\n\n### Изображение 5\n\n![Image 5](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1820879657/56d2690008e599cabb7f394f78ca/photo_2025-11-09_17-49-51.jpg?expires=1772541000&amp;signature=1479ef2cf47a74f06ef3bef7220808850964ab958ccb331d165f644a43c9abab&amp;req=dSglFsF5lIdaXvMW1HO4zbsg9dwfSyL6qIBrcLRFpNIaiGVYoxh5P%2BlmpYO4%0Ad%2FRMCVy4GcaEyKwp6IA%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1820879657/56d2690008e599cabb7f394f78ca/photo_2025-11-09_17-49-51.jpg?expires=1772541000&amp;signature=1479ef2cf47a74f06ef3bef7220808850964ab958ccb331d165f644a43c9abab&amp;req=dSglFsF5lIdaXvMW1HO4zbsg9dwfSyL6qIBrcLRFpNIaiGVYoxh5P%2BlmpYO4%0Ad%2FRMCVy4GcaEyKwp6IA%3D%0A\n\n**Описание:** The screenshot shows the Cornix trading bot interface for a BTC/USDT open trade, with a price chart displaying 5-minute data, trade metrics (fulfilled amount, total amount, PnL, current price), and a pop-up at the bottom labeled "Add Amount" offering two options: "Add USDT amount" and "Add existing BTC amount." A blue circle highlights the "Add existing BTC amount" option, while another blue circle points to a three-dot menu button at the top right.\n\n---\n\n### Изображение 6\n\n![Image 6](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1820883041/bd20c4700f992b3e98efa645a767/photo_2025-11-09_17-55-08.jpg?expires=1772541000&amp;signature=bb3aadaaa2423444c03ed5eee7f6fe1515582916f7a98854f9789a94bc7c155b&amp;req=dSglFsF2noFbWPMW1HO4zTtvbcXIP6HzRgP3t2E5X%2FryMe%2FVw2ZJ1BPaeAWi%0A%2BU7vbOwBWV36sdThGvc%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1820883041/bd20c4700f992b3e98efa645a767/photo_2025-11-09_17-55-08.jpg?expires=1772541000&amp;signature=bb3aadaaa2423444c03ed5eee7f6fe1515582916f7a98854f9789a94bc7c155b&amp;req=dSglFsF2noFbWPMW1HO4zTtvbcXIP6HzRgP3t2E5X%2FryMe%2FVw2ZJ1BPaeAWi%0A%2BU7vbOwBWV36sdThGvc%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface focused on "Take-Profit Orders," with a pending order (33.33% ratio, 101,430.8 value) highlighted. A pop-up menu titled "Order Actions" displays options like Edit, Cancel, "Cancel and redistribute," and "Move to current price," with a blue arrow pointing to the menu’s three-dot icon.\n\n---\n\n### Изображение 7\n\n![Image 7](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1820885120/74f657615ea53f2f62a4b1f0075a/photo_2025-11-09_17-58-08.jpg?expires=1772541000&amp;signature=a081637bdd47125f61f1dc568cda6ac5ef286d5d1153ad98801f7eb8ba7ef293&amp;req=dSglFsF2mIBdWfMW1HO4zY6BF%2B51n%2FtgeDunB0od11J7bV%2BwMsD%2B0KKXLI3Y%0AtHliWdeqFGoQN7DkBCI%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1820885120/74f657615ea53f2f62a4b1f0075a/photo_2025-11-09_17-58-08.jpg?expires=1772541000&amp;signature=a081637bdd47125f61f1dc568cda6ac5ef286d5d1153ad98801f7eb8ba7ef293&amp;req=dSglFsF2mIBdWfMW1HO4zY6BF%2B51n%2FtgeDunB0od11J7bV%2BwMsD%2B0KKXLI3Y%0AtHliWdeqFGoQN7DkBCI%3D%0A\n\n**Описание:** The screenshot shows a modal window titled "Edit Take-Profit Order #1" with two editable fields: "Price" (displaying 101430.8, with a note the price must be between 5083.6 and 2033460) and "Ratio" (showing %33.33, with a note the ratio must be between 1 and 100). At the bottom, there are two buttons: a white "Cancel" button and a blue "OK" button.\n\n---\n\n### Изображение 8\n\n![Image 8](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1820893575/ecd5b6ff93498db2079bd551855b/photo_2025-11-09_18-09-25.jpg?expires=1772541000&amp;signature=70f1c2b02e8dab18c7c7f943ee48a5f9e40630d2954d0bf74046a2bcf69cb1b4&amp;req=dSglFsF3noRYXPMW1HO4zXttTAGMGfgtzsWG7ACmwIpSRZNG1hAH9ydMn8OF%0AOTItR74nub5iUx1oWo4%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1820893575/ecd5b6ff93498db2079bd551855b/photo_2025-11-09_18-09-25.jpg?expires=1772541000&amp;signature=70f1c2b02e8dab18c7c7f943ee48a5f9e40630d2954d0bf74046a2bcf69cb1b4&amp;req=dSglFsF3noRYXPMW1HO4zXttTAGMGfgtzsWG7ACmwIpSRZNG1hAH9ydMn8OF%0AOTItR74nub5iUx1oWo4%3D%0A\n\n**Описание:** The screenshot shows a modal dialog from the Cornix trading bot titled "Move Nearest Entry," with a close (X) icon in the top-right corner. The dialog includes explanatory text about moving a trade’s nearest entry to the current price and a confirmation prompt, plus two buttons at the bottom: a white "Cancel" button and a blue "OK" button.\n\n---\n\n### Изображение 9\n\n![Image 9](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1820894911/5a7e7ff2d85993ff5b4ce3965e05/photo_2025-11-09_18-11-14.jpg?expires=1772541000&amp;signature=4b9608c56a90f5aed413802b0d8866d84b140c5f55bbfd53f62e116af9762a83&amp;req=dSglFsF3mYheWPMW1HO4zRG4An0W5S8zjH8PC3gc1FsuM%2B0L8lb6KYS3OiSl%0A8CiNiJRbQwH4pMygXws%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1820894911/5a7e7ff2d85993ff5b4ce3965e05/photo_2025-11-09_18-11-14.jpg?expires=1772541000&amp;signature=4b9608c56a90f5aed413802b0d8866d84b140c5f55bbfd53f62e116af9762a83&amp;req=dSglFsF3mYheWPMW1HO4zRG4An0W5S8zjH8PC3gc1FsuM%2B0L8lb6KYS3OiSl%0A8CiNiJRbQwH4pMygXws%3D%0A\n\n**Описание:** The screenshot shows a "Sell Partially" modal from the Cornix trading bot, with a header, a question about selling trade coins, a display of "15418.1" (50%) with a slider set to 50%, and two buttons: "Cancel" (white) and "Sell Coins" (blue). A close "X" icon is in the top-right corner.\n\n---\n\n### Изображение 10\n\n![Image 10](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1820896576/5cb6b983e62321c77fb0a5127be7/photo_2025-11-09_18-14-03.jpg?expires=1772541000&amp;signature=4e3e9dd371d73d470e8e91fd01e047db1e0e5fc8b2c8541ab6acc79e90032b4e&amp;req=dSglFsF3m4RYX%2FMW1HO4zWhAq4HaMjXbhphHJVfYKxJqizycyHpYnR%2FscyLc%0AtVi5BcqEGmvOSBsn%2FJs%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1820896576/5cb6b983e62321c77fb0a5127be7/photo_2025-11-09_18-14-03.jpg?expires=1772541000&amp;signature=4e3e9dd371d73d470e8e91fd01e047db1e0e5fc8b2c8541ab6acc79e90032b4e&amp;req=dSglFsF3m4RYX%2FMW1HO4zWhAq4HaMjXbhphHJVfYKxJqizycyHpYnR%2FscyLc%0AtVi5BcqEGmvOSBsn%2FJs%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a pop - up modal displaying a space - themed design. The modal features the Cornix logo, trade details (LONG, 10x, OP/USDT, +4.7% gain, entry/current prices), a referral QR code, and “Cancel”/“Share” buttons at the bottom. In the background, there are tabs for “Open (11)”/“Closed” trades, a “Hot trades” toggle, date filters, and a trade card for OP/USDT with price and percentage data.\n\n---\n\n### Изображение 11\n\n![Image 11](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow (with a yellow beak) perched on a curved line above the bold, dark blue text “cornix.” The design is minimalistic, with the crow and text centered on a white background, emphasizing the brand’s visual identity.\n\n---\n\n### Изображение 12\n\n![Image 12](https://static.intercomassets.com/avatars/5728333/square_128/me-1664707345.jpg)\n\n**URL:** https://static.intercomassets.com/avatars/5728333/square_128/me-1664707345.jpg\n\n**Описание:** The Cornix trading bot screenshot displays a user interface with a dark-themed layout, featuring a navigation sidebar on the left with menu options (e.g., "Dashboard," "Trades," "Settings") and a main content area on the right showing a table of trading data (columns like "Pair," "Status," "Profit/Loss") with interactive elements such as buttons and toggles. The top bar includes a logo, user profile icon, and notification indicators, while the overall design emphasizes clarity and functionality for managing automated trading strategies.\n\n---\n\n
