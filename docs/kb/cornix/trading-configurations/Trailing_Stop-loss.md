# Trailing Stop-loss

**URL:** https://help.cornix.io/en/articles/5814874-trailing-stop-loss

**Created:** 2026-03-03T11:49:33+00:00

---

Trailing Stop-loss | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
⚙️ How to set it💡 What Is a Trailing Stop-Loss?🎯 The 5 Types of Trailing Stop-Loss📌 Important NotesDisable Trailing Stop-LossBreakeven PriceAutomated Leverage Adjustments- All Collections
- Trading Configurations
- Trading Configuration - Stop
- Trailing Stop-loss
# Trailing Stop-loss
How to use trailing stop-loss on your trading bots, to lock profits as prices move in your favor
Written by Hadar Cornix Updated over 9 months agoTable of contents
⚙️ How to set it💡 What Is a Trailing Stop-Loss?🎯 The 5 Types of Trailing Stop-Loss📌 Important NotesDisable Trailing Stop-LossBreakeven PriceAutomated Leverage Adjustments
# ⚙️ How to set it
Signals Bots Page > Create/ Edit > Advanced Settings (at the right bar) > 'Stop' Section > Leveraged Trailing > Personal > Choose 'Type' and 'Trigger' > Save Changes.
#
💡 What Is a Trailing Stop-Loss?
The goal of the Trailing Stop-loss is to help you secure and lock in profits made in trades managed by the Cornix trading bot. The trailing stop is a great tool when used correctly so you should try to familiarize yourself with all 5 different trailing stop types our bot offers:
-
Breakeven
-
Moving Target
-
Moving 2-Target
-
Percent Below Triggers
-
Percent Below Highest
The difference between the trailing take-profit/entry and the trailing stop is that the two former trailing types are activated on the order that is reached only, while the trailing stop is activated on the rest of the amount that is left in the trade.
​
Here you can view a quick video example of how the Trailing Stop-Loss works:

# 🎯 The 5 Types of Trailing Stop-Loss
Each stop type has to have a trigger. Only when the trigger is met, the trailing will come into place. The available triggers are mentioned for each stop type below:
-
## Breakeven:
This trailing stop type will move your stop to the average entry price once the trigger is reached. This stop type can be triggered by choosing a certain target or after passing a certain percent above the entry weighted average.
-
## Moving Target:
When using this type of trailing stop, if triggered, the bot will move your stop to the price of the previous target. If triggered on the first take-profit target, then the stop will be moved to the breakeven entry price, when the second take-profit target is reached the stop will be moved to the first take-profit target price, and so on. This stop type can only be triggered by choosing a certain target, while the default trigger is the first take-profit target.
-
## Moving 2-Target:
This type of trailing stop is similar to Moving Target, but in this case, the bot will move your stop price according to 2 targets back instead of one back. This stop type can only be triggered by choosing a certain target, starting from the second take profit, which is also the default trigger.
More specifically, if triggered, when the second take-profit target is reached the stop will be moved to the breakeven entry price and when the third take-profit target is reached the stop will be moved to the first take-profit target price, and so on.
-
## Percent Below Triggers:
Using this trailing stop, when triggered, the bot will move the stop to the specified percent below the trigger that is reached. This stop type can be triggered by choosing a certain target or after passing a certain percentage above the average entry price.

-
## Percent Below Highest:
In this case, when triggered, the bot will move the stop to the specified percentage below the trigger that is reached and will keep trailing that same distance below the maximum price that is reached. This stop type can be triggered by choosing a certain target or after passing a certain percentage above the entry.


# 📌 Important Notes
## Disable Trailing Stop-Loss
You can select to disable the trailing stop by selecting the “Off” option in your Leveraged Trailing Stop Loss configuration.

## Breakeven Price
When using Breakeven, Moving Target, or Moving 2-Target trailing types, the breakeven price is calculated only from the filled entry orders — not pending ones.

## Automated Leverage Adjustments
For automated trades with leverage, Cornix automatically adjusts any percentage-based trailing values (except triggers) by dividing them by your trade's leverage, to keep your effective percentage settings.
→ Learn more: Automated Configuration Leverage Adjustment.


Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"5814874","anonymous_id":"44282064-0b80-4a43-95fe-dc25984abe0b"};
(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/wrsw0nb0';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n<!-- Image description: The screenshot shows the **"Stop" tab** of the Cornix trading bot’s settings interface, with a focus on stop-loss and trailing stop configurations. The UI includes tabs (General, Entries, Take-Profits, Stop, Advanced) at the top, and within the "Stop" section, toggles for "Stop" (Off/Channel/Personal), "Stop-Loss Timeout" (Off/Personal), and a highlighted "Leveraged Trailing" section (set to "Personal") with sub-options like "Type" (dropdown: "Moving Target") and "Trigger" (#1). A blue arrow points to the "Leveraged Trailing" toggle, emphasizing its active "Personal" state. -->
![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1431730422/38ff4da27beb75a1238b848583ed/image.png?expires=1772540100&amp;signature=8b00c4c64176b55bdf107ea5c1096caf406fdfc63b6116ff2d59afe04e4a7714&amp;req=dSQkF859nYVdW%2FMW1HO4zZhoamxaR2OeShdeND1yu516yzZj1j%2FGLLGOTBWG%0ACvbeBJq7PtSno7WBYuo%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1431730422/38ff4da27beb75a1238b848583ed/image.png?expires=1772540100&amp;signature=8b00c4c64176b55bdf107ea5c1096caf406fdfc63b6116ff2d59afe04e4a7714&amp;req=dSQkF859nYVdW%2FMW1HO4zZhoamxaR2OeShdeND1yu516yzZj1j%2FGLLGOTBWG%0ACvbeBJq7PtSno7WBYuo%3D%0A\n\n**Описание:** The screenshot shows the **"Stop" tab** of the Cornix trading bot’s interface, with a top navigation bar containing tabs like *General, Entries, Take-Profits, Stop, Advanced* (the "Stop" tab is active). Below, the "Stop" section has toggle options (*Off, Channel, Personal*) and fields for *Stop-Loss Distance Percent* (set to 10%) and *Stop-Loss Baseline* (dropdown: "Average Entries"). A blue-highlighted section labeled **"Leveraged Trailing"** (with *Off, Channel, Personal* toggles, "Personal" selected) includes sub-fields: *Type* (dropdown: "Moving Target"), *Trailing Percent*, *Trigger* (set to "#1"), and a checkbox for "Only use if not defined by group." An arrow points to the "Leveraged Trailing" section, emphasizing it.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow holding a small yellow object (likely a coin) in its beak, perched above the brand name “cornix” in bold, dark blue lowercase letters. The design is minimalistic, with the crow and text centered against a plain white background, emphasizing the brand’s identity.\n\n---\n\n### Изображение 3\n\n![Image 3](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a clean, minimalistic design. Key UI elements include a navigation bar (likely for account, settings, or bot management), a central area displaying trading metrics (e.g., profit/loss, trade history), and possibly a sidebar for bot configuration or market data. The layout emphasizes clarity, with distinct sections for monitoring and controlling automated trading activities.\n\n---\n\n
