# binance-spot-api-docs/README

> **Source:** https://developers.binance.com/docs/binance-spot-api-docs/README

<!-- Raw HTML content from page -->
<!doctype html>
<html lang="en" dir="ltr" class="docs-wrapper plugin-docs plugin-id-default docs-version-current docs-doc-page docs-doc-id-binance-spot-api-docs/README" data-has-hydrated="false">
<head>
<meta charset="UTF-8">
<meta name="generator" content="Docusaurus v3.4.0">
<title data-rh="true">Readme | Binance Open Platform</title><meta data-rh="true" name="viewport" content="width=device-width,initial-scale=1"><meta data-rh="true" name="twitter:card" content="summary_large_image"><meta data-rh="true" property="og:url" content="https://developers.binance.com/docs/binance-spot-api-docs/README"><meta data-rh="true" property="og:locale" content="en"><meta data-rh="true" property="og:locale:alternate" content="zh_CN"><meta data-rh="true" name="docusaurus_locale" content="en"><meta data-rh="true" name="docsearch:language" content="en"><meta data-rh="true" name="docusaurus_version" content="current"><meta data-rh="true" name="docusaurus_tag" content="docs-default-current"><meta data-rh="true" name="docsearch:version" content="current"><meta data-rh="true" name="docsearch:docusaurus_tag" content="docs-default-current"><meta data-rh="true" property="og:title" content="Readme | Binance Open Platform"><meta data-rh="true" name="description" content="Official Announcements regarding changes, downtime, etc. to the API and Streams will be reported here//t.me/binance_api_announcements*"><meta data-rh="true" property="og:description" content="Official Announcements regarding changes, downtime, etc. to the API and Streams will be reported here//t.me/binance_api_announcements*"><link data-rh="true" rel="icon" href="/docs/img/favicon.png"><link data-rh="true" rel="canonical" href="https://developers.binance.com/docs/binance-spot-api-docs/README"><link data-rh="true" rel="alternate" href="https://developers.binance.com/docs/binance-spot-api-docs/README" hreflang="en"><link data-rh="true" rel="alternate" href="https://developers.binance.com/docs/zh-CN/binance-spot-api-docs/README" hreflang="zh-CN"><link data-rh="true" rel="alternate" href="https://developers.binance.com/docs/binance-spot-api-docs/README" hreflang="x-default"><link data-rh="true" rel="preconnect" href="https://9I0UZOBSWT-dsn.algolia.net" crossorigin="anonymous"><link rel="preconnect" href="https://www.googletagmanager.com">
<script>window.dataLayer=window.dataLayer||[]</script>
<script>!function(e,t,a,n,g){e[n]=e[n]||[],e[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var m=t.getElementsByTagName(a)[0],r=t.createElement(a);r.async=!0,r.src="https://www.googletagmanager.com/gtm.js?id=GTM-M86QHGF",m.parentNode.insertBefore(r,m)}(window,document,"script","dataLayer")</script>


<link rel="search" type="application/opensearchdescription+xml" title="Binance Open Platform" href="/docs/opensearch.xml"><link rel="stylesheet" href="/docs/assets/css/styles.65c537d6.css">
<script src="/docs/assets/js/runtime~main.beb17562.js" defer="defer"></script>
<script src="/docs/assets/js/main.c8dc629a.js" defer="defer"></script>
</head>
<body class="navigation-with-keyboard">
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M86QHGF" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

<script>!function(){function t(t){document.documentElement.setAttribute("data-theme",t)}var e=function(){try{return new URLSearchParams(window.location.search).get("docusaurus-theme")}catch(t){}}()||function(){try{return window.localStorage.getItem("theme")}catch(t){}}();t(null!==e?e:"light")}(),function(){try{const n=new URLSearchParams(window.location.search).entries();for(var[t,e]of n)if(t.startsWith("docusaurus-data-")){var a=t.replace("docusaurus-data-","data-");document.documentElement.setAttribute(a,e)}}catch(t){}}()</script><div id="__docusaurus"><div role="region" aria-label="Skip to main content"><a class="skipToContent_Mndp" href="#__docusaurus_skipToContent_fallback">Skip to main content</a></div><nav aria-label="Main" class="navbar navbar--fixed-top"><div class="navbar__inner"><div class="navbar__items"><button aria-label="Toggle navigation bar" aria-expanded="false" class="navbar__toggle clean-btn" type="button"><svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M4 7h22M4 15h22M4 23h22"></path></svg></button><a href="https://developers.binance.com/en" target="_self" rel="noopener noreferrer" class="navbar__brand"><div class="navbar__logo"><img src="/docs/img/logo.svg" alt="Binance Logo" class="themedComponent_abzR themedComponent--light_IjiB"><img src="/docs/img/logo.svg" alt="Binance Logo" class="themedComponent_abzR themedComponent--dark_O3Fz"></div></a><div class="productSelectorWrapper_kk2K"><div class="productSelector_tRKy"><button class="productSelectorButton_fwTp"><span>Products</span><span class="arrow_h6A6">▼</span></button></div></div></div><div class="navbar__items navbar__items--right"><div class="navbarSearchContainer_dCNk"><div class="searchContainer_RJ4l"><div class="searchWrapper_Bzvn"><button type="button" class="DocSearch DocSearch-Button" aria-label="Search"><span class="DocSearch-Button-Container"><svg width="20" height="20" class="DocSearch-Search-Icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="DocSearch-Button-Placeholder">Search</span></span><span class="DocSearch-Button-Keys"></span></button><div class="searchModeToggle__Af9"><div class="toggleTrack_B5pz"><button class="toggleOption_jECQ active_d_Ud" title="Search current documentation section">Current</button><button class="toggleOption_jECQ" title="Search all documentation">All</button></div></div></div></div></div><div class="navbar__item dropdown dropdown--hoverable dropdown--right"><a aria-haspopup="true" aria-expanded="false" role="button" class="navbar__link navbar_locale_dropdown" href="/docs/binance-spot-api-docs/README"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" class="iconLanguage_JRss"><path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path></svg>English</a><ul class="dropdown__menu"><li><a href="/docs/binance-spot-api-docs/README" target="_self" rel="noopener noreferrer" class="dropdown__link dropdown__link--active" lang="en">English</a></li><li><a href="/docs/zh-CN/binance-spot-api-docs/README" target="_self" rel="noopener noreferrer" class="dropdown__link" lang="zh-CN">简体中文</a></li></ul></div><div class="toggle_OprV colorModeToggle_x44X"><button class="clean-btn toggleButton_g_ff toggleButtonDisabled_uc5P" type="button" disabled="" title="Switch between dark and light mode (currently light mode)" aria-label="Switch between dark and light mode (currently light mode)" aria-live="polite"><svg viewBox="0 0 24 24" width="24" height="24" class="lightToggleIcon_JliJ"><path fill="currentColor" d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"></path></svg><svg viewBox="0 0 24 24" width="24" height="24" class="darkToggleIcon_dakX"><path fill="currentColor" d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"></path></svg></button></div></div></div><div role="presentation" class="navbar-sidebar__backdrop"></div></nav><div id="__docusaurus_skipToContent_fallback" class="main-wrapper mainWrapper_BBNw"><div class="docsWrapper_dkrk"><button aria-label="Scroll back to top" class="clean-btn theme-back-to-top-button backToTopButton_m21v" type="button"></button><div class="docRoot_mtKm"><aside class="theme-doc-sidebar-container docSidebarContainer_Er1R"><div class="sidebarViewport_VgPy"><section class="productSelector_ky08"><span> <!-- -->Spot Trading<!-- --> </span></section><div class="sidebar_YPx9"><nav aria-label="Docs sidebar" class="menu thin-scrollbar menu_SCH5"><ul class="theme-doc-sidebar-menu menu__list"><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs">Changelog</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link menu__link--active" aria-current="page" href="/docs/binance-spot-api-docs/README">Readme</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/filters">Filters</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/enums">Enums</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/rest-api/general-api-information">REST API</a></div></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/fix-api">FIX API</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/web-socket-streams">WebSocket Streams</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/sbe-market-data-streams">SBE Market Data</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/user-data-stream">User Data Stream</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/websocket-api/general-api-information">WebSocket API</a></div></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/PROD-TERMS-OF-USE">Terms of Use</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/testnet">Testnet</a></div></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/demo-mode">Demo Mode</a></div></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/errors">Error</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/faqs/spot_glossary">FAQs</a></div></li></ul></nav></div></div></aside><main class="docMainContainer_jRkP"><div class="container padding-top--md padding-bottom--lg"><div class="row"><div class="col docItemCol_Xiwq"><div class="docItemContainer_JFP9"><article><nav class="theme-doc-breadcrumbs breadcrumbsContainer_tVzI" aria-label="Breadcrumbs"><ul class="breadcrumbs" itemscope="" itemtype="https://schema.org/BreadcrumbList"><li class="breadcrumbs__item"><a aria-label="Home page" class="breadcrumbs__link" href="/docs/"><svg viewBox="0 0 24 24" class="breadcrumbHomeIcon_yapy"><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" fill="currentColor"></path></svg></a></li><li itemscope="" itemprop="itemListElement" itemtype="https://schema.org/ListItem" class="breadcrumbs__item breadcrumbs__item--active"><span class="breadcrumbs__link" itemprop="name">Readme</span><meta itemprop="position" content="1"></li></ul></nav><div class="tocCollapsible_Wlpy theme-doc-toc-mobile tocMobile_qs2S"><button type="button" class="clean-btn tocCollapsibleButton_niV5">On this page</button></div><div class="theme-doc-markdown markdown"><meta name="docsearch:sidebar" content="binance-spot-api-docs">
  
<h1>Official Documentation for the Binance APIs and Streams.</h1>
<ul>
<li>Official Announcements regarding changes, downtime, etc. to the API and Streams will be reported here: <strong><a href="https://t.me/binance_api_announcements" target="_blank" rel="noopener noreferrer">https://t.me/binance_api_announcements</a></strong></li>
<li>Streams, endpoints, parameters, payloads, etc. described in the documents in this repository are considered <strong>official</strong> and <strong>supported</strong>.</li>
<li>The use of any other streams, endpoints, parameters, or payloads, etc. is <strong>not supported</strong>; <strong>use them at your own risk and with no guarantees.</strong></li>
</ul>





























































































































































<table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><a href="/docs/binance-spot-api-docs/enums">enums.md</a></td><td>Details on the enums used by REST and WebSocket API</td></tr><tr><td><a href="/docs/binance-spot-api-docs/errors">errors.md</a></td><td>Error codes and messages of Spot API</td></tr><tr><td><a href="/docs/binance-spot-api-docs/filters">filters.md</a></td><td>Details on the filters used by Spot API</td></tr><tr><td><a href="/docs/binance-spot-api-docs/rest-api">rest-api.md</a></td><td>Spot REST API (<code>/api</code>)</td></tr><tr><td><a href="/docs/binance-spot-api-docs/websocket-api">web-socket-api.md</a></td><td>Spot WebSocket API</td></tr><tr><td><a href="/docs/binance-spot-api-docs/fix-api">fix-api.md</a></td><td>FIX API</td></tr><tr><td><a href="/docs/binance-spot-api-docs/web-socket-streams">web-socket-streams.md</a></td><td>Spot Market Data WebSocket streams</td></tr><tr><td><a href="/docs/binance-spot-api-docs/sbe-market-data-streams">sbe-market-data-streams.md</a></td><td>SBE Market Data Streams</td></tr><tr><td><a href="/docs/binance-spot-api-docs/user-data-stream">user-data-stream.md</a></td><td>Spot User Data WebSocket streams</td></tr><tr><td><a href="/docs/binance-spot-api-docs/sbe/schemas/">sbe_schemas</a></td><td>Spot Simple Binary Encoding (SBE) schemas</td></tr><tr><td><a href="/docs/binance-spot-api-docs/testnet/">testnet</a></td><td>API docs for features available only on SPOT Testnet</td></tr><tr><td><a href="/docs/binance-spot-api-docs/demo-mode/">demo-mode</a></td><td>Page regarding Demo Mode</td></tr><tr><td> </td><td></td></tr><tr><td><a href="https://developers.binance.com/docs/margin_trading" target="_blank" rel="noopener noreferrer">Margin Trading</a></td><td>Details on Margin Trading</td></tr><tr><td><a href="https://developers.binance.com/docs/derivatives/usds-margined-futures/general-info" target="_blank" rel="noopener noreferrer">Derivative UM Futures</a></td><td>Details on Derivative UM Futures (<code>/fapi</code>)</td></tr><tr><td><a href="https://developers.binance.com/docs/derivatives/coin-margined-futures/general-info" target="_blank" rel="noopener noreferrer">Derivative CM Futures</a></td><td>Details on Derivative CM Futures (<code>/dapi</code>)</td></tr><tr><td><a href="https://developers.binance.com/docs/derivatives/option/general-info" target="_blank" rel="noopener noreferrer">Derivative Options</a></td><td>Details on Derivative European Options (<code>/eapi</code>)</td></tr><tr><td><a href="https://developers.binance.com/docs/derivatives/portfolio-margin/general-info" target="_blank" rel="noopener noreferrer">Derivative Portfolio Margin</a></td><td>Details on Derivative Portfolio Margin (<code>/papi</code>)</td></tr><tr><td><a href="https://developers.binance.com/docs/wallet" target="_blank" rel="noopener noreferrer">Wallet</a></td><td>Details on Wallet endpoints (<code>/sapi</code>)</td></tr><tr><td><a href="https://developers.binance.com/docs/sub_account/general-info" target="_blank" rel="noopener noreferrer">Sub Account</a></td><td>Details on Sub-Account requests (<code>/sapi</code>)</td></tr><tr><td><a href="https://developers.binance.com/docs/simple_earn/general-info" target="_blank" rel="noopener noreferrer">Simple Earn</a></td><td>Details on Simple Earn</td></tr><tr><td><a href="https://developers.binance.com/docs/dual_investment" target="_blank" rel="noopener noreferrer">Dual Investment</a></td><td>Details on Dual Investment</td></tr><tr><td><a href="https://developers.binance.com/docs/auto_invest" target="_blank" rel="noopener noreferrer">Auto Invest</a></td><td>Details on Auto Invest</td></tr><tr><td><a href="https://developers.binance.com/docs/staking" target="_blank" rel="noopener noreferrer">Staking</a></td><td>Details on Staking</td></tr><tr><td><a href="https://developers.binance.com/docs/mining" target="_blank" rel="noopener noreferrer">Mining</a></td><td>Details on Mining</td></tr><tr><td><a href="https://developers.binance.com/docs/algo" target="_blank" rel="noopener noreferrer">Algo Trading</a></td><td>Details on Algo Trading</td></tr><tr><td><a href="https://developers.binance.com/docs/copy_trading" target="_blank" rel="noopener noreferrer">Copy Trading</a></td><td>Details on Copy Trading</td></tr><tr><td><a href="https://developers.binance.com/docs/derivatives/portfolio-margin-pro/general-info" target="_blank" rel="noopener noreferrer">Portfolio Margin Pro</a></td><td>Details on Portfolio Margin Pro</td></tr><tr><td><a href="https://developers.binance.com/docs/fiat" target="_blank" rel="noopener noreferrer">Fiat</a></td><td>Details on Fiat</td></tr><tr><td><a href="https://developers.binance.com/docs/c2c" target="_blank" rel="noopener noreferrer">C2C</a></td><td>Details on C2C</td></tr><tr><td><a href="https://developers.binance.com/docs/vip_loan" target="_blank" rel="noopener noreferrer">VIP Loan</a></td><td>Details on VIP Loan</td></tr><tr><td><a href="https://developers.binance.com/docs/crypto_loan" target="_blank" rel="noopener noreferrer">Crypto Loan</a></td><td>Details on Crypto Loan</td></tr><tr><td><a href="https://developers.binance.com/docs/binance-pay" target="_blank" rel="noopener noreferrer">Pay</a></td><td>Details on Binance Pay</td></tr><tr><td><a href="https://developers.binance.com/docs/convert" target="_blank" rel="noopener noreferrer">Convert</a></td><td>Details on Convert API</td></tr><tr><td><a href="https://developers.binance.com/docs/rebate" target="_blank" rel="noopener noreferrer">Rebate</a></td><td>Details on Spot Rebate</td></tr><tr><td><a href="https://developers.binance.com/docs/nft" target="_blank" rel="noopener noreferrer">NFT</a></td><td>Details on NFT requests</td></tr><tr><td><a href="https://developers.binance.com/docs/gift_card" target="_blank" rel="noopener noreferrer">Gift Card</a></td><td>Details on Gift Card API</td></tr></tbody></table>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="faq">FAQ<a class="hash-link" aria-label="Direct link to FAQ" title="Direct link to FAQ" href="/docs/binance-spot-api-docs/README#faq">​</a></h3>

























































<table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><a href="/docs/binance-spot-api-docs/faqs/api_key_types">api_key_types</a></td><td>API Key Types</td></tr><tr><td><a href="/docs/binance-spot-api-docs/faqs/spot_glossary">spot_glossary</a></td><td>Definition of terms used in the API</td></tr><tr><td><a href="/docs/binance-spot-api-docs/faqs/commission_faq">commission_faq</a></td><td>Explaining commission calculations on the API</td></tr><tr><td><a href="/docs/binance-spot-api-docs/faqs/trailing-stop-faq">trailing-stop-faq</a></td><td>Detailed Information on the behavior of Trailing Stops on the API</td></tr><tr><td><a href="/docs/binance-spot-api-docs/faqs/stp_faq">stp_faq</a></td><td>Detailed Information on the behavior of Self Trade Prevention (aka STP) on the API</td></tr><tr><td><a href="/docs/binance-spot-api-docs/faqs/market_orders_faq.md">market_orders_faq</a></td><td>Detailed information on the behavior of Market Orders</td></tr><tr><td><a href="/docs/binance-spot-api-docs/faqs/market_data_only">market-data-only</a></td><td>Information on our market data only API and WebSocket streams.</td></tr><tr><td><a href="/docs/binance-spot-api-docs/faqs/sor_faq">sor_faq</a></td><td>Smart Order Routing (SOR)</td></tr><tr><td><a href="/docs/binance-spot-api-docs/faqs/order_count_decrement">order_count_decrement</a></td><td>Updates to the Spot Order Count Limit Rules.</td></tr><tr><td><a href="/docs/binance-spot-api-docs/faqs/order_amend_keep_priority">order_amend_keep_priority</a></td><td>Detailed Information on the behavior of Order Amend Keep Priority</td></tr><tr><td><a href="/docs/binance-spot-api-docs/faqs/pegged_orders">pegged_orders</a></td><td>Detailed Information on Pegged Orders</td></tr><tr><td><a href="/docs/binance-spot-api-docs/faqs/sbe_faq">sbe_faq</a></td><td>Information on the implementation of Simple Binary Encoding (SBE) on the API</td></tr></tbody></table>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="change-log">Change log<a class="hash-link" aria-label="Direct link to Change log" title="Direct link to Change log" href="/docs/binance-spot-api-docs/README#change-log">​</a></h3>
<p>Please refer to <a href="/docs/binance-spot-api-docs/CHANGELOG">CHANGELOG</a> for latest changes on our APIs and Streamers.</p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="useful-resources">Useful Resources<a class="hash-link" aria-label="Direct link to Useful Resources" title="Direct link to Useful Resources" href="/docs/binance-spot-api-docs/README#useful-resources">​</a></h3>
<ul>
<li><a href="https://github.com/binance/binance-api-postman" target="_blank" rel="noopener noreferrer">Postman Collections</a>
<ul>
<li>Postman collections are available, and they are recommended for new users seeking a quick and easy start with the API.</li>
</ul>
</li>
<li>Connectors
<ul>
<li>The following are lightweight libraries that work as connectors to the Binance public API, written in different languages:
<ul>
<li><a href="https://github.com/binance/binance-connector-python" target="_blank" rel="noopener noreferrer">Python</a></li>
<li><a href="https://github.com/binance/binance-connector-node" target="_blank" rel="noopener noreferrer">Node.js</a></li>
<li><a href="https://github.com/binance/binance-connector-ruby" target="_blank" rel="noopener noreferrer">Ruby</a></li>
<li><a href="https://github.com/binance/binance-connector-dotnet" target="_blank" rel="noopener noreferrer">DotNET C#</a></li>
<li><a href="https://github.com/binance/binance-connector-java" target="_blank" rel="noopener noreferrer">Java</a></li>
<li><a href="https://github.com/binance/binance-spot-connector-rust" target="_blank" rel="noopener noreferrer">Rust</a></li>
<li><a href="https://github.com/binance/binance-connector-php" target="_blank" rel="noopener noreferrer">PHP</a></li>
<li><a href="https://github.com/binance/binance-connector-go" target="_blank" rel="noopener noreferrer">Go</a></li>
<li><a href="https://github.com/binance/binance-connector-typescript" target="_blank" rel="noopener noreferrer">TypeScript</a></li>
</ul>
</li>
</ul>
</li>
<li>FIX Connector - This provides access to the exchange using the FIX protocol.
<ul>
<li><a href="https://github.com/binance/binance-fix-connector-python" target="_blank" rel="noopener noreferrer">Python</a></li>
</ul>
</li>
<li><a href="https://github.com/binance/binance-api-swagger" target="_blank" rel="noopener noreferrer">Swagger</a>
<ul>
<li>A YAML file with OpenAPI specification for the RESTful API is available, along with a Swagger UI page for reference.</li>
</ul>
</li>
<li><a href="https://testnet.binance.vision/" target="_blank" rel="noopener noreferrer">Spot Testnet</a>
<ul>
<li>Users can use the SPOT Testnet to practice SPOT trading.</li>
<li>Currently, this is only available via the API.</li>
<li>Only endpoints starting with <code>/api/*</code> are supported, <code>/sapi/*</code> is not supported.</li>
</ul>
</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="contact-us">Contact Us<a class="hash-link" aria-label="Direct link to Contact Us" title="Direct link to Contact Us" href="/docs/binance-spot-api-docs/README#contact-us">​</a></h3>
<ul>
<li><a href="https://t.me/binance_api_english" target="_blank" rel="noopener noreferrer">Binance API Telegram Group</a>
<ul>
<li>For any questions regarding sudden drop in performance with the API and/or WebSockets.</li>
<li>For any general questions about the API not covered in the documentation.</li>
</ul>
</li>
<li><a href="https://dev.binance.vision/" target="_blank" rel="noopener noreferrer">Binance Developers</a>
<ul>
<li>For any questions/help regarding code implementation with API and/or WebSockets.</li>
</ul>
</li>
<li><a href="https://www.binance.com/en/support-center" target="_blank" rel="noopener noreferrer">Binance Customer Support</a>
<ul>
<li>For cases such as missing funds, help with 2FA, etc.</li>
</ul>
</li>
</ul></div></article><nav class="pagination-nav docusaurus-mt-lg" aria-label="Docs pages"><a class="pagination-nav__link pagination-nav__link--prev" href="/docs/binance-spot-api-docs"><div class="pagination-nav__sublabel">Previous</div><div class="pagination-nav__label">Changelog</div></a><a class="pagination-nav__link pagination-nav__link--next" href="/docs/binance-spot-api-docs/filters"><div class="pagination-nav__sublabel">Next</div><div class="pagination-nav__label">Filters</div></a></nav></div></div><div class="col col--3"><div class="tableOfContents_zXaw thin-scrollbar theme-doc-toc-desktop"><ul class="table-of-contents table-of-contents__left-border"><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/README#faq">FAQ</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/README#change-log">Change log</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/README#useful-resources">Useful Resources</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/README#contact-us">Contact Us</a></li></ul></div></div></div></div></main></div></div></div><footer class="footer footer--dark"><div class="container container-fluid"><div class="footer__bottom text--center"><div class="footer__copyright">Copyright © 2026 Binance.</div></div></div></footer></div>
</body>
</html>
