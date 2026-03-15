# Advanced Grid Bot Settings

**URL:** https://help.cornix.io/en/articles/8238208-advanced-grid-bot-settings

**Created:** 2026-03-03T11:46:23+00:00

---

Advanced Grid Bot Settings | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
Grid Type:Grids Tab:Stop Tab:Stop-Loss Distance PercentStop-Loss BaselineStop-Loss Timeout- All Collections
- Trading Bots
- Grid
- Advanced Grid Bot Settings
# Advanced Grid Bot Settings
Learn in detail about the different Grid Bot Settings and how to use them
Written by Hadar Cornix Updated over 3 months agoTable of contents
Grid Type:Grids Tab:Stop Tab:Stop-Loss Distance PercentStop-Loss BaselineStop-Loss Timeout
### Enabling Advanced Grid Settings
For advanced users who want to configure more complex strategies, click the “Advanced Settings” button.
This will add the “Grid Type” option and reveal the “Grids” and “Stop” tabs.
To exit advanced mode and return to the default configuration, click “Basic Settings”.


# Grid Type:
The Grid Type determines how the distance between grids is calculated. You can choose between the following options:

-
Arithmetic
Uses a fixed price difference between grids, with all grids spaced evenly by the same price amount.
This is the default option if no other grid type is selected.
-
Geometric
Uses a fixed percentage difference between grids.
Each grid is spaced according to a fixed price ratio.
-
Custom
Allows you to manually define how grids are spaced.
When selecting this option, you’ll be redirected to the Grids tab to configure the parameters yourself.

# Grids Tab:
In this tab, you define how grids are spaced and how the amounts are allocated per grid, as well as how many orders can be placed simultaneously on the exchange.

When using Arithmetic or Geometric grid types, the following parameters are available:
-
## Price Difference
Defines the percentage difference between the first grid and the second grid.
The second grid is placed at the first grid price minus the defined percentage.
Example:
First Grid Price = 100
Price Difference = 1%
The first three grids will be placed at:
-
100
-
99 (100 − 100×1%)
-
98.01 (99 − 99×1%)
-
## Amount Scale
Determines the multiplier between the amount invested in each successive grid.
This sets the ratio of capital allocation across grids.

-
## Number of Active Orders
Defines the maximum number of active entry orders the bot is allowed to place simultaneously on the exchange.
When selecting the Custom grid type, two additional parameters are revealed:
-
## Baseline (for Price Scale)
Defines the reference grid used to calculate the Price Scale.
You can choose between:
-
First Grid
-
Previous Grid

-
## Price Scale
Defines the multiplier applied to the price difference starting from the second grid onward. Example:
First Grid Price = 100
Price Difference = 1%
Price Scale = 2
The first three grids will be placed at:
-
100
-
99 (100 − 100×1%)
-
97.02 (99 − 99×1%×2)
These additional parameters allow you to fully control how the distance between grids is calculated.

# Stop Tab:
To add a stop-loss to your Grid Bot, enable the “Stop” toggle.
## Stop-Loss Distance Percent
The bot will place a stop-loss sell limit order at a percentage distance from the selected stop-loss baseline.

## Stop-Loss Baseline
Defines the reference price for the stop-loss calculation.
The available options are First Grid, Last Grid, or Average Entries.

## Stop-Loss Timeout
Allows you to delay the execution of a stop-loss order for a defined period.
This can be useful if you expect short-term price fluctuations and want to avoid closing a position immediately when the stop-loss price is reached.
Read more about Stop Loss Timeout.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"8238208","anonymous_id":"5bf41557-9747-4570-a0b9-27fbdba63af3"};
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
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1896755029/ffd129ad1fd51939791d89fe005c/image.png?expires=1772540100&amp;signature=8bfc49dffc08b936204776d898b48e2c2c20e0b7fdd32041e9194af4a8b78bb0&amp;req=dSguEM57mIFdUPMW1HO4zZ6iu4go4HYK9FWVNUbbpJVFNrbko7dqANG8ya7n%0AmRR%2B19c4rGh%2FVk1J%2Fmk%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1896755029/ffd129ad1fd51939791d89fe005c/image.png?expires=1772540100&amp;signature=8bfc49dffc08b936204776d898b48e2c2c20e0b7fdd32041e9194af4a8b78bb0&amp;req=dSguEM57mIFdUPMW1HO4zZ6iu4go4HYK9FWVNUbbpJVFNrbko7dqANG8ya7n%0AmRR%2B19c4rGh%2FVk1J%2Fmk%3D%0A\n\n**Описание:** The screenshot displays a Cornix trading bot interface with a white background. At the top, three labeled sections show "Available Balance" (41.45 USDT), "Bot Amount Value" (30 USD, 72.37%), and "Bot Initial Amount" (0 USD). Below, two buttons are visible: a light blue "Advanced Settings" button (with a menu icon) and a blue "Create Bot" button, with a dark blue arrow pointing to the "Advanced Settings" button.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1896756611/6874f20985f219db923df0348aa7/image.png?expires=1772540100&amp;signature=852f515efe1e4d9c0706af3982ee56959779fa0b1da92e99610ee89d6001d929&amp;req=dSguEM57m4deWPMW1HO4zUQcmZL0sG8%2BNuzs37inb11fTgitV2qkjAWXUvPF%0AAorfeOCxHik%2F93kq4Ts%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1896756611/6874f20985f219db923df0348aa7/image.png?expires=1772540100&amp;signature=852f515efe1e4d9c0706af3982ee56959779fa0b1da92e99610ee89d6001d929&amp;req=dSguEM57m4deWPMW1HO4zUQcmZL0sG8%2BNuzs37inb11fTgitV2qkjAWXUvPF%0AAorfeOCxHik%2F93kq4Ts%3D%0A\n\n**Описание:** The screenshot shows the **General** tab of a Cornix trading bot interface, with tabs for *Grids*, *Stop*, and *Advanced* at the top. Key UI elements include a bot name field ("BTC/USDT Grid Bot #2"), account selection ("My Binance Futures"), symbol dropdown ("BTC/USDT"), price range inputs (63492.26–90703.24), a "Grids" field (set to 5), a "Grid Type" dropdown (set to "Arithmetic"), and an "Amount Per Trade" section (30 USD, "Fixed Usd Amount"). Arrows highlight the "Grids" field and "Grid Type" dropdown.\n\n---\n\n### Изображение 3\n\n![Image 3](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1896760344/43c464867d16b19ee4a42b08c41b/image.png?expires=1772540100&amp;signature=3079355e86003c9e68a0cd2a91a3d2653eb4a7cf0d65e8d767c00f2d85c5f983&amp;req=dSguEM54nYJbXfMW1HO4zXy9JM13RKKFCv8Tr6DtmshUBU6f0nkrSgX7yM44%0Asls3BFSWgsEwfqpyU7w%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1896760344/43c464867d16b19ee4a42b08c41b/image.png?expires=1772540100&amp;signature=3079355e86003c9e68a0cd2a91a3d2653eb4a7cf0d65e8d767c00f2d85c5f983&amp;req=dSguEM54nYJbXfMW1HO4zXy9JM13RKKFCv8Tr6DtmshUBU6f0nkrSgX7yM44%0Asls3BFSWgsEwfqpyU7w%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a "Grids" section containing a numeric input field (set to "5") and a range input (3-50). A "Grid Type" dropdown is open, displaying three options: "Arithmetic" (selected), "Geometric", and "Custom". Below, an "Amount Per Trade" section includes a numeric input (30), a "USD" label, and a "Fix" toggle.\n\n---\n\n### Изображение 4\n\n![Image 4](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1896776354/4d860211955840a471c9f16c83b0/image.png?expires=1772540100&amp;signature=59efd499ba388c9672a5a68d8580fbe510cc27d50b54df9d05c53a033e94c2ae&amp;req=dSguEM55m4JaXfMW1HO4zflYON4OoU1alAkbYT7yeUAyTUXJydEf5gXvFuvi%0Aq1xqqs5YluKcRNfyn40%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1896776354/4d860211955840a471c9f16c83b0/image.png?expires=1772540100&amp;signature=59efd499ba388c9672a5a68d8580fbe510cc27d50b54df9d05c53a033e94c2ae&amp;req=dSguEM55m4JaXfMW1HO4zflYON4OoU1alAkbYT7yeUAyTUXJydEf5gXvFuvi%0Aq1xqqs5YluKcRNfyn40%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a tabbed navigation bar (General, **Grids** (selected), Stop, Advanced) at the top. Below, it displays a "Price Range (22.1%)" section with input fields for a range (70652.92 – 90703.24), a "Grids" field set to 5, and a "Grid Type" dropdown (Arithmetic) with a 3-50 range.\n\n---\n\n### Изображение 5\n\n![Image 5](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1896777027/01cbc4a2368443f1fc3915541690/image.png?expires=1772540100&amp;signature=ec3acfb916769ac73f81d57b1ad7af064d8d7b017d939e62b59bfebff1123452&amp;req=dSguEM55moFdXvMW1HO4zTiZKTvWX6G8zZS11yMCJx1LqLIJ1bNPKvLMv6jt%0AvPzIQoCath7NsL2eM5o%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1896777027/01cbc4a2368443f1fc3915541690/image.png?expires=1772540100&amp;signature=ec3acfb916769ac73f81d57b1ad7af064d8d7b017d939e62b59bfebff1123452&amp;req=dSguEM55moFdXvMW1HO4zTiZKTvWX6G8zZS11yMCJx1LqLIJ1bNPKvLMv6jt%0AvPzIQoCath7NsL2eM5o%3D%0A\n\n**Описание:** The screenshot shows the **"Stop" tab** (highlighted in blue) of the Cornix trading bot interface, with a toggle switch for "Stop" turned on. Below, there are input fields for "Stop-Loss Distance Percent" (set to 5%), a dropdown for "Stop-Loss Baseline" (set to "Last Grid"), and a toggle for "Stop-Loss Timeout" (turned off). The top navigation includes "General," "Grids," "Stop," and "Advanced" tabs.\n\n---\n\n### Изображение 6\n\n![Image 6](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue bird (likely a crow or raven) holding a small yellow object in its beak, perched on a curved line above the bold, dark blue text “cornix.” The design is clean and minimalistic, with the logo centered against a plain white background, emphasizing the brand’s visual identity.\n\n---\n\n### Изображение 7\n\n![Image 7](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a clean, modern design. Key UI elements include a navigation bar (likely with menu options), a main dashboard area (possibly displaying trading metrics or bot status), and a sidebar (for additional controls or settings). The layout emphasizes clarity, with distinct sections for monitoring and managing trading activities.\n\n---\n\n
