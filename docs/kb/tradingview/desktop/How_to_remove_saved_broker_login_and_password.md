# How to remove saved broker login and password

**URL:** https://www.tradingview.com/support/solutions/43000686674-how-to-remove-saved-broker-login-and-password/

---

- [ Help Center ](/)
- / 
- / [ Features and configuration ](/support/folders/43000574972-features-and-configuration/)
- / [ How to remove saved broker login and password ](/support/solutions/43000686674-how-to-remove-saved-broker-login-and-password/)

# How to remove saved broker login and password 
 **Windows**
1. Open the Start menu and type *Credential Manager. *

2. Find a record named TradingView Desktop/##### in WIndows Credentials

3. Select it and then click the *Remove* button

4. Restart TradingView Desktop

**macOS**

1. Launch Keychain Access and find a record named "TradingView Desktop" in Local Items

2. Right-click it and select *Delete "TradingView Desktop"*
*3. *Restart TradingView Desktop

**
 * * 

 Previous Previous How to open a TradingView chart link in Desktop app? Next Next How to launch Desktop app at system startup Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43378090244/original/6b7qIUqKu_5Zh1VERcjz1c6UdrLpp6Ejyg.png?1670490312

**Описание:**

The image shows the **Windows Credential Manager** interface (from the Windows Control Panel), not a TradingView interface. Here’s a detailed breakdown of the UI elements, their purposes, and what the window displays:  


### 1. Window & Navigation Bar  
- **Title Bar**: Displays “Credential Manager” (window title) with standard window controls: minimize (`-`), maximize (`□`), and close (`×`) buttons.  
- **Address Bar (Breadcrumb Navigation)**: Shows the path: `All C... > Credentia...` (truncated, indicating the “Credential Manager” section of the Control Panel). Includes a back arrow, forward arrow, refresh icon, and a search icon.  


### 2. Main Content Area  
The window is divided into sections for managing saved login credentials:  

#### Header Section  
- **“Manage your credentials”**: Title of the page.  
- **Subtext**: *“View and delete your saved logon information for websites, connected applications and networks.”* (Explains the purpose of the tool.)  


#### Credential Categories (Tabs/Sections)  
Two primary categories are highlighted:  
- **Web Credentials** (left, with a globe icon): Manages credentials for websites.  
- **Windows Credentials** (right, with a Windows icon, highlighted in blue): Manages credentials for Windows applications/networks (currently active).  


#### Action Links (Top of Credential Sections)  
- **“Back up Credentials”**: Saves all stored credentials to a file (for backup/recovery).  
- **“Restore Credentials”**: Imports credentials from a previously backed-up file.  


#### Windows Credentials Section  
This section lists credentials for Windows applications/networks:  

- **“Add a Windows credential”** (right-aligned link): Allows adding a new Windows credential (e.g., for a network share or application).  
- **“No Windows credentials.”**: Indicates no Windows-specific credentials are currently stored.  


#### Certificate-Based Credentials Section  
- **“Add a certificate-based credential”** (right-aligned link): For adding credentials tied to digital certificates.  
- **“No certificates.”**: Indicates no certificate-based credentials are stored.  


#### Generic Credentials Section  
Manages generic (non-Windows, non-certificate) credentials (e.g., website logins):  

- **“Add a generic credential”** (right-aligned link): Adds a new generic credential.  
- **“TradingView Desktop/MyLogin”**: A specific generic credential entry (for TradingView Desktop).  
  - **Details**:  
    - *“Internet or network address: TradingView Desktop/MyLogin”*: The target (e.g., a website or application URL).  
    - *“User name: MyLogin”*: The username for this credential.  
    - *“Password: ******”*: The password (masked for security).  
    - *“Persistence: Enterprise”*: How the credential is stored (e.g., for enterprise use).  
    - **Action Links**: *“Edit”* (modify the credential) and *“Remove”* (delete the credential).  
    - *“Modified: Today”* (with an arrow icon): Timestamp showing when the credential was last modified.  


#### Additional Entry: XboxLive  
- A second generic credential entry for “XboxLive”:  
  - *“Modified: Today”* (with an arrow icon): Timestamp for when this credential was last modified.  


### 3. Sidebar (Left)  
- **“Control Panel Home”**: Link to return to the main Control Panel.  
- **“See also”**: Section with a link to *“User Accounts”* (for managing user account settings).  


### Purpose of the Interface  
This window lets users **view, edit, or delete saved login credentials** (passwords, usernames) for websites, applications, and networks. It organizes credentials into categories (Web, Windows, Certificate-Based, Generic) and provides tools to back up/restore credentials for security.  


### Note on “TradingView”  
The “TradingView Desktop/MyLogin” entry is a *generic credential* (not a TradingView interface). It represents a saved login for the TradingView Desktop application, stored in Windows’ credential manager.

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43378401691/original/0ssVxhnAxgkVdVIf05GJS3Q5C95IpMFOHg.png?1670591452

**Описание:**

The image shows the **Keychain Access** application on macOS, specifically displaying a keychain item for **TradingView Desktop**. This is not the TradingView trading platform interface itself, but rather macOS's built-in tool for managing passwords, certificates, and secure data. Here's a detailed breakdown:


### **1. Overall Layout & Sections**
The window is divided into two main panels:  
- **Left Sidebar**: Lists keychain categories (Default Keychains, Custom Keychains, System Keychains).  
- **Main Content Area**: Displays details of the selected keychain item (TradingView Desktop) and a table of items.  


### **2. Left Sidebar (Keychain Categories)**
- **Keychains**: Header for the sidebar.  
- **Default Keychains**:  
  - `login`: A default keychain (for user login credentials).  
  - `Local Items`: Currently selected (highlighted in gray), showing local (user-specific) keychain items.  
- **Custom Keychains**:  
  - `openvpn`: A custom keychain (likely for OpenVPN credentials).  
- **System Keychains**:  
  - `System`: A system-level keychain.  
  - `System Roots`: A system-level keychain for root certificates.  


### **3. Top Bar (Keychain Access Header)**
- **Title**: \

---

