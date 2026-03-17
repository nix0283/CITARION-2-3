# Variables and operators

**URL:** https://www.tradingview.com/pine-script-docs/faq/variables-and-operators/

**Source:** Pine Script v6 Documentation

---

Variables and operators

                      Version   Version 6Version 5Version 4Version 3              Theme         Dark    Light    Auto                                 - [Welcome to Pine Script® v6](/pine-script-docs/welcome)
- Pine Script® primer    [First steps](/pine-script-docs/primer/first-steps)
- [First indicator](/pine-script-docs/primer/first-indicator)
- [Next steps](/pine-script-docs/primer/next-steps)
- Language    [Execution model](/pine-script-docs/language/execution-model)
- [Type system](/pine-script-docs/language/type-system)
- [Script structure](/pine-script-docs/language/script-structure)
- [Identifiers](/pine-script-docs/language/identifiers)
- [Variable declarations](/pine-script-docs/language/variable-declarations)
- [Operators](/pine-script-docs/language/operators)
- [Conditional structures](/pine-script-docs/language/conditional-structures)
- [Loops](/pine-script-docs/language/loops)
- [Built-ins](/pine-script-docs/language/built-ins)
- [User-defined functions](/pine-script-docs/language/user-defined-functions)
- [Objects](/pine-script-docs/language/objects)
- [Enums](/pine-script-docs/language/enums)
- [Methods](/pine-script-docs/language/methods)
- [Arrays](/pine-script-docs/language/arrays)
- [Matrices](/pine-script-docs/language/matrices)
- [Maps](/pine-script-docs/language/maps)
- Visuals    [Overview](/pine-script-docs/visuals/overview)
- [Backgrounds](/pine-script-docs/visuals/backgrounds)
- [Bar coloring](/pine-script-docs/visuals/bar-coloring)
- [Bar plotting](/pine-script-docs/visuals/bar-plotting)
- [Colors](/pine-script-docs/visuals/colors)
- [Fills](/pine-script-docs/visuals/fills)
- [Levels](/pine-script-docs/visuals/levels)
- [Lines and boxes](/pine-script-docs/visuals/lines-and-boxes)
- [Plots](/pine-script-docs/visuals/plots)
- [Tables](/pine-script-docs/visuals/tables)
- [Text and shapes](/pine-script-docs/visuals/text-and-shapes)
- Concepts    [Alerts](/pine-script-docs/concepts/alerts)
- [Bar states](/pine-script-docs/concepts/bar-states)
- [Chart information](/pine-script-docs/concepts/chart-information)
- [Inputs](/pine-script-docs/concepts/inputs)
- [Libraries](/pine-script-docs/concepts/libraries)
- [Non-standard charts data](/pine-script-docs/concepts/non-standard-charts-data)
- [Other timeframes and data](/pine-script-docs/concepts/other-timeframes-and-data)
- [Repainting](/pine-script-docs/concepts/repainting)
- [Sessions](/pine-script-docs/concepts/sessions)
- [Strategies](/pine-script-docs/concepts/strategies)
- [Strings](/pine-script-docs/concepts/strings)
- [Time](/pine-script-docs/concepts/time)
- [Timeframes](/pine-script-docs/concepts/timeframes)
- Writing scripts    [Style guide](/pine-script-docs/writing/style-guide)
- [Debugging](/pine-script-docs/writing/debugging)
- [Profiling and optimization](/pine-script-docs/writing/profiling-and-optimization)
- [Publishing scripts](/pine-script-docs/writing/publishing)
- [Limitations](/pine-script-docs/writing/limitations)
- Errors and warnings    [CE10101](/pine-script-docs/errors/CE10101)
- [CW10003](/pine-script-docs/errors/CW10003)
- [RE10139](/pine-script-docs/errors/RE10139)
- [RE10143](/pine-script-docs/errors/RE10143)
- FAQ    [General](/pine-script-docs/faq/general)
- [Alerts](/pine-script-docs/faq/alerts)
- [Data structures](/pine-script-docs/faq/data-structures)
- [Functions](/pine-script-docs/faq/functions)
- [Indicators](/pine-script-docs/faq/indicators)
- [Other data and timeframes](/pine-script-docs/faq/other-data-and-timeframes)
- [Programming](/pine-script-docs/faq/programming)
- [Strategies](/pine-script-docs/faq/strategies)
- [Strings and formatting](/pine-script-docs/faq/strings-and-formatting)
- [Techniques](/pine-script-docs/faq/techniques)
- [Times, dates, and sessions](/pine-script-docs/faq/times-dates-and-sessions)
- [Variables and operators](/pine-script-docs/faq/variables-and-operators)
- [Visuals](/pine-script-docs/faq/visuals)
- [Release notes](/pine-script-docs/release-notes)
- Migration guides    [Overview](/pine-script-docs/migration-guides/overview)
- [To Pine Script® version 6](/pine-script-docs/migration-guides/to-pine-version-6)
- [To Pine Script® version 5](/pine-script-docs/migration-guides/to-pine-version-5)
- [To Pine Script® version 4](/pine-script-docs/migration-guides/to-pine-version-4)
- [To Pine Script® version 3](/pine-script-docs/migration-guides/to-pine-version-3)
- [To Pine Script® version 2](/pine-script-docs/migration-guides/to-pine-version-2)
- [Where can I get more information?](/pine-script-docs/where-can-i-get-more-information)
                                 [ 

	
    
    
    
    
    
 -->

 ](/pine-script-docs/)              Clear             Search results               Version   Version 6Version 5Version 4Version 3                         Theme         Dark    Light    Auto                                             - [Welcome to Pine Script® v6](/pine-script-docs/welcome)
- Pine Script® primer    [First steps](/pine-script-docs/primer/first-steps)
- [First indicator](/pine-script-docs/primer/first-indicator)
- [Next steps](/pine-script-docs/primer/next-steps)
- Language    [Execution model](/pine-script-docs/language/execution-model)
- [Type system](/pine-script-docs/language/type-system)
- [Script structure](/pine-script-docs/language/script-structure)
- [Identifiers](/pine-script-docs/language/identifiers)
- [Variable declarations](/pine-script-docs/language/variable-declarations)
- [Operators](/pine-script-docs/language/operators)
- [Conditional structures](/pine-script-docs/language/conditional-structures)
- [Loops](/pine-script-docs/language/loops)
- [Built-ins](/pine-script-docs/language/built-ins)
- [User-defined functions](/pine-script-docs/language/user-defined-functions)
- [Objects](/pine-script-docs/language/objects)
- [Enums](/pine-script-docs/language/enums)
- [Methods](/pine-script-docs/language/methods)
- [Arrays](/pine-script-docs/language/arrays)
- [Matrices](/pine-script-docs/language/matrices)
- [Maps](/pine-script-docs/language/maps)
- Visuals    [Overview](/pine-script-docs/visuals/overview)
- [Backgrounds](/pine-script-docs/visuals/backgrounds)
- [Bar coloring](/pine-script-docs/visuals/bar-coloring)
- [Bar plotting](/pine-script-docs/visuals/bar-plotting)
- [Colors](/pine-script-docs/visuals/colors)
- [Fills](/pine-script-docs/visuals/fills)
- [Levels](/pine-script-docs/visuals/levels)
- [Lines and boxes](/pine-script-docs/visuals/lines-and-boxes)
- [Plots](/pine-script-docs/visuals/plots)
- [Tables](/pine-script-docs/visuals/tables)
- [Text and shapes](/pine-script-docs/visuals/text-and-shapes)
- Concepts    [Alerts](/pine-script-docs/concepts/alerts)
- [Bar states](/pine-script-docs/concepts/bar-states)
- [Chart information](/pine-script-docs/concepts/chart-information)
- [Inputs](/pine-script-docs/concepts/inputs)
- [Libraries](/pine-script-docs/concepts/libraries)
- [Non-standard charts data](/pine-script-docs/concepts/non-standard-charts-data)
- [Other timeframes and data](/pine-script-docs/concepts/other-timeframes-and-data)
- [Repainting](/pine-script-docs/concepts/repainting)
- [Sessions](/pine-script-docs/concepts/sessions)
- [Strategies](/pine-script-docs/concepts/strategies)
- [Strings](/pine-script-docs/concepts/strings)
- [Time](/pine-script-docs/concepts/time)
- [Timeframes](/pine-script-docs/concepts/timeframes)
- Writing scripts    [Style guide](/pine-script-docs/writing/style-guide)
- [Debugging](/pine-script-docs/writing/debugging)
- [Profiling and optimization](/pine-script-docs/writing/profiling-and-optimization)
- [Publishing scripts](/pine-script-docs/writing/publishing)
- [Limitations](/pine-script-docs/writing/limitations)
- Errors and warnings    [CE10101](/pine-script-docs/errors/CE10101)
- [CW10003](/pine-script-docs/errors/CW10003)
- [RE10139](/pine-script-docs/errors/RE10139)
- [RE10143](/pine-script-docs/errors/RE10143)
- FAQ    [General](/pine-script-docs/faq/general)
- [Alerts](/pine-script-docs/faq/alerts)
- [Data structures](/pine-script-docs/faq/data-structures)
- [Functions](/pine-script-docs/faq/functions)
- [Indicators](/pine-script-docs/faq/indicators)
- [Other data and timeframes](/pine-script-docs/faq/other-data-and-timeframes)
- [Programming](/pine-script-docs/faq/programming)
- [Strategies](/pine-script-docs/faq/strategies)
- [Strings and formatting](/pine-script-docs/faq/strings-and-formatting)
- [Techniques](/pine-script-docs/faq/techniques)
- [Times, dates, and sessions](/pine-script-docs/faq/times-dates-and-sessions)
- [Variables and operators](/pine-script-docs/faq/variables-and-operators)
- [Visuals](/pine-script-docs/faq/visuals)
- [Release notes](/pine-script-docs/release-notes)
- Migration guides    [Overview](/pine-script-docs/migration-guides/overview)
- [To Pine Script® version 6](/pine-script-docs/migration-guides/to-pine-version-6)
- [To Pine Script® version 5](/pine-script-docs/migration-guides/to-pine-version-5)
- [To Pine Script® version 4](/pine-script-docs/migration-guides/to-pine-version-4)
- [To Pine Script® version 3](/pine-script-docs/migration-guides/to-pine-version-3)
- [To Pine Script® version 2](/pine-script-docs/migration-guides/to-pine-version-2)
- [Where can I get more information?](/pine-script-docs/where-can-i-get-more-information)
             [ User Manual  ](/pine-script-docs)  / [FAQ](/pine-script-docs/faq) / Variables and operators        
# [Variables and operators](#variables-and-operators)

## [What is the variable name for the current price?](#what-is-the-variable-name-for-the-current-price)

In Pine Script®, the [close](https://www.tradingview.com/pine-script-reference/v6/#var_close) variable represents the current price. It provides the closing price of each historical bar, and, for indicator scripts, the current price of the most recent realtime bar. The [close](https://www.tradingview.com/pine-script-reference/v6/#var_close) value of an open bar can change on each tick to reflect the latest price.

Strategy scripts usually execute only once on each historical and realtime bar, at the bar close. Consequently, during a realtime bar, the [close](https://www.tradingview.com/pine-script-reference/v6/#var_close) variable holds the previous bar’s closing price. However, if a script sets the `calc_on_every_tick` parameter of the [strategy()](https://www.tradingview.com/pine-script-reference/v6/#fun_strategy) declaration statement to `true`, the strategy executes with each price change of the realtime bar, like indicators do. As a result, [close](https://www.tradingview.com/pine-script-reference/v6/#var_close) holds the latest realtime price update.

To reference the closing price of the previous bar, use `close[1]`. Learn more about using square brackets to reference previous values in the [history-referencing operator](/pine-script-docs/language/operators/#-history-referencing-operator) section.

## [Why declare variables with the ​`var`​ keyword?](#why-declare-variables-with-the-var-keyword)

The [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) keyword is useful for storing data across multiple bars. By default, the value assigned to a variable is reset and calculated again on each new bar. This process is called [rollback](/pine-script-docs/language/execution-model/#executions-on-realtime-bars).

If a script declares a variable with the [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) keyword, this persistent variable is initialized only once. Variables declared in the [global scope](/pine-script-docs/faq/programming/#what-does-scope-mean) are initialized on the first bar. Variables declared in a local block are initialized the first time that the local block executes. After its initial assignment, a persistent variable maintains its last value on subsequent bars until it is reassigned a new value.

In the example below, we demonstrate how to accumulate volume across bars, comparing an ordinary and a persistent “float” variable.

```pine
//@version=6
indicator("Var keyword example")

// Declare and initialize a persistent variable by using `var`.
var float a = 0
// Declare and initialize a normal float variable.
float b = 0

// Reset the values of a and b whenever a new day begins.
if timeframe.change("D")
    a := 0
    b := 0

// Add the current volume to both a and b.
a += volume
b += volume

// Plot the values of `a` and `b`. The value of `a` accumulates over time; `b` is reinitialized at every bar.
plot(a, "a", close > open ? #089981 : #f23645, style = plot.style_columns)
plot(b, "b", color.yellow)
```

## [What is ​`varip`​ used for?](#what-is-varip-used-for)

The [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) keyword declares variables whose values persist within the same realtime bar. This contrasts with the typical mode of Pine’s [execution model](/pine-script-docs/language/execution-model/), where variables are reset to their last committed value with each realtime script execution, potentially many times in each bar.

Recall that the [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) keyword allows a variable to retain its value from bar to bar — however, the value still resets on each script execution within a bar. The [varip](/pine-script-docs/language/variable-declarations/#varip) keyword takes this persistence a step further and escapes the [rollback process](/pine-script-docs/language/execution-model/#executions-on-realtime-bars), or re-initialization, on each price update within the same realtime bar.

As a result, [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) (which stands for “variable intrabar persist”) variables can perform calculations that span across executions in the same bar. For example, they can track the number of realtime updates that occur within a realtime bar.

It’s important to note that [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) only affects the behavior of code on realtime bars, not historical ones. Therefore, backtest results on strategies based on [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) variables might not accurately reflect the behavior of those historical bars. Similarly, calculations on historical bars won’t reproduce the script’s realtime behavior.

To distinguish between [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) and [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip), add the following script to a live market symbol. With realtime updates, the varip plot increments within a bar on each price update, whereas the [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) plot stays constant within a bar:

![image](/pine-script-docs/_astro/Variables-and-operators-What-is-a-varip-1.BwPcn6VA_1BWdE3.webp)

```pine
//@version=6
indicator("varip vs var demo")

// `var`  : Retains value across bars, resets on intrabar price updates.
// &#39;varip&#39;: Retains value across bars and across intrabar price updates within a realtime bar.
var   int varCount   = -1
varip int varipCount = -1

// Increment `varCount` on each bar and `varipCount` on each intrabar price update.
varCount   += 1
varipCount += 1

// Plot values for comparison.
plot(varCount,   "var counter",   color.fuchsia, 4)
plot(varipCount, "varip counter", color.lime)
```

Note that:

- Both plots in the above script are the same for historical bars, because there are no intrabar updates on historical bars.

## [What’s the difference between ​`==`​, ​`=`​, and ​`:=`​?](#whats-the-difference-between---and-)

The [= operator](/pine-script-docs/language/operators/#-assignment-operator) declares and initializes variables, assigning a specific value to a named variable. For example, `a = 0` sets the
variable `a` to hold the value 0.

The [:=](https://www.tradingview.com/pine-script-reference/v6/#op_:=) property reassigns values to existing variables. For instance, if a script declared `int a = 1`, a subsequent line `a := 2` updates the value of `a` to `2`, which is possible because integer variables are mutable, or changeable.

Finally, the [==](https://www.tradingview.com/pine-script-reference/v6/#op_==) operator is a [comparison operator](/pine-script-docs/language/operators/#comparison-operators). It checks the equality between two values, returning a [Boolean](/pine-script-docs/language/type-system/#bool) (true/false) result. For instance, `a == b` is true if `a` and `b` hold the same value. The opposite operator is [!=](https://www.tradingview.com/pine-script-reference/v6/#op_!=), which is true if the two variables are not equal.

The following script initializes two variables `a` and `b`, reassigs `a`, and then performs and plots equality comparisons.

```pine
//@version=6
indicator("Variable operators demo", overlay = true)

// Define two variables `a` and `b` using `=`, representing the high and low of each bar.
float a = high
float b = low

// Define the initial line color as lime
color lineColor = color.lime

// When there are fewer than 10 bars left on the chart,  use `:=` to update `a` to `b` and change the line color.
if last_bar_index - bar_index < 10
    a := b
    lineColor := color.fuchsia

// Plot the variable &#39;a&#39; to visualize its change in value. 
// Initially, &#39;a&#39; represents the &#39;high&#39; of each bar. 
// If there are fewer than 10 bars remaining in the chart, &#39;a&#39; is updated to represent the &#39;low&#39; of each bar.
plot(a, "Our line", lineColor, 2)

// Plot a checkmark character whenever `a` is equal to `b`.
plotchar(a == b, "a equals b", "✅", location.bottom)

// Plot a cross character whenever `a` is not equal to `b`.
plotchar(a != b, "a does not equal b", "❌", location.bottom)
```

## [Can I use the ​`:=`​ operator to assign values to past values of a series?](#can-i-use-the--operator-to-assign-values-to-past-values-of-a-series)

Historical values are fixed and cannot be changed. Just as we can’t alter the past in real life, scripts are unable to modify historical values in a series, because they are read-only.
For example, the following script generates an error:

```pine
//@version=6
indicator("Changing historical values demo", overlay = true)
// Initialize a variable to hold the value of the current bar&#39;s high.
series float a = high
// Reassign the *previous* value of the series `a` to hold the low of the current bar.
a[1] := low  // This line causes a compilation error.
plot(a, color = chart.fg_color, linewidth = 3)
```

However, scripts can assign or reassign a value to the current instance of a series, and assign a historical value of a series to a variable. The following version of our script works without error.

```pine
//@version=6
indicator("Changing historical values demo", overlay = true)
// Initialize a variable to hold the value of the current bar&#39;s high.
series float a = high
// Reassign the *current* value of the series `a` to hold the high of the *previous* bar.
a := high[1]
plot(a, color = chart.fg_color, linewidth = 3)
```

## [Why do the OHLC built-ins sometimes return different values than the ones shown on the chart?](#why-do-the-ohlc-built-ins-sometimes-return-different-values-than-the-ones-shown-on-the-chart)

The OHLC (Open, High, Low, Close) values displayed on the chart and the values returned by the [built-in](/pine-script-docs/language/built-ins/#built-in-functions) OHLC variables
[open](https://www.tradingview.com/pine-script-reference/v6/#var_open),
[high](https://www.tradingview.com/pine-script-reference/v6/#var_high),
[low](https://www.tradingview.com/pine-script-reference/v6/#var_low),
[close](https://www.tradingview.com/pine-script-reference/v6/#var_close) can differ.
This is because data feeds can contain price points that exceed a symbol’s defined tick precision. While visually, chart prices are always rounded to tick precision, the built-in variables maintain their original, unrounded values.

For instance, if an exchange feed provides a closing price of 30181.07, which is more precise than the symbol’s 0.1 tick size, the chart displays a rounded value of 30181.1, whereas the built-in variable holds the unrounded value of 30181.07.

Subtle differences, while not immediately obvious, can lead to significant outcomes, especially in scripts requiring precise calculations or when diagnosing unexpected behaviors in scripts. An example of this is in detecting crossover events. Discrepancies between unrounded and rounded values can cause scripts to identify crossover events in one scenario but not in the other.

One way to mitigate this issue is to round the OHLC built-in variables to the nearest tick size before using them in calculations. The script below highlights discrepancies between actual OHLC values and their rounded counterparts, visually indicating any differences by coloring the background red:

![image](/pine-script-docs/_astro/Variables-and-operators-Why-do-the-ohlc-built-ins-sometimes-return-different-values-than-the-ones-shown-on-the-chart-1.Bsg-hKpL_ZaqHIk.webp)

```pine
//@version=6
indicator("Different tick values example", overlay = true, precision = 10)

// @function Rounds each OHLC value to the nearest minimum tick size.
// @returns  A tuple containing the rounded values.
OHLCToMinTick() =>
    [math.round_to_mintick(open), math.round_to_mintick(high), math.round_to_mintick(low), math.round_to_mintick(close)]

//@function Checks whether two float values are equal or not.
//@param    v1 (series float) The first value to compare.
//@param    v2 (series float) The second value to compare.
//@returns  The color blue if the values are equal or red otherwise.
getTickColor(series float v1, series float v2) =>
    color result = v1 != v2 ? color.red : color.blue

// Round each OHLC value to the nearest mintick size.
[o, h, l, c] = OHLCToMinTick()

// Plot the original and rounded values of each OHLC component in the data window.
// If a value and its rounded counterpart are not equal, color the plot red. Otherwise, color it blue.
plot(o,     "o",     getTickColor(o, open),  display = display.data_window)
plot(open,  "open",  getTickColor(o, open),  display = display.data_window)
plot(h,     "h",     getTickColor(h, high),  display = display.data_window)
plot(high,  "high",  getTickColor(h, high),  display = display.data_window)
plot(l,     "l",     getTickColor(l, low),   display = display.data_window)
plot(low,   "low",   getTickColor(l, low),   display = display.data_window)
plot(c,     "c",     getTickColor(c, close), display = display.data_window)
plot(close, "close", getTickColor(c, close), display = display.data_window)

// If any of the original and rounded values of OHLC components are not equal, set the background color to red.
bgcolor(o != open or h != high or l != low or c != close ? color.new(color.red, 90) : na)
```

## [Why do some logical expressions not evaluate as expected when ​`na`​ values are involved?](#why-do-some-logical-expressions-not-evaluate-as-expected-when-na-values-are-involved)

In Pine Script, every type of variable can take an [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) value — except Boolean variables, which can only be true or false. Here, [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) stands for “not available”, and signifies the absence of a value, similar to NULL in other programming
languages.

Although Boolean values themselves cannot be [na](https://www.tradingview.com/pine-script-reference/v6/#var_na), logical expressions that evaluate to true or false can depend on variables of other types that can be [na](https://www.tradingview.com/pine-script-reference/v6/#var_na).

This behavior can cause unexpected outcomes because any valid logical comparison that includes [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) values always returns false.

The following example script evaluates a single comparison where one value is always [na](https://www.tradingview.com/pine-script-reference/v6/#var_na). The user can choose which comparison to evaluate from a set. A label displays the chosen comparison and its result.

```pine
//@version=6
indicator("`na` example")
string conditionInput = input.string("a != b", "Condition", options=["a != b","a == b", "a > b", "a < b"])
int a = 1
int b = na
bool condition = switch conditionInput
    "a != b" => a != b
    "a == b" => a == b
    "a > b"  => a > b
    "a < b"  => a < b

if barstate.islastconfirmedhistory
    string conditionText = condition ? "true" : "false"
    label.new(
      x = bar_index,
      y = high,
      text = "a = 1\nb = na\n" + conditionInput + ": " + conditionText,
      color = condition ? color.green : color.red,
      textcolor = color.new(chart.fg_color, 0),
      style = label.style_label_down,
      size = size.large
      )
```

To avoid unwanted false negatives, write code that checks for [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) values and, if necessary, replaces them. For a discussion of [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) values and how to manage them, see the [​na​ value](/pine-script-docs/language/type-system/#na-value) section of the User Manual.

        [ Previous

 
####       Times, dates, and sessions  

 ](/pine-script-docs/faq/times-dates-and-sessions)  [ Next

 
####   Visuals      

 ](/pine-script-docs/faq/visuals)       
## On this page

[- What is the variable name for the current price?
](#what-is-the-variable-name-for-the-current-price)[- Why declare variables with the `var` keyword?
](#why-declare-variables-with-the-var-keyword)[- What is `varip` used for?
](#what-is-varip-used-for)[- What’s the difference between `==`, `=`, and `:=`?
](#whats-the-difference-between---and-)[- Can I use the `:=` operator to assign values to past values of a series?
](#can-i-use-the--operator-to-assign-values-to-past-values-of-a-series)[- Why do the OHLC built-ins sometimes return different values than the ones shown on the chart?
](#why-do-the-ohlc-built-ins-sometimes-return-different-values-than-the-ones-shown-on-the-chart)[- Why do some logical expressions not evaluate as expected when `na` values are involved?
](#why-do-some-logical-expressions-not-evaluate-as-expected-when-na-values-are-involved) [      ](#top)           -  [Pine Q&A chat](https://www.tradingview.com/chat/#BfmVowG1TZkKO235)  
-  [Stack Overflow](https://stackoverflow.com/questions/tagged/pine-script)  ↗ 
-  [Telegram](https://t.me/PineCodersQA)  ↗ 
-  [Reddit](https://www.reddit.com/r/TradingView/)  ↗ 
   Copyright © 2026 TradingView, Inc.