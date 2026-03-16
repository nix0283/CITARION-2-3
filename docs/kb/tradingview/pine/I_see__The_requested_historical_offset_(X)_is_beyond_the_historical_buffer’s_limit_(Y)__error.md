# I see "The requested historical offset (X) is beyond the historical buffer’s limit (Y)" error

**URL:** https://www.tradingview.com/support/solutions/43000587849-i-see-the-requested-historical-offset-x-is-beyond-the-historical-buffer-s-limit-y-error/

---

- [ Help Center ](/)
- / 
- / [ I see "The requested historical offset (X) is beyond the historic… ](/support/solutions/43000587849-i-see-the-requested-historical-offset-x-is-beyond-the-historical-buffer-s-limit-y-error/)

# I see "The requested historical offset (X) is beyond the historical buffer’s limit (Y)" error 
 To ensure the continued availability of computing resources for all TradingView users, we limit the historical buffer that is available to Pine variables on each script execution. If a script requests a value outside of that buffer, it raises a runtime error. 

If you have access to the source code, resolve the error by fixing the requests that go out of bounds or increase the buffer size, as described in [this Pine Script® User Manual article](https://www.tradingview.com/pine-script-docs/error-messages/#the-requested-historical-offset-x-is-beyond-the-historical-buffers-limit-y). Otherwise, inform the script’s author of the error.
 Previous Previous I see 'Calculation takes too long to execute' error Next Next I see the "Memory limits exceeded" error Launch Supercharts

