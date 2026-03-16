# Not Enough Funds Invested

**URL:** https://help.cornix.io/en/articles/5814902-not-enough-funds-invested

**Created:** 2026-03-03T11:59:05+00:00

---

Not Enough Funds Invested | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
Entry Orders:Take-Profit Orders:- All Collections
- Errors & Notifications
- Order / Trade Statuses
- Not Enough Funds Invested
# Not Enough Funds Invested
Written by Dor Updated over 3 years agoTable of contents
Entry Orders:Take-Profit Orders:
# Entry Orders:
Entry orders might get canceled with this status, usually when a trailing entry was activated and the price has decreased, lowering the order amount below the minimum that's allowed in the exchange.

# Take-Profit Orders:
Take-Profit orders will be cancelled with this status when the order amount is lower than the minimum that's allowed in the exchange. The amount that was allocated to orders without enough funds will be redistributed to the other valid pending take-profit orders. For example, if the minimum order size that's allowed in the exchange is 0.0001 BTC so any order with a smaller amount will be cancelled with this status and be redistributed.

Please note that Cornix will only cancel Take-Profit orders with this status when at least one Take-Profit target is reached. This happens because before the first Take-Profit is reached the trade might be updated such that the order amount is increased and becomes valid. Until then, the invalid take-profit orders will be tagged with the Waiting for Entries status.

For example, before a take-profit order is reached a trade might be updated when additional Entry orders are filled (which will increase the amount that can be allocated to pending Take-Profit targets) or the trade amount is increased. When a Take-Profit target is reached the amount that's allocated for each Take-Profit target can no longer change, and therefore it is guaranteed that the invalid Take-Profits will stay invalid, so at that point they are cancelled with the Not Enough Funds Invested status.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"5814902","anonymous_id":"744d7d8d-2d83-4eb4-9d34-177ed40afc21"};
(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/wrsw0nb0';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow holding a small yellow object (likely a coin) in its beak, positioned above the bold, lowercase text “cornix” in dark blue. The design is clean and minimalistic, with the crow and text centered on a white background, emphasizing the brand’s visual identity.\n\n---\n\n### Изображение 2\n\n![Image 2](https://static.intercomassets.com/avatars/4586445/square_128/Screen_Shot_2022-02-06_at_2.34.28_PM-1644150878.png)\n\n**URL:** https://static.intercomassets.com/avatars/4586445/square_128/Screen_Shot_2022-02-06_at_2.34.28_PM-1644150878.png\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a user profile section at the top left, featuring a circular profile photo of a person in a gray shirt against an outdoor background with trees and rocks. The UI includes typical trading bot elements like charts, indicators, and control panels, though specific details of other UI components (e.g., buttons, tabs, or metrics) are not fully visible in the provided view.\n\n---\n\n
