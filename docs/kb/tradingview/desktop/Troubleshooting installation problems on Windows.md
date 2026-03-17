# Troubleshooting installation problems on Windows

**URL:** https://www.tradingview.com/support/solutions/43000635187-troubleshooting-installation-problems-on-windows/

---

- [ Help Center ](/) - / - / [ Installation and troubleshooting ](/support/folders/43000577553-installation-and-troubleshooting/) - / [ Troubleshooting installation problems on Windows ](/support/solutions/43000635187-troubleshooting-installation-problems-on-windows/) # Troubleshooting installation problems on Windows Before installing the app, please refer to [this article](https://www.tradingview.com/?solution=43000624193) to make sure that your system meets the minimum requirements. How to launch .appinstaller files TradingView Desktop for Windows is distributed as an app package (file TradingView.appinstaller). Usually, Windows can work with such files right out of the box but sometimes your Windows may not recognize appinstaller files (more often when your system is not up to date). In this case, you will see the "How do you want to open this file?" dialog when running the TradingView app package. As the first thing to do, we always recommend updating your Windows up to the most recent version. If that is not possible, use [App Installer for Windows 10](https://www.microsoft.com/p/app-installer/9nblggh4nns1) from Microsoft Store to install the TradingView Desktop on your computer. Installation fails with error “Windows cannot install package” This is an upgrade error. TradingView Desktop starting with version **beta.13** (1.0.0.2062) is not backward compatible with earlier versions. This means that beta.13 and later versions can’t be installed as an upgrade to version **beta.12** (1.0.0.1906) or earlier. You should uninstall the app and then install the most recent version available for download [here](https://www.tradingview.com/desktop/). Once you have the beta.13 version installed, all upcoming releases will be installed automatically as usual. Installation fails with error 0x80070490 A few users have reported to us that the app cannot be installed due to an error message that says “ App installation failed with the following error message: error 0x80070490: Opening the package from location TradingView.msix failed. (0x80070490). ” If you face this, we recommend installing the Windows update of September 14, 2021 (KB5005565) or newer. Learn more about getting this update [here](https://support.microsoft.com/topic/september-14-2021-kb5005565-os-builds-19041-1237-19042-1237-and-19043-1237-292cf8ed-f97b-4cd8-9883-32b71e3e6b44). Installation on Windows 11 fails with error 0x800B010A Error message: This app package is not signed with a trusted certificate. Contact your system administrator or the app developer to obtain a new certificate or app package with trusted certificates. The root certificate and all immediate certificates of the signature in the app package must be trusted (0x800B010A) If app installation cannot be completed on Windows 11 due to the error above, you should update the App Installer app. For that, go to the Microsoft Store, find App Installer in the Library, and click Update on it. Installation fails with error 0x8000ffff Error message: App installation failed with error message: Deployment Add operation with target volume C: on Package TradingView.Desktop_1.0.0.2087_x64__n534cwy3pjxzj from: (TradingView.msix) failed with error 0x8000FFFF. See [http://go.microsoft.com/fwlink/?LinkId=235160](http://go.microsoft.com/fwlink/?LinkId=235160) for help diagnosing app deployment issues. (0x8000ffff). If you can't install TradingView Desktop due to this error, use Windows PowerShell to install the app. Go to [this article](https://www.tradingview.com/?solution=43000649586) to learn more. Installation fails with error 0x80092004 Error message: Failed application installation with error message: Appinstaller operation failed with error code 0x80092004. Detail: Cannot find the object or property. (0x80092004) . If you get this error when installing TradingView Desktop, download [this MSIX file](https://tvd-packages.tradingview.com/stable/1.0.3/win32/x64/TradingView.msix) and install the app with it. Installed this way, the app won't be able to auto-update, so please make sure you follow our announcements on app updates and install them manually. Error in parsing the app package Some software installed on a computer and also network configuration coming from an Internet provider may prevent App Installer from starting the installation of TradingView Desktop app. If you get this error when opening TradingView.appinstaller, use Windows PowerShell to install the app. Go to [this article](https://www.tradingview.com/?solution=43000649586) to learn more. Previous Previous How to install and update Desktop app on Linux Next Next How do I install app with PowerShell Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43270871354/original/rE8CzPyTUml_n3ZSnBw0jfPtrcN-zxCk8w.png?1636625807)

**Описание:** This is a **Windows application installation error dialog** for TradingView. Here’s a detailed breakdown:  

### 1. Window & Header  
- **Title Bar**: Displays “TradingView installation failed” (window title) with standard Windows controls: minimize (–), maximize (□), and close (×) buttons.  
- **TradingView Logo**: Black square with white “TV” logo in the top-right corner.  


### 2. App Identification  
- **Trusted App Badge**: Green checkmark icon with “Trusted App” text, indicating the app is verified.  
- **Publisher**: “TradingView, Inc.” (developer).  
- **Version**: “1.0.0.2062” (app version).  


### 3. Capabilities  
- Lists “Uses all system resources” (permission the app requests).  


### 4. Error Details (Core Message)  
- **Section Title**: “Reason:” (explains the installation failure).  
- **Highlighted Error Box**: Blue border surrounds the error text:  
  *“App installation failed with error message: Windows cannot install package TradingView.Desktop_1.0.0.2062_x64__n534cvy3pjxzj because a different package TradingView.Desktop_1.0.0.1906_x64__r4b1km8ya33za with the same name is already installed.”*  
  This explains the failure: A conflicting (older) version of TradingView is already installed, blocking the new installation.  


### 5. Additional UI Element  
- **Info Icon**: Blue circle with “i” (bottom-left) — likely a tooltip or help button for more details (not expanded here).  


### Purpose  
The dialog informs the user that the TradingView installation failed due to a pre-existing (different version) installation. It provides technical details to diagnose the issue (e.g., conflicting package names/versions).


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43276156199/original/1DL7M82h7HE9IFUZ1tYhPVwg7RBt4bX4fg.png?1638281002)

**Описание:** The image is a **Windows error dialog** (not a TradingView image) with the following elements:  

### 1. Window Controls (Top-Right)  
- **Minimize** (–), **Maximize/Restore** (□), and **Close** (×) buttons: Standard window management controls.  


### 2. Header  
- **Title**: *“Cannot open app package”* (bold, large text) – Indicates the error type.  
- **Icon**: A brown cardboard box (📦) – Visual metaphor for an “app package” (e.g., a software installer or app file).  


### 3. Error Details  
- **Label**: *“Reason:”* (small text) – Introduces the error explanation.  
- **Error Message Box**: A blue-outlined text field containing *“Error in parsing the app package.”* – Specifies the issue (failed to interpret the app package’s structure).  


### 4. Additional UI  
- **Info Icon** (ⓘ, bottom-left): A circular “i” button – Likely provides more details about the error when clicked.  


This dialog informs the user that a Windows app package failed to open due to a parsing error (e.g., corrupted file, invalid format).


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

