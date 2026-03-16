# binance-spot-api-docs/testnet/fix-api

> **Source:** https://developers.binance.com/docs/binance-spot-api-docs/testnet/fix-api

<!-- Raw HTML content from page -->
<!doctype html>
<html lang="en" dir="ltr" class="docs-wrapper plugin-docs plugin-id-default docs-version-current docs-doc-page docs-doc-id-binance-spot-api-docs/testnet/fix-api" data-has-hydrated="false">
<head>
<meta charset="UTF-8">
<meta name="generator" content="Docusaurus v3.4.0">
<title data-rh="true">FIX API | Binance Open Platform</title><meta data-rh="true" name="viewport" content="width=device-width,initial-scale=1"><meta data-rh="true" name="twitter:card" content="summary_large_image"><meta data-rh="true" property="og:url" content="https://developers.binance.com/docs/binance-spot-api-docs/testnet/fix-api"><meta data-rh="true" property="og:locale" content="en"><meta data-rh="true" property="og:locale:alternate" content="zh_CN"><meta data-rh="true" name="docusaurus_locale" content="en"><meta data-rh="true" name="docsearch:language" content="en"><meta data-rh="true" name="docusaurus_version" content="current"><meta data-rh="true" name="docusaurus_tag" content="docs-default-current"><meta data-rh="true" name="docsearch:version" content="current"><meta data-rh="true" name="docsearch:docusaurus_tag" content="docs-default-current"><meta data-rh="true" property="og:title" content="FIX API | Binance Open Platform"><meta data-rh="true" name="description" content="[!NOTE]"><meta data-rh="true" property="og:description" content="[!NOTE]"><link data-rh="true" rel="icon" href="/docs/img/favicon.png"><link data-rh="true" rel="canonical" href="https://developers.binance.com/docs/binance-spot-api-docs/testnet/fix-api"><link data-rh="true" rel="alternate" href="https://developers.binance.com/docs/binance-spot-api-docs/testnet/fix-api" hreflang="en"><link data-rh="true" rel="alternate" href="https://developers.binance.com/docs/zh-CN/binance-spot-api-docs/testnet/fix-api" hreflang="zh-CN"><link data-rh="true" rel="alternate" href="https://developers.binance.com/docs/binance-spot-api-docs/testnet/fix-api" hreflang="x-default"><link data-rh="true" rel="preconnect" href="https://9I0UZOBSWT-dsn.algolia.net" crossorigin="anonymous"><link rel="preconnect" href="https://www.googletagmanager.com">
<script>window.dataLayer=window.dataLayer||[]</script>
<script>!function(e,t,a,n,g){e[n]=e[n]||[],e[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var m=t.getElementsByTagName(a)[0],r=t.createElement(a);r.async=!0,r.src="https://www.googletagmanager.com/gtm.js?id=GTM-M86QHGF",m.parentNode.insertBefore(r,m)}(window,document,"script","dataLayer")</script>


<link rel="search" type="application/opensearchdescription+xml" title="Binance Open Platform" href="/docs/opensearch.xml"><link rel="stylesheet" href="/docs/assets/css/styles.65c537d6.css">
<script src="/docs/assets/js/runtime~main.beb17562.js" defer="defer"></script>
<script src="/docs/assets/js/main.c8dc629a.js" defer="defer"></script>
</head>
<body class="navigation-with-keyboard">
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M86QHGF" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

<script>!function(){function t(t){document.documentElement.setAttribute("data-theme",t)}var e=function(){try{return new URLSearchParams(window.location.search).get("docusaurus-theme")}catch(t){}}()||function(){try{return window.localStorage.getItem("theme")}catch(t){}}();t(null!==e?e:"light")}(),function(){try{const n=new URLSearchParams(window.location.search).entries();for(var[t,e]of n)if(t.startsWith("docusaurus-data-")){var a=t.replace("docusaurus-data-","data-");document.documentElement.setAttribute(a,e)}}catch(t){}}()</script><div id="__docusaurus"><div role="region" aria-label="Skip to main content"><a class="skipToContent_Mndp" href="#__docusaurus_skipToContent_fallback">Skip to main content</a></div><nav aria-label="Main" class="navbar navbar--fixed-top"><div class="navbar__inner"><div class="navbar__items"><button aria-label="Toggle navigation bar" aria-expanded="false" class="navbar__toggle clean-btn" type="button"><svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M4 7h22M4 15h22M4 23h22"></path></svg></button><a href="https://developers.binance.com/en" target="_self" rel="noopener noreferrer" class="navbar__brand"><div class="navbar__logo"><img src="/docs/img/logo.svg" alt="Binance Logo" class="themedComponent_abzR themedComponent--light_IjiB"><img src="/docs/img/logo.svg" alt="Binance Logo" class="themedComponent_abzR themedComponent--dark_O3Fz"></div></a><div class="productSelectorWrapper_kk2K"><div class="productSelector_tRKy"><button class="productSelectorButton_fwTp"><span>Products</span><span class="arrow_h6A6">▼</span></button></div></div></div><div class="navbar__items navbar__items--right"><div class="navbarSearchContainer_dCNk"><div class="searchContainer_RJ4l"><div class="searchWrapper_Bzvn"><button type="button" class="DocSearch DocSearch-Button" aria-label="Search"><span class="DocSearch-Button-Container"><svg width="20" height="20" class="DocSearch-Search-Icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="DocSearch-Button-Placeholder">Search</span></span><span class="DocSearch-Button-Keys"></span></button><div class="searchModeToggle__Af9"><div class="toggleTrack_B5pz"><button class="toggleOption_jECQ active_d_Ud" title="Search current documentation section">Current</button><button class="toggleOption_jECQ" title="Search all documentation">All</button></div></div></div></div></div><div class="navbar__item dropdown dropdown--hoverable dropdown--right"><a aria-haspopup="true" aria-expanded="false" role="button" class="navbar__link navbar_locale_dropdown" href="/docs/binance-spot-api-docs/testnet/fix-api"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" class="iconLanguage_JRss"><path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path></svg>English</a><ul class="dropdown__menu"><li><a href="/docs/binance-spot-api-docs/testnet/fix-api" target="_self" rel="noopener noreferrer" class="dropdown__link dropdown__link--active" lang="en">English</a></li><li><a href="/docs/zh-CN/binance-spot-api-docs/testnet/fix-api" target="_self" rel="noopener noreferrer" class="dropdown__link" lang="zh-CN">简体中文</a></li></ul></div><div class="toggle_OprV colorModeToggle_x44X"><button class="clean-btn toggleButton_g_ff toggleButtonDisabled_uc5P" type="button" disabled="" title="Switch between dark and light mode (currently light mode)" aria-label="Switch between dark and light mode (currently light mode)" aria-live="polite"><svg viewBox="0 0 24 24" width="24" height="24" class="lightToggleIcon_JliJ"><path fill="currentColor" d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"></path></svg><svg viewBox="0 0 24 24" width="24" height="24" class="darkToggleIcon_dakX"><path fill="currentColor" d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"></path></svg></button></div></div></div><div role="presentation" class="navbar-sidebar__backdrop"></div></nav><div id="__docusaurus_skipToContent_fallback" class="main-wrapper mainWrapper_BBNw"><div class="docsWrapper_dkrk"><button aria-label="Scroll back to top" class="clean-btn theme-back-to-top-button backToTopButton_m21v" type="button"></button><div class="docRoot_mtKm"><aside class="theme-doc-sidebar-container docSidebarContainer_Er1R"><div class="sidebarViewport_VgPy"><section class="productSelector_ky08"><span> <!-- -->Spot Trading<!-- --> </span></section><div class="sidebar_YPx9"><nav aria-label="Docs sidebar" class="menu thin-scrollbar menu_SCH5"><ul class="theme-doc-sidebar-menu menu__list"><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs">Changelog</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/README">Readme</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/filters">Filters</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/enums">Enums</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/rest-api/general-api-information">REST API</a></div></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/fix-api">FIX API</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/web-socket-streams">WebSocket Streams</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/sbe-market-data-streams">SBE Market Data</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/user-data-stream">User Data Stream</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/websocket-api/general-api-information">WebSocket API</a></div></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/PROD-TERMS-OF-USE">Terms of Use</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret menu__link--active" role="button" aria-expanded="true" href="/docs/binance-spot-api-docs/testnet">Testnet</a></div><ul style="display:block;overflow:visible;height:auto" class="menu__list"><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/testnet">Changelog</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/testnet/general-info">General Info</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/testnet/filters">Filters</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/testnet/enums">Enums</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-2 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" tabindex="0" href="/docs/binance-spot-api-docs/testnet/rest-api/general-api-information">REST API</a></div></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link menu__link--active" aria-current="page" tabindex="0" href="/docs/binance-spot-api-docs/testnet/fix-api">FIX API</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/testnet/user-data-stream">User Data Stream</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-2 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" tabindex="0" href="/docs/binance-spot-api-docs/testnet/websocket-api/general-api-information">WebSocket API</a></div></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/testnet/web-socket-streams">WebSocket Streams</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/testnet/sbe-market-data-streams">SBE Market Data</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/testnet/errors">Errors</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/testnet/TESTNET-TERMS-OF-USE">Testnet Terms of Use</a></li></ul></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/demo-mode">Demo Mode</a></div></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/errors">Error</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/faqs/spot_glossary">FAQs</a></div></li></ul></nav></div></div></aside><main class="docMainContainer_jRkP"><div class="container padding-top--md padding-bottom--lg"><div class="row"><div class="col docItemCol_Xiwq"><div class="docItemContainer_JFP9"><article><nav class="theme-doc-breadcrumbs breadcrumbsContainer_tVzI" aria-label="Breadcrumbs"><ul class="breadcrumbs" itemscope="" itemtype="https://schema.org/BreadcrumbList"><li class="breadcrumbs__item"><a aria-label="Home page" class="breadcrumbs__link" href="/docs/"><svg viewBox="0 0 24 24" class="breadcrumbHomeIcon_yapy"><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" fill="currentColor"></path></svg></a></li><li class="breadcrumbs__item"><span class="breadcrumbs__link">Testnet</span><meta itemprop="position" content="1"></li><li itemscope="" itemprop="itemListElement" itemtype="https://schema.org/ListItem" class="breadcrumbs__item breadcrumbs__item--active"><span class="breadcrumbs__link" itemprop="name">FIX API</span><meta itemprop="position" content="2"></li></ul></nav><div class="tocCollapsible_Wlpy theme-doc-toc-mobile tocMobile_qs2S"><button type="button" class="clean-btn tocCollapsibleButton_niV5">On this page</button></div><div class="theme-doc-markdown markdown"><meta name="docsearch:sidebar" content="binance-spot-api-docs">
  
<h1>FIX API</h1>
<blockquote>
<p>[!NOTE]
This API can only be used with the SPOT Exchange.</p>
</blockquote>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="general-api-information">General API Information<a class="hash-link" aria-label="Direct link to General API Information" title="Direct link to General API Information" href="/docs/binance-spot-api-docs/testnet/fix-api#general-api-information">​</a></h2>
<ul>
<li>FIX connections require TLS encryption. Please either use native TCP+TLS connection or set up a local proxy such as <a href="https://www.stunnel.org/" target="_blank" rel="noopener noreferrer">stunnel</a> to handle TLS encryption.</li>
<li>APIs have a timeout of 10 seconds when processing a request. If a response from the Matching Engine takes longer than this, the API responds with &quot;Timeout waiting for response from backend server. Send status unknown; execution status unknown.&quot; <a href="/docs/binance-spot-api-docs/testnet/errors#-1007-timeout">(-1007 TIMEOUT)</a>
<ul>
<li>This does not always mean that the request failed in the Matching Engine.</li>
<li>If the status of the request has not appeared in <a href="/docs/binance-spot-api-docs/testnet/user-data-stream">User Data Stream</a>, please perform an API query for its status.</li>
</ul>
</li>
<li>If your request contains a symbol name containing non-ASCII characters, then the response may contain non-ASCII characters encoded in UTF-8.</li>
</ul>
<p><strong>FIX sessions only support Ed25519 keys.</strong> <br>
You can setup and configure your API key permissions on <a href="https://testnet.binance.vision/" target="_blank" rel="noopener noreferrer">Spot Test Network</a>.</p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="fix-api-order-entry-sessions">FIX API Order Entry sessions<a class="hash-link" aria-label="Direct link to FIX API Order Entry sessions" title="Direct link to FIX API Order Entry sessions" href="/docs/binance-spot-api-docs/testnet/fix-api#fix-api-order-entry-sessions">​</a></h3>
<ul>
<li>Endpoint is: <code>tcp+tls://fix-oe.testnet.binance.vision:9000</code></li>
<li>Supports placing orders, canceling orders, and querying current limit usage.</li>
<li>Supports receiving all of the account&#x27;s <a href="/docs/binance-spot-api-docs/testnet/fix-api#executionreport">ExecutionReport<code>&lt;8&gt;</code></a> and <a href="/docs/binance-spot-api-docs/testnet/fix-api#liststatus">List Status<code>&lt;N&gt;</code></a>.</li>
<li>Only API keys with <code>FIX_API</code> are allowed to connect.</li>
<li>QuickFIX Schema can be found <a href="https://github.com/binance/binance-spot-api-docs/blob/master/fix/schemas/spot-fix-oe.xml" target="_blank" rel="noopener noreferrer">here</a>.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="fix-api-drop-copy-sessions">FIX API Drop Copy sessions<a class="hash-link" aria-label="Direct link to FIX API Drop Copy sessions" title="Direct link to FIX API Drop Copy sessions" href="/docs/binance-spot-api-docs/testnet/fix-api#fix-api-drop-copy-sessions">​</a></h3>
<ul>
<li>Endpoint is: <code>tcp+tls://fix-dc.testnet.binance.vision:9000</code></li>
<li>Supports receiving all of the account&#x27;s <a href="/docs/binance-spot-api-docs/testnet/fix-api#executionreport">ExecutionReport<code>&lt;8&gt;</code></a> and <a href="/docs/binance-spot-api-docs/testnet/fix-api#liststatus">List Status<code>&lt;N&gt;</code></a>.</li>
<li>Only API keys with <code>FIX_API</code> or <code>FIX_API_READ_ONLY</code> are allowed to connect.</li>
<li>QuickFIX Schema can be found <a href="https://github.com/binance/binance-spot-api-docs/blob/master/fix/schemas/spot-fix-oe.xml" target="_blank" rel="noopener noreferrer">here</a>.</li>
<li>Data in Drop Copy sessions is delayed by 1 second.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="fix-api-market-data-sessions">FIX API Market Data sessions<a class="hash-link" aria-label="Direct link to FIX API Market Data sessions" title="Direct link to FIX API Market Data sessions" href="/docs/binance-spot-api-docs/testnet/fix-api#fix-api-market-data-sessions">​</a></h3>
<ul>
<li>Endpoint is: <code>tcp+tls://fix-md.testnet.binance.vision:9000</code></li>
<li>Supports market data streams and active instruments queries.</li>
<li>Does not support placing or canceling orders.</li>
<li>Only API keys with <code>FIX_API</code> or <code>FIX_API_READ_ONLY</code> are allowed to connect.</li>
<li>QuickFIX Schema can be found <a href="https://github.com/binance/binance-spot-api-docs/blob/master/fix/schemas/spot-fix-md.xml" target="_blank" rel="noopener noreferrer">here</a>.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="fix-connection-lifecycle">FIX Connection Lifecycle<a class="hash-link" aria-label="Direct link to FIX Connection Lifecycle" title="Direct link to FIX Connection Lifecycle" href="/docs/binance-spot-api-docs/testnet/fix-api#fix-connection-lifecycle">​</a></h3>
<ul>
<li>All FIX API sessions will remain open for as long as possible, on a best-effort basis.</li>
<li>There is no minimum connection time guarantee; a server can enter maintenance at any time.
<ul>
<li>When a server enters maintenance, a <a href="/docs/binance-spot-api-docs/testnet/fix-api#news">News <code>&lt;B&gt;</code></a> message will be sent to clients <strong>every 10 seconds for 10 minutes</strong>, prompting clients to reconnect. Upon receiving this message, a client is expected to establish a new session and close the old one. If the client does not close the old session within the time frame, the server will proceed to log it out and close the session.</li>
</ul>
</li>
<li>After connecting, the client must send a Logon <code>&lt;A&gt;</code> request. For more information please refer to <a href="/docs/binance-spot-api-docs/testnet/fix-api#signaturecomputation">How to sign a Logon request</a>.</li>
<li>The client should send a Logout <code>&lt;5&gt;</code> message to close the session before disconnecting. Failure to send the logout message will result in the session’s <code>SenderCompID (49)</code> being unusable for new session establishment for a duration of 2x the <code>HeartInt (108)</code> interval.</li>
<li>The system allows negotiation of the <code>HeartInt (108)</code> value during the logon process. Accepted values range between 5 and 60 seconds.
<ul>
<li>If the server has not sent any messages within a <code>HeartInt (108)</code> interval, a <a href="/docs/binance-spot-api-docs/testnet/fix-api#heartbeat">HeartBeat <code>&lt;0&gt;</code></a>  will be sent.</li>
<li>If the server has not received any messages within a <code>HeartInt (108)</code> interval, a <a href="/docs/binance-spot-api-docs/testnet/fix-api#testrequest">TestRequest <code>&lt;1&gt;</code></a> will be sent. If the server does not receive a HeartBeat <code>&lt;0&gt;</code> containing the expected <code>TestReqID (112)</code> from the client within <code>HeartInt (108)</code> seconds, the server will send a Logout <code>&lt;5&gt;</code> message and close the connection.</li>
<li>If the client has not received any messages within a <code>HeartInt (108)</code> interval, the client is responsible for sending a TestRequest <code>&lt;1&gt;</code> to ensure the connection is healthy. Upon receiving such a TestRequest <code>&lt;1&gt;</code>, the server will respond with a Heartbeat <code>&lt;0&gt;</code> containing the expected <code>TestReqID (112)</code>. If the client does not receive the server’s response within a <code>HeartInt (108)</code> interval, the client should close the session and connection and establish new ones.</li>
</ul>
</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="api-key-permissions">API Key Permissions<a class="hash-link" aria-label="Direct link to API Key Permissions" title="Direct link to API Key Permissions" href="/docs/binance-spot-api-docs/testnet/fix-api#api-key-permissions">​</a></h3>
<p>To access the FIX API order entry sessions, your API key must be configured with the <code>FIX_API</code> permission.</p>
<p>To access the FIX Drop Copy sessions, your API key must be configured with either <code>FIX_API_READ_ONLY</code> or <code>FIX_API</code> permission.</p>
<p>To access the FIX Market Data sessions, your API key must be configured with either <code>FIX_API</code> or <code>FIX_API_READ_ONLY</code> permission.</p>
<p><strong>FIX sessions only support Ed25519 keys.</strong></p>
<p><a id="orderedmode"></a></p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="on-message-processing-order">On message processing order<a class="hash-link" aria-label="Direct link to On message processing order" title="Direct link to On message processing order" href="/docs/binance-spot-api-docs/testnet/fix-api#on-message-processing-order">​</a></h3>
<p>The <code>MessageHandling (25035)</code> field required in the initial <a href="/docs/binance-spot-api-docs/testnet/fix-api#logon-request">Logon<code>&lt;A&gt;</code></a> message controls whether messages from the client may be reordered before they are processed by the Matching Engine.</p>

















<table><thead><tr><th>Mode</th><th>Description</th></tr></thead><tbody><tr><td><code>UNORDERED(1)</code></td><td>Messages from the client are allowed to be sent to the matching engine in any order.</td></tr><tr><td><code>SEQUENTIAL(2)</code></td><td>Messages from the client are always sent to the matching engine in <code>MsgSeqNum (34)</code> order.</td></tr></tbody></table>
<p>In all modes, the client&#x27;s <code>MsgSeqNum (34)</code> must increase monotonically, with each subsequent message having a sequence number that is exactly 1 greater than the previous message.</p>
<blockquote>
<p>[!TIP]
<code>UNORDERED(1)</code> should offer better performance when there are multiple messages in flight from the client to the server.</p>
</blockquote>
<p><a id="responsemode"></a></p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="response-mode">Response Mode<a class="hash-link" aria-label="Direct link to Response Mode" title="Direct link to Response Mode" href="/docs/binance-spot-api-docs/testnet/fix-api#response-mode">​</a></h3>
<p>By default, all concurrent order entry sessions receive all of the account&#x27;s
successful <a href="/docs/binance-spot-api-docs/testnet/fix-api#executionreport">ExecutionReport<code>&lt;8&gt;</code></a> and <a href="/docs/binance-spot-api-docs/testnet/fix-api#liststatus">ListStatus<code>&lt;N&gt;</code></a> messages,
including those in response to orders placed from other FIX sessions and via non-FIX APIs.</p>
<p>Use the <code>ResponseMode (25036)</code> field in the initial <a href="/docs/binance-spot-api-docs/testnet/fix-api#logon-request">Logon<code>&lt;A&gt;</code></a> message
to change this behavior.</p>
<ul>
<li><code>EVERYTHING(1)</code>: The default mode.</li>
<li><code>ONLY_ACKS(2)</code>: Receive only ACK messages whether operation succeeded or failed. Disables ExecutionReport push.</li>
</ul>
<p><a id="timingsecurity"></a></p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="timing-security">Timing Security<a class="hash-link" aria-label="Direct link to Timing Security" title="Direct link to Timing Security" href="/docs/binance-spot-api-docs/testnet/fix-api#timing-security">​</a></h3>
<ul>
<li>All requests require a <code>SendingTime(52)</code> field which should be the current timestamp.</li>
<li>An additional optional field, <code>RecvWindow(25000)</code>, specifies for how long the request stays valid in milliseconds.
<ul>
<li><code>RecvWindow(25000)</code> supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified.</li>
<li>If <code>RecvWindow(25000)</code> is not specified, it defaults to 5000 milliseconds only for the Logon<code>&lt;A&gt;</code> request. For other requests if unset, the RecvWindow check is not executed.</li>
<li>Maximum <code>RecvWindow(25000)</code> is 60000 milliseconds.</li>
</ul>
</li>
<li>Request processing logic is as follows:</li>
</ul>
<div class="language-javascript codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-javascript codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">serverTime </span><span class="token operator" style="color:#393A34">=</span><span class="token plain"> </span><span class="token function" style="color:#d73a49">getCurrentTime</span><span class="token punctuation" style="color:#393A34">(</span><span class="token punctuation" style="color:#393A34">)</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"></span><span class="token keyword control-flow" style="color:#00009f">if</span><span class="token plain"> </span><span class="token punctuation" style="color:#393A34">(</span><span class="token maybe-class-name">SendingTime</span><span class="token plain"> </span><span class="token operator" style="color:#393A34">&lt;</span><span class="token plain"> </span><span class="token punctuation" style="color:#393A34">(</span><span class="token plain">serverTime </span><span class="token operator" style="color:#393A34">+</span><span class="token plain"> </span><span class="token number" style="color:#36acaa">1</span><span class="token plain"> second</span><span class="token punctuation" style="color:#393A34">)</span><span class="token plain"> </span><span class="token operator" style="color:#393A34">&amp;&amp;</span><span class="token plain"> </span><span class="token punctuation" style="color:#393A34">(</span><span class="token plain">serverTime </span><span class="token operator" style="color:#393A34">-</span><span class="token plain"> </span><span class="token maybe-class-name">SendingTime</span><span class="token punctuation" style="color:#393A34">)</span><span class="token plain"> </span><span class="token operator" style="color:#393A34">&lt;=</span><span class="token plain"> </span><span class="token maybe-class-name">RecvWindow</span><span class="token punctuation" style="color:#393A34">)</span><span class="token plain"> </span><span class="token punctuation" style="color:#393A34">{</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">  </span><span class="token comment" style="color:#999988;font-style:italic">// begin processing request</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">  serverTime </span><span class="token operator" style="color:#393A34">=</span><span class="token plain"> </span><span class="token function" style="color:#d73a49">getCurrentTime</span><span class="token punctuation" style="color:#393A34">(</span><span class="token punctuation" style="color:#393A34">)</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">  </span><span class="token keyword control-flow" style="color:#00009f">if</span><span class="token plain"> </span><span class="token punctuation" style="color:#393A34">(</span><span class="token plain">serverTime </span><span class="token operator" style="color:#393A34">-</span><span class="token plain"> </span><span class="token maybe-class-name">SendingTime</span><span class="token punctuation" style="color:#393A34">)</span><span class="token plain"> </span><span class="token operator" style="color:#393A34">&lt;=</span><span class="token plain"> </span><span class="token maybe-class-name">RecvWindow</span><span class="token plain"> </span><span class="token punctuation" style="color:#393A34">{</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    </span><span class="token comment" style="color:#999988;font-style:italic">// forward request to Matching Engine</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">  </span><span class="token punctuation" style="color:#393A34">}</span><span class="token plain"> </span><span class="token keyword control-flow" style="color:#00009f">else</span><span class="token plain"> </span><span class="token punctuation" style="color:#393A34">{</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    </span><span class="token comment" style="color:#999988;font-style:italic">// reject request</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">  </span><span class="token punctuation" style="color:#393A34">}</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">  </span><span class="token comment" style="color:#999988;font-style:italic">// finish processing request</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"></span><span class="token punctuation" style="color:#393A34">}</span><span class="token plain"> </span><span class="token keyword control-flow" style="color:#00009f">else</span><span class="token plain"> </span><span class="token punctuation" style="color:#393A34">{</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">  </span><span class="token comment" style="color:#999988;font-style:italic">// reject request</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"></span><span class="token punctuation" style="color:#393A34">}</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><a id="signaturecomputation"></a></p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="how-to-sign-logon-a-request">How to sign Logon <code>&lt;A&gt;</code> request<a class="hash-link" aria-label="Direct link to how-to-sign-logon-a-request" title="Direct link to how-to-sign-logon-a-request" href="/docs/binance-spot-api-docs/testnet/fix-api#how-to-sign-logon-a-request">​</a></h3>
<p>The <a href="/docs/binance-spot-api-docs/testnet/fix-api#logon-main">Logon<code>&lt;A&gt;</code></a> message authenticates your connection to the FIX API.
This must be the first message sent by the client.</p>
<ul>
<li>The <code>Username (553)</code> field is required to contain the API key.</li>
<li>The <code>RawData (96)</code> field is required to contain a valid signature made with the API key.</li>
</ul>
<p>The signature payload is a text string constructed by concatenating the values of the following fields in this exact order,
separated by the SOH character:</p>
<ol>
<li><code>MsgType (35)</code></li>
<li><code>SenderCompId (49)</code></li>
<li><code>TargetCompId (56)</code></li>
<li><code>MsgSeqNum (34)</code></li>
<li><code>SendingTime (52)</code></li>
</ol>
<p>Sign the payload using your private key.
Encode the signature with <strong>base64</strong>.
The resulting text string is the value of the <code>RawData (96)</code> field.</p>
<p>Here is a sample Python code implementing the signature algorithm:</p>
<div class="language-python codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-python codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token keyword" style="color:#00009f">import</span><span class="token plain"> base64</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain" style="display:inline-block"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"></span><span class="token keyword" style="color:#00009f">from</span><span class="token plain"> cryptography</span><span class="token punctuation" style="color:#393A34">.</span><span class="token plain">hazmat</span><span class="token punctuation" style="color:#393A34">.</span><span class="token plain">primitives</span><span class="token punctuation" style="color:#393A34">.</span><span class="token plain">asymmetric</span><span class="token punctuation" style="color:#393A34">.</span><span class="token plain">ed25519 </span><span class="token keyword" style="color:#00009f">import</span><span class="token plain"> Ed25519PrivateKey</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"></span><span class="token keyword" style="color:#00009f">from</span><span class="token plain"> cryptography</span><span class="token punctuation" style="color:#393A34">.</span><span class="token plain">hazmat</span><span class="token punctuation" style="color:#393A34">.</span><span class="token plain">primitives</span><span class="token punctuation" style="color:#393A34">.</span><span class="token plain">serialization </span><span class="token keyword" style="color:#00009f">import</span><span class="token plain"> load_pem_private_key</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain" style="display:inline-block"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"></span><span class="token keyword" style="color:#00009f">def</span><span class="token plain"> </span><span class="token function" style="color:#d73a49">logon_raw_data</span><span class="token punctuation" style="color:#393A34">(</span><span class="token plain">private_key</span><span class="token punctuation" style="color:#393A34">:</span><span class="token plain"> Ed25519PrivateKey</span><span class="token punctuation" style="color:#393A34">,</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">                   sender_comp_id</span><span class="token punctuation" style="color:#393A34">:</span><span class="token plain"> </span><span class="token builtin">str</span><span class="token punctuation" style="color:#393A34">,</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">                   target_comp_id</span><span class="token punctuation" style="color:#393A34">:</span><span class="token plain"> </span><span class="token builtin">str</span><span class="token punctuation" style="color:#393A34">,</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">                   msg_seq_num</span><span class="token punctuation" style="color:#393A34">:</span><span class="token plain"> </span><span class="token builtin">str</span><span class="token punctuation" style="color:#393A34">,</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">                   sending_time</span><span class="token punctuation" style="color:#393A34">:</span><span class="token plain"> </span><span class="token builtin">str</span><span class="token punctuation" style="color:#393A34">)</span><span class="token punctuation" style="color:#393A34">:</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    </span><span class="token triple-quoted-string string" style="color:#e3116c">&quot;&quot;&quot;</span><br></span><span class="token-line" style="color:#393A34"><span class="token triple-quoted-string string" style="color:#e3116c">    Computes the value of RawData (96) field in Logon&lt;A&gt; message.</span><br></span><span class="token-line" style="color:#393A34"><span class="token triple-quoted-string string" style="color:#e3116c">    &quot;&quot;&quot;</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    payload </span><span class="token operator" style="color:#393A34">=</span><span class="token plain"> </span><span class="token builtin">chr</span><span class="token punctuation" style="color:#393A34">(</span><span class="token number" style="color:#36acaa">1</span><span class="token punctuation" style="color:#393A34">)</span><span class="token punctuation" style="color:#393A34">.</span><span class="token plain">join</span><span class="token punctuation" style="color:#393A34">(</span><span class="token punctuation" style="color:#393A34">[</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">        </span><span class="token string" style="color:#e3116c">&#x27;A&#x27;</span><span class="token punctuation" style="color:#393A34">,</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">        sender_comp_id</span><span class="token punctuation" style="color:#393A34">,</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">        target_comp_id</span><span class="token punctuation" style="color:#393A34">,</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">        msg_seq_num</span><span class="token punctuation" style="color:#393A34">,</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">        sending_time</span><span class="token punctuation" style="color:#393A34">,</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    </span><span class="token punctuation" style="color:#393A34">]</span><span class="token punctuation" style="color:#393A34">)</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    signature </span><span class="token operator" style="color:#393A34">=</span><span class="token plain"> private_key</span><span class="token punctuation" style="color:#393A34">.</span><span class="token plain">sign</span><span class="token punctuation" style="color:#393A34">(</span><span class="token plain">payload</span><span class="token punctuation" style="color:#393A34">.</span><span class="token plain">encode</span><span class="token punctuation" style="color:#393A34">(</span><span class="token string" style="color:#e3116c">&#x27;ASCII&#x27;</span><span class="token punctuation" style="color:#393A34">)</span><span class="token punctuation" style="color:#393A34">)</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    </span><span class="token keyword" style="color:#00009f">return</span><span class="token plain"> base64</span><span class="token punctuation" style="color:#393A34">.</span><span class="token plain">b64encode</span><span class="token punctuation" style="color:#393A34">(</span><span class="token plain">signature</span><span class="token punctuation" style="color:#393A34">)</span><span class="token punctuation" style="color:#393A34">.</span><span class="token plain">decode</span><span class="token punctuation" style="color:#393A34">(</span><span class="token string" style="color:#e3116c">&#x27;ASCII&#x27;</span><span class="token punctuation" style="color:#393A34">)</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain" style="display:inline-block"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain" style="display:inline-block"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"></span><span class="token keyword" style="color:#00009f">with</span><span class="token plain"> </span><span class="token builtin">open</span><span class="token punctuation" style="color:#393A34">(</span><span class="token string" style="color:#e3116c">&#x27;private_key.pem&#x27;</span><span class="token punctuation" style="color:#393A34">,</span><span class="token plain"> </span><span class="token string" style="color:#e3116c">&#x27;rb&#x27;</span><span class="token punctuation" style="color:#393A34">)</span><span class="token plain"> </span><span class="token keyword" style="color:#00009f">as</span><span class="token plain"> f</span><span class="token punctuation" style="color:#393A34">:</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    private_key </span><span class="token operator" style="color:#393A34">=</span><span class="token plain"> load_pem_private_key</span><span class="token punctuation" style="color:#393A34">(</span><span class="token plain">data</span><span class="token operator" style="color:#393A34">=</span><span class="token plain">f</span><span class="token punctuation" style="color:#393A34">.</span><span class="token plain">read</span><span class="token punctuation" style="color:#393A34">(</span><span class="token punctuation" style="color:#393A34">)</span><span class="token punctuation" style="color:#393A34">,</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">                                       password</span><span class="token operator" style="color:#393A34">=</span><span class="token boolean" style="color:#36acaa">None</span><span class="token punctuation" style="color:#393A34">)</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain" style="display:inline-block"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">raw_data </span><span class="token operator" style="color:#393A34">=</span><span class="token plain"> logon_raw_data</span><span class="token punctuation" style="color:#393A34">(</span><span class="token plain">private_key</span><span class="token punctuation" style="color:#393A34">,</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">                          sender_comp_id</span><span class="token operator" style="color:#393A34">=</span><span class="token string" style="color:#e3116c">&#x27;5JQmUOsm&#x27;</span><span class="token punctuation" style="color:#393A34">,</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">                          target_comp_id</span><span class="token operator" style="color:#393A34">=</span><span class="token string" style="color:#e3116c">&#x27;SPOT&#x27;</span><span class="token punctuation" style="color:#393A34">,</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">                          msg_seq_num</span><span class="token operator" style="color:#393A34">=</span><span class="token string" style="color:#e3116c">&#x27;1&#x27;</span><span class="token punctuation" style="color:#393A34">,</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">                          sending_time</span><span class="token operator" style="color:#393A34">=</span><span class="token string" style="color:#e3116c">&#x27;20240612-08:52:21.613&#x27;</span><span class="token punctuation" style="color:#393A34">)</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p>The values presented below can be used to validate the correctness of the signature computation implementation:</p>





























<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td>MsgType (35)</td><td><code>A</code></td></tr><tr><td>SenderCompID (49)</td><td><code>EXAMPLE</code></td></tr><tr><td>TargetCompID (56)</td><td><code>SPOT</code></td></tr><tr><td>MsgSeqNum (34)</td><td><code>1</code></td></tr><tr><td>SendingTime (52)</td><td><code>20240627-11:17:25.223</code></td></tr></tbody></table>
<p>The Ed25519 private key used in the example computation is shown below:</p>
<blockquote>
<p>[!CAUTION]
The following secret key is provided solely for illustrative purposes. Do not use this key in any real-world application as it is not secure and may compromise your cryptographic implementation. Always generate your own unique and secure keys for actual use.</p>
</blockquote>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">-----BEGIN PRIVATE KEY-----</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">MC4CAQAwBQYDK2VwBCIEIIJEYWtGBrhACmb9Dvy+qa8WEf0lQOl1s4CLIAB9m89u</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">-----END PRIVATE KEY-----</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p>Computed signature:</p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">4MHXelVVcpkdwuLbl6n73HQUXUf1dse2PCgT1DYqW9w8AVZ1RACFGM+5UdlGPrQHrgtS3CvsRURC1oj73j8gCA==</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p>Resulting Logon <code>&lt;A&gt;</code> message:</p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=247|35=A|34=1|49=EXAMPLE|52=20240627-11:17:25.223|56=SPOT|95=88|96=4MHXelVVcpkdwuLbl6n73HQUXUf1dse2PCgT1DYqW9w8AVZ1RACFGM+5UdlGPrQHrgtS3CvsRURC1oj73j8gCA==|98=0|108=30|141=Y|553=sBRXrJx2DsOraMXOaUovEhgVRcjOvCtQwnWj8VxkOh1xqboS02SPGfKi2h8spZJb|25035=2|10=227|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="limits">Limits<a class="hash-link" aria-label="Direct link to Limits" title="Direct link to Limits" href="/docs/binance-spot-api-docs/testnet/fix-api#limits">​</a></h2>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="message-limits">Message Limits<a class="hash-link" aria-label="Direct link to Message Limits" title="Direct link to Message Limits" href="/docs/binance-spot-api-docs/testnet/fix-api#message-limits">​</a></h3>
<ul>
<li>Each connection has a limit on <strong>how many messages can be sent to the exchange</strong>.</li>
<li>The message limit <strong>does not count the messages sent in response to the client</strong>.</li>
<li>Breaching the message limit results in immediate <a href="/docs/binance-spot-api-docs/testnet/fix-api#logout">Logout <code>&lt;5&gt;</code></a> and disconnection.</li>
<li>To understand current limits and usage, please send a <a href="/docs/binance-spot-api-docs/testnet/fix-api#limitquery">LimitQuery<code>&lt;XLQ&gt;</code></a> message.
A <a href="/docs/binance-spot-api-docs/testnet/fix-api#limitresponse">LimitResponse<code>&lt;XLR&gt;</code></a> message will be sent in response, containing information about Order Rate
Limits and Message Limits.</li>
<li>FIX Order entry sessions have a limit of 10,000 messages every 10 seconds.</li>
<li>FIX Drop Copy sessions have a limit of 60 messages every 60 seconds.</li>
<li>FIX Market Data sessions have a limit of 2000 messages every 60 seconds.</li>
</ul>
<p><a id="connection-limits"></a></p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="connection-limits">Connection Limits<a class="hash-link" aria-label="Direct link to Connection Limits" title="Direct link to Connection Limits" href="/docs/binance-spot-api-docs/testnet/fix-api#connection-limits">​</a></h3>
<ul>
<li>Each Account has a limit on how many TCP connections can be established at the same time.</li>
<li>The limit is reduced when the TCP connection is closed. If the reduction of connections is not immediate, please wait up to twice the value of <code>HeartBtInt (108)</code> for the change to take effect.
For example, if the current value of <code>HeartBtInt</code> is 5, please wait up to 10 seconds.</li>
<li>Upon breaching the limit a <a href="/docs/binance-spot-api-docs/testnet/fix-api#reject">Reject <code>&lt;3&gt;</code></a> will be sent containing information about the connection limit
breach and the current limit.</li>
<li>FIX Order Entry limits:
<ul>
<li>15 connection attempts within 30 seconds</li>
<li>Maximum of 10 concurrent TCP connections per account</li>
</ul>
</li>
<li>FIX Drop Copy limits:
<ul>
<li>15 connection attempts within 30 seconds</li>
<li>Maximum of 10 concurrent TCP connections per account</li>
</ul>
</li>
<li>FIX Market Data limits
<ul>
<li>300 connection attempts within 300 seconds</li>
<li>Maximum of 100 concurrent TCP connections per account</li>
<li>A single connection can listen to a maximum of 1000 streams.</li>
</ul>
</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="unfilled-order-count">Unfilled Order Count<a class="hash-link" aria-label="Direct link to Unfilled Order Count" title="Direct link to Unfilled Order Count" href="/docs/binance-spot-api-docs/testnet/fix-api#unfilled-order-count">​</a></h3>
<ul>
<li>To understand how many orders you have placed within a certain time interval, please send a <a href="/docs/binance-spot-api-docs/testnet/fix-api#limitquery">LimitQuery<code>&lt;XLQ&gt;</code></a> message.
A <a href="/docs/binance-spot-api-docs/testnet/fix-api#limitresponse">LimitResponse<code>&lt;XLR&gt;</code></a> message will be sent in response, containing information about Unfilled Order Count and Message Limits.</li>
<li><strong>Please note that if your orders are consistently filled by trades, you can continuously place orders on the API</strong>. For more information, please see <a href="/docs/binance-spot-api-docs/faqs/order_count_decrement">Spot Unfilled Order Count Rules</a>.</li>
<li>If you exceed the unfilled order count your message will be rejected, and information will be transferred back to you in a reject message specific to that endpoint.</li>
<li><strong>The number of unfilled orders is tracked for each account.</strong></li>
</ul>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="error-handling">Error Handling<a class="hash-link" aria-label="Direct link to Error Handling" title="Direct link to Error Handling" href="/docs/binance-spot-api-docs/testnet/fix-api#error-handling">​</a></h2>
<p>Client messages that contain syntax errors, missing required fields, or refer to unknown symbols will be rejected by the server with a <a href="/docs/binance-spot-api-docs/testnet/fix-api#reject">Reject <code>&lt;3&gt;</code></a> message.</p>
<p>If a valid message cannot be processed and is rejected, an appropriate reject response will be sent.
Please refer to the individual message documentation for possible responses.</p>
<p>Please refer to the <code>Text (58)</code> and <code>ErrorCode (25016)</code> fields in responses for the reject reason.</p>
<p>The list of error codes can be found on the <a href="/docs/binance-spot-api-docs/testnet/errors">Error codes</a> page.</p>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="types">Types<a class="hash-link" aria-label="Direct link to Types" title="Direct link to Types" href="/docs/binance-spot-api-docs/testnet/fix-api#types">​</a></h2>
<p>Only printable ASCII characters and SOH are supported.</p>

















































<table><thead><tr><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>BOOLEAN</code></td><td>Enum: <code>Y</code> or <code>N</code>.</td></tr><tr><td><code>CHAR</code></td><td>Single character.</td></tr><tr><td><code>INT</code></td><td>Signed 64-bit integer.</td></tr><tr><td><code>LENGTH</code></td><td>Unsigned 64-bit integer.</td></tr><tr><td><code>NUMINGROUP</code></td><td>Unsigned 64-bit integer.</td></tr><tr><td><code>PRICE</code></td><td>Fixed-point number. Precision depends on the symbol definition.</td></tr><tr><td><code>QTY</code></td><td>Fixed-point number. Precision depends on the symbol definition.</td></tr><tr><td><code>SEQNUM</code></td><td>Unsigned 32-bit integer. Rolls over to 0 after reaching its maximum value of 4,294,967,295.</td></tr><tr><td><code>STRING</code></td><td>Sequence of printable ASCII characters.</td></tr><tr><td><code>UTCTIMESTAMP</code></td><td>String representing datetime in UTC.</td></tr></tbody></table>
<p>Supported <code>UTCTIMESTAMP</code> formats:</p>
<ul>
<li><code>20011217-09:30:47</code> - seconds</li>
<li><code>20011217-09:30:47.123</code> - milliseconds</li>
<li><code>20011217-09:30:47.123456</code> - microseconds (always used in messages from the exchange)</li>
</ul>
<p>Client order ID fields must conform to the regex <code>^[a-zA-Z0-9-_]{1,36}$</code>:</p>
<ul>
<li><code>ClOrdID (11)</code></li>
<li><code>OrigClOrdID (41)</code></li>
<li><code>MDReqID (262)</code></li>
<li><code>ClListID (25014)</code></li>
<li><code>OrigClListID (25015)</code></li>
<li><code>CancelClOrdID (25034)</code></li>
</ul>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="message-components">Message Components<a class="hash-link" aria-label="Direct link to Message Components" title="Direct link to Message Components" href="/docs/binance-spot-api-docs/testnet/fix-api#message-components">​</a></h2>
<blockquote>
<p>[!NOTE]
In example messages, the <code>|</code> character is used to represent SOH character:</p>
</blockquote>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=113|35=A|34=1|49=SPOT|52=20240612-08:52:21.636837|56=5JQmUOsm|98=0|108=30|25037=4392a152-3481-4499-921a-6d42c50702e2|10=051|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><a id="header"></a></p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="header">Header<a class="hash-link" aria-label="Direct link to Header" title="Direct link to Header" href="/docs/binance-spot-api-docs/testnet/fix-api#header">​</a></h3>
<p>Appears at the start of every message.</p>




































































<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>8</td><td>BeginString</td><td>STRING</td><td>Y</td><td>Always <code>FIX.4.4</code>. <br><br> Must be the first field the message.</td></tr><tr><td>9</td><td>BodyLength</td><td>LENGTH</td><td>Y</td><td>Message length in bytes. <br><br> Must be the second field in the message.</td></tr><tr><td>35</td><td>MsgType</td><td>STRING</td><td>Y</td><td>Must be the third field in the message. <br><br> Possible values: <br><br><code>0</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#heartbeat">HEARTBEAT</a> <br><br><code>1</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#testrequest">TEST_REQUEST</a> <br><br><code>3</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#reject">REJECT</a> <br><br><code>5</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#logout">LOGOUT</a> <br><br><code>8</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#executionreport">EXECUTION_REPORT</a> <br><br> <code>9</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#ordercancelreject">ORDER_CANCEL_REJECT</a> <br><br> <code>A</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#logon-main">LOGON</a> <br><br> <code>D</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#newordersingle">NEW_ORDER_SINGLE</a> <br><br> <code>E</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#neworderlist">NEW_ORDER_LIST</a> <br><br> <code>F</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#ordercancelrequest">ORDER_CANCEL_REQUEST</a> <br><br> <code>N</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#liststatus">LIST_STATUS</a> <br><br> <code>q</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#ordermasscancelrequest">ORDER_MASS_CANCEL_REQUEST</a> <br><br> <code>r</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#ordermasscancelreport">ORDER_MASS_CANCEL_REPORT</a> <br><br> <code>XCN</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#ordercancelrequestandnewordersingle">ORDER_CANCEL_REQUEST_AND_NEW_ORDER_SINGLE</a> <br><br> <code>XLQ</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#limitquery">LIMIT_QUERY</a> <br><br> <code>XLR</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#limitresponse">LIMIT_RESPONSE</a> <br><br> <code>B</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#news">NEWS</a> <br><br> <code>x</code>- <a href="/docs/binance-spot-api-docs/testnet/fix-api#instrumentlistrequest">INSTRUMENT_LIST_REQUEST</a> <br><br> <code>y</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#instrumentlist">INSTRUMENT_LIST</a>  <br><br><code>V</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#marketdatarequest">MARKET_DATA_REQUEST</a> <br><br> <code>Y</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#marketdatarequestreject">MARKET_DATA_REQUEST_REJECT</a> <br><br><code>W</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#marketdatasnapshot">MARKET_DATA_SNAPSHOT</a> <br><br><code>X</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#marketdataincrementalrefresh">MARKET_DATA_INCREMENTAL_REFRESH</a> <br><br> <code>XAK</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#orderamendkeeppriorityrequest">ORDER_AMEND_KEEP_PRIORITY_REQUEST</a> <br><br> <code>XAR</code> - <a href="/docs/binance-spot-api-docs/testnet/fix-api#orderamendreject">ORDER_AMEND_REJECT</a></td></tr><tr><td>49</td><td>SenderCompID</td><td>STRING</td><td>Y</td><td>Must be unique across an account&#x27;s active sessions.  <br><br> Must obey regex: <code>^[a-zA-Z0-9-_]{1,8}$</code></td></tr><tr><td>56</td><td>TargetCompID</td><td>STRING</td><td>Y</td><td>A string identifying this TCP connection.<br><br>On messages from client required to be set to <code>SPOT</code>. <br><br>Must be unique across TCP connections. <br><br> Must conform to the regex: <code>^[a-zA-Z0-9-_]{1,8}$</code></td></tr><tr><td>34</td><td>MsgSeqNum</td><td>SEQNUM</td><td>Y</td><td>Integer message sequence number. <br><br> Values that will cause a gap will be rejected.</td></tr><tr><td>52</td><td>SendingTime</td><td>UTCTIMESTAMP</td><td>Y</td><td>Time of message transmission (always expressed in UTC).</td></tr><tr><td>25000</td><td>RecvWindow</td><td>FLOAT</td><td>N</td><td>Number of milliseconds after <code>SendingTime (52)</code> the request is valid for. <br><br> Defaults to <code>5000</code> milliseconds in <a href="/docs/binance-spot-api-docs/testnet/fix-api#logon-request">Logon<code>&lt;A&gt;</code></a> and has a max value of <code>60000</code> milliseconds. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified.</td></tr></tbody></table>
<p><a id="trailer"></a></p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="trailer">Trailer<a class="hash-link" aria-label="Direct link to Trailer" title="Direct link to Trailer" href="/docs/binance-spot-api-docs/testnet/fix-api#trailer">​</a></h3>
<p>Appears at the end of every message.</p>



















<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>10</td><td>CheckSum</td><td>STRING</td><td>Y</td><td>Always three-character numeric string, calculated by summing the ASCII values of each preceding character in the message, including start-of-header (SOH) characters. <br><br> The resultant sum is divided by 256, with the remainder forming the CheckSum value. <br><br> To maintain a fixed length, the CheckSum field is right-justified and zero-padded as needed.</td></tr></tbody></table>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="administrative-messages">Administrative Messages<a class="hash-link" aria-label="Direct link to Administrative Messages" title="Direct link to Administrative Messages" href="/docs/binance-spot-api-docs/testnet/fix-api#administrative-messages">​</a></h2>
<p><a id="heartbeat"></a></p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="heartbeat-0">Heartbeat <code>&lt;0&gt;</code><a class="hash-link" aria-label="Direct link to heartbeat-0" title="Direct link to heartbeat-0" href="/docs/binance-spot-api-docs/testnet/fix-api#heartbeat-0">​</a></h3>
<p>Sent by the server if there is no outgoing traffic during the heartbeat interval (<code>HeartBtInt (108)</code> in <a href="/docs/binance-spot-api-docs/testnet/fix-api#logon-main">Logon<code>&lt;A&gt;</code></a>).</p>
<p>Sent by the client to indicate that the session is healthy.</p>
<p>Sent by the client or the server in response to a <a href="/docs/binance-spot-api-docs/testnet/fix-api#testrequest">TestRequest<code>&lt;1&gt;</code></a> message.</p>



















<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>112</td><td>TestReqID</td><td>STRING</td><td>N</td><td>When Heartbeat<code>&lt;35&gt;</code> is sent in response to TestRequest<code>&lt;1&gt;</code>, must mirror the value in TestRequest<code>&lt;1&gt;</code>.</td></tr></tbody></table>
<p><a id="testrequest"></a></p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="testrequest-1">TestRequest <code>&lt;1&gt;</code><a class="hash-link" aria-label="Direct link to testrequest-1" title="Direct link to testrequest-1" href="/docs/binance-spot-api-docs/testnet/fix-api#testrequest-1">​</a></h3>
<p>Sent by the server if there is no incoming traffic during the heartbeat interval (<code>HeartBtInt (108)</code> in <a href="/docs/binance-spot-api-docs/testnet/fix-api#logon-main">Logon<code>&lt;A&gt;</code></a>).</p>
<p>Sent by the client to request a <a href="/docs/binance-spot-api-docs/testnet/fix-api#heartbeat">Heartbeat<code>&lt;0&gt;</code></a> response.</p>
<blockquote>
<p>[!NOTE]
If the client does not respond to TestRequest<code>&lt;1&gt;</code> with Heartbeat<code>&lt;0&gt;</code> with a correct <code>TestReqID (112)</code>  within timeout, the connection will be dropped.</p>
</blockquote>



















<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>112</td><td>TestReqID</td><td>STRING</td><td>Y</td><td>Arbitrary string that must be included in the Heartbeat<code>&lt;0&gt;</code> response.</td></tr></tbody></table>
<p><a id="reject"></a></p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="reject-3">Reject <code>&lt;3&gt;</code><a class="hash-link" aria-label="Direct link to reject-3" title="Direct link to reject-3" href="/docs/binance-spot-api-docs/testnet/fix-api#reject-3">​</a></h3>
<p>Sent by the server in response to an invalid message that cannot be processed.</p>
<p>Sent by the server if a new connection cannot be accepted.
Please refer to <a href="/docs/binance-spot-api-docs/testnet/fix-api#connection-limits">Connection Limits</a>.</p>
<p>Please refer to the <code>Text (58)</code> and <code>ErrorCode (25016)</code> fields for the reject reason.</p>






















































<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>45</td><td>RefSeqNum</td><td>INT</td><td>N</td><td>The <code>MsgSeqNum (34)</code> of the rejected message that caused issuance of this Reject<code>&lt;3&gt;</code>.</td></tr><tr><td>371</td><td>RefTagID</td><td>INT</td><td>N</td><td>When present, identifies the field that directly caused the issuance of this Reject<code>&lt;3&gt;</code> message.</td></tr><tr><td>372</td><td>RefMsgType</td><td>STRING</td><td>N</td><td>The <code>MsgType (35)</code> of the rejected message that caused issuance of this Reject<code>&lt;3&gt;</code>.</td></tr><tr><td>373</td><td>SessionRejectReason</td><td>INT</td><td>N</td><td>A reason for the reject, can be one of the values below. <br><br> Usually accompanied by additional Text description <br><br> Possible values: <br><br><code>0</code>- INVALID_TAG_NUMBER <br><br> <code>1</code> - REQUIRED_TAG_MISSING <br><br> <code>2</code> - TAG_NOT_DEFINED_FOR_THIS_MESSAGE_TYPE <br><br> <code>3</code> - UNDEFINED_TAG <br><br> <code>5</code> - VALUE_IS_INCORRECT <br><br> <code>6</code> - INCORRECT_DATA_FORMAT_FOR_VALUE <br><br> <code>8</code> - SIGNATURE_PROBLEM <br><br> <code>10</code> - SENDINGTIME_ACCURACY_PROBLEM   <br><br> <code>12</code> - XML_VALIDATION_ERROR <br><br> <code>13</code> - TAG_APPEARS_MORE_THAN_ONCE <br><br> <code>14</code> - TAG_SPECIFIED_OUT_OF_REQUIRED_ORDER <br><br> <code>15</code> - REPEATING_GROUP_FIELDS_OUT_OF_ORDER <br><br> <code>16</code> - INCORRECT_NUMINGROUP_COUNT_FOR_REPEATING_GROUP<br><br> <code>99</code> - OTHER</td></tr><tr><td>25016</td><td>ErrorCode</td><td>INT</td><td>N</td><td>API error code (see <a href="/docs/binance-spot-api-docs/testnet/errors">Error Codes</a>).</td></tr><tr><td>58</td><td>Text</td><td>STRING</td><td>N</td><td>Human-readable error message.</td></tr></tbody></table>
<p><a id="logon-main"></a></p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="logon-a">Logon <code>&lt;A&gt;</code><a class="hash-link" aria-label="Direct link to logon-a" title="Direct link to logon-a" href="/docs/binance-spot-api-docs/testnet/fix-api#logon-a">​</a></h3>
<p>Sent by the client to authenticate the connection.
Logon<code>&lt;A&gt;</code> must be the first message sent by the client.</p>
<p>Sent by the server in response to a successful logon.</p>
<blockquote>
<p>[!NOTE]
Logon<code>&lt;A&gt;</code> can only be sent once for the entirety of the session.</p>
</blockquote>
<p><a id="logon-request"></a></p>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="logon-request">Logon Request<a class="hash-link" aria-label="Direct link to Logon Request" title="Direct link to Logon Request" href="/docs/binance-spot-api-docs/testnet/fix-api#logon-request">​</a></h4>











































































<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>98</td><td>EncryptMethod</td><td>INT</td><td>Y</td><td>Required to be <code>0</code>.</td></tr><tr><td>108</td><td>HeartBtInt</td><td>INT</td><td>Y</td><td>Required to be within range [5, 60]. Heartbeat interval in seconds.</td></tr><tr><td>95</td><td>RawDataLength</td><td>LENGTH</td><td>Y</td><td>Length of the <code>RawData (96)</code> field that comes strictly after this field.</td></tr><tr><td>96</td><td>RawData</td><td>DATA</td><td>Y</td><td>Signature. <a href="/docs/binance-spot-api-docs/testnet/fix-api#signaturecomputation">How to sign Logon<code>&lt;A&gt;</code> request</a>.</td></tr><tr><td>141</td><td>ResetSeqNumFlag</td><td>BOOLEAN</td><td>Y</td><td>Required to be <code>Y</code>.</td></tr><tr><td>553</td><td>Username</td><td>STRING</td><td>Y</td><td>API key. <strong>Only Ed25519 API keys are supported.</strong></td></tr><tr><td>25035</td><td>MessageHandling</td><td>INT</td><td>Y</td><td>Possible values: <br><br> <code>1</code> - UNORDERED <br><br> <code>2</code> - SEQUENTIAL <br><br> Please refer to <a href="/docs/binance-spot-api-docs/testnet/fix-api#orderedmode">On message order processing</a> for more information.</td></tr><tr><td>25036</td><td>ResponseMode</td><td>INT</td><td>N</td><td>Please refer to <a href="/docs/binance-spot-api-docs/testnet/fix-api#responsemode">Response Mode</a>.</td></tr><tr><td>9406</td><td>DropCopyFlag</td><td>BOOLEAN</td><td>N</td><td>Must be set to &#x27;Y&#x27; when logging into Drop Copy sessions.</td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=248|35=A|34=1|49=5JQmUOsm|52=20240612-08:52:21.613|56=SPOT|95=88|96=KhJLbZqADWknfTAcp0ZjyNz36Kxa4ffvpNf9nTIc+K5l35h+vA1vzDRvLAEQckyl6VDOwJ53NOBnmmRYxQvQBQ==|98=0|108=30|141=Y|553=W5rcOD30c0gT4jHK8oX5d5NbzWoa0k4SFVoTHIFNJVZ3NuRpYb6ZyJznj8THyx5d|25035=1|10=000|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><a id="logon-response"></a></p>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="logon-response">Logon Response<a class="hash-link" aria-label="Direct link to Logon Response" title="Direct link to Logon Response" href="/docs/binance-spot-api-docs/testnet/fix-api#logon-response">​</a></h4>

































<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>98</td><td>EncryptMethod</td><td>INT</td><td>Y</td><td>Always <code>0</code>.</td></tr><tr><td>108</td><td>HeartBtInt</td><td>INT</td><td>Y</td><td>Mirrors value from the Logon request.</td></tr><tr><td>25037</td><td>UUID</td><td>STRING</td><td>Y</td><td>UUID of the FIX API serving the requests.</td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=113|35=A|34=1|49=SPOT|52=20240612-08:52:21.636837|56=5JQmUOsm|98=0|108=30|25037=4392a152-3481-4499-921a-6d42c50702e2|10=051|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><a id="logout"></a></p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="logout-5">Logout <code>&lt;5&gt;</code><a class="hash-link" aria-label="Direct link to logout-5" title="Direct link to logout-5" href="/docs/binance-spot-api-docs/testnet/fix-api#logout-5">​</a></h3>
<p>Sent to initiate the process of closing the connection, and also when responding to Logout.</p>



















<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>58</td><td>Text</td><td>STRING</td><td>N</td><td></td></tr></tbody></table>
<p><strong>Sample messages:</strong></p>
<p>Logout Request</p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=55|35=5|34=3|49=GhQHzrLR|52=20240611-09:44:25.543|56=SPOT|10=249|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p>Logout Response</p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=84|35=5|34=4|49=SPOT|52=20240611-09:44:25.544001|56=GhQHzrLR|58=Logout acknowledgment.|10=212|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><a id="news"></a></p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="news-b">News <code>&lt;B&gt;</code><a class="hash-link" aria-label="Direct link to news-b" title="Direct link to news-b" href="/docs/binance-spot-api-docs/testnet/fix-api#news-b">​</a></h3>
<p>When the server enters maintenance, a <code>News</code> message will be sent to clients <strong>every 10 seconds for 10 minutes</strong>.
After this period, clients will be logged out and their sessions will be closed.</p>
<p>Upon receiving this message, clients are expected to establish a new session and close the old one.</p>
<p>The countdown message sent will be:</p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">You&#x27;ll be disconnected in %d seconds. Please reconnect.</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p>When there are 10 seconds remaining, the following message will be sent:</p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">Your connection is about to be closed. Please reconnect.</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p>If the client does not close the old session within 10 seconds of receiving the above message, the server will log it out and close the session.</p>



















<table><thead><tr><th style="text-align:left">Tag</th><th style="text-align:left">Name</th><th style="text-align:left">Type</th><th style="text-align:left">Required</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">148</td><td style="text-align:left">Headline</td><td style="text-align:left">STRING</td><td style="text-align:left">Y</td><td style="text-align:left"></td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=0000113|35=B|49=SPOT|56=OE|34=4|52=20240924-21:07:35.773537|148=Your connection is about to be closed. Please reconnect.|10=165|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="resend-request-2">Resend Request <code>&lt;2&gt;</code><a class="hash-link" aria-label="Direct link to resend-request-2" title="Direct link to resend-request-2" href="/docs/binance-spot-api-docs/testnet/fix-api#resend-request-2">​</a></h3>
<p>Resend requests are currently not supported.</p>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="application-messages">Application Messages<a class="hash-link" aria-label="Direct link to Application Messages" title="Direct link to Application Messages" href="/docs/binance-spot-api-docs/testnet/fix-api#application-messages">​</a></h2>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="order-entry-messages">Order Entry Messages<a class="hash-link" aria-label="Direct link to Order Entry Messages" title="Direct link to Order Entry Messages" href="/docs/binance-spot-api-docs/testnet/fix-api#order-entry-messages">​</a></h3>
<blockquote>
<p>[!NOTE]
The messages below can only be used for the FIX Order Entry and FIX Drop Copy Sessions.</p>
</blockquote>
<p><a id="newordersingle"></a></p>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="newordersingle-d">NewOrderSingle <code>&lt;D&gt;</code><a class="hash-link" aria-label="Direct link to newordersingle-d" title="Direct link to newordersingle-d" href="/docs/binance-spot-api-docs/testnet/fix-api#newordersingle-d">​</a></h4>
<p>Sent by the client to submit a new order for execution.</p>
<p>This adds 1 order to the <code>EXCHANGE_MAX_ORDERS</code> filter and the <code>MAX_NUM_ORDERS</code> filter.</p>
<p><strong>Unfilled Order Count:</strong> 1</p>
<p>Please refer to <a href="/docs/binance-spot-api-docs/testnet/fix-api#ordertype">Supported Order Types</a> for supported field combinations.</p>
<blockquote>
<p>[!NOTE]
Many fields become required based on the order type.
Please refer to <a href="/docs/binance-spot-api-docs/testnet/fix-api#NewOrderSingle-required-fields">Supported Order Types</a>.</p>
</blockquote>




















































































































































































<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>11</td><td>ClOrdID</td><td>STRING</td><td>Y</td><td><code>ClOrdID</code> to be assigned to the order.</td></tr><tr><td>38</td><td>OrderQty</td><td>QTY</td><td>N</td><td>Quantity of the order</td></tr><tr><td>40</td><td>OrdType</td><td>CHAR</td><td>Y</td><td>See the <a href="/docs/binance-spot-api-docs/testnet/fix-api#ordertype">table</a> to understand supported order types and the required fields to use them.<br><br>Possible values: <br><br> <code>1</code> - MARKET <br><br> <code>2</code> - LIMIT <br><br> <code>3</code> - STOP <br><br> <code>4</code> - STOP_LIMIT  <br><br> <code>P</code>- PEGGED</td></tr><tr><td>18</td><td>ExecInst</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>6</code> - PARTICIPATE_DONT_INITIATE</td></tr><tr><td>44</td><td>Price</td><td>PRICE</td><td>N</td><td>Price of the order</td></tr><tr><td>54</td><td>Side</td><td>CHAR</td><td>Y</td><td>Side of the order.<br><br>Possible values: <br><br> <code>1</code> - BUY <br><br> <code>2</code> - SELL</td></tr><tr><td>55</td><td>Symbol</td><td>STRING</td><td>Y</td><td>Symbol to place the order on.</td></tr><tr><td>59</td><td>TimeInForce</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>1</code> - GOOD_TILL_CANCEL <br><br> <code>3</code> - IMMEDIATE_OR_CANCEL <br><br> <code>4</code> - FILL_OR_KILL</td></tr><tr><td>111</td><td>MaxFloor</td><td>QTY</td><td>N</td><td>Used for iceberg orders, this specifies the visible quantity of the order on the book.</td></tr><tr><td>152</td><td>CashOrderQty</td><td>QTY</td><td>N</td><td>Quantity of the order specified in the quote asset units, for reverse market orders.</td></tr><tr><td>847</td><td>TargetStrategy</td><td>INT</td><td>N</td><td>The value cannot be less than <code>1000000</code>.</td></tr><tr><td>7940</td><td>StrategyID</td><td>INT</td><td>N</td><td></td></tr><tr><td>25001</td><td>SelfTradePreventionMode</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>1</code> - NONE <br><br> <code>2</code> - EXPIRE_TAKER <br><br> <code>3</code> - EXPIRE_MAKER <br><br> <code>4</code> - EXPIRE_BOTH <br><br> <code>5</code> - DECREMENT  <br> <code>6</code> - TRANSFER</td></tr><tr><td>211</td><td>PegOffsetValue</td><td>FLOAT</td><td>N</td><td>Amount added to the peg in the context of the PegOffsetType</td></tr><tr><td>1094</td><td>PegPriceType</td><td>CHAR</td><td>N</td><td>Defines the type of peg <br> Possible values: <br> <code>4</code> - MARKET_PEG <br> <code>5</code> - PRIMARY_PEG</td></tr><tr><td>835</td><td>PegMoveType</td><td>CHAR</td><td>N</td><td>Describes whether peg is fixed or floats. Required for Pegged Orders and must be set to <code>1</code> (FIXED)</td></tr><tr><td>836</td><td>PegOffsetType</td><td>CHAR</td><td>N</td><td>Type of price peg offset. <br> Possible values: <br><br> <code>3</code>  - PRICE_TIER</td></tr><tr><td>1100</td><td>TriggerType</td><td>CHAR</td><td>N</td><td>Possible values: <code>4</code> - PRICE_MOVEMENT</td></tr><tr><td>1101</td><td>TriggerAction</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>1</code> - ACTIVATE</td></tr><tr><td>1102</td><td>TriggerPrice</td><td>PRICE</td><td>N</td><td>Activation price for contingent orders. See <a href="/docs/binance-spot-api-docs/testnet/fix-api#ordertype">table</a></td></tr><tr><td>1107</td><td>TriggerPriceType</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>2</code> - LAST_TRADE</td></tr><tr><td>1109</td><td>TriggerPriceDirection</td><td>CHAR</td><td>N</td><td>Used to differentiate between StopLoss and TakeProfit orders. See <a href="/docs/binance-spot-api-docs/testnet/fix-api#ordertype">table</a>.<br><br>Possible values: <br><br> <code>U</code> - TRIGGER_IF_THE_PRICE_OF_THE_SPECIFIED_TYPE_GOES_UP_TO_OR_THROUGH_THE_SPECIFIED_TRIGGER_PRICE <br><br> <code>D</code> - TRIGGER_IF_THE_PRICE_OF_THE_SPECIFIED_TYPE_GOES_DOWN_TO_OR_THROUGH_THE_SPECIFIED_TRIGGER_PRICE</td></tr><tr><td>25009</td><td>TriggerTrailingDeltaBips</td><td>INT</td><td>N</td><td>Provide to create trailing orders.</td></tr><tr><td>25032</td><td>SOR</td><td>BOOLEAN</td><td>N</td><td>Whether to activate SOR for this order.</td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=114|35=D|34=2|49=qNXO12fH|52=20240611-09:01:46.228|56=SPOT|11=1718096506197867067|38=5|40=2|44=10|54=1|55=LTCBNB|59=4|10=016|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><strong>Response:</strong></p>
<ul>
<li><a href="/docs/binance-spot-api-docs/testnet/fix-api#executionreport">ExecutionReport<code>&lt;8&gt;</code></a> with <code>ExecType (150)</code> value <code>NEW (0)</code> if the order was accepted.</li>
<li><a href="/docs/binance-spot-api-docs/testnet/fix-api#executionreport">ExecutionReport<code>&lt;8&gt;</code></a> with <code>ExecType (150)</code> value <code>REJECTED (8)</code> if the order was rejected.</li>
<li><a href="/docs/binance-spot-api-docs/testnet/fix-api#reject">Reject<code>&lt;3&gt;</code></a> if the message is rejected.</li>
</ul>
<p><a id="ordertype"></a></p>
<h5 class="anchor anchorWithStickyNavbar_fMI7" id="supported-order-types">Supported Order Types<a class="hash-link" aria-label="Direct link to Supported Order Types" title="Direct link to Supported Order Types" href="/docs/binance-spot-api-docs/testnet/fix-api#supported-order-types">​</a></h5>













































































































































































<table><thead><tr><th>Order name</th><th>Binance OrderType</th><th>Side</th><th>required field values</th><th>required fields with user values</th></tr></thead><tbody><tr><td>Market order</td><td><code>MARKET</code></td><td>BUY or SELL</td><td><code>40=1|</code></td><td></td></tr><tr><td>Limit order</td><td><code>LIMIT</code></td><td>BUY or SELL</td><td><code>40=2|</code></td><td></td></tr><tr><td>Limit maker order</td><td><code>LIMIT_MAKER</code></td><td>BUY or SELL</td><td><code>40=2|18=6|</code></td><td></td></tr><tr><td>Buy stop loss order</td><td><code>STOP_LOSS</code></td><td>BUY</td><td><code>40=3|1100=4|1101=1|1107=2|1109=U|</code></td><td>1102</td></tr><tr><td>Buy trailing stop loss order</td><td><code>STOP_LOSS</code></td><td>BUY</td><td><code>40=3|1100=4|1101=1|1107=2|1109=U|</code></td><td>1102,25009</td></tr><tr><td>Buy stop loss limit order</td><td><code>STOP_LOSS_LIMIT</code></td><td>BUY</td><td><code>40=4|1100=4|1101=1|1107=2|1109=U|</code></td><td>1102</td></tr><tr><td>Buy trailing stop loss limit order</td><td><code>STOP_LOSS_LIMIT</code></td><td>BUY</td><td><code>40=4|1100=4|1101=1|1107=2|1109=U|</code></td><td>1102,25009</td></tr><tr><td>Sell stop loss order</td><td><code>STOP_LOSS</code></td><td>SELL</td><td><code>40=3|1100=4|1101=1|1107=2|1109=D|</code></td><td>1102</td></tr><tr><td>Sell trailing stop loss order</td><td><code>STOP_LOSS</code></td><td>SELL</td><td><code>40=3|1100=4|1101=1|1107=2|1109=D|</code></td><td>1102,25009</td></tr><tr><td>Sell stop loss limit order</td><td><code>STOP_LOSS_LIMIT</code></td><td>SELL</td><td><code>40=4|1100=4|1101=1|1107=2|1109=D|</code></td><td>1102</td></tr><tr><td>Sell trailing stop loss limit order</td><td><code>STOP_LOSS_LIMIT</code></td><td>SELL</td><td><code>40=4|1100=4|1101=1|1107=2|1109=D|</code></td><td>1102,25009</td></tr><tr><td>Buy take profit order</td><td><code>TAKE_PROFIT</code></td><td>BUY</td><td><code>40=3|1100=4|1101=1|1107=2|1109=D|</code></td><td>1102</td></tr><tr><td>Buy trailing take profit order</td><td><code>TAKE_PROFIT</code></td><td>BUY</td><td><code>40=3|1100=4|1101=1|1107=2|1109=D|</code></td><td>1102,25009</td></tr><tr><td>Buy trailing take profit order</td><td><code>TAKE_PROFIT</code></td><td>BUY</td><td><code>40=3|1100=4|1101=1|1107=2|</code></td><td>25009</td></tr><tr><td>Buy take profit order</td><td><code>TAKE_PROFIT_LIMIT</code></td><td>BUY</td><td><code>40=4|1100=4|1101=1|1107=2|1109=D|</code></td><td>1102</td></tr><tr><td>Buy trailing take profit limit order</td><td><code>TAKE_PROFIT_LIMIT</code></td><td>BUY</td><td><code>40=4|1100=4|1101=1|1107=2|1109=D|</code></td><td>1102,25009</td></tr><tr><td>Buy trailing take profit limit order</td><td><code>TAKE_PROFIT_LIMIT</code></td><td>BUY</td><td><code>40=4|1100=4|1101=1|1107=2|</code></td><td>25009</td></tr><tr><td>Sell take profit order</td><td><code>TAKE_PROFIT</code></td><td>SELL</td><td><code>40=3|1100=4|1101=1|1107=2|1109=U|</code></td><td>1102</td></tr><tr><td>Sell trailing take profit order</td><td><code>TAKE_PROFIT</code></td><td>SELL</td><td><code>40=3|1100=4|1101=1|1107=2|1109=U|</code></td><td>1102,25009</td></tr><tr><td>Sell trailing take profit order</td><td><code>TAKE_PROFIT</code></td><td>SELL</td><td><code>40=3|1100=4|1101=1|1107=2|</code></td><td>25009</td></tr><tr><td>Sell take profit limit order</td><td><code>TAKE_PROFIT_LIMIT</code></td><td>SELL</td><td><code>40=4|1100=4|1101=1|1107=2|1109=U|</code></td><td>1102</td></tr><tr><td>Sell trailing take profit limit order</td><td><code>TAKE_PROFIT_LIMIT</code></td><td>SELL</td><td><code>40=4|1100=4|1101=1|1107=2|1109=U|</code></td><td>1102,25009</td></tr><tr><td>Sell trailing take profit limit order</td><td><code>TAKE_PROFIT_LIMIT</code></td><td>SELL</td><td><code>40=4|1100=4|1101=1|1107=2|</code></td><td>25009</td></tr></tbody></table>
<p><a id="NewOrderSingle-required-fields"></a></p>
<p>Required fields based on Binance OrderType:</p>













































<table><thead><tr><th>Binance OrderType</th><th>Additional mandatory parameters</th><th>Additional Information</th></tr></thead><tbody><tr><td><code>LIMIT</code></td><td>38, 44, 59</td><td></td></tr><tr><td><code>MARKET</code></td><td>38 OR 152</td><td><code>MARKET</code> orders using the <code>OrderQty (38)</code> field specifies the amount of the <code>base asset</code> the user wants to buy or sell at the market price. <br> E.g. <code>MARKET</code> order on BTCUSDT will specify how much BTC the user is buying or selling. <br><br> <code>MARKET</code> orders using <code>quoteOrderQty</code> specifies the amount the user wants to spend (when buying) or receive (when selling) the <code>quote</code> asset; the correct <code>quantity</code> will be determined based on the market liquidity and <code>quoteOrderQty</code>. <br> E.g. Using the symbol BTCUSDT: <br> <code>BUY</code> side, the order will buy as many BTC as <code>quoteOrderQty</code> USDT can. <br> <code>SELL</code> side, the order will sell as much BTC needed to receive <code>CashOrderQty (152)</code> USDT.</td></tr><tr><td><code>STOP_LOSS</code></td><td>38, 1102 or 25009</td><td>This will execute a <code>MARKET</code> order when the conditions are met. (e.g. <code>TriggerPrice (1102)</code> is met or <code>TriggerTrailingDeltaBips (25009)</code> is activated)</td></tr><tr><td><code>STOP_LOSS_LIMIT</code></td><td>38, 44, 59, 1102 or 25009</td><td></td></tr><tr><td><code>TAKE_PROFIT</code></td><td>38, 1102 or 25009</td><td>This will execute a <code>MARKET</code> order when the conditions are met. (e.g. <code>TriggerPrice (1102)</code> is met or <code>TriggerTrailingDeltaBips (25009)</code> is activated)</td></tr><tr><td><code>TAKE_PROFIT_LIMIT</code></td><td>38, 44, 59, 1102 or 25009</td><td></td></tr><tr><td><code>LIMIT_MAKER</code></td><td>38, 44</td><td>This is a <code>LIMIT</code> order that will be rejected if the order immediately matches and trades as a taker. <br> This is also known as a POST-ONLY order.</td></tr></tbody></table>
<p><a id="executionreport"></a></p>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="executionreport-8">ExecutionReport <code>&lt;8&gt;</code><a class="hash-link" aria-label="Direct link to executionreport-8" title="Direct link to executionreport-8" href="/docs/binance-spot-api-docs/testnet/fix-api#executionreport-8">​</a></h4>
<p>Sent by the server whenever an order state changes.</p>
<blockquote>
<p>[!NOTE]</p>
<ul>
<li>By default, ExecutionReport<code>&lt;8&gt;</code> is sent for all orders of an account, including those submitted in different connections. Please see <a href="/docs/binance-spot-api-docs/testnet/fix-api#responsemode">Response Mode</a> for other behavior options.</li>
<li>FIX API should give better performance for ExecutionReport<code>&lt;8&gt;</code> push.</li>
</ul>
</blockquote>
















































































































































































































































































































































































































































<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>17</td><td>ExecID</td><td>STRING</td><td>N</td><td>Omitted on rejected orders.</td></tr><tr><td>11</td><td>ClOrdID</td><td>STRING</td><td>N</td><td><code>ClOrdID</code> of the list as assigned on the request.</td></tr><tr><td>41</td><td>OrigClOrdID</td><td>STRING</td><td>N</td><td>Original <code>ClOrdID</code> of the order.</td></tr><tr><td>37</td><td>OrderID</td><td>INT</td><td>N</td><td>Assigned by exchange.</td></tr><tr><td>38</td><td>OrderQty</td><td>QTY</td><td>N</td><td>Quantity of the order.</td></tr><tr><td>40</td><td>OrdType</td><td>CHAR</td><td>Y</td><td>Possible values: <br><br> <code>1</code> - MARKET <br><br> <code>2</code> - LIMIT <br><br> <code>3</code> - STOP_LOSS <br><br> <code>4</code> - STOP_LIMIT <br><br> <code>P</code> - PEGGED</td></tr><tr><td>54</td><td>Side</td><td>CHAR</td><td>Y</td><td>Possible values: <br><br> <code>1</code> - BUY <br><br> <code>2</code> - SELL</td></tr><tr><td>55</td><td>Symbol</td><td>STRING</td><td>Y</td><td>Symbol of the order.</td></tr><tr><td>18</td><td>ExecInst</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>6</code> - PARTICIPATE_DONT_INITIATE</td></tr><tr><td>44</td><td>Price</td><td>PRICE</td><td>N</td><td>Price of the order.</td></tr><tr><td>59</td><td>TimeInForce</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>1</code> - GOOD_TILL_CANCEL <br><br> <code>3</code> - IMMEDIATE_OR_CANCEL <br><br> <code>4</code> - FILL_OR_KILL</td></tr><tr><td>60</td><td>TransactTime</td><td>UTCTIMESTAMP</td><td>N</td><td>Timestamp when this event occurred.</td></tr><tr><td>25018</td><td>OrderCreationTime</td><td>INT</td><td>N</td><td></td></tr><tr><td>111</td><td>MaxFloor</td><td>QTY</td><td>N</td><td>Appears on iceberg orders.</td></tr><tr><td>66</td><td>ListID</td><td>STRING</td><td>N</td><td>Appears on list orders.</td></tr><tr><td>152</td><td>CashOrderQty</td><td>QTY</td><td>N</td><td>OrderQty specified in the quote asset units.</td></tr><tr><td>847</td><td>TargetStrategy</td><td>INT</td><td>N</td><td><code>TargetStrategy (847)</code> from the order placement request.</td></tr><tr><td>7940</td><td>StrategyID</td><td>INT</td><td>N</td><td><code>StrategyID (7940)</code> from the order placement request.</td></tr><tr><td>25001</td><td>SelfTradePreventionMode</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>1</code> - NONE <br><br> <code>2</code> - EXPIRE_TAKER <br><br> <code>3</code> - EXPIRE_MAKER <br><br><code>4</code> - EXPIRE_BOTH  <br><br> <code>5</code> - DECREMENT  <br> <code>6</code> - TRANSFER</td></tr><tr><td>150</td><td>ExecType</td><td>CHAR</td><td>Y</td><td><strong>Note:</strong> Field <code>PreventedMatchID(25024)</code> will be present if order has expired due to <code>SelfTradePreventionMode(25013)</code> <br><br> Possible values: <br><br> <code>0</code> - NEW <br><br> <code>4</code> - CANCELED <br><br> <code>5</code> - REPLACED <br><br> <code>8</code> - REJECTED <br><br> <code>F</code> - TRADE <br><br><code>C</code> - EXPIRED</td></tr><tr><td>14</td><td>CumQty</td><td>QTY</td><td>Y</td><td>Total number of base asset traded on this order.</td></tr><tr><td>151</td><td>LeavesQty</td><td>QTY</td><td>N</td><td>Quantity remaining for further execution.</td></tr><tr><td>25017</td><td>CumQuoteQty</td><td>QTY</td><td>N</td><td>Total number of quote asset traded on this order.</td></tr><tr><td>1057</td><td>AggressorIndicator</td><td>BOOLEAN</td><td>N</td><td>Appears on trade execution reports. <br><br>Indicates whether the order was a taker in the trade.</td></tr><tr><td>1003</td><td>TradeID</td><td>STRING</td><td>N</td><td>Appears on trade execution reports.</td></tr><tr><td>31</td><td>LastPx</td><td>PRICE</td><td>N</td><td>The price of the last execution.</td></tr><tr><td>32</td><td>LastQty</td><td>QTY</td><td>Y</td><td>The quantity of the last execution.</td></tr><tr><td>39</td><td>OrdStatus</td><td>CHAR</td><td>Y</td><td>Possible values: <br><br> <code>0</code> - NEW <br><br> <code>1</code> - PARTIALLY_FILLED <br><br> <code>2</code> - FILLED <br><br> <code>4</code> - CANCELED <code>6</code> - PENDING_CANCEL<br><br> <code>8</code> - REJECTED <br><br> <code>A</code> - PENDING_NEW <br><br> <code>C</code> - EXPIRED <br><br> Note that FIX does not support <code>EXPIRED_IN_MATCH</code> status, and get converted to <code>EXPIRED</code> in FIX.</td></tr><tr><td>70</td><td>AllocID</td><td>INT</td><td>N</td><td>Allocation ID as assigned by the exchange.</td></tr><tr><td>574</td><td>MatchType</td><td>INT</td><td>N</td><td>Possible values:<br><br><code>1</code> - ONE_PARTY_TRADE_REPORT<br><br><code>4</code> - AUTO_MATCH</td></tr><tr><td>25021</td><td>WorkingFloor</td><td>INT</td><td>N</td><td>Appears for orders that potentially have allocations.</td></tr><tr><td>25022</td><td>TrailingTime</td><td>UTCTIMESTAMP</td><td>N</td><td>Appears only for trailing stop orders.</td></tr><tr><td>636</td><td>WorkingIndicator</td><td>BOOLEAN</td><td>N</td><td>Set to <code>Y</code> when this order enters order book.</td></tr><tr><td>25023</td><td>WorkingTime</td><td>UTCTIMESTAMP</td><td>N</td><td>When this order appeared on the order book.</td></tr><tr><td>25024</td><td>PreventedMatchID</td><td>INT</td><td>N</td><td>Appears only for orders that expired due to STP.</td></tr><tr><td>25025</td><td>PreventedExecutionPrice</td><td>PRICE</td><td>N</td><td>Appears only for orders that expired due to STP.</td></tr><tr><td>25026</td><td>PreventedExecutionQty</td><td>QTY</td><td>N</td><td>Appears only for orders that expired due to STP.</td></tr><tr><td>25027</td><td>TradeGroupID</td><td>INT</td><td>N</td><td>Appears only for orders that expired due to STP.</td></tr><tr><td>25028</td><td>CounterSymbol</td><td>STRING</td><td>N</td><td>Appears only for orders that expired due to STP.</td></tr><tr><td>25029</td><td>CounterOrderID</td><td>INT</td><td>N</td><td>Appears only for orders that expired due to STP.</td></tr><tr><td>25030</td><td>PreventedQty</td><td>QTY</td><td>N</td><td>Appears only for orders that expired due to STP.</td></tr><tr><td>25031</td><td>LastPreventedQty</td><td>QTY</td><td>N</td><td>Appears only for orders that expired due to STP.</td></tr><tr><td>25032</td><td>SOR</td><td>BOOLEAN</td><td>N</td><td>Appears for orders that used SOR.</td></tr><tr><td>25016</td><td>ErrorCode</td><td>INT</td><td>N</td><td>API error code (see <a href="/docs/binance-spot-api-docs/testnet/errors">Error Codes</a>).</td></tr><tr><td>58</td><td>Text</td><td>STRING</td><td>N</td><td>Human-readable error message.</td></tr><tr><td>136</td><td>NoMiscFees</td><td>NUMINGROUP</td><td>N</td><td>Number of repeating groups of miscellaneous fees.</td></tr><tr><td>=&gt;137</td><td>MiscFeeAmt</td><td>QTY</td><td>Y</td><td>Amount of fees denominated in <code>MiscFeeCurr(138)</code> asset</td></tr><tr><td>=&gt;138</td><td>MiscFeeCurr</td><td>STRING</td><td>Y</td><td>Currency of miscellaneous fee.</td></tr><tr><td>=&gt;139</td><td>MiscFeeType</td><td>INT</td><td>Y</td><td>Possible values: <br><br><code>4</code> - EXCHANGE_FEES</td></tr><tr><td>1100</td><td>TriggerType</td><td>CHAR</td><td>N</td><td>Possible values: <br><br><code>4</code> - PRICE_MOVEMENT</td></tr><tr><td>1101</td><td>TriggerAction</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>1</code> - ACTIVATE</td></tr><tr><td>1102</td><td>TriggerPrice</td><td>PRICE</td><td>N</td><td>Activation price for contingent orders. See <a href="/docs/binance-spot-api-docs/testnet/fix-api#ordertype">table</a></td></tr><tr><td>1107</td><td>TriggerPriceType</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>2</code> - LAST_TRADE</td></tr><tr><td>1109</td><td>TriggerPriceDirection</td><td>CHAR</td><td>N</td><td>Used to differentiate between StopLoss and TakeProfit orders. See <a href="/docs/binance-spot-api-docs/testnet/fix-api#ordertype">table</a>.<br><br>Possible values: <br><br> <code>U</code> - TRIGGER_IF_THE_PRICE_OF_THE_SPECIFIED_TYPE_GOES_UP_TO_OR_THROUGH_THE_SPECIFIED_TRIGGER_PRICE <br><br> <code>D</code> - TRIGGER_IF_THE_PRICE_OF_THE_SPECIFIED_TYPE_GOES_DOWN_TO_OR_THROUGH_THE_SPECIFIED_TRIGGER_PRICE</td></tr><tr><td>25009</td><td>TriggerTrailingDeltaBips</td><td>INT</td><td>N</td><td>Appears only for trailing stop orders.</td></tr><tr><td>211</td><td>PegOffsetValue</td><td>FLOAT</td><td>N</td><td>Amount added to the peg in the context of the PegOffsetType</td></tr><tr><td>1094</td><td>PegPriceType</td><td>CHAR</td><td>N</td><td>Defines the type of peg <br> Possible values: <br> <code>4</code> - MARKET_PEG <br> <code>5</code> - PRIMARY_PEG</td></tr><tr><td>835</td><td>PegMoveType</td><td>CHAR</td><td>N</td><td>Describes whether peg is fixed or floats. Required for Pegged Orders and must be set to <code>1</code> (FIXED)</td></tr><tr><td>836</td><td>PegOffsetType</td><td>CHAR</td><td>N</td><td>Type of price peg offset. <br> Possible values: <br><br> <code>3</code>  - PRICE_TIER</td></tr><tr><td>839</td><td>PeggedPrice</td><td>PRICE</td><td>N</td><td>Current price the order is pegged at</td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=330|35=8|34=2|49=SPOT|52=20240611-09:01:46.228950|56=qNXO12fH|11=1718096506197867067|14=0.00000000|17=144|32=0.00000000|37=76|38=5.00000000|39=0|40=2|44=10.00000000|54=1|55=LTCBNB|59=4|60=20240611-09:01:46.228000|150=0|151=5.00000000|636=Y|1057=Y|25001=1|25017=0.00000000|25018=20240611-09:01:46.228000|25023=20240611-09:01:46.228000|10=095|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><a id="ordercancelrequest"></a></p>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="ordercancelrequest-f">OrderCancelRequest <code>&lt;F&gt;</code><a class="hash-link" aria-label="Direct link to ordercancelrequest-f" title="Direct link to ordercancelrequest-f" href="/docs/binance-spot-api-docs/testnet/fix-api#ordercancelrequest-f">​</a></h4>
<p>Sent by the client to cancel an order or an order list.</p>
<ul>
<li>To cancel an order either <code>OrderID (11)</code> or <code>OrigClOrdID (41)</code> are required.
<ul>
<li>If both <code>OrderID (37)</code> and <code>OrigClOrdID (41)</code> are provided, the <code>OrderID</code> is searched first, then the <code>OrigClOrdID</code> from that result is checked against that order. If both conditions are not met the request will be rejected.</li>
</ul>
</li>
<li>To cancel an order list either <code>ListID (66)</code> or <code>OrigClListID (25015)</code> are required.
<ul>
<li>If both <code>ListID (66)</code> and <code>OrigClListID (25015)</code> are provided, the <code>ListID</code> is searched first, then the <code>OrigClListID</code> from that result is checked against that order. If both conditions are not met the request will be rejected.</li>
</ul>
</li>
</ul>
<p>If the canceled order is part of an order list, the entire list will be canceled.</p>
<p><strong>Note:</strong></p>
<ul>
<li>The performance for canceling an order (single cancel or as part of a cancel-replace) is always better when only <code>orderId</code> is sent. Sending <code>origClientOrderId</code> or both <code>orderId</code> + <code>origClientOrderId</code> will be slower.</li>
</ul>





























































<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>11</td><td>ClOrdID</td><td>STRING</td><td>Y</td><td><code>ClOrdID</code> of this request.</td></tr><tr><td>41</td><td>OrigClOrdID</td><td>STRING</td><td>N</td><td><code>ClOrdID (11)</code> of the order to cancel.</td></tr><tr><td>37</td><td>OrderID</td><td>INT</td><td>N</td><td><code>OrderID (37)</code> of the order to cancel.</td></tr><tr><td>25015</td><td>OrigClListID</td><td>STRING</td><td>N</td><td><code>ClListID (25014)</code> of the order list to cancel.</td></tr><tr><td>66</td><td>ListID</td><td>STRING</td><td>N</td><td><code>ListID (66)</code> of the order list to cancel.</td></tr><tr><td>55</td><td>Symbol</td><td>STRING</td><td>Y</td><td>Symbol on which to cancel order.</td></tr><tr><td>25002</td><td>CancelRestrictions</td><td>INT</td><td>N</td><td>Restrictions on the cancel. Possible values: <br><br> <code>1</code> - ONLY_NEW <br><br> <code>2</code> - ONLY_PARTIALLY_FILLED</td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=93|35=F|34=2|49=ieBwvCKy|52=20240613-01:11:13.784|56=SPOT|11=1718241073695674483|37=2|55=LTCBNB|10=210|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><strong>Response:</strong></p>
<ul>
<li><a href="/docs/binance-spot-api-docs/testnet/fix-api#executionreport">ExecutionReport<code>&lt;8&gt;</code></a> with <code>ExecType (150)</code> value <code>CANCELED (4)</code> for each canceled order.</li>
<li><a href="/docs/binance-spot-api-docs/testnet/fix-api#liststatus">ListStatus<code>&lt;N&gt;</code></a> if orders in an order list were canceled.</li>
<li><a href="/docs/binance-spot-api-docs/testnet/fix-api#ordercancelreject">OrderCancelReject<code>&lt;9&gt;</code></a> if cancellation was rejected.</li>
<li><a href="/docs/binance-spot-api-docs/testnet/fix-api#reject">Reject<code>&lt;3&gt;</code></a> if the message is rejected.</li>
</ul>
<p><a id="ordercancelreject"></a></p>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="ordercancelreject-9">OrderCancelReject <code>&lt;9&gt;</code><a class="hash-link" aria-label="Direct link to ordercancelreject-9" title="Direct link to ordercancelreject-9" href="/docs/binance-spot-api-docs/testnet/fix-api#ordercancelreject-9">​</a></h4>
<p>Sent by the server when <a href="/docs/binance-spot-api-docs/testnet/fix-api#ordercancelrequest">OrderCancelRequest<code>&lt;F&gt;</code></a> has failed.</p>


















































































<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>11</td><td>ClOrdID</td><td>STRING</td><td>Y</td><td><code>ClOrdID (11)</code> of the cancel request.</td></tr><tr><td>41</td><td>OrigClOrdID</td><td>STRING</td><td>N</td><td><code>OrigClOrdID (41)</code> from the cancel request.</td></tr><tr><td>37</td><td>OrderID</td><td>INT</td><td>N</td><td><code>OrderID (37)</code>  from the cancel request.</td></tr><tr><td>25015</td><td>OrigClListID</td><td>STRING</td><td>N</td><td><code>OrigClListID (25015)</code> from the cancel request.</td></tr><tr><td>66</td><td>ListID</td><td>STRING</td><td>N</td><td><code>ListID (66)</code> from the cancel request.</td></tr><tr><td>55</td><td>Symbol</td><td>STRING</td><td>Y</td><td><code>Symbol (55)</code> from the cancel request.</td></tr><tr><td>25002</td><td>CancelRestrictions</td><td>INT</td><td>N</td><td><code>CancelRestrictions (25002)</code> from the cancel request.</td></tr><tr><td>434</td><td>CxlRejResponseTo</td><td>CHAR</td><td>Y</td><td>Type of request that this OrderCancelReject<code>&lt;9&gt;</code> is in response to. <br><br> Possible values: <br><br> <code>1</code> - ORDER_CANCEL_REQUEST</td></tr><tr><td>25016</td><td>ErrorCode</td><td>INT</td><td>Y</td><td>API error code (see <a href="/docs/binance-spot-api-docs/testnet/errors">Error Codes</a>).</td></tr><tr><td>58</td><td>Text</td><td>STRING</td><td>Y</td><td>Human-readable error message.</td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=137|35=9|34=2|49=SPOT|52=20240613-01:12:41.320869|56=OlZb8ht8|11=1718241161272843932|37=2|55=LTCBNB|58=Unknown order sent.|434=1|25016=-1013|10=087|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><a id="ordercancelrequestandnewordersingle"></a></p>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="ordercancelrequestandnewordersingle-xcn">OrderCancelRequestAndNewOrderSingle <code>&lt;XCN&gt;</code><a class="hash-link" aria-label="Direct link to ordercancelrequestandnewordersingle-xcn" title="Direct link to ordercancelrequestandnewordersingle-xcn" href="/docs/binance-spot-api-docs/testnet/fix-api#ordercancelrequestandnewordersingle-xcn">​</a></h4>
<p>Sent by the client to cancel an order and submit a new one for execution.</p>
<ul>
<li>To cancel an order either <code>OrderID (11)</code> or <code>OrigClOrdId (41)</code> are required.</li>
<li>If both <code>OrderID (37)</code> and <code>OrigClOrdID (41)</code> are provided, the <code>OrderID</code> is searched first, then the <code>OrigClOrdID</code> from that result is checked against that order. If both conditions are not met the request will be rejected.</li>
</ul>
<p>Filters and Order Count are evaluated before the processing of the cancellation and order placement occurs.</p>
<p>A new order that was not attempted (i.e. when <code>newOrderResult: NOT_ATTEMPTED</code>), will still increase the unfilled order count by 1.</p>
<p><strong>Unfilled Order Count:</strong> 1</p>
<p>Please refer to <a href="/docs/binance-spot-api-docs/testnet/fix-api#ordertype">Supported Order Types</a> for supported field combinations when describing the new order.</p>
<blockquote>
<p>[!NOTE]
Cancel is always processed first. Then immediately after that the new order is submitted.</p>
</blockquote>























































































































































































































<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>25033</td><td>OrderCancelRequestAndNewOrderSingleMode</td><td>INT</td><td>Y</td><td>What action should be taken if cancel fails. <br><br> Possible values: <br><br> <code>1</code> - STOP_ON_FAILURE <br><br> <code>2</code> - ALLOW_FAILURE</td></tr><tr><td>25038</td><td>OrderRateLimitExceededMode</td><td>INT</td><td>N</td><td>What should be done to the cancellation request if you exceed the unfilled order rate limit. <br><br>Possible values: <code>1</code> - DO_NOTHING <br><br> <code>2</code> - CANCEL_ONLY</td></tr><tr><td>37</td><td>OrderID</td><td>INT</td><td>N</td><td><code>OrderID</code> of the order to cancel.</td></tr><tr><td>25034</td><td>CancelClOrdID</td><td>STRING</td><td>N</td><td><code>ClOrdID</code> of the cancel.</td></tr><tr><td>41</td><td>OrigClOrdID</td><td>STRING</td><td>N</td><td><code>ClOrdID</code> of the order to cancel.</td></tr><tr><td>11</td><td>ClOrdID</td><td>STRING</td><td>Y</td><td><code>ClOrdID</code> to be assigned to the new order.</td></tr><tr><td>25002</td><td>CancelRestrictions</td><td>INT</td><td>N</td><td>Restrictions on the cancel. Possible values: <br><br> <code>1</code> - ONLY_NEW <br><br> <code>2</code> - ONLY_PARTIALLY_FILLED</td></tr><tr><td>38</td><td>OrderQty</td><td>QTY</td><td>N</td><td>Quantity of the new order</td></tr><tr><td>40</td><td>OrdType</td><td>CHAR</td><td>Y</td><td>See the <a href="/docs/binance-spot-api-docs/testnet/fix-api#ordertype">table</a> to understand supported order types and the required fields to use them.<br><br>Possible values: <br><br> <code>1</code> - MARKET <br><br> <code>2</code> - LIMIT <br><br> <code>3</code> - STOP <br><br> <code>4</code> - STOP_LIMIT <br><br> <code>P</code> - PEGGED</td></tr><tr><td>18</td><td>ExecInst</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>6</code> - PARTICIPATE_DONT_INITIATE</td></tr><tr><td>44</td><td>Price</td><td>PRICE</td><td>N</td><td>Price of the new order</td></tr><tr><td>54</td><td>Side</td><td>CHAR</td><td>Y</td><td>Side of the order.<br><br>Possible values: <br><br> <code>1</code> - BUY <br><br> <code>2</code> - SELL</td></tr><tr><td>55</td><td>Symbol</td><td>STRING</td><td>Y</td><td>Symbol to cancel and place the order on.</td></tr><tr><td>59</td><td>TimeInForce</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>1</code> - GOOD_TILL_CANCEL <br><br> <code>3</code> - IMMEDIATE_OR_CANCEL <br><br> <code>4</code> - FILL_OR_KILL</td></tr><tr><td>111</td><td>MaxFloor</td><td>QTY</td><td>N</td><td>Used for iceberg orders, this specifies the visible quantity of the order on the book.</td></tr><tr><td>152</td><td>CashOrderQty</td><td>QTY</td><td>N</td><td>Quantity of the order specified in the quote asset units, for reverse market orders.</td></tr><tr><td>847</td><td>TargetStrategy</td><td>INT</td><td>N</td><td>The value cannot be less than <code>1000000</code>.</td></tr><tr><td>7940</td><td>StrategyID</td><td>INT</td><td>N</td><td></td></tr><tr><td>25001</td><td>SelfTradePreventionMode</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>1</code> - NONE <br><br> <code>2</code> - EXPIRE_TAKER <br><br> <code>3</code> - EXPIRE_MAKER <br><br> <code>4</code> - EXPIRE_BOTH <br><br> <code>5</code> - DECREMENT  <br> <code>6</code> - TRANSFER</td></tr><tr><td>211</td><td>PegOffsetValue</td><td>FLOAT</td><td>N</td><td>Amount added to the peg in the context of the PegOffsetType</td></tr><tr><td>1094</td><td>PegPriceType</td><td>CHAR</td><td>N</td><td>Defines the type of peg <br> Possible values: <br> <code>4</code> - MARKET_PEG <br> <code>5</code> - PRIMARY_PEG</td></tr><tr><td>835</td><td>PegMoveType</td><td>CHAR</td><td>N</td><td>Describes whether peg is fixed or floats. Required for Pegged Orders and must be set to <code>1</code> (FIXED)</td></tr><tr><td>836</td><td>PegOffsetType</td><td>CHAR</td><td>N</td><td>Type of price peg offset. <br> Possible values: <br><br> <code>3</code>  - PRICE_TIER</td></tr><tr><td>1100</td><td>TriggerType</td><td>CHAR</td><td>N</td><td>Possible values: <code>4</code> - PRICE_MOVEMENT</td></tr><tr><td>1101</td><td>TriggerAction</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>1</code> - ACTIVATE</td></tr><tr><td>1102</td><td>TriggerPrice</td><td>PRICE</td><td>N</td><td>Activation price for contingent orders. See <a href="/docs/binance-spot-api-docs/testnet/fix-api#ordertype">table</a></td></tr><tr><td>1107</td><td>TriggerPriceType</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>2</code> - LAST_TRADE</td></tr><tr><td>1109</td><td>TriggerPriceDirection</td><td>CHAR</td><td>N</td><td>Used to differentiate between StopLoss and TakeProfit orders. See <a href="/docs/binance-spot-api-docs/testnet/fix-api#ordertype">table</a>.<br><br>Possible values: <br><br> <code>U</code> - TRIGGER_IF_THE_PRICE_OF_THE_SPECIFIED_TYPE_GOES_UP_TO_OR_THROUGH_THE_SPECIFIED_TRIGGER_PRICE <br><br> <code>D</code> - TRIGGER_IF_THE_PRICE_OF_THE_SPECIFIED_TYPE_GOES_DOWN_TO_OR_THROUGH_THE_SPECIFIED_TRIGGER_PRICE</td></tr><tr><td>25009</td><td>TriggerTrailingDeltaBips</td><td>INT</td><td>N</td><td>Provide to create trailing orders.</td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=160|35=XCN|34=2|49=JS8iiXK6|52=20240613-02:31:53.753|56=SPOT|11=1718245913721036458|37=8|38=5|40=2|44=4|54=1|55=LTCBNB|59=1|111=1|25033=1|25034=1718245913721036819|10=229|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><strong>Response:</strong></p>
<ul>
<li><a href="/docs/binance-spot-api-docs/testnet/fix-api#executionreport">ExecutionReport<code>&lt;8&gt;</code></a> with <code>ExecType (150)</code> value <code>CANCELED (4)</code> for the canceled order.</li>
<li><a href="/docs/binance-spot-api-docs/testnet/fix-api#executionreport">ExecutionReport<code>&lt;8&gt;</code></a> with <code>ExecType (150)</code> value <code>NEW (0)</code> for the new order.</li>
<li><a href="/docs/binance-spot-api-docs/testnet/fix-api#executionreport">ExecutionReport<code>&lt;8&gt;</code></a> with <code>ExecType (150)</code> value <code>REJECTED (8)</code> if the new order was rejected.</li>
<li><a href="/docs/binance-spot-api-docs/testnet/fix-api#ordercancelreject">OrderCancelReject<code>&lt;9&gt;</code></a> if the cancellation was rejected.</li>
<li><a href="/docs/binance-spot-api-docs/testnet/fix-api#reject">Reject<code>&lt;3&gt;</code></a> if the message is rejected.</li>
</ul>
<p><a id="ordermasscancelrequest"></a></p>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="ordermasscancelrequest-q">OrderMassCancelRequest <code>&lt;q&gt;</code><a class="hash-link" aria-label="Direct link to ordermasscancelrequest-q" title="Direct link to ordermasscancelrequest-q" href="/docs/binance-spot-api-docs/testnet/fix-api#ordermasscancelrequest-q">​</a></h4>
<p>Sent by the client to cancel all open orders on a symbol.</p>
<blockquote>
<p>[!NOTE]
All orders of the account will be canceled, including those placed in different connections.</p>
</blockquote>

































<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>11</td><td>ClOrdID</td><td>STRING</td><td>Y</td><td><code>ClOrdId</code> of this mass cancel request.</td></tr><tr><td>55</td><td>Symbol</td><td>STRING</td><td>Y</td><td>Symbol on which to cancel orders.</td></tr><tr><td>530</td><td>MassCancelRequestType</td><td>CHAR</td><td>Y</td><td>Possible values: <br><br> <code>1</code> - CANCEL_SYMBOL_ORDERS</td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=95|35=q|34=2|49=dpYPesqv|52=20240613-01:24:36.948|56=SPOT|11=1718241876901971671|55=BTCUSDT|530=1|10=243|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><strong>Responses:</strong></p>
<ul>
<li><a href="/docs/binance-spot-api-docs/testnet/fix-api#executionreport">ExecutionReport<code>&lt;8&gt;</code></a> with <code>ExecType (150)</code> value <code>CANCELED (4)</code> for the every order canceled.</li>
<li><a href="/docs/binance-spot-api-docs/testnet/fix-api#ordermasscancelreport">OrderMassCancelReport<code>&lt;r&gt;</code></a> with <code>MassCancelResponse (531)</code> field indicating whether the message is accepted or rejected.</li>
<li><a href="/docs/binance-spot-api-docs/testnet/fix-api#reject">Reject<code>&lt;3&gt;</code></a> if the message is rejected.</li>
</ul>
<p><a id="ordermasscancelreport"></a></p>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="ordermasscancelreport-r">OrderMassCancelReport <code>&lt;r&gt;</code><a class="hash-link" aria-label="Direct link to ordermasscancelreport-r" title="Direct link to ordermasscancelreport-r" href="/docs/binance-spot-api-docs/testnet/fix-api#ordermasscancelreport-r">​</a></h4>
<p>Sent by the server in response to <a href="/docs/binance-spot-api-docs/testnet/fix-api#ordermasscancelrequest">OrderMassCancelRequest<code>&lt;q&gt;</code></a>.</p>




































































<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>55</td><td>Symbol</td><td>STRING</td><td>Y</td><td><code>Symbol (55)</code> from the cancel request.</td></tr><tr><td>11</td><td>ClOrdID</td><td>STRING</td><td>Y</td><td><code>ClOrdID (11)</code> of the cancel request.</td></tr><tr><td>530</td><td>MassCancelRequestType</td><td>CHAR</td><td>Y</td><td><code>MassCancelRequestType (530)</code> from the cancel request.</td></tr><tr><td>531</td><td>MassCancelResponse</td><td>CHAR</td><td>Y</td><td>Possible values: <br><br> <code>0</code> - CANCEL_REQUEST_REJECTED <br><br> <code>1</code> - CANCEL_SYMBOL_ORDERS</td></tr><tr><td>532</td><td>MassCancelRejectReason</td><td>INT</td><td>N</td><td>Possible values: <br><br> <code>99</code> - OTHER</td></tr><tr><td>533</td><td>TotalAffectedOrders</td><td>INT</td><td>N</td><td>How many orders were canceled.</td></tr><tr><td>25016</td><td>ErrorCode</td><td>INT</td><td>N</td><td>API error code (see <a href="/docs/binance-spot-api-docs/testnet/errors">Error Codes</a>).</td></tr><tr><td>58</td><td>Text</td><td>STRING</td><td>N</td><td>Human-readable error message.</td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=109|35=r|34=2|49=SPOT|52=20240613-01:24:36.949763|56=dpYPesqv|11=1718241876901971671|55=LTCBNB|530=1|531=1|533=5|10=083|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><a id="neworderlist"></a></p>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="neworderlist-e">NewOrderList <code>&lt;E&gt;</code><a class="hash-link" aria-label="Direct link to neworderlist-e" title="Direct link to neworderlist-e" href="/docs/binance-spot-api-docs/testnet/fix-api#neworderlist-e">​</a></h4>
<p>Sent by the client to submit a list of orders for execution.</p>
<ul>
<li>OCOs or OTOs add <strong>2 orders</strong> to the <code>EXCHANGE_MAX_ORDERS</code> filter and the <code>MAX_NUM_ORDERS</code> filter.</li>
<li>OTOCOs add <strong>3 orders</strong> to the <code>EXCHANGE_MAX_NUM_ORDERS</code> filter and <code>MAX_NUM_ORDERS</code> filter.</li>
</ul>
<p><strong>Unfilled Order Count:</strong></p>
<ul>
<li>OCO: 2</li>
<li>OTO: 2</li>
<li>OTOCO: 3</li>
</ul>
<p>Orders in an order list are contingent on one another.
Please refer to <a href="/docs/binance-spot-api-docs/testnet/fix-api#order-list-types">Supported Order List Types</a> for supported order types and triggering instructions.</p>





































































































































































































































<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>25014</td><td>ClListID</td><td>STRING</td><td>Y</td><td><code>ClListID</code> to be assigned to the order list.</td></tr><tr><td>1385</td><td>ContingencyType</td><td>INT</td><td>N</td><td>Possible values: <br><br> <code>1</code> - ONE_CANCELS_THE_OTHER <br><br> <code>2</code> - ONE_TRIGGERS_THE_OTHER</td></tr><tr><td>25046</td><td>OPO</td><td>BOOLEAN</td><td>N</td><td>Sets this order list as an <a href="/docs/binance-spot-api-docs/faqs/opo">OPO</a> when set to <code>true</code>.</td></tr><tr><td>73</td><td>NoOrders</td><td>NUMINGROUP</td><td>N</td><td>The length of the array for Orders. Only 2 or 3 are allowed.</td></tr><tr><td>=&gt;11</td><td>ClOrdID</td><td>STRING</td><td>Y</td><td><code>ClOrdID</code> to be assigned to the order</td></tr><tr><td>=&gt;38</td><td>OrderQty</td><td>QTY</td><td>N</td><td>Quantity of the order</td></tr><tr><td>=&gt;40</td><td>OrdType</td><td>CHAR</td><td>Y</td><td>See the <a href="/docs/binance-spot-api-docs/testnet/fix-api#ordertype">table</a> to understand supported order types and the required fields to use them.<br><br>Possible values: <br><br> <code>1</code> - MARKET <br><br> <code>2</code> - LIMIT <br><br> <code>3</code> - STOP <br><br> <code>4</code> - STOP_LIMIT  <br><br> <code>P</code>- PEGGED</td></tr><tr><td>=&gt;18</td><td>ExecInst</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>6</code> - PARTICIPATE_DONT_INITIATE</td></tr><tr><td>=&gt;44</td><td>Price</td><td>PRICE</td><td>N</td><td>Price of the order</td></tr><tr><td>=&gt;54</td><td>Side</td><td>CHAR</td><td>Y</td><td>Side of the order. Possible values: <br><br> <code>1</code> - BUY <br><br> <code>2</code> - SELL</td></tr><tr><td>=&gt;55</td><td>Symbol</td><td>STRING</td><td>Y</td><td>Symbol to place the order on.</td></tr><tr><td>=&gt;59</td><td>TimeInForce</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>1</code> - GOOD_TILL_CANCEL <br><br> <code>3</code> - IMMEDIATE_OR_CANCEL <br><br> <code>4</code> - FILL_OR_KILL</td></tr><tr><td>=&gt;111</td><td>MaxFloor</td><td>QTY</td><td>N</td><td>Used for iceberg orders, this specifies the visible quantity of the order on the book.</td></tr><tr><td>=&gt;152</td><td>CashOrderQty</td><td>QTY</td><td>N</td><td>Quantity of the order specified in the quote asset units, for reverse market orders.</td></tr><tr><td>=&gt;847</td><td>TargetStrategy</td><td>INT</td><td>N</td><td>The value cannot be less than <code>1000000</code>.</td></tr><tr><td>=&gt;7940</td><td>StrategyID</td><td>INT</td><td>N</td><td></td></tr><tr><td>=&gt;25001</td><td>SelfTradePreventionMode</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>1</code> - NONE <br><br><code>2</code> - EXPIRE_TAKER <br><br> <code>3</code> - EXPIRE_MAKER <br><br> <code>4</code> - EXPIRE_BOTH <br><br> <code>5</code> - DECREMENT  <br> <code>6</code> - TRANSFER</td></tr><tr><td>=&gt; 211</td><td>PegOffsetValue</td><td>FLOAT</td><td>N</td><td>Amount added to the peg in the context of the PegOffsetType</td></tr><tr><td>=&gt;1094</td><td>PegPriceType</td><td>CHAR</td><td>N</td><td>Defines the type of peg <br> Possible values: <br> <code>4</code> - MARKET_PEG <br> <code>5</code> - PRIMARY_PEG</td></tr><tr><td>=&gt;835</td><td>PegMoveType</td><td>CHAR</td><td>N</td><td>Describes whether peg is fixed or floats. Required for Pegged Orders and must be set to <code>1</code> (FIXED)</td></tr><tr><td>=&gt;836</td><td>PegOffsetType</td><td>CHAR</td><td>N</td><td>Type of price peg offset. <br> Possible values: <br><br> <code>3</code>  - PRICE_TIER</td></tr><tr><td>=&gt;1100</td><td>TriggerType</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>4</code> - PRICE_MOVEMENT</td></tr><tr><td>=&gt;1101</td><td>TriggerAction</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>1</code> - ACTIVATE</td></tr><tr><td>=&gt;1102</td><td>TriggerPrice</td><td>PRICE</td><td>N</td><td>Activation price for contingent orders. See <a href="/docs/binance-spot-api-docs/testnet/fix-api#ordertype">table</a></td></tr><tr><td>=&gt;1107</td><td>TriggerPriceType</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>2</code> - LAST_TRADE</td></tr><tr><td>=&gt;1109</td><td>TriggerPriceDirection</td><td>CHAR</td><td>N</td><td>Used to differentiate between StopLoss and TakeProfit orders. See <a href="/docs/binance-spot-api-docs/testnet/fix-api#ordertype">table</a>.<br><br>Possible values: <br><br> <code>U</code> - TRIGGER_IF_THE_PRICE_OF_THE_SPECIFIED_TYPE_GOES_UP_TO_OR_THROUGH_THE_SPECIFIED_TRIGGER_PRICE <br><br> <code>D</code> - TRIGGER_IF_THE_PRICE_OF_THE_SPECIFIED_TYPE_GOES_DOWN_TO_OR_THROUGH_THE_SPECIFIED_TRIGGER_PRICE</td></tr><tr><td>=&gt;25009</td><td>TriggerTrailingDeltaBips</td><td>INT</td><td>N</td><td>Provide to create trailing orders.</td></tr><tr><td>=&gt;25010</td><td>NoListTriggeringInstructions</td><td>NUMINGROUP</td><td>N</td><td>The length of the array for ListTriggeringInstructions.</td></tr><tr><td>==&gt;25011</td><td>ListTriggerType</td><td>CHAR</td><td>N</td><td>What needs to happen to the order pointed to by ListTriggerTriggerIndex in order for the action to take place. <br><br> Possible values: <br><br> <code>1</code> - ACTIVATED <br><br> <code>2</code> - PARTIALLY_FILLED <br><br> <code>3</code> - FILLED</td></tr><tr><td>==&gt;25012</td><td>ListTriggerTriggerIndex</td><td>INT</td><td>N</td><td>Index of the trigger order: 0-indexed.</td></tr><tr><td>==&gt;25013</td><td>ListTriggerAction</td><td>CHAR</td><td>N</td><td>Action to take place on this order after the ListTriggerType has been fulfilled. <br><br> Possible values: <br><br> <code>1</code> - RELEASE <br><br> <code>2</code> - CANCEL</td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=236|35=E|34=2|49=Eg13pOvN|52=20240607-02:19:07.836|56=SPOT|73=2|11=w1717726747805308656|55=LTCBNB|54=2|38=1|40=2|44=0.25|59=1|11=p1717726747805308656|55=LTCBNB|54=2|38=1|40=1|25010=1|25011=3|25012=0|25013=1|1385=2|25014=1717726747805308656|10=171|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><a id="order-list-types"></a></p>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="supported-order-list-types">Supported Order List Types<a class="hash-link" aria-label="Direct link to Supported Order List Types" title="Direct link to Supported Order List Types" href="/docs/binance-spot-api-docs/testnet/fix-api#supported-order-list-types">​</a></h4>
<blockquote>
<p>[!NOTE]
Orders must be specified in the sequence indicated in the <em>Order Names</em> column in the table below.</p>
</blockquote>













































































































<table><thead><tr><th>Order list name</th><th>Contingency Type (1385)</th><th>Order names</th><th>Order sides</th><th>Allowed Binance order types</th><th>List Triggering Instructions</th></tr></thead><tbody><tr><td>OCO</td><td><code>1</code></td><td>1. below order<br><br><br><br>   2. above order</td><td>1. below order=<code>SELL</code><br><br><br><br>  2. above order=<code>SELL</code></td><td>1. below order=<code>STOP_LOSS</code> or <code>STOP_LOSS_LIMIT</code><br><br><br><br> 2. above order=<code>LIMIT_MAKER</code></td><td>1. below order:  <br><br><code>25010=1|25011=2|25012=1|25013=2|</code><br><br><br><br>2. above order:        <br><br><code>25010=1|25011=1|25012=0|25013=2|</code></td></tr><tr><td>OCO</td><td><code>1</code></td><td>1. below order<br><br><br><br>   2. above order</td><td>1. below order=<code>BUY</code> <br><br><br><br>  2. above order=<code>BUY</code></td><td>1. below order=<code>LIMIT_MAKER</code>                   <br><br><br><br> 2. above order=<code>STOP_LOSS</code> or <code>STOP_LOSS_LIMIT</code></td><td>1. below order:  <br><br><code>25010=1|25011=1|25012=1|25013=2|</code><br><br><br><br>2. above order:        <br><br><code>25010=1|25011=2|25012=0|25013=2|</code></td></tr><tr><td>OCO</td><td><code>1</code></td><td>1. below order<br><br><br><br>   2. above order</td><td>1. below order=<code>SELL</code><br><br><br><br>  2. above order=<code>SELL</code></td><td>1. below order=<code>STOP_LOSS</code> or <code>STOP_LOSS_LIMIT</code><br><br><br><br> 2. above order= <code>TAKE_PROFIT</code></td><td>1. below order:  <br><br><code>25010=1|25011=1|25012=1|25013=2|</code><br><br><br><br>2. above order:        <br><br><code>25010=1|25011=1|25012=0|25013=2|</code></td></tr><tr><td>OCO</td><td><code>1</code></td><td>1. below order<br><br><br><br>   2. above order</td><td>1. below order=<code>BUY</code> <br><br><br><br>  2. above order=<code>BUY</code></td><td>1. below order=<code>TAKE_PROFIT</code>                   <br><br><br><br> 2. above order = <code>STOP_LOSS</code> or <code>STOP_LOSS_LIMIT</code></td><td>1. below order:  <br><br><code>25010=1|25011=1|25012=1|25013=2|</code><br><br><br><br>2. above order:        <br><br><code>25010=1|25011=1|25012=0|25013=2|</code></td></tr><tr><td>OTO</td><td><code>2</code></td><td>1. working order<br><br><br><br> 2. pending order</td><td>1. working order=<code>SELL</code> or <code>BUY</code><br><br><br><br> 2. pending order=<code>SELL</code> or <code>BUY</code></td><td>1. working order=<code>LIMIT</code> or <code>LIMIT_MAKER</code>      <br><br><br><br> 2. pending order=ANY</td><td>1. working order:<br><br>NONE<br><br><br><br>                                                             2. pending order:      <br><br><code>25010=1|25011=3|25012=0|25013=1|</code></td></tr><tr><td>OTOCO</td><td><code>2</code></td><td>1. working order<br><br><br><br> 2. pending below order<br><br><br><br> 3. pending above order</td><td>1. working order=<code>SELL</code> or <code>BUY</code><br><br><br><br> 2. pending below order=<code>SELL</code><br><br><br><br> 3. pending above order=<code>SELL</code></td><td>1. working order=<code>LIMIT</code> or <code>LIMIT_MAKER</code>      <br><br><br><br> 2. pending below order=<code>STOP_LOSS</code> or <code>STOP_LOSS_LIMIT</code><br><br><br><br> 3. pending above order=<code>LIMIT_MAKER</code></td><td>1. working order:<br><br>NONE<br><br><br><br>                                                             2. pending below order:<br><br><code>25010=2|25011=3|25012=0|25013=2|25011=2|25012=2|25013=2|</code><br><br><br><br>3. pending above order:<br><br><code>25010=2|25011=3|25012=0|25013=2|25011=1|25012=1|25013=2|</code></td></tr><tr><td>OTOCO</td><td><code>2</code></td><td>1. working order<br><br><br><br> 2. pending below order<br><br><br><br> 3. pending above order</td><td>1. working order=<code>SELL</code> or <code>BUY</code><br><br><br><br> 2. pending below order=<code>BUY</code><br><br><br><br>  3. pending above order=<code>BUY</code></td><td>1. working order=<code>LIMIT</code> or <code>LIMIT_MAKER</code>      <br><br><br><br> 2. pending below order=<code>LIMIT_MAKER</code>                   <br><br><br><br> 3. pending above order=<code>STOP_LOSS</code> or <code>STOP_LOSS_LIMIT</code></td><td>1. working order:<br><br>NONE<br><br><br><br>                                                             2. pending below order:<br><br><code>25010=2|25011=3|25012=0|25013=2|25011=1|25012=2|25013=2|</code><br><br><br><br>3. pending above order:<br><br><code>25010=2|25011=3|25012=0|25013=2|25011=2|25012=1|25013=2|</code></td></tr><tr><td>OTOCO</td><td><code>2</code></td><td>1. working order<br><br><br><br> 2. pending below order<br><br><br><br> 3. pending above order</td><td>1. working order=<code>SELL</code> or <code>BUY</code><br><br><br><br> 2. pending below order=<code>SELL</code><br><br><br><br> 3. pending above order=<code>SELL</code></td><td>1. working order=<code>LIMIT</code> or <code>LIMIT_MAKER</code>      <br><br><br><br> 2. pending below order=<code>STOP_LOSS</code> or <code>STOP_LOSS_LIMIT</code><br><br><br><br> 3. pending above order=<code>TAKE_PROFIT</code></td><td>1. working order:<br><br>NONE<br><br><br><br>                                                             2. pending below order:<br><br><code>25010=2|25011=3|25012=0|25013=2|25011=1|25012=2|25013=2|</code><br><br><br><br>3. pending above order:<br><br><code>25010=2|25011=3|25012=0|25013=2|25011=1|25012=1|25013=2|</code></td></tr><tr><td>OTOCO</td><td><code>2</code></td><td>1. working order<br><br><br><br> 2. pending below order<br><br><br><br> 3. pending above order</td><td>1. working order=<code>SELL</code> or <code>BUY</code><br><br><br><br> 2. pending below order=<code>BUY</code><br><br><br><br>  3. pending above order=<code>BUY</code></td><td>1. working order=<code>LIMIT</code> or <code>LIMIT_MAKER</code>      <br><br><br><br> 2. pending below order=<code>TAKE_PROFIT</code>                   <br><br><br><br> 3. pending above order=<code>STOP_LOSS</code> or <code>STOP_LOSS_LIMIT</code></td><td>1. working order:<br><br>NONE<br><br><br><br>                                                             2. pending below order:<br><br><code>25010=2|25011=3|25012=0|25013=2|25011=1|25012=2|25013=2|</code><br><br><br><br>3. pending above order:<br><br><code>25010=2|25011=3|25012=0|25013=2|25011=1|25012=1|25013=2|</code></td></tr><tr><td>OPO</td><td><code>2</code></td><td>1. working order<br><br><br><br> 2. pending order</td><td>1. working order=<code>BUY</code><br><br><br><br> 2. pending order=<code>SELL</code></td><td>1. working order=<code>LIMIT</code> or <code>LIMIT_MAKER</code>      <br><br><br><br> 2. pending order=ANY</td><td>1. working order:<br><br>NONE<br><br><br><br>                                                             2. pending order:      <br><br><code>25010=1|25011=3|25012=0|25013=1|</code></td></tr><tr><td>OPOCO</td><td><code>2</code></td><td>1. working order<br><br><br><br> 2. pending below order<br><br><br><br> 3. pending above order</td><td>1. working order=<code>BUY</code><br><br><br><br> 2. pending below order=<code>SELL</code><br><br><br><br> 3. pending above order=<code>SELL</code></td><td>1. working order=<code>LIMIT</code> or <code>LIMIT_MAKER</code>      <br><br><br><br> 2. pending below order=<code>STOP_LOSS</code> or <code>STOP_LOSS_LIMIT</code><br><br><br><br> 3. pending above order=<code>LIMIT_MAKER</code></td><td>1. working order:<br><br>NONE<br><br><br><br>                                                             2. pending below order:<br><br><code>25010=2|25011=3|25012=0|25013=2|25011=2|25012=2|25013=2|</code><br><br><br><br>3. pending above order:<br><br><code>25010=2|25011=3|25012=0|25013=2|25011=1|25012=1|25013=2|</code></td></tr><tr><td>OPOCO</td><td><code>2</code></td><td>1. working order<br><br><br><br> 2. pending below order<br><br><br><br> 3. pending above order</td><td>1. working order=<code>BUY</code><br><br> 2. pending below order=<code>SELL</code><br><br><br><br> 3. pending above order=<code>SELL</code></td><td>1. working order=<code>LIMIT</code> or <code>LIMIT_MAKER</code>      <br><br><br><br> 2. pending below order=<code>STOP_LOSS</code> or <code>STOP_LOSS_LIMIT</code><br><br><br><br> 3. pending above order=<code>TAKE_PROFIT</code> or <code>TAKE_PROFIT_LIMIT</code></td><td>1. working order:<br><br>NONE<br><br><br><br>                                                             2. pending below order:<br><br><code>25010=2|25011=3|25012=0|25013=2|25011=1|25012=2|25013=2|</code><br><br><br><br>3. pending above order:<br><br><code>25010=2|25011=3|25012=0|25013=2|25011=1|25012=1|25013=2|</code></td></tr></tbody></table>
<p><a id="liststatus"></a></p>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="liststatus-n">ListStatus <code>&lt;N&gt;</code><a class="hash-link" aria-label="Direct link to liststatus-n" title="Direct link to liststatus-n" href="/docs/binance-spot-api-docs/testnet/fix-api#liststatus-n">​</a></h4>
<p>Sent by the server whenever an order list state changes.</p>
<blockquote>
<p>[!NOTE]
By default, ListStatus<code>&lt;N&gt;</code> is sent for all order lists of an account, including those submitted in different connections.
Please see <a href="/docs/binance-spot-api-docs/testnet/fix-api#responsemode">Response Mode</a> for other behavior options.</p>
</blockquote>
























































































































































<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>55</td><td>Symbol</td><td>STRING</td><td>N</td><td>Symbol of the order list.</td></tr><tr><td>66</td><td>ListID</td><td>STRING</td><td>N</td><td><code>ListID</code> of the list as assigned by the exchange.</td></tr><tr><td>25014</td><td>ClListID</td><td>STRING</td><td>N</td><td><code>ClListID</code> of the list as assigned on the request.</td></tr><tr><td>25015</td><td>OrigClListID</td><td>STRING</td><td>N</td><td></td></tr><tr><td>1385</td><td>ContingencyType</td><td>INT</td><td>N</td><td>Possible values: <br><br> <code>1</code> - ONE_CANCELS_THE_OTHER <br><br> <code>2</code> - ONE_TRIGGERS_THE_OTHER</td></tr><tr><td>429</td><td>ListStatusType</td><td>INT</td><td>Y</td><td>Possible values: <br><br> <code>2</code> - RESPONSE <br><br><code>4</code> - EXEC_STARTED <br><br> <code>5</code> - ALL_DONE <br><br> <code>100</code> - UPDATED</td></tr><tr><td>431</td><td>ListOrderStatus</td><td>INT</td><td>Y</td><td>Possible values: <br><br> <code>3</code> - EXECUTING <br><br> <code>6</code> - ALL_DONE  <br><br> <code>7</code> - REJECT</td></tr><tr><td>1386</td><td>ListRejectReason</td><td>INT</td><td>N</td><td>Possible values: <br><br> <code>99</code> - OTHER</td></tr><tr><td>103</td><td>OrdRejReason</td><td>INT</td><td>N</td><td>Possible values: <br><br> <code>99</code> - OTHER</td></tr><tr><td>60</td><td>TransactTime</td><td>UTCTIMESTAMP</td><td>N</td><td>Timestamp when this event occurred.</td></tr><tr><td>25016</td><td>ErrorCode</td><td>INT</td><td>N</td><td>API error code (see <a href="/docs/binance-spot-api-docs/testnet/errors">Error Codes</a>).</td></tr><tr><td>58</td><td>Text</td><td>STRING</td><td>N</td><td>Human-readable error message.</td></tr><tr><td>73</td><td>NoOrders</td><td>NUMINGROUP</td><td>N</td><td>The length of the array for Orders.</td></tr><tr><td>=&gt;55</td><td>Symbol</td><td>STRING</td><td>Y</td><td>Symbol of the order.</td></tr><tr><td>=&gt;37</td><td>OrderID</td><td>INT</td><td>Y</td><td><code>OrderID</code> of the order as assigned by the exchange.</td></tr><tr><td>=&gt;11</td><td>ClOrdID</td><td>STRING</td><td>Y</td><td><code>ClOrdID</code> of the order as assigned on the request.</td></tr><tr><td>=&gt;25010</td><td>NoListTriggeringInstructions</td><td>NUMINGROUP</td><td>N</td><td>The length of the array for ListTriggeringInstructions.</td></tr><tr><td>==&gt;25011</td><td>ListTriggerType</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>1</code> - ACTIVATED <br><br> <code>2</code> - PARTIALLY_FILLED <br><br> <code>3</code> - FILLED</td></tr><tr><td>==&gt;25012</td><td>ListTriggerTriggerIndex</td><td>INT</td><td>N</td><td></td></tr><tr><td>==&gt;25013</td><td>ListTriggerAction</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>1</code> - RELEASE <br><br> <code>2</code> - CANCEL</td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=293|35=N|34=2|49=SPOT|52=20240607-02:19:07.837191|56=Eg13pOvN|55=BTCUSDT|60=20240607-02:19:07.836000|66=25|73=2|55=BTCUSDT|37=52|11=w1717726747805308656|55=BTCUSDT|37=53|11=p1717726747805308656|25010=1|25011=3|25012=0|25013=1|429=4|431=3|1385=2|25014=1717726747805308656|25015=1717726747805308656|10=162|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><a id="orderamendkeeppriorityrequest"></a></p>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="orderamendkeeppriorityrequest-xak">OrderAmendKeepPriorityRequest <code>&lt;XAK&gt;</code><a class="hash-link" aria-label="Direct link to orderamendkeeppriorityrequest-xak" title="Direct link to orderamendkeeppriorityrequest-xak" href="/docs/binance-spot-api-docs/testnet/fix-api#orderamendkeeppriorityrequest-xak">​</a></h4>
<p>Sent by the client to reduce the original quantity of their order.</p>
<p>This adds 0 orders to the <code>EXCHANGE_MAX_ORDERS</code> filter and the <code>MAX_NUM_ORDERS</code> filter.</p>
<p><strong>Unfilled Order Count:</strong> 0</p>
<p>Read <a href="/docs/binance-spot-api-docs/testnet/faqs/order_amend_keep_priority.md">Order Amend Keep Priority FAQ</a> to learn more.</p>
<p><strong>Notes:</strong></p>
<ul>
<li>The <code>ClOrdID (11)</code> is not required to be different from the <code>ClOrdID</code> of the order. When the <code>ClOrdID</code> of the request is the same as the <code>ClOrdID</code> of the order being amended, the <code>ClOrdID</code> will remain unchanged.</li>
<li>If both <code>OrderID (37)</code> and <code>OrigClOrdID (41)</code> are provided, the <code>OrderID</code> is searched first, then the <code>OrigClOrdID (41)</code> from that result is checked against that order. If both conditions are not met the request will be rejected.</li>
</ul>















































<table><thead><tr><th style="text-align:left">Tag</th><th style="text-align:left">Name</th><th style="text-align:left">Type</th><th style="text-align:left">Required</th><th>Description</th></tr></thead><tbody><tr><td style="text-align:left">11</td><td style="text-align:left">ClOrdID</td><td style="text-align:left">STRING</td><td style="text-align:left">Y</td><td>The ClOrdID of this request.</td></tr><tr><td style="text-align:left">41</td><td style="text-align:left">OrigClOrdID</td><td style="text-align:left">STRING</td><td style="text-align:left">N</td><td><code>ClOrdID (11)</code> of the order to amend. Either <code>OrigClOrdID (41)</code> or <code>OrderId (37)</code> have to be specified.</td></tr><tr><td style="text-align:left">37</td><td style="text-align:left">OrderID</td><td style="text-align:left">INT</td><td style="text-align:left">N</td><td><code>OrderID (37)</code> of the order to amend. Either <code>OrigClOrdID (41)</code> or <code>OrderId (37)</code> have to be specified.</td></tr><tr><td style="text-align:left">55</td><td style="text-align:left">Symbol</td><td style="text-align:left">STRING</td><td style="text-align:left">Y</td><td>Symbol on which to amend the order.</td></tr><tr><td style="text-align:left">38</td><td style="text-align:left">OrderQty</td><td style="text-align:left">QTY</td><td style="text-align:left">N</td><td>New quantity of the order. Required to be smaller than the original OrderQty of the order.</td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=103|35=XAK|34=2|49=EXAMPLE|52=20250319-12:35:21.087|56=SPOT|11=O2EIAS01742387721086|37=0|38=0.9|55=BTCUSDT|10=254|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><strong>Response:</strong></p>
<ul>
<li><a href="/docs/binance-spot-api-docs/testnet/fix-api#reject">Reject <code>&lt;3&gt;</code></a> if the incoming request is invalid either due to missing required fields, invalid fields, refers to an invalid symbol, or exceeds the message limit.</li>
<li><a href="/docs/binance-spot-api-docs/testnet/fix-api#orderamendreject">OrderAmendReject <code>&lt;XAR&gt;</code></a> if failed due to insufficient order rate limits, pointing to a non-existent order, quantity is invalid, etc.</li>
<li><a href="/docs/binance-spot-api-docs/testnet/fix-api#executionReport">ExecutionReport <code>&lt;8&gt;</code></a> if the request succeeded for amending a single order.</li>
<li><a href="/docs/binance-spot-api-docs/testnet/fix-api#executionReport">ExecutionReport <code>&lt;8&gt;</code></a> + <a href="/docs/binance-spot-api-docs/testnet/fix-api#liststatus">ListStatus <code>&lt;N&gt;</code></a> if the request succeeded for amending an order which is part of an Order list.</li>
</ul>
<p><a id="orderamendreject"></a></p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="orderamendreject-xar">OrderAmendReject <code>&lt;XAR&gt;</code><a class="hash-link" aria-label="Direct link to orderamendreject-xar" title="Direct link to orderamendreject-xar" href="/docs/binance-spot-api-docs/testnet/fix-api#orderamendreject-xar">​</a></h3>
<p>Sent by the server when the OrderAmendKeepPriorityRequest <code>&lt;XAK&gt;</code> has failed.</p>





























































<table><thead><tr><th style="text-align:left">Tag</th><th style="text-align:left">Name</th><th style="text-align:left">Type</th><th style="text-align:left">Required</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">11</td><td style="text-align:left">ClOrdID</td><td style="text-align:left">STRING</td><td style="text-align:left">Y</td><td style="text-align:left"><code>ClOrdId</code> of the amend request.</td></tr><tr><td style="text-align:left">41</td><td style="text-align:left">OrigClOrdID</td><td style="text-align:left">STRING</td><td style="text-align:left">N</td><td style="text-align:left"><code>OrigClOrdId</code> (41) from the amend request.</td></tr><tr><td style="text-align:left">37</td><td style="text-align:left">OrderID</td><td style="text-align:left">INT</td><td style="text-align:left">N</td><td style="text-align:left"><code>OrderId (37)</code> from the amend request.</td></tr><tr><td style="text-align:left">55</td><td style="text-align:left">Symbol</td><td style="text-align:left">STRING</td><td style="text-align:left">Y</td><td style="text-align:left"><code>Symbol (55)</code> from the amend request.</td></tr><tr><td style="text-align:left">38</td><td style="text-align:left">OrderQty</td><td style="text-align:left">QTY</td><td style="text-align:left">Y</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">25016</td><td style="text-align:left">ErrorCode</td><td style="text-align:left">INT</td><td style="text-align:left">Y</td><td style="text-align:left">API error code (see <a href="/docs/binance-spot-api-docs/testnet/errors">Error Codes</a>).</td></tr><tr><td style="text-align:left">58</td><td style="text-align:left">Text</td><td style="text-align:left">STRING</td><td style="text-align:left">Y</td><td style="text-align:left">Human-readable error message.</td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=0000176|35=XAR|49=SPOT|56=OE|34=2|52=20250319-14:27:32.751074|11=1WRGW5J1742394452749|37=0|55=BTCUSDT|38=1.000000|25016=-2038|58=The requested action would change no state; rejecting.|10=235|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="limit-messages">Limit Messages<a class="hash-link" aria-label="Direct link to Limit Messages" title="Direct link to Limit Messages" href="/docs/binance-spot-api-docs/testnet/fix-api#limit-messages">​</a></h3>
<p><a id="limitquery"></a></p>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="limitquery-xlq">LimitQuery <code>&lt;XLQ&gt;</code><a class="hash-link" aria-label="Direct link to limitquery-xlq" title="Direct link to limitquery-xlq" href="/docs/binance-spot-api-docs/testnet/fix-api#limitquery-xlq">​</a></h4>
<p>Sent by the client to query current limits.</p>



















<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>6136</td><td>ReqID</td><td>STRING</td><td>Y</td><td>ID of this request</td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=82|35=XLQ|34=2|49=7buKHZxZ|52=20240614-05:35:35.357|56=SPOT|6136=1718343335357229749|10=170|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><a id="limitresponse"></a></p>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="limitresponse-xlr">LimitResponse <code>&lt;XLR&gt;</code><a class="hash-link" aria-label="Direct link to limitresponse-xlr" title="Direct link to limitresponse-xlr" href="/docs/binance-spot-api-docs/testnet/fix-api#limitresponse-xlr">​</a></h4>
<p>Sent by the server in response to <a href="/docs/binance-spot-api-docs/testnet/fix-api#limitquery">LimitQuery<code>&lt;XLQ&gt;</code></a>.</p>





























































<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>6136</td><td>ReqID</td><td>STRING</td><td>Y</td><td><code>ReqID</code> from the request.</td></tr><tr><td>25003</td><td>NoLimitIndicators</td><td>NUMINGROUP</td><td>Y</td><td>The length of the array for LimitIndicators.</td></tr><tr><td>=&gt;25004</td><td>LimitType</td><td>CHAR</td><td>Y</td><td>Possible values: <br><br> <code>1</code> - ORDER_LIMIT <br><br> <code>2</code> - MESSAGE_LIMIT</td></tr><tr><td>=&gt;25005</td><td>LimitCount</td><td>INT</td><td>Y</td><td>The current use of this limit.</td></tr><tr><td>=&gt;25006</td><td>LimitMax</td><td>INT</td><td>Y</td><td>The maximum allowed for this limit.</td></tr><tr><td>=&gt;25007</td><td>LimitResetInterval</td><td>INT</td><td>N</td><td>How often the limit resets.</td></tr><tr><td>=&gt;25008</td><td>LimitResetIntervalResolution</td><td>CHAR</td><td>N</td><td>Time unit of <code>LimitResetInterval</code>. Possible values: <br><br> <code>s</code> - SECOND <br><br> <code>m</code> - MINUTE <br><br> <code>h</code> - HOUR <br><br> <code>d</code> - DAY</td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=225|35=XLR|34=2|49=SPOT|52=20240614-05:42:42.724057|56=uGnG0ef8|6136=1718343762723730315|25003=3|25004=2|25005=1|25006=1000|25007=10|25008=s|25004=1|25005=0|25006=200|25007=10|25008=s|25004=1|25005=0|25006=200000|25007=1|25008=d|10=241|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="market-data-messages">Market Data Messages<a class="hash-link" aria-label="Direct link to Market Data Messages" title="Direct link to Market Data Messages" href="/docs/binance-spot-api-docs/testnet/fix-api#market-data-messages">​</a></h3>
<blockquote>
<p>[!NOTE]
The messages below can only be used for the FIX Market Data.</p>
</blockquote>
<p><a id="instrumentlistrequest"></a></p>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="instrumentlistrequest-x">InstrumentListRequest <code>&lt;x&gt;</code><a class="hash-link" aria-label="Direct link to instrumentlistrequest-x" title="Direct link to instrumentlistrequest-x" href="/docs/binance-spot-api-docs/testnet/fix-api#instrumentlistrequest-x">​</a></h4>
<p>Sent by the client to query information about instruments.</p>

































<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>320</td><td>InstrumentReqID</td><td>STRING</td><td>Y</td><td>ID of this request</td></tr><tr><td>559</td><td>InstrumentListRequestType</td><td>INT</td><td>Y</td><td>Possible values: <br><br> <code>0</code> - SINGLE_INSTRUMENT <br><br> <code>4</code> - ALL_INSTRUMENTS</td></tr><tr><td>55</td><td>Symbol</td><td>STRING</td><td>N</td><td>Required when the <code>InstrumentListRequestType</code> is set to <code>SINGLE_INSTRUMENT(0)</code></td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=92|35=x|49=BMDWATCH|56=SPOT|34=2|52=20250114-08:46:56.096691|320=BTCUSDT_INFO|559=0|55=BTCUSDT|10=164|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><a id="instrumentlist"></a></p>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="instrumentlist-y">InstrumentList <code>&lt;y&gt;</code><a class="hash-link" aria-label="Direct link to instrumentlist-y" title="Direct link to instrumentlist-y" href="/docs/binance-spot-api-docs/testnet/fix-api#instrumentlist-y">​</a></h4>
<p>Sent by the server in a response to the <a href="/docs/binance-spot-api-docs/testnet/fix-api#instrumentlistrequest">InstrumentListRequest<code>&lt;x&gt;</code></a>.</p>
<blockquote>
<p>[!NOTE]
More detailed symbol information is available through the <a href="https://github.com/binance/binance-spot-api-docs/blob/master/testnet/rest-api/general-endpoints.md#exchange-information" target="_blank" rel="noopener noreferrer">exchangeInfo</a> endpoint.</p>
</blockquote>







































































































<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>320</td><td>InstrumentReqID</td><td>STRING</td><td>Y</td><td><code>InstrumentReqID</code> from the request.</td></tr><tr><td>146</td><td>NoRelatedSym</td><td>NUMINGROUP</td><td>Y</td><td>Number of symbols</td></tr><tr><td>=&gt;55</td><td>Symbol</td><td>STRING</td><td>Y</td><td></td></tr><tr><td>=&gt;15</td><td>Currency</td><td>STRING</td><td>Y</td><td>Quote asset of this symbol</td></tr><tr><td>=&gt;562</td><td>MinTradeVol</td><td>QTY</td><td>N</td><td>Corresponds to the <a href="/docs/binance-spot-api-docs/testnet/filters#lot_size">LOT_SIZE</a> filter</td></tr><tr><td>=&gt;1140</td><td>MaxTradeVol</td><td>QTY</td><td>N</td><td>Corresponds to the <a href="/docs/binance-spot-api-docs/testnet/filters#lot_size">LOT_SIZE</a> filter</td></tr><tr><td>=&gt;25039</td><td>MinQtyIncrement</td><td>QTY</td><td>N</td><td>Corresponds to the <a href="/docs/binance-spot-api-docs/testnet/filters#lot_size">LOT_SIZE</a> filter</td></tr><tr><td>=&gt;25040</td><td>MarketMinTradeVol</td><td>QTY</td><td>N</td><td>Corresponds to the <a href="/docs/binance-spot-api-docs/testnet/filters#market_lot_size">MARKET_LOT_SIZE</a> filter</td></tr><tr><td>=&gt;25041</td><td>MarketMaxTradeVol</td><td>QTY</td><td>N</td><td>Corresponds to the <a href="/docs/binance-spot-api-docs/testnet/filters#market_lot_size">MARKET_LOT_SIZE</a> filter</td></tr><tr><td>=&gt;25042</td><td>MarketMinQtyIncrement</td><td>QTY</td><td>N</td><td>Corresponds to the <a href="/docs/binance-spot-api-docs/testnet/filters#market_lot_size">MARKET_LOT_SIZE</a> filter</td></tr><tr><td>=&gt;969</td><td>MinPriceIncrement</td><td>PRICE</td><td>N</td><td>Corresponds to the <a href="/docs/binance-spot-api-docs/testnet/filters#price">PRICE</a> filter</td></tr><tr><td>=&gt;2551</td><td>StartPriceRange</td><td>PRICE</td><td>N</td><td>Corresponds to the <a href="/docs/binance-spot-api-docs/testnet/filters#price">PRICE</a> filter</td></tr><tr><td>=&gt;2552</td><td>EndPriceRange</td><td>PRICE</td><td>N</td><td>Corresponds to the <a href="/docs/binance-spot-api-docs/testnet/filters#price">PRICE</a> filter</td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=218|35=y|49=SPOT|56=BMDWATCH|34=2|52=20250114-08:46:56.100147|320=BTCUSDT_INFO|146=1|55=BTCUSDT|15=USDT|562=0.00001000|1140=9000.00000000|25039=0.00001000|25040=0.00000001|25041=76.79001236|25042=0.00000001|969=0.01000000|10=093|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><a id="marketdatarequest"></a></p>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="marketdatarequest-v">MarketDataRequest <code>&lt;V&gt;</code><a class="hash-link" aria-label="Direct link to marketdatarequest-v" title="Direct link to marketdatarequest-v" href="/docs/binance-spot-api-docs/testnet/fix-api#marketdatarequest-v">​</a></h4>
<p>Sent by the client to subscribe to or unsubscribe from market data stream.</p>
<p><a id="tradestream"></a></p>
<p><strong>Trade Stream</strong></p>
<p>The Trade Streams push raw trade information; each trade has a unique buyer and seller.</p>
<p><strong>Fields required to subscribe:</strong></p>
<ul>
<li><code>SubscriptionRequestType</code> present with value <code>SUBSCRIBE(1)</code></li>
<li><code>MDEntryType</code> present with value <code>TRADE(2)</code></li>
</ul>
<p><strong>Update Speed:</strong> Real-time</p>
<p><a id="symbolbooktickerstream"></a></p>
<p><strong>Individual Symbol Book Ticker Stream</strong></p>
<p>Pushes any update to the best bid or offers price or quantity in real-time for a specified symbol.</p>
<p><strong>Fields required to subscribe:</strong></p>
<ul>
<li><code>SubscriptionRequestType</code> with value <code>SUBSCRIBE(1)</code></li>
<li><code>MDEntryType</code> with value <code>BID(0)</code></li>
<li><code>MDEntryType</code> with value <code>OFFER(1)</code></li>
<li><code>MarketDepth</code> with value <code>1</code></li>
</ul>
<p><strong>Update Speed:</strong> Real-time</p>
<blockquote>
<p>[!NOTE]
In the <a href="/docs/binance-spot-api-docs/testnet/fix-api#symbolbooktickerstream">Individual Symbol Book Ticker Stream</a>, when <code>MDUpdateAction</code> is set to <code>CHANGE(1)</code> in a
<a href="/docs/binance-spot-api-docs/testnet/fix-api#marketdataincrementalrefresh">MarketDataIncrementalRefresh<code>&lt;X&gt;</code></a> message sent from the server, it replaces the previous best quote.</p>
</blockquote>
<p><a id="diffdepthstream"></a></p>
<p><strong>Diff. Depth Stream</strong></p>
<p>Order book price and quantity depth updates used to locally manage an order book.</p>
<p><strong>Fields required to subscribe:</strong></p>
<ul>
<li><code>SubscriptionRequestType</code> with value <code>SUBSCRIBE(1)</code></li>
<li><code>MDEntryType</code> with value <code>BID(0)</code></li>
<li><code>MDEntryType</code> with value <code>OFFER(1)</code></li>
<li><code>MarketDepth</code> with a value between <code>2</code> and <code>5000</code>, which controls the size of the initial snapshot and has no effect on subsequent <a href="/docs/binance-spot-api-docs/testnet/fix-api#marketdataincrementalrefresh">MarketDataIncrementalRefresh<code>&lt;X&gt;</code></a> messages</li>
</ul>
<p><strong>Update Speed:</strong> 100ms</p>
<blockquote>
<p>[!NOTE]
Since the <a href="/docs/binance-spot-api-docs/testnet/fix-api#marketdatasnapshot">MarketDataSnapshot<code>&lt;W&gt;</code></a> have a limit on the number of price levels (5000 on each side maximum), you won&#x27;t learn the quantities for the levels outside of the initial snapshot unless they change.
So be careful when using the information for those levels, since they might not reflect the full view of the order book.
However, for most use cases, seeing 5000 levels on each side is enough to understand the market and trade effectively.</p>
</blockquote>




































































<table><thead><tr><th style="text-align:left">Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td style="text-align:left">262</td><td>MDReqID</td><td>STRING</td><td>Y</td><td>ID of this request</td></tr><tr><td style="text-align:left">263</td><td>SubscriptionRequestType</td><td>CHAR</td><td>Y</td><td>Subscription Request Type.  Possible values: <br><br> <code>1</code> - SUBSCRIBE <br><br> <code>2</code> - UNSUBSCRIBE</td></tr><tr><td style="text-align:left">264</td><td>MarketDepth</td><td>INT</td><td>N</td><td>Subscription depth. <br><br> Possible values: <br><br> <code>1</code> - Book Ticker subscription <br><br> <code>2</code>-<code>5000</code> - Diff. Depth Stream</td></tr><tr><td style="text-align:left">266</td><td>AggregatedBook</td><td>NUMINGROUP</td><td>N</td><td>Possible values: <br><br> <code>Y</code> - one book entry per side per price</td></tr><tr><td style="text-align:left">146</td><td>NoRelatedSym</td><td>NUMINGROUP</td><td>N</td><td>Number of symbols</td></tr><tr><td style="text-align:left">=&gt;55</td><td>Symbol</td><td>STRING</td><td>Y</td><td></td></tr><tr><td style="text-align:left">267</td><td>NoMDEntryTypes</td><td>NUMINGROUP</td><td>N</td><td>Number of entry types</td></tr><tr><td style="text-align:left">=&gt;269</td><td>MDEntryType</td><td>CHAR</td><td>Y</td><td>Possible values: <br><br> <code>0</code> - BID <br><br> <code>1</code> - OFFER <br><br> <code>2</code> - TRADE</td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain"># Subscriptions</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"># BOOK TICKER Stream</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=132|35=V|49=TRADER1|56=SPOT|34=4|52=20241122-06:17:14.183428|262=BOOK_TICKER_STREAM|263=1|264=1|266=Y|146=1|55=BTCUSDT|267=2|269=0|269=1|10=010|</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain" style="display:inline-block"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"># DEPTH Stream</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=127|35=V|49=TRADER1|56=SPOT|34=7|52=20241122-06:17:14.443822|262=DEPTH_STREAM|263=1|264=10|266=Y|146=1|55=BTCUSDT|267=2|269=0|269=1|10=111|</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain" style="display:inline-block"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"># TRADE Stream</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=120|35=V|49=TRADER1|56=SPOT|34=3|52=20241122-06:34:14.775606|262=TRADE_STREAM|263=1|264=1|266=Y|146=1|55=BTCUSDT|267=1|269=2|10=040|</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain" style="display:inline-block"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"># Unsubscription from TRADE Stream</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=79|35=V|49=TRADER1|56=SPOT|34=7|52=20241122-06:41:56.966969|262=TRADE_STREAM|263=2|264=1|10=113|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><a id="marketdatarequestreject"></a></p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="marketdatarequestreject-y">MarketDataRequestReject <code>&lt;Y&gt;</code><a class="hash-link" aria-label="Direct link to marketdatarequestreject-y" title="Direct link to marketdatarequestreject-y" href="/docs/binance-spot-api-docs/testnet/fix-api#marketdatarequestreject-y">​</a></h3>
<p>Sent by the server in a response to an invalid MarketDataRequest <code>&lt;V&gt;</code>.</p>








































<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>262</td><td>MDReqID</td><td>STRING</td><td>Y</td><td>ID of the invalid <a href="/docs/binance-spot-api-docs/testnet/fix-api#marketdatarequest">MarketDataRequest<code>&lt;V&gt;</code></a></td></tr><tr><td>281</td><td>MDReqRejReason</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>1</code> - DUPLICATE_MDREQID <br><br> <code>2</code> - TOO_MANY_SUBSCRIPTIONS</td></tr><tr><td>25016</td><td>ErrorCode</td><td>INT</td><td>N</td><td>API Error code. See <a href="/docs/binance-spot-api-docs/testnet/errors">Errors</a></td></tr><tr><td>58</td><td>Text</td><td>STRING</td><td>N</td><td>Human-readable error message.</td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=0000218|35=Y|49=SPOT|56=EXAMPLE|34=5|52=20241019-05:39:36.688964|262=BOOK_TICKER_2|281=2|25016=-1191|58=Similar subscription is already active on this connection. Symbol=&#x27;BNBBUSD&#x27;, active subscription id: &#x27;BOOK_TICKER_1&#x27;.|10=137|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><a id="marketdatasnapshot"></a></p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="marketdatasnapshot-w">MarketDataSnapshot <code>&lt;W&gt;</code><a class="hash-link" aria-label="Direct link to marketdatasnapshot-w" title="Direct link to marketdatasnapshot-w" href="/docs/binance-spot-api-docs/testnet/fix-api#marketdatasnapshot-w">​</a></h3>
<p>Sent by the server in response to a <a href="/docs/binance-spot-api-docs/testnet/fix-api#marketdatarequest">MarketDataRequest<code>&lt;V&gt;</code></a>, activating <a href="/docs/binance-spot-api-docs/testnet/fix-api#symbolbooktickerstream">Individual Symbol Book Ticker Stream</a> or <a href="/docs/binance-spot-api-docs/testnet/fix-api#diffdepthstream">Diff. Depth Stream</a> subscriptions.</p>





























































<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>262</td><td>MDReqID</td><td>STRING</td><td>Y</td><td>ID of the <a href="/docs/binance-spot-api-docs/testnet/fix-api#marketdatarequest">MarketDataRequest<code>&lt;V&gt;</code></a> that activated this subscription</td></tr><tr><td>55</td><td>Symbol</td><td>STRING</td><td>Y</td><td></td></tr><tr><td>25044</td><td>LastBookUpdateID</td><td>INT</td><td>N</td><td></td></tr><tr><td>268</td><td>NoMDEntries</td><td>NUMINGROUP</td><td>Y</td><td>Number of entries</td></tr><tr><td>=&gt;269</td><td>MDEntryType</td><td>CHAR</td><td>Y</td><td>Possible values: <br><br> <code>0</code> - BID <br><br> <code>1</code> - OFFER <br><br> <code>2</code> - TRADE</td></tr><tr><td>=&gt;270</td><td>MDEntryPx</td><td>PRICE</td><td>Y</td><td>Price</td></tr><tr><td>=&gt;271</td><td>MDEntrySize</td><td>QTY</td><td>Y</td><td>Quantity</td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=0000107|35=W|49=SPOT|56=EXAMPLE|34=34|52=20241019-05:41:52.867164|262=BOOK_TICKER_1_2|55=BNBBUSD|25044=0|268=0|10=151|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><a id="marketdataincrementalrefresh"></a></p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="marketdataincrementalrefresh-x">MarketDataIncrementalRefresh <code>&lt;X&gt;</code><a class="hash-link" aria-label="Direct link to marketdataincrementalrefresh-x" title="Direct link to marketdataincrementalrefresh-x" href="/docs/binance-spot-api-docs/testnet/fix-api#marketdataincrementalrefresh-x">​</a></h3>
<p>Sent by the server when there is a change in a subscribed stream.</p>







































































































<table><thead><tr><th>Tag</th><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>262</td><td>MDReqID</td><td>STRING</td><td>Y</td><td>ID of the <a href="/docs/binance-spot-api-docs/testnet/fix-api#marketdatarequest">MarketDataRequest<code>&lt;V&gt;</code></a> that activated this subscription</td></tr><tr><td>893</td><td>LastFragment</td><td>BOOLEAN</td><td>N</td><td>When present, this indicates that the message was fragmented. Fragmentation may occur when <code>NoMDEntry</code> would exceed 10000 in a single <a href="/docs/binance-spot-api-docs/testnet/fix-api#marketdataincrementalrefresh">MarketDataIncrementalRefresh<code>&lt;X&gt;</code></a>, in order to limit it to 10000. The fragments of a fragmented message are guaranteed to be consecutive in the stream. It can only appear in the <a href="/docs/binance-spot-api-docs/testnet/fix-api#tradestream">Trade Stream</a> and <a href="/docs/binance-spot-api-docs/testnet/fix-api#diffdepthstream">Diff. Depth Stream</a>.</td></tr><tr><td>268</td><td>NoMDEntries</td><td>NUMINGROUP</td><td>Y</td><td>Number of entries</td></tr><tr><td>=&gt;279</td><td>MDUpdateAction</td><td>CHAR</td><td>Y</td><td>Possible values: <br><br> <code>0</code> - NEW <br><br> <code>1</code> - CHANGE <br><br> <code>2</code> - DELETE</td></tr><tr><td>=&gt;270</td><td>MDEntryPx</td><td>PRICE</td><td>Y</td><td>Price</td></tr><tr><td>=&gt;271</td><td>MDEntrySize</td><td>QTY</td><td>N</td><td>Quantity</td></tr><tr><td>=&gt;269</td><td>MDEntryType</td><td>CHAR</td><td>Y</td><td>Possible values: <br><br> <code>0</code> - BID <br><br> <code>1</code> - OFFER <br><br> <code>2</code> - TRADE</td></tr><tr><td>=&gt;55</td><td>Symbol</td><td>STRING</td><td>N</td><td>Market Data Entry will default to the same <code>Symbol</code> of the previous Market Data Entry in the same Market Data message if <code>Symbol</code> is not specified</td></tr><tr><td>=&gt;60</td><td>TransactTime</td><td>UTCTIMESTAMP</td><td>N</td><td></td></tr><tr><td>=&gt;1003</td><td>TradeID</td><td>INT</td><td>N</td><td></td></tr><tr><td>=&gt;2446</td><td>AggressorSide</td><td>CHAR</td><td>N</td><td>Possible values: <br><br> <code>1</code> - BUY <br><br> <code>2</code> - SELL</td></tr><tr><td>=&gt;25043</td><td>FirstBookUpdateID</td><td>INT</td><td>N</td><td>Only present in <a href="/docs/binance-spot-api-docs/testnet/fix-api#diffdepthstream">Diff. Depth Stream</a>. <br><br> Market Data Entry will default to the same <code>FirstBookUpdateID</code> of the previous Market Data Entry in the same Market Data message if <code>FirstBookUpdateID</code> is not specified</td></tr><tr><td>=&gt;25044</td><td>LastBookUpdateID</td><td>INT</td><td>N</td><td>Only present in <a href="/docs/binance-spot-api-docs/testnet/fix-api#diffdepthstream">Diff. Depth Stream</a> and <a href="/docs/binance-spot-api-docs/testnet/fix-api#symbolbooktickerstream">Individual Symbol Book Ticker Stream</a>. <br><br> Market Data Entry will default to the same <code>LastBookUpdateID</code> of the previous Market Data Entry in the same Market Data message if <code>LastBookUpdateID</code> is not specified</td></tr></tbody></table>
<p><strong>Sample message:</strong></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=0000313|35=X|49=SPOT|56=EXAMPLE|34=16|52=20241019-05:40:11.466313|262=TRADE_3|893=N|268=3|279=0|269=2|270=10.00000|271=0.01000|55=BNBBUSD|1003=0|60=20241019-05:40:11.464000|279=0|269=2|270=10.00000|271=0.01000|1003=1|60=20241019-05:40:11.464000|279=0|269=2|270=10.00000|271=0.01000|1003=2|60=20241019-05:40:11.464000|10=125|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><strong>Sample fragmented messages:</strong></p>
<blockquote>
<p>[!NOTE]
Below are example messages, with <code>NoMDEntry</code> limited to <em>2</em>, In the real streams, the <code>NoMDEntry</code> is limited to <em>10000</em>.</p>
</blockquote>
<p><a href="/docs/binance-spot-api-docs/testnet/fix-api#tradestream">Trade Stream</a></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=237|35=X|34=114|49=SPOT|52=20250116-19:36:44.544549|56=EXAMPLE|262=id|268=2|279=0|270=240.00|271=3.00000000|269=2|55=BNBBUSD|60=20250116-19:36:44.196569|1003=67|279=0|270=238.00|271=2.00000000|269=2|60=20250116-19:36:44.196569|1003=68|893=N|10=180|</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=163|35=X|34=115|49=SPOT|52=20250116-19:36:44.544659|56=EXAMPLE|262=id|268=1|279=0|270=233.00|271=1.00000000|269=2|55=BNBBUSD|60=20250116-19:36:44.196569|1003=69|893=Y|10=243|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><a href="/docs/binance-spot-api-docs/testnet/fix-api#diffdepthstream">Diff. Depth Stream</a></p>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=156|35=X|34=12|49=SPOT|52=20250116-19:45:31.774162|56=EXAMPLE|262=id|268=2|279=2|270=362.00|269=0|55=BNBBUSD|25043=1143|25044=1145|279=2|270=313.00|269=0|893=N|10=047|</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=171|35=X|34=13|49=SPOT|52=20250116-19:45:31.774263|56=EXAMPLE|262=id|268=2|279=2|270=284.00|269=0|55=BNBBUSD|25043=1143|25044=1145|279=1|270=264.00|271=3.00000000|269=0|893=N|10=239|</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">8=FIX.4.4|9=149|35=X|34=14|49=SPOT|52=20250116-19:45:31.774281|56=EXAMPLE|262=id|268=1|279=1|270=395.00|271=19.00000000|269=1|55=BNBBUSD|25043=1143|25044=1145|893=Y|10=024|</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="fix-sbe">FIX SBE<a class="hash-link" aria-label="Direct link to FIX SBE" title="Direct link to FIX SBE" href="/docs/binance-spot-api-docs/testnet/fix-api#fix-sbe">​</a></h2>
<p>FIX SBE (Simple Binary Encoding) can be used instead of FIX with the <a href="https://github.com/binance/binance-spot-api-docs/blob/master/sbe/schemas/spot_fix_testnet_latest.xml" target="_blank" rel="noopener noreferrer">spot_fix_testnet_latest.xml</a> schema file.</p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="sbe">SBE<a class="hash-link" aria-label="Direct link to SBE" title="Direct link to SBE" href="/docs/binance-spot-api-docs/testnet/fix-api#sbe">​</a></h3>
<p>Read the <a href="/docs/binance-spot-api-docs/faqs/sbe_faq">SBE FAQ</a> for important information about using SBE with Binance APIs.</p>
<ul>
<li>Please review and understand the <a href="https://www.fixtrading.org/standards/sbe-online/" target="_blank" rel="noopener noreferrer">SBE specification</a> before attempting to use FIX SBE</li>
<li>When encoding and decoding SBE payloads, it is recommended to use code generated by <a href="https://github.com/aeron-io/simple-binary-encoding" target="_blank" rel="noopener noreferrer"><code>SbeTool</code></a> to ensure compliance with the FIX SBE specification.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="endpoints">Endpoints<a class="hash-link" aria-label="Direct link to Endpoints" title="Direct link to Endpoints" href="/docs/binance-spot-api-docs/testnet/fix-api#endpoints">​</a></h3>
<p>In addition to FIX encoding available on port 9000, two request/response encoding schemes are supported on additional TCP ports. See below endpoints for each API.</p>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="order-entry">Order Entry<a class="hash-link" aria-label="Direct link to Order Entry" title="Direct link to Order Entry" href="/docs/binance-spot-api-docs/testnet/fix-api#order-entry">​</a></h4>
<ul>
<li><code>tcp+tls://fix-oe.testnet.binance.vision:9001</code>: Send FIX requests; receive FIX SBE responses
<ul>
<li>FIX <code>SbeSchemaId</code> tag (=25050) must be set to the FIX SBE schema ID (=1)</li>
<li>The FIX <code>SbeSchemaVersion</code> tag (=25051) must be set to the FIX SBE schema version (=0)</li>
</ul>
</li>
<li><code>tcp+tls://fix-oe.testnet.binance.vision:9002</code>: Send FIX SBE requests; receive FIX SBE responses</li>
</ul>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="drop-copy">Drop Copy<a class="hash-link" aria-label="Direct link to Drop Copy" title="Direct link to Drop Copy" href="/docs/binance-spot-api-docs/testnet/fix-api#drop-copy">​</a></h4>
<ul>
<li><code>tcp+tls://fix-dc.testnet.binance.vision:9001</code>: Send FIX requests; receive FIX SBE responses
<ul>
<li>FIX <code>SbeSchemaId</code> tag (=25050) must be set to the FIX SBE schema ID (=1)</li>
<li>The FIX <code>SbeSchemaVersion</code> tag (=25051) must be set to the FIX SBE schema version (=0)</li>
</ul>
</li>
<li><code>tcp+tls://fix-dc.testnet.binance.vision:9002</code>: Send FIX SBE requests; receive FIX SBE responses</li>
</ul>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="market-data">Market data<a class="hash-link" aria-label="Direct link to Market data" title="Direct link to Market data" href="/docs/binance-spot-api-docs/testnet/fix-api#market-data">​</a></h4>
<ul>
<li><code>tcp+tls://fix-md.testnet.binance.vision:9001</code>: Send FIX requests; receive FIX SBE responses
<ul>
<li>FIX <code>SbeSchemaId</code> tag (=25050) must be set to the FIX SBE schema ID (=1)</li>
<li>The FIX <code>SbeSchemaVersion</code> tag (=25051) must be set to the FIX SBE schema version (=0)</li>
</ul>
</li>
<li><code>tcp+tls://fix-md.testnet.binance.vision:9002</code>: Send FIX SBE requests; receive FIX SBE responses</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="fix-sbe-encoding-layout">FIX SBE encoding layout<a class="hash-link" aria-label="Direct link to FIX SBE encoding layout" title="Direct link to FIX SBE encoding layout" href="/docs/binance-spot-api-docs/testnet/fix-api#fix-sbe-encoding-layout">​</a></h3>
<p>FIX SBE request/response messages always come with a SOFH (Simple Open Framing Header) and message header. A given FIX SBE message of N bytes has the following wire format:</p>
<p><code>&lt;SOFH (6 bytes)&gt; &lt;message header (20 bytes)&gt; &lt;message (N bytes)&gt;</code></p>
<p>SOFH: This corresponds to the &quot;sofh&quot; composite type in the schema file. This acts as a framing header so that the FIX SBE servers/clients can know the length of SBE messages and ensure messages have been fully received prior to deserializing them</p>
<p>Notes:</p>
<ul>
<li>The two fields within the SOFH MUST be encoded in little-endian</li>
<li>The FIX servers only support <code>0xEB50</code> for the encodingType field, i.e. only little-endian is supported for all fields</li>
</ul>
<p>Message header: This corresponds to the &quot;messageHeader&quot; composite type in the schema file.</p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="logon">Logon<a class="hash-link" aria-label="Direct link to Logon" title="Direct link to Logon" href="/docs/binance-spot-api-docs/testnet/fix-api#logon">​</a></h3>
<p>The logon signature (RawData) is computed as documented in the <a href="/docs/binance-spot-api-docs/testnet/fix-api#signaturecomputation">signature computation</a> section.</p>
<h4 class="anchor anchorWithStickyNavbar_fMI7" id="sample-fix-sbe-logon-request-message">Sample FIX SBE <code>Logon</code> request message<a class="hash-link" aria-label="Direct link to sample-fix-sbe-logon-request-message" title="Direct link to sample-fix-sbe-logon-request-message" href="/docs/binance-spot-api-docs/testnet/fix-api#sample-fix-sbe-logon-request-message">​</a></h4>
<p>Please see below the hexdump of a sample FIX SBE <code>Logon</code> message obtained by following the above instructions.</p>













































































































































































<table><thead><tr><th>Bytes</th><th>Description</th></tr></thead><tbody><tr><td>0xd1, 0x00, 0x00, 0x00</td><td>sofh.messageLength</td></tr><tr><td>0x50, 0xeb</td><td>sofh.encodingType</td></tr><tr><td>0x0e, 0x00</td><td>messageHeader.blockLength</td></tr><tr><td>0x28, 0x4e</td><td>messageHeader.templateId</td></tr><tr><td>0x01, 0x00</td><td>messageHeader.schemaId</td></tr><tr><td>0x00, 0x00</td><td>messageHeader.version</td></tr><tr><td>0x01, 0x00, 0x00, 0x00</td><td>messageHeader.seqNum</td></tr><tr><td>0x58, 0x7a, 0x5f, 0x99, 0xdb, 0x1b, 0x06, 0x00</td><td>messageHeader.sendingTime</td></tr><tr><td>0x00</td><td>Logon.EncryptMethod</td></tr><tr><td>0x1e, 0x00, 0x00, 0x00</td><td>Logon.HeartBtInt</td></tr><tr><td>0x01</td><td>Logon.ResetSeqNumFlag</td></tr><tr><td>0x02</td><td>Logon.MessageHandling</td></tr><tr><td>0xff</td><td>Logon.ResponseMode</td></tr><tr><td>0xff</td><td>Logon.ExecutionReportType</td></tr><tr><td>0xff</td><td>Logon.DropCopyFlag</td></tr><tr><td>0xff, 0xff, 0xff, 0xff</td><td>Logon.RecvWindow</td></tr><tr><td>0x07</td><td>Logon.SenderCompId.length</td></tr><tr><td>0x45, 0x58, 0x41, 0x4d, 0x50, 0x4c, 0x45</td><td>Logon.SenderCompId.varData</td></tr><tr><td>0x04</td><td>Logon.TargetCompId.length</td></tr><tr><td>0x53, 0x50, 0x4f, 0x54</td><td>Logon.TargetCompId.varData</td></tr><tr><td>0x58, 0x00</td><td>Logon.RawData.length</td></tr><tr><td>0x34, 0x4d, 0x48, 0x58, 0x65, 0x6c, 0x56, 0x56</td><td>Logon.RawData.varData</td></tr><tr><td>0x63, 0x70, 0x6b, 0x64, 0x77, 0x75, 0x4c, 0x62</td><td>Logon.RawData.varData</td></tr><tr><td>0x6c, 0x36, 0x6e, 0x37, 0x33, 0x48, 0x51, 0x55</td><td>Logon.RawData.varData</td></tr><tr><td>0x58, 0x55, 0x66, 0x31, 0x64, 0x73, 0x65, 0x32</td><td>Logon.RawData.varData</td></tr><tr><td>0x50, 0x43, 0x67, 0x54, 0x31, 0x44, 0x59, 0x71</td><td>Logon.RawData.varData</td></tr><tr><td>0x57, 0x39, 0x77, 0x38, 0x41, 0x56, 0x5a, 0x31</td><td>Logon.RawData.varData</td></tr><tr><td>0x52, 0x41, 0x43, 0x46, 0x47, 0x4d, 0x2b, 0x35</td><td>Logon.RawData.varData</td></tr><tr><td>0x55, 0x64, 0x6c, 0x47, 0x50, 0x72, 0x51, 0x48</td><td>Logon.RawData.varData</td></tr><tr><td>0x72, 0x67, 0x74, 0x53, 0x33, 0x43, 0x76, 0x73</td><td>Logon.RawData.varData</td></tr><tr><td>0x52, 0x55, 0x52, 0x43, 0x31, 0x6f, 0x6a, 0x37</td><td>Logon.RawData.varData</td></tr><tr><td>0x33, 0x6a, 0x38, 0x67, 0x43, 0x41, 0x3d, 0x3d</td><td>Logon.RawData.varData</td></tr><tr><td>0x40, 0x00</td><td>Logon.Username.length</td></tr><tr><td>0x73, 0x42, 0x52, 0x58, 0x72, 0x4a, 0x78, 0x32</td><td>Logon.Username.varData</td></tr><tr><td>0x44, 0x73, 0x4f, 0x72, 0x61, 0x4d, 0x58, 0x4f</td><td>Logon.Username.varData</td></tr><tr><td>0x61, 0x55, 0x6f, 0x76, 0x45, 0x68, 0x67, 0x56</td><td>Logon.Username.varData</td></tr><tr><td>0x52, 0x63, 0x6a, 0x4f, 0x76, 0x43, 0x74, 0x51</td><td>Logon.Username.varData</td></tr><tr><td>0x77, 0x6e, 0x57, 0x6a, 0x38, 0x56, 0x78, 0x6b</td><td>Logon.Username.varData</td></tr><tr><td>0x4f, 0x68, 0x31, 0x78, 0x71, 0x62, 0x6f, 0x53</td><td>Logon.Username.varData</td></tr><tr><td>0x30, 0x32, 0x53, 0x50, 0x47, 0x66, 0x4b, 0x69</td><td>Logon.Username.varData</td></tr><tr><td>0x32, 0x68, 0x38, 0x73, 0x70, 0x5a, 0x4a, 0x62</td><td>Logon.Username.varData</td></tr></tbody></table>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="fix-vs-fix-sbe">FIX vs. FIX SBE<a class="hash-link" aria-label="Direct link to FIX vs. FIX SBE" title="Direct link to FIX vs. FIX SBE" href="/docs/binance-spot-api-docs/testnet/fix-api#fix-vs-fix-sbe">​</a></h3>
<p>General:</p>
<ul>
<li>The <code>sofh.messageLength</code> field <em>must</em> include the size of the SOFH (6 bytes)</li>
<li>FIX SBE has no <code>Checksum</code> field</li>
<li>When sending FIX SBE requests on port 9002
<ul>
<li>All fields must be set in the payload</li>
<li>Optional fields that are not present must be set to the corresponding <code>nullValue</code>
<ul>
<li>The encoders generated by <code>SbeTool</code> handle this correctly</li>
<li>Please refer to the definition of <code>nullValue</code> in the <a href="https://www.fixtrading.org/standards/sbe-online/" target="_blank" rel="noopener noreferrer">SBE specification</a> if encoding payloads manually</li>
</ul>
</li>
</ul>
</li>
</ul>
<p>Decimal encoding:</p>
<ul>
<li>In request messages, the values for <code>PriceExponent</code> and <code>QtyExponent</code> must be no more precise than the precision of the symbol being transacted. Symbol precision can be retrieved from the <code>InstrumentList</code> response.</li>
</ul>
<p><strong>Logon</strong> message:</p>
<ul>
<li>The <code>SenderCompID</code>, <code>TargetCompID</code> and <code>RecvWindow</code> fields are provided in the <code>Logon</code> FIX SBE message instead of the message header
<ul>
<li>The <code>RecvWindow</code> field set in the <code>Logon</code> message applies to all trading request messages within the FIX SBE session</li>
<li>When set, the <code>RecvWindow</code> field is in microseconds</li>
</ul>
</li>
<li>When the <code>ResponseMode</code> field is set to <code>OnlyAcks</code>, the <code>ExecutionReportType</code> field can be set to <code>Mini</code> to receive <code>ExecutionReportAck</code> messages instead of <code>ExecutionReport</code>
<ul>
<li>Note: The <code>ExecutionReportType</code> field is only supported on port 9001 and port 9002 for the Order Entry and Drop Copy endpoints</li>
</ul>
</li>
</ul>
<p><strong>MarketDataIncrementalRefresh</strong> message:</p>
<ul>
<li>This single message in the FIX schema is split into the following FIX SBE messages: <code>MarketDataIncrementalTrade</code>, <code>MarketDataIncrementalBookTicker</code> and <code>MarketDataIncrementalDepth</code></li>
<li>The <code>MDReqID</code> field is omitted from the market data snapshot and refresh messages as these messages can be tied to the subscription request using the <code>Symbol</code> field and the message&#x27;s template ID
<ul>
<li><code>MDReqID</code> is required in the <code>MarketDataRequest</code> message so that it may appear in <code>MarketDataRequestReject</code></li>
<li>The value of <code>MDReqID</code> must be unique across subscriptions</li>
</ul>
</li>
</ul>
<p><strong>MarketDataIncrementalTrade</strong> message:</p>
<ul>
<li>The MDUpdateAction field available in the FIX schema is omitted in FIX SBE since the value is always <code>NEW</code>.</li>
</ul>
<p><strong>MarketDataIncrementalBookTicker</strong> message:</p>
<ul>
<li>FIX SBE book ticker subscriptions use <strong>auto-culling</strong>: when the system is under high load, it may drop outdated events instead of queuing all events and delivering them with a delay.
<ul>
<li>For example, if a best bid/ask event is generated at time T2 when there is still an undelivered event queued at time T1 (where T1 &lt; T2), the event for T1 is dropped, and the system will deliver only the event for T2. This is done on a per-symbol basis.</li>
</ul>
</li>
<li>The <code>MDUpdateAction</code> field available in the FIX schema is omitted in FIX SBE as its value may be derived from <code>MDEntrySize</code>.
<ul>
<li>When <code>MDEntrySize</code> is unset (<code>NullVal</code>), <code>MDUpdateAction</code> is <code>DELETE</code>.</li>
<li>When <code>MDEntrySize</code> is set,
<ul>
<li>if the price level exists in your local order book, <code>MDUpdateAction</code> is <code>CHANGE</code></li>
<li>else <code>MDUpdateAction</code> is <code>NEW</code>.</li>
</ul>
</li>
</ul>
</li>
</ul>
<p><strong>MarketDataIncrementalDepth</strong> message:</p>
<ul>
<li>FIX SBE depth update speed: 50ms</li>
<li>The <code>MDUpdateAction</code> field available in the FIX schema is omitted in FIX SBE as its value may be derived from <code>MDEntrySize</code>.
<ul>
<li>When <code>MDEntrySize</code> is unset (<code>NullVal</code>), <code>MDUpdateAction</code> is <code>DELETE</code>.</li>
<li>When <code>MDEntrySize</code> is set,
<ul>
<li>if the price level exists in your local order book, <code>MDUpdateAction</code> is <code>CHANGE</code></li>
<li>else <code>MDUpdateAction</code> is <code>NEW</code>.</li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="limits-1">Limits<a class="hash-link" aria-label="Direct link to Limits" title="Direct link to Limits" href="/docs/binance-spot-api-docs/testnet/fix-api#limits-1">​</a></h3>
<p>Connection limits are shared between FIX and FIX SBE.</p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="errors">Errors<a class="hash-link" aria-label="Direct link to Errors" title="Direct link to Errors" href="/docs/binance-spot-api-docs/testnet/fix-api#errors">​</a></h3>
<p>The following FIX SBE-specific errors may be returned:</p>






























<table><thead><tr><th>Code</th><th>Message</th><th>Description</th></tr></thead><tbody><tr><td>-1152</td><td>Invalid SBE message header.</td><td>Error when decoding <code>messageHeader</code> in FIX SBE request</td></tr><tr><td>-1153</td><td>Invalid SBE schema ID or version specified.</td><td>Error when parsing/decoding FIX SBE schema ID/version</td></tr><tr><td>-1177</td><td>Invalid encodingType.</td><td>Error when decoding <code>encodingType</code> field in sofh composite type</td></tr><tr><td>-1221</td><td>Invalid/missing field(s) in SBE message.</td><td>Invalid/missing field when decoding FIX SBE request</td></tr></tbody></table>
<p>Note: Error codes returned for semantically equivalent FIX and FIX SBE requests may not be identical.</p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="faq">FAQ<a class="hash-link" aria-label="Direct link to FAQ" title="Direct link to FAQ" href="/docs/binance-spot-api-docs/testnet/fix-api#faq">​</a></h3>
<p>See the <a href="/docs/binance-spot-api-docs/faqs/sbe_faq">SBE FAQ</a> for more information on generating SBE decoders and handling schema updates.</p></div></article><nav class="pagination-nav docusaurus-mt-lg" aria-label="Docs pages"><a class="pagination-nav__link pagination-nav__link--prev" href="/docs/binance-spot-api-docs/testnet/rest-api/account-endpoints"><div class="pagination-nav__sublabel">Previous</div><div class="pagination-nav__label">Account Endpoints</div></a><a class="pagination-nav__link pagination-nav__link--next" href="/docs/binance-spot-api-docs/testnet/user-data-stream"><div class="pagination-nav__sublabel">Next</div><div class="pagination-nav__label">User Data Stream</div></a></nav></div></div><div class="col col--3"><div class="tableOfContents_zXaw thin-scrollbar theme-doc-toc-desktop"><ul class="table-of-contents table-of-contents__left-border"><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#general-api-information">General API Information</a><ul><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#fix-api-order-entry-sessions">FIX API Order Entry sessions</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#fix-api-drop-copy-sessions">FIX API Drop Copy sessions</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#fix-api-market-data-sessions">FIX API Market Data sessions</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#fix-connection-lifecycle">FIX Connection Lifecycle</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#api-key-permissions">API Key Permissions</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#on-message-processing-order">On message processing order</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#response-mode">Response Mode</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#timing-security">Timing Security</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#how-to-sign-logon-a-request">How to sign Logon <code>&lt;A&gt;</code> request</a></li></ul></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#limits">Limits</a><ul><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#message-limits">Message Limits</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#connection-limits">Connection Limits</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#unfilled-order-count">Unfilled Order Count</a></li></ul></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#error-handling">Error Handling</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#types">Types</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#message-components">Message Components</a><ul><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#header">Header</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#trailer">Trailer</a></li></ul></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#administrative-messages">Administrative Messages</a><ul><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#heartbeat-0">Heartbeat <code>&lt;0&gt;</code></a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#testrequest-1">TestRequest <code>&lt;1&gt;</code></a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#reject-3">Reject <code>&lt;3&gt;</code></a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#logon-a">Logon <code>&lt;A&gt;</code></a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#logout-5">Logout <code>&lt;5&gt;</code></a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#news-b">News <code>&lt;B&gt;</code></a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#resend-request-2">Resend Request <code>&lt;2&gt;</code></a></li></ul></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#application-messages">Application Messages</a><ul><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#order-entry-messages">Order Entry Messages</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#orderamendreject-xar">OrderAmendReject <code>&lt;XAR&gt;</code></a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#limit-messages">Limit Messages</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#market-data-messages">Market Data Messages</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#marketdatarequestreject-y">MarketDataRequestReject <code>&lt;Y&gt;</code></a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#marketdatasnapshot-w">MarketDataSnapshot <code>&lt;W&gt;</code></a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#marketdataincrementalrefresh-x">MarketDataIncrementalRefresh <code>&lt;X&gt;</code></a></li></ul></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#fix-sbe">FIX SBE</a><ul><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#sbe">SBE</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#endpoints">Endpoints</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#fix-sbe-encoding-layout">FIX SBE encoding layout</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#logon">Logon</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#fix-vs-fix-sbe">FIX vs. FIX SBE</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#limits-1">Limits</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#errors">Errors</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/testnet/fix-api#faq">FAQ</a></li></ul></li></ul></div></div></div></div></main></div></div></div><footer class="footer footer--dark"><div class="container container-fluid"><div class="footer__bottom text--center"><div class="footer__copyright">Copyright © 2026 Binance.</div></div></div></footer></div>
</body>
</html>
