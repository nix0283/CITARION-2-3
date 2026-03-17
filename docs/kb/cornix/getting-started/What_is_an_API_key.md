# What is an API key?

**URL:** https://help.cornix.io/en/articles/5814843-what-is-an-api-key

**Created:** 2026-03-03T11:40:22+00:00

---

What is an API key? | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
What is an API key?How Does It Work?Key Permissions & Restrictions❗Important Note- All Collections
- Getting Started
- Accounts (Clients)
- What is an API key?
# What is an API key?
What an API key is and permissions, and how it enables secured connection with your exchange
Written by Dor Updated over 8 months agoTable of contents
What is an API key?How Does It Work?Key Permissions & Restrictions❗Important Note
An API key is a unique identifier that allows Cornix to access your Exchange Account (Binance, ByBit, etc) programmatically and perform actions on your behalf.

# What is an API key?
An API is an acronym for Application Programmatic Interface which is basically the functions and procedures by which two applications (or two pieces of software) can talk to each other. In this case, the API we are referring to is the one that allows Cornix to programmatically communicate with one of the cryptocurrency exchanges (ones like Binance, ByBit, BitMEX, etc.) Cornix uses the exchange API in order to perform actions like:
-
Place new orders.
-
Check the existing order status.
-
Update orders.
-
Check portfolio balance.
-
And more...

# How Does It Work?
Whenever you log in to the exchange website, you need to provide your email (or username) and password. Similarly, when Cornix accesses the exchange API programmatically it needs to provide credentials that will grant it permissions to perform actions on your behalf.
To avoid making you share personal details like your email address and more importantly your password with other services, exchanges will instead allow you to create an API key (similar to an email address) and API secret (similar to a password) which will be tied to your account and can be used when accessing your exchange account programmatically.

In some cases, exchanges add additional layers of security on top of the API key and secret, similar to providing a 2-factor authentication code after entering the email and password. Those extra details would have to be provided to Cornix alongside the API key and secret for the client to be created successfully in the Cornix system.

# Key Permissions & Restrictions
To keep your account safe, when creating the API key in your exchange account you will be able to specify API restrictions. These parameters can restrict the API key so it can only perform specific actions in your account.
The following is an example of what the API restrictions section looks like in the Binance exchange:


In order for the bot to trade on your behalf, Cornix will always require reading and trading permissions.
Reading permissions will allow Cornix to read your portfolio and existing order status. Trading permissions will allow Cornix to create, update and cancel orders in your exchange account.
In some cases, additional permissions may be required, like the Futures permission in case you wish to trade Futures using Cornix.

## ❗Important Note
In all cases, it's important to pay special attention that the withdrawal permission is not enabled. This will provide an added layer of defense to your account and will make sure no one can use the API to withdraw funds from your account.

For more information about generating specific API keys in the different exchanges Cornix supports, please visit the How to Create API Keys section.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"5814843","anonymous_id":"d7058201-ac2d-46bf-b02a-e99ad408c0b0"};
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
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n![Image 1](https://cornix.intercom-attachments-1.com/i/o/434792211/321539b3d1b27d4b9796f2c9/Screen_Shot_2021-02-08_at_10.21.07_AM.png?expires=1772539200&amp;signature=8b99e076f2ee291d5e362881f7dacd19b09b115700c573f584dc0778e3247954&amp;req=cCMjEcB8n4BeFb4f3HP0gPRbtn4MQy8KmiSD512nWI%2BeEK0BhNHmrOoi8mTV%0AzFF%2BSAfKruuB2slPYg%3D%3D%0A)\n\n**URL:** https://cornix.intercom-attachments-1.com/i/o/434792211/321539b3d1b27d4b9796f2c9/Screen_Shot_2021-02-08_at_10.21.07_AM.png?expires=1772539200&amp;signature=8b99e076f2ee291d5e362881f7dacd19b09b115700c573f584dc0778e3247954&amp;req=cCMjEcB8n4BeFb4f3HP0gPRbtn4MQy8KmiSD512nWI%2BeEK0BhNHmrOoi8mTV%0AzFF%2BSAfKruuB2slPYg%3D%3D%0A\n\n**Описание:** The screenshot shows a section titled "API restrictions" with a grid of checkboxes for configuring trading permissions. Checked options include "Enable Reading," "Enable Spot & Margin Trading," and "Enable Futures," while unchecked options are "Enable Margin," "Enable Withdrawals," "Permits Universal Transfer," and "Enable Vanilla Options."\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1431597370/5aab652abeaaf2b4f07e0b421206/image.png?expires=1772539200&amp;signature=e23ad21c0495fff3fe1fdcc7fe2352d58d9fb0e32b46d7d3b61fb74985bed15f&amp;req=dSQkF8x3moJYWfMW1HO4zXhBgizuPSUT1RgMsfPY8814ahtb2uHbBnzV0ZL3%0AtXKnfnqSZAHWbZWwJII%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1431597370/5aab652abeaaf2b4f07e0b421206/image.png?expires=1772539200&amp;signature=e23ad21c0495fff3fe1fdcc7fe2352d58d9fb0e32b46d7d3b61fb74985bed15f&amp;req=dSQkF8x3moJYWfMW1HO4zXhBgizuPSUT1RgMsfPY8814ahtb2uHbBnzV0ZL3%0AtXKnfnqSZAHWbZWwJII%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with input fields for "Account Name" (pre-filled with "My Account"), "API Key", and "API Secret", each with blue arrows pointing to them. Below, there’s a text box displaying IP addresses with a "Copy" button, an informational note about adding IPs to Binance’s trusted list, and a blue "Connect" button at the bottom.\n\n---\n\n### Изображение 3\n\n![Image 3](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue raven (crow) holding a small yellow object in its beak, perched on a curved line above the bold, dark blue text “cornix.” The design is clean and minimalistic, with the logo centered against a plain white background, emphasizing the brand’s visual identity.\n\n---\n\n### Изображение 4\n\n![Image 4](https://static.intercomassets.com/avatars/4586445/square_128/Screen_Shot_2022-02-06_at_2.34.28_PM-1644150878.png)\n\n**URL:** https://static.intercomassets.com/avatars/4586445/square_128/Screen_Shot_2022-02-06_at_2.34.28_PM-1644150878.png\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a user profile section at the top left, featuring a circular profile picture of a person in a gray shirt against a background with rocks and a tree. The main area likely displays trading bot controls or settings, though specific UI elements like buttons, charts, or input fields aren’t visible in the provided portion.\n\n---\n\n
