# Some Prices Are Too Far From Each Other / Current Price

**URL:** https://help.cornix.io/en/articles/11382662-some-prices-are-too-far-from-each-other-current-price

**Created:** 2026-03-03T11:56:54+00:00

---

Some Prices Are Too Far From Each Other / Current Price | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
- Errors & Notifications
- Errors
- Some Prices Are Too Far From Each Other / Current Price
# Some Prices Are Too Far From Each Other / Current Price
Understanding the error "Prices are too far" and how to resolve it.
Written by Cristian Marin Updated over 4 months agoTable of contents
When creating a signal or a trade in Cornix, you may encounter one of these error messages in your notifications:
-
Some prices are too far from each other
-
Some prices are too far from current price
Cornix supports a maximum price distance of x10 between your Entry, Take-Profit and Stop-Loss prices, or between the current price and the order prices.
These messages appear when the distance between prices exceeds Cornix’s maximum allowed ratio of up to 10×.
Note: if both conditions are violated (distance from each other and distance from current price), the system prioritizes the error message: “Some prices are too far from the current price.”

## 🧠 How To Calculate
Divide the larger price by the smaller price. If the result is greater than 10, the error is triggered, and the signal or trade will not go through.
​

# 1. Some prices are too far from each other
This error means that the difference between two order prices (Entry, TP, SL) is greater than x10.
​Example:
SOL/USDT (Long)
Entry: 100
Take-Profit: 200
Stop Loss: 10

The following table illustrates the price difference multiples:
Compared Prices
Ratio
Result
Entry vs TP
200 / 100 = 2
✅ OK
Entry vs SL
100 / 10 = 10
✅ OK
TP vs SL
200 / 10 = 20
❌ Exceeds the limit
➡️ Result: The TP and SL are 20× apart, which exceeds the allowed 10× ratio. That will trigger the "Prices are too far from each other" message.


# 2. Some prices are too far from current price
This error means one of your order prices is more than 10× away from the current market price.

Example:
XRP/USDT (Short)
Entry: 50
SL: 500
*Current price: 40
Compared Prices
Ratio
Result
SL vs Current
500 / 40 = 12.5
❌ Exceeds limit
Entry vs Current
50 / 40 = 1.25
✅ OK
SL vs Entry
500 / 50 = 10
✅ OK
➡️ Result: The Stop-Loss is 12.5× above the current price, triggering the error.


# 💡 How to Resolve
-
Adjust Prices: Modify your Entry, Take Profit, or Stop Loss prices to ensure that no order is exceeding the x10 distance limit, from another order or from the current market price. .
-
Safe Margin: To account for possible market moves while you are posting the signal or processing the trade, consider using a maximum of 9.5× difference as the maximum distance between prices.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue crow holding a yellow object in its beak, perched above the bold, dark blue text “cornix” with a small dot beneath the “x.” The design is clean and minimalist, emphasizing the brand name and its avian mascot.\n\n---\n\n### Изображение 2\n\n![Image 2](https://static.intercomassets.com/avatars/7621376/square_128/WhatsApp_Image_2024-07-28_at_09.17.24_c4fe6c8e-1722176280.jpg)\n\n**URL:** https://static.intercomassets.com/avatars/7621376/square_128/WhatsApp_Image_2024-07-28_at_09.17.24_c4fe6c8e-1722176280.jpg\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a clean, minimalistic design. Key UI elements include a navigation bar at the top, a central dashboard area (likely displaying trading metrics or bot status), and sidebar options for settings or strategy management. The layout emphasizes clarity, with distinct sections for monitoring and controlling automated trading activities.\n\n---\n\n
