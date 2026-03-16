# Best Practices for Pixel Perfect Rendering in Canvas Drawings
To achieve crisp pixel perfect rendering for your plugins, it is recommended that the canvas drawings are created using bitmap coordinates. The difference between media and bitmap coordinate spaces is discussed on the [Canvas Rendering Target](/lightweight-charts/docs/plugins/canvas-rendering-target) page. **Essentially, all drawing actions should use integer positions and dimensions when on the bitmap coordinate space.**
To ensure consistency between your plugins and the library's built-in logic for rendering points on the chart, use of the following calculation functions.
info
Variable names containing `media` refer to positions / dimensions specified using the media coordinate space (such as the x and y coordinates provided by the library to the renderers), and names containing `bitmap` refer to positions / dimensions on the bitmap coordinate space (actual device screen pixels).
## Centered Shapes[​](#centered-shapes)
If you need to draw a shape which is centred on a position (for example a price or x coordinate) and has a desired width then you could use the `positionsLine` function presented below. This can be used for drawing a horizontal line at a specific price, or a vertical line aligned with the centre of series point.
```
\1
```
## Dual Point Shapes[​](#dual-point-shapes)
If you need to draw a shape between two coordinates (for example, y coordinates for a high and low price) then you can use the `positionsBox` function as presented below.
```
\1
```
## Default Widths[​](#default-widths)
Please refer to the following pages for functions defining the default widths of shapes drawn by the library:
- [Crosshair and Grid Lines](/lightweight-charts/docs/plugins/pixel-perfect-rendering/widths/crosshair)
- [Candlesticks](/lightweight-charts/docs/plugins/pixel-perfect-rendering/widths/candlestick)
- [Columns (Histogram)](/lightweight-charts/docs/plugins/pixel-perfect-rendering/widths/columns)
- [Full Bar Width](/lightweight-charts/docs/plugins/pixel-perfect-rendering/widths/full-bar-width)