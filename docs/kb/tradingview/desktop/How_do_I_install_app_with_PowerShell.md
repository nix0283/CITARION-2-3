# How do I install app with PowerShell

**URL:** https://www.tradingview.com/support/solutions/43000649586-how-do-i-install-app-with-powershell/

---

- [ Help Center ](/)
- / 
- / Desktop 
- / [ Installation and troubleshooting ](/support/folders/43000577553-installation-and-troubleshooting/)
- / [ How do I install app with PowerShell ](/support/solutions/43000649586-how-do-i-install-app-with-powershell/)

# How do I install app with PowerShell 
 App Installer works just fine most of the time but in rare cases, it cannot complete the app installation. PowerShell may be helpful then.

- Open an elevated Windows PowerShell (Start -> right-click PowerShell -> Run as administrator)
- Type in the command below and run it:
*add-appxpackage *[*https://tvd-packages.tradingview.com/stable/latest/win32/TradingView.msix*](https://tvd-packages.tradingview.com/beta/latest/win32/TradingView.msix)
- If there are no errors in the console, then open the Start menu and look for TradingView application - it should be there
 Previous Previous Troubleshooting installation problems on Windows Next Next How do I get rid of 'Stack unavailable' error while signing in Launch Supercharts

