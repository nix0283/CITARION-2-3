# Setting your Cornix Account and Enable Auto-Trading (Web Registration)

**URL:** https://help.cornix.io/en/articles/5814825-setting-your-cornix-account-and-enable-auto-trading-web-registration

**Created:** 2026-03-03T11:40:02+00:00

---

Setting your Cornix Account and Enable Auto-Trading (Web Registration) | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
- Getting Started
- Setting your Cornix Account and Enable Auto-Trading (Web Registration)
# Setting your Cornix Account and Enable Auto-Trading (Web Registration)
Web Registration
Written by Hadar Cornix Updated over 3 years ago
To start the registration process from the website, click the "Register" button on our log-in page, or start a conversation directly with the bot using this link t.me/cornix_trading_bot and click the "Start" button at the bottom.

If you start directly from the bot, proceed to click the "continue on our website" button. If you wish to continue your registration directly in the Telegram bot, click the "continue here" button. For more information about the registration process in the bot, please watch our dedicated tutorial for it.


Step 1: Fill Out Your Account Information

And proceed by clicking "Submit":


Step 2: Verify Your Email Address

By filling in the verification code you received in your email:


Step 3: Link Your Telegram Account

** This step is relevant only for those who started the process directly from the website and not from the bot **

If you start the registration process from the bot, you will skip the next page and will be automatically transferred to "Step 4: Validate Your Telegram Account".

If you start the process directly from the website, click the "Get UUID" button:


Then copy the "/connect_web command, go to your conversation with the bot, click start and send it to the bot:


Step 4: Validate Your Telegram Account

Make sure the account information that is displayed corresponds to your desired Telegram account and click the "get code" button:


Go back to your conversation with the Bot to copy the security code you received:


Proceed to copy the security code you received and paste it into the website. After connecting successfully to your Telegram account, let's create your first Cornix trading account.

Step 5: Create an Exchange Account

Cornix requires access to your exchange account in order to trade on your behalf. This connection between Cornix to your exchange is called an account. We will use this connection to perform a variety of actions, like fetching your portfolio information, creating and updating orders, auto-trading based on group signals, and more.

Creating an account is a simple process that involves granting Cornix permission to access your exchange account for Trading and viewing purposes only, programmatically via an API.

1. Start by selecting the exchange you wish to trade with.


2. Proceed to select a name for your new client. This name will be used to later identify your client in the bot:


3. Lastly, provide the API key and secret key that you generated in your exchange account. Cornix will use these keys to authenticate when communicating with the exchange on your behalf.

The process to generate new API keys is slightly different depending on the selected exchange. Click for more information about how to create APIs in different exchanges, or click the "How do I create an API" link below the selected exchange.

Insert the API keys and click "Create Account":


Step 6: Enable Auto-Trading by Selecting a Channel to Follow

Continue to set your auto trading by selecting a signal channel to follow. The channels displayed are the channels you are a member of or free channels that you can easily join. If you are still not ready to set your auto trading you can click the "Skip" button and set auto trading later on.

To enable auto trading, choose the desired channel to connect to. At this stage, you can choose only one channel, though you will always be able to change or add more channels later on (Learn more on How to Join a Signals Channel).

From this point forward, your Auto-Trading is enabled. Trades will be created automatically in your account whenever a new signal is posted in the channel.

It is important to make sure you have the funds needed to trade the signals that are published in the channel you are following, and that the signals support the exchange that you connected to Cornix (Learn more).

Step 7: Import Trading Configuration

Cornix allows channel admins to share their recommended trading configuration with their users. You will only be able to see this page If your selected channel has provided a shared trading configuration.

This trading configuration will customize your trades behavior and will determine parameters like the amount you will buy or sell in each target, the trailing configuration, and the default leverage that will be used for your trades. For more information about the trading configuration please watch our dedicated "Trading Configuration Overview" tutorial.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"5814825","anonymous_id":"4f08a50e-76fc-4809-959f-65c4b18091e9"};
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
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n![Image 1](https://cornix.intercom-attachments-1.com/i/o/434791822/4f5780afda8e66f7129ffa8f/mceclip0.png?expires=1772539200&amp;signature=f7b6f9e1e848c56bd1e7ed40e80cf5ac7db23f59b6664d61e0201bcb856e839d&amp;req=cCMjEcB%2FlYNdFb4f3HP0gC73cnu6V57dfBVlNWOF%2B50p92Ek5dK4GqtBGc33%0AVZTr8TIqE3lJoV6o5w%3D%3D%0A)\n\n**URL:** https://cornix.intercom-attachments-1.com/i/o/434791822/4f5780afda8e66f7129ffa8f/mceclip0.png?expires=1772539200&amp;signature=f7b6f9e1e848c56bd1e7ed40e80cf5ac7db23f59b6664d61e0201bcb856e839d&amp;req=cCMjEcB%2FlYNdFb4f3HP0gC73cnu6V57dfBVlNWOF%2B50p92Ek5dK4GqtBGc33%0AVZTr8TIqE3lJoV6o5w%3D%3D%0A\n\n**Описание:** The screenshot shows a welcome screen for the Cornix Trading Bot, featuring a dark blue background with text explaining the bot’s crypto trading automation capabilities. UI elements include a YouTube “Cornix” video thumbnail, two “Continue” buttons (one labeled “Continue in our Website” with an arrow, another “Continue here”), and bottom buttons for “About Cornix” and “Support.”\n\n---\n\n### Изображение 2\n\n![Image 2](https://cornix.intercom-attachments-1.com/i/o/434791827/99cee713e66efff5b3fcd04a/mceclip9.png?expires=1772539200&amp;signature=9d5451c05da0fb1ffee4aa57d9abb0efe5b0bd4c6f084bfedc50c35e1aad29cc&amp;req=cCMjEcB%2FlYNYFb4f3HP0gFwcuJvKDkXThJlN%2BDhQR8gzq5UA0exQlzFV%2BPgE%0AK0i%2B7iMxSsVunR7m7Q%3D%3D%0A)\n\n**URL:** https://cornix.intercom-attachments-1.com/i/o/434791827/99cee713e66efff5b3fcd04a/mceclip9.png?expires=1772539200&amp;signature=9d5451c05da0fb1ffee4aa57d9abb0efe5b0bd4c6f084bfedc50c35e1aad29cc&amp;req=cCMjEcB%2FlYNYFb4f3HP0gFwcuJvKDkXThJlN%2BDhQR8gzq5UA0exQlzFV%2BPgE%0AK0i%2B7iMxSsVunR7m7Q%3D%3D%0A\n\n**Описание:** The screenshot shows a **Cornix registration form** with input fields for First Name, Last Name, Email (pre-filled with "Jack@gmail.com"), Confirm Email, Password (with a visibility toggle icon), and Confirm Password (also with a visibility toggle). A checkbox for "I have read the agreement" (with "agreement" as a blue hyperlink) and a blue "Submit" button are present, plus a "Login now" link for existing members.\n\n---\n\n### Изображение 3\n\n![Image 3](https://cornix.intercom-attachments-1.com/i/o/434791834/d7f46fdc77791aeb9a96bef7/mceclip0.png?expires=1772539200&amp;signature=8bd8f454e7e18da62347008accdc8eb89f3ac3539494626fb0359fa352fd06d2&amp;req=cCMjEcB%2FlYJbFb4f3HP0gKKIwWqGPNP1pAbtEnksMmu3S8Xx3654k3IYRqav%0Aoz3AA8CgLtkcDFWL9A%3D%3D%0A)\n\n**URL:** https://cornix.intercom-attachments-1.com/i/o/434791834/d7f46fdc77791aeb9a96bef7/mceclip0.png?expires=1772539200&amp;signature=8bd8f454e7e18da62347008accdc8eb89f3ac3539494626fb0359fa352fd06d2&amp;req=cCMjEcB%2FlYJbFb4f3HP0gKKIwWqGPNP1pAbtEnksMmu3S8Xx3654k3IYRqav%0Aoz3AA8CgLtkcDFWL9A%3D%3D%0A\n\n**Описание:** The screenshot shows a **"Verify Email Address"** page with a dark blue background. At the top, there’s a title and instructional text asking for a 6 - digit code received at a partially redacted email address. Below, a text field labeled "Verification Code" (with an arrow pointing to it) is paired with a "Resend Code" link on the right. A "Submit" button appears at the bottom.\n\n---\n\n### Изображение 4\n\n![Image 4](https://cornix.intercom-attachments-1.com/i/o/434791844/f0b82424d61cee36887d6b9a/mceclip10.png?expires=1772539200&amp;signature=dd858e1b75acc572b5274c99c7d29d1d38f7d5923765d4f1fefb5f6cfc2b9ddc&amp;req=cCMjEcB%2FlYVbFb4f3HP0gJUXZuecxrHV43Of050KuwOMLhB5atwc%2Bq3Xegnh%0A%2F5Z%2BvGSsNnGs0fDEZg%3D%3D%0A)\n\n**URL:** https://cornix.intercom-attachments-1.com/i/o/434791844/f0b82424d61cee36887d6b9a/mceclip10.png?expires=1772539200&amp;signature=dd858e1b75acc572b5274c99c7d29d1d38f7d5923765d4f1fefb5f6cfc2b9ddc&amp;req=cCMjEcB%2FlYVbFb4f3HP0gJUXZuecxrHV43Of050KuwOMLhB5atwc%2Bq3Xegnh%0A%2F5Z%2BvGSsNnGs0fDEZg%3D%3D%0A\n\n**Описание:** The screenshot shows a "Link Telegram Account" page with a dark blue background. It includes a title, explanatory text about linking Telegram to detect channels, a labeled "Unique Identifier (UUID)" input field with a "Get UUID" button (highlighted by an arrow), a prompt to provide a UUID from the Telegram bot, a placeholder area (likely for UUID entry), and a disabled "Continue" button at the bottom.\n\n---\n\n### Изображение 5\n\n![Image 5](https://cornix.intercom-attachments-1.com/i/o/434791852/34d7f996872372817e00b2e7/mceclip12.png?expires=1772539200&amp;signature=746009cc226b81b57f1f551f4b598ae26f718e3b56ca645af9e74758590fff10&amp;req=cCMjEcB%2FlYRdFb4f3HP0gLALc30IzVjPST8YasCSfSVhhvaMV0FhcglYe%2B0R%0A08Y%2FMl3EauAovvmhsg%3D%3D%0A)\n\n**URL:** https://cornix.intercom-attachments-1.com/i/o/434791852/34d7f996872372817e00b2e7/mceclip12.png?expires=1772539200&amp;signature=746009cc226b81b57f1f551f4b598ae26f718e3b56ca645af9e74758590fff10&amp;req=cCMjEcB%2FlYRdFb4f3HP0gLALc30IzVjPST8YasCSfSVhhvaMV0FhcglYe%2B0R%0A08Y%2FMl3EauAovvmhsg%3D%3D%0A\n\n**Описание:** The screenshot shows a dark-themed onboarding interface for the Cornix trading bot, displaying a code ("B824164D") with an arrow pointing to it, instructions to enter the code on the website or click a button to connect Telegram, and a "Connect Telegram" button at the bottom. The time "14:42" is visible in the top-right corner.\n\n---\n\n### Изображение 6\n\n![Image 6](https://cornix.intercom-attachments-1.com/i/o/434791855/b7b930fdf9c37fd72949d7dd/mceclip1.png?expires=1772539200&amp;signature=143983745eb2c5cfe2e735f0316143b327b09a850937bbef55d6b8003e06a01d&amp;req=cCMjEcB%2FlYRaFb4f3HP0gAd%2FjpflQCNeRMyv6XLKuCrxOL%2Bsyu8etS6Bv4o8%0ACg9C%2BH4OT01hl%2Fxr%2Fw%3D%3D%0A)\n\n**URL:** https://cornix.intercom-attachments-1.com/i/o/434791855/b7b930fdf9c37fd72949d7dd/mceclip1.png?expires=1772539200&amp;signature=143983745eb2c5cfe2e735f0316143b327b09a850937bbef55d6b8003e06a01d&amp;req=cCMjEcB%2FlYRaFb4f3HP0gAd%2FjpflQCNeRMyv6XLKuCrxOL%2Bsyu8etS6Bv4o8%0ACg9C%2BH4OT01hl%2Fxr%2Fw%3D%3D%0A\n\n**Описание:** The screenshot shows a "Validate Telegram User" page with a dark blue background. Key UI elements include a prompt to verify Telegram account ownership, a "Not your Telegram account?" link, a Cornix logo with a blurred identifier, a "Telegram Security Code" field with a "Get Code" button (arrow pointing to it), a "Website Login Password" field with a "Forgot Password" link, and a "Continue" button at the bottom.\n\n---\n\n### Изображение 7\n\n![Image 7](https://cornix.intercom-attachments-1.com/i/o/434791866/b8d56386ccf82d6fddf09203/mceclip5.png?expires=1772539200&amp;signature=c3cd815a592ca397a77ae55cc2d6cb0cf15d743ab250d30af25fd15f627b397f&amp;req=cCMjEcB%2FlYdZFb4f3HP0gGlJGzUn3P5XDr%2BBFoSKxc4WB3fA1j1lja8UafyJ%0AnneRpRSKm5X9X1MhNg%3D%3D%0A)\n\n**URL:** https://cornix.intercom-attachments-1.com/i/o/434791866/b8d56386ccf82d6fddf09203/mceclip5.png?expires=1772539200&amp;signature=c3cd815a592ca397a77ae55cc2d6cb0cf15d743ab250d30af25fd15f627b397f&amp;req=cCMjEcB%2FlYdZFb4f3HP0gGlJGzUn3P5XDr%2BBFoSKxc4WB3fA1j1lja8UafyJ%0AnneRpRSKm5X9X1MhNg%3D%3D%0A\n\n**Описание:** The screenshot displays a security code notification from the Cornix trading bot, showing the code "422691" (expiring in 10 minutes) with a warning not to share it, a timestamp of "19:35," and a "Take me Back" button. A white arrow points to the security code, emphasizing its importance.\n\n---\n\n### Изображение 8\n\n![Image 8](https://cornix.intercom-attachments-1.com/i/o/434791870/e34faabc685a136c49e1e6f3/mceclip6.png?expires=1772539200&amp;signature=2d67e876cafe98f8ed4724fbf7423e64add371133b8577e42ccf85a819f5bf23&amp;req=cCMjEcB%2FlYZfFb4f3HP0gBn0pjAUtKg7JDzwBle0RKdTdS5Z61xzK6BSz3Vw%0A6AWPS7AbipdJITLy5w%3D%3D%0A)\n\n**URL:** https://cornix.intercom-attachments-1.com/i/o/434791870/e34faabc685a136c49e1e6f3/mceclip6.png?expires=1772539200&amp;signature=2d67e876cafe98f8ed4724fbf7423e64add371133b8577e42ccf85a819f5bf23&amp;req=cCMjEcB%2FlYZfFb4f3HP0gBn0pjAUtKg7JDzwBle0RKdTdS5Z61xzK6BSz3Vw%0A6AWPS7AbipdJITLy5w%3D%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a dark blue background. At the top, it confirms a Telegram account was successfully connected, then prompts to create a first account. The UI includes a dropdown menu (labeled "Exchange") pre-selected with "FTX," input fields for "Account name" (filled with "My-FTX"), "API key," and "API secret," plus a "Create Account" button at the bottom. A link ("How do I create an API on FTX?") and an arrow pointing to the exchange dropdown are also visible.\n\n---\n\n### Изображение 9\n\n![Image 9](https://cornix.intercom-attachments-1.com/i/o/434791881/0c5528e69f5ccefec635cbd2/mceclip7.png?expires=1772539200&amp;signature=f52ca01b303d111bd2139ed76c5d0be7fcd8c038f40b0eafb79678045d15dcc3&amp;req=cCMjEcB%2FlYleFb4f3HP0gDrwuQfZVb8%2B6o1KGACnK6NMseUivkdwQF7489bp%0AO7VFw2J7Bcu7cI2xQA%3D%3D%0A)\n\n**URL:** https://cornix.intercom-attachments-1.com/i/o/434791881/0c5528e69f5ccefec635cbd2/mceclip7.png?expires=1772539200&amp;signature=f52ca01b303d111bd2139ed76c5d0be7fcd8c038f40b0eafb79678045d15dcc3&amp;req=cCMjEcB%2FlYleFb4f3HP0gDrwuQfZVb8%2B6o1KGACnK6NMseUivkdwQF7489bp%0AO7VFw2J7Bcu7cI2xQA%3D%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a dark blue background, displaying a success message that a Telegram account was connected. It includes a dropdown menu labeled "Exchange" (set to "FTX"), a text field for "Account name" (filled with "My-FTX" and highlighted by an arrow), and empty fields for "API key" and "API secret", plus a "Create Account" button at the bottom.\n\n---\n\n### Изображение 10\n\n![Image 10](https://cornix.intercom-attachments-1.com/i/o/434791890/9025f31fd96ef1d53ec335e6/mceclip8.png?expires=1772539200&amp;signature=6d71cfd6df9377c4c778cae87ec1177b18026aaa027b06fcf704a018183e1cab&amp;req=cCMjEcB%2FlYhfFb4f3HP0gNKlFn3GoyiT8%2B6BSbWwdvAjBay76GUO27ctb%2FFx%0AtLEPAHIxAliVjQmn2Q%3D%3D%0A)\n\n**URL:** https://cornix.intercom-attachments-1.com/i/o/434791890/9025f31fd96ef1d53ec335e6/mceclip8.png?expires=1772539200&amp;signature=6d71cfd6df9377c4c778cae87ec1177b18026aaa027b06fcf704a018183e1cab&amp;req=cCMjEcB%2FlYhfFb4f3HP0gNKlFn3GoyiT8%2B6BSbWwdvAjBay76GUO27ctb%2FFx%0AtLEPAHIxAliVjQmn2Q%3D%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a dark blue background. It displays a confirmation that a Telegram account was successfully connected, followed by a form to create a trading account with fields for selecting the exchange (FTX, via a dropdown), entering an account name ("My-FTX"), and inputting an API key and API secret (both fields have white arrows pointing to them). A white "Create Account" button is at the bottom.\n\n---\n\n### Изображение 11\n\n![Image 11](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow holding a yellow object (likely a coin) above the bold, dark blue text “cornix” in a clean, modern font. The design is minimalistic, with the crow positioned centrally above the brand name, emphasizing the bot’s identity through simple, striking visual elements.\n\n---\n\n### Изображение 12\n\n![Image 12](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a clean, minimalistic design. Key UI elements include a navigation bar at the top (likely with tabs or menu options), a central dashboard area (possibly displaying trading metrics or bot status), and a sidebar on the left (for account or bot management). The layout emphasizes clarity, with distinct sections for monitoring and controlling trading activities.\n\n---\n\n
