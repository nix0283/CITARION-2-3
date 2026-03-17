# Edit Trade

**URL:** https://help.cornix.io/en/articles/5814935-edit-trade

**Created:** 2026-03-03T11:52:23+00:00

---

Edit Trade | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
Edit orderCancel orderCancel and redistribute orderAdd orderAdd trade amountClose tradeEdit trade configuration- All Collections
- Trading Functionalities
- Mobile App - Trades
- Edit Trade
# Edit Trade
Written by Dor Updated over 2 years agoTable of contents
Edit orderCancel orderCancel and redistribute orderAdd orderAdd trade amountClose tradeEdit trade configuration
The Cornix mobile app allows you to add or remove trade orders and edit existing orders price and amount.

To edit a trade amount or orders, you first need to enter the edit mode. There are multiple ways to enter the edit mode for a trade:

-
Click on the "Edit orders" button when expanding a trade card in the Trades page.
-
Click on the Edit button on the top right corner of the screen while viewing one of the "General", "Timeline" or "Orders" tabs in a trade details page.
Alternatively, you can long press on the order you wish to edit which will open the price and amount edit modal and will also activate the trade edit mode so you can edit other orders.

Once in the orders edit mode, you should be able to see an ellipsis button on the top right corner of each editable order.

** Please note that you will only be able to edit orders that are not fulfilled or cancelled. Orders that are not editable will not show the ellipsis button and long pressing on them will not enter the edit mode.

Once in edit mode, start by clicking on the ellipsis button on the top right corner on the order you wish to edit. The edit menu will look as follows:

# Edit order
Clicking the Edit button will open the order edit modal. In this modal, you will be able to change the order price. For entry orders, you will also be able to edit the amount that will be used for the entry order. For take-profit orders, you will be able to edit the ratio of the order. For stop orders, only the price will be editable, since the stop will always cover 100% of the trade amount.

Please make sure to insert a valid price and amount according to the messages in the modal.

# Cancel order
Clicking the Cancel button will remove the order from the trade without redistribution.

Entry orders - Cancelling entry orders will decrease the total amount allocated for the trade by the order amount. For take-profit orders.

Take-profit orders - Cancelling a take-profit order will decrease the total amount that will be used for the take-profit targets in the trade and might mean that some of the allocated amount to the trade will be left in the exchange account when the trade closes.

Stop orders - Cancelling the stop order will remove the stop order from the trade completely and will leave the trade without any active stop-loss order. Please note that if you have an active trailing stop configuration, the stop order will be reactivated once the next take-profit target is achieved per you trailing stop configuration.

# Cancel and redistribute order
Clicking the Cancel and redistribute button will remove the order from the trade with redistribution to the other orders of the same type. This option is not available for stop orders since we currently only allow one stop order per trade.

Entry orders - Cancelling and redistributing an entry order will cancel the order and remove the entry target from the trade. In this case, instead of removing the order amount from the trade like the previous option, the order amount will now be redistributed among the remaining pending entry orders.

Take-profit orders - Cancelling and redistributing a take-profit order will cancel the order and remove it from the trade. In this case, instead of removing the order percent from the trade like the previous option, the order percent will not be redistributed among the remaining pending take-profit orders.

Move to current price

Selecting this option will move the order price to the current price.

# Add order
To add a new order to the trade, click the "Plus" button next to the order type you wish to add.

Entry orders - Clicking the plus button next to the entry orders will open the Add Entry order modal:

Proceed to select your desired entry order price. Below, select the pair amount to be allocated to the new entry order. Please make sure to insert an amount that is between the minimum and maximum shown in bold at the top of the message.

Take-profit orders - Clicking the plus button next to the take-profit orders will open the Add Take-Profit order modal:

Proceed to select your desired take-profit order price. Below, select the trade amount ratio to be allocated to the new take-profit order. Please make sure to insert a valid ratio between 1% and 100%.

Please note that after adding a new take-profit order, the sum of all the take-profit orders ratios will need to be 100% in order to save the changes. This might mean you will need to reduce the ratio of the other take-profit orders in order to allow for the new order to be created.

Stop orders - Clicking the plus button next to the take-profit orders will open the Add Stop order modal:

Proceed to select your desired stop order price.

Please note that the plus button will only be clickable if the trade does not have an active stop order since Cornix only allows a single stop to be active for any given trade.

# Add trade amount
To add an amount to the trade, click on the ellipsis button on the upper right corner of the trade details page. You will be able to choose between two amount types - New Amount and Existing Amount:

New Amount - Selecting this option will allow you add an amount to the pending entry targets. The amount added will be divided between the pending entry targets according to the amount percentages for each target. For example, if there are three entry targets with the following percentages: 25%, 25% and 50% and the first target of 25% was already filled, then when adding the new amount to the trade the amount will be divided between the two remaining entry targets with percentages of 25% and 50%. Since the second remaining entry target have twice the percentage as the first, then the percentages will be normalized to 100% such that 33.33% of the added amount will be added the the first entry target (that originally had 25%), and the remaining 66.66% of the added amount will be added to the second entry target (that originally had 50%).

Existing Amount - If you have existing coins from the trade's symbol, you will have the option to select an existing amount to use in the trade. The existing amount selected for the trade will be immediately divided between the pending take-profit targets. When adding an existing amount, you will see a new entry order with the newly added amount. The new order will be created with a fulfilled status with the text "Existing Amount" in parenthesis next to it, as shown below:

# Close trade
To close a trade, you can do one of the following:

-
Click on the "Close trade" button when expanding a trade card in the Trades page.
-
Click on the Trash icon on the top right corner of the screen while viewing one of the "General", "Timeline" or "Orders" tabs in the trade details page.
If no entry targets were filled in the trade, the following confirmation message will be displayed:

Click the Confirm button to close the trade and cancel any open orders.

In cases where some of the entry orders were filled (or existing amount was used in the trade) already have some coins available in it, the following message will be displayed:

Cancel Trade and Keep Coins - Selecting this option will close your trade and will leave any amount from the filled entries untouched in your exchange account.

Cancel Trade and Sell Coins At Current Price - Selecting this option will close your trade and will sell all existing trade coins using a market order.

# Edit trade configuration
To edit the trade configuration, you can do one of the following:

-
Click on the "Edit Config." button when expanding a trade card in the Trades page.
-
Click on the Edit icon on the top right corner of the screen while viewing the "Configuration" tab in the trade details page.
You can find more information about the different trade configuration options in the following article: Configuration.

Please Note
When editing a trade that was opened automatically, it will then be considered a 'manually opened' trade, and the auto-trading configuration will no longer apply on the edited trade.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"5814935","anonymous_id":"5cc76f48-ba09-4ba0-b6b3-bbcdaa46cc7f"};
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
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n![Image 1](https://cornix.intercom-attachments-1.com/i/o/434793371/a16d5408072c6d97a8911e84/Screen_Shot_2020-10-13_at_11.42.42_PM.png?expires=1772540100&amp;signature=5310beac5a2f1068c36911604e3bf6e9d96bc6b503f5c00a51de122ad33a5352&amp;req=cCMjEcB9noZeFb4f3HP0gE2bjquDkO%2F16hRzrpxSIFdWf%2FSXXoWQVCOm%2FyRA%0AqjimGOmuT3oZl%2FIWYg%3D%3D%0A)\n\n**URL:** https://cornix.intercom-attachments-1.com/i/o/434793371/a16d5408072c6d97a8911e84/Screen_Shot_2020-10-13_at_11.42.42_PM.png?expires=1772540100&amp;signature=5310beac5a2f1068c36911604e3bf6e9d96bc6b503f5c00a51de122ad33a5352&amp;req=cCMjEcB9noZeFb4f3HP0gE2bjquDkO%2F16hRzrpxSIFdWf%2FSXXoWQVCOm%2FyRA%0AqjimGOmuT3oZl%2FIWYg%3D%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with two pending orders (labeled "2" and "3") displaying percentage (33.1%/33.4%), price ($0.00036/$0.00037), and quantity details. A bottom menu offers options like "Edit," "Cancel," "Cancel & redistribute," and "Move to current price," with each order having action icons (X, dots, checkmark) and a dropdown arrow.\n\n---\n\n### Изображение 2\n\n![Image 2](https://cornix.intercom-attachments-1.com/i/o/434793385/f84f6b2284f10c61e7d69747/edit_entry.png?expires=1772540100&amp;signature=2705165abb19125e3afcb40ba74664da1f109cefcdabe03e493e2fd63948414c&amp;req=cCMjEcB9nolaFb4f3HP0gLQTPcCBpmjn0C74qr8pDFkR5vzfjlZmNDL9V6CW%0AudWlrgXOcxhJjeWH0A%3D%3D%0A)\n\n**URL:** https://cornix.intercom-attachments-1.com/i/o/434793385/f84f6b2284f10c61e7d69747/edit_entry.png?expires=1772540100&amp;signature=2705165abb19125e3afcb40ba74664da1f109cefcdabe03e493e2fd63948414c&amp;req=cCMjEcB9nolaFb4f3HP0gLQTPcCBpmjn0C74qr8pDFkR5vzfjlZmNDL9V6CW%0AudWlrgXOcxhJjeWH0A%3D%3D%0A\n\n**Описание:** The screenshot shows a "Edit Order #3" modal in the Cornix trading bot, with input fields for "Price" (set to 0.000005, with a range note) and "Amount" (set to ₿0.00037, with a range note), plus a blue "Confirm" button. Below the modal, a "Pending" section displays order details: a circular "3" indicator, 33.4%, ₿0.00037, 0.000005, and 74, with action icons (x, dots, checkmark) on the right.\n\n---\n\n### Изображение 3\n\n![Image 3](https://cornix.intercom-attachments-1.com/i/o/434793398/7ea5ea8284bebb8be205b8fd/add_entry.png?expires=1772540100&amp;signature=b19db008eb360af1819f62737f0d48fdbe3cd9d27148488550fef2e27722763d&amp;req=cCMjEcB9nohXFb4f3HP0gPfTr3WDLLl%2FX7o14hdQ52qOItAXezHdSo1h9%2FnL%0A2V1VxLzP8kWc1zB5ZQ%3D%3D%0A)\n\n**URL:** https://cornix.intercom-attachments-1.com/i/o/434793398/7ea5ea8284bebb8be205b8fd/add_entry.png?expires=1772540100&amp;signature=b19db008eb360af1819f62737f0d48fdbe3cd9d27148488550fef2e27722763d&amp;req=cCMjEcB9nohXFb4f3HP0gPfTr3WDLLl%2FX7o14hdQ52qOItAXezHdSo1h9%2FnL%0A2V1VxLzP8kWc1zB5ZQ%3D%3D%0A\n\n**Описание:** The screenshot shows a "Add entry order" modal from the Cornix trading bot, with two input sections: "Price" (displaying 0.00000969 and a range note) and "Amount" (with a Bitcoin symbol and a range note), plus a blue "Confirm" button at the bottom. The UI is clean, with clear labels, input fields, and a prominent action button for order submission.\n\n---\n\n### Изображение 4\n\n![Image 4](https://cornix.intercom-attachments-1.com/i/o/434793409/e7d8f0258c08b2a099513584/add_take_profit.png?expires=1772540100&amp;signature=60c4a838df03840188c75a41ee964e821b0b14df2d851e37f6b6b4d99a59d43d&amp;req=cCMjEcB9mYFWFb4f3HP0gAXSNoA8nY6CeRBRxo7rGVBpJytTsFkmm2RSh%2BI3%0AOYEoF%2FnZ9h78lE8HSw%3D%3D%0A)\n\n**URL:** https://cornix.intercom-attachments-1.com/i/o/434793409/e7d8f0258c08b2a099513584/add_take_profit.png?expires=1772540100&amp;signature=60c4a838df03840188c75a41ee964e821b0b14df2d851e37f6b6b4d99a59d43d&amp;req=cCMjEcB9mYFWFb4f3HP0gAXSNoA8nY6CeRBRxo7rGVBpJytTsFkmm2RSh%2BI3%0AOYEoF%2FnZ9h78lE8HSw%3D%3D%0A\n\n**Описание:** The screenshot shows a modal titled "Add profit order" with two input fields: "Price" (displaying 0.00000969 with a range note) and "Ratio" (set to 50 with a 1–100 range note). A blue "Confirm" button is at the bottom right, all within a clean, minimalistic UI.\n\n---\n\n### Изображение 5\n\n![Image 5](https://cornix.intercom-attachments-1.com/i/o/434793418/8ca7f043f2d851e27aeb5ed9/add_stop.png?expires=1772540100&amp;signature=f9f32c8e7ad8131f7e860f50f23d1cbade960d7bfedeb365c1f134938e2169a1&amp;req=cCMjEcB9mYBXFb4f3HP0gK7AhLIuKBI33Vgh5jblTNeqirVWgMfnyDvN6Mhi%0ABmbu8xMOzpg4wT7e4w%3D%3D%0A)\n\n**URL:** https://cornix.intercom-attachments-1.com/i/o/434793418/8ca7f043f2d851e27aeb5ed9/add_stop.png?expires=1772540100&amp;signature=f9f32c8e7ad8131f7e860f50f23d1cbade960d7bfedeb365c1f134938e2169a1&amp;req=cCMjEcB9mYBXFb4f3HP0gK7AhLIuKBI33Vgh5jblTNeqirVWgMfnyDvN6Mhi%0ABmbu8xMOzpg4wT7e4w%3D%3D%0A\n\n**Описание:** The screenshot shows a "Add stop order" modal with a "Price" input field displaying "0.00000969" and a note stating the price must be between 0.00000097 and 0.0000969. A blue "Confirm" button is positioned at the bottom right of the modal.\n\n---\n\n### Изображение 6\n\n![Image 6](https://cornix.intercom-attachments-1.com/i/o/434793437/b8ffe666322226a86bb53d47/Screen_Shot_2020-10-14_at_3.00.39_AM.png?expires=1772540100&amp;signature=9101e739fe9f81dc9359d31b63c65df67afbd0c4686d2d2d53d70280251c9ddd&amp;req=cCMjEcB9mYJYFb4f3HP0gHu0naXBxQVSIQhbBFZwjt%2BhKzcV6k5mUWoU%2FhX%2F%0AKMGa2PHCIfqddvGDNw%3D%3D%0A)\n\n**URL:** https://cornix.intercom-attachments-1.com/i/o/434793437/b8ffe666322226a86bb53d47/Screen_Shot_2020-10-14_at_3.00.39_AM.png?expires=1772540100&amp;signature=9101e739fe9f81dc9359d31b63c65df67afbd0c4686d2d2d53d70280251c9ddd&amp;req=cCMjEcB9mYJYFb4f3HP0gHu0naXBxQVSIQhbBFZwjt%2BhKzcV6k5mUWoU%2FhX%2F%0AKMGa2PHCIfqddvGDNw%3D%3D%0A\n\n**Описание:** The screenshot shows the "Entry Orders" section of the Cornix trading bot, with a header and a blue "+" button in the top-right. Below, a filter bar includes dropdowns for "Price," "Amount," and "Status," plus a sort icon. A fulfilled order is displayed with details: a 13.1% percentage, ₿0.00016 amount, 0.00000963 value, and "17" count, alongside a green checkmark, "x" delete, and three-dot menu icons.\n\n---\n\n### Изображение 7\n\n![Image 7](https://cornix.intercom-attachments-1.com/i/o/434793444/6bc62050c0d31e657ca2f309/confirm_close_trade.png?expires=1772540100&amp;signature=724bdbbeb4ea7b03c99799fa8de4a7c0f8c36cea9878f05f08fb42005cf1dca1&amp;req=cCMjEcB9mYVbFb4f3HP0gFYgtRl07R03gY7Hhh%2BQ%2BVxz4Ar7mA%2Fi2mEQrRUW%0Ax%2FT49yIPt4d8ttxtCQ%3D%3D%0A)\n\n**URL:** https://cornix.intercom-attachments-1.com/i/o/434793444/6bc62050c0d31e657ca2f309/confirm_close_trade.png?expires=1772540100&amp;signature=724bdbbeb4ea7b03c99799fa8de4a7c0f8c36cea9878f05f08fb42005cf1dca1&amp;req=cCMjEcB9mYVbFb4f3HP0gFYgtRl07R03gY7Hhh%2BQ%2BVxz4Ar7mA%2Fi2mEQrRUW%0Ax%2FT49yIPt4d8ttxtCQ%3D%3D%0A\n\n**Описание:** The screenshot shows a modal dialog from the Cornix trading bot titled "Close Trade" with a confirmation prompt asking, "Are you sure you want to cancel the trade?" At the bottom, there are two buttons: a gray "Cancel" button on the left and a blue "Confirm" button on the right.\n\n---\n\n### Изображение 8\n\n![Image 8](https://cornix.intercom-attachments-1.com/i/o/434793455/be0aef6b9f8e1cd246592bb8/confirm_close_trade_2.png?expires=1772540100&amp;signature=045cb47ccbfcd25b13c239cd4a7d0f18223c3de9b73afcc9ac02d93b27a945cc&amp;req=cCMjEcB9mYRaFb4f3HP0gJxoo3IK7hgT5c%2FJEsGOEm1cGYkAq6yMgjdSInWk%0A0KoEyC4EX%2FI2Ii7Bgw%3D%3D%0A)\n\n**URL:** https://cornix.intercom-attachments-1.com/i/o/434793455/be0aef6b9f8e1cd246592bb8/confirm_close_trade_2.png?expires=1772540100&amp;signature=045cb47ccbfcd25b13c239cd4a7d0f18223c3de9b73afcc9ac02d93b27a945cc&amp;req=cCMjEcB9mYRaFb4f3HP0gJxoo3IK7hgT5c%2FJEsGOEm1cGYkAq6yMgjdSInWk%0A0KoEyC4EX%2FI2Ii7Bgw%3D%3D%0A\n\n**Описание:** The screenshot shows a "Close Trade" modal dialog from the Cornix trading bot, prompting the user to choose an action for existing coins. It features two radio button options—"Keep coins" (selected) and "Sell at current price"—along with "Cancel" (gray) and "Confirm" (blue) buttons at the bottom.\n\n---\n\n### Изображение 9\n\n![Image 9](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow holding a small yellow object (likely a coin) in its beak, positioned above the lowercase text “cornix” in a bold, dark blue font. The design is clean and minimalistic, with the crow perched on a subtle curved line that integrates with the lettering, emphasizing the brand’s visual identity.\n\n---\n\n### Изображение 10\n\n![Image 10](https://static.intercomassets.com/avatars/4586445/square_128/Screen_Shot_2022-02-06_at_2.34.28_PM-1644150878.png)\n\n**URL:** https://static.intercomassets.com/avatars/4586445/square_128/Screen_Shot_2022-02-06_at_2.34.28_PM-1644150878.png\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a profile picture (a person in a gray shirt) at the top left, likely for user identification. The UI appears minimal, focusing on core trading elements, though specific controls or charts aren’t visible in the provided snippet.\n\n---\n\n
