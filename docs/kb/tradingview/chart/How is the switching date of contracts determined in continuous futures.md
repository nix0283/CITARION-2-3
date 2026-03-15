# How is the switching date of contracts determined in continuous futures

**URL:** https://www.tradingview.com/support/solutions/43000691027-how-is-the-switching-date-of-contracts-determined-in-continuous-futures/

---

- [ Help Center ](/) - / - / [ How is the switching date of contracts determined in continuous f… ](/support/solutions/43000691027-how-is-the-switching-date-of-contracts-determined-in-continuous-futures/) # How is the switching date of contracts determined in continuous futures The main condition for [contracts switching](https://www.tradingview.com/support/solutions/43000689313-switching-continuous-futures-contracts/) in continuous futures charts is the excess of the daily volume of the next contract over the daily volume of the current futures contract. Such a decrease and increase in daily volumes indicate that the current contract is losing its relevance compared to the next one. The rule for determining the switching date is set based on the statistical data for the symbol, taking into account this condition. For example, a condition for exceeding futures volumes can begin to be fulfilled (on average) 6 business days before the expiration of the contract, which means that a rule will be set for it – to switch contracts 6 business days before the expiration. Similarly, the switching rule is set individually for each continuous future, and this rule is applied throughout its history. Since the rule is based on average values, there may be situations when the continuous future has already switched, and the volume on the previous contract is higher than on the new one, and vice versa, when there are still a few days before the switch, and the daily volumes on the next contract exceed the volumes on the current one. Consider the situation on the example of the symbol COMEX:GC1! On the GCQ2022 chart, the expiration date of the August contract is indicated according to the [exchange](https://www.cmegroup.com/markets/metals/precious/gold.contractSpecs.html) – 29 Aug `22. But the date of switching to the December contract GCZ2022 comes much earlier – 28 Jul `22, when the volume of the August contract becomes less than the volume of the December one, that is, the contract to which the continuous futures contract should switch. **What is the advantage of this method** This method allows you to build a continuous futures chart without gaps in volume, as it would be the case in switching by expiration dates. Additionally, this method allows you to reflect the most current price picture of the instrument. Previous Previous I want to change the number of decimals on the scale Next Next How do I convert chart data to another currency? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43382058532/original/4S5zlVf834pOzkSaSrlLnEsI3r1s2RFIOg.jpg?1672328265)

**Описание:** This TradingView image displays three stacked 1-day (1D) candlestick charts for COMEX gold futures contracts, illustrating a contract switch process. Here's a detailed breakdown:  


### **Top Chart: Combined View (GCZ2022/GCQ2022)**  
- **Title**: \


![Image 2](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 3](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

