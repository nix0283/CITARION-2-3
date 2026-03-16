# Group Trading Configuration - Telegram Bot Interface

**URL:** https://help.cornix.io/en/articles/9796039-group-trading-configuration-telegram-bot-interface

**Created:** 2026-03-03T11:56:08+00:00

---

Group Trading Configuration - Telegram Bot Interface | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
Accessing the Trading ConfigurationDefault and Custom ConfigurationsDefault SettingsCustom Settings- All Collections
- Channel Admins
- Group Trading Configuration - Telegram Bot Interface
# Group Trading Configuration - Telegram Bot Interface
How to set your channel's trading configuration through your Telegram admin panel
Written by Hadar Cornix Updated over 9 months agoTable of contents
Accessing the Trading ConfigurationDefault and Custom ConfigurationsDefault SettingsCustom Settings
The Group's Trading Configuration in Cornix allows the group's admin to define specific settings for how signals are managed and executed within the channel. This includes defining the signal amount per trade, trailing, entry, and take profit strategies.

# Accessing the Trading Configuration
-
Navigate to the Bot's Admin Panel.
-
Go to Groups and select the desired group.
-
Click on Trading Configuration.
-
Choose between Leverage or Non-Leverage Exchanges.


While both Leverage and Non-Leverage setups have similar contents, they are designed for distinct strategies, ensuring that different signal types are handled appropriately.
# Default and Custom Configurations
## Default Settings
Initially, all new channels use the User’s configuration. This means trades are executed based on each user's settings.

## Custom Settings
As an admin, you have the flexibility to set some basic parameters into your signals as default and they will be applied to the user's trades unless defined otherwise by the users in their configuration (Signal Bot):

### Trailing

The trailing section allows you to set the default trailing entry, take-profit, and stop values:
-
Trailing Entry
-
Trailing Take-Profit
-
Trailing Stop-loss
### Strategy

Cornix offers a variety of different Entry and Take-Profit strategies by default, but you can also create custom strategies. The strategies section allows setting:
-
Entry Strategy - will determine the percentage of the trade amount that will be bought for each Entry target.
-
Entry Zone - set the default number of targets to be used when a signal is posted with an entry zone instead of targets with specific prices.
-
Take-profit Strategy - will determine the percentage of the trade amount that will be sold for each Take Profit target.
### Amount Per Trade

The Amount per Trade can be configured based on one of the following options and is limited to up to 5% for both options:
Percentage
The percentage option will take a flat-out percentage out of your account's both available and open trades amount of the coin/contract that you are buying with.

For example, let's say you have a portfolio of 1 ETH and 1000 USDT (500 available USDT and 500 USDT in use in open trades).

If you open a trade for a pair in which USDT is the coin that you will buy with and choose to use a 10% amount per trade, then the bot will open a trade in size of 100 USDT (10% out of your total USDT portfolio amounts - both available and in use in open trades).
Risk Percentage
Risk Percentage will enable you to use, in each trade, the amount you are willing to risk out of the traded coin portfolio value. If you hit your stop-loss, you will lose the amount that is equal to the percentage that you chose to risk out of your traded pair portfolio value. This method can be used for effective risk management.

It takes into consideration the potential loss of the trade (the distance from the entry price to the stop-loss price), then calculates the number of coins\contracts to be used in the trade. (Read more).
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"9796039","anonymous_id":"eef4fc26-7bf4-4e8b-848e-7415d02925db"};
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
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n![Image 1](https://downloads.intercomcdn.com/i/o/1161227321/2798a326ab7f762996198ad9/Screen+Shot+2024-08-28+at+16_20_34.png?expires=1772541000&amp;signature=2a0a59f009364024f0fe11259d84a7423f9f98f7aa0dbf20361e2f5fdee4fa43&amp;req=dSEhF8t8moJdWPMW1HO4zSlivpl3Q4FqQZpyR5vSbGjKL6Y3A1SyyWYiUj6f%0A288f%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/1161227321/2798a326ab7f762996198ad9/Screen+Shot+2024-08-28+at+16_20_34.png?expires=1772541000&amp;signature=2a0a59f009364024f0fe11259d84a7423f9f98f7aa0dbf20361e2f5fdee4fa43&amp;req=dSEhF8t8moJdWPMW1HO4zSlivpl3Q4FqQZpyR5vSbGjKL6Y3A1SyyWYiUj6f%0A288f%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a white top section labeled "Admin Panel: Choose exchange." and a timestamp "15:58". Below, four green buttons are arranged in a grid: "Leverage Exchanges", "Non-Leverage Exchanges", "Main Menu" (with a home icon), and "Back" (with a left arrow icon).\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/1161228186/e18d04586073b453f112e660/Screen+Shot+2024-08-28+at+16_20_44.png?expires=1772541000&amp;signature=a07d7fdc7059ffe9b4a9c9493e9244102f1766e1a1fd7111a4b8c758d62cf40f&amp;req=dSEhF8t8lYBXX%2FMW1HO4zaVm9pbr1KOILmPsGYYPez0JY80E0b9dqM7aS30X%0AOu6VoiH3jjvBXvUsMtc%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/1161228186/e18d04586073b453f112e660/Screen+Shot+2024-08-28+at+16_20_44.png?expires=1772541000&amp;signature=a07d7fdc7059ffe9b4a9c9493e9244102f1766e1a1fd7111a4b8c758d62cf40f&amp;req=dSEhF8t8lYBXX%2FMW1HO4zaVm9pbr1KOILmPsGYYPez0JY80E0b9dqM7aS30X%0AOu6VoiH3jjvBXvUsMtc%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot’s admin panel with a white text box titled “Admin Panel” displaying the current configuration (trailing, entry, take - profit, and amount settings) and a “Choose an option” prompt. Below, there are green buttons for “Trailing,” “Strategy,” “Amount per Trade,” “Main Menu,” and “Back,” with the time “15:58” in the top - right of the text box.\n\n---\n\n### Изображение 3\n\n![Image 3](https://downloads.intercomcdn.com/i/o/1161228584/605fcfd45e73fbf088566b4a/Screen+Shot+2024-08-28+at+16_20_54.png?expires=1772541000&amp;signature=685fdbb1d06c4e97a03c5ee987acf2e803b5b181cee03b17ae73045befb30701&amp;req=dSEhF8t8lYRXXfMW1HO4zaoxleHjzbPYKVfm70WF6r%2B6k0i1%2Bwf4wMwB6NTE%0AJJmD0fTWA4s%2FA7Nk%2FIA%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/1161228584/605fcfd45e73fbf088566b4a/Screen+Shot+2024-08-28+at+16_20_54.png?expires=1772541000&amp;signature=685fdbb1d06c4e97a03c5ee987acf2e803b5b181cee03b17ae73045befb30701&amp;req=dSEhF8t8lYRXXfMW1HO4zaoxleHjzbPYKVfm70WF6r%2B6k0i1%2Bwf4wMwB6NTE%0AJJmD0fTWA4s%2FA7Nk%2FIA%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a white header labeled "Admin Panel: Choose trailing type" and a timestamp "15:58" on the right. Below, there are green buttons: "Entry", "Take-Profit", "Stop", a "How it Works" button with a hand emoji, and two bottom buttons—"Main Menu" (with a home icon) and "Back" (with a left arrow). The background has a subtle green pattern.\n\n---\n\n### Изображение 4\n\n![Image 4](https://downloads.intercomcdn.com/i/o/1161229435/1124664cd061cc9b6024aa37/Screen+Shot+2024-08-28+at+16_21_37.png?expires=1772541000&amp;signature=0d9fbc9160253e62bdbe3061d184ae2a99dae0a6a212ad03983115b963a0c2d2&amp;req=dSEhF8t8lIVcXPMW1HO4zQQy7npBQOT3RBmwzq7s%2BcSji26mhc0nNtnOZErg%0AsPW2DNe8JIS6n21h%2Bis%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/1161229435/1124664cd061cc9b6024aa37/Screen+Shot+2024-08-28+at+16_21_37.png?expires=1772541000&amp;signature=0d9fbc9160253e62bdbe3061d184ae2a99dae0a6a212ad03983115b963a0c2d2&amp;req=dSEhF8t8lIVcXPMW1HO4zQQy7npBQOT3RBmwzq7s%2BcSji26mhc0nNtnOZErg%0AsPW2DNe8JIS6n21h%2Bis%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface focused on configuring the "Amount per Trade" setting, with a header asking how to choose the trade amount. Below, there are two main green buttons labeled "Percentage" and "Risk Percentage," plus a "How it Works" button with a hand emoji, and navigation buttons for "Main Menu" and "Back" at the bottom. The time "15:58" is displayed in the top-right corner.\n\n---\n\n### Изображение 5\n\n![Image 5](https://downloads.intercomcdn.com/i/o/1161230222/4a4457d791bbb6e67a3c42ef/Screen+Shot+2024-08-28+at+16_21_12.png?expires=1772541000&amp;signature=be9f0d08bf28eb7ffc39978e00c0b26d91e62201dc5b581e14eff3fc0f0e7568&amp;req=dSEhF8t9nYNdW%2FMW1HO4zZlCKJO4lcQ6edtC8CtWfrwRFNgJ97bQkM4i0%2BEB%0AYt310LU14Cjw%2FFxeiJo%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/1161230222/4a4457d791bbb6e67a3c42ef/Screen+Shot+2024-08-28+at+16_21_12.png?expires=1772541000&amp;signature=be9f0d08bf28eb7ffc39978e00c0b26d91e62201dc5b581e14eff3fc0f0e7568&amp;req=dSEhF8t9nYNdW%2FMW1HO4zZlCKJO4lcQ6edtC8CtWfrwRFNgJ97bQkM4i0%2BEB%0AYt310LU14Cjw%2FFxeiJo%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a white header displaying "Admin Panel: Choose strategy type" and a timestamp "15:58". Below, four green buttons are arranged in a grid: "Entry", "Take-Profit", a "How it Works" button with a hand emoji, and two navigation buttons ("Main Menu" with a home icon, "Back" with a left arrow).\n\n---\n\n### Изображение 6\n\n![Image 6](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow holding a yellow object (likely a coin) in its beak, perched above the brand name “cornix” in bold, dark blue lowercase letters. The design is clean and minimalistic, with the crow and text centered on a white background, emphasizing the brand’s visual identity.\n\n---\n\n### Изображение 7\n\n![Image 7](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a clean, minimalistic design. Key UI elements include a sidebar with navigation icons (e.g., home, settings, notifications), a central dashboard displaying trading metrics (e.g., profit/loss, active bots), and a top bar with user profile and account details. The layout emphasizes clarity, with sections for bot management, strategy settings, and real-time performance tracking.\n\n---\n\n
