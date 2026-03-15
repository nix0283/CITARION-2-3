# Understanding The One Leverage Type Supported Limitation on ByBit UTA Accounts

**URL:** https://help.cornix.io/en/articles/11812728-understanding-the-one-leverage-type-supported-limitation-on-bybit-uta-accounts

**Created:** 2026-03-03T12:03:24+00:00

---

Understanding The "One Leverage Type Supported" Limitation on ByBit UTA Accounts | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
- All Collections
- FAQs & More
- Understanding The "One Leverage Type Supported" Limitation on ByBit UTA Accounts
# Understanding The "One Leverage Type Supported" Limitation on ByBit UTA Accounts
Why trades may fail on ByBit UTA accounts due to margin type limitations and how to resolve it
Written by Cristian Marin Updated over 8 months agoTable of contents
When trading through a ByBit UTA account (Unified Trading Account), it's important to understand how leverage and margin types are managed by the exchange, and how it affects the way trades are executed through Cornix.

## What Is the Margin Type Limitation? 📉
ByBit UTA accounts supports only one margin type and leverage multiplier at a time, either Cross or Isolated. Once a position is opened using a specific margin type and leverage, the exchange restricts further positions from using a different configuration.
This means that if your Cornix bot receives a signal that attempts to open a trade with a different margin type or leverage than the one already active on your UTA account, the trade will not be opened. This is a limitation imposed by ByBit for UTA accounts.

## How to Resolve or Avoid 🛠️
To ensure uninterrupted trading, here are a few ways to work around this limitation:
-
### Enforce a Fixed Leverage Type in Your Signal Bot
You can configure your Cornix signal bot to always use a specific leverage type and multiplier (e.g., Cross with x10 leverage). This ensures that all trades use the same parameters, preventing conflicts that would block new trades from opening. Learn how to do it on our Leverage article.

-
### Use a Regular Sub-Account Instead of a UTA Account
By creating a non-UTA sub-account on ByBit, you regain flexibility. These accounts allow the leverage and margin type to be adjusted automatically for each position, even if they differ from previous trades. This option is relevant if you want to follow signals with varied leverage settings.

-
### Review and Adjust Existing Positions
If you're already using a UTA account, go to your Open Positions page on ByBit and check whether any of the open positions is currently using a different leverage or margin type. Closing or adjusting those positions will allow your next signal to be executed correctly.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow holding a yellow object in its beak, positioned above the bold, dark blue text “cornix” with a small dot beneath the “x.” The design is clean and minimalistic, emphasizing the brand name and bird icon.\n\n---\n\n### Изображение 2\n\n![Image 2](https://static.intercomassets.com/avatars/7621376/square_128/WhatsApp_Image_2024-07-28_at_09.17.24_c4fe6c8e-1722176280.jpg)\n\n**URL:** https://static.intercomassets.com/avatars/7621376/square_128/WhatsApp_Image_2024-07-28_at_09.17.24_c4fe6c8e-1722176280.jpg\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a user’s profile section at the top, featuring a circular profile picture and a username. Below, the UI includes navigation tabs (likely for different bot functions) and a main content area displaying trading-related metrics or settings, with a clean, structured layout typical of trading platforms.\n\n---\n\n
