# binance-spot-api-docs/errors

> **Source:** https://developers.binance.com/docs/binance-spot-api-docs/errors

<!-- Raw HTML content from page -->
<!doctype html>
<html lang="en" dir="ltr" class="docs-wrapper plugin-docs plugin-id-default docs-version-current docs-doc-page docs-doc-id-binance-spot-api-docs/errors" data-has-hydrated="false">
<head>
<meta charset="UTF-8">
<meta name="generator" content="Docusaurus v3.4.0">
<title data-rh="true">Error | Binance Open Platform</title><meta data-rh="true" name="viewport" content="width=device-width,initial-scale=1"><meta data-rh="true" name="twitter:card" content="summary_large_image"><meta data-rh="true" property="og:url" content="https://developers.binance.com/docs/binance-spot-api-docs/errors"><meta data-rh="true" property="og:locale" content="en"><meta data-rh="true" property="og:locale:alternate" content="zh_CN"><meta data-rh="true" name="docusaurus_locale" content="en"><meta data-rh="true" name="docsearch:language" content="en"><meta data-rh="true" name="docusaurus_version" content="current"><meta data-rh="true" name="docusaurus_tag" content="docs-default-current"><meta data-rh="true" name="docsearch:version" content="current"><meta data-rh="true" name="docsearch:docusaurus_tag" content="docs-default-current"><meta data-rh="true" property="og:title" content="Error | Binance Open Platform"><meta data-rh="true" name="description" content="Errors consist of two parts: an error code and a message. Codes are universal,"><meta data-rh="true" property="og:description" content="Errors consist of two parts: an error code and a message. Codes are universal,"><link data-rh="true" rel="icon" href="/docs/img/favicon.png"><link data-rh="true" rel="canonical" href="https://developers.binance.com/docs/binance-spot-api-docs/errors"><link data-rh="true" rel="alternate" href="https://developers.binance.com/docs/binance-spot-api-docs/errors" hreflang="en"><link data-rh="true" rel="alternate" href="https://developers.binance.com/docs/zh-CN/binance-spot-api-docs/errors" hreflang="zh-CN"><link data-rh="true" rel="alternate" href="https://developers.binance.com/docs/binance-spot-api-docs/errors" hreflang="x-default"><link data-rh="true" rel="preconnect" href="https://9I0UZOBSWT-dsn.algolia.net" crossorigin="anonymous"><link rel="preconnect" href="https://www.googletagmanager.com">
<script>window.dataLayer=window.dataLayer||[]</script>
<script>!function(e,t,a,n,g){e[n]=e[n]||[],e[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var m=t.getElementsByTagName(a)[0],r=t.createElement(a);r.async=!0,r.src="https://www.googletagmanager.com/gtm.js?id=GTM-M86QHGF",m.parentNode.insertBefore(r,m)}(window,document,"script","dataLayer")</script>


<link rel="search" type="application/opensearchdescription+xml" title="Binance Open Platform" href="/docs/opensearch.xml"><link rel="stylesheet" href="/docs/assets/css/styles.65c537d6.css">
<script src="/docs/assets/js/runtime~main.beb17562.js" defer="defer"></script>
<script src="/docs/assets/js/main.c8dc629a.js" defer="defer"></script>
</head>
<body class="navigation-with-keyboard">
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M86QHGF" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

<script>!function(){function t(t){document.documentElement.setAttribute("data-theme",t)}var e=function(){try{return new URLSearchParams(window.location.search).get("docusaurus-theme")}catch(t){}}()||function(){try{return window.localStorage.getItem("theme")}catch(t){}}();t(null!==e?e:"light")}(),function(){try{const n=new URLSearchParams(window.location.search).entries();for(var[t,e]of n)if(t.startsWith("docusaurus-data-")){var a=t.replace("docusaurus-data-","data-");document.documentElement.setAttribute(a,e)}}catch(t){}}()</script><div id="__docusaurus"><div role="region" aria-label="Skip to main content"><a class="skipToContent_Mndp" href="#__docusaurus_skipToContent_fallback">Skip to main content</a></div><nav aria-label="Main" class="navbar navbar--fixed-top"><div class="navbar__inner"><div class="navbar__items"><button aria-label="Toggle navigation bar" aria-expanded="false" class="navbar__toggle clean-btn" type="button"><svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M4 7h22M4 15h22M4 23h22"></path></svg></button><a href="https://developers.binance.com/en" target="_self" rel="noopener noreferrer" class="navbar__brand"><div class="navbar__logo"><img src="/docs/img/logo.svg" alt="Binance Logo" class="themedComponent_abzR themedComponent--light_IjiB"><img src="/docs/img/logo.svg" alt="Binance Logo" class="themedComponent_abzR themedComponent--dark_O3Fz"></div></a><div class="productSelectorWrapper_kk2K"><div class="productSelector_tRKy"><button class="productSelectorButton_fwTp"><span>Products</span><span class="arrow_h6A6">▼</span></button></div></div></div><div class="navbar__items navbar__items--right"><div class="navbarSearchContainer_dCNk"><div class="searchContainer_RJ4l"><div class="searchWrapper_Bzvn"><button type="button" class="DocSearch DocSearch-Button" aria-label="Search"><span class="DocSearch-Button-Container"><svg width="20" height="20" class="DocSearch-Search-Icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="DocSearch-Button-Placeholder">Search</span></span><span class="DocSearch-Button-Keys"></span></button><div class="searchModeToggle__Af9"><div class="toggleTrack_B5pz"><button class="toggleOption_jECQ active_d_Ud" title="Search current documentation section">Current</button><button class="toggleOption_jECQ" title="Search all documentation">All</button></div></div></div></div></div><div class="navbar__item dropdown dropdown--hoverable dropdown--right"><a aria-haspopup="true" aria-expanded="false" role="button" class="navbar__link navbar_locale_dropdown" href="/docs/binance-spot-api-docs/errors"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" class="iconLanguage_JRss"><path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path></svg>English</a><ul class="dropdown__menu"><li><a href="/docs/binance-spot-api-docs/errors" target="_self" rel="noopener noreferrer" class="dropdown__link dropdown__link--active" lang="en">English</a></li><li><a href="/docs/zh-CN/binance-spot-api-docs/errors" target="_self" rel="noopener noreferrer" class="dropdown__link" lang="zh-CN">简体中文</a></li></ul></div><div class="toggle_OprV colorModeToggle_x44X"><button class="clean-btn toggleButton_g_ff toggleButtonDisabled_uc5P" type="button" disabled="" title="Switch between dark and light mode (currently light mode)" aria-label="Switch between dark and light mode (currently light mode)" aria-live="polite"><svg viewBox="0 0 24 24" width="24" height="24" class="lightToggleIcon_JliJ"><path fill="currentColor" d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"></path></svg><svg viewBox="0 0 24 24" width="24" height="24" class="darkToggleIcon_dakX"><path fill="currentColor" d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"></path></svg></button></div></div></div><div role="presentation" class="navbar-sidebar__backdrop"></div></nav><div id="__docusaurus_skipToContent_fallback" class="main-wrapper mainWrapper_BBNw"><div class="docsWrapper_dkrk"><button aria-label="Scroll back to top" class="clean-btn theme-back-to-top-button backToTopButton_m21v" type="button"></button><div class="docRoot_mtKm"><aside class="theme-doc-sidebar-container docSidebarContainer_Er1R"><div class="sidebarViewport_VgPy"><section class="productSelector_ky08"><span> <!-- -->Spot Trading<!-- --> </span></section><div class="sidebar_YPx9"><nav aria-label="Docs sidebar" class="menu thin-scrollbar menu_SCH5"><ul class="theme-doc-sidebar-menu menu__list"><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs">Changelog</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/README">Readme</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/filters">Filters</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/enums">Enums</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/rest-api/general-api-information">REST API</a></div></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/fix-api">FIX API</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/web-socket-streams">WebSocket Streams</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/sbe-market-data-streams">SBE Market Data</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/user-data-stream">User Data Stream</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/websocket-api/general-api-information">WebSocket API</a></div></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/PROD-TERMS-OF-USE">Terms of Use</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/testnet">Testnet</a></div></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/demo-mode">Demo Mode</a></div></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link menu__link--active" aria-current="page" href="/docs/binance-spot-api-docs/errors">Error</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/faqs/spot_glossary">FAQs</a></div></li></ul></nav></div></div></aside><main class="docMainContainer_jRkP"><div class="container padding-top--md padding-bottom--lg"><div class="row"><div class="col docItemCol_Xiwq"><div class="docItemContainer_JFP9"><article><nav class="theme-doc-breadcrumbs breadcrumbsContainer_tVzI" aria-label="Breadcrumbs"><ul class="breadcrumbs" itemscope="" itemtype="https://schema.org/BreadcrumbList"><li class="breadcrumbs__item"><a aria-label="Home page" class="breadcrumbs__link" href="/docs/"><svg viewBox="0 0 24 24" class="breadcrumbHomeIcon_yapy"><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" fill="currentColor"></path></svg></a></li><li itemscope="" itemprop="itemListElement" itemtype="https://schema.org/ListItem" class="breadcrumbs__item breadcrumbs__item--active"><span class="breadcrumbs__link" itemprop="name">Error</span><meta itemprop="position" content="1"></li></ul></nav><div class="tocCollapsible_Wlpy theme-doc-toc-mobile tocMobile_qs2S"><button type="button" class="clean-btn tocCollapsibleButton_niV5">On this page</button></div><div class="theme-doc-markdown markdown"><meta name="docsearch:sidebar" content="binance-spot-api-docs">
  
<h1>Error codes for Binance</h1>
<p>Errors consist of two parts: an error code and a message. Codes are universal,
but messages can vary. Here is the error JSON payload:</p>
<div class="language-javascript codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-javascript codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token punctuation" style="color:#393A34">{</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    </span><span class="token string-property property" style="color:#36acaa">&quot;code&quot;</span><span class="token operator" style="color:#393A34">:</span><span class="token plain"> </span><span class="token operator" style="color:#393A34">-</span><span class="token number" style="color:#36acaa">1121</span><span class="token punctuation" style="color:#393A34">,</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    </span><span class="token string-property property" style="color:#36acaa">&quot;msg&quot;</span><span class="token operator" style="color:#393A34">:</span><span class="token plain"> </span><span class="token string" style="color:#e3116c">&quot;Invalid symbol.&quot;</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"></span><span class="token punctuation" style="color:#393A34">}</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="10xx---general-server-or-network-issues">10xx - General Server or Network issues<a class="hash-link" aria-label="Direct link to 10xx - General Server or Network issues" title="Direct link to 10xx - General Server or Network issues" href="/docs/binance-spot-api-docs/errors#10xx---general-server-or-network-issues">​</a></h2>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1000-unknown">-1000 UNKNOWN<a class="hash-link" aria-label="Direct link to -1000 UNKNOWN" title="Direct link to -1000 UNKNOWN" href="/docs/binance-spot-api-docs/errors#-1000-unknown">​</a></h3>
<ul>
<li>An unknown error occurred while processing the request.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1001-disconnected">-1001 DISCONNECTED<a class="hash-link" aria-label="Direct link to -1001 DISCONNECTED" title="Direct link to -1001 DISCONNECTED" href="/docs/binance-spot-api-docs/errors#-1001-disconnected">​</a></h3>
<ul>
<li>Internal error; unable to process your request. Please try again.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1002-unauthorized">-1002 UNAUTHORIZED<a class="hash-link" aria-label="Direct link to -1002 UNAUTHORIZED" title="Direct link to -1002 UNAUTHORIZED" href="/docs/binance-spot-api-docs/errors#-1002-unauthorized">​</a></h3>
<ul>
<li>You are not authorized to execute this request.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1003-too_many_requests">-1003 TOO_MANY_REQUESTS<a class="hash-link" aria-label="Direct link to -1003 TOO_MANY_REQUESTS" title="Direct link to -1003 TOO_MANY_REQUESTS" href="/docs/binance-spot-api-docs/errors#-1003-too_many_requests">​</a></h3>
<ul>
<li>Too many requests queued.</li>
<li>Too much request weight used; current limit is %s request weight per %s. Please use WebSocket Streams for live updates to avoid polling the API.</li>
<li>Way too much request weight used; IP banned until %s. Please use WebSocket Streams for live updates to avoid bans.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1006-unexpected_resp">-1006 UNEXPECTED_RESP<a class="hash-link" aria-label="Direct link to -1006 UNEXPECTED_RESP" title="Direct link to -1006 UNEXPECTED_RESP" href="/docs/binance-spot-api-docs/errors#-1006-unexpected_resp">​</a></h3>
<ul>
<li>An unexpected response was received from the message bus. Execution status unknown.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1007-timeout">-1007 TIMEOUT<a class="hash-link" aria-label="Direct link to -1007 TIMEOUT" title="Direct link to -1007 TIMEOUT" href="/docs/binance-spot-api-docs/errors#-1007-timeout">​</a></h3>
<ul>
<li>Timeout waiting for response from backend server. Send status unknown; execution status unknown.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1008-server_busy">-1008 SERVER_BUSY<a class="hash-link" aria-label="Direct link to -1008 SERVER_BUSY" title="Direct link to -1008 SERVER_BUSY" href="/docs/binance-spot-api-docs/errors#-1008-server_busy">​</a></h3>
<ul>
<li>Server is currently overloaded with other requests. Please try again in a few minutes.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1013-invalid_message">-1013 INVALID_MESSAGE<a class="hash-link" aria-label="Direct link to -1013 INVALID_MESSAGE" title="Direct link to -1013 INVALID_MESSAGE" href="/docs/binance-spot-api-docs/errors#-1013-invalid_message">​</a></h3>
<ul>
<li>The request is rejected by the API. (i.e. The request didn&#x27;t reach the Matching Engine.)</li>
<li>Potential error messages can be found in <a href="/docs/binance-spot-api-docs/errors#filter-failures">Filter Failures</a> or <a href="/docs/binance-spot-api-docs/errors#other-errors">Failures during order placement</a>.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1014-unknown_order_composition">-1014 UNKNOWN_ORDER_COMPOSITION<a class="hash-link" aria-label="Direct link to -1014 UNKNOWN_ORDER_COMPOSITION" title="Direct link to -1014 UNKNOWN_ORDER_COMPOSITION" href="/docs/binance-spot-api-docs/errors#-1014-unknown_order_composition">​</a></h3>
<ul>
<li>Unsupported order combination.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1015-too_many_orders">-1015 TOO_MANY_ORDERS<a class="hash-link" aria-label="Direct link to -1015 TOO_MANY_ORDERS" title="Direct link to -1015 TOO_MANY_ORDERS" href="/docs/binance-spot-api-docs/errors#-1015-too_many_orders">​</a></h3>
<ul>
<li>Too many new orders.</li>
<li>Too many new orders; current limit is %s orders per %s.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1016-service_shutting_down">-1016 SERVICE_SHUTTING_DOWN<a class="hash-link" aria-label="Direct link to -1016 SERVICE_SHUTTING_DOWN" title="Direct link to -1016 SERVICE_SHUTTING_DOWN" href="/docs/binance-spot-api-docs/errors#-1016-service_shutting_down">​</a></h3>
<ul>
<li>This service is no longer available.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1020-unsupported_operation">-1020 UNSUPPORTED_OPERATION<a class="hash-link" aria-label="Direct link to -1020 UNSUPPORTED_OPERATION" title="Direct link to -1020 UNSUPPORTED_OPERATION" href="/docs/binance-spot-api-docs/errors#-1020-unsupported_operation">​</a></h3>
<ul>
<li>This operation is not supported.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1021-invalid_timestamp">-1021 INVALID_TIMESTAMP<a class="hash-link" aria-label="Direct link to -1021 INVALID_TIMESTAMP" title="Direct link to -1021 INVALID_TIMESTAMP" href="/docs/binance-spot-api-docs/errors#-1021-invalid_timestamp">​</a></h3>
<ul>
<li>Timestamp for this request is outside of the recvWindow.</li>
<li>Timestamp for this request was 1000ms ahead of the server&#x27;s time.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1022-invalid_signature">-1022 INVALID_SIGNATURE<a class="hash-link" aria-label="Direct link to -1022 INVALID_SIGNATURE" title="Direct link to -1022 INVALID_SIGNATURE" href="/docs/binance-spot-api-docs/errors#-1022-invalid_signature">​</a></h3>
<ul>
<li>Signature for this request is not valid.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1033-comp_id_in_use">-1033 COMP_ID_IN_USE<a class="hash-link" aria-label="Direct link to -1033 COMP_ID_IN_USE" title="Direct link to -1033 COMP_ID_IN_USE" href="/docs/binance-spot-api-docs/errors#-1033-comp_id_in_use">​</a></h3>
<ul>
<li><code>SenderCompId(49)</code> is currently in use. Concurrent use of the same SenderCompId within one account is not allowed.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1034-too_many_connections">-1034 TOO_MANY_CONNECTIONS<a class="hash-link" aria-label="Direct link to -1034 TOO_MANY_CONNECTIONS" title="Direct link to -1034 TOO_MANY_CONNECTIONS" href="/docs/binance-spot-api-docs/errors#-1034-too_many_connections">​</a></h3>
<ul>
<li>Too many concurrent connections; current limit is &#x27;%s&#x27;.</li>
<li>Too many connection attempts for account; current limit is %s per &#x27;%s&#x27;.</li>
<li>Too many connection attempts from IP; current limit is %s per &#x27;%s&#x27;.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1035-logged_out">-1035 LOGGED_OUT<a class="hash-link" aria-label="Direct link to -1035 LOGGED_OUT" title="Direct link to -1035 LOGGED_OUT" href="/docs/binance-spot-api-docs/errors#-1035-logged_out">​</a></h3>
<ul>
<li>Please send <a href="/docs/binance-spot-api-docs/fix-api#logout">Logout<code>&lt;5&gt;</code></a> message to close the session.</li>
</ul>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="11xx---request-issues">11xx - Request issues<a class="hash-link" aria-label="Direct link to 11xx - Request issues" title="Direct link to 11xx - Request issues" href="/docs/binance-spot-api-docs/errors#11xx---request-issues">​</a></h2>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1100-illegal_chars">-1100 ILLEGAL_CHARS<a class="hash-link" aria-label="Direct link to -1100 ILLEGAL_CHARS" title="Direct link to -1100 ILLEGAL_CHARS" href="/docs/binance-spot-api-docs/errors#-1100-illegal_chars">​</a></h3>
<ul>
<li>Illegal characters found in a parameter.</li>
<li>Illegal characters found in parameter &#x27;%s&#x27;; legal range is &#x27;%s&#x27;.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1101-too_many_parameters">-1101 TOO_MANY_PARAMETERS<a class="hash-link" aria-label="Direct link to -1101 TOO_MANY_PARAMETERS" title="Direct link to -1101 TOO_MANY_PARAMETERS" href="/docs/binance-spot-api-docs/errors#-1101-too_many_parameters">​</a></h3>
<ul>
<li>Too many parameters sent for this endpoint.</li>
<li>Too many parameters; expected &#x27;%s&#x27; and received &#x27;%s&#x27;.</li>
<li>Duplicate values for a parameter detected.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1102-mandatory_param_empty_or_malformed">-1102 MANDATORY_PARAM_EMPTY_OR_MALFORMED<a class="hash-link" aria-label="Direct link to -1102 MANDATORY_PARAM_EMPTY_OR_MALFORMED" title="Direct link to -1102 MANDATORY_PARAM_EMPTY_OR_MALFORMED" href="/docs/binance-spot-api-docs/errors#-1102-mandatory_param_empty_or_malformed">​</a></h3>
<ul>
<li>A mandatory parameter was not sent, was empty/null, or malformed.</li>
<li>Mandatory parameter &#x27;%s&#x27; was not sent, was empty/null, or malformed.</li>
<li>Param &#x27;%s&#x27; or &#x27;%s&#x27; must be sent, but both were empty/null!</li>
<li>Required tag &#x27;%s&#x27; missing.</li>
<li>Field value was empty or malformed.</li>
<li>&#x27;%s&#x27; contains unexpected value. Cannot be greater than %s.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1103-unknown_param">-1103 UNKNOWN_PARAM<a class="hash-link" aria-label="Direct link to -1103 UNKNOWN_PARAM" title="Direct link to -1103 UNKNOWN_PARAM" href="/docs/binance-spot-api-docs/errors#-1103-unknown_param">​</a></h3>
<ul>
<li>An unknown parameter was sent.</li>
<li>Undefined Tag.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1104-unread_parameters">-1104 UNREAD_PARAMETERS<a class="hash-link" aria-label="Direct link to -1104 UNREAD_PARAMETERS" title="Direct link to -1104 UNREAD_PARAMETERS" href="/docs/binance-spot-api-docs/errors#-1104-unread_parameters">​</a></h3>
<ul>
<li>Not all sent parameters were read.</li>
<li>Not all sent parameters were read; read &#x27;%s&#x27; parameter(s) but was sent &#x27;%s&#x27;.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1105-param_empty">-1105 PARAM_EMPTY<a class="hash-link" aria-label="Direct link to -1105 PARAM_EMPTY" title="Direct link to -1105 PARAM_EMPTY" href="/docs/binance-spot-api-docs/errors#-1105-param_empty">​</a></h3>
<ul>
<li>A parameter was empty.</li>
<li>Parameter &#x27;%s&#x27; was empty.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1106-param_not_required">-1106 PARAM_NOT_REQUIRED<a class="hash-link" aria-label="Direct link to -1106 PARAM_NOT_REQUIRED" title="Direct link to -1106 PARAM_NOT_REQUIRED" href="/docs/binance-spot-api-docs/errors#-1106-param_not_required">​</a></h3>
<ul>
<li>A parameter was sent when not required.</li>
<li>Parameter &#x27;%s&#x27; sent when not required.</li>
<li>A tag &#x27;%s&#x27; was sent when not required.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1108-param_overflow">-1108 PARAM_OVERFLOW<a class="hash-link" aria-label="Direct link to -1108 PARAM_OVERFLOW" title="Direct link to -1108 PARAM_OVERFLOW" href="/docs/binance-spot-api-docs/errors#-1108-param_overflow">​</a></h3>
<ul>
<li>Parameter &#x27;%s&#x27; overflowed.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1111-bad_precision">-1111 BAD_PRECISION<a class="hash-link" aria-label="Direct link to -1111 BAD_PRECISION" title="Direct link to -1111 BAD_PRECISION" href="/docs/binance-spot-api-docs/errors#-1111-bad_precision">​</a></h3>
<ul>
<li>Parameter &#x27;%s&#x27; has too much precision.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1112-no_depth">-1112 NO_DEPTH<a class="hash-link" aria-label="Direct link to -1112 NO_DEPTH" title="Direct link to -1112 NO_DEPTH" href="/docs/binance-spot-api-docs/errors#-1112-no_depth">​</a></h3>
<ul>
<li>No orders on book for symbol.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1114-tif_not_required">-1114 TIF_NOT_REQUIRED<a class="hash-link" aria-label="Direct link to -1114 TIF_NOT_REQUIRED" title="Direct link to -1114 TIF_NOT_REQUIRED" href="/docs/binance-spot-api-docs/errors#-1114-tif_not_required">​</a></h3>
<ul>
<li>TimeInForce parameter sent when not required.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1115-invalid_tif">-1115 INVALID_TIF<a class="hash-link" aria-label="Direct link to -1115 INVALID_TIF" title="Direct link to -1115 INVALID_TIF" href="/docs/binance-spot-api-docs/errors#-1115-invalid_tif">​</a></h3>
<ul>
<li>Invalid timeInForce.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1116-invalid_order_type">-1116 INVALID_ORDER_TYPE<a class="hash-link" aria-label="Direct link to -1116 INVALID_ORDER_TYPE" title="Direct link to -1116 INVALID_ORDER_TYPE" href="/docs/binance-spot-api-docs/errors#-1116-invalid_order_type">​</a></h3>
<ul>
<li>Invalid orderType.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1117-invalid_side">-1117 INVALID_SIDE<a class="hash-link" aria-label="Direct link to -1117 INVALID_SIDE" title="Direct link to -1117 INVALID_SIDE" href="/docs/binance-spot-api-docs/errors#-1117-invalid_side">​</a></h3>
<ul>
<li>Invalid side.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1118-empty_new_cl_ord_id">-1118 EMPTY_NEW_CL_ORD_ID<a class="hash-link" aria-label="Direct link to -1118 EMPTY_NEW_CL_ORD_ID" title="Direct link to -1118 EMPTY_NEW_CL_ORD_ID" href="/docs/binance-spot-api-docs/errors#-1118-empty_new_cl_ord_id">​</a></h3>
<ul>
<li>New client order ID was empty.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1119-empty_org_cl_ord_id">-1119 EMPTY_ORG_CL_ORD_ID<a class="hash-link" aria-label="Direct link to -1119 EMPTY_ORG_CL_ORD_ID" title="Direct link to -1119 EMPTY_ORG_CL_ORD_ID" href="/docs/binance-spot-api-docs/errors#-1119-empty_org_cl_ord_id">​</a></h3>
<ul>
<li>Original client order ID was empty.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1120-bad_interval">-1120 BAD_INTERVAL<a class="hash-link" aria-label="Direct link to -1120 BAD_INTERVAL" title="Direct link to -1120 BAD_INTERVAL" href="/docs/binance-spot-api-docs/errors#-1120-bad_interval">​</a></h3>
<ul>
<li>Invalid interval.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1121-bad_symbol">-1121 BAD_SYMBOL<a class="hash-link" aria-label="Direct link to -1121 BAD_SYMBOL" title="Direct link to -1121 BAD_SYMBOL" href="/docs/binance-spot-api-docs/errors#-1121-bad_symbol">​</a></h3>
<ul>
<li>Invalid symbol.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1122-invalid_symbolstatus">-1122 INVALID_SYMBOLSTATUS<a class="hash-link" aria-label="Direct link to -1122 INVALID_SYMBOLSTATUS" title="Direct link to -1122 INVALID_SYMBOLSTATUS" href="/docs/binance-spot-api-docs/errors#-1122-invalid_symbolstatus">​</a></h3>
<ul>
<li>Invalid symbolStatus.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1125-invalid_listen_key">-1125 INVALID_LISTEN_KEY<a class="hash-link" aria-label="Direct link to -1125 INVALID_LISTEN_KEY" title="Direct link to -1125 INVALID_LISTEN_KEY" href="/docs/binance-spot-api-docs/errors#-1125-invalid_listen_key">​</a></h3>
<ul>
<li>This listenKey does not exist.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1127-more_than_xx_hours">-1127 MORE_THAN_XX_HOURS<a class="hash-link" aria-label="Direct link to -1127 MORE_THAN_XX_HOURS" title="Direct link to -1127 MORE_THAN_XX_HOURS" href="/docs/binance-spot-api-docs/errors#-1127-more_than_xx_hours">​</a></h3>
<ul>
<li>Lookup interval is too big.</li>
<li>More than %s hours between startTime and endTime.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1128-optional_params_bad_combo">-1128 OPTIONAL_PARAMS_BAD_COMBO<a class="hash-link" aria-label="Direct link to -1128 OPTIONAL_PARAMS_BAD_COMBO" title="Direct link to -1128 OPTIONAL_PARAMS_BAD_COMBO" href="/docs/binance-spot-api-docs/errors#-1128-optional_params_bad_combo">​</a></h3>
<ul>
<li>Combination of optional parameters invalid.</li>
<li>Combination of optional fields invalid. Recommendation: &#x27;%s&#x27; and &#x27;%s&#x27; must both be sent.</li>
<li>Fields [%s] must be sent together or omitted entirely.</li>
<li>Invalid <code>MDEntryType (269)</code> combination. BID and OFFER must be requested together.</li>
<li>Conflicting fields: [&#x27;%s&#x27;...]</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1130-invalid_parameter">-1130 INVALID_PARAMETER<a class="hash-link" aria-label="Direct link to -1130 INVALID_PARAMETER" title="Direct link to -1130 INVALID_PARAMETER" href="/docs/binance-spot-api-docs/errors#-1130-invalid_parameter">​</a></h3>
<ul>
<li>Invalid data sent for a parameter.</li>
<li>Data sent for parameter &#x27;%s&#x27; is not valid.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1134-bad_strategy_type">-1134 BAD_STRATEGY_TYPE<a class="hash-link" aria-label="Direct link to -1134 BAD_STRATEGY_TYPE" title="Direct link to -1134 BAD_STRATEGY_TYPE" href="/docs/binance-spot-api-docs/errors#-1134-bad_strategy_type">​</a></h3>
<ul>
<li><code>strategyType</code> was less than 1000000.</li>
<li><code>TargetStrategy (847)</code> was less than 1000000.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1135-invalid_json">-1135 INVALID_JSON<a class="hash-link" aria-label="Direct link to -1135 INVALID_JSON" title="Direct link to -1135 INVALID_JSON" href="/docs/binance-spot-api-docs/errors#-1135-invalid_json">​</a></h3>
<ul>
<li>Invalid JSON Request</li>
<li>JSON sent for parameter &#x27;%s&#x27; is not valid</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1139-invalid_ticker_type">-1139 INVALID_TICKER_TYPE<a class="hash-link" aria-label="Direct link to -1139 INVALID_TICKER_TYPE" title="Direct link to -1139 INVALID_TICKER_TYPE" href="/docs/binance-spot-api-docs/errors#-1139-invalid_ticker_type">​</a></h3>
<ul>
<li>Invalid ticker type.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1145-invalid_cancel_restrictions">-1145 INVALID_CANCEL_RESTRICTIONS<a class="hash-link" aria-label="Direct link to -1145 INVALID_CANCEL_RESTRICTIONS" title="Direct link to -1145 INVALID_CANCEL_RESTRICTIONS" href="/docs/binance-spot-api-docs/errors#-1145-invalid_cancel_restrictions">​</a></h3>
<ul>
<li><code>cancelRestrictions</code> has to be either <code>ONLY_NEW</code> or <code>ONLY_PARTIALLY_FILLED</code>.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1151-duplicate_symbols">-1151 DUPLICATE_SYMBOLS<a class="hash-link" aria-label="Direct link to -1151 DUPLICATE_SYMBOLS" title="Direct link to -1151 DUPLICATE_SYMBOLS" href="/docs/binance-spot-api-docs/errors#-1151-duplicate_symbols">​</a></h3>
<ul>
<li>Symbol is present multiple times in the list.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1152-invalid_sbe_header">-1152 INVALID_SBE_HEADER<a class="hash-link" aria-label="Direct link to -1152 INVALID_SBE_HEADER" title="Direct link to -1152 INVALID_SBE_HEADER" href="/docs/binance-spot-api-docs/errors#-1152-invalid_sbe_header">​</a></h3>
<ul>
<li>Invalid <code>X-MBX-SBE</code> header; expected <code>&lt;SCHEMA_ID&gt;:&lt;VERSION&gt;</code>.</li>
<li>Invalid SBE message header.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1153-unsupported_schema_id">-1153 UNSUPPORTED_SCHEMA_ID<a class="hash-link" aria-label="Direct link to -1153 UNSUPPORTED_SCHEMA_ID" title="Direct link to -1153 UNSUPPORTED_SCHEMA_ID" href="/docs/binance-spot-api-docs/errors#-1153-unsupported_schema_id">​</a></h3>
<ul>
<li>Unsupported SBE schema ID or version specified in the <code>X-MBX-SBE</code> header.</li>
<li>Invalid SBE schema ID or version specified.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1155-sbe_disabled">-1155 SBE_DISABLED<a class="hash-link" aria-label="Direct link to -1155 SBE_DISABLED" title="Direct link to -1155 SBE_DISABLED" href="/docs/binance-spot-api-docs/errors#-1155-sbe_disabled">​</a></h3>
<ul>
<li>SBE is not enabled.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1158-oco_order_type_rejected">-1158 OCO_ORDER_TYPE_REJECTED<a class="hash-link" aria-label="Direct link to -1158 OCO_ORDER_TYPE_REJECTED" title="Direct link to -1158 OCO_ORDER_TYPE_REJECTED" href="/docs/binance-spot-api-docs/errors#-1158-oco_order_type_rejected">​</a></h3>
<ul>
<li>Order type not supported in OCO.</li>
<li>If the order type provided in the <code>aboveType</code> and/or <code>belowType</code> is not supported.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1160-oco_icebergqty_timeinforce">-1160 OCO_ICEBERGQTY_TIMEINFORCE<a class="hash-link" aria-label="Direct link to -1160 OCO_ICEBERGQTY_TIMEINFORCE" title="Direct link to -1160 OCO_ICEBERGQTY_TIMEINFORCE" href="/docs/binance-spot-api-docs/errors#-1160-oco_icebergqty_timeinforce">​</a></h3>
<ul>
<li>Parameter &#x27;%s&#x27; is not supported if <code>aboveTimeInForce</code>/<code>belowTimeInForce</code> is not GTC.</li>
<li>If the order type for the above or below leg is <code>STOP_LOSS_LIMIT</code>, and <code>icebergQty</code> is provided for that leg, the <code>timeInForce</code> has to be <code>GTC</code> else it will throw an error.</li>
<li><code>TimeInForce (59)</code> must be <code>GTC (1)</code> when <code>MaxFloor (111)</code> is used.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1161-deprecated_schema">-1161 DEPRECATED_SCHEMA<a class="hash-link" aria-label="Direct link to -1161 DEPRECATED_SCHEMA" title="Direct link to -1161 DEPRECATED_SCHEMA" href="/docs/binance-spot-api-docs/errors#-1161-deprecated_schema">​</a></h3>
<ul>
<li>Unable to encode the response in SBE schema &#x27;x&#x27;. Please use schema &#x27;y&#x27; or higher.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1165-buy_oco_limit_must_be_below">-1165 BUY_OCO_LIMIT_MUST_BE_BELOW<a class="hash-link" aria-label="Direct link to -1165 BUY_OCO_LIMIT_MUST_BE_BELOW" title="Direct link to -1165 BUY_OCO_LIMIT_MUST_BE_BELOW" href="/docs/binance-spot-api-docs/errors#-1165-buy_oco_limit_must_be_below">​</a></h3>
<ul>
<li>A limit order in a buy OCO must be below.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1166-sell_oco_limit_must_be_above">-1166 SELL_OCO_LIMIT_MUST_BE_ABOVE<a class="hash-link" aria-label="Direct link to -1166 SELL_OCO_LIMIT_MUST_BE_ABOVE" title="Direct link to -1166 SELL_OCO_LIMIT_MUST_BE_ABOVE" href="/docs/binance-spot-api-docs/errors#-1166-sell_oco_limit_must_be_above">​</a></h3>
<ul>
<li>A limit order in a sell OCO must be above.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1168-both_oco_orders_cannot_be_limit">-1168 BOTH_OCO_ORDERS_CANNOT_BE_LIMIT<a class="hash-link" aria-label="Direct link to -1168 BOTH_OCO_ORDERS_CANNOT_BE_LIMIT" title="Direct link to -1168 BOTH_OCO_ORDERS_CANNOT_BE_LIMIT" href="/docs/binance-spot-api-docs/errors#-1168-both_oco_orders_cannot_be_limit">​</a></h3>
<ul>
<li>At least one OCO order must be contingent.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1169-invalid_tag_number">-1169 INVALID_TAG_NUMBER<a class="hash-link" aria-label="Direct link to -1169 INVALID_TAG_NUMBER" title="Direct link to -1169 INVALID_TAG_NUMBER" href="/docs/binance-spot-api-docs/errors#-1169-invalid_tag_number">​</a></h3>
<ul>
<li>Invalid tag number.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1170-tag_not_defined_in_message">-1170 TAG_NOT_DEFINED_IN_MESSAGE<a class="hash-link" aria-label="Direct link to -1170 TAG_NOT_DEFINED_IN_MESSAGE" title="Direct link to -1170 TAG_NOT_DEFINED_IN_MESSAGE" href="/docs/binance-spot-api-docs/errors#-1170-tag_not_defined_in_message">​</a></h3>
<ul>
<li>Tag &#x27;%s&#x27; not defined for this message type.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1171-tag_appears_more_than_once">-1171 TAG_APPEARS_MORE_THAN_ONCE<a class="hash-link" aria-label="Direct link to -1171 TAG_APPEARS_MORE_THAN_ONCE" title="Direct link to -1171 TAG_APPEARS_MORE_THAN_ONCE" href="/docs/binance-spot-api-docs/errors#-1171-tag_appears_more_than_once">​</a></h3>
<ul>
<li>Tag &#x27;%s&#x27; appears more than once.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1172-tag_out_of_order">-1172 TAG_OUT_OF_ORDER<a class="hash-link" aria-label="Direct link to -1172 TAG_OUT_OF_ORDER" title="Direct link to -1172 TAG_OUT_OF_ORDER" href="/docs/binance-spot-api-docs/errors#-1172-tag_out_of_order">​</a></h3>
<ul>
<li>Tag &#x27;%s&#x27; specified out of required order.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1173-group_fields_out_of_order">-1173 GROUP_FIELDS_OUT_OF_ORDER<a class="hash-link" aria-label="Direct link to -1173 GROUP_FIELDS_OUT_OF_ORDER" title="Direct link to -1173 GROUP_FIELDS_OUT_OF_ORDER" href="/docs/binance-spot-api-docs/errors#-1173-group_fields_out_of_order">​</a></h3>
<ul>
<li>Repeating group &#x27;%s&#x27; fields out of order.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1174-invalid_component">-1174 INVALID_COMPONENT<a class="hash-link" aria-label="Direct link to -1174 INVALID_COMPONENT" title="Direct link to -1174 INVALID_COMPONENT" href="/docs/binance-spot-api-docs/errors#-1174-invalid_component">​</a></h3>
<ul>
<li>Component &#x27;%s&#x27; is incorrectly populated on &#x27;%s&#x27; order. Recommendation: &#x27;%s&#x27;</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1175-reset_seq_num_support">-1175 RESET_SEQ_NUM_SUPPORT<a class="hash-link" aria-label="Direct link to -1175 RESET_SEQ_NUM_SUPPORT" title="Direct link to -1175 RESET_SEQ_NUM_SUPPORT" href="/docs/binance-spot-api-docs/errors#-1175-reset_seq_num_support">​</a></h3>
<ul>
<li>Continuation of sequence numbers to new session is currently unsupported. Sequence numbers must be reset for each new session.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1176-already_logged_in">-1176 ALREADY_LOGGED_IN<a class="hash-link" aria-label="Direct link to -1176 ALREADY_LOGGED_IN" title="Direct link to -1176 ALREADY_LOGGED_IN" href="/docs/binance-spot-api-docs/errors#-1176-already_logged_in">​</a></h3>
<ul>
<li><a href="/docs/binance-spot-api-docs/fix-api#logon-main">Logon<code>&lt;A&gt;</code></a> should only be sent once.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1177-garbled_message">-1177 GARBLED_MESSAGE<a class="hash-link" aria-label="Direct link to -1177 GARBLED_MESSAGE" title="Direct link to -1177 GARBLED_MESSAGE" href="/docs/binance-spot-api-docs/errors#-1177-garbled_message">​</a></h3>
<ul>
<li><code>CheckSum(10)</code> contains an incorrect value.</li>
<li><code>BeginString (8)</code> is not the first tag in a message.</li>
<li><code>MsgType (35)</code> is not the third tag in a message.</li>
<li><code>BodyLength (9)</code> does not contain the correct byte count.</li>
<li>Only printable ASCII characters and SOH (Start of Header) are allowed.</li>
<li>Tag specified without a value.</li>
<li>Invalid encodingType.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1178-bad_sender_compid">-1178 BAD_SENDER_COMPID<a class="hash-link" aria-label="Direct link to -1178 BAD_SENDER_COMPID" title="Direct link to -1178 BAD_SENDER_COMPID" href="/docs/binance-spot-api-docs/errors#-1178-bad_sender_compid">​</a></h3>
<ul>
<li><code>SenderCompId(49)</code> contains an incorrect value. The SenderCompID value should not change throughout the lifetime of a session.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1179-bad_seq_num">-1179 BAD_SEQ_NUM<a class="hash-link" aria-label="Direct link to -1179 BAD_SEQ_NUM" title="Direct link to -1179 BAD_SEQ_NUM" href="/docs/binance-spot-api-docs/errors#-1179-bad_seq_num">​</a></h3>
<ul>
<li><code>MsgSeqNum(34)</code> contains an unexpected value. Expected: &#x27;%d&#x27;.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1180-expected_logon">-1180 EXPECTED_LOGON<a class="hash-link" aria-label="Direct link to -1180 EXPECTED_LOGON" title="Direct link to -1180 EXPECTED_LOGON" href="/docs/binance-spot-api-docs/errors#-1180-expected_logon">​</a></h3>
<ul>
<li><a href="/docs/binance-spot-api-docs/fix-api#logon-main">Logon<code>&lt;A&gt;</code></a> must be the first message in the session.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1181-too_many_messages">-1181 TOO_MANY_MESSAGES<a class="hash-link" aria-label="Direct link to -1181 TOO_MANY_MESSAGES" title="Direct link to -1181 TOO_MANY_MESSAGES" href="/docs/binance-spot-api-docs/errors#-1181-too_many_messages">​</a></h3>
<ul>
<li>Too many messages; current limit is &#x27;%d&#x27; messages per &#x27;%s&#x27;.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1182-params_bad_combo">-1182 PARAMS_BAD_COMBO<a class="hash-link" aria-label="Direct link to -1182 PARAMS_BAD_COMBO" title="Direct link to -1182 PARAMS_BAD_COMBO" href="/docs/binance-spot-api-docs/errors#-1182-params_bad_combo">​</a></h3>
<ul>
<li>Conflicting fields: [%s]</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1183-not_allowed_in_drop_copy_sessions">-1183 NOT_ALLOWED_IN_DROP_COPY_SESSIONS<a class="hash-link" aria-label="Direct link to -1183 NOT_ALLOWED_IN_DROP_COPY_SESSIONS" title="Direct link to -1183 NOT_ALLOWED_IN_DROP_COPY_SESSIONS" href="/docs/binance-spot-api-docs/errors#-1183-not_allowed_in_drop_copy_sessions">​</a></h3>
<ul>
<li>Requested operation is not allowed in DropCopy sessions.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1184-drop_copy_session_not_allowed">-1184 DROP_COPY_SESSION_NOT_ALLOWED<a class="hash-link" aria-label="Direct link to -1184 DROP_COPY_SESSION_NOT_ALLOWED" title="Direct link to -1184 DROP_COPY_SESSION_NOT_ALLOWED" href="/docs/binance-spot-api-docs/errors#-1184-drop_copy_session_not_allowed">​</a></h3>
<ul>
<li>DropCopy sessions are not supported on this server. Please reconnect to a drop copy server.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1185-drop_copy_session_required">-1185 DROP_COPY_SESSION_REQUIRED<a class="hash-link" aria-label="Direct link to -1185 DROP_COPY_SESSION_REQUIRED" title="Direct link to -1185 DROP_COPY_SESSION_REQUIRED" href="/docs/binance-spot-api-docs/errors#-1185-drop_copy_session_required">​</a></h3>
<ul>
<li>Only DropCopy sessions are supported on this server. Either reconnect to order entry server or send <code>DropCopyFlag (9406)</code> field.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1186-not_allowed_in_order_entry_sessions">-1186 NOT_ALLOWED_IN_ORDER_ENTRY_SESSIONS<a class="hash-link" aria-label="Direct link to -1186 NOT_ALLOWED_IN_ORDER_ENTRY_SESSIONS" title="Direct link to -1186 NOT_ALLOWED_IN_ORDER_ENTRY_SESSIONS" href="/docs/binance-spot-api-docs/errors#-1186-not_allowed_in_order_entry_sessions">​</a></h3>
<ul>
<li>Requested operation is not allowed in order entry sessions.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1187-not_allowed_in_market_data_sessions">-1187 NOT_ALLOWED_IN_MARKET_DATA_SESSIONS<a class="hash-link" aria-label="Direct link to -1187 NOT_ALLOWED_IN_MARKET_DATA_SESSIONS" title="Direct link to -1187 NOT_ALLOWED_IN_MARKET_DATA_SESSIONS" href="/docs/binance-spot-api-docs/errors#-1187-not_allowed_in_market_data_sessions">​</a></h3>
<ul>
<li>Requested operation is not allowed in market data sessions.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1188-incorrect_num_in_group_count">-1188 INCORRECT_NUM_IN_GROUP_COUNT<a class="hash-link" aria-label="Direct link to -1188 INCORRECT_NUM_IN_GROUP_COUNT" title="Direct link to -1188 INCORRECT_NUM_IN_GROUP_COUNT" href="/docs/binance-spot-api-docs/errors#-1188-incorrect_num_in_group_count">​</a></h3>
<ul>
<li>Incorrect NumInGroup count for repeating group &#x27;%s&#x27;.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1189-duplicate_entries_in_a_group">-1189 DUPLICATE_ENTRIES_IN_A_GROUP<a class="hash-link" aria-label="Direct link to -1189 DUPLICATE_ENTRIES_IN_A_GROUP" title="Direct link to -1189 DUPLICATE_ENTRIES_IN_A_GROUP" href="/docs/binance-spot-api-docs/errors#-1189-duplicate_entries_in_a_group">​</a></h3>
<ul>
<li>Group &#x27;%s&#x27; contains duplicate entries.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1190-invalid_request_id">-1190 INVALID_REQUEST_ID<a class="hash-link" aria-label="Direct link to -1190 INVALID_REQUEST_ID" title="Direct link to -1190 INVALID_REQUEST_ID" href="/docs/binance-spot-api-docs/errors#-1190-invalid_request_id">​</a></h3>
<ul>
<li><code>MDReqID (262)</code> contains a subscription request id that is already in use on this connection.</li>
<li><code>MDReqID (262)</code> contains an unsubscription request id that does not match any active subscription.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1191-too_many_subscriptions">-1191 TOO_MANY_SUBSCRIPTIONS<a class="hash-link" aria-label="Direct link to -1191 TOO_MANY_SUBSCRIPTIONS" title="Direct link to -1191 TOO_MANY_SUBSCRIPTIONS" href="/docs/binance-spot-api-docs/errors#-1191-too_many_subscriptions">​</a></h3>
<ul>
<li>Too many subscriptions. Connection may create up to &#x27;%s&#x27; subscriptions at a time.</li>
<li>Similar subscription is already active on this connection. Symbol=&#x27;%s&#x27;, active subscription id: &#x27;%s&#x27;.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1194-invalid_time_unit">-1194 INVALID_TIME_UNIT<a class="hash-link" aria-label="Direct link to -1194 INVALID_TIME_UNIT" title="Direct link to -1194 INVALID_TIME_UNIT" href="/docs/binance-spot-api-docs/errors#-1194-invalid_time_unit">​</a></h3>
<ul>
<li>Invalid value for time unit; expected either MICROSECOND or MILLISECOND.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1196-buy_oco_stop_loss_must_be_above">-1196 BUY_OCO_STOP_LOSS_MUST_BE_ABOVE<a class="hash-link" aria-label="Direct link to -1196 BUY_OCO_STOP_LOSS_MUST_BE_ABOVE" title="Direct link to -1196 BUY_OCO_STOP_LOSS_MUST_BE_ABOVE" href="/docs/binance-spot-api-docs/errors#-1196-buy_oco_stop_loss_must_be_above">​</a></h3>
<ul>
<li>A stop loss order in a buy OCO must be above.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1197-sell_oco_stop_loss_must_be_below">-1197 SELL_OCO_STOP_LOSS_MUST_BE_BELOW<a class="hash-link" aria-label="Direct link to -1197 SELL_OCO_STOP_LOSS_MUST_BE_BELOW" title="Direct link to -1197 SELL_OCO_STOP_LOSS_MUST_BE_BELOW" href="/docs/binance-spot-api-docs/errors#-1197-sell_oco_stop_loss_must_be_below">​</a></h3>
<ul>
<li>A stop loss order in a sell OCO must be below.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1198-buy_oco_take_profit_must_be_below">-1198 BUY_OCO_TAKE_PROFIT_MUST_BE_BELOW<a class="hash-link" aria-label="Direct link to -1198 BUY_OCO_TAKE_PROFIT_MUST_BE_BELOW" title="Direct link to -1198 BUY_OCO_TAKE_PROFIT_MUST_BE_BELOW" href="/docs/binance-spot-api-docs/errors#-1198-buy_oco_take_profit_must_be_below">​</a></h3>
<ul>
<li>A take profit order in a buy OCO must be below.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1199-sell_oco_take_profit_must_be_above">-1199 SELL_OCO_TAKE_PROFIT_MUST_BE_ABOVE<a class="hash-link" aria-label="Direct link to -1199 SELL_OCO_TAKE_PROFIT_MUST_BE_ABOVE" title="Direct link to -1199 SELL_OCO_TAKE_PROFIT_MUST_BE_ABOVE" href="/docs/binance-spot-api-docs/errors#-1199-sell_oco_take_profit_must_be_above">​</a></h3>
<ul>
<li>A take profit order in a sell OCO must be above.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1210-invalid_peg_price_type">-1210 INVALID_PEG_PRICE_TYPE<a class="hash-link" aria-label="Direct link to -1210 INVALID_PEG_PRICE_TYPE" title="Direct link to -1210 INVALID_PEG_PRICE_TYPE" href="/docs/binance-spot-api-docs/errors#-1210-invalid_peg_price_type">​</a></h3>
<ul>
<li>Invalid pegPriceType.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1211-invalid_peg_offset_type">-1211 INVALID_PEG_OFFSET_TYPE<a class="hash-link" aria-label="Direct link to -1211 INVALID_PEG_OFFSET_TYPE" title="Direct link to -1211 INVALID_PEG_OFFSET_TYPE" href="/docs/binance-spot-api-docs/errors#-1211-invalid_peg_offset_type">​</a></h3>
<ul>
<li>Invalid pegOffsetType.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1220-symbol_does_not_match_status">-1220 SYMBOL_DOES_NOT_MATCH_STATUS<a class="hash-link" aria-label="Direct link to -1220 SYMBOL_DOES_NOT_MATCH_STATUS" title="Direct link to -1220 SYMBOL_DOES_NOT_MATCH_STATUS" href="/docs/binance-spot-api-docs/errors#-1220-symbol_does_not_match_status">​</a></h3>
<ul>
<li>The symbol&#x27;s status does not match the requested symbolStatus.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1221-invalid_sbe_message_field">-1221 INVALID_SBE_MESSAGE_FIELD<a class="hash-link" aria-label="Direct link to -1221 INVALID_SBE_MESSAGE_FIELD" title="Direct link to -1221 INVALID_SBE_MESSAGE_FIELD" href="/docs/binance-spot-api-docs/errors#-1221-invalid_sbe_message_field">​</a></h3>
<ul>
<li>Invalid/missing field(s) in SBE message.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1222-opo_working_must_be_buy">-1222 OPO_WORKING_MUST_BE_BUY<a class="hash-link" aria-label="Direct link to -1222 OPO_WORKING_MUST_BE_BUY" title="Direct link to -1222 OPO_WORKING_MUST_BE_BUY" href="/docs/binance-spot-api-docs/errors#-1222-opo_working_must_be_buy">​</a></h3>
<ul>
<li>Working order in an OPO list must be a bid.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1223-opo_pending_must_be_sell">-1223 OPO_PENDING_MUST_BE_SELL<a class="hash-link" aria-label="Direct link to -1223 OPO_PENDING_MUST_BE_SELL" title="Direct link to -1223 OPO_PENDING_MUST_BE_SELL" href="/docs/binance-spot-api-docs/errors#-1223-opo_pending_must_be_sell">​</a></h3>
<ul>
<li>Pending orders in an OPO list must be asks.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1224-working_param_required">-1224 WORKING_PARAM_REQUIRED<a class="hash-link" aria-label="Direct link to -1224 WORKING_PARAM_REQUIRED" title="Direct link to -1224 WORKING_PARAM_REQUIRED" href="/docs/binance-spot-api-docs/errors#-1224-working_param_required">​</a></h3>
<ul>
<li>Working order must include the &#x27;{param}&#x27; tag.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-1225-pending_param_not_required">-1225 PENDING_PARAM_NOT_REQUIRED<a class="hash-link" aria-label="Direct link to -1225 PENDING_PARAM_NOT_REQUIRED" title="Direct link to -1225 PENDING_PARAM_NOT_REQUIRED" href="/docs/binance-spot-api-docs/errors#-1225-pending_param_not_required">​</a></h3>
<ul>
<li>Pending orders should not include the &#x27;%s&#x27; tag.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-2010-new_order_rejected">-2010 NEW_ORDER_REJECTED<a class="hash-link" aria-label="Direct link to -2010 NEW_ORDER_REJECTED" title="Direct link to -2010 NEW_ORDER_REJECTED" href="/docs/binance-spot-api-docs/errors#-2010-new_order_rejected">​</a></h3>
<ul>
<li>NEW_ORDER_REJECTED</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-2011-cancel_rejected">-2011 CANCEL_REJECTED<a class="hash-link" aria-label="Direct link to -2011 CANCEL_REJECTED" title="Direct link to -2011 CANCEL_REJECTED" href="/docs/binance-spot-api-docs/errors#-2011-cancel_rejected">​</a></h3>
<ul>
<li>CANCEL_REJECTED</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-2013-no_such_order">-2013 NO_SUCH_ORDER<a class="hash-link" aria-label="Direct link to -2013 NO_SUCH_ORDER" title="Direct link to -2013 NO_SUCH_ORDER" href="/docs/binance-spot-api-docs/errors#-2013-no_such_order">​</a></h3>
<ul>
<li>Order does not exist.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-2014-bad_api_key_fmt">-2014 BAD_API_KEY_FMT<a class="hash-link" aria-label="Direct link to -2014 BAD_API_KEY_FMT" title="Direct link to -2014 BAD_API_KEY_FMT" href="/docs/binance-spot-api-docs/errors#-2014-bad_api_key_fmt">​</a></h3>
<ul>
<li>API-key format invalid.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-2015-rejected_mbx_key">-2015 REJECTED_MBX_KEY<a class="hash-link" aria-label="Direct link to -2015 REJECTED_MBX_KEY" title="Direct link to -2015 REJECTED_MBX_KEY" href="/docs/binance-spot-api-docs/errors#-2015-rejected_mbx_key">​</a></h3>
<ul>
<li>Invalid API-key, IP, or permissions for action.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-2016-no_trading_window">-2016 NO_TRADING_WINDOW<a class="hash-link" aria-label="Direct link to -2016 NO_TRADING_WINDOW" title="Direct link to -2016 NO_TRADING_WINDOW" href="/docs/binance-spot-api-docs/errors#-2016-no_trading_window">​</a></h3>
<ul>
<li>No trading window could be found for the symbol. Try ticker/24hrs instead.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-2026-order_archived">-2026 ORDER_ARCHIVED<a class="hash-link" aria-label="Direct link to -2026 ORDER_ARCHIVED" title="Direct link to -2026 ORDER_ARCHIVED" href="/docs/binance-spot-api-docs/errors#-2026-order_archived">​</a></h3>
<ul>
<li>Order was canceled or expired with no executed qty over 90 days ago and has been archived.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-2035-subscription_active">-2035 SUBSCRIPTION_ACTIVE<a class="hash-link" aria-label="Direct link to -2035 SUBSCRIPTION_ACTIVE" title="Direct link to -2035 SUBSCRIPTION_ACTIVE" href="/docs/binance-spot-api-docs/errors#-2035-subscription_active">​</a></h3>
<ul>
<li>User Data Stream subscription already active.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-2036-subscription_inactive">-2036 SUBSCRIPTION_INACTIVE<a class="hash-link" aria-label="Direct link to -2036 SUBSCRIPTION_INACTIVE" title="Direct link to -2036 SUBSCRIPTION_INACTIVE" href="/docs/binance-spot-api-docs/errors#-2036-subscription_inactive">​</a></h3>
<ul>
<li>User Data Stream subscription not active.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-2039-client_order_id_invalid">-2039 CLIENT_ORDER_ID_INVALID<a class="hash-link" aria-label="Direct link to -2039 CLIENT_ORDER_ID_INVALID" title="Direct link to -2039 CLIENT_ORDER_ID_INVALID" href="/docs/binance-spot-api-docs/errors#-2039-client_order_id_invalid">​</a></h3>
<ul>
<li>Client order ID is not correct for this order ID.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-2042-maximum_subscription_ids">-2042 MAXIMUM_SUBSCRIPTION_IDS<a class="hash-link" aria-label="Direct link to -2042 MAXIMUM_SUBSCRIPTION_IDS" title="Direct link to -2042 MAXIMUM_SUBSCRIPTION_IDS" href="/docs/binance-spot-api-docs/errors#-2042-maximum_subscription_ids">​</a></h3>
<ul>
<li>Maximum subscription ID reached for this connection.</li>
</ul>
<p><a id="other-errors"></a></p>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="messages-for--1010-error_msg_received--2010-new_order_rejected--2011-cancel_rejected-and--2038-order_amend_rejected">Messages for -1010 ERROR_MSG_RECEIVED, -2010 NEW_ORDER_REJECTED, -2011 CANCEL_REJECTED, and -2038 ORDER_AMEND_REJECTED<a class="hash-link" aria-label="Direct link to Messages for -1010 ERROR_MSG_RECEIVED, -2010 NEW_ORDER_REJECTED, -2011 CANCEL_REJECTED, and -2038 ORDER_AMEND_REJECTED" title="Direct link to Messages for -1010 ERROR_MSG_RECEIVED, -2010 NEW_ORDER_REJECTED, -2011 CANCEL_REJECTED, and -2038 ORDER_AMEND_REJECTED" href="/docs/binance-spot-api-docs/errors#messages-for--1010-error_msg_received--2010-new_order_rejected--2011-cancel_rejected-and--2038-order_amend_rejected">​</a></h2>
<p>This code is sent when an error has been returned by the matching engine.
The following messages which will indicate the specific error:</p>









































































































































































<table><thead><tr><th>Error message</th><th>Description</th></tr></thead><tbody><tr><td>&quot;Unknown order sent.&quot;</td><td>The order (by either <code>orderId</code>, <code>clOrdId</code>, <code>origClOrdId</code>) could not be found.</td></tr><tr><td>&quot;Duplicate order sent.&quot;</td><td>The <code>clOrdId</code> is already in use.</td></tr><tr><td>&quot;Market is closed.&quot;</td><td>The symbol is not trading.</td></tr><tr><td>&quot;Account has insufficient balance for requested action.&quot;</td><td>Not enough funds to complete the action.</td></tr><tr><td>&quot;Market orders are not supported for this symbol.&quot;</td><td><code>MARKET</code> is not enabled on the symbol.</td></tr><tr><td>&quot;Iceberg orders are not supported for this symbol.&quot;</td><td><code>icebergQty</code> is not enabled on the symbol.</td></tr><tr><td>&quot;Stop loss orders are not supported for this symbol.&quot;</td><td><code>STOP_LOSS</code> is not enabled on the symbol.</td></tr><tr><td>&quot;Stop loss limit orders are not supported for this symbol.&quot;</td><td><code>STOP_LOSS_LIMIT</code> is not enabled on the symbol.</td></tr><tr><td>&quot;Take profit orders are not supported for this symbol.&quot;</td><td><code>TAKE_PROFIT</code> is not enabled on the symbol.</td></tr><tr><td>&quot;Take profit limit orders are not supported for this symbol.&quot;</td><td><code>TAKE_PROFIT_LIMIT</code> is not enabled on the symbol.</td></tr><tr><td>&quot;Order amend is not supported for this symbol.&quot;</td><td>Order amend keep priority is not enabled on the symbol.</td></tr><tr><td>&quot;Price * QTY is zero or less.&quot;</td><td><code>price</code> * <code>quantity</code> is too low.</td></tr><tr><td>&quot;IcebergQty exceeds QTY.&quot;</td><td><code>icebergQty</code> must be less than the order quantity.</td></tr><tr><td>&quot;This action is disabled on this account.&quot;</td><td>Contact customer support; some actions have been disabled on the account.</td></tr><tr><td>&quot;This account may not place or cancel orders.&quot;</td><td>Contact customer support; the account has trading ability disabled.</td></tr><tr><td>&quot;Unsupported order combination&quot;</td><td>The <code>orderType</code>, <code>timeInForce</code>, <code>stopPrice</code>, and/or <code>icebergQty</code> combination isn&#x27;t allowed.</td></tr><tr><td>&quot;Order would trigger immediately.&quot;</td><td>The order&#x27;s stop price is not valid when compared to the last traded price.</td></tr><tr><td>&quot;Cancel order is invalid. Check origClOrdId and orderId.&quot;</td><td>No <code>origClOrdId</code> or <code>orderId</code> was sent in.</td></tr><tr><td>&quot;Order would immediately match and take.&quot;</td><td><code>LIMIT_MAKER</code> order type would immediately match and trade, and not be a pure maker order.</td></tr><tr><td>&quot;The relationship of the prices for the orders is not correct.&quot;</td><td>The prices set in the <code>OCO</code> is breaking the Price restrictions. <br> For reference: <br> <code>BUY</code> : <code>LIMIT_MAKER</code> <code>price</code> &lt; Last Traded Price &lt; <code>stopPrice</code> <br><code>SELL</code> : <code>LIMIT_MAKER</code> <code>price</code> &gt; Last Traded Price &gt; <code>stopPrice</code></td></tr><tr><td>&quot;OCO orders are not supported for this symbol&quot;</td><td><code>OCO</code> is not enabled on the symbol.</td></tr><tr><td>&quot;Quote order qty market orders are not support for this symbol.&quot;</td><td><code>MARKET</code> orders using the parameter <code>quoteOrderQty</code> are not enabled on the symbol.</td></tr><tr><td>&quot;Trailing stop orders are not supported for this symbol.&quot;</td><td>Orders using <code>trailingDelta</code> are not enabled on the symbol.</td></tr><tr><td>&quot;Order cancel-replace is not supported for this symbol.&quot;</td><td><code>POST /api/v3/order/cancelReplace</code> (REST API) or <code>order.cancelReplace</code> (WebSocket API) is not enabled on the symbol.</td></tr><tr><td>&quot;This symbol is not permitted for this account.&quot;</td><td>Account and symbol do not have the same permissions. (e.g. <code>SPOT</code>, <code>MARGIN</code>, etc)</td></tr><tr><td>&quot;This symbol is restricted for this account.&quot;</td><td>Account is unable to trade on that symbol. (e.g. An <code>ISOLATED_MARGIN</code> account cannot place <code>SPOT</code> orders.)</td></tr><tr><td>&quot;Order was not canceled due to cancel restrictions.&quot;</td><td>Either <code>cancelRestrictions</code> was set to <code>ONLY_NEW</code> but the order status was not <code>NEW</code> <br> or <br> <code>cancelRestrictions</code> was set to <code>ONLY_PARTIALLY_FILLED</code> but the order status was not <code>PARTIALLY_FILLED</code>.</td></tr><tr><td>&quot;Rest API trading is not enabled.&quot; / &quot;WebSocket API trading is not enabled.&quot;</td><td>Order is being placed or a server that is not configured to allow access to <code>TRADE</code> endpoints.</td></tr><tr><td>&quot;FIX API trading is not enabled.</td><td>Order is placed on a FIX server that is not TRADE enabled.</td></tr><tr><td>&quot;Order book liquidity is less than <code>LOT_SIZE</code> filter minimum quantity.&quot;</td><td>Quote quantity market orders cannot be placed when the order book liquidity is less than minimum quantity configured for the <code>LOT_SIZE</code> filter.</td></tr><tr><td>&quot;Order book liquidity is less than <code>MARKET_LOT_SIZE</code> filter minimum quantity.&quot;</td><td>Quote quantity market orders cannot be placed when the order book liquidity is less than the minimum quantity for <code>MARKET_LOT_SIZE</code> filter.</td></tr><tr><td>&quot;Order book liquidity is less than symbol minimum quantity.&quot;</td><td>Quote quantity market orders cannot be placed when there are no orders on the book.</td></tr><tr><td>&quot;Order amend (quantity increase) is not supported.&quot;</td><td><code>newQty</code> must be less than the order quantity.</td></tr><tr><td>&quot;The requested action would change no state; rejecting&quot;.</td><td>The request sent would not have changed the status quo.<br><br>(e.g. <code>newQty</code> cannot equal the order quantity.)</td></tr><tr><td>&quot;Pegged orders are not supported for this symbol.&quot;</td><td><code>pegInstructionsAllowed</code> has not been enabled.</td></tr><tr><td>&quot;This order type may not use pegged price.&quot;</td><td>You are using parameter <code>pegPriceType</code> with an unsupported order type. (e.g. <code>MARKET</code>)</td></tr><tr><td>&quot;This price peg cannot be used with this order type.&quot;</td><td>You are using <code>pegPriceType</code>=<code>MARKET_PEG</code> for a <code>LIMIT_MAKER</code> order.</td></tr><tr><td>&quot;Order book liquidity is too low for this pegged order.&quot;</td><td>The order book doesn’t have the best price level to peg the price to.</td></tr><tr><td>OPO orders are not supported for this symbol.</td><td></td></tr><tr><td>Order amend (pending OPO order) is not supported.</td><td>You cannot amend the pending quantity of an OPO order</td></tr></tbody></table>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="errors-regarding-placing-orders-via-cancelreplace">Errors regarding placing orders via cancelReplace<a class="hash-link" aria-label="Direct link to Errors regarding placing orders via cancelReplace" title="Direct link to Errors regarding placing orders via cancelReplace" href="/docs/binance-spot-api-docs/errors#errors-regarding-placing-orders-via-cancelreplace">​</a></h2>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-2021-order-cancel-replace-partially-failed">-2021 Order cancel-replace partially failed<a class="hash-link" aria-label="Direct link to -2021 Order cancel-replace partially failed" title="Direct link to -2021 Order cancel-replace partially failed" href="/docs/binance-spot-api-docs/errors#-2021-order-cancel-replace-partially-failed">​</a></h3>
<ul>
<li>This code is sent when either the cancellation of the order failed or the new order placement failed but not both.</li>
</ul>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="-2022-order-cancel-replace-failed">-2022 Order cancel-replace failed.<a class="hash-link" aria-label="Direct link to -2022 Order cancel-replace failed." title="Direct link to -2022 Order cancel-replace failed." href="/docs/binance-spot-api-docs/errors#-2022-order-cancel-replace-failed">​</a></h3>
<ul>
<li>This code is sent when both the cancellation of the order failed and the new order placement failed.</li>
</ul>
<p><a id="filter_failures"></a></p>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="filter-failures">Filter failures<a class="hash-link" aria-label="Direct link to Filter failures" title="Direct link to Filter failures" href="/docs/binance-spot-api-docs/errors#filter-failures">​</a></h2>

















































































<table><thead><tr><th>Error message</th><th>Description</th></tr></thead><tbody><tr><td>&quot;Filter failure: PRICE_FILTER&quot;</td><td><code>price</code> is too high, too low, and/or not following the tick size rule for the symbol.</td></tr><tr><td>&quot;Filter failure: PERCENT_PRICE&quot;</td><td><code>price</code> is X% too high or X% too low from the average weighted price over the last Y minutes.</td></tr><tr><td>&quot;Filter failure: LOT_SIZE&quot;</td><td><code>quantity</code> is too high, too low, and/or not following the step size rule for the symbol.</td></tr><tr><td>&quot;Filter failure: MIN_NOTIONAL&quot;</td><td><code>price</code> * <code>quantity</code> is too low to be a valid order for the symbol.</td></tr><tr><td>&quot;Filter failure: NOTIONAL&quot;</td><td><code>price</code> * <code>quantity</code> is not within range of the <code>minNotional</code> and <code>maxNotional</code></td></tr><tr><td>&quot;Filter failure: ICEBERG_PARTS&quot;</td><td><code>ICEBERG</code> order would break into too many parts; icebergQty is too small.</td></tr><tr><td>&quot;Filter failure: MARKET_LOT_SIZE&quot;</td><td><code>MARKET</code> order&#x27;s <code>quantity</code> is too high, too low, and/or not following the step size rule for the symbol.</td></tr><tr><td>&quot;Filter failure: MAX_POSITION&quot;</td><td>The account&#x27;s position has reached the maximum defined limit. <br> This is composed of the sum of the balance of the base asset, and the sum of the quantity of all open <code>BUY</code> orders.</td></tr><tr><td>&quot;Filter failure: MAX_NUM_ORDERS&quot;</td><td>Account has too many open orders on the symbol.</td></tr><tr><td>&quot;Filter failure: MAX_NUM_ALGO_ORDERS&quot;</td><td>Account has too many open stop loss and/or take profit orders on the symbol.</td></tr><tr><td>&quot;Filter failure: MAX_NUM_ICEBERG_ORDERS&quot;</td><td>Account has too many open iceberg orders on the symbol.</td></tr><tr><td>&quot;Filter failure: MAX_NUM_ORDER_AMENDS&quot;</td><td>Account has made too many amendments to a single order on the symbol.</td></tr><tr><td>&quot;Filter failure: MAX_NUM_ORDER_LISTS&quot;</td><td>Account has too many open order lists on the symbol.</td></tr><tr><td>&quot;Filter failure: TRAILING_DELTA&quot;</td><td><code>trailingDelta</code> is not within the defined range of the filter for that order type.</td></tr><tr><td>&quot;Filter failure: EXCHANGE_MAX_NUM_ORDERS&quot;</td><td>Account has too many open orders on the exchange.</td></tr><tr><td>&quot;Filter failure: EXCHANGE_MAX_NUM_ALGO_ORDERS&quot;</td><td>Account has too many open stop loss and/or take profit orders on the exchange.</td></tr><tr><td>&quot;Filter failure: EXCHANGE_MAX_NUM_ICEBERG_ORDERS&quot;</td><td>Account has too many open iceberg orders on the exchange.</td></tr><tr><td>&quot;Filter failure: EXCHANGE_MAX_NUM_ORDER_LISTS&quot;</td><td>Account has too many open order lists on the exchange.</td></tr></tbody></table></div></article><nav class="pagination-nav docusaurus-mt-lg" aria-label="Docs pages"><a class="pagination-nav__link pagination-nav__link--prev" href="/docs/binance-spot-api-docs/demo-mode/DEMO-TERMS-OF-USE"><div class="pagination-nav__sublabel">Previous</div><div class="pagination-nav__label">Demo Mode Terms of Use</div></a><a class="pagination-nav__link pagination-nav__link--next" href="/docs/binance-spot-api-docs/faqs/spot_glossary"><div class="pagination-nav__sublabel">Next</div><div class="pagination-nav__label">Spot Glossary</div></a></nav></div></div><div class="col col--3"><div class="tableOfContents_zXaw thin-scrollbar theme-doc-toc-desktop"><ul class="table-of-contents table-of-contents__left-border"><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#10xx---general-server-or-network-issues">10xx - General Server or Network issues</a><ul><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1000-unknown">-1000 UNKNOWN</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1001-disconnected">-1001 DISCONNECTED</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1002-unauthorized">-1002 UNAUTHORIZED</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1003-too_many_requests">-1003 TOO_MANY_REQUESTS</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1006-unexpected_resp">-1006 UNEXPECTED_RESP</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1007-timeout">-1007 TIMEOUT</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1008-server_busy">-1008 SERVER_BUSY</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1013-invalid_message">-1013 INVALID_MESSAGE</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1014-unknown_order_composition">-1014 UNKNOWN_ORDER_COMPOSITION</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1015-too_many_orders">-1015 TOO_MANY_ORDERS</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1016-service_shutting_down">-1016 SERVICE_SHUTTING_DOWN</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1020-unsupported_operation">-1020 UNSUPPORTED_OPERATION</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1021-invalid_timestamp">-1021 INVALID_TIMESTAMP</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1022-invalid_signature">-1022 INVALID_SIGNATURE</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1033-comp_id_in_use">-1033 COMP_ID_IN_USE</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1034-too_many_connections">-1034 TOO_MANY_CONNECTIONS</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1035-logged_out">-1035 LOGGED_OUT</a></li></ul></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#11xx---request-issues">11xx - Request issues</a><ul><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1100-illegal_chars">-1100 ILLEGAL_CHARS</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1101-too_many_parameters">-1101 TOO_MANY_PARAMETERS</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1102-mandatory_param_empty_or_malformed">-1102 MANDATORY_PARAM_EMPTY_OR_MALFORMED</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1103-unknown_param">-1103 UNKNOWN_PARAM</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1104-unread_parameters">-1104 UNREAD_PARAMETERS</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1105-param_empty">-1105 PARAM_EMPTY</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1106-param_not_required">-1106 PARAM_NOT_REQUIRED</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1108-param_overflow">-1108 PARAM_OVERFLOW</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1111-bad_precision">-1111 BAD_PRECISION</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1112-no_depth">-1112 NO_DEPTH</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1114-tif_not_required">-1114 TIF_NOT_REQUIRED</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1115-invalid_tif">-1115 INVALID_TIF</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1116-invalid_order_type">-1116 INVALID_ORDER_TYPE</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1117-invalid_side">-1117 INVALID_SIDE</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1118-empty_new_cl_ord_id">-1118 EMPTY_NEW_CL_ORD_ID</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1119-empty_org_cl_ord_id">-1119 EMPTY_ORG_CL_ORD_ID</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1120-bad_interval">-1120 BAD_INTERVAL</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1121-bad_symbol">-1121 BAD_SYMBOL</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1122-invalid_symbolstatus">-1122 INVALID_SYMBOLSTATUS</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1125-invalid_listen_key">-1125 INVALID_LISTEN_KEY</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1127-more_than_xx_hours">-1127 MORE_THAN_XX_HOURS</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1128-optional_params_bad_combo">-1128 OPTIONAL_PARAMS_BAD_COMBO</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1130-invalid_parameter">-1130 INVALID_PARAMETER</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1134-bad_strategy_type">-1134 BAD_STRATEGY_TYPE</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1135-invalid_json">-1135 INVALID_JSON</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1139-invalid_ticker_type">-1139 INVALID_TICKER_TYPE</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1145-invalid_cancel_restrictions">-1145 INVALID_CANCEL_RESTRICTIONS</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1151-duplicate_symbols">-1151 DUPLICATE_SYMBOLS</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1152-invalid_sbe_header">-1152 INVALID_SBE_HEADER</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1153-unsupported_schema_id">-1153 UNSUPPORTED_SCHEMA_ID</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1155-sbe_disabled">-1155 SBE_DISABLED</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1158-oco_order_type_rejected">-1158 OCO_ORDER_TYPE_REJECTED</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1160-oco_icebergqty_timeinforce">-1160 OCO_ICEBERGQTY_TIMEINFORCE</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1161-deprecated_schema">-1161 DEPRECATED_SCHEMA</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1165-buy_oco_limit_must_be_below">-1165 BUY_OCO_LIMIT_MUST_BE_BELOW</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1166-sell_oco_limit_must_be_above">-1166 SELL_OCO_LIMIT_MUST_BE_ABOVE</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1168-both_oco_orders_cannot_be_limit">-1168 BOTH_OCO_ORDERS_CANNOT_BE_LIMIT</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1169-invalid_tag_number">-1169 INVALID_TAG_NUMBER</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1170-tag_not_defined_in_message">-1170 TAG_NOT_DEFINED_IN_MESSAGE</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1171-tag_appears_more_than_once">-1171 TAG_APPEARS_MORE_THAN_ONCE</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1172-tag_out_of_order">-1172 TAG_OUT_OF_ORDER</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1173-group_fields_out_of_order">-1173 GROUP_FIELDS_OUT_OF_ORDER</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1174-invalid_component">-1174 INVALID_COMPONENT</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1175-reset_seq_num_support">-1175 RESET_SEQ_NUM_SUPPORT</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1176-already_logged_in">-1176 ALREADY_LOGGED_IN</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1177-garbled_message">-1177 GARBLED_MESSAGE</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1178-bad_sender_compid">-1178 BAD_SENDER_COMPID</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1179-bad_seq_num">-1179 BAD_SEQ_NUM</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1180-expected_logon">-1180 EXPECTED_LOGON</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1181-too_many_messages">-1181 TOO_MANY_MESSAGES</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1182-params_bad_combo">-1182 PARAMS_BAD_COMBO</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1183-not_allowed_in_drop_copy_sessions">-1183 NOT_ALLOWED_IN_DROP_COPY_SESSIONS</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1184-drop_copy_session_not_allowed">-1184 DROP_COPY_SESSION_NOT_ALLOWED</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1185-drop_copy_session_required">-1185 DROP_COPY_SESSION_REQUIRED</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1186-not_allowed_in_order_entry_sessions">-1186 NOT_ALLOWED_IN_ORDER_ENTRY_SESSIONS</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1187-not_allowed_in_market_data_sessions">-1187 NOT_ALLOWED_IN_MARKET_DATA_SESSIONS</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1188-incorrect_num_in_group_count">-1188 INCORRECT_NUM_IN_GROUP_COUNT</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1189-duplicate_entries_in_a_group">-1189 DUPLICATE_ENTRIES_IN_A_GROUP</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1190-invalid_request_id">-1190 INVALID_REQUEST_ID</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1191-too_many_subscriptions">-1191 TOO_MANY_SUBSCRIPTIONS</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1194-invalid_time_unit">-1194 INVALID_TIME_UNIT</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1196-buy_oco_stop_loss_must_be_above">-1196 BUY_OCO_STOP_LOSS_MUST_BE_ABOVE</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1197-sell_oco_stop_loss_must_be_below">-1197 SELL_OCO_STOP_LOSS_MUST_BE_BELOW</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1198-buy_oco_take_profit_must_be_below">-1198 BUY_OCO_TAKE_PROFIT_MUST_BE_BELOW</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1199-sell_oco_take_profit_must_be_above">-1199 SELL_OCO_TAKE_PROFIT_MUST_BE_ABOVE</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1210-invalid_peg_price_type">-1210 INVALID_PEG_PRICE_TYPE</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1211-invalid_peg_offset_type">-1211 INVALID_PEG_OFFSET_TYPE</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1220-symbol_does_not_match_status">-1220 SYMBOL_DOES_NOT_MATCH_STATUS</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1221-invalid_sbe_message_field">-1221 INVALID_SBE_MESSAGE_FIELD</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1222-opo_working_must_be_buy">-1222 OPO_WORKING_MUST_BE_BUY</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1223-opo_pending_must_be_sell">-1223 OPO_PENDING_MUST_BE_SELL</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1224-working_param_required">-1224 WORKING_PARAM_REQUIRED</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-1225-pending_param_not_required">-1225 PENDING_PARAM_NOT_REQUIRED</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-2010-new_order_rejected">-2010 NEW_ORDER_REJECTED</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-2011-cancel_rejected">-2011 CANCEL_REJECTED</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-2013-no_such_order">-2013 NO_SUCH_ORDER</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-2014-bad_api_key_fmt">-2014 BAD_API_KEY_FMT</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-2015-rejected_mbx_key">-2015 REJECTED_MBX_KEY</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-2016-no_trading_window">-2016 NO_TRADING_WINDOW</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-2026-order_archived">-2026 ORDER_ARCHIVED</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-2035-subscription_active">-2035 SUBSCRIPTION_ACTIVE</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-2036-subscription_inactive">-2036 SUBSCRIPTION_INACTIVE</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-2039-client_order_id_invalid">-2039 CLIENT_ORDER_ID_INVALID</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-2042-maximum_subscription_ids">-2042 MAXIMUM_SUBSCRIPTION_IDS</a></li></ul></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#messages-for--1010-error_msg_received--2010-new_order_rejected--2011-cancel_rejected-and--2038-order_amend_rejected">Messages for -1010 ERROR_MSG_RECEIVED, -2010 NEW_ORDER_REJECTED, -2011 CANCEL_REJECTED, and -2038 ORDER_AMEND_REJECTED</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#errors-regarding-placing-orders-via-cancelreplace">Errors regarding placing orders via cancelReplace</a><ul><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-2021-order-cancel-replace-partially-failed">-2021 Order cancel-replace partially failed</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#-2022-order-cancel-replace-failed">-2022 Order cancel-replace failed.</a></li></ul></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/errors#filter-failures">Filter failures</a></li></ul></div></div></div></div></main></div></div></div><footer class="footer footer--dark"><div class="container container-fluid"><div class="footer__bottom text--center"><div class="footer__copyright">Copyright © 2026 Binance.</div></div></div></footer></div>
</body>
</html>
