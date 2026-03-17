# Histogram Column Width Calculationstip
It is recommend that you first read the [Pixel Perfect Rendering](/lightweight-charts/docs/plugins/pixel-perfect-rendering) page.
The following functions can be used to get the calculated width that the library would use for a histogram column at a specific bar spacing and device pixel ratio.
You can use the `calculateColumnPositionsInPlace` function instead of the `calculateColumnPositions` function to perform the calculation on an existing array of items without needing to create additional arrays (which is more efficient). It is recommended that you memoize the majority of the calculations below to improve the rendering performance.
```
\1
```