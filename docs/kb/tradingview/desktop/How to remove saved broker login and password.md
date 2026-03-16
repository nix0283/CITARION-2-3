# How to remove saved broker login and password

**URL:** https://www.tradingview.com/support/solutions/43000686674-how-to-remove-saved-broker-login-and-password/

---

- [ Help Center ](/) - / - / [ Features and configuration ](/support/folders/43000574972-features-and-configuration/) - / [ How to remove saved broker login and password ](/support/solutions/43000686674-how-to-remove-saved-broker-login-and-password/) # How to remove saved broker login and password **Windows** 1. Open the Start menu and type Credential Manager. 2. Find a record named TradingView Desktop/##### in WIndows Credentials 3. Select it and then click the Remove button 4. Restart TradingView Desktop **macOS** 1. Launch Keychain Access and find a record named "TradingView Desktop" in Local Items 2. Right-click it and select Delete "TradingView Desktop" 3. Restart TradingView Desktop Previous Previous How to open a TradingView chart link in Desktop app? Next Next How to launch Desktop app at system startup Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43378090244/original/6b7qIUqKu_5Zh1VERcjz1c6UdrLpp6Ejyg.png?1670490312)

**Описание:** The image displays the **Windows Credential Manager** interface (Control Panel) for managing saved login credentials. Here’s a detailed breakdown:  


### 1. **Window & Navigation Bar**  
- **Title Bar**: “Credential Manager” (window title).  
- **Navigation Bar**:  
  - Back/Forward arrows, “All C...” (breadcrumb for “All Control Panel Items”), “Credentia...” (breadcrumb for “Credential Manager”), a refresh icon, and a search bar.  
  - “Control Panel Home” link (returns to the main Control Panel).  


### 2. **Main Header & Description**  
- **Title**: *“Manage your credentials”*  
- **Subtitle**: *“View and delete your saved logon information for websites, connected applications and networks.”*  


### 3. **Credential Categories**  
Two primary sections for credential types:  
- **Web Credentials** (globe + safe icon): Manages credentials for websites.  
- **Windows Credentials** (computer + safe icon, highlighted in blue): Manages credentials for Windows applications/networks.  


### 4. **Action Links**  
- *“Back up Credentials”* / *“Restore Credentials”*: For saving/restoring credential data.  


### 5. **Windows Credentials Section**  
- **Header**: *“Windows Credentials”*  
- **Action Link**: *“Add a Windows credential”* (to add new Windows credentials).  
- **Status**: *“No Windows credentials.”* (no saved Windows credentials exist).  


### 6. **Certificate-Based Credentials Section**  
- **Header**: *“Certificate-Based Credentials”*  
- **Action Link**: *“Add a certificate-based credential”* (to add new certificate credentials).  
- **Status**: *“No certificates.”* (no saved certificates exist).  


### 7. **Generic Credentials Section**  
- **Header**: *“Generic Credentials”*  
- **Action Link**: *“Add a generic credential”* (to add new generic credentials).  
- **List of Credentials**:  
  - **TradingView Desktop/MyLogin**:  
    - Details: *“Internet or network address: TradingView Desktop/MyLogin”*, *“User name: MyLogin”*, *“Password: ******”* (hidden), *“Persistence: Enterprise”*.  
    - Actions: *“Edit”* / *“Remove”* (modify/delete the credential).  
    - Metadata: *“Modified: Today”* (timestamp with an expand arrow).  
  - **XboxLive**:  
    - Metadata: *“Modified: Today”* (timestamp with an expand arrow, no additional details shown).  


### 8. **Footer**  
- *“See also”* section with a link to *“User Accounts”*.  


### Purpose of the Interface  
This tool lets users view, edit, or delete saved login data (passwords, certificates) for websites, Windows apps, and networks. It organizes credentials by type (Web, Windows, Certificate, Generic) and provides options to back up, restore, or add new credentials.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43378401691/original/0ssVxhnAxgkVdVIf05GJS3Q5C95IpMFOHg.png?1670591452)

**Описание:** This is a **macOS Keychain Access** window showing a keychain entry for *TradingView Desktop*. Here’s a detailed breakdown:  


### 1. **Window & Header**  
- **Title**: “Keychain Access” (top-left).  
- **Search Bar**: Top-right, with “TradingView” entered (filters results).  
- **Icons**: Pencil (edit), info (details), and a close (×) button.  


### 2. **Sidebar (Left Panel)**  
Organizes keychains into categories:  
- **Default Keychains**:  
  - *login* (selected, blue lock icon).  
  - *Local Items* (gray, highlighted).  
- **Custom Keychains**: *openvpn* (blue lock).  
- **System Keychains**: *System* (blue lock), *System Roots* (blue lock).  


### 3. **Tab Bar**  
Filters keychain items: *All Items* (selected), *Passwords*, *Secure Notes*, *My Certificates*, *Keys*, *Certificates*.  


### 4. **Main Content Area**  
Displays details for the *TradingView Desktop* entry:  
- **Icon & Name**: Pencil icon + “TradingView Desktop”.  
- **Metadata**:  
  - *Kind*: “application password”.  
  - *Account*: “MyLogin”.  
  - *Where*: “TradingView Desktop”.  
  - *Modified*: “Yesterday, 11:23”.  


### 5. **Table View**  
Lists keychain items with columns: *Name*, *Kind*, *Date Modified*, *Expires*, *Keychain*.  
- The *TradingView Desktop* row is **selected** (blue highlight).  


### 6. **Context Menu** (Right-Click Menu)  
Appears over the selected row, with options:  
- *Copy Password to Clipboard* (copy the password).  
- *Copy “TradingView Desktop”* (copy the item name).  
- *Delete “TradingView Desktop”* (highlighted in blue, to delete the entry).  
- *Get Info* (view detailed properties).  


### Purpose  
This window manages saved passwords/certificates. Here, it shows a password for *TradingView Desktop* (stored in the *login* keychain) with options to copy, delete, or view details. The search bar filters results, and the sidebar organizes keychains by type.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

