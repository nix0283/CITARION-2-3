# Group Trading Configuration - Web Interface

**URL:** https://help.cornix.io/en/articles/11208374-group-trading-configuration-web-interface

**Created:** 2026-03-03T11:53:38+00:00

---

Group Trading Configuration - Web Interface | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
🛠️Accessing and Editing the Trading Configuration⚙️What can be configured?🔧The Different Settings💡Important Notes- All Collections
- Channel Admins
- Group Trading Configuration - Web Interface
# Group Trading Configuration - Web Interface
Manage your group's trading configuration via your admin interface on your Cornix dashboard
Written by Cristian Marin Updated over 9 months agoTable of contents
🛠️Accessing and Editing the Trading Configuration⚙️What can be configured?🔧The Different Settings💡Important Notes
The Group's Trading Configuration allows the admin to define specific settings for how signals are managed and executed within the channel. These configuration will also reflect on the user's trades unless they’ve customized their own Signals Bot configuration.
This can provide greater consistency and control over how trades are placed, helping to align trades execution with the channel’s strategy.

# 🛠️Accessing and Editing the Trading Configuration
-
Log in to the Web Dashboard
-
In the left sidebar, navigate to Admin Interface > Trading Configuration
-
Use the top bar to select the group you want to manage
-
Chose Leverage or Non-Leverage Exchanges and click 'Edit'.
*While both Leverage and Non-Leverage setups have the same contents, they are still separated to ensure that different signal types are handled appropriately.
​

# ⚙️What can be configured?
These are the parameters that can be set on the channel's trading configuration:
-
Amount per Trade
-
Entry Ratios & Trailing
-
Take-Profit Ratios & Trailing
-
Trailing Stop Loss
-
Close on TP Before SL
​

# 🔧The Different Settings
Note: By default, all groups are set to use the User's personal configuration, meaning trades are executed based on each user’s Signals Bot Configuration.

As an admin, you have the flexibility to set some basic parameters into your signals as default and they will be applied to the user's trades unless defined otherwise by the users in their configuration (Signal Bot):


### Entry Ratios and Trailing
Cornix provides a variety of different Entries Ratios by default, but you can also create custom ratios distribution.
The Trailing Entry feature is used to dynamically follow price movements for potentially optimized entry levels.
-
Entry Ratios: This setting defines how the total trade investment is distributed across the different price levels you've set for entering a position. It determines the portion of your funds that will be used to buy at each specified entry target. Read more.

-
Trailing Entry: Trailing will be activated once the specified entry price is reached on the exchange, and instead of immediately executing the order, it sets a trailing order that follows the price behind it by a pre-defined percentage. The purchase is executed if the price retraces back to the last trailing order that was placed, allowing you to potentially enter a trade at a more favorable price during a trend. Read more.

### Take-Profit Ratios and Trailing
Cornix offers flexible Take-Profit Ratios, allowing you to distribute your exit strategy across multiple price levels. Additionally, Trailing Take-Profit feature enables you to dynamically adjust your exit point as the price moves favorably, when there's potential of maximizing profits.
-
Take-Profit Ratios: This setting allows you to define how your total profit target is divided across different price levels for exiting a position. It determines the portion of your invested amount that will be sold at each specified take-profit target. Read more.

-
Trailing Take-Profit: This is activated once your specified take-profit price is reached on the exchange, and instead of executing immediately, it sets a trailing sell order that follows the price by a defined percentage or a fixed amount. The order is executed if the price retraces by this trailing value, allowing you to potentially capture more profit during a trend. Read more.
​
### Trailing Stop Loss
Cornix allows you to protect your trades dynamically with Cornix's Trailing Stop Loss. This feature allows your stop loss order to automatically adjust as the price moves in your favor, helping to secure profits while limiting potential downside. Read more.

### Amount per trade
This setting enables you to manage the capital allocation by specifying either a percentage of your total portfolio balance or a percentage of the risk you are willing to take, the amount selected will be used for each signal, it is limited to up to 20% for both options. Read more.

### Close on TP before Entry
This option instructs the Cornix bot to monitor the price even before all your defined entries for a signal have been reached. If the price reaches any of your specified take-profit targets while entry orders are still pending, the bot will immediately close the signal. Read more.

# 💡Important Notes
-
Any new configuration will only apply on the signals that are published after the configuration was set. Any signal that was published before the change, will keep the previous configuration.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"11208374","anonymous_id":"a617ab45-2a85-41a5-a158-bf19f7dce1bc"};
(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/wrsw0nb0';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1510822823/0d4ec6f9d35008e1d8244f5310e4/image.png?expires=1772541000&amp;signature=c548a1169037ed79f0dd2def1d7bcc78a16c0ed0722eb6823509cb94d8ede71a&amp;req=dSUmFsF8n4ldWvMW1HO4zYbH3BdH6aVP59kDgR4xblIm9lDljDiBIIaJMqwy%0A9hOMbd7WYwEKHn0lGoM%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1510822823/0d4ec6f9d35008e1d8244f5310e4/image.png?expires=1772541000&amp;signature=c548a1169037ed79f0dd2def1d7bcc78a16c0ed0722eb6823509cb94d8ede71a&amp;req=dSUmFsF8n4ldWvMW1HO4zYbH3BdH6aVP59kDgR4xblIm9lDljDiBIIaJMqwy%0A9hOMbd7WYwEKHn0lGoM%3D%0A\n\n**Описание:** The screenshot displays a Cornix trading bot configuration interface with sections labeled "General," "Entry," "Take-Profit," "Stop," and "Advanced." Each section contains options (e.g., "Amount," "Entries Ratios," "Trailing Stop") paired with "User Configuration" or "Dynamic" labels, arranged in a clean, vertical list format.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1523338362/d1dce6009a9eb9cf2152db19f816/image.png?expires=1772541000&amp;signature=172b34135a82d1497eb01fd611ad80eb0960a3241e15a08118fdc5171416339c&amp;req=dSUlFcp9lYJZW%2FMW1HO4zW0fHQHVsw29ipMYdgPaErREVRprGH%2FvAreH%2FMoi%0AKVOY%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1523338362/d1dce6009a9eb9cf2152db19f816/image.png?expires=1772541000&amp;signature=172b34135a82d1497eb01fd611ad80eb0960a3241e15a08118fdc5171416339c&amp;req=dSUlFcp9lYJZW%2FMW1HO4zW0fHQHVsw29ipMYdgPaErREVRprGH%2FvAreH%2FMoi%0AKVOY%0A\n\n**Описание:** The Cornix trading bot interface displays a "Group Configurations" page with a left sidebar containing navigation options like "Trading Configuration" (highlighted) and a main content area split into "Leverage Exchanges" and "Spot Exchanges" sections, each with editable "General," "Entry," "Take-Profit," "Stop," and "Advanced" configuration categories. The top bar shows the Cornix logo, a "Cornix Channel" dropdown, cryptocurrency price widgets (BTC/USDT, ETH/USDT, ADA/USDT), and action buttons ("Upgrade," "Create Bot").\n\n---\n\n### Изображение 3\n\n![Image 3](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow holding a small yellow object in its beak, positioned above the bold, dark blue text “cornix.” The design is minimalistic, with the crow and text centered on a plain white background, emphasizing the brand’s visual identity.\n\n---\n\n### Изображение 4\n\n![Image 4](https://static.intercomassets.com/avatars/7621376/square_128/WhatsApp_Image_2024-07-28_at_09.17.24_c4fe6c8e-1722176280.jpg)\n\n**URL:** https://static.intercomassets.com/avatars/7621376/square_128/WhatsApp_Image_2024-07-28_at_09.17.24_c4fe6c8e-1722176280.jpg\n\n**Описание:** The screenshot displays a Cornix trading bot interface with a clean, minimalistic design. Key UI elements include a top navigation bar with tabs (e.g., "Dashboard," "Trades," "Settings"), a central panel showing trading metrics (e.g., profit/loss, active bots), and a sidebar with quick-access options like "Create Bot" or "History." The layout emphasizes clarity, with color-coded indicators (e.g., green for gains, red for losses) and a structured grid for bot management.\n\n---\n\n
