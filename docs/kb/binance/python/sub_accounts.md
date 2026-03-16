# Sub Account Endpoints &mdash; Python Binance 0.2.0 documentation

> **Source:** https://python-binance.readthedocs.io/en/latest/sub_accounts.html

---

Sub Account Endpoints — python-binance 0.2.0 documentation
- []
- Sub Account Endpoints
- 
[ View page source]
---
# Sub Account Endpoints[]
## [Get Sub Account list][]
```python
accounts = client.get_sub_account_list()
```
## [Get Sub Account Transfer History][]
```python
history = client.get_sub_account_transfer_history(fromEmail='blah@gmail.com', toEmail='foo@gmail.com')
```
## [Get Sub Account Assets][]
```python
assets = client.get_sub_account_assets(email='blah@gmail.com')
```
[ Previous]
[Next ]
---
© Copyright 2017, Sam McHardy.
Built with [Sphinx] using a
[theme]
provided by [Read the Docs].