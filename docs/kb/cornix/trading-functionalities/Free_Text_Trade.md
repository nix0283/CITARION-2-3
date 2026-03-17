# Free Text Trade

**URL:** https://help.cornix.io/en/articles/5814928-free-text-trade

**Created:** 2026-03-03T11:51:51+00:00

---

Free Text Trade | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
- Trading Functionalities
- Mobile App - Trades
- Free Text Trade
# Free Text Trade
Written by Dor Updated over 4 years ago
The free text trade creation method allows you to provide the vast majority of the trade details using a single message when creating a trade using the Telegram Bot or our Mobile App.
The purpose of this feature is to save you a significant amount of time by allowing you to provide most of the trade details in one go instead of having to define them one by one. In addition, since the free text parser handles most common trades and signals formats, you will be able to use this feature to create trades manually based on signals from any group, even ones that are not officially supported by Cornix.
Below is the simplest form of a free text message for a trade and signal that includes leverage. For non leverage signals the leverage line can be omitted.
​Figure 1 : Sample Trade/Signal
As you can see, the message can include trade details which include:
-
Symbol
-
Entry targets
-
Take-Profit targets
-
Stop targets
-
Leverage
-
Trade type (Regular or Breakout)
-
Short/Long
Please note that the message format currently does not support the ratios for each target and trailing information. These trade parameters will be filled in automatically using your selected client configuration (and you will have a chance to edit them before the trade is created).
The following is a comprehensive list of guidelines when creating a free text message:
-
Always have a full coin pair name (BTC/USD).
-
Always have the Buy (or Entry) keyword present in the message.
-
Always have either the Sell or Stop keywords present in the message.
-
Try to avoid variations of the keywords, like S/L. Type out the word Stop instead.
-
Prices in the Satoshis range can be abbreviated and will work fine, eg. 0.00030000 can be written as 30000 (with exception of rule K).
-
Prices stated as 100-200 are seen as TWO entries. If a buy range is intended the addition of the word ‘zone’ needs to accompany the prices, eg. Buy zone 100-200.
-
Try to minimize the usage of unicode emojis like diamond, etc.
-
No need to write LONG or SHORT. Cornix will do this automatically based on the prices.
-
Leverage signals need a leverage indication, with the keyword Leverage or Lev.
-
A stop loss may not be above an entry for a long or below an entry for a short.
-
Breakout trades can be triggered by the usage of the words ‘above or below’. eg Enter above 200-100 or Enter Below 100-200. This will wait before buying.
-
Breakout trades can only have 2 prices in the entry statement as a range.
-
Multiple prices can be used in one line. They will be sorted automatically based on the trade/signal direction, eg. Buy 100 300 200 400.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"5814928","anonymous_id":"a8077b47-4315-4a49-b475-158da0019bbf"};
(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/wrsw0nb0';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n<!-- Image description: The screenshot displays the Cornix trading bot’s logo: a stylized dark blue crow holding a yellow object (likely a coin) above the bold, dark blue text “cornix.” The design is clean and minimalistic, with no additional UI elements, buttons, settings, menus, or charts visible—only the brand identity centered on a white background. -->
<!-- Image description: The screenshot shows a Cornix trading bot interface for the BTC/USDT pair, displaying key trading parameters: 10x leverage, a buy order at 9000, a sell order at 10000, and a stop-loss at 8800. UI elements include a paperclip icon (likely for attaching notes), a bell (notifications), a smiley (chat), and a blue arrow (submit/execute). The layout is minimal, focusing on core trade settings. -->
![Image 1](https://cornix.intercom-attachments-1.com/i/o/434792790/f3aeef46e879d6a102f8130f/mceclip1.png?expires=1772540100&amp;signature=5d769ee56360aa3983262a99d00a359366d8e9ebf4b14e74713f02d95b890e3f&amp;req=cCMjEcB8mohfFb4f3HP0gDCfcZyUcCSyZHRbOXmVRX0a00Ur15Y2iFj9BSAE%0AKI6wnTWtCB%2FvaXn0nQ%3D%3D%0A)\n\n**URL:** https://cornix.intercom-attachments-1.com/i/o/434792790/f3aeef46e879d6a102f8130f/mceclip1.png?expires=1772540100&amp;signature=5d769ee56360aa3983262a99d00a359366d8e9ebf4b14e74713f02d95b890e3f&amp;req=cCMjEcB8mohfFb4f3HP0gDCfcZyUcCSyZHRbOXmVRX0a00Ur15Y2iFj9BSAE%0AKI6wnTWtCB%2FvaXn0nQ%3D%3D%0A\n\n**Описание:** The screenshot displays a Cornix trading bot interface for the BTC/USDT pair, showing leverage set to 10x, buy price at 9000, sell price at 10000, and a stop-loss at 8800. UI elements include a paperclip icon (likely for attachments), notification bell, smiley face, and a blue arrow button (probably for execution). The layout is minimal, focusing on key trading parameters.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow (raven) holding a small yellow object in its beak, perched above the lowercase text “cornix” in a bold, dark blue font. The design is clean and minimalistic, with the bird and text centered on a white background, emphasizing the brand’s visual identity.\n\n---\n\n### Изображение 3\n\n![Image 3](https://static.intercomassets.com/avatars/4586445/square_128/Screen_Shot_2022-02-06_at_2.34.28_PM-1644150878.png)\n\n**URL:** https://static.intercomassets.com/avatars/4586445/square_128/Screen_Shot_2022-02-06_at_2.34.28_PM-1644150878.png\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a profile picture (a person in a gray shirt) at the top left, likely for user identification. The main area appears to display trading-related content, though specific UI elements like charts, buttons, or settings aren’t visible in the provided snippet.\n\n---\n\n
