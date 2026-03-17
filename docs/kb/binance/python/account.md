# Account Endpoints &mdash; Python Binance 0.2.0 documentation

> **Source:** https://python-binance.readthedocs.io/en/latest/account.html

---

Account Endpoints — python-binance 0.2.0 documentation
- []
- Account Endpoints
- 
[ View page source]
---
# Account Endpoints[]
## Orders[]
### Order Validation[]
Binance has a number of rules around symbol pair orders with validation on minimum price, quantity and total order value.
Read more about their specifics in the [Filters]
section of the official API.
Read [Understanding Binance Order Filters]
for more information about price and quantity filters on [Binance].
It can be helpful to format the output using formatting
```python
amount = 0.000234234
precision = 5
amt_str = "{:0.0{}f}".format(amount, precision)
```
Or if you have the tickSize or stepSize then use the helper to round to step size
```python
from binance.helpers import round_step_size
amount = 0.000234234
tick_size = 0.00001
rounded_amount = round_step_size(amount, tick_size)
```
### [Fetch all orders][]
```python
orders = client.get_all_orders(symbol='BNBBTC', limit=10)
```
### [Place an order][]
**Place an order**
Use the create_order function to have full control over creating an order
```python
from binance.enums import *
order = client.create_order(
symbol='BNBBTC',
side=SIDE_BUY,
type=ORDER_TYPE_LIMIT,
timeInForce=TIME_IN_FORCE_GTC,
quantity=100,
price='0.00001')
```
**Place a limit order**
Use the helper functions to easily place a limit buy or sell order
```python
order = client.order_limit_buy(
symbol='BNBBTC',
quantity=100,
price='0.00001')
order = client.order_limit_sell(
symbol='BNBBTC',
quantity=100,
price='0.00001')
```
**Place a market order**
Use the helper functions to easily place a market buy or sell order
```python
order = client.order_market_buy(
symbol='BNBBTC',
quantity=100)
order = client.order_market_sell(
symbol='BNBBTC',
quantity=100)
```
**Place an OCO order**
Use the create_oco_order function to have full control over creating an OCO order
```python
from binance.enums import *
order = client.create_oco_order(
symbol='BNBBTC',
side=SIDE_SELL,
stopLimitTimeInForce=TIME_IN_FORCE_GTC,
quantity=100,
stopPrice='0.00001',
price='0.00002')
```
### [Place a test order][]
Creates and validates a new order but does not send it into the exchange.
```python
from binance.enums import *
order = client.create_test_order(
symbol='BNBBTC',
side=SIDE_BUY,
type=ORDER_TYPE_LIMIT,
timeInForce=TIME_IN_FORCE_GTC,
quantity=100,
price='0.00001')
```
### [Check order status][]
```python
order = client.get_order(
symbol='BNBBTC',
orderId='orderId')
```
### [Cancel an order][]
```python
result = client.cancel_order(
symbol='BNBBTC',
orderId='orderId')
```
### [Get all open orders][]
```python
orders = client.get_open_orders(symbol='BNBBTC')
```
### [Get all orders][]
```python
orders = client.get_all_orders(symbol='BNBBTC')
```
## Account[]
### [Get account info][]
```python
info = client.get_account()
```
### [Get asset balance][]
```python
balance = client.get_asset_balance(asset='BTC')
```
### [Get account status][]
```python
status = client.get_account_status()
```
### [Get account API trading status][]
```python
status = client.get_account_api_trading_status()
```
### [Get trades][]
```python
trades = client.get_my_trades(symbol='BNBBTC')
```
### [Get trade fees][]
```python
# get fees for all symbols
fees = client.get_trade_fee()
# get fee for one symbol
fees = client.get_trade_fee(symbol='BNBBTC')
```
### [Get asset details][]
```python
details = client.get_asset_details()
```
### [Get dust log][]
```python
log = client.get_dust_log()
```
### [Transfer dust][]
```python
transfer = client.transfer_dust(asset='BNZ')
```
### [Get Asset Dividend History][]
```python
history = client.get_asset_dividend_history()
```
### [Disable Fast Withdraw Switch][]
```python
client.disable_fast_withdraw_switch()
```
### [Enable Fast Withdraw Switch][]
```python
client.enable_fast_withdraw_switch()
```
[ Previous]
[Next ]
---
© Copyright 2017, Sam McHardy.
Built with [Sphinx] using a
[theme]
provided by [Read the Docs].