# Sell Reached

**URL:** https://help.cornix.io/en/articles/5814891-sell-reached

**Created:** 2026-03-03T11:58:05+00:00

---

Sell Reached | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
1️⃣ At Least One Entry Was Filled Before the Take-Profit2️⃣ No Entry Was Filled Before Take-Profit3️⃣ Trade Closed With "Opposite Direction Opened" - All Collections
- Errors & Notifications
- Order / Trade Statuses
- Sell Reached
# Sell Reached
What the "Sell Reached" status means, when it appears and why
Written by Hadar Cornix Updated over 9 months agoTable of contents
1️⃣ At Least One Entry Was Filled Before the Take-Profit2️⃣ No Entry Was Filled Before Take-Profit3️⃣ Trade Closed With "Opposite Direction Opened"
The "Sell Reached" status appears when entry targets are cancelled because a Take-Profit (sell) was reached before those entries were filled.
This is part of the normal behavior, designed to avoid entering the trade when the sell price have already been reached.

There are three scenarios where this may occur:

## 1️⃣ At Least One Entry Was Filled Before the Take-Profit
If your trade includes multiple entry targets, and at least one entry was filled before a Take-Profit was reached, the remaining unfilled entry targets will be cancelled with the "Sell Reached" status.
This prevents unnecessary entries after the trade has already moved to the selling stage.

## 2️⃣ No Entry Was Filled Before Take-Profit
If no entry was filled before the price reached a Take-Profit, and your bot configuration is set to Close Trade On TP Before Entry, then all unfilled entries will be cancelled with the "Sell Reached" status.
⚙️ You can manage this behavior under:
Edit Signals Bot > Advanced Settings > Close Trade On TP Before Entry > Off/ Channel/ On.

​
*Note: By default, this configuration is enabled on channels, although some channels have it disabled. If you're not sure, set your own desired configuration instead of relaying on the channel's configuration.

## 3️⃣ Trade Closed With "Opposite Direction Opened"
In cases where a trade is closed due to an opposite-direction trade being opened, and the remaining position is sold as part of that closure, this is also considered a "sell order execution".
As a result, all unfilled entries of the original trade will receive the "Sell Reached" cancellation status, since the trade was effectively closed by a sell order.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"5814891","anonymous_id":"ea9355cf-5c14-4f47-a8b8-0ab26f2c69cc"};
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
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n<!-- Image description: The screenshot shows a section of the Cornix trading bot’s settings interface, focusing on trade management options. Key UI elements include a highlighted “Close Trade On TP Before Entry” toggle (set to “On”), adjacent “Off/Channel/On” buttons, and other toggles like “Alternative USD Pairs” (set to “On”) and “Stop Type” (with “Limit” and “Market” options below). The layout features labeled fields (e.g., “Max Concurrent Amount (USD)”) with “No Limit” placeholders, emphasizing configurable trading parameters. -->
![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1567734113/7023c957586b93abd85471643f64/image.png?expires=1772541000&amp;signature=ca38f69fd8d4a28ae91c79e190388034417bd8ac7f27177a61d26f328d466e87&amp;req=dSUhEc59mYBeWvMW1HO4zYX3ubFId%2BIBVNjPyrLu%2BJUjUG2PNYeHUFXgjmlC%0AMnMZNh7AukQYpelnJ%2B0%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1567734113/7023c957586b93abd85471643f64/image.png?expires=1772541000&amp;signature=ca38f69fd8d4a28ae91c79e190388034417bd8ac7f27177a61d26f328d466e87&amp;req=dSUhEc59mYBeWvMW1HO4zYX3ubFId%2BIBVNjPyrLu%2BJUjUG2PNYeHUFXgjmlC%0AMnMZNh7AukQYpelnJ%2B0%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with UI elements including a "Close Trade On TP Before Entry" toggle (set to "On") and adjacent "Off" and "Channel" buttons, alongside other settings like "Max Concurrent Amount (USD)" (set to "No Limit"), "Alternative USD Pairs" (toggle "On"), and "Stop Type" with "Limit" and "Market" options. The interface uses a clean, minimalistic design with blue highlights for active toggles and gray for inactive ones, focusing on trade configuration parameters.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow holding a yellow object in its beak, positioned above the lowercase text “cornix” in a bold, dark blue font. The design is minimalistic, with the crow perched on a subtle curved line that connects to the “x” in “cornix,” emphasizing a clean, professional brand identity.\n\n---\n\n### Изображение 3\n\n![Image 3](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot displays a Cornix trading bot interface with a clean, minimalistic design. Key UI elements include a navigation bar at the top (likely for account, settings, or bot management), a central dashboard area (possibly showing trading metrics or bot status), and a sidebar (for strategy selection, order history, or configuration options). The layout emphasizes clarity, with distinct sections for monitoring and controlling automated trading activities.\n\n---\n\n
