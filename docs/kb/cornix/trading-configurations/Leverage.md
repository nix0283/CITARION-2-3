# Leverage

**URL:** https://help.cornix.io/en/articles/5814858-leverage

**Created:** 2026-03-03T11:48:11+00:00

---

Leverage | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
Setting Leverage (Margin) Configuration:Available Leverage Settings: 1. Global SettingsCustomizing Your Global Settings 2. Custom Symbols How to Set a Custom SymbolReview Your Custom Symbols Resetting Symbols to Global Settings ℹ️ What Does the Globe 🌐 Icon Mean? - All Collections
- Trading Configurations
- Trading Configuration - General
- Leverage
# Leverage
Learn how to configure and customize leverage settings for your Signals Bot
Written by Hadar Cornix Updated over 10 months agoTable of contents
Setting Leverage (Margin) Configuration:Available Leverage Settings: 1. Global SettingsCustomizing Your Global Settings 2. Custom Symbols How to Set a Custom SymbolReview Your Custom Symbols Resetting Symbols to Global Settings ℹ️ What Does the Globe 🌐 Icon Mean?
When setting your Signals Bot, you can choose your desired Margin Type (Isolated/ Cross) and Leverage Multiplier for each symbol that is available on the specified exchange.
Note: In some of the exchanges, the leverage multiplier is set the same for all symbols and cannot be customized.

# Setting Leverage (Margin) Configuration:
By default, the leverage configuration of your Signals Bot is set to 'Channel'. Meaning, all of the leverage settings will be copied directly from the signal that was sent on the channel.

To personally adjust your Leverage Configuration, create/ edit a bot > Choose 'Advanced Settings' on the right bar (if not enabled already) > General > Leverage > Click 'Personal'.

# Available Leverage Settings:
When setting the leverage configuration for your bot, you can change each parameter separately by choosing a personal Margin Type and personal Multiplier.
-
Margin Type: Cross/ Isolated (Learn More)
​
-
Multiplier: Up to X/ Exactly X
​
If you choose "Up to X" it means that if the signal's leverage multiplier was lower than your settings, the bot will take the signal's leverage. And if it was higher than your settings, the bot will choose your multiplier to open the trade.
Accordingly, if you choose "Exactly X", the bot will always take your multiplier settings over the signal's.


### There are 2 ways to set your leverage configuration:
-
Set a Global Leverage Configuration for all symbols.
-
Setting a Custom Leverage Configuration for different symbols.
#
# 1. Global Settings
The Global Settings is a leverage configuration that will apply for all existing symbols, as well as new symbols that will be added on the exchange in the future.

By default, your Global Settings will be set to 'Channel'. Meaning, they follow the channel's leverage configuration, as it was configured on the signal.


## Customizing Your Global Settings
If you wish to set your own global leverage settings, just make sure to stand under the 'Global Settings' line, with no symbol marked on the list, and set your desired global configuration.


# 2. Custom Symbols
Even when your global settings are set to 'Channel', or to any other global Margin type and multiplier, you can still set 'Custom Symbols'. Meaning the specific symbols that you set differently, will have their own leverage configuration.

​Important ​Notes:
-
When choosing all symbols using the 'Select All' button, you basically set all symbols as 'Custom Symbols'. When using this option, your custom settings will only apply for the symbols that are currently on the list, and will not apply for new symbols that will be added to the exchange in the future.
-
If your selected leverage settings aren't available for all symbols, the bot will automatically apply the maximum allowed multiplier for those specific symbols.

## How to Set a Custom Symbol
Choose the relevant symbols and click on the checkbox next to it. Once checked, the symbol's leverage settings bar will appear. Choose the settings for this symbol. and click 'Ok' to save.


## Review Your Custom Symbols
In order to easily track and manage your custom symbols at any time, click the 'Show Custom Symbols' toggle. You'll then see the list of your custom symbols, and have the option to edit the configuration, or to set it back to your Global Settings by clicking 'Reset to Global'.


Once your Global Settings multiple different configurations for different symbols, your signals bot's leverage preview will show 'Multiple Leverages'


## Resetting Symbols to Global Settings
If you set any custom leverage configurations for some of the symbols, and wish to reset these configurations, you can either choose the relevant symbols you want to reset, or choose 'All Symbols', and click 'Reset to Global'.



# ℹ️ What Does the Globe 🌐 Icon Mean?
A configuration with the globe icon next to it is part of your Global Settings. This means that if you change your Global Settings at any time, the configuration will update accordingly.
A configuration without the globe icon is a custom configuration, and it will not change when Global Settings are changed.

❗To explain this, we’ll use the example of a configuration set to 'Channel':
-
When a symbol is set to 'Channel' and displays the globe 🌐 icon, it means the symbol is included in your Global Settings, which are currently following the channel's leverage configuration. If the Global Settings change, this symbol’s configuration will update accordingly.
-
When a symbol is set to 'Channel' without the globe icon, it’s not linked to your Global Settings. Changing the Global Settings will not affect this symbol, and it will continue using the channel’s leverage configuration.



Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"5814858","anonymous_id":"269ad2eb-3152-4243-be06-4ded1e062a24"};
(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/wrsw0nb0';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n<!-- Image description: The screenshot shows a **Margin settings modal** for the Cornix Signals Bot, with a "Show Custom Symbols" toggle (enabled) highlighted by an arrow. The modal includes tabs ("Global Settings," "Channel"), symbol selection (1 selected: BTC/USDT), margin type ("Cross"), multiplier ("Up to 5x"), and action buttons ("Cancel," "Apply," "OK"). The background reveals the bot’s main UI (bot name, signals group, amount per trade) and a "Most Traded Pairs" section. -->
![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1535659243/730b1014cfe9a67a11915b885e80/image.png?expires=1772540100&amp;signature=998b499ac3719f0ae8ac30ca7a65218bd49aa92dfa4f50fde518862d6506976e&amp;req=dSUkE897lINbWvMW1HO4zVOxBRUJqmoYef1zXMphXvBQQvJocphAeZDZnuZU%0Af7kFciKlmViCC4THkbQ%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1535659243/730b1014cfe9a67a11915b885e80/image.png?expires=1772540100&amp;signature=998b499ac3719f0ae8ac30ca7a65218bd49aa92dfa4f50fde518862d6506976e&amp;req=dSUkE897lINbWvMW1HO4zVOxBRUJqmoYef1zXMphXvBQQvJocphAeZDZnuZU%0Af7kFciKlmViCC4THkbQ%3D%0A\n\n**Описание:** The screenshot shows the Cornix trading bot’s configuration interface, with a top navigation bar (General, Entries, Take-Profits, Stop, Advanced) and sections for bot name, signals group, account, symbols, trade amount, direction, and a highlighted “Leverage” field (with “Channel” and “Personal” options). A blue arrow points to the leverage section, emphasizing its selection.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1535661560/896132f4f01dd89352a930e9593b/image.png?expires=1772540100&amp;signature=5db863b7eb15f76efc2e2a0b13d1261853578bfded10d77fe25a93714e508c4b&amp;req=dSUkE894nIRZWfMW1HO4zbhze4BCr2vsnMnv5cFmPWzHZjCm9BJlkWXauwt0%0Al6cudaI%2BFQIcZvFpQqs%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1535661560/896132f4f01dd89352a930e9593b/image.png?expires=1772540100&amp;signature=5db863b7eb15f76efc2e2a0b13d1261853578bfded10d77fe25a93714e508c4b&amp;req=dSUkE894nIRZWfMW1HO4zbhze4BCr2vsnMnv5cFmPWzHZjCm9BJlkWXauwt0%0Al6cudaI%2BFQIcZvFpQqs%3D%0A\n\n**Описание:** The screenshot shows a "Margin" configuration modal for the Cornix trading bot, with a blue arrow pointing to the "Channel" tab under "Global Settings." The modal includes tabs for "Margin Type" (Channel/Personal) and "Multiplier" (Channel/Personal), a "Symbols" section with a "Select all" option, a list of trading pairs (e.g., 1000000MOG/USDT, 1000BONK/USDC) each with a "Channel" label, and action buttons ("Cancel," "Apply," "OK") at the bottom.\n\n---\n\n### Изображение 3\n\n![Image 3](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1535670988/f075e3634ea0a3372d065f18ad93/image.png?expires=1772540100&amp;signature=340b3ee06670a0ad985091ba8e892564fb52de7d4b40507ec34dd19c7d5c50c4&amp;req=dSUkE895nYhXUfMW1HO4zeFBG5bEoN0Ounv7hN5fGnkv%2FyK9Wt9TIYzp5LEY%0AeAIOcITvRFJl2rdMYi8%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1535670988/f075e3634ea0a3372d065f18ad93/image.png?expires=1772540100&amp;signature=340b3ee06670a0ad985091ba8e892564fb52de7d4b40507ec34dd19c7d5c50c4&amp;req=dSUkE895nYhXUfMW1HO4zeFBG5bEoN0Ounv7hN5fGnkv%2FyK9Wt9TIYzp5LEY%0AeAIOcITvRFJl2rdMYi8%3D%0A\n\n**Описание:** The screenshot shows a "Margin" configuration modal for the Cornix trading bot, with a "Symbols" section listing tradable pairs (e.g., BTC/USDT, BSW/USDT) and a blue-highlighted row for **BTC/USDT** (checked, showing "Cross - Up to 5x" settings). The modal includes tabs ("Global Settings", "Channel"), toggles (e.g., "Show Custom Symbols"), dropdowns (Margin Type: "Cross", Multiplier: "5x"), and action buttons ("Cancel", "Apply", "OK").\n\n---\n\n### Изображение 4\n\n![Image 4](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1535673585/9df5103a0efec647a6bb9c922874/image.png?expires=1772540100&amp;signature=d92dcb969a065233c343d6a58f3bb7c752a5b72fc4d6ac9f233d247dcc53299c&amp;req=dSUkE895noRXXPMW1HO4zapu8mMPi%2B60sN2RbCWFIE2jzXciIFObIxB8IO7V%0A3Qy1TZ%2FKAA6lOWMRQyI%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1535673585/9df5103a0efec647a6bb9c922874/image.png?expires=1772540100&amp;signature=d92dcb969a065233c343d6a58f3bb7c752a5b72fc4d6ac9f233d247dcc53299c&amp;req=dSUkE895noRXXPMW1HO4zapu8mMPi%2B60sN2RbCWFIE2jzXciIFObIxB8IO7V%0A3Qy1TZ%2FKAA6lOWMRQyI%3D%0A\n\n**Описание:** The screenshot shows a "Margin" configuration modal for the Cornix Signals Bot, with a blue arrow pointing to a toggle switch labeled "Show Custom Symbols" (currently enabled). The modal includes tabs for "Global Settings" and "Channel," dropdowns for "Margin Type" (set to "Cross") and "Multiplier" (set to "Up to 5x"), a search bar for symbols (showing "USDT (1)"), and a checked checkbox for "BTC/USDT" with a summary "Cross - Up to 5x" below it. Action buttons ("Cancel," "Apply," "OK") appear at the bottom, with the modal overlaying a blurred background of the main Cornix interface.\n\n---\n\n### Изображение 5\n\n![Image 5](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1535677407/4cd6125429f24ce4a73cf5f6a6a6/image.png?expires=1772540100&amp;signature=fe48a69aae65eedfd2b802c69f7fd7e18a64acfd49214cb98f41a9dd4eea575c&amp;req=dSUkE895moVfXvMW1HO4zbrppiM9JWTai8T5MgGAp2oUqmxFZ5FPBJxrfRQa%0AmHtejUszfRx87yxtkp8%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1535677407/4cd6125429f24ce4a73cf5f6a6a6/image.png?expires=1772540100&amp;signature=fe48a69aae65eedfd2b802c69f7fd7e18a64acfd49214cb98f41a9dd4eea575c&amp;req=dSUkE895moVfXvMW1HO4zbrppiM9JWTai8T5MgGAp2oUqmxFZ5FPBJxrfRQa%0AmHtejUszfRx87yxtkp8%3D%0A\n\n**Описание:** The screenshot shows a "Margin" configuration popup window for the Cornix trading bot, with tabs for "Global Settings" and "Channel" at the top. The interface displays a list of trading symbols (e.g., 1000000MOG/USDT, 1000BONK/USDC) with checkboxes, alongside controls for "Symbols" (showing "449 Selected"), "Margin Type" (set to "Personal"), and "Multiplier" (also "Personal"). At the bottom are "Cancel", "Apply", and "OK" buttons, with blue arrows pointing to the "Reset to Global" button and the symbol list.\n\n---\n\n### Изображение 6\n\n![Image 6](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1535681626/45a70b4ab43c0d77917d2b184c37/image.png?expires=1772540100&amp;signature=dbe23b8309a2d3cf92ef4cabda570e6aa397ce9d9fa41831eb1992c58e38e35b&amp;req=dSUkE892nIddX%2FMW1HO4zad3uo53qxcz%2FZRqa2LPV5NxBqmWPgSEt2YnrcD6%0AhBLqJXQgcqGS45ieKI4%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1535681626/45a70b4ab43c0d77917d2b184c37/image.png?expires=1772540100&amp;signature=dbe23b8309a2d3cf92ef4cabda570e6aa397ce9d9fa41831eb1992c58e38e35b&amp;req=dSUkE892nIddX%2FMW1HO4zad3uo53qxcz%2FZRqa2LPV5NxBqmWPgSEt2YnrcD6%0AhBLqJXQgcqGS45ieKI4%3D%0A\n\n**Описание:** The screenshot shows a "Margin" configuration modal for the Cornix trading bot, with tabs for "Global Settings" and "Isolated - Up to 5x" (selected). The UI includes dropdowns for "Margin Type" (set to "Isolated") and "Multiplier" (set to "5"), a "Symbols" section with checkboxes for trading pairs (e.g., "1000000MOG/USDT"), and action buttons ("Cancel," "Apply," "OK"). A toggle for "Show Custom Symbols" and a "Select all" option are also visible.\n\n---\n\n### Изображение 7\n\n![Image 7](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1535716430/38f42020568efaab8d2713c613d1/image.png?expires=1772540100&amp;signature=c3c5817aed1e6f92758a0c04ceffbc48c0818e70ddc89b46942ad1faea90510d&amp;req=dSUkE85%2Fm4VcWfMW1HO4zdFYye8I2yMrZFOI84Di8ntBL0FJhDHrHyT7Ai48%0AcoA1oRUyvbWBACmfqcI%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1535716430/38f42020568efaab8d2713c613d1/image.png?expires=1772540100&amp;signature=c3c5817aed1e6f92758a0c04ceffbc48c0818e70ddc89b46942ad1faea90510d&amp;req=dSUkE85%2Fm4VcWfMW1HO4zdFYye8I2yMrZFOI84Di8ntBL0FJhDHrHyT7Ai48%0AcoA1oRUyvbWBACmfqcI%3D%0A\n\n**Описание:** The screenshot shows a **Margin** configuration modal window for the Cornix trading bot, with tabs for *Global Settings* (selected) and *Channel*. The UI displays a list of trading symbols (e.g., 1000CAT/USDT, 1000CHEEMS/USDT) with checkboxes, a "Show Custom Symbols" toggle, and two configuration options—"Using Global Settings" and "Using Only Channel’s Config"—each linked to a "Channel" button. At the bottom, there are "Cancel," "Apply," and "OK" action buttons.\n\n---\n\n### Изображение 8\n\n![Image 8](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1535849476/22ab080094d5a856b8be4a1cf1b0/image.png?expires=1772540100&amp;signature=dca1d7364ca9eb9176f793d03b4a1be1a275df5030247f712ab1212a814dbc22&amp;req=dSUkE8F6lIVYX%2FMW1HO4zRcrFSlQ89FziszLFSxRsHiPonAc2zCaq6m9wmGp%0AdOWhNDzJ1PD2WJUIURs%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1535849476/22ab080094d5a856b8be4a1cf1b0/image.png?expires=1772540100&amp;signature=dca1d7364ca9eb9176f793d03b4a1be1a275df5030247f712ab1212a814dbc22&amp;req=dSUkE8F6lIVYX%2FMW1HO4zRcrFSlQ89FziszLFSxRsHiPonAc2zCaq6m9wmGp%0AdOWhNDzJ1PD2WJUIURs%3D%0A\n\n**Описание:** The screenshot shows the "General" tab of the Cornix trading bot interface, displaying fields for "Bot Name" (set to "Cornix Signals Demo Signals Bot"), "Signals Group" (with a dropdown for "Cornix Signals Demo" and a "Missing a Group?" link), "Account" (dropdown for "My Binance - Futures"), "Symbols" (with an emoji-labeled dropdown), "Amount Per Trade" (USD input with "Fixed Usd Amount" dropdown), "Direction" (toggles for "Long" and "Short"), and "Leverage" (with "Channel" and "Personal" buttons, plus a "Multiple Leverages" section). Blue arrows highlight the "Personal" leverage button and "Multiple Leverages" area.\n\n---\n\n### Изображение 9\n\n![Image 9](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1535959327/a8b1a5b606ae34967d2b5927dadf/image.png?expires=1772540100&amp;signature=b8519494c0622878d10291560e327433602a98afeea5972ad758ba0353a18798&amp;req=dSUkE8B7lIJdXvMW1HO4zVKsX6WdYNPSF2m7cRAS04iy3mpcCNjSRwFM31Lk%0ALYqLg3q3SYkQgvVzszQ%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1535959327/a8b1a5b606ae34967d2b5927dadf/image.png?expires=1772540100&amp;signature=b8519494c0622878d10291560e327433602a98afeea5972ad758ba0353a18798&amp;req=dSUkE8B7lIJdXvMW1HO4zVKsX6WdYNPSF2m7cRAS04iy3mpcCNjSRwFM31Lk%0ALYqLg3q3SYkQgvVzszQ%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a "Margin" settings modal open, featuring two main sections: "Global Settings" (with tabs for "Global Settings" and "Channel," plus dropdowns for Margin Type, Multiplier, and other parameters) and "Custom Settings" (displaying a list of trading symbols like "1000000MOG/USDT" with checkboxes and "Channel" labels). At the bottom, there are "Cancel," "Apply," and "OK" buttons to confirm changes.\n\n---\n\n### Изображение 10\n\n![Image 10](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1535968313/1499bde9ef3f1dadb62499cc1d3d/image.png?expires=1772540100&amp;signature=51dfd92957124a19862b9bda62d9e9aec02c2badefb552156d11eb414adde540&amp;req=dSUkE8B4lYJeWvMW1HO4zUoSU4caYwOrwK%2FYJhK93KMNpYZfbkjcjDl0LSZq%0AwrBUliZioz4icvtvc2M%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1535968313/1499bde9ef3f1dadb62499cc1d3d/image.png?expires=1772540100&amp;signature=51dfd92957124a19862b9bda62d9e9aec02c2badefb552156d11eb414adde540&amp;req=dSUkE8B4lYJeWvMW1HO4zUoSU4caYwOrwK%2FYJhK93KMNpYZfbkjcjDl0LSZq%0AwrBUliZioz4icvtvc2M%3D%0A\n\n**Описание:** The screenshot shows a **Margin settings modal** in the Cornix trading bot, with a dropdown for "Margin Type" (set to "Isolated") and a "Multiplier" dropdown (set to "Exactly 1"). The modal includes a list of trading pairs (e.g., 1000000MOG/USDT, 1000BONK/USDC) with checkboxes, currency filters (USDT, USDC), and action buttons ("Cancel," "Apply," "OK"). The background displays the Cornix interface with tabs ("Default," "Entries," "Take-Profit") and a "Bot Name" field.\n\n---\n\n### Изображение 11\n\n![Image 11](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue raven (crow) holding a small yellow object in its beak, perched on a curved line above the lowercase text “cornix” in a bold, dark blue font. The design is clean and minimalistic, with the bird and text centered against a plain white background, emphasizing the brand’s visual identity.\n\n---\n\n### Изображение 12\n\n![Image 12](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a clean, modern design. Key UI elements include a navigation bar at the top (likely with tabs or menu options), a central area displaying trading metrics or bot settings, and a sidebar or panel for additional controls or information. The layout emphasizes clarity, with distinct sections for monitoring and managing trading activities.\n\n---\n\n
