# Create TradingView Alerts and connect them to your Bot

**URL:** https://help.cornix.io/en/articles/6325118-create-tradingview-alerts-and-connect-them-to-your-bot

**Created:** 2026-03-03T11:45:53+00:00

---

Create TradingView Alerts and connect them to your Bot | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
Step 1 - Go to your TradingView accountStep 2 - Create alertStep 3 - Fill in the necessary alert fields- All Collections
- Trading Bots
- Trading View
- Create TradingView Alerts and connect them to your Bot
# Create TradingView Alerts and connect them to your Bot
How to connect Cornix with Trading View using alerts
Written by Hadar Cornix Updated over a week agoTable of contents
Step 1 - Go to your TradingView accountStep 2 - Create alertStep 3 - Fill in the necessary alert fields
Note: The TradingView integration with Cornix is done by the Webhook URL method. You can also use your own Pine script, as described below.
This integration requires a paid package on TradingView.

# Step 1 - Go to your TradingView account
Navigate to your profile and click on 'Chart'.


# Step 2 - Create alert
Click on the alarm clock icon on the right side of the page, and click the 'Create alert' button.


# Step 3 - Fill in the necessary alert fields
Alert Actions:
a) ✓ Show pop-up
b) ✓ Webhook URL - Use this URL address when setting your Trading View alerts - https://dashboard.cornix.io/tradingview/.
c) Enter your "Create Trade Webhook" or "Close Trade Webhook" into the 'Message' box (see image for example).
d) After verifying that you have completed all the steps, click 'Create'.

Notes:
-
The "Message" box should only include the copied Webhooks (either "Create Trade Webhook" or "Close Trade Webhook"). Do not add any additional text to the message box.
-
You can send alerts directly from your Pine Script, e.g. 'strategy.order.alert_message' and it will work.
-
For Demo TradingView bots, use this Webhook URL instead of the regular one- https://dashboard.cornix.io/tradingview-demo/.
-
Make sure you copy and paste the Webhook URL exactly as it is without missing any note.

Note: The links and Webhook shown in the video are for demonstration purposes only and should not be used. Instead, use the attached Webhook URL and the unique Trade Webhooks shown on your Bot's details.

Once your alert is created and your TradingView bot is active - you're all set ✌️
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"6325118","anonymous_id":"e021f864-0e4b-46ef-a30c-9ab8a5d676d5"};
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
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/2095177213/f86c9f86579d669884e186b616d2/Totach1234.png?expires=1772540100&amp;signature=80428c02e68c3211cf16b5d92d97f6bf06545145b98659e37b527acc31fcf1d9&amp;req=diAuE8h5moNeWvMW1HO4zVp3U5nXR5hz2gU%2BEuW9tc6vC7z5t4gPu%2Frd9DC3%0AqqG3aeawGACx3G9R0pY%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/2095177213/f86c9f86579d669884e186b616d2/Totach1234.png?expires=1772540100&amp;signature=80428c02e68c3211cf16b5d92d97f6bf06545145b98659e37b527acc31fcf1d9&amp;req=diAuE8h5moNeWvMW1HO4zVp3U5nXR5hz2gU%2BEuW9tc6vC7z5t4gPu%2Frd9DC3%0AqqG3aeawGACx3G9R0pY%3D%0A\n\n**Описание:** The screenshot shows a TradingView user profile page with a dark theme. Key UI elements include a purple "T" avatar, a "PRO" badge, status indicators ("Online," "Joined 42 minutes ago"), and tabs for "IDEAS," "SCRIPTS," "FOLLOWERS," "FOLLOWING," and "SETTINGS." The top navigation bar features "Chart," "Markets," "News," and other menu options, with an arrow pointing to the "Chart" button.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/2095177214/db567a4f75302a546ddeeb3033fc/Add_a_little_bit_of_body_text_-_Poster.png?expires=1772540100&amp;signature=0b427fe2eedd68ea2e023fae01148b40fdfc9c64303d9fd9c779c7389a1ede63&amp;req=diAuE8h5moNeXfMW1HO4zVN8qFVfVPxhdtK1RwSg6pvQci63gOGQKsLDKk79%0A6YqmaCSqi68gj88JjX8%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/2095177214/db567a4f75302a546ddeeb3033fc/Add_a_little_bit_of_body_text_-_Poster.png?expires=1772540100&amp;signature=0b427fe2eedd68ea2e023fae01148b40fdfc9c64303d9fd9c779c7389a1ede63&amp;req=diAuE8h5moNeXfMW1HO4zVN8qFVfVPxhdtK1RwSg6pvQci63gOGQKsLDKk79%0A6YqmaCSqi68gj88JjX8%3D%0A\n\n**Описание:** The screenshot shows a dark-themed "Alerts" page of the Cornix trading bot, featuring a central illustration of an alarm clock with a candlestick chart, text explaining alerts as immediate notifications, and a prominent "Create alert" button. The top bar includes navigation icons (play, pause, chart, search, filter) and a highlighted clock icon, while a vertical sidebar on the right displays additional icons (list, documents, calendar, etc.).\n\n---\n\n### Изображение 3\n\n![Image 3](https://downloads.intercomcdn.com/i/o/wrsw0nb0/2095177215/b68ab4144043ca5df835fe767e49/Test.gif?expires=1772540100&amp;signature=0dd64f6cc808fa070695a20d809121f86df9ec5d127b1c29f12db9cde4b21ce3&amp;req=diAuE8h5moNeXPMW1HO4zQpIcU5vMWy1NBYDWwIhlu09TessNFD3gJ0Nm2gJ%0A7%2ByN5Z14VBRTK71zdCs%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/2095177215/b68ab4144043ca5df835fe767e49/Test.gif?expires=1772540100&amp;signature=0dd64f6cc808fa070695a20d809121f86df9ec5d127b1c29f12db9cde4b21ce3&amp;req=diAuE8h5moNeXPMW1HO4zQpIcU5vMWy1NBYDWwIhlu09TessNFD3gJ0Nm2gJ%0A7%2ByN5Z14VBRTK71zdCs%3D%0A\n\n**Описание:** _PENDING_\n\n---\n\n### Изображение 4\n\n![Image 4](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow holding a yellow object in its beak, perched on a curved line above the lowercase text “cornix” in bold, dark blue font. The design is clean and minimalistic, with the crow and text centered against a white background, emphasizing the brand’s visual identity.\n\n---\n\n### Изображение 5\n\n![Image 5](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a clean, minimalistic design. The UI includes a sidebar on the left with navigation icons (e.g., home, settings, charts) and a main content area displaying trading metrics or bot controls, with a neutral color scheme (grays, whites) and clear, organized layout for easy navigation.\n\n---\n\n
