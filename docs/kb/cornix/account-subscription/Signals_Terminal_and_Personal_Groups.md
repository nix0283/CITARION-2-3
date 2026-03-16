# Signals Terminal and Personal Groups

**URL:** https://help.cornix.io/en/articles/12793198-signals-terminal-and-personal-groups

**Created:** 2026-03-03T11:43:38+00:00

---

Signals Terminal and Personal Groups | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
Part 1 - Setting Up Personal GroupsHow to create a personal group?How to set up the signals bots with personal groups?Part 2 - Publishing Signals via the Signals TerminalCreate signalsUsing the Signals Terminal to publish signals on a Telegram GroupThe Traditional 'Telegram Signal Channel' Method- All Collections
- Account & Subscription
- Asset Manager Plan
- Signals Terminal and Personal Groups
# Signals Terminal and Personal Groups
How to publish signals directly from the dashboard using the Signals Terminal and manage trades at scale with Personal Groups
Written by Cristian Marin Updated over 2 months agoTable of contents
Part 1 - Setting Up Personal GroupsHow to create a personal group?How to set up the signals bots with personal groups?Part 2 - Publishing Signals via the Signals TerminalCreate signalsUsing the Signals Terminal to publish signals on a Telegram GroupThe Traditional 'Telegram Signal Channel' Method
### 📜 Introduction
The Signals Terminal is a powerful feature designed for Asset Managers who plan to trade based on their own analysis. It allows you to create and publish signals directly from your Cornix dashboard or Mini App, without the need to set up or manage an external Telegram channel.

This article guides you through setting up Personal Groups and Signals Bots, and explains how to publish signals using the Signals Terminal.

# Part 1 - Setting Up Personal Groups
Before publishing a signal, you’ll need to create a Personal Group and configure your Signals Bots to follow it. This ensures that when you publish a signal, your bots are ready to execute the trade on your managed accounts.

## How to create a personal group?
You can create a personal group in one of two ways:
-
Via the Signals Terminal > Group > '+Create Group' > Give a name to that group of signals and click 'ok'.
-
Via the Signals Bots page > 'Create Bot' > Signals Group > '+Create Group' > Give a name to that group of signals and click 'ok'.
Once you click 'OK', the group will be created. You can then select it when creating new signals in the Signals Terminal and assign it to your accounts' Signals Bots.

## How to set up the signals bots with personal groups?
Follow these steps to set your signals bots to follow one of your personal groups:
-
Navigate to the Signal Bots section in your Cornix dashboard.
-
Click the +Create Bot button.
-
In the Signals Group section, you have three options:
-
Create a new personal group
-
Use an existing personal group - select your Personal Group from the dropdown list.
-
Use an existing external (telegram) group - select the signal provider from the dropdown list.

Screenshot: The 'Signals Group' section in the Signals Bot creation menu.

-
Configure the rest of the Signals Bot settings (trading configurations, strategies) for one of your managed accounts, and then create the bot.
-
To create additional Signals Bots, simply duplicate the same bot and change the account each time. All settings, including the Group you selected, will remain the same.
​
​Screenshot: Duplicate a signals bot.

# Part 2 - Publishing Signals via the Signals Terminal
Once your bots are configured, you can start publishing signals to trigger new trades.
The Signals Terminal can be found under the Signals Bots section on the dashboard.
​
Screenshot: The Signals Terminal on the web dashboard.
​
## Create signals
-
Symbol: The asset you want to trade (e.g., `BTC/USDT`).
-
Exchanges: Select the exchanges where this signal should be executed. You can also choose all futures/ all spot exchanges.
-
Group: Select the Personal Group you created in Part 1 from the dropdown list.
-
Additional configurations:
Fill in the rest of the signal's trading parameters:
-
Amount per trade
-
Direction (Long/Short)
-
Margin Type & Amount (for Futures)
-
Advanced configurations (if needed):
Entry, Take-Profit, and Stop-Loss strategies
Note! You can also publish a signal using the Free Text feature. Visit the Signals Management section in our Help Center to learn more about how to post free text signals.

Once the signal is created, it will instantly be attached to your selected Personal Group. All Signals Bots configured to follow that group will open the trade on the connected account.

## Using the Signals Terminal to publish signals on a Telegram Group
If you wish to publish your signals to a Telegram/ Discord channel instead of a personal group, this is possible through the Admin Interface.
Just access the Signals Terminal via your Admin Interface instead of the User Interface, and the option to choose a Telegram channel will become available.

## The Traditional 'Telegram Signal Channel' Method
If you prefer, you can still use the telegram signal channel method to manage your signals. This involves creating a private Telegram channel, integrating it with Cornix, and configuring your Signals Bots to follow that channel. You can then publish signals by sending messages directly in your Telegram channel.

For more details on this method, please visit the Channel Admin section of our Help Center.

This feature is one of several powerful tools that help you scale your trades and account management as an Asset Manager. Learn more in our article: How to Scale and Automate Trading with the Asset Manager Account.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"12793198","anonymous_id":"513e1eae-13f3-4c7d-b93f-fbd388509607"};
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
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n<!-- Image description: The screenshot shows the Cornix trading bot interface for "Alice - Binance Futures," with a dropdown menu open (triggered by the three-dot icon) displaying options like "Edit bot," "Duplicate" (highlighted by an arrow), "Activate," "Delete," "Share," "Copy To Demo Trading," and "Set as Telegram One-Click Follow default." The left side lists bot details (Group, Amount, Last Trade Opened) and a "Trades" section showing "Closed Trades: 0 $0." -->
<!-- Image description: The Cornix trading bot interface shows the "Create Signals Bot" screen with a dropdown menu open for "Signals Group," displaying options like "Test Group" and other personal groups. The left sidebar includes navigation for Workspaces, Dashboard, Trades, and Signals Bots, while the right panel displays account balance (42.35 USD), bot amount value (30 USD), and buttons for "Advanced Settings," "Backtesting," and "Create Bot." Top-right shows crypto pair prices (BTC/USDT, ETH/USDT, ADA/USDT) with percentage changes, and a "Create Bot" button. -->
![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1822495953/1de40538738c45c0b86cb5189b93/image.png?expires=1772540100&amp;signature=c515580e9e485b3bad15b7b710ec73dfec8b337f939c643215e95417a5385c71&amp;req=dSglFM13mIhaWvMW1HO4zes95gVbGtkPWanR%2Bk%2FoFP%2F7xpLg79BOvlXPvc1Y%0AjfR5%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1822495953/1de40538738c45c0b86cb5189b93/image.png?expires=1772540100&amp;signature=c515580e9e485b3bad15b7b710ec73dfec8b337f939c643215e95417a5385c71&amp;req=dSglFM13mIhaWvMW1HO4zes95gVbGtkPWanR%2Bk%2FoFP%2F7xpLg79BOvlXPvc1Y%0AjfR5%0A\n\n**Описание:** The Cornix trading bot interface shows a "Create Signals Bot" page with a left sidebar containing navigation options (Dashboard, Trades, Accounts, etc.) and a main section where a dropdown menu for "Signals Group" is open, displaying groups like "Test Group" and "Autotrading Signals Channel." The top bar includes the Cornix logo, "Live Trading"/"Demo" tabs, cryptocurrency prices (BTC/USDT, ETH/USDT, ADA/USDT), and a "Create Bot" button, while the right panel shows balance details, "Advanced Settings"/"Backtesting" buttons, and a "Most Traded Pairs" table.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1822508827/03d77f63d6f691033df9593b00a6/image.png?expires=1772540100&amp;signature=9e2c0c4963a1cbc1fe645bb51b2d11e61ce1f93743b1105362967b2ddd1a60b3&amp;req=dSglFMx%2BlYldXvMW1HO4zT4hk8NRmZWwWyou9PTRJRDuZOFy%2BsNo0KC9esca%0AU4%2FR%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1822508827/03d77f63d6f691033df9593b00a6/image.png?expires=1772540100&amp;signature=9e2c0c4963a1cbc1fe645bb51b2d11e61ce1f93743b1105362967b2ddd1a60b3&amp;req=dSglFMx%2BlYldXvMW1HO4zT4hk8NRmZWwWyou9PTRJRDuZOFy%2BsNo0KC9esca%0AU4%2FR%0A\n\n**Описание:** The screenshot shows the Cornix trading bot interface for "Alice - Binance Futures," displaying a dropdown menu with options like "Edit bot," "Duplicate" (highlighted by an arrow), "Activate," "Delete," "Share," "Copy To Demo Trading," and "Set as Telegram One-Click Follow default." The left side includes sections for "Group," "Amount," "Last Trade Opened," and a "Trades" tab with "Closed Trades" showing "0 $0."\n\n---\n\n### Изображение 3\n\n![Image 3](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1822521698/6c95c81d5f468fbe11f9a51c16de/image.png?expires=1772540100&amp;signature=75c9a84e6cff90b036bceafa4df4905aaba3a62f6efa061ad1e20562add2c842&amp;req=dSglFMx8nIdWUfMW1HO4zQ7tjuOaxDkOyx5MUzf1iS4UAJweBwWV%2FBWBeONJ%0AUcXjXIrp7H%2BMysUV2u4%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1822521698/6c95c81d5f468fbe11f9a51c16de/image.png?expires=1772540100&amp;signature=75c9a84e6cff90b036bceafa4df4905aaba3a62f6efa061ad1e20562add2c842&amp;req=dSglFMx8nIdWUfMW1HO4zQ7tjuOaxDkOyx5MUzf1iS4UAJweBwWV%2FBWBeONJ%0AUcXjXIrp7H%2BMysUV2u4%3D%0A\n\n**Описание:** The Cornix trading bot interface displays a "Signals Terminal" with a left sidebar (showing "Signals Bots" highlighted, plus "Dashboard," "Trades," etc.), a central configuration panel (for symbol, exchanges, trade settings like "Long/Short" and "Amount Per Trade"), and a right chart area (showing BTC/USDT price action with entry/take-profit levels, timeframes, and indicators). Top UI includes "Live Trading/Demo" tabs, crypto price widgets (BTC/USDT, ETH/USDT, ADA/USDT), and a "Create Bot" button.\n\n---\n\n### Изображение 4\n\n![Image 4](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue raven holding a small yellow object in its beak, perched above the bold, dark blue text “cornix” (with a subtle dot beneath the “x”). The design is clean and minimalist, emphasizing the brand’s visual identity.\n\n---\n\n### Изображение 5\n\n![Image 5](https://static.intercomassets.com/avatars/7621376/square_128/WhatsApp_Image_2024-07-28_at_09.17.24_c4fe6c8e-1722176280.jpg)\n\n**URL:** https://static.intercomassets.com/avatars/7621376/square_128/WhatsApp_Image_2024-07-28_at_09.17.24_c4fe6c8e-1722176280.jpg\n\n**Описание:** The screenshot displays a Cornix trading bot interface with a clean, minimalistic design. The UI features a top navigation bar with menu icons (likely for settings, account, or help), a central section showing trading metrics (e.g., profit/loss, trade history), and a bottom panel with action buttons (e.g., start/stop bot, adjust settings). A profile image of a person in a light pink shirt appears in the top-left corner, possibly for user identification or account access.\n\n---\n\n
