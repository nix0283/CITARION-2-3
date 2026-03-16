# Candlestick Width Calculationstip
It is recommend that you first read the [Pixel Perfect Rendering](/lightweight-charts/docs/plugins/pixel-perfect-rendering) page.
The following functions can be used to get the calculated width that the library would use for a candlestick at a specific bar spacing and device pixel ratio.
Below a bar spacing of 4, the library will attempt to use as large a width as possible without the possibility of overlapping, whilst above 4 then the width will start to trend towards an 80% width of the available space.
warning
It is expected that candles can overlap slightly at smaller bar spacings (more pronounced on lower resolution devices). This produces a more readable chart. If you need to ensure that bars can never overlap then rather use the widths for [Columns](/lightweight-charts/docs/plugins/pixel-perfect-rendering/widths/columns) or the [full bar width](/lightweight-charts/docs/plugins/pixel-perfect-rendering/widths/full-bar-width) calculation.
```
\1
```