# Setting Your Bots to Cross Margin Mode for BNFCR Trading

**URL:** https://help.cornix.io/en/articles/9551051-setting-your-bots-to-cross-margin-mode-for-bnfcr-trading

**Created:** 2026-03-03T12:07:28+00:00

---

Setting Your Bots to 'Cross Margin' Mode for BNFCR Trading | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
Signals BotsDCA, Trading-View and Grid Bots- All Collections
- FAQs & More
- Recent Updates
- Setting Your Bots to 'Cross Margin' Mode for BNFCR Trading
# Setting Your Bots to 'Cross Margin' Mode for BNFCR Trading
Written by Hadar Cornix Updated over a year agoTable of contents
Signals BotsDCA, Trading-View and Grid Bots
If you are a Binance Futures EEA user, facing the new regulations and just upgraded your account to BNFCR Mode, your last step will be making sure that your Cornix Bots are set to Cross Margin only.
### Here's a step by step guide for how to do it:

## Signals Bots
Create or Edit your Signals Bot. Under 'General' settings > 'Leverage' > Choose 'Personal' > Choose 'Select All' > Margin Type > Choose 'Personal' > Choose 'Cross' > Click 'Ok'.
*Choosing the 'Multiplier' is not a must for this process. If you do not choose a specific multiplier, it will be determined by the leverage multiplier mentioned on the signal.

*If you still did not switch to Signals Bots, this is your chance do to it!
​Everything you need to know about signals bots and how to set them



##

## DCA, Trading-View and Grid Bots
Create or Edit your DCA Bot. Under 'General' settings > Margin Type > Choose 'Cross'

Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"9551051","anonymous_id":"5d22551b-7f29-40a2-9ccf-0c59512502c0"};
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
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n<!-- Image description: The screenshot shows the Cornix trading bot’s **Margin** settings modal, with “291 Selected” (and an “Unselect all” option) at the top. The modal includes tabs for *Margin Type* (set to “Personal”) and *Multiplier* (with “Channel”/“Personal” options), a dropdown for “Cross” margin, and a list of checked cryptocurrency pairs (e.g., 1000BONK/USDC, 1000SHIB/USDC) labeled “Cross - Channel.” Buttons for “Cancel,” “Apply,” and “OK” appear at the bottom, while the left sidebar shows bot configuration details (name, signals group, symbols, etc.). -->
![Image 1](https://downloads.intercomcdn.com/i/o/1099879468/9f4aef78d5706ad1958f9b0c/image.png?expires=1772541000&amp;signature=e1e7177cbcc7ad3a71e6ee9fe8d73a98ac27b185b27f508ef6ccf87035c95b84&amp;req=dSAuH8F5lIVZUfMW1HO4zeYnpupKw%2FmggbbRgA5ITii21niP6lXYLj0FnzCQ%0AvU%2FkwhypQPBoraPqIIU%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/1099879468/9f4aef78d5706ad1958f9b0c/image.png?expires=1772541000&amp;signature=e1e7177cbcc7ad3a71e6ee9fe8d73a98ac27b185b27f508ef6ccf87035c95b84&amp;req=dSAuH8F5lIVZUfMW1HO4zeYnpupKw%2FmggbbRgA5ITii21niP6lXYLj0FnzCQ%0AvU%2FkwhypQPBoraPqIIU%3D%0A\n\n**Описание:** The screenshot shows the **General** tab of the Cornix trading bot interface, with a dark blue background and white text. Key UI elements include a "Bot Name" field (filled with "Cornix Signals Bot"), dropdowns for "Signals Group" (set to "Test") and "Account" (set to "1 - My-Binance Futures"), a "Symbols" dropdown with cryptocurrency icons, an "Amount Per Trade" field (set to "10%"), and a "Direction" dropdown with "Long" and "Short" options. A blue arrow highlights the "Leverage" section, which has "Channel" and "Personal" toggle buttons.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/1099885583/c91e1ce0928e8a0b6aef584f/image.png?expires=1772541000&amp;signature=018b606db00a003d5762f7f3d103e2b4f010ed0bf58677c150ec78ded64f338c&amp;req=dSAuH8F2mIRXWvMW1HO4zVG2eYmGj4Hnkr9Zv8UpUvXrZpg1d%2F8awCgufDxE%0ATGL4Uit0LVJ%2Fzz7FMsE%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/1099885583/c91e1ce0928e8a0b6aef584f/image.png?expires=1772541000&amp;signature=018b606db00a003d5762f7f3d103e2b4f010ed0bf58677c150ec78ded64f338c&amp;req=dSAuH8F2mIRXWvMW1HO4zVG2eYmGj4Hnkr9Zv8UpUvXrZpg1d%2F8awCgufDxE%0ATGL4Uit0LVJ%2Fzz7FMsE%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a "Margin" modal window open, displaying a list of trading pairs (e.g., 1000BONK/USDC, 1000PEPE/USDT) with checkboxes, a "Select all" button at the top, and tabs for "General," "Entries," and "Take-" visible in the background. The modal includes action buttons ("Cancel," "Apply," "OK") and filter options for "USDT (264)" and "USDC (26)" pairs, with the bot name "Cornix Signals Bot" and other settings (e.g., "Amount Per Trade," "Direction") visible on the left.\n\n---\n\n### Изображение 3\n\n![Image 3](https://downloads.intercomcdn.com/i/o/1099887726/1fc4c27f2cab04c6066437d8/image.png?expires=1772541000&amp;signature=c5e09702245e87be04040ff4880728d0d5ff6908599254db7aef4403defc9ccb&amp;req=dSAuH8F2moZdX%2FMW1HO4zR5oc3j8tOj%2B%2BNGwfRFmQuSdVUbVqbDQHgCFXoJn%0ACLXl8F5%2FwnpS6TOMZ1I%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/1099887726/1fc4c27f2cab04c6066437d8/image.png?expires=1772541000&amp;signature=c5e09702245e87be04040ff4880728d0d5ff6908599254db7aef4403defc9ccb&amp;req=dSAuH8F2moZdX%2FMW1HO4zR5oc3j8tOj%2B%2BNGwfRFmQuSdVUbVqbDQHgCFXoJn%0ACLXl8F5%2FwnpS6TOMZ1I%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a "Margin" pop - up window. The pop - up has tabs for "Margin Type" (with "Personal" selected) and "Multiplier", a dropdown for "Cross" margin type, and a list of checked trading pairs (e.g., 1000BONK/USDC, 1000SHIB/USDC) with "Cross - Channel" labels. At the top, there's a "291 Selected" indicator and an "Unselect all" option, and at the bottom, "Cancel", "Apply", and "OK" buttons.\n\n---\n\n### Изображение 4\n\n![Image 4](https://downloads.intercomcdn.com/i/o/1099933650/621276843865f7248de7ce98/image.png?expires=1772541000&amp;signature=0bb5a3dd6bce05e0502520956fd89abd4b0b931bdf764992973277d034a049f4&amp;req=dSAuH8B9nodaWfMW1HO4zelNXOvUZ4EJntlDEKuAxQGlv83u8P5OQC6n0e5B%0AiF7Byvnpqt6%2B0OHD4Gc%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/1099933650/621276843865f7248de7ce98/image.png?expires=1772541000&amp;signature=0bb5a3dd6bce05e0502520956fd89abd4b0b931bdf764992973277d034a049f4&amp;req=dSAuH8B9nodaWfMW1HO4zelNXOvUZ4EJntlDEKuAxQGlv83u8P5OQC6n0e5B%0AiF7Byvnpqt6%2B0OHD4Gc%3D%0A\n\n**Описание:** The screenshot shows the "General" tab of the Cornix trading bot interface, with a dark blue theme. Key UI elements include a bot name field ("BOBA/USDT DCA Bot"), account/symbol dropdowns, an "Amount Per Trade" section set to 10% (with a blue arrow highlighting "Percentage"), and margin type options (with "Cross" selected and highlighted). A "Create Bot" button is at the bottom, alongside balance and bot amount value details.\n\n---\n\n### Изображение 5\n\n![Image 5](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow (raven) holding a small yellow object in its beak, perched on a curved line above the bold, dark blue text “cornix” (with a small dot beneath the “x”). The design is clean and minimalistic, emphasizing the brand’s visual identity with a white background.\n\n---\n\n### Изображение 6\n\n![Image 6](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a clean, modern design. Key UI elements include a navigation bar (likely for account, settings, or bot management), a central dashboard area (possibly displaying trading metrics or bot status), and a sidebar (for quick access to features like strategy setup or trade history). The layout emphasizes clarity, with distinct sections for monitoring and controlling trading activities.\n\n---\n\n
