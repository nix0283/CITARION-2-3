> **Source:** https://developers.binance.com/docs/login/introduction

# Binance Login (OAuth2)

The Binance OAuth (2.0) allows users to share specific data with an 3rd application while keeping their accounts' API keys or login credentials, and other information private.

The Binance API allows developers to use the OAuth2 protocol to allow a Binance user to grant a 3rd party application full or partial access to his/her account.

For example, an application can use OAuth 2.0 to obtain users' Binance wallet addresses.
Binance Login supports web/app applications for now.

Binance Login(Oauth2.0), is only provided to close ecosystem partners now. Please reach to our business team for more details.

## Key Features

- **OAuth 2.0 Protocol**: Standard authorization framework
- **Secure Access**: Users can share specific data without sharing credentials
- **Web & App Support**: Works for web server, single page, mobile and native applications
- **Scoped Permissions**: Request only the permissions you need

## Available Scopes

| Scope | Description |
|-------|-------------|
| `user:openId` | Access to user's OpenID |
| `create:apikey` | Create API keys on behalf of user |
| `read` | Read access to user data |

## Getting Started

1. Visit the [Binance Developer Center](https://developers.binance.com/en)
2. Sign up for a Binance entity account
3. Navigate to your console to create an OAuth application
4. Get your client ID and client secret

**Note:** Binance Login (OAuth 2.0) is exclusively offered to close ecosystem partners. Please reach out to our business team for further information.
