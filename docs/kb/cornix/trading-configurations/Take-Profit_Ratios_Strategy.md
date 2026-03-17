# Take-Profit Ratios Strategy

**URL:** https://help.cornix.io/en/articles/5814868-take-profit-ratios-strategy

**Created:** 2026-03-03T11:49:04+00:00

---

Take-Profit Ratios Strategy | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
- Trading Configuration - Take-Profits
- Take-Profit Ratios Strategy
# Take-Profit Ratios Strategy
What are the different types of Take Profit Ratios Strategies that can be used with your Signals Bot?
Written by Hadar Cornix Updated over a year ago
Where to find it:
### Cornix Dashboard > 'My Bots' page > Create/ Edit > Advanced Settings > Take-Profits > Take-Profits Ratios - Personal > Built-in / Custom
*Note: For explanation about the DCA Strategy visit this article.

The take-profit strategy will determine how the amount will be divided between the take-profit targets by default when creating a trade.

The Signals Bots offer the following take-profit strategies:
-
Evenly Divided
This is the default option when you first open this section as can be seen in the top message, so you will not see this option as one of the offered option.
When using this option, the bot will evenly divide the trade amount between the different take-profit targets.
For example, when creating a trade with 4 take-profit targets, the bot will place 25% of the trade amount in each take-profit target.
-
One Target
The bot will place 100% of the amount in the first take-profit target (the other targets will have 0%).
-
Two Targets
The bot will divide the trade amount equally between the first two take-profit targets, so each of the first two targets will contain 50% of the trade amount.
-
Three Targets
The bot will divide the trade amount equally between the first three take-profit targets, so each of the first three targets will contain 33.33% of the trade amount.
-
Fifty On First Target
The bot will place 50% of the trade amount on the first take-profit target, and will divide the other 50% equally among the remaining take-profit targets.
-
Decreasing Exponential
In this strategy, starting from the take-profit target with the lowest price, each target will have half the amount as the previous take-profit target, such that the first target has the largest percentage of the trade amount and the last target has the smallest percentage. The amount percentages will be divided in a way such that their sum will still equal 100%.
For example, when 4 take-profit targets are defined the first take-profit target with the highest price will have 53.333% of the trade amount, the second target will have 26.666% (half the amount of the previous target), the third target will have 13.333% and the last entry target with the highest price will have 6.666% of the trade amount.
-
Increasing Exponential
In this strategy, starting from the take-profit target with the highest price, each target will have twice the amount as the previous take-profit target, such that the first target has the smallest percentage of the trade amount and the last target has the largest percentage. The amount percentages will be divided in a way such that their sum will still equal 100%.
For example, when 4 take-profit targets are defined the first take-profit target with the highest price will have 6.666% of the amount, the second target will have 13.333% (twice the amount of the previous target), the third target will have 26.666% and the last take-profit target with the highest price will have 53.333% of the trade amount.
-
Skip First
The bot will place 0% of the trade on the first take-profit target, and will evenly divide the trade amount between the other take-profit targets.
-
Custom Strategy
You can create your own strategy that will determine the division of the amount between the targets.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"5814868","anonymous_id":"a95baa2b-e7ee-4dda-8cd1-f65da2cdd005"};
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
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n<!-- Image description: The screenshot shows the **Take-Profits** tab of the Cornix trading bot, with a dropdown menu under the "Built-in" option expanded to display take-profit strategies (e.g., "Evenly Divided," "One Target," "Two Targets"). The UI includes tabs for "General," "Entries," "Take-Profits," "Stop," and "Advanced," plus buttons like "Channel" and "Personal" at the top, and a "Moving Take-Profits" toggle (currently "Off") at the bottom. -->
![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1322780563/7f56507769839d85c4228d811c3d/image.png?expires=1772540100&amp;signature=2517ef96c65b94d09b584783b3ba09aea53bf5f4de1f4180caad2c5e28ca537c&amp;req=dSMlFM52nYRZWvMW1HO4zS4ybXGJ7JiEE%2FgWAdo9ZfkEqxrOlgs8nC2yTf1t%0A6yO0mXz1MfvLX%2B20h38%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1322780563/7f56507769839d85c4228d811c3d/image.png?expires=1772540100&amp;signature=2517ef96c65b94d09b584783b3ba09aea53bf5f4de1f4180caad2c5e28ca537c&amp;req=dSMlFM52nYRZWvMW1HO4zS4ybXGJ7JiEE%2FgWAdo9ZfkEqxrOlgs8nC2yTf1t%0A6yO0mXz1MfvLX%2B20h38%3D%0A\n\n**Описание:** The screenshot shows the "Take-Profits" tab of the Cornix trading bot interface, with the "Built-in" sub-tab selected (highlighted in blue). A dropdown menu is open, displaying options like "Evenly Divided," "One Target," and others, while the "Personal" toggle and "Moving Take-Profits" switch (set to "Off") are visible below.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow holding a small yellow object in its beak, positioned above the bold, dark blue text “cornix” with a subtle curved line beneath the bird. The design is clean and minimalistic, emphasizing the brand name and its avian mascot.\n\n---\n\n### Изображение 3\n\n![Image 3](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot displays a Cornix trading bot interface, featuring a clean, structured layout with sections for bot configuration (e.g., trading pairs, strategies, risk settings), real - time performance metrics (profit/loss, win rate), and action buttons (start/stop, backtest). The UI uses a dark theme with clear typography, organized panels, and interactive elements like dropdowns and toggles for easy navigation and bot management.\n\n---\n\n
