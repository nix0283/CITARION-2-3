# Order Closed Statuses

**URL:** https://help.cornix.io/en/articles/5814915-order-closed-statuses

**Created:** 2026-03-03T12:00:46+00:00

---

Order Closed Statuses | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
Status: MergedStatus: Price is Below Stop PriceStatus: Sell ReachedStatus: Stop ReachedStatus: RedistributedStatus: Trade ClosedStatus: Manually CancelledStatus: Funds used ManuallyStatus: Opposite Direction OpenedStatus: Hedge Mode Not SupportedStatus: Position DecreasedStatus: Position ClosedStatus: Existing QuantityStatus: Waiting for EntriesStatus: Not Enough Funds InvestedStatus: Max Allowed Size exceededStatus: Spam Small AmountStatus: Risk Limit ExceededStatus: Invalid PriceStatus: Position LiquidatedStatus: Allowed Num Exchange Stops ExceededStatus: Normal Exchange CloseStatus: Cancelled by Channel- All Collections
- Errors & Notifications
- Order / Trade Statuses
- Order Closed Statuses
# Order Closed Statuses
Written by Dor Updated over 2 months agoTable of contents
Status: MergedStatus: Price is Below Stop PriceStatus: Sell ReachedStatus: Stop ReachedStatus: RedistributedStatus: Trade ClosedStatus: Manually CancelledStatus: Funds used ManuallyStatus: Opposite Direction OpenedStatus: Hedge Mode Not SupportedStatus: Position DecreasedStatus: Position ClosedStatus: Existing QuantityStatus: Waiting for EntriesStatus: Not Enough Funds InvestedStatus: Max Allowed Size exceededStatus: Spam Small AmountStatus: Risk Limit ExceededStatus: Invalid PriceStatus: Position LiquidatedStatus: Allowed Num Exchange Stops ExceededStatus: Normal Exchange CloseStatus: Cancelled by Channel
# Status: Merged
This status means that a previous trailing order was still active when the next target was reached. When this happens, Cornix merges the two orders instead of creating a new trailing order by merging the amount of the new target that is reached into the trailing order that is already active.

For a simple animation that demonstrated how this works in practice, please watch our Youtube tutorials. The links below include the exact point of the video where the merge behavior is explained.

For Entry targets: https://youtu.be/bYXEykrKHVg?list=PLiTVm0oxEYOE7zv-cod99vsmFVfSk9WKc&t=136

For Take-Profit targets: https://youtu.be/kkYbyJKVCmE?list=PLiTVm0oxEYOE7zv-cod99vsmFVfSk9WKc&t=128

# Status: Price is Below Stop Price
This status only applies to Entry orders and will happen when the price of the order is below the stop price due to a change in the entry order price or the stop price. For short positions, this status will occur when the price of the order is above the stop price. The following is an example for a long trade where an entry can be cancelled with this status:

In this example, the first 2 entry targets were filled and then the first take-profit target was reached. When that happened, the stop moved to the breakeven price (0.00000865) which was higher than the price of the 3rd entry target. In that case, the 3rd entry target was cancelled with the status Price is Below Stop Price.

# Status: Sell Reached
Entry targets might get cancelled with this status when a Take-Profit is reached before the Entry target was filled. This can happen for two statuss:

1. The trade has more than one Entry targets, and at least one other Entry target was filled before the Take-Profit was reached. In this case, all the remaining Entry orders that are not filled yet will always be cancelled with the status Sell Reached.

2. No Entry target was filled before the first Take-Profit was reached. In this case, all the pending Entry targets will be cancelled with the Sell Reached status ONLY if the trade's configuration is set to close the trade when a Take-Profit is reached before any Entry is filled. For more information about this trade configuration, please see this article.

# Status: Stop Reached
When the trade's Stop target is reached, any pending Take-Profit target will be cancelled with the Stop Reached status.

# Status: Redistributed
This means you cancelled the order and redistributed the corresponding order amount to other orders of the same type in the trade.

# Status: Trade Closed
When a trade is closed while some targets are still pending, all the pending targets will be cancelled with the Trade Closed status. A couple of examples where this might happen are:

1. A trade was manually cancelled. In this case, all the pending targets will be cancelled with the Trade Closed status.

2. A trade was completed because the Stop target was reached, in the case of a regular trade (and not a breakout trade). In this case, any remaining Entry target will be cancelled with the Trade Closed status.

Please note that for a breakout trade, if the stop is reached the pending Entry targets will be cancelled with the Sell Reached status.

# Status: Manually Cancelled
This status means that you either manually cancelled a specific order, or you manually cancelled the trade in which the order was included. This will also be the case when cancelling an order directly in the exchange.

# Status: Funds used Manually
This means that you had sufficient funds for this order when you opened this trade, but now you do not. This usually happens when you use the funds allocated for this order not through Cornix, for example when directly opening a different order for the same symbol directly in the exchange.

# Status: Opposite Direction Opened
If your account position mode is set to "One-Way Mode" (instead of "Hedge Mode"), Cornix will not open concurrent long and short positions on the same symbol. If you open a long position, all existing short positions will be closed with this status, and vice versa for short trades.
*To avoid trades getting closed for this reason, set your position mode to "Hedge Mode".

# Status: Hedge Mode Not Supported
If a trade is cancelled with this status, make sure to disable Hedge Mode in your exchange account, to continue trading in the exchange using Cornix.

# Status: Position Decreased
Margin exchanges usually have a reduce-only instruction which allows us to open orders which can only exit an existing position but not open a new one.

An order might be closed with this status when the position size decreased, either because the amount was used manually or the position was liquidated.

# Status: Position Closed
Margin exchanges usually have a reduce-only instruction which allows us to open orders which can only exit an existing position but not open a new one.

An order might be closed with this status when the position size decreased, either because the amount was used manually or the position was liquidated.

# Status: Existing Quantity
Entry orders will be tagged with this status when an existing quantity was added when creating (or editing) the trade. The existing quantity represents the asset quantity that was used in the trade to include funds that already existed in the account before the trade was created. For example, when creating a trade on BTC/USDT, the BTC quantity that was used when creating the trade will be tagged

# Status: Waiting for Entries
Take-Profit orders will be cancelled with this status when the order amount is lower than the minimum that's allowed in the exchange. The amount that was allocated to orders without enough funds will be redistributed to the other valid pending take-profit orders. For example, if the minimum order size that's allowed in the exchange is 0.0001 BTC so any order with a smaller amount will be cancelled with this status and be redistributed.

Please note that Cornix will only tag orders with this status when none of the take-profit orders were filled. This happens because before the first Take-Profit is reached the trade might be updated such that the order amount is increase and becomes valid. Once the first take-profit target is reached the invalid orders will be cancelled with the "Not Enough Funds Invested" status (add link).

For example, before a take-profit order is reached a trade might be updated when additional Entry orders are filled (which will increase the amount that can be allocated to pending Take-Profit targets) or the trade amount is increased. When a Take-Profit target is reached the amount that's allocated for each Take-Profit target can no longer change, and therefore it is guaranteed that the invalid Take-Profits will stay invalid, so at that point they are cancelled with the Not Enough Funds Invested status.

# Status: Not Enough Funds Invested
Take-Profit orders will be cancelled with this status when the order amount is lower than the minimum that's allowed in the exchange. The amount that was allocated to orders without enough funds will be redistributed to the other valid pending take-profit orders. For example, if the minimum order size that's allowed in the exchange is 0.0001 BTC so any order with a smaller amount will be cancelled with this status and be redistributed.

Please note that Cornix will only cancel Take-Profit orders with this status when at least one Take-Profit target is reached. This happens because before the first Take-Profit is reached the trade might be updated such that the order amount is increased and becomes valid. Until then, the invalid take-profit orders will be tagged with the "Waiting for Entries" status (add link).

For example, before a take-profit order is reached a trade might be updated when additional Entry orders are filled (which will increase the amount that can be allocated to pending Take-Profit targets) or the trade amount is increased. When a Take-Profit target is reached the amount that's allocated for each Take-Profit target can no longer change, and therefore it is guaranteed that the invalid Take-Profits will stay invalid, so at that point they are cancelled with the Not Enough Funds Invested status.

# Status: Max Allowed Size exceeded
Binance futures currently has a different limitation on the position size for each symbol and leverage. An order might be closed with this status when the order amount is larger than this maximum threshold for the symbol with the selected leverage.

Please note that in some cases the cancelled order might have a valid position size but still be cancelled when the accumulated symbol position surpasses the maximum size that is allowed in the exchange.
For example, if a position size limitation is 50K and we already have 45K of a position in the exchange, opening 10K order will be invalid as it's cross the overall amount allowed for that symbol as 45K + 10K > 50K.

# Status: Spam Small Amount
This issue comes up in BitMEX when too many orders are created with an amount smaller than 0.0025 XBT. To avoid this issue, either increase the size of the order to surpass the threshold or decrease the amount of small orders created.
For more information about this error message in BitMEX please visit the following link: bitmex.com/notice-regarding-spam-orders

# Status: Risk Limit Exceeded
Each exchange protects your account from large liquidations under different conditions. This happens when you have a margin position that is bigger than the allowed that's defined in the exchange account. To handle this error, you will need to decrease the position size or change the threshold directly from your exchange account.
You can read about risk limit in BitMEX here: https://www.bitmex.com/app/riskLimits

# Status: Invalid Price
An order might be cancelled with this status when the order price in invalid and was rejected when trying to create the order in the exchange. This usually happens when the order price is not between the minimum and maximum price that's allowed in the exchange.

# Status: Position Liquidated
An order might be cancelled with this status when the position has been liquidated in the exchange. Please note that you can see the trade liquidation price in the trade details page in both the Telegram Bot and Mobile App.

# Status: Allowed Num Exchange Stops Exceeded
Each exchange allows a different number conditional order per symbol. In cornix, we use conditional orders in the following cases:

1. Stop-loss orders.

2. Active trailing Entry and trailing Take-Profit orders.

3. Breakout trade entry orders.

# Status: Normal Exchange Close
This status only applies to Binance and happens when the order is cancelled by the exchange. This might happen for several statuss, the most common of which is that the position was liquidated or the symbol is no longer supported in Binance.

# Status: Cancelled by Channel
An order might be cancelled with this status when the order was included in a trade that was created with auto-trading based on a signal that was cancelled by the channel.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"5814915","anonymous_id":"49cb27f5-5089-4103-9eaf-6b1dedcb3b94"};
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
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n<!-- Image description: The screenshot displays a Cornix trading bot interface for an ADA/BTC long trade on Binance. Key UI elements include the pair (ADA/BTC), exchange (Binance), trade type (Regular Long), and sections for Entry Orders (with 2 green-checked orders and 1 red "X" for a failed order), Take-Profit Orders (1 green-checked), Stop-Loss Orders (1), and Trailing Configuration (Entry: Percentage 1.0%, Stop: Breakeven, Trigger: Target 1). The bottom right shows an "edited 1:17 AM" timestamp. -->
![Image 1](https://cornix.intercom-attachments-1.com/i/o/434794183/0d48c3aeb5812799a8da5e55/Screen_Shot_2020-12-21_at_1.22.45_AM.png?expires=1772541000&amp;signature=2c347e03166001e0af3b951659b6e6d7601bc599c63a7e7cb63c6c52f77459c5&amp;req=cCMjEcB6nIlcFb4f3HP0gH84%2Baii1GSqvOv%2B4SyjJ98sQr3Oh57KbtW9YVti%0AnHliEKKya7ZnpM4o7A%3D%3D%0A)\n\n**URL:** https://cornix.intercom-attachments-1.com/i/o/434794183/0d48c3aeb5812799a8da5e55/Screen_Shot_2020-12-21_at_1.22.45_AM.png?expires=1772541000&amp;signature=2c347e03166001e0af3b951659b6e6d7601bc599c63a7e7cb63c6c52f77459c5&amp;req=cCMjEcB6nIlcFb4f3HP0gH84%2Baii1GSqvOv%2B4SyjJ98sQr3Oh57KbtW9YVti%0AnHliEKKya7ZnpM4o7A%3D%3D%0A\n\n**Описание:** The screenshot displays a Cornix trading bot interface for an ADA/BTC trade on Binance, showing a "Regular (Long)" trade type. The UI lists Entry Orders (with two green checkmarks and one red X for a price below stop), Take-Profit Orders (one green checkmark, one pending), and a Stop-loss Order (100% allocation), plus Trailing Configuration details. The bottom right shows an "edited 1:17 AM" timestamp.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow holding a small yellow object (likely a coin) in its beak, perched on a curved line above the bold, dark blue text “cornix” (with the “c” stylized to integrate with the crow’s perch). The design is minimalistic, using a white background to emphasize the logo’s clean, professional aesthetic.\n\n---\n\n### Изображение 3\n\n![Image 3](https://static.intercomassets.com/avatars/4586445/square_128/Screen_Shot_2022-02-06_at_2.34.28_PM-1644150878.png)\n\n**URL:** https://static.intercomassets.com/avatars/4586445/square_128/Screen_Shot_2022-02-06_at_2.34.28_PM-1644150878.png\n\n**Описание:** The screenshot displays a Cornix trading bot interface, likely showing a user profile section with a circular profile photo (a person in a gray shirt against a tree/rock background) and associated UI elements for account or bot configuration. The layout suggests a clean, minimalistic design focused on user interaction with the trading bot’s features.\n\n---\n\n
