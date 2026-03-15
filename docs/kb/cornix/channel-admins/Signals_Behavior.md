# Signals Behavior

**URL:** https://help.cornix.io/en/articles/11502620-signals-behavior

**Created:** 2026-03-03T11:53:52+00:00

---

Signals Behavior | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
⚙️ Signal Behavior on Posting🧠 Trailing Stop-Loss Logic & VisibilityEditing a signal after it hit SL on one of the exchanges- All Collections
- Channel Admins
- Signals Management
- Signals Behavior
# Signals Behavior
Learn how Cornix handles signals, including how they behave across different platforms, configurations, and notifications.
Written by Hadar Cornix Updated over 5 months agoTable of contents
⚙️ Signal Behavior on Posting🧠 Trailing Stop-Loss Logic & VisibilityEditing a signal after it hit SL on one of the exchanges

## ⚙️ Signal Behavior on Posting
When a regular signal is posted with an entry price above the current market price (for a long position), the entry orders will be fulfilled immediately, even if the specified signal price hasn't been reached on the exchange yet.

✅ A notification will be sent on the channel once the entries are fulfilled.

Note: If your goal is to wait for the market to reach the signal price before entering, make sure to post it as a Breakout Signal, instead of a regular signal.


## 🧠 Trailing Stop-Loss Logic & Visibility
When using a Trailing Stop-Loss with the types:
-
Moving Target 1
-
Moving Target 2
-
Breakeven
and the trigger is set to 'Target', the updated trailing stop-loss will be reflected in real-time on the signal, and displayed across all platforms
❗️Other trailing types (e.g., Percent Below Triggers, Percent Below Highest), or trailing stop-losses using a trigger based on percentage, will not be reflected live on the signal. In these cases, if the signal was closed with trailing stop-loss, you'll still receive a notification: “Closed at trailing stop-loss after reaching take profit.”

## Editing a signal after it hit SL on one of the exchanges
When the signal hits Stop Loss on one of the exchanges, but still open for the other exchanges, the targets cannot be edited for the open signals anymore. At this point, the signal can either remain as it is, or can be cancelled by the channel.

Notes: link for a section on editing/canceling signals post-publication
​
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"11502620","anonymous_id":"5f98c4d4-c4b5-4413-8058-7d390a3cf9f8"};
(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/wrsw0nb0';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow holding a yellow object (likely a coin) above the bold, dark blue text “cornix.” No additional UI elements, buttons, settings, menus, charts, or visible information are present in the image—only the brand’s logo is shown.\n\n---\n\n### Изображение 2\n\n![Image 2](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot displays a Cornix trading bot interface, featuring a clean, structured layout with key UI elements: a top navigation bar (likely for account/settings), a central dashboard area (possibly showing trading metrics or bot status), and a sidebar with menu options (e.g., "Bots," "Strategies," "Reports"). The design emphasizes clarity, with distinct sections for monitoring and managing trading activities, typical of a trading automation platform.\n\n---\n\n
