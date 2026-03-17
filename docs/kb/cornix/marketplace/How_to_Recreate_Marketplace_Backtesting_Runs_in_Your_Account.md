# How to Recreate Marketplace Backtesting Runs in Your Account

**URL:** https://help.cornix.io/en/articles/12175705-how-to-recreate-marketplace-backtesting-runs-in-your-account

**Created:** 2026-03-03T11:50:55+00:00

---

How to Recreate Marketplace Backtesting Runs in Your Account | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
Recreate Marketplace BacktestingStep by StepImportant Notes- All Collections
- Marketplace
- How to Recreate Marketplace Backtesting Runs in Your Account
# How to Recreate Marketplace Backtesting Runs in Your Account
Checking and recreating the Marketplace Backtesting results on your personal account
Written by Hadar Cornix Updated over 6 months agoTable of contents
Recreate Marketplace BacktestingStep by StepImportant Notes
As a channel admin, you may want to replicate the Marketplace Backtesting runs in your own Cornix account. Doing so allows you to understand your Marketplace Backtesting results better, test how different trading configurations and strategies affect the results, compare outcomes, and experiment with adjustments before publishing to the Marketplace.

You can use Backtesting on Live Trading account as well as on Demo account.

# Recreate Marketplace Backtesting
## Step by Step
Follow these steps to run a Backtesting with the same parameters used in the Marketplace. You can Backtest on Live Trading account, or Demo account.
-
Create a Backtesting run -
Navigate to 'Signals Bots' > 'Backtesting' > '+Create'
​
-
Select the group -
Out of the list, pick the signals group you want to backtest.
​
-
Choose the correct exchange account -
Note: Marketplace Backtesting always uses the exchange with the most signals. Make sure to select the right exchange account to reflect the most accurate results according to the Marketplace Backtesting.
Example: If most signals are for Binance Futures, select Binance Futures.
​
-
Click 'Backtesting' at the right side bar to set the Backtesting details.

-
Set the Backtesting run parameters:
​
-
Timeframe (duration) -
On our Marketplace we use 1, 3 and 6 months Backtesting runs.
​Note: If you compare results that are currently on the Marketplace, make sure to chose the exact dates*.
​
-
Initial funds - This will be used as the portfolio size for the backtest.
Marketplace portfolio size is always 10,000 USD.
​
-
Amount per trade -
Set the Amount Per Trade to 500 USD Fixed USD Amount.
By default, the Marketplace backtesting runs will use 500 USD for each trade. If your channel already has an amount per trade configuration set, the Backtest will use this amount per trade instead of the 500$.

-
Click 'Start' to Run the Backtesting
Let the Backtesting run until full completion. The results will correspond to what the Marketplace displays for the same timeframe. Read the notes below to learn about possible differences.

## Important Notes
-
Configurations / Strategies -
You can rerun Backtesting with different parameters if you’d like to test alternate strategies for your channel. If you do decide to change any strategy for your channel, you can only change it via the Group's Trading Configuration.
Any new strategy / configuration will apply for new signals only.
-
Start and End Time -
Backtesting on personal accounts runs from the start date at 00:00 am, to the time you run the Backtesting (current hour).
On the Marketplace, Backtesting start and end hours might be different (e.g start date at 7:00 am till end date at 14:00 pm). This is expected to cause small differences between the personal Backtesting results and the Marketplace Backtesting results, due to potential differences in trades.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"12175705","anonymous_id":"02768ca2-8441-4f51-b44a-bde6cbc04e78"};
(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/wrsw0nb0';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n<!-- Image description: The screenshot shows a Cornix trading bot interface with a clean, minimal design. It displays "Available Balance" (0 USD) and "Bot Amount Value" (0 USD, 0%) at the top, followed by two buttons—"Advanced Settings" (light blue) and "Backtesting" (highlighted with a dark blue arrow), and a prominent blue "Create Bot" button at the bottom. No charts or additional menus are visible. -->
![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1718691045/73b36d79b7b06de3e3ac4cc18dd8/image.png?expires=1772540100&amp;signature=01af45360aef78100434617db4c763ec2a180ad27428d2f861e0c90d3ef1bc4e&amp;req=dScmHs93nIFbXPMW1HO4zYl4TNwr9M4%2FPlVN4z0sd50VeqPzklKlC4LI3Mls%0AtCWj%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1718691045/73b36d79b7b06de3e3ac4cc18dd8/image.png?expires=1772540100&amp;signature=01af45360aef78100434617db4c763ec2a180ad27428d2f861e0c90d3ef1bc4e&amp;req=dScmHs93nIFbXPMW1HO4zYl4TNwr9M4%2FPlVN4z0sd50VeqPzklKlC4LI3Mls%0AtCWj%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a clean, minimalistic design. It displays "Available Balance" (0 USD) and "Bot Amount Value" (0 USD, 0%) at the top, followed by two buttons—"Advanced Settings" and "Backtesting" (highlighted by a dark blue arrow)—and a prominent blue "Create Bot" button at the bottom.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1719148229/0dc99dc10125394ccf91fa6850d9/image.png?expires=1772540100&amp;signature=6b7c4895cd273779446d2152593a8bc15bb8dce515d98534590fd5cd3dbe4764&amp;req=dScmH8h6lYNdUPMW1HO4zdMzZDrpb0WLtm8YEWNpLDr6h8tREswL7R85xLuM%0Ak0LO%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1719148229/0dc99dc10125394ccf91fa6850d9/image.png?expires=1772540100&amp;signature=6b7c4895cd273779446d2152593a8bc15bb8dce515d98534590fd5cd3dbe4764&amp;req=dScmH8h6lYNdUPMW1HO4zdMzZDrpb0WLtm8YEWNpLDr6h8tREswL7R85xLuM%0Ak0LO%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a calendar view for September 2025, displaying days of the week (Su–Sa) and dates. On the left, a vertical list of time - range options includes “Today,” “Last 7 Days,” “Last 30 Days,” “This Month,” “Last Quarter,” “Last 6 Months,” and “Last Year,” all in blue text. Blue arrows highlight specific date ranges (31–1, 7–8, 14–15) on the calendar, with the 10th circled to indicate selection.\n\n---\n\n### Изображение 3\n\n![Image 3](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow (or raven) holding a small yellow object in its beak, positioned above the lowercase text “cornix” in a bold, dark blue font. The design is clean and minimalistic, with the bird and text centered on a white background, emphasizing the brand’s visual identity.\n\n---\n\n### Изображение 4\n\n![Image 4](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot displays a Cornix trading bot interface with a clean, minimalistic design. Key UI elements include a navigation bar at the top, a central dashboard area likely showing trading metrics or bot status, and a sidebar with menu options for managing trading strategies, settings, or account details. The layout emphasizes clarity and ease of access to core trading functions.\n\n---\n\n
