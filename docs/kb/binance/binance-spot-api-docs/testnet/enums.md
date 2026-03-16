# binance-spot-api-docs/testnet/enums

> **Source:** https://developers.binance.com/docs/binance-spot-api-docs/testnet/enums

<!-- Raw HTML content from page -->
<!doctype html>
<html lang="en" dir="ltr" class="docs-wrapper plugin-docs plugin-id-default docs-version-current docs-doc-page docs-doc-id-binance-spot-api-docs/testnet/enums" data-has-hydrated="false">
<head>
<meta charset="UTF-8">
<meta name="generator" content="Docusaurus v3.4.0">
<title data-rh="true">Enums | Binance Open Platform</title><meta data-rh="true" name="viewport" content="width=device-width,initial-scale=1"><meta data-rh="true" name="twitter:card" content="summary_large_image"><meta data-rh="true" property="og:url" content="https://developers.binance.com/docs/binance-spot-api-docs/testnet/enums"><meta data-rh="true" property="og:locale" content="en"><meta data-rh="true" property="og:locale:alternate" content="zh_CN"><meta data-rh="true" name="docusaurus_locale" content="en"><meta data-rh="true" name="docsearch:language" content="en"><meta data-rh="true" name="docusaurus_version" content="current"><meta data-rh="true" name="docusaurus_tag" content="docs-default-current"><meta data-rh="true" name="docsearch:version" content="current"><meta data-rh="true" name="docsearch:docusaurus_tag" content="docs-default-current"><meta data-rh="true" property="og:title" content="Enums | Binance Open Platform"><meta data-rh="true" name="description" content="This will apply for both REST API and WebSocket API."><meta data-rh="true" property="og:description" content="This will apply for both REST API and WebSocket API."><link data-rh="true" rel="icon" href="/docs/img/favicon.png"><link data-rh="true" rel="canonical" href="https://developers.binance.com/docs/binance-spot-api-docs/testnet/enums"><link data-rh="true" rel="alternate" href="https://developers.binance.com/docs/binance-spot-api-docs/testnet/enums" hreflang="en"><link data-rh="true" rel="alternate" href="https://developers.binance.com/docs/zh-CN/binance-spot-api-docs/testnet/enums" hreflang="zh-CN"><link data-rh="true" rel="alternate" href="https://developers.binance.com/docs/binance-spot-api-docs/testnet/enums" hreflang="x-default"><link data-rh="true" rel="preconnect" href="https://9I0UZOBSWT-dsn.algolia.net" crossorigin="anonymous"><link rel="preconnect" href="https://www.googletagmanager.com">
<script>window.dataLayer=window.dataLayer||[]</script>
<script>!function(e,t,a,n,g){e[n]=e[n]||[],e[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var m=t.getElementsByTagName(a)[0],r=t.createElement(a);r.async=!0,r.src="https://www.googletagmanager.com/gtm.js?id=GTM-M86QHGF",m.parentNode.insertBefore(r,m)}(window,document,"script","dataLayer")</script>


<link rel="search" type="application/opensearchdescription+xml" title="Binance Open Platform" href="/docs/opensearch.xml"><link rel="stylesheet" href="/docs/assets/css/styles.65c537d6.css">
<script src="/docs/assets/js/runtime~main.beb17562.js" defer="defer"></script>
<script src="/docs/assets/js/main.c8dc629a.js" defer="defer"></script>
</head>
<body class="navigation-with-keyboard">
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M86QHGF" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

<script>!function(){function t(t){document.documentElement.setAttribute("data-theme",t)}var e=function(){try{return new URLSearchParams(window.location.search).get("docusaurus-theme")}catch(t){}}()||function(){try{return window.localStorage.getItem("theme")}catch(t){}}();t(null!==e?e:"light")}(),function(){try{const n=new URLSearchParams(window.location.search).entries();for(var[t,e]of n)if(t.startsWith("docusaurus-data-")){var a=t.replace("docusaurus-data-","data-");document.documentElement.setAttribute(a,e)}}catch(t){}}()</script><div id="__docusaurus"><div role="region" aria-label="Skip to main content"><a class="skipToContent_Mndp" href="#__docusaurus_skipToContent_fallback">Skip to main content</a></div><nav aria-label="Main" class="navbar navbar--fixed-top"><div class="navbar__inner"><div class="navbar__items"><button aria-label="Toggle navigation bar" aria-expanded="false" class="navbar__toggle clean-btn" type="button"><svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M4 7h22M4 15h22M4 23h22"></path></svg></button><a href="https://developers.binance.com/en" target="_self" rel="noopener noreferrer" class="navbar__brand"><div class="navbar__logo"><img src="/docs/img/logo.svg" alt="Binance Logo" class="themedComponent_abzR themedComponent--light_IjiB"><img src="/docs/img/logo.svg" alt="Binance Logo" class="themedComponent_abzR themedComponent--dark_O3Fz"></div></a><div class="productSelectorWrapper_kk2K"><div class="productSelector_tRKy"><button class="productSelectorButton_fwTp"><span>Products</span><span class="arrow_h6A6">▼</span></button></div></div></div><div class="navbar__items navbar__items--right"><div class="navbarSearchContainer_dCNk"><div class="searchContainer_RJ4l"><div class="searchWrapper_Bzvn"><button type="button" class="DocSearch DocSearch-Button" aria-label="Search"><span class="DocSearch-Button-Container"><svg width="20" height="20" class="DocSearch-Search-Icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="DocSearch-Button-Placeholder">Search</span></span><span class="DocSearch-Button-Keys"></span></button><div class="searchModeToggle__Af9"><div class="toggleTrack_B5pz"><button class="toggleOption_jECQ active_d_Ud" title="Search current documentation section">Current</button><button class="toggleOption_jECQ" title="Search all documentation">All</button></div></div></div></div></div><div class="navbar__item dropdown dropdown--hoverable dropdown--right"><a aria-haspopup="true" aria-expanded="false" role="button" class="navbar__link navbar_locale_dropdown" href="/docs/binance-spot-api-docs/testnet/enums"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" class="iconLanguage_JRss"><path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path></svg>English</a><ul class="dropdown__menu"><li><a href="/docs/binance-spot-api-docs/testnet/enums" target="_self" rel="noopener noreferrer" class="dropdown__link dropdown__link--active" lang="en">English</a></li><li><a href="/docs/zh-CN/binance-spot-api-docs/testnet/enums" target="_self" rel="noopener noreferrer" class="dropdown__link" lang="zh-CN">简体中文</a></li></ul></div><div class="toggle_OprV colorModeToggle_x44X"><button class="clean-btn toggleButton_g_ff toggleButtonDisabled_uc5P" type="button" disabled="" title="Switch between dark and light mode (currently light mode)" aria-label="Switch between dark and light mode (currently light mode)" aria-live="polite"><svg viewBox="0 0 24 24" width="24" height="24" class="lightToggleIcon_JliJ"><path fill="currentColor" d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"></path></svg><svg viewBox="0 0 24 24" width="24" height="24" class="darkToggleIcon_dakX"><path fill="currentColor" d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"></path></svg></button></div></div></div><div role="presentation" class="navbar-sidebar__backdrop"></div></nav><div id="__docusaurus_skipToContent_fallback" class="main-wrapper mainWrapper_BBNw"><div class="docsWrapper_dkrk"><button aria-label="Scroll back to top" class="clean-btn theme-back-to-top-button backToTopButton_m21v" type="button"></button><div class="docRoot_mtKm"><aside class="theme-doc-sidebar-container docSidebarContainer_Er1R"><div class="sidebarViewport_VgPy"><section class="productSelector_ky08"><span> <!-- -->Spot Trading<!-- --> </span></section><div class="sidebar_YPx9"><nav aria-label="Docs sidebar" class="menu thin-scrollbar menu_SCH5"><ul class="theme-doc-sidebar-menu menu__list"><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs">Changelog</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/README">Readme</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/filters">Filters</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/enums">Enums</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/rest-api/general-api-information">REST API</a></div></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/fix-api">FIX API</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/web-socket-streams">WebSocket Streams</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/sbe-market-data-streams">SBE Market Data</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/user-data-stream">User Data Stream</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/websocket-api/general-api-information">WebSocket API</a></div></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/PROD-TERMS-OF-USE">Terms of Use</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret menu__link--active" role="button" aria-expanded="true" href="/docs/binance-spot-api-docs/testnet">Testnet</a></div><ul style="display:block;overflow:visible;height:auto" class="menu__list"><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/testnet">Changelog</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/testnet/general-info">General Info</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/testnet/filters">Filters</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link menu__link--active" aria-current="page" tabindex="0" href="/docs/binance-spot-api-docs/testnet/enums">Enums</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-2 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" tabindex="0" href="/docs/binance-spot-api-docs/testnet/rest-api/general-api-information">REST API</a></div></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/testnet/fix-api">FIX API</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/testnet/user-data-stream">User Data Stream</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-2 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" tabindex="0" href="/docs/binance-spot-api-docs/testnet/websocket-api/general-api-information">WebSocket API</a></div></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/testnet/web-socket-streams">WebSocket Streams</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/testnet/sbe-market-data-streams">SBE Market Data</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/testnet/errors">Errors</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/testnet/TESTNET-TERMS-OF-USE">Testnet Terms of Use</a></li></ul></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/demo-mode">Demo Mode</a></div></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/errors">Error</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/faqs/spot_glossary">FAQs</a></div></li></ul></nav></div></div></aside><main class="docMainContainer_jRkP"><div class="container padding-top--md padding-bottom--lg"><div class="row"><div class="col docItemCol_Xiwq"><div class="docItemContainer_JFP9"><article><nav class="theme-doc-breadcrumbs breadcrumbsContainer_tVzI" aria-label="Breadcrumbs"><ul class="breadcrumbs" itemscope="" itemtype="https://schema.org/BreadcrumbList"><li class="breadcrumbs__item"><a aria-label="Home page" class="breadcrumbs__link" href="/docs/"><svg viewBox="0 0 24 24" class="breadcrumbHomeIcon_yapy"><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" fill="currentColor"></path></svg></a></li><li class="breadcrumbs__item"><span class="breadcrumbs__link">Testnet</span><meta itemprop="position" content="1"></li><li itemscope="" itemprop="itemListElement" itemtype="https://schema.org/ListItem" class="breadcrumbs__item breadcrumbs__item--active"><span class="breadcrumbs__link" itemprop="name">Enums</span><meta itemprop="position" content="2"></li></ul></nav><div class="tocCollapsible_Wlpy theme-doc-toc-mobile tocMobile_qs2S"><button type="button" class="clean-btn tocCollapsibleButton_niV5">On this page</button></div><div class="theme-doc-markdown markdown"><meta name="docsearch:sidebar" content="binance-spot-api-docs">
  
<h1>ENUM Definitions</h1>
<p>This will apply for both REST API and WebSocket API.</p>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="symbol-status-status">Symbol status (status):<a class="hash-link" aria-label="Direct link to Symbol status (status):" title="Direct link to Symbol status (status):" href="/docs/binance-spot-api-docs/testnet/enums#symbol-status-status">​</a></h2>
<ul>
<li><code>TRADING</code></li>
<li><code>END_OF_DAY</code></li>
<li><code>HALT</code></li>
<li><code>BREAK</code></li>
</ul>
<p><a id="account-and-symbol-permissions"></a></p>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="account-and-symbol-permissions-permissions">Account and Symbol Permissions (permissions)<a class="hash-link" aria-label="Direct link to Account and Symbol Permissions (permissions)" title="Direct link to Account and Symbol Permissions (permissions)" href="/docs/binance-spot-api-docs/testnet/enums#account-and-symbol-permissions-permissions">​</a></h2>
<ul>
<li><code>SPOT</code></li>
</ul>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="order-status-status">Order status (status)<a class="hash-link" aria-label="Direct link to Order status (status)" title="Direct link to Order status (status)" href="/docs/binance-spot-api-docs/testnet/enums#order-status-status">​</a></h2>













































<table><thead><tr><th>Status</th><th>Description</th></tr></thead><tbody><tr><td><code>NEW</code></td><td>The order has been accepted by the engine.</td></tr><tr><td><code>PENDING_NEW</code></td><td>The order is in a pending phase until the working order of an order list has been fully filled.</td></tr><tr><td><code>PARTIALLY_FILLED</code></td><td>A part of the order has been filled.</td></tr><tr><td><code>FILLED</code></td><td>The order has been completed.</td></tr><tr><td><code>CANCELED</code></td><td>The order has been canceled by the user.</td></tr><tr><td><code>PENDING_CANCEL</code></td><td>Currently unused</td></tr><tr><td><code>REJECTED</code></td><td>The order was not accepted by the engine and not processed.</td></tr><tr><td><code>EXPIRED</code></td><td>The order was canceled according to the order type&#x27;s rules (e.g. LIMIT FOK orders with no fill, LIMIT IOC or MARKET orders that partially fill) <br> or by the exchange, (e.g. orders canceled during liquidation, orders canceled during maintenance)</td></tr><tr><td><code>EXPIRED_IN_MATCH</code></td><td>The order was expired by the exchange due to STP. (e.g. an order with <code>EXPIRE_TAKER</code> will match with existing orders on the book with the same account or same <code>tradeGroupId</code>)</td></tr></tbody></table>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="order-list-status-liststatustype">Order List Status (listStatusType)<a class="hash-link" aria-label="Direct link to Order List Status (listStatusType)" title="Direct link to Order List Status (listStatusType)" href="/docs/binance-spot-api-docs/testnet/enums#order-list-status-liststatustype">​</a></h2>

























<table><thead><tr><th>Status</th><th>Description</th></tr></thead><tbody><tr><td><code>RESPONSE</code></td><td>This is used when the ListStatus is responding to a failed action. (E.g. order list placement or cancellation)</td></tr><tr><td><code>EXEC_STARTED</code></td><td>The order list has been placed or there is an update to the order list status.</td></tr><tr><td><code>UPDATED</code></td><td>The clientOrderId of an order in the order list has been changed.</td></tr><tr><td><code>ALL_DONE</code></td><td>The order list has finished executing and thus is no longer active.</td></tr></tbody></table>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="order-list-order-status-listorderstatus">Order List Order Status (listOrderStatus)<a class="hash-link" aria-label="Direct link to Order List Order Status (listOrderStatus)" title="Direct link to Order List Order Status (listOrderStatus)" href="/docs/binance-spot-api-docs/testnet/enums#order-list-order-status-listorderstatus">​</a></h2>





















<table><thead><tr><th>Status</th><th>Description</th></tr></thead><tbody><tr><td><code>EXECUTING</code></td><td>Either an order list has been placed or there is an update to the status of the list.</td></tr><tr><td><code>ALL_DONE</code></td><td>An order list has completed execution and thus no longer active.</td></tr><tr><td><code>REJECT</code></td><td>The List Status is responding to a failed action either during order placement or order canceled.</td></tr></tbody></table>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="contingencytype">ContingencyType<a class="hash-link" aria-label="Direct link to ContingencyType" title="Direct link to ContingencyType" href="/docs/binance-spot-api-docs/testnet/enums#contingencytype">​</a></h2>
<ul>
<li><code>OCO</code></li>
<li><code>OTO</code></li>
</ul>
<p><a id="allocationtype"></a></p>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="allocationtype">AllocationType<a class="hash-link" aria-label="Direct link to AllocationType" title="Direct link to AllocationType" href="/docs/binance-spot-api-docs/testnet/enums#allocationtype">​</a></h2>
<ul>
<li><code>SOR</code></li>
</ul>
<p><a id="ordertypes"></a></p>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="order-types-ordertypes-type">Order types (orderTypes, type)<a class="hash-link" aria-label="Direct link to Order types (orderTypes, type)" title="Direct link to Order types (orderTypes, type)" href="/docs/binance-spot-api-docs/testnet/enums#order-types-ordertypes-type">​</a></h2>
<ul>
<li><code>LIMIT</code></li>
<li><code>MARKET</code></li>
<li><code>STOP_LOSS</code></li>
<li><code>STOP_LOSS_LIMIT</code></li>
<li><code>TAKE_PROFIT</code></li>
<li><code>TAKE_PROFIT_LIMIT</code></li>
<li><code>LIMIT_MAKER</code></li>
</ul>
<p><a id="orderresponsetype"></a></p>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="order-response-type-neworderresptype">Order Response Type (newOrderRespType)<a class="hash-link" aria-label="Direct link to Order Response Type (newOrderRespType)" title="Direct link to Order Response Type (newOrderRespType)" href="/docs/binance-spot-api-docs/testnet/enums#order-response-type-neworderresptype">​</a></h2>
<ul>
<li><code>ACK</code></li>
<li><code>RESULT</code></li>
<li><code>FULL</code></li>
</ul>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="working-floor">Working Floor<a class="hash-link" aria-label="Direct link to Working Floor" title="Direct link to Working Floor" href="/docs/binance-spot-api-docs/testnet/enums#working-floor">​</a></h2>
<ul>
<li><code>EXCHANGE</code></li>
<li><code>SOR</code></li>
</ul>
<p><a id="side"></a></p>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="order-side-side">Order side (side)<a class="hash-link" aria-label="Direct link to Order side (side)" title="Direct link to Order side (side)" href="/docs/binance-spot-api-docs/testnet/enums#order-side-side">​</a></h2>
<ul>
<li><code>BUY</code></li>
<li><code>SELL</code></li>
</ul>
<p><a id="timeinforce"></a></p>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="time-in-force-timeinforce">Time in force (timeInForce)<a class="hash-link" aria-label="Direct link to Time in force (timeInForce)" title="Direct link to Time in force (timeInForce)" href="/docs/binance-spot-api-docs/testnet/enums#time-in-force-timeinforce">​</a></h2>
<p>This sets how long an order will be active before expiration.</p>





















<table><thead><tr><th>Status</th><th>Description</th></tr></thead><tbody><tr><td><code>GTC</code></td><td>Good Til Canceled <br> An order will be on the book unless the order is canceled.</td></tr><tr><td><code>IOC</code></td><td>Immediate Or Cancel <br> An order will try to fill the order as much as it can before the order expires.</td></tr><tr><td><code>FOK</code></td><td>Fill or Kill <br> An order will expire if the full order cannot be filled upon execution.</td></tr></tbody></table>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="rate-limiters-ratelimittype">Rate limiters (rateLimitType)<a class="hash-link" aria-label="Direct link to Rate limiters (rateLimitType)" title="Direct link to Rate limiters (rateLimitType)" href="/docs/binance-spot-api-docs/testnet/enums#rate-limiters-ratelimittype">​</a></h2>
<ul>
<li>REQUEST_WEIGHT</li>
</ul>
<div class="language-json codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-json codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">{</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    &quot;rateLimitType&quot;: &quot;REQUEST_WEIGHT&quot;,</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    &quot;interval&quot;: &quot;MINUTE&quot;,</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    &quot;intervalNum&quot;: 1,</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    &quot;limit&quot;: 6000</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">}</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<ul>
<li>ORDERS</li>
</ul>
<div class="language-json codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-json codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">{</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    &quot;rateLimitType&quot;: &quot;ORDERS&quot;,</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    &quot;interval&quot;: &quot;SECOND&quot;,</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    &quot;intervalNum&quot;: 1,</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    &quot;limit&quot;: 10</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">}</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<ul>
<li>RAW_REQUESTS</li>
</ul>
<div class="language-json codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-json codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">{</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    &quot;rateLimitType&quot;: &quot;RAW_REQUESTS&quot;,</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    &quot;interval&quot;: &quot;MINUTE&quot;,</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    &quot;intervalNum&quot;: 5,</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    &quot;limit&quot;: 61000</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">}</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="rate-limit-intervals-interval">Rate limit intervals (interval)<a class="hash-link" aria-label="Direct link to Rate limit intervals (interval)" title="Direct link to Rate limit intervals (interval)" href="/docs/binance-spot-api-docs/testnet/enums#rate-limit-intervals-interval">​</a></h2>
<ul>
<li>SECOND</li>
<li>MINUTE</li>
<li>DAY</li>
</ul>
<p><a id="stpmodes"></a></p>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="stp-modes">STP Modes<a class="hash-link" aria-label="Direct link to STP Modes" title="Direct link to STP Modes" href="/docs/binance-spot-api-docs/testnet/enums#stp-modes">​</a></h2>
<p>Read <a href="/docs/binance-spot-api-docs/faqs/stp_faq">Self Trade Prevention (STP) FAQ</a> to learn more.</p>
<ul>
<li><code>NONE</code></li>
<li><code>EXPIRE_MAKER</code></li>
<li><code>EXPIRE_TAKER</code></li>
<li><code>EXPIRE_BOTH</code></li>
<li><code>DECREMENT</code></li>
<li><code>TRANSFER</code></li>
</ul></div></article><nav class="pagination-nav docusaurus-mt-lg" aria-label="Docs pages"><a class="pagination-nav__link pagination-nav__link--prev" href="/docs/binance-spot-api-docs/testnet/filters"><div class="pagination-nav__sublabel">Previous</div><div class="pagination-nav__label">Filters</div></a><a class="pagination-nav__link pagination-nav__link--next" href="/docs/binance-spot-api-docs/testnet/rest-api/general-api-information"><div class="pagination-nav__sublabel">Next</div><div class="pagination-nav__label">General API Information</div></a></nav></div></div><div class="col col--3"><div class="tableOfContents_zXaw thin-scrollbar theme-doc-toc-desktop"><ul class="table-of-contents table-of-contents__left-border"><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/enums#symbol-status-status">Symbol status (status):</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/enums#account-and-symbol-permissions-permissions">Account and Symbol Permissions (permissions)</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/enums#order-status-status">Order status (status)</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/enums#order-list-status-liststatustype">Order List Status (listStatusType)</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/enums#order-list-order-status-listorderstatus">Order List Order Status (listOrderStatus)</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/enums#contingencytype">ContingencyType</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/enums#allocationtype">AllocationType</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/enums#order-types-ordertypes-type">Order types (orderTypes, type)</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/enums#order-response-type-neworderresptype">Order Response Type (newOrderRespType)</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/enums#working-floor">Working Floor</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/enums#order-side-side">Order side (side)</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/enums#time-in-force-timeinforce">Time in force (timeInForce)</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/enums#rate-limiters-ratelimittype">Rate limiters (rateLimitType)</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/enums#rate-limit-intervals-interval">Rate limit intervals (interval)</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/enums#stp-modes">STP Modes</a></li></ul></div></div></div></div></main></div></div></div><footer class="footer footer--dark"><div class="container container-fluid"><div class="footer__bottom text--center"><div class="footer__copyright">Copyright © 2026 Binance.</div></div></div></footer></div>
</body>
</html>
