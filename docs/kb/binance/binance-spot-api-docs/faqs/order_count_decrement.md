# binance-spot-api-docs/faqs/order_count_decrement

> **Source:** https://developers.binance.com/docs/binance-spot-api-docs/faqs/order_count_decrement

<!-- Raw HTML content from page -->
<!doctype html>
<html lang="en" dir="ltr" class="docs-wrapper plugin-docs plugin-id-default docs-version-current docs-doc-page docs-doc-id-binance-spot-api-docs/faqs/order_count_decrement" data-has-hydrated="false">
<head>
<meta charset="UTF-8">
<meta name="generator" content="Docusaurus v3.4.0">
<title data-rh="true">Order Count Decrement | Binance Open Platform</title><meta data-rh="true" name="viewport" content="width=device-width,initial-scale=1"><meta data-rh="true" name="twitter:card" content="summary_large_image"><meta data-rh="true" property="og:url" content="https://developers.binance.com/docs/binance-spot-api-docs/faqs/order_count_decrement"><meta data-rh="true" property="og:locale" content="en"><meta data-rh="true" property="og:locale:alternate" content="zh_CN"><meta data-rh="true" name="docusaurus_locale" content="en"><meta data-rh="true" name="docsearch:language" content="en"><meta data-rh="true" name="docusaurus_version" content="current"><meta data-rh="true" name="docusaurus_tag" content="docs-default-current"><meta data-rh="true" name="docsearch:version" content="current"><meta data-rh="true" name="docsearch:docusaurus_tag" content="docs-default-current"><meta data-rh="true" property="og:title" content="Order Count Decrement | Binance Open Platform"><meta data-rh="true" name="description" content="To ensure a fair and orderly Spot market, we limit the rate at which new orders may be placed."><meta data-rh="true" property="og:description" content="To ensure a fair and orderly Spot market, we limit the rate at which new orders may be placed."><link data-rh="true" rel="icon" href="/docs/img/favicon.png"><link data-rh="true" rel="canonical" href="https://developers.binance.com/docs/binance-spot-api-docs/faqs/order_count_decrement"><link data-rh="true" rel="alternate" href="https://developers.binance.com/docs/binance-spot-api-docs/faqs/order_count_decrement" hreflang="en"><link data-rh="true" rel="alternate" href="https://developers.binance.com/docs/zh-CN/binance-spot-api-docs/faqs/order_count_decrement" hreflang="zh-CN"><link data-rh="true" rel="alternate" href="https://developers.binance.com/docs/binance-spot-api-docs/faqs/order_count_decrement" hreflang="x-default"><link data-rh="true" rel="preconnect" href="https://9I0UZOBSWT-dsn.algolia.net" crossorigin="anonymous"><link rel="preconnect" href="https://www.googletagmanager.com">
<script>window.dataLayer=window.dataLayer||[]</script>
<script>!function(e,t,a,n,g){e[n]=e[n]||[],e[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var m=t.getElementsByTagName(a)[0],r=t.createElement(a);r.async=!0,r.src="https://www.googletagmanager.com/gtm.js?id=GTM-M86QHGF",m.parentNode.insertBefore(r,m)}(window,document,"script","dataLayer")</script>


<link rel="search" type="application/opensearchdescription+xml" title="Binance Open Platform" href="/docs/opensearch.xml"><link rel="stylesheet" href="/docs/assets/css/styles.65c537d6.css">
<script src="/docs/assets/js/runtime~main.beb17562.js" defer="defer"></script>
<script src="/docs/assets/js/main.c8dc629a.js" defer="defer"></script>
</head>
<body class="navigation-with-keyboard">
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M86QHGF" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

<script>!function(){function t(t){document.documentElement.setAttribute("data-theme",t)}var e=function(){try{return new URLSearchParams(window.location.search).get("docusaurus-theme")}catch(t){}}()||function(){try{return window.localStorage.getItem("theme")}catch(t){}}();t(null!==e?e:"light")}(),function(){try{const n=new URLSearchParams(window.location.search).entries();for(var[t,e]of n)if(t.startsWith("docusaurus-data-")){var a=t.replace("docusaurus-data-","data-");document.documentElement.setAttribute(a,e)}}catch(t){}}()</script><div id="__docusaurus"><div role="region" aria-label="Skip to main content"><a class="skipToContent_Mndp" href="#__docusaurus_skipToContent_fallback">Skip to main content</a></div><nav aria-label="Main" class="navbar navbar--fixed-top"><div class="navbar__inner"><div class="navbar__items"><button aria-label="Toggle navigation bar" aria-expanded="false" class="navbar__toggle clean-btn" type="button"><svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M4 7h22M4 15h22M4 23h22"></path></svg></button><a href="https://developers.binance.com/en" target="_self" rel="noopener noreferrer" class="navbar__brand"><div class="navbar__logo"><img src="/docs/img/logo.svg" alt="Binance Logo" class="themedComponent_abzR themedComponent--light_IjiB"><img src="/docs/img/logo.svg" alt="Binance Logo" class="themedComponent_abzR themedComponent--dark_O3Fz"></div></a><div class="productSelectorWrapper_kk2K"><div class="productSelector_tRKy"><button class="productSelectorButton_fwTp"><span>Products</span><span class="arrow_h6A6">▼</span></button></div></div></div><div class="navbar__items navbar__items--right"><div class="navbarSearchContainer_dCNk"><div class="searchContainer_RJ4l"><div class="searchWrapper_Bzvn"><button type="button" class="DocSearch DocSearch-Button" aria-label="Search"><span class="DocSearch-Button-Container"><svg width="20" height="20" class="DocSearch-Search-Icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="DocSearch-Button-Placeholder">Search</span></span><span class="DocSearch-Button-Keys"></span></button><div class="searchModeToggle__Af9"><div class="toggleTrack_B5pz"><button class="toggleOption_jECQ active_d_Ud" title="Search current documentation section">Current</button><button class="toggleOption_jECQ" title="Search all documentation">All</button></div></div></div></div></div><div class="navbar__item dropdown dropdown--hoverable dropdown--right"><a aria-haspopup="true" aria-expanded="false" role="button" class="navbar__link navbar_locale_dropdown" href="/docs/binance-spot-api-docs/faqs/order_count_decrement"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" class="iconLanguage_JRss"><path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path></svg>English</a><ul class="dropdown__menu"><li><a href="/docs/binance-spot-api-docs/faqs/order_count_decrement" target="_self" rel="noopener noreferrer" class="dropdown__link dropdown__link--active" lang="en">English</a></li><li><a href="/docs/zh-CN/binance-spot-api-docs/faqs/order_count_decrement" target="_self" rel="noopener noreferrer" class="dropdown__link" lang="zh-CN">简体中文</a></li></ul></div><div class="toggle_OprV colorModeToggle_x44X"><button class="clean-btn toggleButton_g_ff toggleButtonDisabled_uc5P" type="button" disabled="" title="Switch between dark and light mode (currently light mode)" aria-label="Switch between dark and light mode (currently light mode)" aria-live="polite"><svg viewBox="0 0 24 24" width="24" height="24" class="lightToggleIcon_JliJ"><path fill="currentColor" d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"></path></svg><svg viewBox="0 0 24 24" width="24" height="24" class="darkToggleIcon_dakX"><path fill="currentColor" d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"></path></svg></button></div></div></div><div role="presentation" class="navbar-sidebar__backdrop"></div></nav><div id="__docusaurus_skipToContent_fallback" class="main-wrapper mainWrapper_BBNw"><div class="docsWrapper_dkrk"><button aria-label="Scroll back to top" class="clean-btn theme-back-to-top-button backToTopButton_m21v" type="button"></button><div class="docRoot_mtKm"><aside class="theme-doc-sidebar-container docSidebarContainer_Er1R"><div class="sidebarViewport_VgPy"><section class="productSelector_ky08"><span> <!-- -->Spot Trading<!-- --> </span></section><div class="sidebar_YPx9"><nav aria-label="Docs sidebar" class="menu thin-scrollbar menu_SCH5"><ul class="theme-doc-sidebar-menu menu__list"><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs">Changelog</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/README">Readme</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/filters">Filters</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/enums">Enums</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/rest-api/general-api-information">REST API</a></div></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/fix-api">FIX API</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/web-socket-streams">WebSocket Streams</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/sbe-market-data-streams">SBE Market Data</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/user-data-stream">User Data Stream</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/websocket-api/general-api-information">WebSocket API</a></div></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/PROD-TERMS-OF-USE">Terms of Use</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/testnet">Testnet</a></div></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret" role="button" aria-expanded="false" href="/docs/binance-spot-api-docs/demo-mode">Demo Mode</a></div></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link" href="/docs/binance-spot-api-docs/errors">Error</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret menu__link--active" role="button" aria-expanded="true" href="/docs/binance-spot-api-docs/faqs/spot_glossary">FAQs</a></div><ul style="display:block;overflow:visible;height:auto" class="menu__list"><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/faqs/spot_glossary">Spot Glossary</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/faqs/pegged_orders">Pegged Orders</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/faqs/opo">OPO</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/faqs/commission_faq">Commission FAQ</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/faqs/trailing-stop-faq">Trailing Stop FAQ</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/faqs/stp_faq">STP FAQ</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/faqs/market_data_only">Market Data Only</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/faqs/sor_faq">SOR FAQ</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link menu__link--active" aria-current="page" tabindex="0" href="/docs/binance-spot-api-docs/faqs/order_count_decrement">Order Count Decrement</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/faqs/sbe_faq">SBE FAQ</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/faqs/api_key_types">API Key Types</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/binance-spot-api-docs/faqs/order_amend_keep_priority">Order Amend Keep Priority</a></li></ul></li></ul></nav></div></div></aside><main class="docMainContainer_jRkP"><div class="container padding-top--md padding-bottom--lg"><div class="row"><div class="col docItemCol_Xiwq"><div class="docItemContainer_JFP9"><article><nav class="theme-doc-breadcrumbs breadcrumbsContainer_tVzI" aria-label="Breadcrumbs"><ul class="breadcrumbs" itemscope="" itemtype="https://schema.org/BreadcrumbList"><li class="breadcrumbs__item"><a aria-label="Home page" class="breadcrumbs__link" href="/docs/"><svg viewBox="0 0 24 24" class="breadcrumbHomeIcon_yapy"><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" fill="currentColor"></path></svg></a></li><li class="breadcrumbs__item"><span class="breadcrumbs__link">FAQs</span><meta itemprop="position" content="1"></li><li itemscope="" itemprop="itemListElement" itemtype="https://schema.org/ListItem" class="breadcrumbs__item breadcrumbs__item--active"><span class="breadcrumbs__link" itemprop="name">Order Count Decrement</span><meta itemprop="position" content="2"></li></ul></nav><div class="tocCollapsible_Wlpy theme-doc-toc-mobile tocMobile_qs2S"><button type="button" class="clean-btn tocCollapsibleButton_niV5">On this page</button></div><div class="theme-doc-markdown markdown"><meta name="docsearch:sidebar" content="binance-spot-api-docs">
  
<h1>Spot Unfilled Order Count Rules</h1>
<p>To ensure a fair and orderly Spot market, we limit the rate at which new orders may be placed.</p>
<p>The rate limit applies to the number of new, <em>unfilled</em> orders placed within a time interval. That is, orders which are partially or fully filled do not count against the rate limit.</p>
<blockquote>
<p>[!NOTE]
Unfilled order rate limit rewards efficient traders.</p>
<p><strong>So long as your orders trade, you can keep trading.</strong></p>
<p>More information: <a href="/docs/binance-spot-api-docs/faqs/order_count_decrement#filled-orders-rate-limit">How do filled orders affect the rate limit?</a></p>
</blockquote>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="what-are-the-current-rate-limits">What are the current rate limits?<a class="hash-link" aria-label="Direct link to What are the current rate limits?" title="Direct link to What are the current rate limits?" href="/docs/binance-spot-api-docs/faqs/order_count_decrement#what-are-the-current-rate-limits">​</a></h3>
<p>You can query current rate limits using the &quot;exchange information&quot; request.</p>
<p>The <code>&quot;rateLimitType&quot;: &quot;ORDERS&quot;</code> indicates the current unfilled order rate limit.</p>
<p>Please refer to the API documentation:</p>





















<table><thead><tr><th style="text-align:left">API</th><th style="text-align:left">Request</th></tr></thead><tbody><tr><td style="text-align:left">FIX API</td><td style="text-align:left"><a href="/docs/binance-spot-api-docs/fix-api#limitquery">LimitQuery<code>&lt;XLQ&gt;</code></a></td></tr><tr><td style="text-align:left">REST API</td><td style="text-align:left"><a href="/docs/binance-spot-api-docs/rest-api/general-endpoints#exchangeInfo"><code>GET /api/v3/exchangeInfo</code></a></td></tr><tr><td style="text-align:left">WebSocket API</td><td style="text-align:left"><a href="/docs/binance-spot-api-docs/websocket-api/general-requests#exchangeInfo"><code>exchangeInfo</code></a></td></tr></tbody></table>
<blockquote>
<p>[!IMPORTANT]
Order placement requests are also affected by the general request rate limits on REST and WebSocket API and the message limits on FIX API.</p>
<p>If you send too many requests at a high rate, you will be blocked by the API.</p>
</blockquote>
<p><a id="order-rate-limit"></a></p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="how-does-the-unfilled-orders-rate-limit-work">How does the unfilled <code>ORDERS</code> rate limit work?<a class="hash-link" aria-label="Direct link to how-does-the-unfilled-orders-rate-limit-work" title="Direct link to how-does-the-unfilled-orders-rate-limit-work" href="/docs/binance-spot-api-docs/faqs/order_count_decrement#how-does-the-unfilled-orders-rate-limit-work">​</a></h3>
<p>Every successful request to place an order adds to the unfilled order count for the current time interval. If too many unfilled orders accumulate during the interval, subsequent requests will be rejected.</p>
<p>For example, if the unfilled order rate limit is 100 per 10 seconds:</p>
<div class="language-javascript codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-javascript codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token punctuation" style="color:#393A34">{</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    </span><span class="token string-property property" style="color:#36acaa">&quot;rateLimitType&quot;</span><span class="token operator" style="color:#393A34">:</span><span class="token plain"> </span><span class="token string" style="color:#e3116c">&quot;ORDERS&quot;</span><span class="token punctuation" style="color:#393A34">,</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    </span><span class="token string-property property" style="color:#36acaa">&quot;interval&quot;</span><span class="token operator" style="color:#393A34">:</span><span class="token plain"> </span><span class="token string" style="color:#e3116c">&quot;SECOND&quot;</span><span class="token punctuation" style="color:#393A34">,</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    </span><span class="token string-property property" style="color:#36acaa">&quot;intervalNum&quot;</span><span class="token operator" style="color:#393A34">:</span><span class="token plain"> </span><span class="token number" style="color:#36acaa">10</span><span class="token punctuation" style="color:#393A34">,</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    </span><span class="token string-property property" style="color:#36acaa">&quot;limit&quot;</span><span class="token operator" style="color:#393A34">:</span><span class="token plain"> </span><span class="token number" style="color:#36acaa">100</span><span class="token plain"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"></span><span class="token punctuation" style="color:#393A34">}</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p>then you can place at most 100 new orders between 12:34:00 and 12:34:10, then 100 more from 12:34:10 to 12:34:20, and so on.</p>
<blockquote>
<p>[!TIP]
If the newly placed orders receive fills, your unfilled order count decreases and you may place more orders during the time interval.</p>
<p>More information: <a href="/docs/binance-spot-api-docs/faqs/order_count_decrement#filled-orders-rate-limit">How do filled orders affect the rate limit?</a></p>
</blockquote>
<p>When an order is rejected by the system due to the unfilled order rate limit, the HTTP status code is set to <code>429 Too Many Requests</code> and the error code is <code>-1015 &quot;Too many new orders&quot;</code>.</p>
<p>If you encounter these errors, please stop sending orders until the affected rate limit interval expires.</p>
<p>Please refer to the API documentation:</p>





















<table><thead><tr><th style="text-align:left">API</th><th style="text-align:left">Documentation</th></tr></thead><tbody><tr><td style="text-align:left">FIX API</td><td style="text-align:left"><a href="/docs/binance-spot-api-docs/fix-api#unfilled-order-count">Unfilled Order Count</a></td></tr><tr><td style="text-align:left">REST API</td><td style="text-align:left"><a href="/docs/binance-spot-api-docs/rest-api/limits#unfilled-order-count">Unfilled Order Count</a></td></tr><tr><td style="text-align:left">WebSocket API</td><td style="text-align:left"><a href="/docs/binance-spot-api-docs/websocket-api/rate-limits#unfilled-order-count">Unfilled Order Count</a></td></tr></tbody></table>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="is-the-unfilled-order-count-tracked-by-ip-address">Is the unfilled order count tracked by IP address?<a class="hash-link" aria-label="Direct link to Is the unfilled order count tracked by IP address?" title="Direct link to Is the unfilled order count tracked by IP address?" href="/docs/binance-spot-api-docs/faqs/order_count_decrement#is-the-unfilled-order-count-tracked-by-ip-address">​</a></h3>
<p>Unfilled order count is tracked <strong>by (sub)account</strong>.</p>
<p>Unfilled order count is shared across all IP addresses, all API keys, and all APIs.</p>
<p><a id="filled-orders-rate-limit"></a></p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="how-do-filled-orders-affect-the-unfilled-order-count">How do filled orders affect the unfilled order count?<a class="hash-link" aria-label="Direct link to How do filled orders affect the unfilled order count?" title="Direct link to How do filled orders affect the unfilled order count?" href="/docs/binance-spot-api-docs/faqs/order_count_decrement#how-do-filled-orders-affect-the-unfilled-order-count">​</a></h3>
<p>When an order is filled for the first time (partially or fully), your unfilled order count is decremented by one order for all intervals of the <code>ORDERS</code> rate limit. Effectively, orders that trade do not count towards the rate limit, allowing efficient traders to keep placing new orders.</p>
<p>Certain orders provide additional incentive:</p>
<ul>
<li><strong>Orders that do not fill immediately (that is, first fill in the maker phase).</strong></li>
<li>Orders that fill large quantities.</li>
</ul>
<p>In these cases the unfilled order count may be decremented by more than one order for each order that starts trading.</p>
<p><strong>Notes:</strong></p>
<ul>
<li><strong>The examples only give a general idea of the behavior.</strong> The 10-second interval is used for simplicity. The actual configuration on the live exchange may be different.</li>
<li>There is a short delay between the order being filled and the unfilled order count update. Please be careful when your unfilled order count is close to the limit.</li>
<li>Please refer to <a href="/docs/binance-spot-api-docs/faqs/order_count_decrement#order-rate-limit">How does unfilled <code>ORDERS</code> rate limit work?</a> to see how you can monitor the unfilled order count depending on the API.</li>
</ul>
<p><strong>Example 1</strong> — taker:</p>























































<table><thead><tr><th style="text-align:left">Time</th><th style="text-align:left">Action</th><th style="text-align:left">Unfilled order count</th></tr></thead><tbody><tr><td style="text-align:left">00:00:00</td><td style="text-align:left"></td><td style="text-align:left">0</td></tr><tr><td style="text-align:left">00:00:01</td><td style="text-align:left">Place LIMIT order A</td><td style="text-align:left">1 — new order (+1)</td></tr><tr><td style="text-align:left">00:00:02</td><td style="text-align:left">Place LIMIT order B</td><td style="text-align:left">2 — new order (+1)</td></tr><tr><td style="text-align:left"></td><td style="text-align:left">(order B partially filled)</td><td style="text-align:left">1 — first fill as taker (−1)</td></tr><tr><td style="text-align:left">00:00:03</td><td style="text-align:left">Place LIMIT order C</td><td style="text-align:left">2 — new order (+1)</td></tr><tr><td style="text-align:left">00:00:04</td><td style="text-align:left">(order B partially filled)</td><td style="text-align:left">2</td></tr><tr><td style="text-align:left">00:00:04</td><td style="text-align:left">(order B filled)</td><td style="text-align:left">2</td></tr><tr><td style="text-align:left">00:00:05</td><td style="text-align:left">Place MARKET order D</td><td style="text-align:left">3 — new order (+1)</td></tr><tr><td style="text-align:left"></td><td style="text-align:left">(order D fully filled)</td><td style="text-align:left">2 — first fill as taker (−1)</td></tr></tbody></table>
<p>Note how for every taker order that immediately trades, the unfilled order count is decremented later, allowing you to keep placing orders.</p>
<p><strong>Example 2</strong> — maker:</p>











































































<table><thead><tr><th style="text-align:left">Time</th><th style="text-align:left">Action</th><th style="text-align:left">Unfilled order count</th></tr></thead><tbody><tr><td style="text-align:left">00:00:00</td><td style="text-align:left"></td><td style="text-align:left">0</td></tr><tr><td style="text-align:left">00:00:01</td><td style="text-align:left">Place LIMIT order A</td><td style="text-align:left">1 — new order (+1)</td></tr><tr><td style="text-align:left">00:00:01</td><td style="text-align:left">Place LIMIT order B</td><td style="text-align:left">2 — new order (+1)</td></tr><tr><td style="text-align:left">00:00:02</td><td style="text-align:left">Place LIMIT order C</td><td style="text-align:left">3 — new order (+1)</td></tr><tr><td style="text-align:left">00:00:02</td><td style="text-align:left">Place LIMIT order D</td><td style="text-align:left">4 — new order (+1)</td></tr><tr><td style="text-align:left">00:00:02</td><td style="text-align:left">Place LIMIT order E</td><td style="text-align:left">5 — new order (+1)</td></tr><tr><td style="text-align:left">00:00:03</td><td style="text-align:left">(order A partially filled)</td><td style="text-align:left">0 — first fill as maker (−5)</td></tr><tr><td style="text-align:left">00:00:04</td><td style="text-align:left">Place LIMIT order F</td><td style="text-align:left">1 — new order (+1)</td></tr><tr><td style="text-align:left">00:00:04</td><td style="text-align:left">Place LIMIT order G</td><td style="text-align:left">2 — new order (+1)</td></tr><tr><td style="text-align:left">00:00:05</td><td style="text-align:left">(order A partially filled)</td><td style="text-align:left">2</td></tr><tr><td style="text-align:left">00:00:05</td><td style="text-align:left">(order A filled)</td><td style="text-align:left">2</td></tr><tr><td style="text-align:left">00:00:05</td><td style="text-align:left">(order B partially filled)</td><td style="text-align:left">0 — first fill as maker (−5)</td></tr><tr><td style="text-align:left">00:00:06</td><td style="text-align:left">Place LIMIT order H</td><td style="text-align:left">1 — new order (+1)</td></tr></tbody></table>
<p>Note how for every maker order that is filled later, the unfilled order count is decremented by a higher amount, allowing you to place more orders.</p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="how-do-canceled-or-expired-orders-affect-the-unfilled-order-count">How do canceled or expired orders affect the unfilled order count?<a class="hash-link" aria-label="Direct link to How do canceled or expired orders affect the unfilled order count?" title="Direct link to How do canceled or expired orders affect the unfilled order count?" href="/docs/binance-spot-api-docs/faqs/order_count_decrement#how-do-canceled-or-expired-orders-affect-the-unfilled-order-count">​</a></h3>
<p>Canceling an order does not change the unfilled order count.</p>
<p>Expired orders also do not change the unfilled order count.</p>
<p><strong>Example:</strong></p>

































































<table><thead><tr><th style="text-align:left">Time</th><th style="text-align:left">Action</th><th style="text-align:left">Unfilled order count</th></tr></thead><tbody><tr><td style="text-align:left">00:00:00</td><td style="text-align:left"></td><td style="text-align:left">0</td></tr><tr><td style="text-align:left">00:00:01</td><td style="text-align:left">Place LIMIT order A</td><td style="text-align:left">1 — new order (+1)</td></tr><tr><td style="text-align:left">00:00:02</td><td style="text-align:left">Cancel order A</td><td style="text-align:left">1</td></tr><tr><td style="text-align:left">00:00:02</td><td style="text-align:left">Place LIMIT order B</td><td style="text-align:left">2 — new order (+1)</td></tr><tr><td style="text-align:left">00:00:03</td><td style="text-align:left">Place LIMIT FOK order C</td><td style="text-align:left">3 — new order (+1)</td></tr><tr><td style="text-align:left"></td><td style="text-align:left">(order C is fully filled)</td><td style="text-align:left">2 — fill (−1)</td></tr><tr><td style="text-align:left">00:00:05</td><td style="text-align:left">Place LIMIT order D</td><td style="text-align:left">3 — new order (+1)</td></tr><tr><td style="text-align:left">00:00:06</td><td style="text-align:left">Place LIMIT FOK order E</td><td style="text-align:left">4 — new order (+1)</td></tr><tr><td style="text-align:left"></td><td style="text-align:left">(order E expires with no fill)</td><td style="text-align:left">4</td></tr><tr><td style="text-align:left">00:00:07</td><td style="text-align:left">Cancel order D</td><td style="text-align:left">4</td></tr><tr><td style="text-align:left">00:00:07</td><td style="text-align:left">Place LIMIT order F</td><td style="text-align:left">5 — new order (+1)</td></tr></tbody></table>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="which-time-zone-does-intervalday-use">Which time zone does <code>&quot;interval&quot;:&quot;DAY&quot;</code> use?<a class="hash-link" aria-label="Direct link to which-time-zone-does-intervalday-use" title="Direct link to which-time-zone-does-intervalday-use" href="/docs/binance-spot-api-docs/faqs/order_count_decrement#which-time-zone-does-intervalday-use">​</a></h3>
<p>UTC</p>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="what-happens-if-i-placed-an-order-yesterday-but-it-is-filled-the-next-day">What happens if I placed an order yesterday but it is filled the next day?<a class="hash-link" aria-label="Direct link to What happens if I placed an order yesterday but it is filled the next day?" title="Direct link to What happens if I placed an order yesterday but it is filled the next day?" href="/docs/binance-spot-api-docs/faqs/order_count_decrement#what-happens-if-i-placed-an-order-yesterday-but-it-is-filled-the-next-day">​</a></h3>
<p>New order fills decrease your <em>current</em> unfilled order count regardless of when the orders were placed.</p>
<p><strong>Example:</strong></p>













































<table><thead><tr><th style="text-align:left">Time</th><th style="text-align:left">Action</th><th style="text-align:left">Unfilled order count</th></tr></thead><tbody><tr><td style="text-align:left">2024-01-01 09:00</td><td style="text-align:left">Place 5 orders: 1..5</td><td style="text-align:left">5</td></tr><tr><td style="text-align:left">2024-01-02 00:00</td><td style="text-align:left">(rate limit interval reset)</td><td style="text-align:left">0</td></tr><tr><td style="text-align:left">2024-01-02 09:00</td><td style="text-align:left">Place 10 orders: 6..15</td><td style="text-align:left">10</td></tr><tr><td style="text-align:left">2024-01-02 12:00</td><td style="text-align:left">(orders 1..5 are filled)</td><td style="text-align:left">5</td></tr><tr><td style="text-align:left">2024-01-02 13:00</td><td style="text-align:left">(orders 6..10 are filled)</td><td style="text-align:left">0</td></tr><tr><td style="text-align:left">2024-01-02 14:00</td><td style="text-align:left">Place 2 orders: 16, 17</td><td style="text-align:left">2</td></tr><tr><td style="text-align:left">2024-01-02 15:00</td><td style="text-align:left">(orders 11..15 are filled)</td><td style="text-align:left">0</td></tr></tbody></table>
<p><strong>Note:</strong> You do not get credit for order fills. That is, once the unfilled order count is down to zero, additional fills will not decrease it further. New orders will increase the count as usual.</p></div></article><nav class="pagination-nav docusaurus-mt-lg" aria-label="Docs pages"><a class="pagination-nav__link pagination-nav__link--prev" href="/docs/binance-spot-api-docs/faqs/sor_faq"><div class="pagination-nav__sublabel">Previous</div><div class="pagination-nav__label">SOR FAQ</div></a><a class="pagination-nav__link pagination-nav__link--next" href="/docs/binance-spot-api-docs/faqs/sbe_faq"><div class="pagination-nav__sublabel">Next</div><div class="pagination-nav__label">SBE FAQ</div></a></nav></div></div><div class="col col--3"><div class="tableOfContents_zXaw thin-scrollbar theme-doc-toc-desktop"><ul class="table-of-contents table-of-contents__left-border"><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/faqs/order_count_decrement#what-are-the-current-rate-limits">What are the current rate limits?</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/faqs/order_count_decrement#how-does-the-unfilled-orders-rate-limit-work">How does the unfilled <code>ORDERS</code> rate limit work?</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/faqs/order_count_decrement#is-the-unfilled-order-count-tracked-by-ip-address">Is the unfilled order count tracked by IP address?</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/faqs/order_count_decrement#how-do-filled-orders-affect-the-unfilled-order-count">How do filled orders affect the unfilled order count?</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/faqs/order_count_decrement#how-do-canceled-or-expired-orders-affect-the-unfilled-order-count">How do canceled or expired orders affect the unfilled order count?</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/faqs/order_count_decrement#which-time-zone-does-intervalday-use">Which time zone does <code>&quot;interval&quot;:&quot;DAY&quot;</code> use?</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/binance-spot-api-docs/faqs/order_count_decrement#what-happens-if-i-placed-an-order-yesterday-but-it-is-filled-the-next-day">What happens if I placed an order yesterday but it is filled the next day?</a></li></ul></div></div></div></div></main></div></div></div><footer class="footer footer--dark"><div class="container container-fluid"><div class="footer__bottom text--center"><div class="footer__copyright">Copyright © 2026 Binance.</div></div></div></footer></div>
</body>
</html>
