# Entry Ratios Strategy - Built-in

**URL:** https://help.cornix.io/en/articles/5814861-entry-ratios-strategy-built-in

**Created:** 2026-03-03T11:48:26+00:00

---

Entry Ratios Strategy - Built-in | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
- Trading Configurations
- Trading Configuration - Entries
- Entry Ratios Strategy - Built-in
# Entry Ratios Strategy - Built-in
Entry Strategies explained
Written by Hadar Cornix Updated over a year agoTable of contents
The entry strategy will determine how the amount will be divided between the entry targets by default when creating a trade automatically.

When using the Built-in Entry Strategies, the bot will offer the following options:
Let's review the options:
-
Evenly Divided
This is the default option when you first open this section as can be seen in the top message, so you will not see this option as one of the offered option.
When using this option, the bot will evenly divide the trade amount between the different entry targets.
For example, when creating a trade with 4 entry targets, the bot will place 25% of the trade amount in each entry target.

-
One Target
The bot will place 100% of the amount in the first entry target (the other targets will have 0%).

-
Two Targets
The bot will divide the trade amount equally between the first two entry targets, so each of the first two targets will contain 50% of the trade amount.

-
Three Targets
The bot will divide the trade amount equally between the first three entry targets, so each of the first three targets will contain 33.33% of the trade amount.

-
Fifty On First Target
The bot will place 50% of the trade amount on the first entry target, and will divide the other 50% equally among the remaining entry targets.

-
Decreasing Exponential
In this strategy, starting from the entry target with the highest price, each target will have half the amount as the previous entry target, such that the first target has the largest percentage of the trade amount and the last target has the smallest percentage. The amount percentages will be divided in a way such that their sum will still equal 100%.
For example, when 4 entry targets are defined the first entry target with the highest price will have 53.333% of the trade amount, the second target will have 26.666% (half the amount of the previous target), the third target will have 13.333% and the last entry target with the lowest price will have 6.666% of the trade amount.

-
Increasing Exponential
In this strategy, starting from the entry target with the highest price, each target will have twice the amount as the previous entry target, such that the first target has the smallest percentage of the trade amount and the last target has the largest percentage. The amount percentages will be divided in a way such that their sum will still equal 100%.
For example, when 4 entry targets are defined the first entry target with the highest price will have 6.666% of the amount, the second target will have 13.333% (twice the amount of the previous target), the third target will have 26.666% and the last entry target with the lowest price will have 53.333% of the trade amount.
-
Skip First
The bot will place 0% of the trade on the first entry target, and will evenly divide the trade amount between the other entry targets.

## Entry Zone Signals
When the signal is defined with an entry zone instead of specific entry targets, the bot will still take the entry strategy that's set on your Entry Configuration.
​
How will the bot set the prices for the Entry Zone?
For example, if the entry zone is defined as 1000-2000 and the default number of entry targets is 5, then the targets prices will be 1000, 1250, 1500, 1750 and 2000.
However, if by default there is only 1 entry it will be placed at the top of the entry zone, at 2000.
The bot will use the entry strategy to determine how to divide the trade amount between the defined number of entry targets.
Note that the default number of entry targets is 4.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n<!-- Image description: The screenshot shows the Cornix trading bot’s “Entries” tab (selected) with a dropdown menu open under “Entries Ratios,” displaying options like “Evenly Divided,” “One Target,” and others. The top menu includes tabs: General, Entries (active), Take-Profits, Stop, Advanced, with “Personal” (blue) and “Channel” toggles, plus “Built-in,” “Custom,” “DCA” sub-tabs. A search bar and a list of entry ratio presets are visible. -->
![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/1399582687/a533a060e86291cff121e9892480/image.png?expires=1772540100&amp;signature=a31f39e579abe2926aeea3215454819babf42a391fbdae29078f33b337ade27a&amp;req=dSMuH8x2n4dXXvMW1HO4zU5fqQ3IeNNh4IoDJE%2Feuy%2F9J3EsapR2RSNfl8uP%0AyVR6ASilXq1UH4vuz7M%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/1399582687/a533a060e86291cff121e9892480/image.png?expires=1772540100&amp;signature=a31f39e579abe2926aeea3215454819babf42a391fbdae29078f33b337ade27a&amp;req=dSMuH8x2n4dXXvMW1HO4zU5fqQ3IeNNh4IoDJE%2Feuy%2F9J3EsapR2RSNfl8uP%0AyVR6ASilXq1UH4vuz7M%3D%0A\n\n**Описание:** The screenshot shows the Cornix trading bot’s “Entries” tab interface, with a dropdown menu under “Entry Ratios” expanded to display options like “Evenly Divided,” “One Target,” and others. The UI includes tabs (General, Entries, Take-Profits, Stop, Advanced), a “Personal” channel button, and a search bar above the dropdown, all styled with blue accents for active elements.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow (raven) holding a small yellow object in its beak, perched on a curved line above the bold, dark blue text “cornix” (with a lowercase “c” and a dot above the “i”). The design is clean and minimalist, emphasizing the brand name and its avian mascot.\n\n---\n\n### Изображение 3\n\n![Image 3](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a clean, modern UI. Key elements include a sidebar with navigation icons (e.g., home, settings, portfolio), a main dashboard displaying trading metrics (e.g., profit/loss, active bots), and a central area for bot configuration or performance tracking. The design uses a dark theme with contrasting text for readability, emphasizing user-friendly navigation and data visualization.\n\n---\n\n
