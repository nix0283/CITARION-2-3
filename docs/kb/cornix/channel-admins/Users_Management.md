# Users Management

**URL:** https://help.cornix.io/en/articles/5814960-users-management

**Created:** 2026-03-03T11:55:01+00:00

---

Users Management | Cornix Help Center- - - - - - :root{--body-bg: rgb(255, 255, 255);
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
Quick OverviewUsers Tab Available actions on the Users tab:*User Status OverviewInvitations TabInvite UsersHow to Create an InvitationChannel ConfigurationLicenses- All Collections
- Channel Admins
- Users Management
- Users Management
# Users Management
Managing your Telegram channel and users through your Admin Interface
Written by Hadar Cornix Updated over a month agoTable of contents
Quick OverviewUsers Tab Available actions on the Users tab:*User Status OverviewInvitations TabInvite UsersHow to Create an InvitationChannel ConfigurationLicenses
This guide walks you through the key group admins' features and shows you how to effectively manage your channel.

## Quick Overview
As a group admin, Cornix allows you to:
-
Invite new users to your group
-
Manage subscription expiration dates
-
Monitor unauthorized access
-
Assign licenses to your members
-
And more…
To get to your Users Management page, navigate to your Cornix Dashboard (web or app)> on the top right bar, choose "Admin Interface" > go to "Users Management" page.


At the top of each page on the Admin Interface, you can choose the channel that you want to review or edit configurations for.



# Users Tab
Under the user's tab, you'll get an overview of all the channel users.
This is the main page where you will be able to manage your users, remove users from the group, change users' expiration dates, approve users, and assign Cornix Licenses to your users.

Note: currently, only Telegram channels can be managed via the Admin Interface. Discord channels are not yet supported for this feature.


# Available actions on the Users tab:
-
## View user list by filters:
Use the filters to view your users by:
Status (Any status, banned, expired, inactive, pending, active, unauthorized)
Expiration Time (Any expiration, next hour/day/week/month, lifetime, not set)
License Status (Any status, expired, expires soon, active)
Hide Bots toggle - choose if you want to include bots in your users view or not.
-
## Modify expiration date:
To modify a user's expiration date, click on the value in the 'Group Expiration' column and proceed to select a new date, then click 'Save'.

Setting an expiration date for users will allow you to identify expired users. In addition, under the "Configuration" tab, you'll have the option to automatically kick users with expired subscriptions. More on that later.


-
## Change user's status:
Click the '...' next to each user line, to change the user's status or start a chat with them on telegram.
The actions you see might change depending on the current status of the user.
Note:
When changing a status from 'Unauthorized' to 'Authorized', you can set an expiration date for the user's subscription, and from that moment all regular rules and automations will apply on this user.
​

## *User Status Overview
The status column will show you the current user status. Here's a short explanation about each status:
-
Banned - Will be assigned to any user that you banned manually via the Cornix dashboard. For the status to be reflected correctly, make sure to ban the user via the Cornix interface instead of banning them on Telegram.
-
Expired (Banned) - When your configuration is set to automatically kick users with expired subscriptions, all expired users who were kicked will get this status.
-
Expired (In Group) - Users whose subscription expired but are still in the group, usually because the configuration is not set to kick them automatically.
-
Inactive - Authorized users who left the channel. Therefore they appear as inactive.
-
Pending - Approved users who are not in the group (including users who received an invitation to join the group but did not join yet). When pending users join the channel, their status will change to Active.
-
Active - Active, authorized users in the channel.
-
Unauthorized - Users who joined the channel without receiving an Cornix generated invitation (possibly joined directly via Telegram).
​
# Invitations Tab
## Invite Users
Using Cornix invitations, you will be able to invite users to your channel and assign them a specific subscription durations. The invitations section will allow you to see a list of all the channel invitations and their status!


If the invitation was accepted at least once, clicking the invitation table row will expand it and show additional information about which user accepted the invitation.

Click the '...' next to each invitation, to see more invitation actions.
Copy link - Copy the invitation's link to send it to more users.
Edit - Edit the invitation's number of users and subscription duration.
Deactivate - Deactivating an invitation will prevent users from being able to accept it. Delete - If the invitation was not yet accepted, you will have the option to delete it completely.



# How to Create an Invitation
Click the "+Invite Users" button on the top right corner of the screen, to open the "Create Invitation" page.

To change the invitation's parameters, move the slider or click on the input field to insert a custom value.


When the invitation is limited to 1 user only, you will also be able to provide a Telegram Username or Telegram ID for the invitation. This will limit the invitation so it can only be accepted by a specific user.

After clicking "Create", you'll get an overview of the invitation details.
Copy the invitation link and send it to your users.



Once a user clicks the invitation link, they will be redirected to a chat with the Cornix group's bot, where they will get a link to join your Telegram channel.

Important Note: An invitation link does not replace a referral link when inviting a new user to Cornix.
If the user you’re sharing the invitation link with is not yet registered to Cornix, make sure to also share your referral link, so you can receive your referral commission.
The referral link can be used before or after using the channel's invitation link.
👉 Learn more about Referral Links here


# Channel Configuration
In the "Configuration" tab, you will be able to modify the channel's user's management configurations.


General Configuration - Allows you to control the default behavior for expired and unauthorized users.
The options are:
-
Kick Expired Users - On/Off
-
Kick Unauthorized Users - On/Off
When the two parameters are not checked, Cornix will not kick expired and unauthorized users from the channel automatically.

Alert Users Before Channel Subscription Expiration - Choose when to alert your users before their channel subscription ends.
The options are:
-
Alert 1 Day Before
-
Alert 7 Day Before
Make sure to click "Save" every time you change your settings.


# Licenses
The License Menu option allows you to purchase discounted Cornix subscriptions and distribute them to your users at any time.
Contact Cornix support to activate the License Menu feature on your account. Once the feature is activated on your account, it will be available via your Cornix Telegram Bot. Click here to learn more about it.
Did this answer your question?😞😐😃Cornix Help Center-
-
-
-
Intercom
We run on Intercom
window.intercomSettings = {"app_id":"wrsw0nb0","article_id":"5814960","anonymous_id":"cfb522a1-a8ed-475f-be79-5aeb6d163e26"};
(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/wrsw0nb0';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
\n\n---\n\n## Изображения\n\n### Изображение 1\n\n![Image 1](https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016809453/0df3377bc31d2b70b09b58d7e33b/image.png?expires=1772541000&amp;signature=93d08cc9291e7c117d10ee81da983ce34fa050c2ed03a2a354576f1d03479d34&amp;req=diAmEMF%2BlIVaWvMW1HO4zYnNOVNv5xR%2FFwDVCyaiQgJBJkz%2F8uHs8ToS7c%2BU%0AHwCJp1f3MoBTnxLSW4w%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016809453/0df3377bc31d2b70b09b58d7e33b/image.png?expires=1772541000&amp;signature=93d08cc9291e7c117d10ee81da983ce34fa050c2ed03a2a354576f1d03479d34&amp;req=diAmEMF%2BlIVaWvMW1HO4zYnNOVNv5xR%2FFwDVCyaiQgJBJkz%2F8uHs8ToS7c%2BU%0AHwCJp1f3MoBTnxLSW4w%3D%0A\n\n**Описание:** The Cornix trading bot interface shows a left sidebar with "Workspaces" (including "Admin Interface" and "User Interface") and menu items like "Trading Configuration" and "Signals Terminal." The main section displays a "Users Management" tab with sub-tabs ("Users," "Invitations," "Configuration"), filter options, a search bar, and a table with columns for user details (First Name, Last Name, Username, etc.). Top-right elements include cryptocurrency price widgets (BTC/USDT, ETH/USDT, ADA/USDT), a "Create Bot" button, and "Buy Licenses"/"Invite Users" buttons.\n\n---\n\n### Изображение 2\n\n![Image 2](https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016828966/ac53b588b5560f5580e7ae57d7bf/image.png?expires=1772541000&amp;signature=3cd6fa815d9ce0c924abf106a2cfe8d0901b39314688d43cbcb210fa2ae6f87a&amp;req=diAmEMF8lYhZX%2FMW1HO4zXHQaUOMFAFy2%2BMAxwNuK0UWUFbq7iV5J8YfzuHx%0A8pyqT9oO1Smm4oPphAY%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016828966/ac53b588b5560f5580e7ae57d7bf/image.png?expires=1772541000&amp;signature=3cd6fa815d9ce0c924abf106a2cfe8d0901b39314688d43cbcb210fa2ae6f87a&amp;req=diAmEMF8lYhZX%2FMW1HO4zXHQaUOMFAFy2%2BMAxwNuK0UWUFbq7iV5J8YfzuHx%0A8pyqT9oO1Smm4oPphAY%3D%0A\n\n**Описание:** The Cornix trading bot screenshot shows a "Users Management" interface with a left sidebar containing navigation options like "Admin Interface," "Users Management," and "Trading Configuration." A dropdown menu labeled "Signal Channel" is expanded, displaying options like "Signal Channel," "Signal Channel Spot," "Signal Channel Futures," and "Signal Channel VIP." The top right includes cryptocurrency price widgets (BTC/USDT, ETH/USDT, ADA/USDT) and buttons for "Create Bot," "Buy Licenses," and "Invite Users," while a table below has columns for user details (First Name, Last Name, Username, etc.).\n\n---\n\n### Изображение 3\n\n![Image 3](https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016896727/b2f154d133760fa919fe15aad1fe/image.png?expires=1772541000&amp;signature=22c7381ef0d62088870b37932cba9d1f743136a82f2166a4b692e4b4e93ef9d0&amp;req=diAmEMF3m4ZdXvMW1HO4zZj%2BmmkbaommneRv30JghJzdO9bKK78TBr0zNKft%0Akk1Gs6xesIQIA0CXOfI%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016896727/b2f154d133760fa919fe15aad1fe/image.png?expires=1772541000&amp;signature=22c7381ef0d62088870b37932cba9d1f743136a82f2166a4b692e4b4e93ef9d0&amp;req=diAmEMF3m4ZdXvMW1HO4zZj%2BmmkbaommneRv30JghJzdO9bKK78TBr0zNKft%0Akk1Gs6xesIQIA0CXOfI%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a calendar pop - up (set to February 2026) open, likely for setting a "Group Expiration" date. The table behind the pop - up has columns like "Telegram ID", "Group Expiration", "License Status", and "Status", with rows containing blurred Telegram IDs, expiration statuses (e.g., "Lifetime", "Not Set", dates), license statuses (e.g., "Active", "Expired (Banned)"), and a "Save" button at the bottom of the calendar.\n\n---\n\n### Изображение 4\n\n![Image 4](https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016899492/95de611072fe41d5394b3a426c13/image.png?expires=1772541000&amp;signature=2cb6c484bfadf8e23bc35425e6ae6a7c5836b632a6fba272e4f14bb07d73f178&amp;req=diAmEMF3lIVWW%2FMW1HO4zUmJB6PxNDlwtXr65bEbWOC0E1C0fFGmDB91jEgg%0AhmTqYlzfm%2FSzppAvdls%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016899492/95de611072fe41d5394b3a426c13/image.png?expires=1772541000&amp;signature=2cb6c484bfadf8e23bc35425e6ae6a7c5836b632a6fba272e4f14bb07d73f178&amp;req=diAmEMF3lIVWW%2FMW1HO4zUmJB6PxNDlwtXr65bEbWOC0E1C0fFGmDB91jEgg%0AhmTqYlzfm%2FSzppAvdls%3D%0A\n\n**Описание:** The Cornix trading bot interface displays a "Users Management" section with a left sidebar containing navigation options (e.g., "Trading Configuration," "Signals Terminal") and a main panel showing a user table with columns for First Name, Last Name, Username, Telegram ID, Group Expiration, License Status, and Status. Top UI elements include a "Signal Channel" dropdown, cryptocurrency price widgets (BTC/USDT, ETH/USDT, ADA/USDT), and action buttons like "Create Bot" and "Buy Licenses."\n\n---\n\n### Изображение 5\n\n![Image 5](https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016929885/4b5455d2ac3d4b301f6a5780f30c/image.png?expires=1772541000&amp;signature=dfcf3239cad13a164310518a65a4a5444dc945994653c422fe28b914c88a2d99&amp;req=diAmEMB8lIlXXPMW1HO4zUuAPgauQs6H2Yozz8vz6AyvWTCi73h6eTuC1h9v%0ABoFs%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016929885/4b5455d2ac3d4b301f6a5780f30c/image.png?expires=1772541000&amp;signature=dfcf3239cad13a164310518a65a4a5444dc945994653c422fe28b914c88a2d99&amp;req=diAmEMB8lIlXXPMW1HO4zUuAPgauQs6H2Yozz8vz6AyvWTCi73h6eTuC1h9v%0ABoFs%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a table displaying **License Status** and **Status** columns. Each row has a colored dot (green for "Active," yellow for "Pending," orange for "Inactive") next to the status, and a three-dot menu icon on the right. A blue arrow points to a dropdown menu with options: "Lifetime," "Chat," and "Kick" (in red text).\n\n---\n\n### Изображение 6\n\n![Image 6](https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016941168/f738933a6e5c3132ef6d6148fc7c/image.png?expires=1772541000&amp;signature=cd406a99040e134e54d556a09c27516fe4b673e50fda6cabdcbd7e22f223eed3&amp;req=diAmEMB6nIBZUfMW1HO4zWQO%2FIX%2FZ2nXnRK0jtNnCWAh3ymOzsjVnfuxUqG5%0Ajtgg919o0mdCZJKppgQ%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016941168/f738933a6e5c3132ef6d6148fc7c/image.png?expires=1772541000&amp;signature=cd406a99040e134e54d556a09c27516fe4b673e50fda6cabdcbd7e22f223eed3&amp;req=diAmEMB6nIBZUfMW1HO4zWQO%2FIX%2FZ2nXnRK0jtNnCWAh3ymOzsjVnfuxUqG5%0Ajtgg919o0mdCZJKppgQ%3D%0A\n\n**Описание:** The Cornix trading bot interface displays a "Users Management" section with a left sidebar containing navigation options like "Admin Interface," "Users Management," and "Trading Configuration." The main content area shows the "Invitations" tab (highlighted) with a table listing invitation details (creation date, username/Telegram ID, duration, acceptance count, and status), alongside blue "Buy Licenses" and "Invite Users" buttons. Top-right elements include currency pair prices (BTC/USDT, ETH/USDT, ADA/USDT) with percentage changes, a "Create Bot" button, and a notification bell icon.\n\n---\n\n### Изображение 7\n\n![Image 7](https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016947961/1c467f0a4a87f47feeed2078642f/image.png?expires=1772541000&amp;signature=19998201c5f6361c1291c37f165e73ed930277d8bb2a4c911c02f9dab2c2a0c0&amp;req=diAmEMB6mohZWPMW1HO4zYmHGIGAEP7GZiM5PsWROXWxu8FgEDj2X5WVYYYI%0ASMjI1R5UEpx8XafVte0%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016947961/1c467f0a4a87f47feeed2078642f/image.png?expires=1772541000&amp;signature=19998201c5f6361c1291c37f165e73ed930277d8bb2a4c911c02f9dab2c2a0c0&amp;req=diAmEMB6mohZWPMW1HO4zYmHGIGAEP7GZiM5PsWROXWxu8FgEDj2X5WVYYYI%0ASMjI1R5UEpx8XafVte0%3D%0A\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a table displaying user data, including columns for "Created," "Username/Telegram ID," "Duration," "# Accepted / # Permitted," and "Status." A highlighted row (bordered in blue) shows details for a May 15th, 25 entry with a 7-day duration, 1/10 acceptance ratio, "Active" status, and a sub-table listing a user ("Username1") with an "Expired (In Group)" status. Additional rows below show other entries, like an April 14th, 25 entry with 180-day duration and 0/50 ratio, also marked "Active."\n\n---\n\n### Изображение 8\n\n![Image 8](https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016955064/18893f19bf1b4bb6a7638c83530d/image.png?expires=1772541000&amp;signature=9fc78cf6f26825a4306d5d5d8a79424ff40ac7169656e012e07deec86f4a8e39&amp;req=diAmEMB7mIFZXfMW1HO4zYWQIJu%2FO5Fn6eKltiw38QUlWlytfDKnHBnbOUSH%0A%2Ffj1nGL8U4SasRSfCCY%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016955064/18893f19bf1b4bb6a7638c83530d/image.png?expires=1772541000&amp;signature=9fc78cf6f26825a4306d5d5d8a79424ff40ac7169656e012e07deec86f4a8e39&amp;req=diAmEMB7mIFZXfMW1HO4zYWQIJu%2FO5Fn6eKltiw38QUlWlytfDKnHBnbOUSH%0A%2Ffj1nGL8U4SasRSfCCY%3D%0A\n\n**Описание:** The screenshot displays a table from the Cornix trading bot interface, listing trading bot entries with columns for **Created** (date), **Username/Telegram ID** (set to "All"), **Duration**, **# Accepted / # Permitted** (usage metrics), and **Status** (all marked "Active" with green dots). A dropdown menu (triggered by a three-dot icon) is open, showing options: "Copy Link", "Edit", and "Deactivate" (highlighted in yellow).\n\n---\n\n### Изображение 9\n\n![Image 9](https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016970299/c751feed330a0bc918c8467bab14/image.png?expires=1772541000&amp;signature=966d4db586de8ad00dbbc7d1bfd2538e9e1bbb9b1dda39f65479a1ebe3b8814b&amp;req=diAmEMB5nYNWUPMW1HO4zavWUjVFM9qtZi02Lb4Ad9rlVwD3v8PKpnYUG%2Bd7%0A%2FGZSXBPicrTEcltG1Gs%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016970299/c751feed330a0bc918c8467bab14/image.png?expires=1772541000&amp;signature=966d4db586de8ad00dbbc7d1bfd2538e9e1bbb9b1dda39f65479a1ebe3b8814b&amp;req=diAmEMB5nYNWUPMW1HO4zavWUjVFM9qtZi02Lb4Ad9rlVwD3v8PKpnYUG%2Bd7%0A%2FGZSXBPicrTEcltG1Gs%3D%0A\n\n**Описание:** The screenshot shows a "Create Invitation" modal in the Cornix trading bot, with a two - step progress bar (step 1: "Create", step 2: "Share"). It has two sliders: one for selecting the number of times the invitation can be used (set to 15, with a text input showing "15") and another for subscription duration (set to 180, with a text input showing "180"). At the bottom, there are "Cancel" and "Create" buttons.\n\n---\n\n### Изображение 10\n\n![Image 10](https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016975560/48b517fc88470db2f2a1d4821737/image.png?expires=1772541000&amp;signature=0eecc4d7b6b11e0a5a94d2752684308e4b86ef169103fe5571dd6b2841c1aefe&amp;req=diAmEMB5mIRZWfMW1HO4zYgHEZp1VzIvXtr7C8IB0kolnQ4a2L75h8rqn18o%0ALa7nQ1%2FfmOZqN82z%2FR8%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016975560/48b517fc88470db2f2a1d4821737/image.png?expires=1772541000&amp;signature=0eecc4d7b6b11e0a5a94d2752684308e4b86ef169103fe5571dd6b2841c1aefe&amp;req=diAmEMB5mIRZWfMW1HO4zYgHEZp1VzIvXtr7C8IB0kolnQ4a2L75h8rqn18o%0ALa7nQ1%2FfmOZqN82z%2FR8%3D%0A\n\n**Описание:** The screenshot shows a "Create Invitation" modal in the Cornix trading bot, with a two - step progress bar (steps 1: "Create" and 2: "Share"). There’s a slider to select the number of times the invitation can be used (set to 1), a "Number of Users" field showing 1, and a section with "Telegram Username" and "Telegram ID" input fields (with an "OR" between them) plus explanatory text about selecting a Telegram ID/username or leaving fields empty.\n\n---\n\n### Изображение 11\n\n![Image 11](https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016980807/5ee1f527599c2788b9fb5d536adb/image.png?expires=1772541000&amp;signature=3b04be1a0e39a557ed3bcd8d1a4d3d066591f71f835b21d2e932b278bc5ebbda&amp;req=diAmEMB2nYlfXvMW1HO4zeed1Fc7DCyX98XuGnRIRuwnA%2BLonbXhs0D%2FoCSC%0AKXbBKxJxT%2BTc1GTntq8%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016980807/5ee1f527599c2788b9fb5d536adb/image.png?expires=1772541000&amp;signature=3b04be1a0e39a557ed3bcd8d1a4d3d066591f71f835b21d2e932b278bc5ebbda&amp;req=diAmEMB2nYlfXvMW1HO4zeed1Fc7DCyX98XuGnRIRuwnA%2BLonbXhs0D%2FoCSC%0AKXbBKxJxT%2BTc1GTntq8%3D%0A\n\n**Описание:** The screenshot shows a "Create Invitation" modal from the Cornix trading bot, displaying a green checkmark and the message "Invitation Created Successfully!" with details: 15 Users and 180 Days subscription duration. A Telegram link (https://t.me/cornix_group...) is provided in a text field with a "Copy" button, and a "Close" button is at the bottom right, while a progress bar indicates the "Create" step (step 1 of 2) is complete.\n\n---\n\n### Изображение 12\n\n![Image 12](https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016993300/5e0d75beee7c4d6b6f5b26f3fa36/image.png?expires=1772541000&amp;signature=f246c20e8a38e1ade741912b5a65855f1083f87365ee790cbc8167031c3601a6&amp;req=diAmEMB3noJfWfMW1HO4zSuOJ0mcXfoF6U3THIOkDG2Kra8L7azo%2BFPigPML%0AWrcy%2FmmqFAGuonGMrjw%3D%0A)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/2016993300/5e0d75beee7c4d6b6f5b26f3fa36/image.png?expires=1772541000&amp;signature=f246c20e8a38e1ade741912b5a65855f1083f87365ee790cbc8167031c3601a6&amp;req=diAmEMB3noJfWfMW1HO4zSuOJ0mcXfoF6U3THIOkDG2Kra8L7azo%2BFPigPML%0AWrcy%2FmmqFAGuonGMrjw%3D%0A\n\n**Описание:** The Cornix trading bot screenshot displays a **Users Management** interface with a left sidebar (showing "Workspaces," "Admin Interface," and menu items like "Trading Configuration," "Signals Terminal") and a main content area. The main section is on the **Configuration** tab, featuring toggles for "Kick Expired Users," "Kick Unauthorized Users," and subscription alerts ("Alert 1 Day Before," "Alert 7 Day Before"), plus a "Save" button. Top-right shows cryptocurrency prices (BTC/USDT, ETH/USDT, ADA/USDT) and action buttons ("Create Bot," "Buy Licenses," "Invite Users").\n\n---\n\n### Изображение 13\n\n![Image 13](https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png)\n\n**URL:** https://downloads.intercomcdn.com/i/o/wrsw0nb0/663085/66f657d34c477c0cb5e0ad55a357/811b89d422741a7d1e34bcfcff4f39f0.png\n\n**Описание:** The screenshot displays the Cornix trading bot’s logo, featuring a stylized dark blue raven holding a yellow object in its beak, positioned above the lowercase text “cornix” in a bold, dark blue font. The design is clean and minimalistic, with the bird perched on a subtle curved line beneath the text, emphasizing the brand’s identity.\n\n---\n\n### Изображение 14\n\n![Image 14](https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg)\n\n**URL:** https://static.intercomassets.com/avatars/5322994/square_128/IMG-20230206-WA0000_%281%29-1678375300.jpeg\n\n**Описание:** The screenshot shows a Cornix trading bot interface with a clean, minimalistic design. Key UI elements include a navigation bar (likely for account, settings, or trading tools), a main dashboard area (possibly displaying trade history, performance metrics, or bot status), and a sidebar (for quick access to features like signal selection, risk management, or bot configuration). The layout emphasizes clarity, with distinct sections for monitoring and controlling automated trading activities.\n\n---\n\n
