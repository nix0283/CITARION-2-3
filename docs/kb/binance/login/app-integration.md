# Integrate Binance Login with your App

> **Source:** https://developers.binance.com/docs/login/app-integration

# Integrate Binance Login with your App



## Binance Oauth 2.0[​](/docs/login/app-integration#binance-oauth-20)

Binance Oauth 2.0 provides two authorization ways, through Binance app or
web page, which is convenient to authorize the Binance account safely and quickly. it will adopt different ways according to the situations and users' choices.

To begin, your app should identify the needed permissions (scope) firstly. Setup and register your app with Binance Accounts, and get your client_id . For now, Binance Login(Oauth2.0), is only provided to close ecosystem partners now. Please reach to our business team for more details.

### Process Introduction[​](/docs/login/app-integration#process-introduction)

The Binance app will be called to authorize when the user clicks to login with the Binance account in the app. If the user does not install the Binance app supported the authorization,there would be a prompt for the user to authorize through the browser or download the Binance app. The result would be returned to the app after the authorization is finished.

## Integrate for Android[​](/docs/login/app-integration#integrate-for-android)

### How to use?[​](/docs/login/app-integration#how-to-use)

#### Create a url[​](/docs/login/app-integration#create-a-url)

- 
First you need a url start with '[https://accounts.binance.com/oauth/authorize](https://accounts.binance.com/oauth/authorize)' to construct an intent.

- 
Add the query parameters listed on the `parameter and description` table(At the article's end).

- 
Eexample:

`https://accounts.binance.com/oauth/authorize?response_type=code&scope=user:openId,create:apikey&client_id=xxxxxxxxx&redirect_uri=https%3A%2F%2Faccounts.pexpay.com%2Fen%2Foauth-handle&state=76ea8434ceca47ada566308030ef5f5c&bundleID=com.xxx.www`

#### Create an Intent and start oauth activity[​](/docs/login/app-integration#create-an-intent-and-start-oauth-activity)

- Using the URL you created, to create an new Intent, then start the Activity:

```
val uri = Uri.Builder()
 .scheme("https")
 .authority("accounts.binance.com")
 .appendPath("oauth")
 .appendPath("authorize")
 .appendQueryParameter("response_type", "code")
 .appendQueryParameter("scope", scope)
 .appendQueryParameter("redirect_uri", redirectUri)
 .appendQueryParameter("state", state)
 .appendQueryParameter("client_id", clientID)
 .build()
val intent = Intent(Intent.ACTION_VIEW, uri)
startActivity(intent)

```

Or

```
val uri = Uri.parse(
 "https://accounts.binance.com/oauth/authorize?response_type=code&scope=user:openId,create:apikey&client_id=xxxxxxxxx&redirect_uri=https%3A%2F%2Faccounts.pexpay.com%2Fen%2Foauth-handle&state=76ea8434ceca47ada566308030ef5f5c&bundleID=com.xxx.www"
)
val intent = Intent(Intent.ACTION_VIEW, uri)
startActivity(intent)

```

#### Once user finish the oauth successfully, we will call the url you provided through `redirect_uri`[​](/docs/login/app-integration#once-user-finish-the-oauth-successfully-we-will-call-the-url-you-provided-through-redirect_uri)

- 
For example, if you pass "app://yourapp.com" as `redirect_uri`

- 
Once user finish oauth.

If success:

We will call `app://yourapp.com?code=xxxxx&state=xxxxx` as intent uri with action: `Intent.ACTION_VIEW` and category: `Intent.CATEGORY_BROWSABLE`.

After getting the code, it will be sent to your server. Your server will then send it to the oauth server to get the user data and complete the authorization process.

- If failed:
We will call `app://yourapp.com?error=xxxxx&error_description=xxxxx` as intent uri with action: `Intent.ACTION_VIEW` and category: `Intent.CATEGORY_BROWSABLE`.

You can find the error and error_description on the `error and error_description` table(At the article's end).

- 
So if you want to get the result of this OAuth action, you should announce that your app can consume the intent, you can achieve this by adding those codes into your AndroidMainfest.xml:

```
<activity
 android:exported="true"
 android:name=".YourActivity">

 <intent-filter>
 <action android:name="android.intent.action.VIEW" />

 <category android:name="android.intent.category.DEFAULT" />
 <category android:name="android.intent.category.BROWSABLE" />

 <data
 android:host="yourapp.com"
 android:scheme="app" />
 </intent-filter>

</activity>

```

Then finally get the uri on `onCreate` or `onNewIntent`:

```
class YourActivity : AppCompatActivity() {

 override fun onCreate(savedInstanceState: Bundle?) {
 super.onCreate(savedInstanceState)

 val uri = intent.data
 //handle the uri here
 }

 override fun onNewIntent(intent: Intent?) {
 super.onNewIntent(intent)

 val uri = intent.data
 //handle the uri here
 }

 ......
}

```

## Please note that, this function is based on Android App Links. So sometimes when the user's application's AppUrls haven't finished verified, this function may not work correctly. Which means you will always be led to the website to do the OAuth.[​](/docs/login/app-integration#please-note-that-this-function-is-based-on-android-app-links-so-sometimes-when-the-users-applications-appurls-havent-finished-verified-this-function-may-not-work-correctly-which-means-you-will-always-be-led-to-the-website-to-do-the-oauth)

## Integrate for iOS[​](/docs/login/app-integration#integrate-for-ios)

### How to use?[​](/docs/login/app-integration#how-to-use-1)

#### Create a url[​](/docs/login/app-integration#create-a-url-1)

- 
First you need a url '[https://accounts.binance.com/oauth/authorize](https://accounts.binance.com/oauth/authorize)'

- 
Add the query parameters listed on the parameter and description table(At the article's end).

- 
Eexample Scheme:

`https://accounts.binance.com/oauth/authorize?response_type=code&scope=user:openId,create:apikey&client_id=xxxxxxxxx&redirect_uri=oauthdemo%3A%2F%2Flogin&state=76ea8434ceca47ada566308030ef5f5c&bundleID=com.xxx.www `

- 
Eexample Universal link:

`https://accounts.binance.com/oauth/authorize?response_type=code&scope=user:openId,create:apikey&client_id=xxxxxxxxx&redirect_uri=https%3A%2F%2Faccounts.pexpay.com%2Fen%2Foauth-handle&state=76ea8434ceca47ada566308030ef5f5c&bundleID=com.xxx.www" `

- 
If you use scheme, you must add path, otherwise it will definitely fail.`redirect_uri=oauthdemo%3A%2F%2Flogin`

#### Start oauth[​](/docs/login/app-integration#start-oauth)

- 
Using the url you created to open binance app

```
let urlString = "https://accounts.binance.com/oauth/authorize?response_type=code&scope=user:openId,create:apikey&client_id=m1smLsRw0q&redirect_uri=oauthdemo%3A%2F%2Flogin&state=76ea8434ceca47ada566308030ef5f5c"
guard let url = URL(string: urlString) else {
 return
}
UIApplication.shared.open(url)

```

#### Get oauth result[​](/docs/login/app-integration#get-oauth-result)

- 
Once user finish the oauth successfully, we will call the url you provided through `redirect_uri` and get your result

```
func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
 print("*****\(String(describing: URLContexts.first))*****")
}

*****Optional(<UIOpenURLContext: 0x283e58d60; URL: oauthdemo://login?state=76ea8434ceca47ada566308030ef5f5c&code=XP2Vp57c3lyQeqp25tTglA4QqgKxAbEk; options: <UISceneOpenURLOptions: 0x282b284c0; sourceApp: com.xxxxx.xxxx; annotation: (null); openInPlace: NO; _eventAttribution: (null)>>)*****

oauthdemo://login?state=76ea8434ceca47ada566308030ef5f5c&code=XP2Vp57c3lyQeqp25tTglA4QqgKxAbEk is the result returned

```

After getting the code, it will be sent to your server. Your server will then send it to the oauth server to get the user data and complete the authorization process.

#### Error Type[​](/docs/login/app-integration#error-type)

- 
Eexample

```
*****Optional(<UIOpenURLContext: 0x283e5d2c0; URL: oauthdemo://login?error=cancelled&error_description=cancelled%20by%20user; options: <UISceneOpenURLOptions: 0x282b34e40; sourceApp: com.czzhao.binance.dev; annotation: (null); openInPlace: NO; _eventAttribution: (null)>>)*****

```

You can find the error and error_description on the `error and error_description` table(At the article's end).

## Add On Tables[​](/docs/login/app-integration#add-on-tables)

- 

### error and error_description:[​](/docs/login/app-integration#error-and-error_description)

| error | description |
| cancelled | User has cancelled the authorization manually. |
| readClientInfoFailed | Binance App read your app's information failed. |
| invaildClientInfo | You app's information is invalid. |

- 

### parameter and description:[​](/docs/login/app-integration#parameter-and-description)

| parameter | description |
| redirectUri | The URL in your application where users will be redirected after web authorization. |
| scope | List of scopes enum your application requests access to, with comma (`,`) seperated. |
| state | The CSRF token to protect against CSRF (cross-site request forgery) attacks. |
| response_type | Always use `code` |
| client_id | Binance client ID |
| bundleID (Optional) | Bundle ID of your app |

---
*Documentation scraped for AI agent reference*
