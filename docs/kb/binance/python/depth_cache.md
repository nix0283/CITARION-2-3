# Depth Cache &mdash; Python Binance 0.2.0 documentation

> **Source:** https://python-binance.readthedocs.io/en/latest/depth_cache.html

---

Depth Cache — python-binance 0.2.0 documentation
- []
- Depth Cache
- 
[ View page source]
---
# Depth Cache[]
To follow the depth cache updates for a symbol there are 2 options similar to websockets.
Use the [DepthCacheManager]
(or [OptionsDepthCacheManager] for vanilla options) or
use the [ThreadedDepthCacheManager]
if you don’t want to interact with asyncio.
## ThreadedDepthCacheManager Websocket Usage[]
Starting sockets on the ThreadedDepthCacheManager requires a callback parameter, similar to old implementations of
depth cache on python-binance pre v1
ThreadedDepthCacheManager takes similar parameters to the [Client] class
as it creates an AsyncClient internally.
As these use threads start() is required to be called before starting any depth cache streams.
To keep the ThreadedDepthCacheManager running using join() to join it to the main thread.
```python
from binance import ThreadedDepthCacheManager
def main():
dcm = ThreadedDepthCacheManager()
# start is required to initialise its internal loop
dcm.start()
def handle_depth_cache(depth_cache):
print(f"symbol {depth_cache.symbol}")
print("top 5 bids")
print(depth_cache.get_bids()[:5])
print("top 5 asks")
print(depth_cache.get_asks()[:5])
print("last update time {}".format(depth_cache.update_time))
dcm_name = dcm.start_depth_cache(handle_depth_cache, symbol='BNBBTC')
# multiple depth caches can be started
dcm_name = dcm.start_depth_cache(handle_depth_cache, symbol='ETHBTC')
dcm.join()
if __name__ == "__main__":
main()
```
**Stop Individual Depth Cache**
When starting a stream, a name for that stream will be returned. This can be used to stop that individual stream
```python
from binance import ThreadedDepthCacheManager
symbol = 'BNBBTC'
dcm = ThreadedDepthCacheManager()
dcm.start()
def handle_depth_cache(depth_cache):
print(f"message type: {msg['e']}")
print(msg)
dcm_name = dcm.start_depth_cache(handle_depth_cache, symbol='BNBBTC')
# some time later
dcm.stop_socket(dcm_name)
```
**Stop All Depth Cache streams**
```python
from binance import ThreadedDepthCacheManager
symbol = 'BNBBTC'
dcm = ThreadedDepthCacheManager()
dcm.start()
def handle_depth_cache(depth_cache):
print(f"message type: {msg['e']}")
print(msg)
dcm_name = dcm.start_depth_cache(handle_depth_cache, symbol='BNBBTC')
# some time later
dcm.stop()
```
Attempting to start a stream after stop is called will not work.
## DepthCacheManager or OptionsDepthCacheManager Usage[]
Create the manager like so, passing the async api client, symbol and an optional callback function.
```python
import asyncio
from binance import AsyncClient, DepthCacheManager
async def main():
client = await AsyncClient.create()
dcm = DepthCacheManager(client, 'BNBBTC')
async with dcm as dcm_socket:
while True:
depth_cache = await dcm_socket.recv()
print("symbol {}".format(depth_cache.symbol))
print("top 5 bids")
print(depth_cache.get_bids()[:5])
print("top 5 asks")
print(depth_cache.get_asks()[:5])
print("last update time {}".format(depth_cache.update_time))
if __name__ == "__main__":
loop = asyncio.get_event_loop()
loop.run_until_complete(main())
```
The DepthCacheManager returns an Asynchronous Context Manager which can be used with async for
or by interacting with the __aenter__ and __aexit__ functions
By default the depth cache will fetch the order book via REST request every 30 minutes.
This duration can be changed by using the refresh_interval parameter. To disable the refresh pass 0 or None.
The socket connection will stay open receiving updates to be replayed once the full order book is received.
## Share a Socket Manager[]
Here dcm1 and dcm2 share the same instance of BinanceSocketManager
```python
from binance.websockets import BinanceSocketManager
from binance.depthcache import DepthCacheManager
bm = BinanceSocketManager(client)
dcm1 = DepthCacheManager(client, 'BNBBTC', bm=bm)
dcm2 = DepthCacheManager(client, 'ETHBTC', bm=bm)
```
## Websocket Errors[]
If the underlying websocket is disconnected and is unable to reconnect None is returned for the depth_cache parameter.
If the underlying websocket is disconnected an error msg is passed to the callback and to recv() containing the error message.
In the case the BinanceWebsocketClosed is returned, the websocket will attempt to reconnect 5 times before returning a BinanceUnableToConnect error.
Example:
```python
depth_cache = await dcm.recv()
if isinstance(depth_cache, dict) and depth_cache.get('e') == 'error':
logger.error(f"Received depth cache error in callback: {depth_cache}")
if type == 'BinanceWebsocketClosed':
# ignore as attempts to reconnect
continue
break
```
## Examples[]
```python
# 1 hour interval refresh
dcm = DepthCacheManager(client, 'BNBBTC', refresh_interval=60*60)
# disable refreshing
dcm = DepthCacheManager(client, 'BNBBTC', refresh_interval=0)
```
```python
async with dcm as dcm_socket:
while True:
depth_cache = await dcm_socket.recv()
print("symbol {}".format(depth_cache.symbol))
print("top 5 bids")
print(depth_cache.get_bids()[:5])
print("top 5 asks")
print(depth_cache.get_asks()[:5])
print("last update time {}".format(depth_cache.update_time))
```
To use the magic __aenter__ and __aexit__ functions to use this class without the async with
```python
dcm = DepthCacheManager(client, 'BNBBTC')
await dcm.__aenter__()
depth_cache = await dcm.recv()
print("symbol {}".format(depth_cache.symbol))
print("top 5 bids")
print(depth_cache.get_bids()[:5])
print("top 5 asks")
print(depth_cache.get_asks()[:5])
print("last update time {}".format(depth_cache.update_time))
# exit the context manager
await dcm.__aexit__(None, None, None)
```
[ Previous]
[Next ]
---
© Copyright 2017, Sam McHardy.
Built with [Sphinx] using a
[theme]
provided by [Read the Docs].