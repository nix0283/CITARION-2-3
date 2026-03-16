# General Endpoints &mdash; Python Binance 0.2.0 documentation

> **Source:** https://python-binance.readthedocs.io/en/latest/general.html

---

General Endpoints — python-binance 0.2.0 documentation
- []
- General Endpoints
- 
[ View page source]
---
# General Endpoints[]
## [Ping the server][]
```python
client.ping()
```
## [Get the server time][]
```python
time_res = client.get_server_time()
```
## [Get system status][]
```python
status = client.get_system_status()
```
Returns
```python
{
"status": 0,        # 0: normal，1：system maintenance
"msg": "normal"     # normal or System maintenance.
}
```
## [Get Exchange Info][]
```python
info = client.get_exchange_info()
```
## [Get Symbol Info][]
Get the exchange info for a particular symbol
```python
info = client.get_symbol_info('BNBBTC')
```
## [Get All Coins Info][]
Get information of coins (available for deposit and withdraw) for user
```python
info = client.get_all_tickers()
```
## [Get Get Daily Account Snapshot][]
Get daily account snapshot of specific type. Valid types: SPOT/MARGIN/FUTURES.
```python
info = client.get_account_snapshot(type='SPOT')
```
## [Get Current Products][]
This call is deprecated, use the above Exchange Info call
```python
products = client.get_products()
```
[ Previous]
[Next ]
---
© Copyright 2017, Sam McHardy.
Built with [Sphinx] using a
[theme]
provided by [Read the Docs].