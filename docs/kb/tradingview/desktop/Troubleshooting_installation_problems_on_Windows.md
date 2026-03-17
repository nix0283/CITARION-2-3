# Troubleshooting installation problems on Windows

**URL:** https://www.tradingview.com/support/solutions/43000635187-troubleshooting-installation-problems-on-windows/

---

- [ Help Center ](/)
- / 
- / [ Installation and troubleshooting ](/support/folders/43000577553-installation-and-troubleshooting/)
- / [ Troubleshooting installation problems on Windows ](/support/solutions/43000635187-troubleshooting-installation-problems-on-windows/)

# Troubleshooting installation problems on Windows 
 Before installing the app, please refer to [this article](https://www.tradingview.com/?solution=43000624193) to make sure that your system meets the minimum requirements.

#### How to launch .appinstaller files

TradingView Desktop for Windows is distributed as an app package (file TradingView.appinstaller). Usually, Windows can work with such files right out of the box but sometimes your Windows may not recognize appinstaller files (more often when your system is not up to date). In this case, you will see the "How do you want to open this file?" dialog when running the TradingView app package. As the first thing to do, we always recommend updating your Windows up to the most recent version. If that is not possible, use [App Installer for Windows 10](https://www.microsoft.com/p/app-installer/9nblggh4nns1) from Microsoft Store to install the TradingView Desktop on your computer.

#### Installation fails with error “Windows cannot install package”

This is an upgrade error. TradingView Desktop starting with version **beta.13** (1.0.0.2062) is not backward compatible with earlier versions. This means that beta.13 and later versions can’t be installed as an upgrade to version **beta.12** (1.0.0.1906) or earlier. You should uninstall the app and then install the most recent version available for download [here](https://www.tradingview.com/desktop/). Once you have the beta.13 version installed, all upcoming releases will be installed automatically as usual.

#### Installation fails with error 0x80070490

A few users have reported to us that the app cannot be installed due to an error message that says “*App installation failed with the following error message: error 0x80070490: Opening the package from location TradingView.msix failed. (0x80070490).*” If you face this, we recommend installing the Windows update of September 14, 2021 (KB5005565) or newer. Learn more about getting this update [here](https://support.microsoft.com/topic/september-14-2021-kb5005565-os-builds-19041-1237-19042-1237-and-19043-1237-292cf8ed-f97b-4cd8-9883-32b71e3e6b44).

#### Installation on Windows 11 fails with error 0x800B010A

Error message: *This app package is not signed with a trusted certificate. Contact your system administrator or the app developer to obtain a new certificate or app package with trusted certificates. The root certificate and all immediate certificates of the signature in the app package must be trusted (0x800B010A)*

If app installation cannot be completed on Windows 11 due to the error above, you should update the App Installer app. For that, go to the Microsoft Store, find App Installer in the Library, and click Update on it.

#### Installation fails with error 0x8000ffff 

Error message: *App installation failed with error message: Deployment Add operation with target volume C: on Package TradingView.Desktop_1.0.0.2087_x64__n534cwy3pjxzj from: (TradingView.msix) failed with error 0x8000FFFF. See [http://go.microsoft.com/fwlink/?LinkId=235160](http://go.microsoft.com/fwlink/?LinkId=235160) for help diagnosing app deployment issues. (0x8000ffff).*

If you can't install TradingView Desktop due to this error, use Windows PowerShell to install the app. Go to [this article](https://www.tradingview.com/?solution=43000649586) to learn more.

#### Installation fails with error 0x80092004 

Error message: *Failed application installation with error message: Appinstaller operation failed with error code 0x80092004. Detail: Cannot find the object or property. (0x80092004)**.*

If you get this error when installing TradingView Desktop, download [this MSIX file](https://tvd-packages.tradingview.com/stable/1.0.3/win32/x64/TradingView.msix) and install the app with it. Installed this way, the app won't be able to auto-update, so please make sure you follow our announcements on app updates and install them manually.

#### Error in parsing the app package 

Some software installed on a computer and also network configuration coming from an Internet provider may prevent App Installer from starting the installation of TradingView Desktop app. 

If you get this error when opening TradingView.appinstaller, use Windows PowerShell to install the app. Go to [this article](https://www.tradingview.com/?solution=43000649586) to learn more.

 Previous Previous How to install and update Desktop app on Linux Next Next How do I install app with PowerShell Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43270871354/original/rE8CzPyTUml_n3ZSnBw0jfPtrcN-zxCk8w.png?1636625807

**Описание:**

This image shows a **Windows application installation error dialog** for TradingView. Here's a detailed breakdown of the interface elements:


### **1. Window Header**
- **Title Bar**: Displays \

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43276156199/original/1DL7M82h7HE9IFUZ1tYhPVwg7RBt4bX4fg.png?1638281002

**Описание:**

The image shows a **Windows error dialog box** (not a TradingView interface) with the following elements:  

### 1. Window Title Bar  
- **Top-right buttons**: Minimize (`-`), Maximize (`□`), and Close (`×`) buttons (standard Windows window controls).  


### 2. Main Content Area  
- **Header Text**: “Cannot open app package” (bold, black font) – indicates the error’s core issue.  
- **Icon**: A brown cardboard box (representing an “app package” or software installation file) to the right of the header, visually reinforcing the error’s context.  


### 3. Error Details Section  
- **Label**: “Reason:” (smaller, gray font) – introduces the explanation for the error.  
- **Error Message Box**: A blue-outlined text box containing “Error in parsing the app package.” (black font) – this is the specific error: the system failed to interpret the app package’s structure.  


### 4. Additional UI Element  
- **Info Icon**: A small blue circle with a white “i” (information symbol) at the bottom-left – typically provides more details about the error when clicked (e.g., troubleshooting steps).  


### Key Takeaway  
This is a **system-level error dialog** (not TradingView) indicating a failure to open an app package due to a parsing error. The UI elements (title bar, header, error details, info icon) are standard for Windows error messages, designed to communicate the issue clearly.

---

