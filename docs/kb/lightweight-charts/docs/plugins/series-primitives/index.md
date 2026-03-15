# Series Primitives
Primitives are extensions to the series which can define views and renderers to
draw on the chart using
[CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D).
Primitives are defined by implementing the
[`ISeriesPrimitive`](/lightweight-charts/docs/api/type-aliases/ISeriesPrimitive) interface. The
interface defines the basic functionality and structure required for creating
custom primitives.
## Views[​](#views)
The primary purpose of a series primitive is to provide one, or more, views to
the library which contain the state and logic required to draw on the chart
panes.
There are two types of views which are supported within `ISeriesPrimitive` which
are:
- [`IPrimitivePaneView`](/lightweight-charts/docs/api/interfaces/IPrimitivePaneView)
- [`ISeriesPrimitiveAxisView`](/lightweight-charts/docs/api/interfaces/ISeriesPrimitiveAxisView)
The library will evoke the following getter functions (if defined) to get
references to the primitive's defined views for the corresponding section of the
chart:
- [`paneViews`](/lightweight-charts/docs/api/interfaces/ISeriesPrimitiveBase#paneviews)
- [`priceAxisPaneViews`](/lightweight-charts/docs/api/interfaces/ISeriesPrimitiveBase#priceaxispaneviews)
- [`timeAxisPaneViews`](/lightweight-charts/docs/api/interfaces/ISeriesPrimitiveBase#timeaxispaneviews)
- [`priceAxisViews`](/lightweight-charts/docs/api/interfaces/ISeriesPrimitiveBase#priceaxisviews)
- [`timeAxisViews`](/lightweight-charts/docs/api/interfaces/ISeriesPrimitiveBase#timeaxisviews)
The first three views allow drawing on the corresponding panes (main chart pane,
price scale pane, and horizontal time scale pane) using the
[CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
and should implement the `ISeriesPrimitivePaneView` interface.
The views returned by the `priceAxisViews` and `timeAxisViews` getter methods
should implement the `ISeriesPrimitiveAxisView` interface and are used to define
labels to be drawn on the corresponding scales.
Below is a visual example showing the various sections of the chart where a
Primitive can draw.
### IPrimitivePaneView[​](#iprimitivepaneview)
The [`IPrimitivePaneView`](/lightweight-charts/docs/api/interfaces/IPrimitivePaneView)
interface can be used to define a view which provides a renderer (implementing
the
[`IPrimitivePaneRenderer`](/lightweight-charts/docs/api/interfaces/IPrimitivePaneRenderer)
interface) for drawing on the corresponding area of the chart using the
[CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
API. The view can define a
[`zOrder`](/lightweight-charts/docs/api/interfaces/IPrimitivePaneView#zorder) to control where
in the visual stack the drawing will occur (See
[`PrimitivePaneViewZOrder`](/lightweight-charts/docs/api/type-aliases/PrimitivePaneViewZOrder)
for more information).
Renderers should provide a
[`draw`](/lightweight-charts/docs/api/interfaces/IPrimitivePaneRenderer#draw) method which will
be given a `CanvasRenderingTarget2D` target on which it can draw. Additionally,
a renderer can optionally provide a
[`drawBackground`](/lightweight-charts/docs/api/interfaces/IPrimitivePaneRenderer#drawbackground)
method for drawing beneath other elements on the same zOrder.
tip
`CanvasRenderingTarget2D` is explained in more detail on the [Canvas Rendering Target](/lightweight-charts/docs/plugins/canvas-rendering-target) page.
#### Interactive Demo of zOrder layers[​](#interactive-demo-of-zorder-layers)
Below is an interactive demo chart illustrating where each zOrder is drawn
relative to the existing chart elements such as the grid, series, and crosshair.
### ISeriesPrimitiveAxisView[​](#iseriesprimitiveaxisview)
The [`ISeriesPrimitiveAxisView`](/lightweight-charts/docs/api/interfaces/ISeriesPrimitiveAxisView)
interface can be used to define a label on the price or time axis.
This interface provides several methods to define the appearance and position of
the label, such as the
[`coordinate`](/lightweight-charts/docs/api/interfaces/ISeriesPrimitiveAxisView#coordinate) method,
which should return the desired coordinate for the label on the axis. It also
defines optional methods to set the fixed coordinate, text, text color,
background color, and visibility of the label.
Please see the
[`ISeriesPrimitiveAxisView`](/lightweight-charts/docs/api/interfaces/ISeriesPrimitiveAxisView)
interface for more details.
## Lifecycle Methods[​](#lifecycle-methods)
Your primitive can use the
[`attached`](/lightweight-charts/docs/api/interfaces/ISeriesPrimitiveBase#attached) and
[`detached`](/lightweight-charts/docs/api/interfaces/ISeriesPrimitiveBase#detached) lifecycle methods to
manage the lifecycle of the primitive, such as creating or removing external
objects and event handlers.
### attached[​](#attached)
This method is called when the primitive is attached to a chart. The attached
method is evoked with a
[single argument](/lightweight-charts/docs/api/interfaces/SeriesAttachedParameter) containing
properties for the chart, series, and a callback to request an update. The
`chart` and `series` properties are references to the chart API and the series
API instances for convenience purposes so that they don't need to be manually
provided within the primitive's constructor (if needed by the primitive).
The `requestUpdate` callback allows the primitive to notify the chart that it
should be updated and redrawn.
### detached[​](#detached)
This method is called when the primitive is detached from a chart. This can be
used to remove any external objects or event handlers that were created during
the attached lifecycle method.
## Updating Views[​](#updating-views)
Your primitive should update the views in the
[`updateAllViews()`](/lightweight-charts/docs/api/interfaces/ISeriesPrimitiveBase#updateallviews) method
such that when the renderers are evoked, they can draw with the latest
information. The library invokes this method when it wants to update and redraw
the chart. If you would like to notify the library that it should trigger an
update then you can use the `requestUpdate` callback provided by the attached
lifecycle method.
## Image Descriptions

### Primitive Rendering Areas Demo

This interactive visualization demonstrates the various sections of the chart where a Primitive can draw:

**Visual Elements:**
- **Chart Pane (Light Blue)**: The main chart area where the price line is drawn. This is rendered via `paneViews()` and shows the primary data series as a black line tracing price movement over time.
- **Price Pane (Pink)**: The vertical area on the right side of the chart, rendered via `priceAxisPaneViews()`. Contains the price scale with values ranging from 0.00 to 1250.00.
- **Time Pane (Blue)**: The horizontal bar at the bottom, rendered via `timeAxisPaneViews()`. Displays time labels (Feb, Mar, Apr, May) along the x-axis.
- **Price Label (Orange)**: Custom labels rendered on the price axis via `priceAxisViews()`, showing text like "price label" positioned at specific price coordinates.
- **Time Label (Green)**: Custom labels rendered on the time axis via `timeAxisViews()`, showing text like "time label" at specific time coordinates.

**Chart Components:**
- A black line chart showing price movement from ~1000+ declining to near 0.00
- A legend box (white) in the top-left corner listing all component types with color-coded indicators
- Final price annotation showing "200.92" on the price axis
- Gray dashed reference line across the chart

This visualization demonstrates how primitives can render on different chart sections using the various view getter methods (`paneViews`, `priceAxisPaneViews`, `timeAxisPaneViews`, `priceAxisViews`, `timeAxisViews`).

### zOrder Layers Demo

This interactive visualization illustrates where each zOrder layer is drawn relative to existing chart elements:

**Visual Elements:**
- **Bottom Layer (Pink/Magenta)**: The lowest zOrder layer, labeled "bottom". Graphics here are drawn beneath the grid and series data.
- **Normal Background (Purple)**: A secondary layer at zOrder "normal" that draws background elements. This can use the `drawBackground()` method for rendering beneath other elements at the same zOrder.
- **Normal Layer (Blue)**: The standard zOrder "normal" layer, where most chart elements like series data are typically drawn.
- **Top Layer (Light Blue/Cyan)**: The highest zOrder "top" layer, drawn above all other elements including the crosshair.

**Chart Components:**
- Diagonal overlapping colored bands showing the visual stacking order
- Each band is labeled with its zOrder name
- Black line chart (price data) overlaid on the visualization
- Final value annotation showing "190.76"
- Gray grid lines for reference

**Interactive Features:**
- Dropdown selector to isolate specific layers or show all layers simultaneously
- Demonstrates how `draw()` and `drawBackground()` methods create layered compositions

This visualization helps developers understand how to position their primitive graphics in the visual stack using the `zOrder()` method and `drawBackground()` renderer.

---

## Extending the Autoscale Info[​](#extending-the-autoscale-info)
The [`autoscaleInfo()`](/lightweight-charts/docs/api/interfaces/ISeriesPrimitiveBase#autoscaleinfo)
method can be provided to extend the base autoScale information of the series.
This can be used to ensure that the chart is automatically scaled correctly to
include all the graphics drawn by the primitive.
Whenever the chart needs to calculate the vertical visible range of the series
within the current time range then it will evoke this method. This method can be
omitted and the library will use the normal autoscale information for the
series. If the method is implemented then the returned values will be merged
with the base autoscale information to define the vertical visible range.
warning
Please note that this method will be evoked very often during
scrolling and zooming of the chart, thus it is recommended that this method is
either simple to execute, or makes use of optimisations such as caching to
ensure that the chart remains responsive.