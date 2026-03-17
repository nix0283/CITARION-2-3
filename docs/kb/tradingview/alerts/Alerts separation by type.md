# Alerts separation by type

**URL:** https://www.tradingview.com/support/solutions/43000696403-alerts-separation-by-type/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Alerts - / [ Alerts settings ](/support/folders/43000547663-alerts-settings/) - / [ Alerts separation by type ](/support/solutions/43000696403-alerts-separation-by-type/) # Alerts separation by type According to resource requirements, all alerts are divided into 3 types: Price and Technicals and [Watchlist](https://www.tradingview.com/support/solutions/43000739708/). (detailed lists of alerts related to each category are given at the end of the article). Each type has a separate limit on the number of active alerts, for example, with this limit: Active price alerts 400 Active technical alerts 400 Active watchlist alerts 2 You can run no more than 400 price alerts and no more than 400 technical + 2 watchlist ones (in this case, you can run 802 alerts in total). The current limits for each plan can be seen on the [pricing page](https://www.tradingview.com/pricing/#compare) in the alerts section. Price Alerts An alert is considered Price when the following two conditions are met: - only a symbol is used in the alert (for any type of chart: Bars, Renko, PnF, etc) and a price value - one of the following is selected as the trigger condition: Crossing - Crossing Up - Crossing Down - Greater Than - Less Than For example, an alert on a Renko chart would be considered Price: as well as an alert on the spread symbol: Technical alerts An alert is considered Technical if any of the following conditions are met: - the alert uses an overlay symbol, indicator, drawing or strategy - one of the following is selected as the trigger condition: Entering Channel - Exiting Channel - Inside Channel - Outside Channel - Moving Up - Moving Down - Moving Up % - Moving Down % for example, such an alert will be considered technical, because it is based on the script: as well as such an alert, because it is created on the Moving-condition: Previous Previous What timezone is displayed in alerts? Next Next Alerts based on real-time and non-real-time symbols Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43536487339/original/pu6B3Pc9xaOnePzctj-6Uajs5VHVJYtl4Q.png?1737634855)

**Описание:** This TradingView mobile interface displays the **Alerts** section (top header) with a dropdown menu open, showing alert management options. Here’s a detailed breakdown:  


### **Top Header & Navigation**  
- **“Alerts” Tab**: Active (white background), indicating the current view.  
- **“Log 3” Button**: Right-aligned, with a red badge showing 3 unread notifications.  
- **Action Icons**:  
  - `+` (Add): Create a new alert.  
  - `🔍` (Search): Find alerts.  
  - `↓=` (Sort/Filter): Organize alerts.  
  - `⋮⋮⋮` (More Options): Access additional settings.  


### **Dropdown Menu (Alert Management)**  
The menu contains 4 key sections:  

1. **Bulk Actions (Top 3 Items)**:  
   - `▶ Restart all inactive`: Reactivate paused alerts.  
   - `⏸ Pause all`: Temporarily disable all alerts.  
   - `🗑 Delete all inactive`: Remove inactive alerts.  

2. **“SHOW ALERTS” (Collapsible)**:  
   - A dropdown to toggle visibility of alerts (e.g., show/hide active/inactive).  

3. **“FILTER ALERTS” (Collapsible)**:  
   - A dropdown to filter alerts by criteria (e.g., status, type).  

4. **“SHOW ALERTS BY TYPE” (Highlighted Red Box)**:  
   - **“Price”**: Checkbox (unchecked) + `3/1000` (3 active price alerts out of 1000 limit).  
   - **“Technicals”**: Checkbox (unchecked) + `3/1000` (3 active technical alerts out of 1000 limit).  
   - **“Watchlist”**: Checkbox (unchecked) + `0/10` (0 active watchlist alerts out of 10 limit).  

5. **“CUSTOMIZE LIST” (Collapsible)**:  
   - A dropdown to adjust list display (e.g., columns, sorting).  

6. **“Alerts settings…”**:  
   - Link to global alert configuration (e.g., notification preferences).  


### **Background Context**  
Behind the menu, partial asset icons (e.g., Bitcoin, Apple, Tesla) and text (e.g., “TSLA Crossing 481.38”) suggest a watchlist or chart view, but the focus is on alert management.  


### **Purpose**  
This screen lets users **manage, filter, and organize alerts** (price, technical, watchlist) with bulk actions (restart/pause/delete) and type-specific limits. The UI prioritizes clarity for tracking alert usage against subscription limits.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43536487553/original/haiaHTsR3Hcwm4pbA-HX4jlt9jsFdy6PWA.jpg?1737634902)

**Описание:** This is a **TradingView \


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43536488728/original/bJpreuUj_lVPz1pBWNOqMHXkjSjq6ALEMQ.jpg?1737635187)

**Описание:** This TradingView interface displays a **conditional trading setup panel** with four key UI elements:  

1. **Symbols Dropdown**:  
   - Label: *\


