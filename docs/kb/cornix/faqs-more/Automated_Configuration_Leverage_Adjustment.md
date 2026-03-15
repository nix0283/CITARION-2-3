# Automated Configuration Leverage Adjustment

**URL:** https://help.cornix.io/en/articles/6005741-automated-configuration-leverage-adjustment

**Created:** 2026-03-03T12:05:43+00:00

---

Automated Configuration Leverage Adjustment | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
- FAQs
- Automated Configuration Leverage Adjustment
# Automated Configuration Leverage Adjustment
How we Adjust your Auto-Trading Configuration based on a Specific Trade Leverage
Written by Hadar Cornix Updated over a year agoTable of contents
The Automated leverage adjustment is applied to some of the auto-trading configurations, in order to adjust them for futures trading when a futures trade is opened automatically (meaning, it will not apply for manual trades).

In order to understand this feature, it's important to understand the basic idea of futures trading (leveraged trading):
For example, if we trade with leverage x10, meaning we are multiplying the possible range of our profit and loss by 10 (every change of 1 in the price of the contract, will result in a profit or loss of 10).

## How does leverage affect our auto-trading configuration?
Let's say we set our default stop-loss to 10%, meaning we are willing to risk up to 10% of our investment (potential loss of up to 10%). When the price of the coin or contract reaches 10% below the entry price (for long trades), we are going to lose 10% of our investment.

When trading with Leverage (x10 for example), if the price decreases by 10%, we will lose 100% (10% * 10X), which means that effectively, while trading with leverage 10X and 10% default stop-loss we are potentially risking 100% of our initial investment.

In order to keep an effective stop-loss level when trading with leverage, Cornix will automatically divide your default stop-loss value by the trade's leverage to keep your default stop-loss level effectively as you set it upfront.

Default stop-loss = 10%
Leverage Level = 10X
Adjusted stop-loss = 1% (Default stop-loss/Leverage Level)

Effective stop-loss = 10% (Adjusted stop-loss * Leverage Level)

Automated Configuration Leverage Adjustment applies to the following Trading Configuration parameters:
-
Default stop-loss
-
Trailing Entry
-
Trailing Take-Profit
-
Trailing Stop-loss - will apply only for percentage parameters and won't affect triggers.
All trailing parameter adjustments are limited to a cap of 0.2%. The Default Stop-Loss parameter is not limited.

Does not apply to the First Entry Grace parameter and Limit Price Reduction.

Workaround: when you edit a specific trade, after it was open automatically, we take into consideration that you set the trade's parameters while taking into consideration the trade's leverage, therefore after editing a trade manually, we won't adjust the parameters you set and will leave it as you edit it.

*This only applies for automated trades (trades that were opened automatically or by "One Click Follow"), and does not apply for manual trades, and smart bot trades.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow (raven) holding a small yellow object in its beak, perched on a curved line above the lowercase text “cornix” in bold, dark blue font. The design is clean and minimalistic, with the crow and text centered against a white background, emphasizing the brand’s visual identity.\n\n---\n\n### Изображение 2\n\n![Image 2](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot displays a Cornix trading bot interface with a clean, minimalistic design. Key UI elements include a top navigation bar with tabs (likely for settings, history, or account), a central panel showing trading metrics (e.g., profit/loss, trade status), and a sidebar with options to configure strategies or view logs. The layout emphasizes clarity, with distinct sections for monitoring and controlling automated trading activities.\n\n---\n\n
