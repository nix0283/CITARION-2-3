# Marketplace Stats FAQs

**URL:** https://help.cornix.io/en/articles/11563121-marketplace-stats-faqs

**Created:** 2026-03-03T11:50:47+00:00

---

Marketplace Stats FAQs | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
1. Why does my PNL change from one day to another?2. Why are there fewer trades in my stats than the number of signals I post on my channel?3. How often are the statistics and backtesting results updated?4. Why the PNL of my channel on the Marketplace is significantly different than my signal's results on the channel? 5. Are the PNL results based on closed trades only, or both open and closed trades? 6. From which exchange are the backtesting results taken?7. Which entry strategy is used for the "Entries" shown in my channel’s Marketplace statistics?8. What is the time range used for calculating the statistics and score?- All Collections
- Marketplace
- Marketplace Stats FAQs
# Marketplace Stats FAQs
Common questions and answers about your channel's statistics on the Cornix Marketplace
Written by Hadar Cornix Updated over 9 months agoTable of contents
1. Why does my PNL change from one day to another?2. Why are there fewer trades in my stats than the number of signals I post on my channel?3. How often are the statistics and backtesting results updated?4. Why the PNL of my channel on the Marketplace is significantly different than my signal's results on the channel? 5. Are the PNL results based on closed trades only, or both open and closed trades? 6. From which exchange are the backtesting results taken?7. Which entry strategy is used for the "Entries" shown in my channel’s Marketplace statistics?8. What is the time range used for calculating the statistics and score?
We know that as a channel admin, you highly care about how your channel's performance is represented on the Marketplace. This article answers some of the most frequently asked questions about the channel's stats displayed on your channel's page.

Let's dive in...

## 1. Why does my PNL change from one day to another?
Marketplace statistics are generated based on daily backtesting runs covering the past 1, 3, and 6 months. Since the specific signals and trades included in the backtesting range can change each day (as older trades expire and new ones are added), fluctuations in the PNL results are expected, sometimes small, sometimes more noticeable.
This behavior is normal and keeps the results only relevant for the tested timeframe.

Read more about how the Marketplace statistics are calculated here:
🔗 https://help.cornix.io/en/articles/9731166-marketplace-group-statistics


## 2. Why are there fewer trades in my stats than the number of signals I post on my channel?
Even if you post many signals, not all of them are executed in the backtesting runs. This is because backtesting is simulated using a $10,000 portfolio, which represents limited available funds.
Once all funds are used, whether by being locked in open positions or lost in liquidated trades, the system won’t open new trades until more funds become available. This can lead to fewer trades being reflected in your stats compared to the number of signals posted on your channel.



## 3. How often are the statistics and backtesting results updated?
The backtesting results and channel statistics on the Marketplace are refreshed once every 24 hours.
Please note that the update time may vary, there is no fixed hour for the refresh.


## 4. Why the PNL of my channel on the Marketplace is significantly different than my signal's results on the channel?
It’s important to understand that signal results are not the same as trade results. Signal results are theoretical and do not represent actual order execution on the exchange. On the other hand, trade results, like the ones shown in Marketplace backtesting, are calculated based on real trading logic that considers market conditions, exchange order book, and user configurations.

Here are some more reasons for differences between signal results and Marketplace Backtesting PNL:
-
Entry zone -
On signals, a target is considered fulfilled as soon as the price enters the entry zone. On trades (including backtesting), an entry strategy is applied, and not all orders may be filled within the zone.
➡️ This means the average entry price is often different between signal results and trades.
​
-
Trailing configurations -
Trailing configurations are applied only to trades, not signals. Even if you add trailing to your signal, it only affects the trades created from it.
➡️ As a result, trailing orders (Entry, Take-profits or Stop-loss movements) are not included in the signal’s theoretical PNL.

## 5. Are the PNL results based on closed trades only, or both open and closed trades?
The PNL displayed on the Marketplace is calculated based on both open and closed trades, as they appear at the time of the closing the backtesting run (which is performed once every 24 hours).
This means that even trades that are still open can influence the current PNL, based on their unrealized profit or loss at the time the data was last updated.


## 6. From which exchange are the backtesting results taken?
Currently, the backtesting results are based on the exchange that the channel posts the most signals for. For example:
-
If most of the signals on the channel are for Binance Spot, then the backtesting and Marketplace statistics will reflect results from Binance Spot, even if the channel posts Futures signals as well.
-
Similarly, if the majority of signals are for OKX Futures, that exchange will be used as the main exchange for the backtesting runs.
Note: In the future, admins will be able to switch between Spot and Futures results for greater flexibility and accuracy.


## 7. Which entry strategy is used for the "Entries" shown in my channel’s Marketplace statistics?
The entry strategy used in the statistics is based on how the signal was ultimately published (after parsing).
For signals that include an entry zone, the default strategy is 4 targets, unless the channel has a custom entry strategy configured. In that case, we’ll use the custom strategy.

Note: Each signal is backtested using the strategy that was active at the time the signal was posted. Updating your strategy in the settings will only affect new signals moving forward. Previously posted signals will retain their original configuration.
​


## 8. What is the time range used for calculating the statistics and score?
Unless stated otherwise, all statistics shown on the Marketplace, including the channel score, PnL, number of trades etc. are based on data from the last 6 months.
​
For some specific parameters, a different timeframe is used and is mentioned next to the metric. For example, 'Number of signals per exchange' is based on the last 1 month.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"11563121","anonymous_id":"604253e3-39f8-451b-aac5-4117a0d0bab2"};
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
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n<!-- Image description: The screenshot displays a **PnL Status** section of the Cornix trading bot, featuring a circular progress chart and trade statistics. The chart uses color-coded segments (black for winning, blue for losing, purple for neutral) alongside text showing: 676 winning trades (76.73%, green), 146 losing trades (16.57%, red), and 59 neutral trades (6.7%, yellow). A small info icon (ⓘ) is present next to "PnL Status" for additional details. -->
<!-- Image description: The screenshot shows a Cornix trading bot interface with two tabs: "Entries" (selected, blue underline) and "Take-Profits" (unselected). Below the tabs, three entries (Entry 1, Entry 2, Entry 3) display green progress bars with completion percentages (99%, 75%, 45%), and a downward arrow suggests more entries can be expanded. The UI is clean, focusing on progress tracking for trading entries. -->
![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1567821549/7dd94e6ea3b950e16aac16d26cbe/image.png?expires=1772540100&amp;signature=fda2cf3b70cee5031ea991372f508ad565bb3671d70aa2a1a9120ea1cf949a27&amp;req=dSUhEcF8nIRbUPMW1HO4za1WAL8Q6A1Kn9C4fSCxaOfOUpel1J0bCP2xogyM%0AtjlTIPvSzB1pe2Ey%2BhM%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1567821549/7dd94e6ea3b950e16aac16d26cbe/image.png?expires=1772540100&amp;signature=fda2cf3b70cee5031ea991372f508ad565bb3671d70aa2a1a9120ea1cf949a27&amp;req=dSUhEcF8nIRbUPMW1HO4za1WAL8Q6A1Kn9C4fSCxaOfOUpel1J0bCP2xogyM%0AtjlTIPvSzB1pe2Ey%2BhM%3D%0A\n\n**Описание:** The screenshot displays a **PnL Status** section with a circular progress chart and three trade outcome categories. It shows "Winning: 676 Trades (76.73%)" in green, "Losing: 146 Trades (16.57%)" in red, and "Neutral: 59 Trades (6.7%)" in yellow, alongside a partially filled circular gauge (blue/purple segments) visualizing the distribution.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1567897409/4b830cdc4a82e202b20ffa387640/image.png?expires=1772540100&amp;signature=1c3105709175e1db7e9fe204e9d6290ef074138bc8942b61e8b6f73bc0548d06&amp;req=dSUhEcF3moVfUPMW1HO4zRWPt8qkwTIboeordXvUtLgprKkLpWVPdbF93arZ%0A5cULPgPlEZoqC24v6Co%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1567897409/4b830cdc4a82e202b20ffa387640/image.png?expires=1772540100&amp;signature=1c3105709175e1db7e9fe204e9d6290ef074138bc8942b61e8b6f73bc0548d06&amp;req=dSUhEcF3moVfUPMW1HO4zRWPt8qkwTIboeordXvUtLgprKkLpWVPdbF93arZ%0A5cULPgPlEZoqC24v6Co%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with two tabs at the top: "Entries" (selected, indicated by a blue underline) and "Take-Profits." Below, three entries are listed, each with a green progress bar and percentage: Entry 1 (99%), Entry 2 (75%), and Entry 3 (45%). A downward arrow at the bottom suggests additional entries can be expanded.\n\n---\n\n### Изображение 3\n\n![Image 3](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue bird (likely a crow or raven) holding a small yellow object in its beak, perched on a curved line above the bold, dark blue text “cornix” (with the “x” stylized to include a small dot). The design is minimalistic, with a white background emphasizing the logo’s clean, professional branding.\n\n---\n\n### Изображение 4\n\n![Image 4](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot displays a Cornix trading bot interface with a clean, structured layout. Key UI elements include a navigation bar (likely for bot management, settings, or account access), a central dashboard area (possibly showing trading metrics or bot status), and a sidebar (for additional tools or configuration options). The design emphasizes clarity, with distinct sections for monitoring and controlling trading activities.\n\n---\n\n
