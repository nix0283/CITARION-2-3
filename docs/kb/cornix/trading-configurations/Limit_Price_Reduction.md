# Limit Price Reduction

**URL:** https://help.cornix.io/en/articles/5814866-limit-price-reduction

**Created:** 2026-03-03T11:48:48+00:00

---

Limit Price Reduction | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
- All Collections
- Trading Configurations
- Trading Configuration - Stop
- Limit Price Reduction
# Limit Price Reduction
What is it and how to set a limit price reduction % for your limit orders
Written by Dor Updated over 8 months ago

Limit Price Reduction will determine the default percent reduction between the stop price and the limit price.

For example, if the stop price in the trade is 1000 and the stop limit price reduction is defined as 1%, then the limit order will be placed at 990 once the stop price is reached.

In case you are not familiar with the way a stop-limit order works, read our Order Types article.
There are several issues that you should pay attention to when determining the stop and limit price:

* Selecting a stop-limit price reduction percentage that is too small might result in the limit order being skipped in cases of a quick price drop.
In that case, since the difference between the stop price and the limit price is too small it is possible that the exchange will not have time to place the limit order from the moment the stop price is reached and before the price keeps dropping below the limit price. In that case, your stop will not be executed.
This is an issue that has nothing to do with the bot and depends on the exchange itself and is very common in the case of coin dumps.

* On the other hand, selecting a stop-limit price reduction that is too large might make you sell the coins at a price that is significantly lower than the original stop price, for example in the case of coin dumps.
This is an issue because many times when a stop is skipped, the price soon after goes back up and the stop is executed immediately after.

* By default, the bot will define a stop-limit price reduction value of 2%, however, it can be in your favor to increase this value, even more, especially considering that even when there is a big difference between the stop price and limit price the coins will still be sold in a price that is higher than the limit price as long as the price doesn’t fall too much. This in turn will decrease the likelihood of your stop being skipped.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"5814866","anonymous_id":"8413dff2-e012-4438-9048-e9401db43fd3"};
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
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n<!-- Image description: The screenshot shows the **Advanced** tab of the Cornix trading bot’s settings interface, with a top navigation bar (General, Entries, Take-Profits, Stop, Advanced). Key UI elements include toggles (e.g., “Close Trade On TP Before Entry” set to “Channel,” “Alternative USD Pairs” to “On”), input fields (e.g., “Number of Simultaneous Trades,” “Cooldown Between Trades per Symbol,” “Min Symbol Price,” “Min Symbol 24H Volume,” “Max Concurrent Amount” all set to “No Limit”), and a highlighted section for **Stop Type** (with “Limit” selected over “Market”) and “Stop Limit Price Reduction” (set to 2%). Additional options include “Operation hours” (Off/Personal toggle) and “Account Level Configuration” with an “Edit Configuration” link, plus a “Position Mode” dropdown (One-Way Mode). -->
![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1611315969/2891e12035bdf7755acb4d92e3e9/image.png?expires=1772540100&amp;signature=7e2b4bfd28301d3c0b140f415542275efe726726aca82a88488f889fb146fa45&amp;req=dSYmF8p%2FmIhZUPMW1HO4zd02Ixj255Y6V4W1bSDZ1elQuMulRupEli7Br7Wk%0APx0HyFi%2Ffm5Auxa2k0g%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1611315969/2891e12035bdf7755acb4d92e3e9/image.png?expires=1772540100&amp;signature=7e2b4bfd28301d3c0b140f415542275efe726726aca82a88488f889fb146fa45&amp;req=dSYmF8p%2FmIhZUPMW1HO4zd02Ixj255Y6V4W1bSDZ1elQuMulRupEli7Br7Wk%0APx0HyFi%2Ffm5Auxa2k0g%3D%0A\n\n**Описание:** The screenshot shows the "Advanced" tab of the Cornix trading bot interface, featuring a clean, white UI with labeled sections like "Number of Simultaneous Trades," "Cooldown Between Trades per Symbol," and "Stop Type." Key elements include toggle switches (e.g., "Alternative USD Pairs" set to "On"), input fields (e.g., "Stop Limit Price Reduction" with a "2%" value), and a highlighted "Stop Type" section with "Limit" and "Market" options. The bottom includes an "Edit Configuration" link and a "Position Mode" dropdown set to "One-Way Mode."\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue raven (crow) holding a small yellow object in its beak, perched on a curved line above the bold, dark blue text “cornix” (with a small dot beneath the “x”). The design is clean and minimalistic, set against a plain white background, emphasizing the brand’s visual identity.\n\n---\n\n### Изображение 3\n\n![Image 3](https://static.intercomassets.com/avatars/4586445/square_128/Screen_Shot_2022-02-06_at_2.34.28_PM-1644150878.png)\n\n**URL:** https://static.intercomassets.com/avatars/4586445/square_128/Screen_Shot_2022-02-06_at_2.34.28_PM-1644150878.png\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a profile section at the top left featuring a circular user avatar (a photo of a person) and a gray shirt. The main area likely displays trading-related UI elements (e.g., bot settings, charts, or logs), though specific details are not fully visible in the provided crop. The overall layout suggests a clean, user-focused design for managing trading bots.\n\n---\n\n
