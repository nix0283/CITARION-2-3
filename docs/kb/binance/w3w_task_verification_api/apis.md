# w3w_task_verification_api/apis

> **Source:** https://developers.binance.com/docs/w3w_task_verification_api/apis

<!-- Raw HTML content from page -->
<!doctype html>
<html lang="en" dir="ltr" class="docs-wrapper plugin-docs plugin-id-default docs-version-current docs-doc-page docs-doc-id-w3w_task_verification_api/apis" data-has-hydrated="false">
<head>
<meta charset="UTF-8">
<meta name="generator" content="Docusaurus v3.4.0">
<title data-rh="true">Binance Web3 API Specification | Binance Open Platform</title><meta data-rh="true" name="viewport" content="width=device-width,initial-scale=1"><meta data-rh="true" name="twitter:card" content="summary_large_image"><meta data-rh="true" property="og:url" content="https://developers.binance.com/docs/w3w_task_verification_api/apis"><meta data-rh="true" property="og:locale" content="en"><meta data-rh="true" property="og:locale:alternate" content="zh_CN"><meta data-rh="true" name="docusaurus_locale" content="en"><meta data-rh="true" name="docsearch:language" content="en"><meta data-rh="true" name="docusaurus_version" content="current"><meta data-rh="true" name="docusaurus_tag" content="docs-default-current"><meta data-rh="true" name="docsearch:version" content="current"><meta data-rh="true" name="docsearch:docusaurus_tag" content="docs-default-current"><meta data-rh="true" property="og:title" content="Binance Web3 API Specification | Binance Open Platform"><meta data-rh="true" name="description" content="Web3 API description"><meta data-rh="true" property="og:description" content="Web3 API description"><link data-rh="true" rel="icon" href="/docs/img/favicon.png"><link data-rh="true" rel="canonical" href="https://developers.binance.com/docs/w3w_task_verification_api/apis"><link data-rh="true" rel="alternate" href="https://developers.binance.com/docs/w3w_task_verification_api/apis" hreflang="en"><link data-rh="true" rel="alternate" href="https://developers.binance.com/docs/zh-CN/w3w_task_verification_api/apis" hreflang="zh-CN"><link data-rh="true" rel="alternate" href="https://developers.binance.com/docs/w3w_task_verification_api/apis" hreflang="x-default"><link data-rh="true" rel="preconnect" href="https://9I0UZOBSWT-dsn.algolia.net" crossorigin="anonymous"><link rel="preconnect" href="https://www.googletagmanager.com">
<script>window.dataLayer=window.dataLayer||[]</script>
<script>!function(e,t,a,n,g){e[n]=e[n]||[],e[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var m=t.getElementsByTagName(a)[0],r=t.createElement(a);r.async=!0,r.src="https://www.googletagmanager.com/gtm.js?id=GTM-M86QHGF",m.parentNode.insertBefore(r,m)}(window,document,"script","dataLayer")</script>


<link rel="search" type="application/opensearchdescription+xml" title="Binance Open Platform" href="/docs/opensearch.xml"><link rel="stylesheet" href="/docs/assets/css/styles.65c537d6.css">
<script src="/docs/assets/js/runtime~main.beb17562.js" defer="defer"></script>
<script src="/docs/assets/js/main.c8dc629a.js" defer="defer"></script>
</head>
<body class="navigation-with-keyboard">
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M86QHGF" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

<script>!function(){function t(t){document.documentElement.setAttribute("data-theme",t)}var e=function(){try{return new URLSearchParams(window.location.search).get("docusaurus-theme")}catch(t){}}()||function(){try{return window.localStorage.getItem("theme")}catch(t){}}();t(null!==e?e:"light")}(),function(){try{const n=new URLSearchParams(window.location.search).entries();for(var[t,e]of n)if(t.startsWith("docusaurus-data-")){var a=t.replace("docusaurus-data-","data-");document.documentElement.setAttribute(a,e)}}catch(t){}}()</script><div id="__docusaurus"><div role="region" aria-label="Skip to main content"><a class="skipToContent_Mndp" href="#__docusaurus_skipToContent_fallback">Skip to main content</a></div><nav aria-label="Main" class="navbar navbar--fixed-top"><div class="navbar__inner"><div class="navbar__items"><button aria-label="Toggle navigation bar" aria-expanded="false" class="navbar__toggle clean-btn" type="button"><svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M4 7h22M4 15h22M4 23h22"></path></svg></button><a href="https://developers.binance.com/en" target="_self" rel="noopener noreferrer" class="navbar__brand"><div class="navbar__logo"><img src="/docs/img/logo.svg" alt="Binance Logo" class="themedComponent_abzR themedComponent--light_IjiB"><img src="/docs/img/logo.svg" alt="Binance Logo" class="themedComponent_abzR themedComponent--dark_O3Fz"></div></a><div class="productSelectorWrapper_kk2K"><div class="productSelector_tRKy"><button class="productSelectorButton_fwTp"><span>Products</span><span class="arrow_h6A6">▼</span></button></div></div></div><div class="navbar__items navbar__items--right"><div class="navbarSearchContainer_dCNk"><div class="searchContainer_RJ4l"><div class="searchWrapper_Bzvn"><button type="button" class="DocSearch DocSearch-Button" aria-label="Search"><span class="DocSearch-Button-Container"><svg width="20" height="20" class="DocSearch-Search-Icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="DocSearch-Button-Placeholder">Search</span></span><span class="DocSearch-Button-Keys"></span></button><div class="searchModeToggle__Af9"><div class="toggleTrack_B5pz"><button class="toggleOption_jECQ active_d_Ud" title="Search current documentation section">Current</button><button class="toggleOption_jECQ" title="Search all documentation">All</button></div></div></div></div></div><div class="navbar__item dropdown dropdown--hoverable dropdown--right"><a aria-haspopup="true" aria-expanded="false" role="button" class="navbar__link navbar_locale_dropdown" href="/docs/w3w_task_verification_api/apis"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" class="iconLanguage_JRss"><path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path></svg>English</a><ul class="dropdown__menu"><li><a href="/docs/w3w_task_verification_api/apis" target="_self" rel="noopener noreferrer" class="dropdown__link dropdown__link--active" lang="en">English</a></li><li><a href="/docs/zh-CN/w3w_task_verification_api/apis" target="_self" rel="noopener noreferrer" class="dropdown__link" lang="zh-CN">简体中文</a></li></ul></div><div class="toggle_OprV colorModeToggle_x44X"><button class="clean-btn toggleButton_g_ff toggleButtonDisabled_uc5P" type="button" disabled="" title="Switch between dark and light mode (currently light mode)" aria-label="Switch between dark and light mode (currently light mode)" aria-live="polite"><svg viewBox="0 0 24 24" width="24" height="24" class="lightToggleIcon_JliJ"><path fill="currentColor" d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"></path></svg><svg viewBox="0 0 24 24" width="24" height="24" class="darkToggleIcon_dakX"><path fill="currentColor" d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"></path></svg></button></div></div></div><div role="presentation" class="navbar-sidebar__backdrop"></div></nav><div id="__docusaurus_skipToContent_fallback" class="main-wrapper mainWrapper_BBNw"><div class="docsWrapper_dkrk"><button aria-label="Scroll back to top" class="clean-btn theme-back-to-top-button backToTopButton_m21v" type="button"></button><div class="docRoot_mtKm"><aside class="theme-doc-sidebar-container docSidebarContainer_Er1R"><div class="sidebarViewport_VgPy"><section class="productSelector_ky08"><span> <!-- -->Task Verification API Endpoint<!-- --> </span></section><div class="sidebar_YPx9"><nav aria-label="Docs sidebar" class="menu thin-scrollbar menu_SCH5"><ul class="theme-doc-sidebar-menu menu__list"><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist menu__link--sublist-caret menu__link--active" role="button" aria-expanded="true" href="/docs/w3w_task_verification_api/apis">Task Verification API Endpoint</a></div><ul style="display:block;overflow:visible;height:auto" class="menu__list"><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link menu__link--active" aria-current="page" tabindex="0" href="/docs/w3w_task_verification_api/apis">APIs</a></li><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a class="menu__link" tabindex="0" href="/docs/w3w_task_verification_api/on-chain-verification">On-Chain Verification</a></li></ul></li></ul></nav></div></div></aside><main class="docMainContainer_jRkP"><div class="container padding-top--md padding-bottom--lg"><div class="row"><div class="col docItemCol_Xiwq"><div class="docItemContainer_JFP9"><article><nav class="theme-doc-breadcrumbs breadcrumbsContainer_tVzI" aria-label="Breadcrumbs"><ul class="breadcrumbs" itemscope="" itemtype="https://schema.org/BreadcrumbList"><li class="breadcrumbs__item"><a aria-label="Home page" class="breadcrumbs__link" href="/docs/"><svg viewBox="0 0 24 24" class="breadcrumbHomeIcon_yapy"><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" fill="currentColor"></path></svg></a></li><li class="breadcrumbs__item"><span class="breadcrumbs__link">Task Verification API Endpoint</span><meta itemprop="position" content="1"></li><li itemscope="" itemprop="itemListElement" itemtype="https://schema.org/ListItem" class="breadcrumbs__item breadcrumbs__item--active"><span class="breadcrumbs__link" itemprop="name">APIs</span><meta itemprop="position" content="2"></li></ul></nav><div class="tocCollapsible_Wlpy theme-doc-toc-mobile tocMobile_qs2S"><button type="button" class="clean-btn tocCollapsibleButton_niV5">On this page</button></div><div class="theme-doc-markdown markdown"><header><h1>Binance Web3 API Specification</h1></header><meta name="docsearch:sidebar" content="w3wTaskVerificationApi">
  
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="web3-api-description">Web3 API description<a class="hash-link" aria-label="Direct link to Web3 API description" title="Direct link to Web3 API description" href="/docs/w3w_task_verification_api/apis#web3-api-description">​</a></h2>
<ul>
<li>Binance&#x27;s Partners need to follow the API specification in this doc to provide Binance with a set of endpoints that Binance will call to check if a user has completed specific tasks (like a deposit, swap,etc.).</li>
</ul>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="general-api-information">General API Information<a class="hash-link" aria-label="Direct link to General API Information" title="Direct link to General API Information" href="/docs/w3w_task_verification_api/apis#general-api-information">​</a></h2>
<ul>
<li>All endpoints return a common JSON object with &quot;code&quot;, &quot;message&quot; and &quot;data&quot;, no matter if it&#x27;s a success or not.</li>
<li>Here &quot;data&quot; is either a customized JSON object or a simple type (int, string...). It may vary from endpoint to endpoint.
<div class="language-json codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-json codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">{</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    &quot;code&quot;: &quot;XXXXXX&quot;,</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    &quot;message&quot;: &quot;success&quot;,</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    &quot;data&quot;: {</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">       &quot;abc&quot;: &quot;efg&quot;,</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">       ...</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">   }</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">}</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
</li>
<li>General codes in responses:

























<table><thead><tr><th>code</th><th>Description</th></tr></thead><tbody><tr><td>000000</td><td>success</td></tr><tr><td>000001</td><td>too many requests</td></tr><tr><td>000006</td><td>invalid argument</td></tr><tr><td>000007</td><td>other error</td></tr></tbody></table>
</li>
<li>All time and timestamp related fields are in milliseconds.</li>
<li>HTTP 5XX return codes are used for internal errors. The issue is on the partner&#x27;s side. Binance will <strong>NOT</strong> treat this as a failure operation; the execution status is UNKNOWN.</li>
<li>For GET endpoints, parameters must be sent as a query string.</li>
<li>Parameters may be sent in any order.</li>
<li>Each request and response should be logged in both Binance and partner&#x27;s sides for further investigation.</li>
<li>Every partner needs to define a url prefix so that Binance can invoke the partner&#x27;s endpoint using prefix + endpoint_url. <span style="word-break:break-all">E.g. https<span></span>://tasks-api.x.build/api/v1/task/completion?walletAddress=xx&amp;task=[&quot;deposit&quot;]</span></li>
</ul>
<ul>
<li>
<p><strong>Front all OpenAPI endpoints with a WAF</strong></p>
<ul>
<li>
<p>Place every public endpoint behind a Web Application Firewall.</p>
</li>
<li>
<p>Enable core protections (SQLi, XSS, RCE) and basic rate/behavior policies.</p>
</li>
</ul>
</li>
<li>
<p><strong>Rate limiting &amp; overload protection</strong></p>
<ul>
<li>
<p>Enforce global and per-key limits (per IP / user / token), plus per-endpoint limits on critical paths.</p>
</li>
<li>
<p>When capacity is exceeded, return <strong>HTTP 429 (Too Many Requests)</strong> and include a <code>Retry-After</code> header.</p>
</li>
<li>
<p>Consider circuit breakers and exponential backoff hints for clients.</p>
</li>
</ul>
</li>
</ul>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="api-specification">API Specification​<a class="hash-link" aria-label="Direct link to API Specification​" title="Direct link to API Specification​" href="/docs/w3w_task_verification_api/apis#api-specification">​</a></h2>
<h3 class="anchor anchorWithStickyNavbar_fMI7" id="task-completion">Task Completion<a class="hash-link" aria-label="Direct link to Task Completion" title="Direct link to Task Completion" href="/docs/w3w_task_verification_api/apis#task-completion">​</a></h3>
<div class="codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-text codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">GET /v1/task/completion</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<p><strong>Parameters:</strong></p>























<table><thead><tr><th>Name</th><th>Type</th><th>Mandatory</th><th>Description</th></tr></thead><tbody><tr><td>walletAddress</td><td>String</td><td>YES</td><td>a user&#x27;s unified id</td></tr><tr><td>task</td><td>String json array</td><td>YES</td><td>Task ID used to identify the task. Try to use a Task ID that is relevant and descriptive of the task, not a random or arbitrary string. For example, task=[&quot;deposit&quot;,&quot;withdraw&quot;]. If it&#x27;s not empty, just return corresponding task completion status. Otherwise, return all tasks completion statuses.</td></tr></tbody></table>
<p><strong>Response Body:</strong></p>

























<table><thead><tr><th>Name</th><th>Type</th><th>Mandatory</th></tr></thead><tbody><tr><td>code</td><td>String</td><td>YES</td></tr><tr><td>message</td><td>String</td><td>YES</td></tr><tr><td>data</td><td>JSON Object</td><td>YES</td></tr></tbody></table>
<p><strong>Examples:</strong></p>
<div class="language-json codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-json codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain">GET {prefix} + /v1/task/completion?walletAddress=0xabcdefg&amp;task=[&quot;deposit&quot;, &quot;withdrawal&quot;]</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain" style="display:inline-block"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">Response:</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">{</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"> &quot;code&quot;: &quot;000000&quot;,</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"> &quot;message&quot;: &quot;success&quot;,</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"> &quot;data&quot;: {</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">     &quot;withdrawal&quot;: true, // complete</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">     &quot;deposit&quot;: false, // incomplete</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"> }</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">}</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain" style="display:inline-block"></span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">{</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"> &quot;code&quot;: &quot;000006&quot;,</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"> &quot;message&quot;: &quot;invalid argument&quot;,</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"> &quot;data&quot;: null</span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">}</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<ul>
<li>
<p><strong>Task verification (<code>verify</code> API)</strong></p>
<ul>
<li>
<p>Flow: After a user completes a task and taps <strong>Verify</strong>, Binance backend calls your <code>verify</code> API to confirm completion.</p>
</li>
<li>
<p><strong>Latency SLO</strong>: <strong>P99 &lt; 1s</strong>, <strong>hard timeout ≤ 3s</strong> (set a server-side timeout of 3 seconds).</p>
</li>
<li>
<p><strong>Observability</strong>: Monitor latency (P50/P95/P99), error ratio, dependency timing; alert on timeouts and anomalies, and investigate immediately.</p>
</li>
<li>
<p><strong>Correctness over speed</strong>: Do not return success/failure optimistically if data is inconclusive.</p>
</li>
<li>
<p><strong>Response shape</strong>:</p>
<ul>
<li>If incomplete, return a clear reason to reduce support load (e.g., a missing sub-step).</li>
</ul>
</li>
</ul>
</li>
</ul>
<p>Example:</p>
<div class="language-json codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-json codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain"> {  </span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">  &quot;completed&quot;: false,  </span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">  &quot;reason&quot;: &quot;Subtask &#x27;bridge_tx_confirmed&#x27; not met (0/1 confirmations)&quot;,  </span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">  &quot;evidence&quot;: null  </span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"> }</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<ul>
<li></li>
</ul>
<p>Success example:</p>
<div class="language-json codeBlockContainer_zbXh theme-code-block" style="--prism-color:#393A34;--prism-background-color:#f6f8fa"><div class="codeBlockContent_RFcP"><pre tabindex="0" class="prism-code language-json codeBlock_hldk thin-scrollbar" style="color:#393A34;background-color:#f6f8fa"><code class="codeBlockLines_aHhF"><span class="token-line" style="color:#393A34"><span class="token plain"> {  </span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">  &quot;completed&quot;: true,  </span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">  &quot;reason&quot;: null,  </span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">  &quot;evidence&quot;: {  </span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    &quot;tx_hash&quot;: &quot;0xabc...123&quot;,  </span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    &quot;chain_id&quot;: 56,  </span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">    &quot;timestamp&quot;: 1732178452  </span><br></span><span class="token-line" style="color:#393A34"><span class="token plain">  }  </span><br></span><span class="token-line" style="color:#393A34"><span class="token plain"> }</span><br></span></code></pre><div class="buttonGroup_oDVH"><button type="button" aria-label="Copy code to clipboard" title="Copy" class="clean-btn"><span class="copyButtonIcons_hTZm" aria-hidden="true"><svg viewBox="0 0 24 24" class="copyButtonIcon_xA0c"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg><svg viewBox="0 0 24 24" class="copyButtonSuccessIcon_ZIiU"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span></button></div></div></div>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="web3-api-performance">Web3 API Performance<a class="hash-link" aria-label="Direct link to Web3 API Performance" title="Direct link to Web3 API Performance" href="/docs/w3w_task_verification_api/apis#web3-api-performance">​</a></h2>
<ul>
<li>Ensure your API can support &gt;=<strong>50 QPS.</strong>
<ul>
<li>In special cases, Binance will review your campaign and contact you to increase the API QPS threshold. (E.g. Marketing plan is possible to attract extra traffic to your campaign, or special task design will cause high peak verification queries)</li>
<li>API performance is vital. So please conduct a performance test on the API.</li>
<li>Before developing the API, review the campaign mechanism. Avoid mechanisms requiring all users to verify tasks at the same time.  (E.g. a task user can only verify on the last day of a campaign)</li>
<li>When API encounters performance issues, please return an error (error code:000002) to the caller.</li>
</ul>
</li>
</ul>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="api-maintenance-periods">API Maintenance Periods:<a class="hash-link" aria-label="Direct link to API Maintenance Periods:" title="Direct link to API Maintenance Periods:" href="/docs/w3w_task_verification_api/apis#api-maintenance-periods">​</a></h2>
<ul>
<li>Maintain the API till 3 days after the campaign end time.
<ul>
<li>E.g.: the campaign using your API ends on 1st Jan 2025 00:00(UTC), then the earliest time you can sunset the API is 4th Jan 2025 00:00(UTC)</li>
<li>Before you sunset the API, please ensure no traffic hits your API. If there is still traffic to your API, please contact the Binance team.</li>
</ul>
</li>
</ul>
<h2 class="anchor anchorWithStickyNavbar_fMI7" id="other-good-practise-for-api-developing">Other Good Practise for API Developing:<a class="hash-link" aria-label="Direct link to Other Good Practise for API Developing:" title="Direct link to Other Good Practise for API Developing:" href="/docs/w3w_task_verification_api/apis#other-good-practise-for-api-developing">​</a></h2>
<ul>
<li>Use 95% of the original criteria to verify user’s task status.
<ul>
<li>E.g. for a task that requires the user to stake more than 10 USDT, the API should return completed (True) if the user takes more than 9.5 USDT.</li>
</ul>
</li>
<li>Avoid API changes before sunsetting the API.
<ul>
<li>Please update stakeholders if the API has to be updated due to logic change or issue fix.</li>
</ul>
</li>
<li>Monitor the API performances especially the 1st 4 hours after the campaign launch time.</li>
</ul>
<ul>
<li>
<p><strong>Observability &amp; slow-query management</strong></p>
<ul>
<li>
<p>Enable slow-query logs for <strong>DB</strong> and <strong>Redis</strong> (or other caches) and wire up application/APM monitoring (latency percentiles, error codes, dependency timings).</p>
</li>
<li>
<p>Use distributed tracing (Trace/Span IDs) end-to-end so you can pinpoint bottlenecks quickly.</p>
</li>
<li>
<p>Define alert thresholds and on-call procedures for timeouts and rising error rates.</p>
</li>
</ul>
</li>
<li>
<p><strong>SQL review &amp; caching strategy</strong></p>
<ul>
<li>
<p>Audit <strong>all</strong> SQL statements:</p>
<ul>
<li>
<p>Ensure predicates use appropriate <strong>indexes</strong>; avoid full scans and implicit casts.</p>
</li>
<li>
<p>Review execution plans (<code>EXPLAIN</code>) and data distribution regularly.</p>
</li>
</ul>
</li>
<li>
<p>Identify <strong>hot keys</strong> / high-QPS reads; use <strong>Redis</strong> (or similar) with proper TTLs and invalidation/backfill.</p>
</li>
<li>
<p>Protect against cache <strong>penetration / breakdown / avalanche</strong> (e.g., negative caching, jittered TTLs, bulkhead isolation).</p>
</li>
<li>
<p>Revisit schema/index health periodically; consider archival, read replicas, or sharding where needed.</p>
</li>
</ul>
</li>
</ul>
<p>Provide feedback on this document: <a href="https://forms.gle/zpBnQWCqoFMmby698" target="_blank" rel="noopener noreferrer">https://forms.gle/zpBnQWCqoFMmby698</a></p></div></article><nav class="pagination-nav docusaurus-mt-lg" aria-label="Docs pages"><a class="pagination-nav__link pagination-nav__link--next" href="/docs/w3w_task_verification_api/on-chain-verification"><div class="pagination-nav__sublabel">Next</div><div class="pagination-nav__label">On-Chain Verification</div></a></nav></div></div><div class="col col--3"><div class="tableOfContents_zXaw thin-scrollbar theme-doc-toc-desktop"><ul class="table-of-contents table-of-contents__left-border"><li><a class="table-of-contents__link toc-highlight" href="/docs/w3w_task_verification_api/apis#web3-api-description">Web3 API description</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/w3w_task_verification_api/apis#general-api-information">General API Information</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/w3w_task_verification_api/apis#api-specification">API Specification​</a><ul><li><a class="table-of-contents__link toc-highlight" href="/docs/w3w_task_verification_api/apis#task-completion">Task Completion</a></li></ul></li><li><a class="table-of-contents__link toc-highlight" href="/docs/w3w_task_verification_api/apis#web3-api-performance">Web3 API Performance</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/w3w_task_verification_api/apis#api-maintenance-periods">API Maintenance Periods:</a></li><li><a class="table-of-contents__link toc-highlight" href="/docs/w3w_task_verification_api/apis#other-good-practise-for-api-developing">Other Good Practise for API Developing:</a></li></ul></div></div></div></div></main></div></div></div><footer class="footer footer--dark"><div class="container container-fluid"><div class="footer__bottom text--center"><div class="footer__copyright">Copyright © 2026 Binance.</div></div></div></footer></div>
</body>
</html>
