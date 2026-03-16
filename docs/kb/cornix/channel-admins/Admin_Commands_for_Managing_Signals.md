# Admin Commands for Managing Signals

**URL:** https://help.cornix.io/en/articles/5814961-admin-commands-for-managing-signals

**Created:** 2026-03-03T11:55:09+00:00

---

Admin Commands for Managing Signals | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
Closing Commands1. /close_all2. /close {symbol}3. /close {as a reply}4. /close_long & /close_shortAdding Additional Entry Command/enter {percent}All Commands Summary- All Collections
- Channel Admins
- Signals Management
- Admin Commands for Managing Signals
# Admin Commands for Managing Signals
How to cancel or add entries to your signals, using simple commands sent on the channel
Written by Hadar Cornix Updated over 2 months agoTable of contents
Closing Commands1. /close_all2. /close {symbol}3. /close {as a reply}4. /close_long & /close_shortAdding Additional Entry Command/enter {percent}All Commands Summary
As a channel admin, you can manage active signals using commands to close signals or add additional entries. These commands help you maintain control over your channel's trading activity and provide a smooth experience for your members.

⚠️ Note: Users who followed the signal manually using the follow buttons or edited their trades after opening, will not receive automatic updates from the channel. They will be able to either click "One-Click Close/Update" or manually apply the changes on their trades.

# Closing Commands
There are four types of closing commands:
-
/close_all - Cancel all open signals
-
/close {symbol} - Cancel all signals of the same symbol
-
/close {as a reply} - Cancel one specific signal
-
/close_long & /close_short - Cancel all long or short signals (NEW)
⚠️ Note:
When a signal is cancelled, a market sell order is sent to all users who are auto-following the signal.

## 1. /close_all
To cancel all active signals, type:
`/close_all`
All currently active signals in your channel will be cancelled. A confirmation message will appear in the channel.

## 2. /close {symbol}
To cancel all signals of a specific coin pair, use one of the accepted keywords followed by the symbol name:

Accepted cancellation keywords: `close`, `cancel`, `exit`
Accepted signal name variations: `BTCUSDT`, `BTC.USDT`, `BTC/USDT`

Examples:
/close xrp.usdt
/cancel btcusdt
/exit eth/btc
All signals for the specified coin pair will be cancelled simultaneously. A confirmation message will be sent in the channel, mentioning the signals were manually cancelled.

⚠️ Note:
This is the global cancellation method, meaning that if multiple BTCUSDT signals are open at that time, all of them will be cancelled.
If you need to close only one specific signal, use option 3 below.

## 3. /close {as a reply}
To cancel one specific signal, locate the original signal message on the channel, reply to it like any Telegram reply message and type one of the cancellation keywords:
`/close, /cancel, /exit`
### Option B - Cancel via the Admin Panel
-
Telegram Bot: Main menu → Admin Panel → Channel → Signals → Open Signals → Select signal → Cancel → Confirm
-
Web Dashboard: Admin interface → Signals → Select signal → Open the '...' menu → Click close signal → Confirm
A message on the channel will notify users that the signal was cancelled.

📝 Note:
The "Open Signals" section on the Telegram admin panel contains useful info such as coin pair, date/time opened, number of followers, and total invested capital. You can use it to analyze the current status of the signal and take decisions.

## 4. /close_long & /close_short
To cancel signals based on their direction, use the following commands:
`/close_long`
`/close_short`
A confirmation message will be posted in the channel indicating which direction was cancelled.
##
# Adding Additional Entry Command
You can add an additional entry target at the current market price to an existing signal, using the following command:

## /enter {percent}
Depending on weather the signal includes entry ratios or not, use the following commands as a reply message to the original signal's message on the channel:
`/enter`
`/enter 20`
⚠️ Note:
-
This option is available only if not all entries have been filled, the signal did not enter the entry zone, and no sell target has been reached.
-
If your signal includes ratios, make sure to specify the ratio for the new order. The specified amount will be deducted from the remaining entry orders, maintaining the original proportions of the signal.

# All Commands Summary
Command
Action
`/close_all`
Close all open signals
`/close_long`
Close only long signals
`/close_short`
Close only short signals
Reply "`/close`"
Close one specific signal
`/enter`
Add an additional entry target
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"5814961","anonymous_id":"f43a49bf-8f61-4c42-aa76-d2d3a8f66d48"};
(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/wrsw0nb0';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1913890140/464db28dcc6de46d88a45664f87e/image.png?expires=1772541000&amp;signature=2c4a6a90dd9ee90e31406b3420ae646e931406768bde2d71c9f20fcf03c9caf2&amp;req=dSkmFcF3nYBbWfMW1HO4zZRrq2He85MFXQJ8m2x1S%2BUhj7sGsCK5%2BqsIdmHr%0AdMofRb9hfvO9jrbytRI%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1913890140/464db28dcc6de46d88a45664f87e/image.png?expires=1772541000&amp;signature=2c4a6a90dd9ee90e31406b3420ae646e931406768bde2d71c9f20fcf03c9caf2&amp;req=dSkmFcF3nYBbWfMW1HO4zZRrq2He85MFXQJ8m2x1S%2BUhj7sGsCK5%2BqsIdmHr%0AdMofRb9hfvO9jrbytRI%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a dark theme. At the top, a red banner displays "Cornix Channel" and a trading signal for XRP/USDT (leverage 3x, buy 1.9, sell 2.1), followed by a blue text line stating "#XRP/USDT Manually Cancelled" with a timestamp of 2:15:48. Below, three buttons are visible: "View Signal" (with an arrow), "One Click Close" (with a lightning icon), and "Set Auto Trading" (with an arrow).\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow holding a yellow object in its beak, positioned above the bold, dark blue text “cornix.” The design is clean and minimalistic, with the crow and text centered on a white background, emphasizing the brand’s visual identity.\n\n---\n\n### Изображение 3\n\n![Image 3](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a clean, minimalistic design. Key UI elements include a sidebar menu on the left (likely for navigation), a central dashboard area displaying trading metrics or charts, and a top bar with user profile and settings icons. The layout is structured for easy access to trading tools and real - time data.\n\n---\n\n
