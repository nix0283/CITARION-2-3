# Canvas Rendering Target
The renderer functions used within the plugins (both Custom Series, and Drawing
Primitives) are provided with a `CanvasRenderingTarget2D` interface on which the
drawing logic (using the
[Browser's 2D Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D))
should be executed. `CanvasRenderingTarget2D` is provided by the
[Fancy Canvas](https://github.com/tradingview/fancy-canvas) library.
info
The typescript definitions can be viewed here:
- [fancy-canvas on npmjs.com](https://www.npmjs.com/package/fancy-canvas?activeTab=code)
and specifically the definition for `CanvasRenderingTarget2D` can be viewed
here:
- [canvas-rendering-target.d.ts](https://unpkg.com/fancy-canvas/canvas-rendering-target.d.ts)
## Using `CanvasRenderingTarget2D`[​](#using-canvasrenderingtarget2d)
`CanvasRenderingTarget2D` provides two rendering scope which you can use:
- `useMediaCoordinateSpace`
- `useBitmapCoordinateSpace`
## Difference between Bitmap and Media[​](#difference-between-bitmap-and-media)
Bitmap sizing represents the actual physical pixels on the device's screen,
while the media size represents the size of a pixel according to the operating
system (and browser) which is generally an integer representing the ratio of
actual physical pixels are used to render a media pixel. This integer ratio is
referred to as the device pixel ratio.
Using the bitmap sizing allows for more control over the drawn image to ensure
that the graphics are crisp and pixel perfect, however this generally means that
the code will contain a lot multiplication of coordinates by the pixel ratio. In
cases where you don't need to draw using the bitmap sizing then it is easier to
use media sizing as you don't need to worry about the devices pixel ratio.
### Bitmap Coordinate Space[​](#bitmap-coordinate-space)
`useBitmapCoordinateSpace` can be used to if you would like draw using the
actual devices pixels as the coordinate sizing. The provided scope (of type
`BitmapCoordinatesRenderingScope`) contains readonly values for the following:
- `context`
([CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)).
Context which can be used for rendering.
- `horizontalPixelRatio` (number)
- `verticalPixelRatio` (number)
- `bitmapSize` (Size). Height and width of the canvas in bitmap dimensions.
- `mediaSize` (Size). Height and width of the canvas in media dimensions.
#### Bitmap Coordinate Space Usage[​](#bitmap-coordinate-space-usage)
javascript
```
\1
```
### Media Coordinate Space[​](#media-coordinate-space)
`useMediaCoordinateSpace` can be used to if you would like draw using the media
dimensions as the coordinate sizing. The provided scope (of type
`MediaCoordinatesRenderingScope`) contains readonly values for the following:
- `context`
([CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)).
Context which can be used for rendering.
- `mediaSize` (Size). Height and width of the canvas in media dimensions.
#### Media Coordinate Space Usage[​](#media-coordinate-space-usage)
javascript
```
\1
```
## General Tips[​](#general-tips)
It is recommended that rendering functions should save and restore the canvas
context before and after all the rendering logic to ensure that the canvas state
is the same as when the renderer function was evoked. To handle the case
when an error in the code might prevent the restore function from being evoked,
you should use the try - finally code block to ensure that the context is
correctly restored in all cases.
**Note** that `useBitmapCoordinateSpace` and `useMediaCoordinateSpace` will automatically
save and restore the canvas context for the logic defined within them. This tip for your
additional rendering functions within the `use*CoordinateSpace`.
javascript
```
\1
```