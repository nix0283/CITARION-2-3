# You

**URL:** https://help.cornix.io/en/articles/11675470-you-can-t-change-the-margin-type-leverage-when-you-already-have-an-open-position-order

**Created:** 2026-03-03T11:57:28+00:00

---

You Can't Change the Margin Type / Leverage When You Already Have an Open Position / Order | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
🔎 Why Do You See This Message?⚙️ How to Force All Trades to Use the Same Leverage & Margin Type1 - Open the Bot Settings2 - Enable Advanced Settings3 - Set your 'Leverage' Configuration🛠 Still Getting This Notification?- All Collections
- Errors & Notifications
- Notifications
- You Can't Change the Margin Type / Leverage When You Already Have an Open Position / Order
# You Can't Change the Margin Type / Leverage When You Already Have an Open Position / Order
Learn how to configure your bot to avoid this error by setting a fixed margin type and leverage for all trades
Written by Cristian Marin Updated over 8 months agoTable of contents
🔎 Why Do You See This Message?⚙️ How to Force All Trades to Use the Same Leverage & Margin Type1 - Open the Bot Settings2 - Enable Advanced Settings3 - Set your 'Leverage' Configuration🛠 Still Getting This Notification?
"Trade did not opened: You can't change the margin type / leverage when you already have an open position or order."

# 🔎 Why Do You See This Message?
This message usually appears when:
-
You have multiple Signal Bots automating trades from different channels.
-
One channel uses Isolated margin, while another uses Cross margin.
-
Different channels use different leverage multipliers for the same symbol.
Examples:
-
Scenario 1: Channel A sends a signal for BTC/USDT using Isolated, and later, Channel B sends a signal for the same pair using Cross.
-
Scenario 2: Channel A sends a signal with 10x leverage, while Channel B sends one with 15x for the same symbol.
In such cases, the exchange may reject new orders, since some platforms only allow one active margin type and leverage setting per symbol at a time.
##
# ⚙️ How to Force All Trades to Use the Same Leverage & Margin Type
To set a fixed margin type and leverage in your bot configuration follow these steps:

## 1 - Open the Bot Settings
Go to your Signals Bots page > Click the three dots '...' next to the bot you want to configure > Edit Bot.

## 2 - Enable Advanced Settings
If you don’t see Leverage options right away, make sure to enable your Advanced Settings.
Click 'Advanced Settings' at the right side of the screen.


## 3 - Set your 'Leverage' Configuration
Go to 'Leverage' > 'Personal' > 'Select all' (This ensures your settings apply to all symbols the bot trades)


### 🔷 Margin Type
Under Margin Type dropdown, click 'Personal' and select either Cross or Isolated from the dropdown, to apply consistently across all trades.

### 🔷 Leverage
Under the Multiplier section, click 'Personal' and choose between:
-
Up To – Use the channel's leverage, capped at your specified maximum.
-
Exactly – Override the channel’s leverage every tine and use the exact amount you set.
Then enter your preferred leverage multiplier.

Note: Different symbols have different max leverage limits. If you set a higher value, the bot will automatically cap it to the maximum leverage supported by the exchange.

### ✅ Save your new settings, and you're good to go.
From now on, the bot will always use the margin type and leverage levels set by you on the leverage configuration. You can come back and change this configuration any time.


# 🛠 Still Getting This Notification?
If you continue to receive this error, double-check your exchange account and make sure that you don’t have open positions with a conflicting margin type or leverage for the same symbol.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"11675470","anonymous_id":"1b0324e1-6a7c-46fb-b2f8-79ceacc92ab9"};
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
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n<!-- Image description: The screenshot shows a **Cornix trading bot’s “Margin” settings modal** with tabs for *Global Settings* (active) and *Channel*. Key UI elements include: a *Symbols* section with 479 selected pairs (e.g., 100000BOB/USDT, 1000BONK/USDC) and filters for *Margin Type* (Isolated) and *Multiplier* (Exactly 5x); toggle for *Show Custom Symbols*; blue “USDT (444)”/“USDC (34)” buttons; and action buttons at the bottom (*Cancel*, *Apply*, *OK*). The interface is clean, with checkboxes for symbol selection and dropdowns for configuration. -->
![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1605987502/c6d74811a17510ee29e1ace3db4a/image.png?expires=1772541000&amp;signature=1f02288cde0163c9ec9e509e50509ff16632fa35fd084dec40e2c1986017f4b9&amp;req=dSYnE8B2moRfW%2FMW1HO4zcJq5SjJLq4ImebMPJ%2F8dOixi0xYGJ%2FGesImpLFX%0Asu8fh2pxygU26OJHrL8%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1605987502/c6d74811a17510ee29e1ace3db4a/image.png?expires=1772541000&amp;signature=1f02288cde0163c9ec9e509e50509ff16632fa35fd084dec40e2c1986017f4b9&amp;req=dSYnE8B2moRfW%2FMW1HO4zcJq5SjJLq4ImebMPJ%2F8dOixi0xYGJ%2FGesImpLFX%0Asu8fh2pxygU26OJHrL8%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot's "Margin" settings modal with tabs for "Global Settings" and "Channel" (the latter is active). The UI includes a "Symbols" section with 479 selected pairs, options to unselect all or reset to global, a toggle for "Show Custom Symbols," and dropdowns for "Margin Type" (set to "Personal") and "Multiplier" (set to "5x"). A list of checked trading pairs (e.g., 1000000BOB/USDT, 1000BONK/USDC) with "Isolated - 5x" labels is visible, plus buttons for "Cancel," "Apply," and "OK" at the bottom.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1605988926/f9b1d55c644f93bf3b37bbe0aa18/image.png?expires=1772541000&amp;signature=99cba423291bda7ba4aec30d3fc3861cf4a5218e1f8f794dc49da63a59d9f228&amp;req=dSYnE8B2lYhdX%2FMW1HO4zdsreryWOaOP%2B7VGoP5XCxXoVfFdEOQVST0t0kzj%0ArLVjfluqFgO3d%2FTWfhQ%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1605988926/f9b1d55c644f93bf3b37bbe0aa18/image.png?expires=1772541000&amp;signature=99cba423291bda7ba4aec30d3fc3861cf4a5218e1f8f794dc49da63a59d9f228&amp;req=dSYnE8B2lYhdX%2FMW1HO4zdsreryWOaOP%2B7VGoP5XCxXoVfFdEOQVST0t0kzj%0ArLVjfluqFgO3d%2FTWfhQ%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a white background. At the top, it displays "Available Balance" (0 USD) and "Bot Amount Value" (0 USD, 0%), followed by two buttons: a dark blue "Advanced Settings" (selected) and a light blue "Backtesting". At the bottom, there’s a prominent blue "Save Changes" button.\n\n---\n\n### Изображение 3\n\n![Image 3](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow (or raven) holding a small yellow object in its beak, positioned above the bold, dark blue text “cornix” (with a subtle dot beneath the “x”). The design is clean and minimalistic, emphasizing the brand’s visual identity with high contrast between the dark bird/text and the white background.\n\n---\n\n### Изображение 4\n\n![Image 4](https://static.intercomassets.com/avatars/7621376/square_128/WhatsApp_Image_2024-07-28_at_09.17.24_c4fe6c8e-1722176280.jpg)\n\n**URL:** https://static.intercomassets.com/avatars/7621376/square_128/WhatsApp_Image_2024-07-28_at_09.17.24_c4fe6c8e-1722176280.jpg\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a clean, minimalistic design. Key UI elements include a sidebar with navigation icons (e.g., home, settings, portfolio), a main dashboard displaying trading metrics (e.g., profit/loss, trade history), and a top bar with user profile and notification icons. The layout is organized to prioritize quick access to trading tools and real-time data.\n\n---\n\n
