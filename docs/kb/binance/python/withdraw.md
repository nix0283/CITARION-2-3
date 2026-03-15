# Withdraw Endpoints &mdash; Python Binance 0.2.0 documentation

> **Source:** https://python-binance.readthedocs.io/en/latest/withdraw.html

---

Withdraw Endpoints — python-binance 0.2.0 documentation
- []
- Withdraw Endpoints
- 
[ View page source]
---
# Withdraw Endpoints[]
## [Place a withdrawal][]
Make sure you enable Withdrawal permissions for your API Key to use this call.
You must have withdrawn to the address through the website and approved the withdrawal via email before you can withdraw using the API.
```python
from binance.exceptions import BinanceAPIException
try:
# name parameter will be set to the asset value by the client if not passed
result = client.withdraw(
coin='ETH',
address='<eth_address>',
amount=100)
except BinanceAPIException as e:
print(e)
else:
print("Success")
# passing a name parameter
result = client.withdraw(
coin='ETH',
address='<eth_address>',
amount=100,
name='Withdraw')
# if the coin requires a extra tag or name such as XRP or XMR then pass an `addressTag` parameter.
result = client.withdraw(
coin='XRP',
address='<xrp_address>',
addressTag='<xrp_address_tag>',
amount=10000)
```
## [Fetch deposit history][]
```python
deposits = client.get_deposit_history()
btc_deposits = client.get_deposit_history(coin='BTC')
```
## [Fetch withdraw history][]
```python
withdraws = client.get_withdraw_history()
btc_withdraws = client.get_withdraw_history(coin='BTC')
```
## [Get deposit address][]
```python
address = client.get_deposit_address(coin='BTC')
```
[ Previous]
[Next ]
---
© Copyright 2017, Sam McHardy.
Built with [Sphinx] using a
[theme]
provided by [Read the Docs].