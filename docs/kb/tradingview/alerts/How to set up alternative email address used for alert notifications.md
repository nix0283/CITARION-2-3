# How to set up alternative email address used for alert notifications

**URL:** https://www.tradingview.com/support/solutions/43000474398-how-to-set-up-alternative-email-address-used-for-alert-notifications/

---

- [ Help Center ](/) - / - / [ Alerts notifications ](/support/folders/43000547712-alerts-notifications/) - / [ How to set up alternative email address used for alert notificati… ](/support/solutions/43000474398-how-to-set-up-alternative-email-address-used-for-alert-notifications/) # How to set up alternative email address used for alert notifications To configure an alternative email address for receiving alert notifications, follow these steps: - Go to Settings and billing → [Alerts delivery](https://www.tradingview.com/settings/#alerts-delivery). - Click the "Add email" button and enter the email address. - A 6-digit confirmation code will then be sent to the specified email address, which you’ll need to enter in the Verification code field. After you’ve successfully confirmed the alternative email address, you’ll be able to receive messages about triggered alerts to this address. If you're unable to receive a verification code to the specified address for some reason, you may consider using [webhooks](https://www.tradingview.com/?solution=43000529348) to receive alerts instead. Previous Previous I'd like to use an alternative email address for alert notifications Next Next Will alerts work if TradingView is not open on the computer? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43569373101/original/EkjPATDs6fRqUk2QsbHmGyGXTbn21ONRxA.png?1752581848)

**Описание:** This is a **TradingView \


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43569374234/original/z7QaMLMOFsKcWpQWibNL-hESnDyQ18frIg.png?1752582127)

**Описание:** This is a **modal dialog** from TradingView for verifying an alternative alert email. Here’s a breakdown of its UI elements:  

### 1. Header & Close Button  
- **Title**: “Verify alternative alert email” (clearly states the dialog’s purpose).  
- **Close Icon** (top-right): A black “X” button to dismiss the modal.  


### 2. Email Verification Prompt  
- Text: *“Check [redacted]@[redacted] for your code and enter it below.”*  
  - The email address is partially hidden (grayed out) for privacy, but the prompt tells the user where to find the verification code.  


### 3. Code Input Field  
- **Label**: “Code” (above the input box, indicating what to enter).  
- **Input Box**: A blue-outlined rectangular field for typing the verification code (active/focused state, as indicated by the blue border).  


### 4. Resend Code Timer  
- Text: *“You can request a new code in 56 seconds”* (gray, smaller font).  
  - Informs the user they must wait 56 seconds before requesting a new code (prevents spam).  


### 5. Submit Button  
- **Button**: Black with white text “Submit” (bottom-right).  
  - Submits the entered code to complete the verification process.  


### Purpose  
This dialog is part of TradingView’s security workflow, ensuring the user’s alternative email (for alerts) is valid by requiring a code from that email. The UI is minimal, focusing on clarity and security (e.g., code timer, email redaction).


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

