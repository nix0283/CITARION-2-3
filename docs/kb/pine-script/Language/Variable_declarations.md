# Variable declarations

**URL:** https://www.tradingview.com/pine-script-docs/language/variable-declarations/

**Source:** Pine Script v6 Documentation

---

Language / Variable declarations

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
             [ User Manual  ](/pine-script-docs)  / [Language](/pine-script-docs/language/execution-model) / Variable declarations        
# [Variable declarations](#variable-declarations)

## [Introduction](#introduction)

Variables are named containers that store calculated values or other data for a script to access and use within a given scope. Variables in Pine Script® can hold data of any available [type](/pine-script-docs/language/type-system/#types) that is not [void](/pine-script-docs/language/type-system/#void), including the direct values of [value types](/pine-script-docs/language/type-system/#value-types), and the IDs (references) of [drawings](/pine-script-docs/language/type-system/#drawing-types), [collections](/pine-script-docs/language/type-system/#collections), [plots](/pine-script-docs/language/type-system/#plot-and-hline) or other instances of [reference types](/pine-script-docs/language/type-system/#reference-types).

A variable in Pine Script consists of three main parts:

- An [identifier](/pine-script-docs/language/identifiers/) (name), which represents the variable in the source code.

- A [qualified type](/pine-script-docs/language/type-system/), which determines the kind of data the variable stores and whether the data can change.

- An assigned value or reference.

Programmers write variable declarations to create custom variables for working with data of specific types when the available [built-in variables](/pine-script-docs/language/built-ins/#built-in-variables) do not suffice. A variable declaration is a statement specifying that, from a particular point onward in a specific scope, an identifier refers to a variable with a given initial value or reference. The script accesses the saved value or reference while evaluating expressions or statements that use the variable’s identifier.

There are two forms of variable declarations in Pine Script:

- [Single-variable declarations](/pine-script-docs/language/variable-declarations/#single-variable-declarations) declare and initialize one variable. Programmers can include optional keywords in the statement to define the variable’s type and its declaration behavior, or to export the variable from a [library](/pine-script-docs/concepts/libraries/).

- [Tuple declarations](/pine-script-docs/language/variable-declarations/#tuple-declarations) declare and initialize multiple variables using a tuple format. Programmers use these statements to declare variables that hold the data from function calls, [conditional structures](/pine-script-docs/language/conditional-structures/), or [loops](/pine-script-docs/language/loops/) that return [tuples](/pine-script-docs/language/type-system/#tuples) of data.

All of the statements in the following code block are examples of valid variable declarations. Each identifier to the left of an [=](https://www.tradingview.com/pine-script-reference/v6/#op_=) operator in the code is the name of a new variable, and the expression or structure to the right determines that variable’s initial value or reference:

```pine
// Declares a variable named `oc2` that holds a "series float" value.
oc2 = (open + close) / 2

// Declares a variable named `MULT` that holds a "const float" value.
// The `const` and `float` keywords are optional. Using `const` prevents the script from changing the value later.
const float MULT = 2.5

// Declares *three* variables named `basis`, `upper`, and `lower` to hold all the values returned by `ta.bb()`.
// This declaration format does not support keywords; each variable inherits the type of its assigned value.
[basis, upper, lower] = ta.bb(oc2, 20, MULT)

// Declares a variable named `ratio`. The type is "series float".
// The `float` keyword is optional, but helps promote readability.
float ratio = math.pow((oc2 - basis) / (upper - lower), 3)

// Declares a `ratioColor` variable to hold a "series color" value returned by a `switch` structure.
// The `series` and `color` keywords are optional.
series color ratioColor = switch
    ratio >  0.05 => color.green
    ratio < -0.05 => color.red
    => color.gray

// Declares a variable named `historyBarsStr` on the *first* bar only. Its type is "series string".
// The `var` keyword causes the variable and its value to *persist* across subsequent bars.
var historyBarsStr = "Historical bars: " + str.tostring(last_bar_index + 1)

// Declares a persistent `timeLabel` variable to hold a `label` ID. The `label` keyword is optional.
var label timeLabel = label.new(
    last_bar_time, 0, historyBarsStr, xloc.bar_time, yloc.price, color.blue, label.style_label_left
)

// Declares a persistent "float" variable named `highLevel`.
// The `float` keyword is *required* because the initial value is *undefined*.
// The `varip` keyword causes the variable to persist across *every* execution, not just every bar.
varip float highLevel = na

// These statements declare variables to hold "plot" IDs, which the script can use in `fill()` function calls.
ratioPlot = plot(ratio, "Ratio", ratioColor, 3)
basisPlot = plot(0, "Zero")
```

Regardless of format, several key characteristics and limitations apply to user-defined variables:

- Every variable has one qualified type, even if its declaration does not explicitly [specify the type](/pine-script-docs/language/variable-declarations/#declaring-qualified-types) in the code. Variables declared without [type keywords](/pine-script-docs/language/variable-declarations/#type-keywords) or [qualifier keywords](/pine-script-docs/language/variable-declarations/#qualifier-keywords) inherit type information from their assigned data. A variable’s qualified type never changes across script executions.

- Most custom variables are mutable. Scripts can [reassign](/pine-script-docs/language/variable-declarations/#variable-reassignment) mutable variables by using the [reassignment](/pine-script-docs/language/operators/#-reassignment-operator) or [compound assignment](/pine-script-docs/language/operators/#compound-assignment-operators) operators. However, they cannot reassign any global variables from inside [user-defined functions](/pine-script-docs/language/user-defined-functions/) or [methods](/pine-script-docs/language/methods/#user-defined-methods).

- The [scope](/pine-script-docs/language/variable-declarations/#scopes) of a variable depends on the location of its declaration in the code. The scope determines which parts of the script can access that variable. A variable is available to all parts of a script after its declaration in the same scope or a nested scope, but not to any part that is before the declaration or in an outer scope.

- Variables in different scopes can have the same name, but all variables in the same scope require unique names. The only exception is for variables whose identifier is an [underscore](/pine-script-docs/language/variable-declarations/#using-an-underscore-as-an-identifier) (`_`), which makes them unusable in any expressions or statements.

- If a variable in a nested scope has the same name as one in an outer scope, that variable [shadows](/pine-script-docs/language/variable-declarations/#shadowing) the outer scope’s variable. In other words, the script cannot access the outer scope’s variable in any part of the nested scope following the inner variable’s declaration.

- By default, a script declares and initializes a variable anew during each execution of its scope. However, a single-variable declaration can include the [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) or [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) keyword to set an alternative [declaration mode](/pine-script-docs/language/variable-declarations/#declaration-modes), causing the variable and its data to persist across bars or ticks.

## [Single-variable declarations](#single-variable-declarations)

A single-variable declaration is a statement that creates one new variable, names it, and assigns it an initial value or reference. The statement can include keywords to specify the variable’s qualified type and declaration mode, or to export the variable. The syntax is as follows:

Where:

- The `|` character represents OR, all parts enclosed in angle brackets (`<>`) represent required syntax, and all parts in square brackets (`[]`) represent optional syntax.

- [export](https://www.tradingview.com/pine-script-reference/v6/#kw_export) is the optional keyword for exporting the variable from a [library](/pine-script-docs/concepts/libraries/), enabling its use in other scripts. Exporting is allowed only if the variable is of a [fundamental type](/pine-script-docs/language/type-system/#types) and the declaration includes the [const](https://www.tradingview.com/pine-script-reference/v6/#type_const) keyword.

- [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) and [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) are optional keywords that cause the variable and its data to persist across bars or ticks. If the declaration does not include either keyword, the script reinitializes the variable during every execution of the variable’s [scope](/pine-script-docs/language/variable-declarations/#scopes). Refer to the [Declaration modes](/pine-script-docs/language/variable-declarations/#declaration-modes) section for more information.

- `qualifier` and `type` refer to keywords for specifying the variable’s [qualified type](/pine-script-docs/language/type-system/). These keywords are usually optional. If the declaration does not include them, the variable’s assigned data determines its type information. See the [Declaring qualified types](/pine-script-docs/language/variable-declarations/#declaring-qualified-types) section to learn more.

- `identifier` is the variable’s name.

- [=](https://www.tradingview.com/pine-script-reference/v6/#op_=) is the [assignment operator](/pine-script-docs/language/operators/#-assignment-operator). The `expression` or `structure` part to the right of the operator determines the initial value or reference that it assigns to the new variable. `expression` refers to a literal value, the identifier of another variable, an operation, or a function or [method](/pine-script-docs/language/methods/#methods) call that returns a single value or reference. `structure` refers to any [conditional structure](/pine-script-docs/language/conditional-structures/) or [loop](/pine-script-docs/language/loops/) that returns a single value or reference.

The example below demonstrates a single-variable declaration that declares a “float” variable named `median` to hold the current value returned by a [ta.median()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.median) function call:

```pine
//@variable  Holds the 20-bar median of `hl2` values as of the current bar.
float median = ta.median(hl2, 20)
```

Note that:

- This statement initializes the `median` variable anew on every execution, because it does not specify a different [declaration mode](/pine-script-docs/language/variable-declarations/#declaration-modes) with the [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) or [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) keyword. Each execution thus updates the variable with the function call’s latest result for the current bar.

- The `//@variable` comment is an optional [annotation](/pine-script-docs/language/script-structure/#compiler-annotations) that documents the declared variable in the code. Users can hover over the `median` identifier in the Pine Editor to view a pop-up window that displays the specified line of text.

After a script declares a variable, it can then use that variable in any subsequent part of the code in the same [scope](/pine-script-docs/language/variable-declarations/#scopes) or a nested scope. The variable’s identifier serves as a placeholder for a specific value or reference in the script’s logic. When the script evaluates an expression that contains the identifier, it retrieves the variable’s saved data and uses that data in the calculation.

For example, the following script calculates the median of [hl2](https://www.tradingview.com/pine-script-reference/v6/#var_hl2) values over a specified number of bars, then plots the median on the chart as a color-coded line. It declares variables to store the median and other values for the calculations, and uses three of the variables as arguments for the [plot()](https://www.tradingview.com/pine-script-reference/v6/#fun_plot) call at the end:

![image](/pine-script-docs/_astro/Variable-declarations-Single-variable-declarations-1.tR8CMdr1_Z1mACbw.webp)

```pine
//@version=6
indicator("Single-variable declarations demo", overlay = true)

//@variable Holds a "const string" value for use as the `title` argument in the `plot()` call.
const string PLOT_TITLE = "Median"

//@variable Holds an "input int" value for use as the `length` argument in the `ta.median()` call.
int lengthInput = input.int(20, "Length", 1)

//@variable Stores the current median of `hl2` values over `lengthInput` bars. The value updates on every bar.
//          The script uses it to calculate `isUptrend`, and to define the `series` argument of the `plot()` call.
float median = ta.median(hl2, length = lengthInput)

//@variable Holds `true` if the last change in the `median` value was positive, and `false` otherwise.
bool isUptrend = ta.valuewhen(median != median[1], median > median[1], 0)

//@variable Holds the value of `color.green` if the value of `isUptrend` is `true`, and `color.red` otherwise.
color plotColor = if isUptrend
    color.green
else
    color.red

// Plot the current `median` value. Set the plot&#39;s title and color using the values of `PLOT_TITLE` and `plotColor`.
plot(series = median, title = PLOT_TITLE, color = plotColor, linewidth = 3)
```

Note that:

- The [const](https://www.tradingview.com/pine-script-reference/v6/#type_const) keyword specifies that the script cannot [reassign](/pine-script-docs/language/variable-declarations/#variable-reassignment) the variable. For [value types](/pine-script-docs/language/type-system/#value-types) such as “string”, it also declares that the variable’s [qualifier](/pine-script-docs/language/type-system/#qualifiers) is “const”, meaning that it accepts only constant values that are available at compile time.

- The script uses the [int](https://www.tradingview.com/pine-script-reference/v6/#type_int), [float](https://www.tradingview.com/pine-script-reference/v6/#type_float), [bool](https://www.tradingview.com/pine-script-reference/v6/#type_bool), [color](https://www.tradingview.com/pine-script-reference/v6/#type_color), and [string](https://www.tradingview.com/pine-script-reference/v6/#type_string) keywords to specify the [type](/pine-script-docs/language/type-system/#types) of each variable. Using type keywords is optional in all the above declarations, because the compiler can automatically determine the appropriate types, but doing so helps promote readability. See the [Declaring qualified types](/pine-script-docs/language/variable-declarations/#declaring-qualified-types) section to learn more about type and qualifier keywords.

- The script can assign the result of the [if](https://www.tradingview.com/pine-script-reference/v6/#kw_if) structure to a variable because both of the structure’s local blocks return the same type (“color”). See the [Matching local block type requirement](/pine-script-docs/language/conditional-structures/#matching-local-block-type-requirement) section of the [Conditional structures](/pine-script-docs/language/conditional-structures/) page to learn more.

It’s important to note that a script cannot use a custom variable in any expressions or statements that precede the variable’s declaration, because the variable is not available at that point in the code. Attempting to use a variable in any code before its declaration causes a compilation error.

For example, moving the `median` declaration in the previous script to the end of the source code causes an error, because the script can no longer access the variable for the `isUptrend` calculation or the [plot()](https://www.tradingview.com/pine-script-reference/v6/#fun_plot) call:

```pine
//@version=6
indicator("Inaccessible variable demo", overlay = true)

const string PLOT_TITLE = "Median"

int lengthInput = input.int(20, "Length", 1)

bool isUptrend = ta.valuewhen(median != median[1], median > median[1], 0)

color plotColor = if isUptrend
    color.green
else
    color.red

plot(series = median, title = PLOT_TITLE, color = plotColor, linewidth = 3)

// Moving this statement to the bottom of the code makes `median` *inaccessible* to all code above.
// This change causes an error, because `isUptrend` and the `plot()` call both require the variable&#39;s value.
float median = ta.median(hl2, length = lengthInput)
```

## [Tuple declarations](#tuple-declarations)

Some [conditional structures](/pine-script-docs/language/conditional-structures/), [loops](/pine-script-docs/language/loops/), and function or [method](/pine-script-docs/language/methods/#methods) calls return [tuples](/pine-script-docs/language/type-system/#tuples) containing multiple values or references. To use the data returned from such expressions and structures, programmers must write tuple declarations, which are single statements that declare multiple variables using a tuple format.

The syntax for a tuple declaration is as follows:

Where:

- The `|` character represents OR, and all parts enclosed in angle brackets (`<>`) represent required syntax.

- `tuple_of_identifiers` represents a comma-separated list of variable names enclosed in square brackets (e.g., `[x, y, z]`). The tuple must contain one new identifier for each returned value or reference.

- [=](https://www.tradingview.com/pine-script-reference/v6/#op_=) is the [assignment operator](/pine-script-docs/language/operators/#-assignment-operator). The `function_call` or `structure` part to the right of the operator determines the initial data that it assigns to each new variable. `function_call` refers to a call to a [built-in function](/pine-script-docs/language/built-ins/#built-in-functions) or [user-defined function](/pine-script-docs/language/user-defined-functions/), or method, that returns a tuple. Likewise, `structure` refers to a loop or conditional structure that returns a tuple.

Some built-in functions in the `ta` namespace return a tuple instead of a single value. Therefore, scripts must use tuple declarations to create variables that store the data from calls to those functions. For example, the [ta.bb()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.bb) function returns a tuple containing all three values of the [Bollinger Bands](https://www.tradingview.com/support/solutions/43000501840-bollinger-bands-bb/) indicator in the following order: the basis moving average, the upper band, and the lower band. Therefore, a script must use a tuple declaration, such as the following, to declare one new variable for each returned value:

```pine
// Declares three variables named `bbMiddle`, `bbUpper`, and `bbLower` to hold the values returned by `ta.bb()`.
// `bbMiddle` stores the middle band (SMA), `bbUpper` stores the upper band, and `bbLower` stores the lower band.
[bbMiddle, bbUpper, bbLower] = ta.bb(close, 5, 4)
```

Programmers often use tuples in [user-defined functions](/pine-script-docs/language/user-defined-functions/) and methods to return multiple values for use later in a script’s calculations. A user-defined function returns a tuple only if the final code in its body is a tuple of expressions.

For example, the code block below defines a `calcWidthAndColor()` function that returns a two-item tuple. The tuple contains a “float” value representing the width between two bands, and a “color” value based on the width value. The code then calls that function using variables from the previous example declaration as arguments, and uses a tuple declaration to declare two new variables to store the returned values:

```pine
//@function Calculates the width between two bands, and a gradient color based on the normalized width over a
//          specified length.
calcWidthAndGradient(float upper, float lower, int length, color upperColor, color lowerColor) =>
    float width = upper - lower
    float normWidth = width / ta.highest(width, length)
    color gradient = color.from_gradient(normWidth, 0, 1, lowerColor, upperColor)
    // Return a tuple containing the values of `width` ("series float") and `gradient` ("series color").
    [width, gradient]

[bbMiddle, bbUpper, bbLower] = ta.bb(close, 5, 4)

// Declares two variables named `bandWidth` and `widthColor` to store the values returned by `calcWidthAndGradient()`.
// `bandWidth` stores the returned `width` value, and `widthColor` stores the returned `gradient` value.
[bandWidth, widthColor] = calcWidthAndGradient(bbUpper, bbLower, 5, color.orange, color.purple)
```

Note that:

- The `upper`, `lower`, `length`, `upperColor`, and `lowerColor` identifiers in the function definition represent parameters, which determine the types of arguments that a call to the function requires.

- The function definition uses [single-variable declarations](/pine-script-docs/language/variable-declarations/#single-variable-declarations) in its body to create variables that store the necessary data for the function’s calculations. Those variables are available only inside the function definition; a script cannot access them in any other [scope](/pine-script-docs/language/variable-declarations/#scopes).

Programmers often use tuple declarations to declare multiple variables that store results returned by [conditional structures](/pine-script-docs/language/conditional-structures/). Similar to a function, a conditional structure returns a tuple if the final code in each local block is a tuple of expressions.

For example, the following code block declares two variables, `lowColor` and `highColor`, to hold “color” values returned by a [switch](https://www.tradingview.com/pine-script-reference/v6/#kw_switch) structure based on the value of a [string input](/pine-script-docs/concepts/inputs/#string-input):

```pine
//@variable Holds a string to specify a colorful or grayscale style.
string styleInput = input.string("Color", "Style", ["Color", "Grayscale"])

// Declares two variables named `lowColor` and `highColor` to hold the two values returned by the `switch` structure.
// The value of `lowColor` is `color.purple` or `#606060`, and the value of `highColor` is `color.orange` or `#b1b1b1`.
[lowColor, highColor] = switch styleInput
    "Color" => [color.purple, color.orange]
    =>         [#606060, #b1b1b1]
```

The following script combines all three examples above to calculate a set of Bollinger Bands, their width, and a gradient color, then plots all the values on the chart:

![image](/pine-script-docs/_astro/Variable-declarations-Tuple-declarations-1.BI1W_g4r_ZuVoXO.webp)

```pine
//@version=6
indicator("Tuple declarations demo")

//@variable Holds a string to specify a colorful or grayscale style.
string styleInput = input.string("Color", "Style", ["Color", "Grayscale"])

//@function Calculates the width between two bands, and a gradient color based on the normalized width over a
//          specified length.
calcWidthAndGradient(float upper, float lower, int length, color upperColor, color lowerColor) =>
    float width = upper - lower
    float normWidth = width / ta.highest(width, length)
    color gradient = color.from_gradient(normWidth, 0, 1, lowerColor, upperColor)
    // Return a tuple containing the values of `width` ("series float") and `gradient` ("series color").
    [width, gradient]

// Declares two variables named `lowColor` and `highColor` to hold the two values returned by the `switch` structure.
// The value of `lowColor` is `color.purple` or `#606060`, and the value of `highColor` is `color.orange` or `#b1b1b1`.
[lowColor, highColor] = switch styleInput
    "Color" => [color.purple, color.orange]
    =>         [#606060, #b1b1b1]

// Declares three variables named `bbMiddle`, `bbUpper`, and `bbLower` to hold the values returned by `ta.bb()`.
// `bbMiddle` stores the middle band (SMA), `bbUpper` stores the upper band, and `bbLower` stores the lower band.
[bbMiddle, bbUpper, bbLower] = ta.bb(close, 5, 3)

// Declares two variables named `bandWidth` and `widthColor` to store the values returned by `calcWidthAndGradient()`.
// `bandWidth` stores the returned `width` value, and `widthColor` stores the returned `gradient` value.
[bandWidth, widthColor] = calcWidthAndGradient(bbUpper, bbLower, 5, highColor, lowColor)

// Plot the `bbMiddle`, `bbUpper`, and `bbLower` series on the main pane, using `widthColor` as each plot&#39;s color.
plot(bbMiddle, "Average",     widthColor, 3, force_overlay = true)
plot(bbUpper,  "Upper band",  widthColor, 3, force_overlay = true)
plot(bbLower,  "Lower band",  widthColor, 3, force_overlay = true)
// Plot the `bandWidth` series as columns in a separate pane, and color the plot using `widthColor`.
plot(bandWidth, "Band width", widthColor, style = plot.style_area)
```

## [Using an underscore as an identifier](#using-an-underscore-as-an-identifier)

Scripts can declare variables using a single underscore (`_`) as the identifier to mark those variables as unused. A script cannot access data from any variables named `_` or use those variables in other expressions or statements after their declaration. Programmers can write any number of `_` variable declarations anywhere in a script, including multiple times in the same [scope](/pine-script-docs/language/variable-declarations/#scopes).

This behavior is useful in cases where a function call returns a [tuple](/pine-script-docs/language/type-system/#tuples) of multiple values, but the script requires only some of those values in its calculations. Rather than specifying unique names for all the unused variables from a [tuple declaration](/pine-script-docs/language/variable-declarations/#tuple-declarations), programmers can discard those variables by using `_` as the name for each one.

For example, the following script calculates the highest and lowest prices across the chart’s visible bars. It imports the [VisibleChart](https://www.tradingview.com/script/j7vCseM2-VisibleChart/) library from PineCoders and calls the library’s `ohlcv()` function to perform the calculation. The call returns a tuple of five values: the visible chart range’s open, high, low, close, and cumulative volume. However, our script requires only the high and low. Instead of specifying unique names for all the unused variables, we use `_` as each unused variable’s identifier:

```pine
//@version=6
indicator("Underscores in tuple declarations demo", overlay = true)

// Import version 5 of the `VisibleChart` library from PineCoders.
import PineCoders/VisibleChart/5 as visChart

// Declare a tuple of variables for all values returned by the imported `ohlcv()` function.
// This function returns five values in the following order: open, high, low, close, and cumulative volume.
// We require only the high and low, so we use `_` to discard the other returned values.
[_, visibleHigh, visibleLow, _, _] = visChart.ohlcv()

// Plot the values of the `visibleHigh` and `visibleLow` variables on the chart.
plot(visibleHigh, "Visible high", color.green, 3)
plot(visibleLow,  "Visible low",  color.red,   3)
```

Programmers also occasionally use `_` when writing a [loop](/pine-script-docs/language/loops/) whose calculations do not require the variables declared in the loop’s header. For example, the script below calculates the sum of 20 pseudorandom values from [math.random()](https://www.tradingview.com/pine-script-reference/v6/#fun_math.random) calls using a [for](https://www.tradingview.com/pine-script-reference/v6/#kw_for) loop. The calculation does not require the loop’s counter variable, so we used `_` as the variable’s name to mark it as unused:

```pine
//@version=6
indicator("Underscores for loop variables demo")

//@variable Stores a pseudorandom value from a Bates distribution.
float sample = 0.0

// Calculate the sum of 20 `math.random()` values in a `for` loop.
// The calculation does not require the counter variable from the loop&#39;s header, so we set its identifier to `_`.
for _ = 1 to 20
    sample += math.random()

// Divide by 20 to calculate the final sample.
sample /= 20

// Plot the resulting value.
plot(sample, "Pseudorandom sample")
```

Note that:

- The [+=](https://www.tradingview.com/pine-script-reference/v6/#op_+=) and [/=](https://www.tradingview.com/pine-script-reference/v6/#op_/=) operators in this script reassign the value of the `sample` variable after initialization. See the [Variable reassignment](/pine-script-docs/language/variable-declarations/#variable-reassignment) section to learn more.

## [Declaring qualified types](#declaring-qualified-types)

Every variable has an assigned [type](/pine-script-docs/language/type-system/#types) and a [type qualifier](/pine-script-docs/language/type-system/#qualifiers), which together define the variable’s qualified type. A variable’s type determines what kind of data the variable represents in the script’s calculations, as well as the types of data that the script can pass to the variable. A variable’s qualifier indicates when the assigned data is available and whether it can change across executions.

By default, the Pine Script compiler automatically determines the qualified type of a variable based on its assigned data. However, in [single-variable declarations](/pine-script-docs/language/variable-declarations/#single-variable-declarations), programmers can override this behavior and specify qualified types directly by prefixing the declared identifiers with [type keywords](/pine-script-docs/language/variable-declarations/#type-keywords) and [qualifier keywords](/pine-script-docs/language/variable-declarations/#qualifier-keywords).

The following sections explain how these keywords affect declared variables. For detailed information about Pine’s types and qualifiers, and how they work, refer to the [Type system](/pine-script-docs/language/type-system/) page.

### [Type keywords](#type-keywords)

A variable declaration that prefixes the variable’s identifier with a type keyword specifies the [type](/pine-script-docs/language/type-system/#types) of data that the variable represents in the script’s calculations.

Programmers can use any of the following as the type keyword in a [single-variable declaration](/pine-script-docs/language/variable-declarations/#single-variable-declarations) to set the variable’s type:

- Built-in type keywords: [int](https://www.tradingview.com/pine-script-reference/v6/#type_int), [float](https://www.tradingview.com/pine-script-reference/v6/#type_float), [bool](https://www.tradingview.com/pine-script-reference/v6/#type_bool), [color](https://www.tradingview.com/pine-script-reference/v6/#type_color), [string](https://www.tradingview.com/pine-script-reference/v6/#type_string), [line](https://www.tradingview.com/pine-script-reference/v6/#type_line), [linefill](https://www.tradingview.com/pine-script-reference/v6/#type_linefill), [box](https://www.tradingview.com/pine-script-reference/v6/#type_box), [polyline](https://www.tradingview.com/pine-script-reference/v6/#type_polyline), [label](https://www.tradingview.com/pine-script-reference/v6/#type_label), [table](https://www.tradingview.com/pine-script-reference/v6/#type_table), [chart.point](https://www.tradingview.com/pine-script-reference/v6/#type_chart.point), [footprint](https://www.tradingview.com/pine-script-reference/v6/#type_footprint), and [volume_row](https://www.tradingview.com/pine-script-reference/v6/#type_volume_row).

- [Collection](/pine-script-docs/language/type-system/#collections) type identifiers, which contain the [array](https://www.tradingview.com/pine-script-reference/v6/#type_array), [matrix](https://www.tradingview.com/pine-script-reference/v6/#type_matrix), or [map](https://www.tradingview.com/pine-script-reference/v6/#type_map) keyword followed by a type template (e.g., `array<int>`, `matrix<float>`, `map<string, color>`).

- The names of [enum types](/pine-script-docs/language/type-system/#enum-types) or [user-defined types](/pine-script-docs/language/type-system/#user-defined-types).

Including a type keyword in a variable declaration is usually optional, because the Pine Script compiler can automatically determine a variable’s type based on its assigned value or reference. However, a variable declaration requires a type keyword if any of the following conditions apply:

- The declaration includes a [qualifier keyword](/pine-script-docs/language/variable-declarations/#qualifier-keywords).

- The variable is a constant exported by a [library](/pine-script-docs/concepts/libraries/).

- The variable’s initial value is [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) (undefined), and the statement does not cast it to a valid type using the available [type-casting](/pine-script-docs/language/type-system/#type-casting) functions (e.g., [int()](https://www.tradingview.com/pine-script-reference/v6/#fun_int)). See the [`na` value](/pine-script-docs/language/type-system/#na-value) section of the [Type system](/pine-script-docs/language/type-system/) page for more information.  

If a variable declaration does not include a type keyword, the variable automatically inherits the same type as the data that the script uses to initialize it.

For example, the script below declares a variable named `myVar` without using a type keyword. It initializes the variable using the result of the expression `last_bar_index - bar_index`, which returns an “int” value. Therefore, the variable automatically inherits the “int” type:

![image](/pine-script-docs/_astro/Variable-declarations-Type-keywords-1.CX3BO-r5_Z1VEzMV.webp)

```pine
//@version=6
indicator("Type inheritance demo")

//@variable Counts the number of bars remaining until the script reaches the latest bar.
//          The expression returns a "series int" value. Therefore, the variable automatically inherits the "int" type.
//          You can hover over the `myVar` identifier to confirm the type.
myVar = last_bar_index - bar_index

// Plot the value on the chart.
plot(myVar, "Bars remaining", color.purple, 3)
```

Note that:

- The variable’s qualified type is “series int”, because the built-in variables in the expression store “series” values that change from bar to bar. See the [Qualifiers](/pine-script-docs/language/type-system/#qualifiers) section of the [Type system](/pine-script-docs/language/type-system/) page and the [Qualifier keywords](/pine-script-docs/language/variable-declarations/#qualifier-keywords) section below to learn more.

After a variable inherits a type, the script can assign only data of the inherited type or data that Pine Script can [cast](/pine-script-docs/language/type-system/#type-casting) to that type, because a variable’s assigned type cannot change after initialization.

For example, the following script attempts to [reassign](/pine-script-docs/language/variable-declarations/#variable-reassignment) the `myVar` variable using an expression that returns a “float” value after initializing the variable with an “int” value. This script causes a compilation error, because it cannot automatically cast a “float” value to the “int” type that the `myVar` variable requires:

```pine
//@version=6
indicator("Cannot change an inherited type demo")

//@variable The natural logarithm of bars remaining until the script reaches the latest bar.
//          The expression returns a "series int" value. Therefore, the variable automatically inherits the "int" type.
//          You can hover over the `myVar` identifier to confirm the type.
myVar = last_bar_index - bar_index

// This line causes a compilation error. The `myVar` variable already inherited the type "int", so the script cannot
// later assign it the "float" value returned by `math.log()`.
myVar := nz(math.log(myVar))

// Plot the value on the chart.
plot(myVar, "Log of bars remaining", color.purple, 3)
```

If a variable declaration does include a type keyword, the compiler assigns the specified type directly to the variable instead of using the type of the initial value or reference. The script can then assign the variable only data of the specified type, or data that Pine can cast to that type.

For example, if we add the [float](https://www.tradingview.com/pine-script-reference/v6/#type_float) type keyword to the `myVar` declaration in the previous example, no compilation error occurs. The keyword directly sets that variable’s type to “float”. Variables of the “float” type can accept “float” or “int” values without errors, because Pine automatically casts “int” values to the “float” type when necessary:

![image](/pine-script-docs/_astro/Variable-declarations-Type-keywords-2.DgcY3d2-_2bE5At.webp)

```pine
//@version=6
indicator("Explicit typing with a type keyword demo")

//@variable The natural logarithm of bars remaining until the script reaches the latest bar.
//          Although the initial expression returns an "int" value, the `float` keyword directly sets the variable&#39;s
//          type to "float".
float myVar = last_bar_index - bar_index

// This line does not cause an error, because the expression&#39;s returned type ("float") matches the type of the variable.
myVar := nz(math.log(myVar))

// Plot the value on the chart.
plot(myVar, "Log of bars remaining", color.purple, 3)
```

### [Qualifier keywords](#qualifier-keywords)

A [single-variable declaration](/pine-script-docs/language/variable-declarations/#single-variable-declarations) that includes a qualifier keyword ([const](https://www.tradingview.com/pine-script-reference/v6/#type_const), [simple](https://www.tradingview.com/pine-script-reference/v6/#type_simple), or [series](https://www.tradingview.com/pine-script-reference/v6/#type_series)) before the [type keyword](/pine-script-docs/language/variable-declarations/#type-keywords) specifies the variable’s [type qualifier](/pine-script-docs/language/type-system/#qualifiers). A variable’s type qualifier indicates when the assigned value must be accessible, and whether the value can change during or across script executions. Qualifier keywords are almost always optional. The only exception is for a [library’s](/pine-script-docs/concepts/libraries/) exported variables, which require the [const](https://www.tradingview.com/pine-script-reference/v6/#type_const) keyword in their declarations.

Below, we list how each qualifier keyword affects declared variables of [value types](/pine-script-docs/language/type-system/#value-types):

`const`

The variable has the [“const” qualifier](/pine-script-docs/language/type-system/#const). It accepts only a “const” value, which is a compile-time constant that never changes at runtime. Additionally, the keyword prevents the script from [reassigning](/pine-script-docs/language/variable-declarations/#variable-reassignment) the variable. Other code that requires any value of the type specified by the type keyword can use the variable, because the “const” qualifier is the weakest in Pine’s [qualifier hierarchy](/pine-script-docs/language/type-system/#qualifiers).

`simple`

The variable has the [“simple” qualifier](/pine-script-docs/language/type-system/#simple). It accepts a “simple” value, which becomes available at runtime, during script executions on the first bar of the dataset, and remains consistent across all subsequent bars. It can also accept a value with a weaker qualifier (“input” or “const”). The script can use the variable in any code that allows “simple” values of the given type, but not in any code that requires values with the “input” or “const” qualifiers.

`series`

The variable has the [“series” qualifier](/pine-script-docs/language/type-system/#series). It can accept values with any type qualifier, because “series” is the strongest qualifier in Pine’s qualifier hierarchy. The variable’s value is available at runtime and can change on any bar. The script can use the variable in code that allows “series” values of the given type, but not in any code that requires a value with a weaker qualifier.

If the declaration of a value-type variable does not include a qualifier keyword, the compiler automatically assigns the variable the strongest type qualifier used by the expressions and structures that determine its value, including those that the script uses to [reassign](/pine-script-docs/language/variable-declarations/#variable-reassignment) the variable after declaring it.

For example, the following script calculates and plots the RMA of the [close](https://www.tradingview.com/pine-script-reference/v6/#var_close) series with a specified length when it runs on a standard chart. It declares multiple variables of value types without using qualifier keywords. Therefore, each variable automatically inherits a qualifier based on its assigned data:

![image](/pine-script-docs/_astro/Variable-declarations-Qualifier-keywords-1.rrK6q7Po_9OMTj.webp)

```pine
//@version=6
indicator("Qualifier inheritance demo", overlay = true)

//@variable Holds a string for use as the `title` argument in `input.int()`.
//          The assigned literal string has the "const string" qualified type.
//          Therefore, this variable automatically inherits the "const" qualifier.
string INPUT_TITLE = "Length"

//@variable Holds an integer for calculating the `length` argument for the `ta.rma()` call.
//          All `input*()` functions except for `input.source()` return a value qualified as "input".
//          Therefore, this variable inherits the "input" qualifier.
int lengthInput = input.int(10, title = INPUT_TITLE, minval = 1)

//@variable Holds the value of `lengthInput` if the chart is a standard type, and 1 otherwise.
//          The `chart.is_standard` variable has the "simple" qualifier, because it depends on data that does not change
//          but is available only at runtime. The other parts of the expression have weaker qualifiers.
//          Therefore, the expression returns a "simple" value, and the variable inherits the "simple" qualifier.
int lengthVal = chart.is_standard ? lengthInput : 1

//@variable Stores the RMA of `close` calculated using `lengthVal` as the `length` argument.
//          The `close` variable is of the type "series float", and `ta.rma()` always returns a "series" result.
//          Therefore, this variable inherits the "series" qualifier.
float rma = ta.rma(close, length = lengthVal)

//@variable Stores a "color" value for the plot.
//          The variable is initialized using the value of `color.gray`, which is of the type "const color".
//          However, the variable does **not** inherit the "const" qualifier, because the script *reassigns* the
//          variable later in an `if` structure with logic that depends on a "series" value.
//          Therefore, this variable&#39;s qualifier is "series".
color plotColor = color.gray

// If we remove this structure from the code, the `plotColor` variable&#39;s qualified type becomes "const color".
if ta.change(rma) > 0
    plotColor := color.green
else
    plotColor := color.red

// Plot the `rma` series.
plot(rma, "RMA", plotColor, 3)
```

Note that:

- If a [reassignment](/pine-script-docs/language/operators/#-reassignment-operator) or [compound assignment](/pine-script-docs/language/operators/#compound-assignment-operators) operation modifies any variable declared without a qualifier keyword, and the operation depends on a value with a stronger type qualifier than that of the variable’s initial value, the variable automatically inherits that stronger qualifier. For instance, the `plotColor` variable has the “series” qualifier, even though the script initializes it using a “const color” value, because the [if](https://www.tradingview.com/pine-script-reference/v6/#kw_if) structure where the script [reassigns](/pine-script-docs/language/variable-declarations/#variable-reassignment) the value depends on a “series bool” expression (`ta.change(rma) > 0`).

If a value-type variable declaration does include a qualifier keyword, the compiler assigns the specified qualifier directly to the variable. The variable can accept a value of the specified type with the given qualifier or a weaker one, but it cannot accept a value with a stronger qualifier.

Below, we modified the previous example from this section to demonstrate how qualifier keywords restrict assigned values. Each declaration after the first includes a qualifier keyword that represents a weaker qualifier than that of the variable’s assigned value, causing a compilation error:

```pine
//@version=6
indicator("Invalid qualifier keywords demo", overlay = true)

// The `const` keyword sets the variable&#39;s qualifier to "const", which matches the qualifier of the assigned value.
// Therefore, no error occurs here.
const string INPUT_TITLE = "Length"

// The `const` keyword causes a compilation error here. A "const" variable cannot accept a value qualified as "input".
const int lengthInput = input.int(10, title = INPUT_TITLE, minval = 1)

// The `const` keyword also causes an error in this declaration, as a "const" variable cannot hold a "simple" value.
const int lengthVal = chart.is_standard ? lengthInput : 1

// Using `simple` in this declaration causes an error, because "series" values cannot be stored by "simple" variables.
simple float rma = ta.rma(close, length = lengthVal)

// Using `simple` in this declaration causes compilation errors in the `if` structure below, because that structure
// depends on a "series" value.
simple color plotColor = color.gray

// The reassignment operations here attempt to assign a "series" value to a "simple" variable. Such operations are not
// allowed.
if ta.change(rma) > 0
    plotColor := color.green
else
    plotColor := color.red

// Plot the `rma` series.
plot(rma, "RMA", plotColor, 3)
```

In addition to restricting when a variable’s value must be available and whether it can change, a qualifier keyword restricts how the script can use the variable. Scripts can pass a variable only to code that accepts the variable’s qualified type, or to code that allows a value of the same type with a stronger qualifier. If a script attempts to use the variable in code that requires a value with a weaker qualifier, a compilation error occurs.

For example, the script version below uses the [simple](https://www.tradingview.com/pine-script-reference/v6/#type_simple) keyword for the `INPUT_TITLE` declaration. This change causes an error in the [input.int()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.int) call. The [simple](https://www.tradingview.com/pine-script-reference/v6/#type_simple) keyword sets the `INPUT_TITLE` variable’s type to “simple string”, but the `title` parameter of the [input.int()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.int) function requires an argument of the type “const string”. The parameter cannot accept “string” arguments with any other type qualifier:

```pine
//@version=6
indicator("Invalid argument qualifier demo", overlay = true)

// The `simple` keyword explicitly sets the variable&#39;s qualifier to "simple".
simple string INPUT_TITLE = "Length"

// The `input.int()` call causes a compilation error. The `title` parameter requires a "const" argument. It cannot
// accept an argument with a stronger qualifier such as "simple".
int lengthInput = input.int(10, title = INPUT_TITLE, minval = 1)

int lengthVal = chart.is_standard ? lengthInput : 1
float rma = ta.rma(close, length = lengthVal)
color plotColor = color.gray

if ta.change(rma) > 0
    plotColor := color.green
else
    plotColor := color.red

// Plot the `rma` series.
plot(rma, "RMA", plotColor, 3)
```

## [Variable reassignment](#variable-reassignment)

In Pine Script, most variables declared by a script are mutable, meaning that the script can change (reassign) their assigned values or references (IDs) after their declarations. The only exception is for variables that a script declares using the [const](https://www.tradingview.com/pine-script-reference/v6/#type_const) keyword, because that keyword explicitly prevents the script from reassigning those variables.

Scripts can reassign custom variables of most available [types](/pine-script-docs/language/type-system/#types) by using the [reassignment operator (:=)](/pine-script-docs/language/operators/#-reassignment-operator). The operator directly replaces the variable’s assigned value or reference with the one returned by the specified expression or structure.

For example, the following script declares a variable named `myVar` with an initial value of 0. Then, it uses the [:=](https://www.tradingview.com/pine-script-reference/v6/#op_:=) operator to reassign the variable a value of 10 and plots the result. The script plots a consistent value of 10, not 0, because the [:=](https://www.tradingview.com/pine-script-reference/v6/#op_:=) operation overwrites the variable’s initial value:

![image](/pine-script-docs/_astro/Variable-declarations-Variable-reassignment-1.DHorLz5I_Z1M8zh3.webp)

```pine
//@version=6
indicator("Variable reassignment demo")

//@variable Stores an initial value of 0.
int myVar = 0

// This operation changes the variable&#39;s value to 10. The previous value of 0 is no longer stored by the variable.
myVar := 10

// This call plots a consistent value of 10, not 0.
plot(myVar, "Plotted value", color.teal, 4)
```

Note that scripts cannot reassign variables before declaring those variables. Similarly, they cannot reassign local variables while executing code in an outer scope or a separate local scope. See the [Scopes](/pine-script-docs/language/variable-declarations/#scopes) section below for more information.

For example, a compilation error occurs if we move the [:=](https://www.tradingview.com/pine-script-reference/v6/#op_:=) operation above the `myVar` declaration in the previous script, because the variable is not available at that point in the global scope:

```pine
//@version=6
indicator("Invalid reassignment of undeclared variable demo")

// This operation causes a compilation error.
// The `myVar` identifier does not refer to a valid variable in this part of the code.
myVar := 10

// The reassignment operation must occur *after* this declaration.
int myVar = 0

plot(myVar, "Plotted value", color.teal, 4)
```

Scripts can also reassign variables of specific [value types](/pine-script-docs/language/type-system/#value-types) by using the [compound assignment](/pine-script-docs/language/operators/#compound-assignment-operators) operators. These operators perform an arithmetic operation using the value of a variable and another specified value, and then reassign the result directly to the original variable:

- Addition/concatenation assignment ([+=](https://www.tradingview.com/pine-script-reference/v6/#op_+=))

- Subtraction assignment ([-=](https://www.tradingview.com/pine-script-reference/v6/#op_-=))

- Multiplication assignment ([*=](https://www.tradingview.com/pine-script-reference/v6/#op_*=))

- Division assignment ([/=](https://www.tradingview.com/pine-script-reference/v6/#op_/=))

- Modulo (remainder) assignment ([%=](https://www.tradingview.com/pine-script-reference/v6/#op_%25=))

The following example calculates an EMA of the [close](https://www.tradingview.com/pine-script-reference/v6/#var_close) series with a user-specified length using reassignment and compound assignment operations. It declares a variable named `ema` and initializes it with a value of 0, and then reassigns the variable to store the value of `nz(ema[1], close)`. Afterward, the script uses the [*=](https://www.tradingview.com/pine-script-reference/v6/#op_*=) operator to multiply the variable’s value by the value of `(1.0 - alpha)`, and then calculates the final value by using the [+=](https://www.tradingview.com/pine-script-reference/v6/#op_+=) operator to add the result of `alpha * close`:

![image](/pine-script-docs/_astro/Variable-declarations-Variable-reassignment-2.DwO1HR7f_17BuG5.webp)

```pine
//@version=6
indicator("Reassigning with compound assignment operators demo", overlay = true)

//@variable Stores the length for the smoothing factor of the EMA (`alpha`).
int lengthInput = input.int(20, "Length", 1)

//@variable The EMA&#39;s smoothing factor.
float alpha = 2.0 / (lengthInput + 1.0)

//@variable Stores an initial value of 0, and is modified through reassignment.
float ema = 0.0

// Reassign the `ema` variable the previous bar&#39;s `ema` value, or the `close` value if the previous value is `na`.
// The variable no longer stores a value of 0.
ema := nz(ema[1], close)

// Multiply and reassign the `ema` variable&#39;s value.
// After this operation, the value equals the result of `nz(ema[1], close) * (1.0 - alpha)`.
ema *= (1.0 - alpha)

// Add and reassign the variable&#39;s value.
// After this operation, the value equals the result of `nz(ema[1], close) * (1.0 - alpha) + alpha * close`.
// This result on the current bar is what the `ema[1]` operation retrieves on the next bar.
ema += alpha * close

// Plot the final value of the `ema` variable for the current bar.
plot(ema, "EMA", color.blue, 3)
```

Note that:

- This script uses compound assignment operators for demonstration purposes. An equivalent way to calculate the `ema` value with fewer lines of code is to use a single [:=](https://www.tradingview.com/pine-script-reference/v6/#op_:=) operation to reassign the variable the result of `(1.0 - alpha) * nz(ema[1], close) + alpha * close`.

- Reassigning a variable can affect its [type qualifier](/pine-script-docs/language/type-system/#qualifiers). For example, although the script initializes the `ema` variable using a “const” value, it also reassigns the variable using “series” expressions. Therefore, the variable inherits the “series” qualifier, because that qualifier is stronger than “const”.

Variables declared in [tuple declarations](/pine-script-docs/language/variable-declarations/#tuple-declarations) are also compatible with reassignment or compound assignment operators. For example, the script below uses a tuple declaration to declare three variables that hold the result of a [ta.macd()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.macd) call, and then uses the [:=](https://www.tradingview.com/pine-script-reference/v6/#op_:=) operator on the declared `macd` variable to assign it a new value. It plots the value of the variable before and after the operation for comparison:

![image](/pine-script-docs/_astro/Variable-declarations-Variable-reassignment-3.BSaFmhiP_Z1qhA6p.webp)

```pine
//@version=6
indicator("Reassigning tuple variables demo")

//@variable Stores a multiplier to apply to the histogram value while modifying the `macd` variable.
float factorInput = input.float(2.0, "Factor")

// Declare three variables to store the MACD, signal, and histogram values from `ta.macd()`.
[macd, sig, hist] = ta.macd(close, 12, 26, 9)

// Plot the initial value of the `macd` variable. The reassignment operation below does not affect this plot.
plot(macd, "Initial `macd` value", color.blue, 2)

// Reassign the `macd` variable a new value.
macd := sig + hist * factorInput

// Plot the new value of the `macd` variable.
plot(macd, "Modified `macd` value", color.orange, 2)
```

Note that:

- A reassignment or compound assignment operation does not apply to a variable in any code before that operation in the script. The two [plot()](https://www.tradingview.com/pine-script-reference/v6/#fun_plot) calls demonstrate this behavior. Although both calls use the `macd` variable, they show different results because the first call uses the variable’s initial value, and the second uses the variable’s value after executing the [:=](https://www.tradingview.com/pine-script-reference/v6/#op_:=) operation.

## [Scopes](#scopes)

The scope of a variable refers to the region of a script in which the script can use the declared [identifier](/pine-script-docs/language/identifiers/) to access that variable and its data. Every script has one global scope and zero or more local scopes.

The location of a variable declaration in a source code determines the resulting variable’s scope:

- A variable declared inside the code block of a [conditional structure](/pine-script-docs/language/conditional-structures/), a [loop](/pine-script-docs/language/loops/), or a [user-defined function](/pine-script-docs/language/user-defined-functions/) or [method](/pine-script-docs/language/methods/#methods) definition belongs to a unique local scope.

- All variables declared outside these structures, as signified by non-indented lines of code, belong to the script’s global scope.

The global scope is the outermost scope; it encloses all parts of the script defined in the source code. Every local scope is an inner scope, nested into an outer scope, that encloses only the parts of the script defined within a specific structure. In general, declared variables that belong to a given outer scope are accessible to the inner scopes defined within that scope, but only if the structures that create those scopes are below the variable declarations in the code. However, variables that belong to an inner scope are not accessible to any outer scope.

For example, the following script declares a variable named `counter` and increments its assigned value inside the scope of an [if](https://www.tradingview.com/pine-script-reference/v6/#kw_if) structure, then attempts to use that local variable’s identifier for the `series` argument of a [plot()](https://www.tradingview.com/pine-script-reference/v6/#fun_plot) call in the global scope. This script causes a compilation error, because only the [if](https://www.tradingview.com/pine-script-reference/v6/#kw_if) structure can use the `counter` identifier to access the variable declared within it. In the global scope, the identifier does not refer to a valid variable:

```pine
//@version=6
indicator("Visibility of inner scopes demo")

if close > open
    //@variable A persistent *local* variable that tracks the number of upward bars.
    //          Only the `if` structure&#39;s scope can access this variable. The variable is inaccessible to other scopes.
    var int counter = 0
    // Increment the variable&#39;s value by 1 in this scope.
    counter += 1

// The use of `counter` in this `plot()` call causes a compilation error.
// No variable with that name exists in this scope, and the outermost (global) scope cannot access local variables.
plot(counter, "Up bar count", color.teal, 3)
```

By contrast, if we move the `counter` variable declaration above the [if](https://www.tradingview.com/pine-script-reference/v6/#kw_if) structure in the previous code, the variable then belongs to the global scope. With this change, the [plot()](https://www.tradingview.com/pine-script-reference/v6/#fun_plot) call can now use the variable. Additionally, the script can still use the identifier in the [if](https://www.tradingview.com/pine-script-reference/v6/#kw_if) structure’s [+=](https://www.tradingview.com/pine-script-reference/v6/#op_+=) operation to [reassign](/pine-script-docs/language/variable-declarations/#variable-reassignment) the variable without causing an error, because a global variable is accessible to the local scopes of the structures defined after its declaration:

![image](/pine-script-docs/_astro/Variable-declarations-Scopes-1.B8IrHJ3Q_1oxHwC.webp)

```pine
//@version=6
indicator("Visibility of outer scopes demo")

//@variable A persistent *global* variable that tracks the number of upward bars.
//          The global scope encloses all parts of the script. Therefore, the `if` structure below can access
//          this variable.
var int counter = 0

if close > open
    // Increment the variable&#39;s value by 1 in this scope. This does not cause an error, as `counter` refers to the
    // global variable declared above.
    counter += 1

// Plot the global `counter` series.
plot(counter, "Up bar count", color.teal, 3)
```

Note that:

- The script uses the [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) keyword to enable the `counter` variable and its value to persist across bars. To learn more about this keyword, see the [Declaration modes](/pine-script-docs/language/variable-declarations/#declaration-modes) section below.

Each variable in a script is a unique container that stores a specific value or reference (ID). As such, every variable that belongs to the same scope must have a unique identifier, because using two variables with identical names in the same scope causes ambiguity. The only exception is for variables that have a [single underscore](/pine-script-docs/language/variable-declarations/#using-an-underscore-as-an-identifier) (`_`) as their identifier, because the identifier makes those variables unusable.

However, variables that belong to different scopes can have the same identifier, even if they differ in their [qualified types](/pine-script-docs/language/variable-declarations/#declaring-qualified-types) or [declaration modes](/pine-script-docs/language/variable-declarations/#declaration-modes), because the identifier refers to only one specific variable while the script executes the scope where each variable declaration occurs.

For example, the script below calculates the percentage difference between the total number of rising and falling bars. It declares three variables named `counter` for its calculations. The script declares the first two inside the separate [if](https://www.tradingview.com/pine-script-reference/v6/#kw_if) structures, and the last one below those structures in the global scope. Although multiple variables share the `counter` identifier, each exists in a different scope, and the identifier refers to only one of those variables at a time. Therefore, the script compiles successfully:

![image](/pine-script-docs/_astro/Variable-declarations-Scopes-2.CDHXjaS3_1AigCd.webp)

```pine
//@version=6
indicator("Identical variable names in different scopes demo")

//@variable Stores the total number of up bars if `close > open`, and `na` otherwise.
int risingCount = if close > close[1]
    // Declare a local variable named `counter` and increment its value.
    // This variable is a unique entity that exists only in this `if` structure&#39;s scope. No other scopes can access it.
    var int counter = 0
    counter += 1 // Modifies the variable declared on line 8.

//@variable Stores the total number of down bars if `close < open`, and `na` otherwise.
int fallingCount = if close < close[1]
    // Declare another variable named `counter` and increment its value.
    // Although it has the same name as the variable in the `if` block above, it exists only in this structure&#39;s scope.
    var int counter = 0
    counter += 1 // Modifies the variable declared on line 15. Does not affect the variable on line 8.

// Declare a global variable named `counter` and increment its value. The identifier here does not refer to either of
// the local variables above, because this declaration is in the outermost scope.
var int counter = 0
counter += 1 // Modifies the variable declared on line 20. Does not affect the ones on lines 8 and 15.

//@variable The percentage difference between the total number of up bars and down bars.
//          The `counter` identifier in the expression refers to the variable declared on line 20.
float diff = 100 * (fixnan(risingCount) - fixnan(fallingCount)) / counter

// Plot the `diff` series as a color-coded line.
plot(diff, "Up bars - down bars %", diff > 0 ? color.teal : color.maroon, 3)
```

Note that:

- The script declares the global `risingCount` and `fallingCount` variables to store the values returned by the [if](https://www.tradingview.com/pine-script-reference/v6/#kw_if) structures, because the local `counter` variables are not accessible to the expressions outside their local scopes. When either structure executes its scope, it returns the result of its `counter += 1` statement. Otherwise, it returns [na](https://www.tradingview.com/pine-script-reference/v6/#var_na).

- If we move the variable declaration on line 20 in this script above the two [if](https://www.tradingview.com/pine-script-reference/v6/#kw_if) statements, a compiler warning occurs because the local variables named `counter` shadow the global variable. See the [Shadowing](/pine-script-docs/language/variable-declarations/#shadowing) section below to learn more.

### [Shadowing](#shadowing)

Variable shadowing refers to the behavior in which a variable in a specific scope prevents access to a variable with the same name in an outer scope. If a script declares a variable within an inner scope and assigns it the same identifier as a variable declared before it in an outer scope, the script cannot use the identifier to access the outer variable while executing the rest of the inner scope. In other words, the inner variable shadows the outer variable.

In most cases, variable shadowing is unintentional. It typically occurs in parts of a script where the programmer intends to [reassign](/pine-script-docs/language/variable-declarations/#variable-reassignment) a variable instead of creating a new one. Therefore, the compiler displays a warning in the Pine Editor to inform the programmer when it detects a local variable that shadows an outer-scope variable.

Consider the following script, which checks for engulfing candlestick patterns on the chart. It declares a global variable named `isEngulf` with an initial conditional value of `true` or `false`. Then, the script uses the `isEngulf` identifier in an [if](https://www.tradingview.com/pine-script-reference/v6/#kw_if) structure to filter the condition using criteria based on [inputs](/pine-script-docs/concepts/inputs/), and draws a diamond [label](/pine-script-docs/visuals/text-and-shapes/#labels) if the filtered condition remains true. Lastly, the script uses the identifier in a [barcolor()](https://www.tradingview.com/pine-script-reference/v6/#fun_barcolor) call to highlight bars in yellow or orange if the global variable’s value is `true`.

A newcomer to Pine might expect the script to color the same bars for which it also draws a label, and not others. However, the script colors every bar where the expression on line 16 returns `true`, and the inputs intended to filter the condition do not affect that output:

![image](/pine-script-docs/_astro/Variable-declarations-Shadowing-1.NtC79Ihw_gfjR3.webp)

```pine
//@version=6
indicator("Shadowing demo", overlay = true, max_labels_count = 500)

// Declare "input" variables specifying allowed directions, and whether only strong patterns appear in the result.
bool bullInput       = input.bool(true,  "Include bullish patterns")
bool bearInput       = input.bool(false, "Include bearish patterns")
bool showStrongInput = input.bool(true,  "Show strong patterns only")

// Declare variables to store candle body information for pattern detection.
float bodyLow   = math.min(close, open)
float bodyHigh  = math.max(close, open)
float bodyDir   = math.sign(close - open)
float bodyRange = bodyHigh - bodyLow

//@variable Holds a "bool" value indicating whether an engulfing pattern is detected on the current bar.
bool isEngulf = (
    bodyDir != bodyDir[1] and bodyLow <= bodyLow[1] and bodyHigh >= bodyHigh[1] and bodyRange > bodyRange[1]
)

if isEngulf
    // The following statement *does not* modify the variable declared on line 16.
    // Instead, it declares a *new local variable* named `isEngulf`, causing a compiler warning. After the
    // declaration, the local variable *shadows* the global variable with the same name, making that variable
    // *inaccessible* to all code that follows in the enclosing `if` structure&#39;s local block.
    isEngulf = switch bodyDir
        1  => bullInput and (showStrongInput ? bodyHigh >= high[1] : true)
        -1 => bearInput and (showStrongInput ? bodyLow  <= low[1] : true)
    // `isEngulf` in this nested `if` statement refers to the *local* variable above, **not** the one from line 16.
    if isEngulf
        label.new(bar_index, bodyDir == 1 ? low : high, style = label.style_diamond, size = size.small)

// This call colors *all* bars with an engulfing pattern, regardless of the specified inputs,
// because the `isEngulf` identifier here refers to the *global* variable, and that variable is *not* affected by
// the `if` structure&#39;s logic.
barcolor(isEngulf ? (bodyDir == 1 ? color.yellow : color.orange) : na, title = "Engulfing bar color")
```

This behavior occurs because the script uses the [=](https://www.tradingview.com/pine-script-reference/v6/#op_=) operator with the `isEngulf` identifier inside the [if](https://www.tradingview.com/pine-script-reference/v6/#kw_if) structure, then uses the identifier further in the local block to specify the condition that controls the label drawings. That [=](https://www.tradingview.com/pine-script-reference/v6/#op_=) operation declares a new, local variable named `isEngulf`, and the new variable shadows the global variable declared on line 16. Consequently, the logic of the structure does not affect the value of the global `isEngulf` variable. The compiler also displays a warning on line 25 in the code, where the local `isEngulf` declaration occurs.

We can align the script’s visuals and resolve the compiler warning by replacing the [=](https://www.tradingview.com/pine-script-reference/v6/#op_=) operator with the [reassignment operator (:=)](/pine-script-docs/language/operators/#-reassignment-operator) in the [if](https://www.tradingview.com/pine-script-reference/v6/#kw_if) structure. This simple change causes the script to reassign the global `isEngulf` variable using the [switch](https://www.tradingview.com/pine-script-reference/v6/#kw_switch) statement’s result rather than creating a new local variable. Because the script directly changes the value of the global variable in the [if](https://www.tradingview.com/pine-script-reference/v6/#kw_if) structure and uses that variable to control both the label and the bar color, both outputs now occur on the same recent bars:

![image](/pine-script-docs/_astro/Variable-declarations-Shadowing-2.LQTFn1FB_yrqD8.webp)

```pine
//@version=6
indicator("Avoiding shadowing demo", overlay = true, max_labels_count = 500)

// Declare "input" variables specifying allowed directions, and whether only strong patterns appear in the result.
bool bullInput       = input.bool(true,  "Include bullish patterns")
bool bearInput       = input.bool(false, "Include bearish patterns")
bool showStrongInput = input.bool(true,  "Show strong patterns only")

// Declare variables to store candle body information for pattern detection.
float bodyLow   = math.min(close, open)
float bodyHigh  = math.max(close, open)
float bodyDir   = math.sign(close - open)
float bodyRange = bodyHigh - bodyLow

//@variable Holds a "bool" value indicating whether an engulfing pattern is detected on the current bar.
bool isEngulf = (
    bodyDir != bodyDir[1] and bodyLow <= bodyLow[1] and bodyHigh >= bodyHigh[1] and bodyRange > bodyRange[1]
)

if isEngulf
    // This statement uses the `:=` operator instead of the `=` operator. Now, the script directly modifies the
    // global variable from line 16 instead of creating a new variable that shadows it.
    isEngulf := switch bodyDir
        1  => bullInput and (showStrongInput ? bodyHigh >= high[1] : true)
        -1 => bearInput and (showStrongInput ? bodyLow  <= low[1] : true)
    // `isEngulf` in this nested statement now refers to the global variable.
    if isEngulf
        label.new(bar_index, bodyDir == 1 ? low : high, style = label.style_diamond, size = size.small)

// Now that the `if` structure modifies the global `isEngulf` variable, this call colors the same recent bars where
// a label drawing occurs.
barcolor(isEngulf ? (bodyDir == 1 ? color.yellow : color.orange) : na, title = "Engulfing bar color")
```

It is also possible for custom variables in a script to shadow some [built-in variables](/pine-script-docs/language/built-ins/#built-in-variables). If a script declares a variable with the same identifier as a built-in variable, the identifier refers exclusively to that variable for the remainder of the scope. As with custom variables, shadowing a built-in variable causes a compiler warning.

For example, the script below declares a variable named `close` and assigns it the value of the built-in [open](https://www.tradingview.com/pine-script-reference/v6/#var_open) variable, then plots the values associated with the two identifiers. Both plots show the same values, because the variable declaration makes the built-in [close](https://www.tradingview.com/pine-script-reference/v6/#var_close) variable inaccessible to the script:

![image](/pine-script-docs/_astro/Variable-declarations-Shadowing-3.DBD6TWx9_1NNeyd.webp)

```pine
//@version=6
indicator("Shadowing a built-in demo", overlay = true)

//@variable Stores the value of the `open` variable.
float close = open

// Plot the values associated with the `close` and `open` identifiers.
// Both plots show the *same* value, because the script *cannot access* the built-in `close` variable in this part of
// the global scope.
plot(close, "`close` value", color.purple, 5)
plot(open, "`open` value", color.orange, 2)
```

However, shadowing a built-in variable is possible only if the script does not use the identifier to represent the built-in anywhere in the code. If a script already uses the built-in variable, creating a custom variable that shadows it causes a compilation error. For example:

```pine
//@version=6
indicator("Cannot use and shadow a built-in demo", overlay = true)

// The `switch` structure for this declaration uses `close` to refer to the *built-in* variable.
float ma = switch
    chart.is_standard => ta.sma(close, 20)
    => close

// This declaration now causes a compilation error. A script cannot use the identifier of a built-in to access that
// built-in and then use the identifier for a custom variable later. This applies regardless of the scope where the
// script accesses the built-in.
float close = open

plot(close, "`close` value", color.purple, 5)
plot(open,  "`open` value",  color.orange, 2)
plot(ma)
```

Some variables can also have the same names as namespaces. This naming does not typically result in shadowing. For example, a script can name a variable `barstate` and still access variables from the `barstate` namespace. However, if a variable is of a [user-defined type](/pine-script-docs/language/type-system/#user-defined-types) (UDT), a compilation error occurs if its name matches a namespace. Such an identifier is not allowed for the type because it can cause obscuring, where the namespace becomes inaccessible or the use of the name becomes ambiguous. For example:

```pine
//@version=6
indicator("Cannot obscure namespaces demo")

//@type A custom type with a single "int" field named `tickerid`.
type myType
    int tickerid = 1

// This declaration causes an error.
// A UDT variable with the name `syminfo` can obscure the `syminfo` namespace.
myType syminfo = myType.new()

log.info(str.tostring(syminfo.tickerid))
```

## [Declaration modes](#declaration-modes)

A variable’s declaration mode defines whether and how the variable and its data persist across script executions. By default, declared variables do not persist beyond a single execution; the script declares and initializes them anew during every execution of their [scopes](/pine-script-docs/language/variable-declarations/#scopes).

Programmers can override this behavior and specify an alternative mode in a [single-variable declaration](/pine-script-docs/language/variable-declarations/#single-variable-declarations) by including the [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) or [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) keyword in the statement:

- 
If the declaration includes the [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) keyword, the resulting variable persists across bars after the first execution of its scope on a bar’s closing tick. After initialization on a closing tick, the variable remains initialized and preserves any data changes that occur on the close of each subsequent bar. However, it does not preserve any changes that occur on a bar before the bar’s closing tick.

- 
If the declaration includes the [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) keyword, the resulting variable persists across every execution. The variable remains initialized after the first execution of its scope, even if that execution occurs before the bar’s closing tick. After initialization, the variable preserves all changes that occur on any execution, including on those for the incoming ticks of open [realtime bars](/pine-script-docs/language/execution-model/#realtime-bars).

### [Default](#default)

If a script declares a variable without using the [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) or [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) keyword, it declares and initializes that variable anew during every execution of the variable’s [scope](/pine-script-docs/language/variable-declarations/#scopes). In other words, the variable resets and holds a new value or reference on each new execution, without preserving the data stored during the scope executions on previous bars or ticks.

The following example demonstrates the default declaration behavior. The script declares a variable named `count` with an initial value of 0, then uses the [+=](https://www.tradingview.com/pine-script-reference/v6/#op_+=) operator to increase its value by one and plots the result. Because the variable declaration does not include the [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) or [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) keyword, the script reinitializes the variable with a value of 0 on every execution. Therefore, the [+=](https://www.tradingview.com/pine-script-reference/v6/#op_+=) operation [reassigns](/pine-script-docs/language/variable-declarations/#variable-reassignment) a constant value of 1 to the variable across the entire dataset:

![image](/pine-script-docs/_astro/Variable-declarations-Declaration-modes-Default-1.BZK61m9e_28DWmw.webp)

```pine
//@version=6
indicator("Default declaration mode demo")

// This declaration does not use `var` or `varip`.
// Therefore, the script reinitializes the variable to 0 on every execution.
int count = 0

// Increment the `count` variable by one. Because the variable resets to 0, this operation consistently reassigns it
// a value of 1.
count += 1

// Plot the variable&#39;s final value.
plot(count, "Constant value", color.blue, 3)
```

Although a variable that uses the default declaration mode does not persist across executions, Pine’s runtime system commits (saves) a script’s calculated data from each execution on a bar’s closing tick, including the data for all the script’s variables, to internal [time series](/pine-script-docs/language/execution-model/#time-series) structures. Scripts can access a variable’s previous saved values or references (IDs) by using the [history-referencing operator](/pine-script-docs/language/operators/#-history-referencing-operator) or the [built-in functions](/pine-script-docs/language/built-ins/#built-in-functions) that retrieve history internally.

For example, the script version below retrieves the last saved value of the `count` variable from one bar back using the expression `nz(count[1])`, then increments that value by one and reassigns the result to the `count` variable on the current bar using the [:=](https://www.tradingview.com/pine-script-reference/v6/#op_:=) operator. The plot now shows a value that increases by one on each bar rather than remaining at a constant value, because the final value of the `count` variable on each bar is one greater than the retrieved value for the previous bar:

![image](/pine-script-docs/_astro/Variable-declarations-Declaration-modes-Default-2.DC3JFUB-_11Mpn9.webp)

```pine
//@version=6
indicator("Using past values of a variable demo")

// This declaration does not use `var` or `varip`.
// Therefore, the script reinitializes the variable to 0 on every execution.
int count = 0

// Retrieve the value of the `count` variable from the previous bar, or 0 if it is not available, add 1 to that value,
// then reassign the result to the `count` variable on the current bar. The script accesses this result with
// the `count[1]` operation while executing on the next bar.
// Therefore, the current value of the variable is always one greater than the value on the previous bar.
count := nz(count[1]) + 1

// Plot the variable&#39;s final value.
plot(count, "Bar counter", color.blue, 3)
```

Note that:

- The expression `count[1]` returns [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) on the first bar of the dataset, because there is no previous bar for the script to access at that point. Therefore, we use the [nz()](https://www.tradingview.com/pine-script-reference/v6/#fun_nz) function to replace [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) with 0 in the calculation. See the [`na` value](/pine-script-docs/language/type-system/#na-value) section of the [Type system](/pine-script-docs/language/type-system/) page to learn more.

- A simpler way to achieve the same plotted result is to add [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) to the `counter` variable declaration in the previous example script. See the [`var`](/pine-script-docs/language/variable-declarations/#var) section to learn more.

### [​`var`​](#var)

A variable declaration that includes the [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) keyword creates a variable that persists across bars. The variable remains initialized after the first execution of its [scope](/pine-script-docs/language/variable-declarations/#scopes) on a bar’s closing tick. From that bar onward, the variable automatically preserves its assigned value or reference until the script explicitly [reassigns](/pine-script-docs/language/variable-declarations/#variable-reassignment) it.

In the following example, we modified the first example from the [Default](/pine-script-docs/language/variable-declarations/#default) section above by adding the [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) keyword to the `count` variable declaration. With this change, the script no longer reinitializes the variable on every bar. Instead, the variable becomes permanently initialized as of the closing tick of the dataset’s first bar. On each subsequent bar, the [+=](https://www.tradingview.com/pine-script-reference/v6/#op_+=) operation increases the variable’s value by one, and that new value persists into the next execution. The script now plots a value that changes to 1 on the first bar, then to 2 on the second, and so on:

![image](/pine-script-docs/_astro/Variable-declarations-Declaration-modes-Var-1.777SQW91_14J0WS.webp)

```pine
//@version=6
indicator("Persistence across bars demo")

//@variable A persistent variable initialized to 0 on the first bar, and then modified on each bar.
//          The script does not reinitialize this variable after the first bar.
var int count = 0

// Increment the `count` variable by one. Because the `count` variable persists, it preserves the result of this
// operation on the close of each bar. Therefore, on each bar, the variable&#39;s current value is one greater than the
// value on the previous bar.
count += 1

// Plot the variable&#39;s final value.
plot(count, "Bar counter", color.teal, 3)
```

Scripts can use the [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) keyword to declare persistent variables of most available [types](/pine-script-docs/language/type-system/#types), including [reference types](/pine-script-docs/language/type-system/#reference-types). If a variable declared with [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) stores the reference (ID) of an object, such as a [collection](/pine-script-docs/language/type-system/#collections), changes to that object’s saved data also persist across bars.

For example, the script below declares a variable named `myArray` using [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) and initializes it with the ID of an empty [array](/pine-script-docs/language/arrays/) created from a call to `array.new<float>()`. Then, it uses the variable in a call to [array.push()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.push) to add a new element to the array once every five bars, and plots the array’s size on the chart. The plotted size increases by one on every fifth bar without resetting to zero, because assigning an array’s ID to a [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) variable causes that array to persist while the variable continues to reference it:

![image](/pine-script-docs/_astro/Variable-declarations-Declaration-modes-Var-2.C9g9I4R9_Z13xTnY.webp)

```pine
//@version=6
indicator("Persistent collection demo")

//@variable A persistent variable that stores the ID of an array created on the first bar.
var array<float> myArray = array.new<float>()

// Push the current `close` value into the end of the array once every five bars.
if bar_index % 5 == 0
    array.push(myArray, close)

// Plot the size of the array referenced by `myArray`.
plot(array.size(myArray), "Persistent array&#39;s size", linewidth = 3)
```

The [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) keyword is often helpful when working with instances of [drawing types](/pine-script-docs/language/type-system/#drawing-types), such as [lines](/pine-script-docs/visuals/lines-and-boxes/#lines). Drawing objects automatically persist across bars until deleted by the runtime system or calls to the built-in `*.delete()` functions, even if a script does not assign their IDs to variables. However, using [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) variables to directly store drawing IDs, or the data that the drawings require, often makes them simpler to manage across bars. Additionally, it helps promote runtime efficiency.

For example, the script below draws a line from the open to the close of each daily period on the chart. It uses [ta.valuewhen()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.valuewhen) calls to calculate the opening time and price values for the current period, and assigns those values to variables. On historical bars, the script creates a new line using [line.new()](https://www.tradingview.com/pine-script-reference/v6/#fun_line.new) and initializes a `currLine` variable with the returned ID when a new period starts. On realtime bars where the current period is open, the script retrieves the last [line](https://www.tradingview.com/pine-script-reference/v6/#type_line) ID saved by the variable (`currLine[1]`), deletes the referenced line with a call to [line.delete()](https://www.tradingview.com/pine-script-reference/v6/#fun_line.delete), and then creates a new line to follow the latest price.

This code is not the most efficient way to achieve the intended result, because it uses [ta.valuewhen()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.valuewhen) to calculate values that the script does not require on every bar, and it deletes and redraws lines on the last bar rather than using `line.set*()` functions to modify the latest line:

![image](/pine-script-docs/_astro/Variable-declarations-Declaration-modes-Var-3.Bq5GGdRF_1bTSQG.webp)

```pine
//@version=6
indicator("Inefficient line management demo", overlay = true)

//@variable Holds `true` on the first bar in a "1D" period, and `false` on all other bars.
bool newPeriod = timeframe.change("1D")

// Retrieve the `time` and `open` values from the last bar where the `newPeriod` value was `true`,
// and assign the results to variables.
int   openTime  = ta.valuewhen(newPeriod, time, 0)
float openPrice = ta.valuewhen(newPeriod, open, 0)

// Declare a variable to reference the latest line.
line currLine = na

if barstate.islast
    // Create a new `line` object and assign its ID to the `currLine` variable.
    currLine := line.new(openTime, openPrice, time, close, xloc.bar_time)
    // Delete the line drawn on the previous bar if the `newPeriod` value is `false`.
    if not newPeriod
        line.delete(currLine[1])
// On historical bars where a new period starts, draw a line connecting the period&#39;s final values.
else if newPeriod
    currLine := line.new(openTime[1], openPrice[1], time[1], close[1], xloc.bar_time)
```

The following script version demonstrates a simpler and more efficient way to achieve the same result. It uses the [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) keyword in the `currLine` variable declaration to initialize the variable on only the first bar. On historical bars where a new period starts, the script calls [line.set_xy2()](https://www.tradingview.com/pine-script-reference/v6/#fun_line.set_xy2) to update the end coordinates of the current line referenced by the `currLine` variable, and then creates a new line for the current bar and reassigns the variable to store that line’s ID. On the latest bar where the current period is open, the script passes the variable to a [line.set_xy2()](https://www.tradingview.com/pine-script-reference/v6/#fun_line.set_xy2) call to update the current line instead of deleting that line and creating a new one:

![image](/pine-script-docs/_astro/Variable-declarations-Declaration-modes-Var-4.Bsi0Kf73_Z2rfFCa.webp)

```pine
//@version=6
indicator("Efficient line management demo", overlay = true)

//@variable Holds `true` on the first bar in a "1D" period, and `false` on all other bars.
bool newPeriod = timeframe.change("1D")

// Declare a variable that persistently stores a `line` ID or `na` across bars until reassigned.
var line currLine = na

if barstate.islast
    // At the start of a new period, create a new `line` object with coordinates for the current bar, and reassign
    // the `currLine` variable. The variable stores the new `line` ID until the `newPeriod` value is `true` again.
    if newPeriod
        currLine := line.new(time, open, time, close, xloc.bar_time, color = color.purple)
    // Set the `x2` and `y2` (end) coordinates of the current line to the current bar&#39;s `time` and `close` values
    // while the period is open.
    currLine.set_xy2(time, close)
else if newPeriod
    // Update the end coordinates of the latest line on historical bars to the final value of the previous period.
    currLine.set_xy2(time[1], close[1])
    // Create a new `line` object and assign its ID to the `currLine` variable. On the next historical bar where
    // a new period starts, the script modifies the new line.
    currLine := line.new(time, open, time, close, xloc.bar_time, color = color.purple)
```

Note that:

- Programmers can observe the performance difference between these scripts by analyzing them with the [Pine Profiler](/pine-script-docs/writing/profiling-and-optimization/#pine-profiler) on the historical and realtime bars of an intraday chart.

- It is possible to search the built-in [line.all](https://www.tradingview.com/pine-script-reference/v6/#var_line.all) array to access the last drawn line instead of using a persistent variable. However, that approach requires checking the array’s size with the [array.size()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.size) function and using the [array.get()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.get) or [array.last()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.last) function to retrieve the latest [line](https://www.tradingview.com/pine-script-reference/v6/#type_line) ID. These extra steps require more resources than maintaining a persistent ID with a [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) variable and updating the referenced line’s data across specific bars.

Scripts can use the [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) keyword to declare variables in global or local [scopes](/pine-script-docs/language/variable-declarations/#scopes). If a [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) variable declaration is in a local scope, such as within a [conditional structure](/pine-script-docs/language/conditional-structures/), that variable persists across each execution of the scope and preserves changes that occur on a bar’s closing tick. The variable does not reset to its initial state on bars where the scope does not execute.

For example, the script below declares a persistent local variable named `localVar` with an initial value of -1 inside the scope of an [if](https://www.tradingview.com/pine-script-reference/v6/#kw_if) structure. The structure’s local code executes once every 10 bars. After initializing the persistent variable, the structure uses the [*=](https://www.tradingview.com/pine-script-reference/v6/#op_*=) operator to multiply the variable’s current value by -1 and reassign it. The script assigns the local variable’s value to a variable in the global scope named `globalVar` and plots the result on the chart. Because the `localVar` variable persists without resetting to its initial value, the plotted results on each 10th bar alternate between -1 and 1:

![image](/pine-script-docs/_astro/Variable-declarations-Declaration-modes-Var-5.Dbslx0rq_ZwA9yr.webp)

```pine
//@version=6
indicator("Persistent local variable demo")

//@variable Stores the value of the `localVar` variable on each 10th bar, and `na` on other bars.
int globalVar = if bar_index % 10 == 0
    //@variable A persistent local variable initialized to -1 and then modified across bars.
    //          This variable persists across bars after initialization, even when the scope does not execute.
    var int localVar = -1
    // Multiply the local variable&#39;s value by -1 and reassign it using the result.
    // If the current value is -1, it changes to 1. If 1, it changes to -1.
    // The structure returns the result of this operation only on bars where the scope executes.
    localVar *= -1

// Plot the value of the `globalVar` variable.
plot(globalVar, "Alternating value from local scope", color.teal, 3)
```

Note that:

- The [if](https://www.tradingview.com/pine-script-reference/v6/#kw_if) structure returns [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) on each bar where the local scope does not execute. Therefore, the `globalVar` variable stores a value other than [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) only on each 10th bar.

- If we remove [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) from the `localVar` variable declaration, causing it to use the [default](/pine-script-docs/language/variable-declarations/#default) declaration mode, the script plots a consistent value of 1 on each 10th bar, and [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) on other bars. The result changes because each execution of the scope reinitializes the value to -1, and multiplying that value by -1 results in a value of 1.

It’s important to note that local variables declared using [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) inside [loops](/pine-script-docs/language/loops/) behave very differently from those declared using the [default](/pine-script-docs/language/variable-declarations/#default) declaration mode. If a local variable in a loop uses the default mode, the script reinitializes it on every iteration. By contrast, if the local declaration uses [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var), the variable remains initialized after the first loop iteration on a bar’s closing tick. From that point onward, it persists and preserves changes to its data from each iteration on the closing ticks of subsequent bars.

For example, the following script declares two local variables inside the body of a [for](https://www.tradingview.com/pine-script-reference/v6/#kw_for) loop that performs five iterations. The `local1` variable declaration uses the default declaration mode, and the `local2` declaration uses the [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) keyword. The loop [reassigns](/pine-script-docs/language/variable-declarations/#variable-reassignment) a value of 0 to the `local2` variable on the first iteration, then increments the values of both variables by one on every iteration. The loop returns a tuple containing both values when it ends, and the script uses a [tuple declaration](/pine-script-docs/language/variable-declarations/#tuple-declarations) to create global variables that store the returned values for its plots:

```pine
//@version=6
indicator("Persistent loop variable demo")

// Declare two global variables to store the values of the `local1` and `local2` variables returned
// after the loop&#39;s final iteration.
[global1, global2] = for i = 1 to 5
    //@variable A local variable declared using the default mode.
    //          The script reinitializes this variable to 0 on *every* loop iteration.
    int local1 = 0
    //@variable A local variable declared using `varip`.
    //          This variable remains initialized after the first loop iteration.
    var int local2 = 0
    // On the first iteration, reset the `local2` variable&#39;s value to 0. Without this statement, the value would
    // continue to increase across bars.
    if i == 1
        local2 := 0
    // Because the `local1` variable consistently resets to 0 before this operation,
    // its final value is 1 on each iteration.
    local1 += 1
    // By contrast, the `local2` variable does not reset to its previous state on each iteration. The operation on the
    // first iteration changes the value to 1, the operation on the second changes the value to 2, and so on.
    local2 += 1
    // Return both variables&#39; values in a tuple for plotting.
    [local1, local2]

// Plot the values saved to `global1` and `global2`, which equal those of `local1` and `local2`, on the chart.
plot(global1, "Non-persistent", color.blue,   3)
plot(global2, "Persistent",     color.orange, 3)
```

As shown below, the final value of the `local1` variable on each bar is 1, whereas the value of the `local2` variable is 5. This difference occurs because the script reinitializes the `local1` variable to hold 0 on every loop iteration, so the [+=](https://www.tradingview.com/pine-script-reference/v6/#op_+=) operation on that variable consistently sets the value to 1. In contrast, the `local2` variable remains initialized after the first loop iteration. Therefore, the [+=](https://www.tradingview.com/pine-script-reference/v6/#op_+=) operation on that variable consistently increases the assigned value. The variable stores a value of 1 on the first iteration, 2 on the second iteration, and so on until it reaches the final value of 5 on the last iteration:

![image](/pine-script-docs/_astro/Variable-declarations-Declaration-modes-Var-6.C0VKniBk_xqTuk.webp)

Note that:

- As demonstrated by the previous example, even local variables declared with [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) persist across bars. Therefore, if we remove the [if](https://www.tradingview.com/pine-script-reference/v6/#kw_if) statement that reassigns 0 to the `local2` variable, that variable’s value consistently increases by five on each bar.

### [​`varip`​](#varip)

A variable declaration that includes the [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) keyword creates a variable that persists across every tick. The variable becomes permanently initialized after the first execution of its [scope](/pine-script-docs/language/variable-declarations/#scopes), even if that execution occurs before a bar’s closing tick. From that point onward, all changes to the variable’s data persist, even those that occur during script executions on an open bar. The “ip” in the keyword stands for “intrabar persist”, as the value or reference stored by the variable persists across every update within each bar until the script explicitly [reassigns](/pine-script-docs/language/variable-declarations/#variable-reassignment) the variable.

The [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) keyword is compatible with variables that store only specific types of data, including the following:

- Values of any [fundamental type](/pine-script-docs/language/type-system/#types) (“int”, “float”, “bool”, “color”, or “string”).

- Members of [enum types](/pine-script-docs/language/type-system/#enum-types).

- IDs of the [chart.point](https://www.tradingview.com/pine-script-reference/v6/#type_chart.point), [footprint](https://www.tradingview.com/pine-script-reference/v6/#type_footprint), or [volume_row](https://www.tradingview.com/pine-script-reference/v6/#type_volume_row) type.

- The IDs for [objects](/pine-script-docs/language/objects/) of [user-defined types (UDTs)](/pine-script-docs/language/type-system/#user-defined-types).

The keyword is also compatible with variables that store the IDs of [collections](/pine-script-docs/language/type-system/#collections), but only if those collections store the following types of data:

- Values of a fundamental type.

- IDs of the [chart.point](https://www.tradingview.com/pine-script-reference/v6/#type_chart.point), [footprint](https://www.tradingview.com/pine-script-reference/v6/#type_footprint), or [volume_row](https://www.tradingview.com/pine-script-reference/v6/#type_volume_row) type.

- IDs for objects of a user-defined type with fields for storing data of only the above types or the IDs of other collections that contain elements of only these types.

A variable declared with [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) typically behaves the same as a variable declared with [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) on historical bars (where the value of the [barstate.ishistory](https://www.tradingview.com/pine-script-reference/v6/#var_barstate.ishistory) variable is `true`), because by default, all scripts execute once per bar on that part of the dataset. However, on [realtime bars](/pine-script-docs/language/execution-model/#realtime-bars), which form over time as new ticks become available from the data feed, [indicator](https://www.tradingview.com/pine-script-reference/v6/#fun_indicator) and [library](https://www.tradingview.com/pine-script-reference/v6/#fun_library) scripts execute once per tick instead of once per bar. Variables declared with [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) and [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) typically behave differently on these bars.

As noted in the previous section, if a script modifies a [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) variable while executing on an open bar, those modifications do not persist. Pine’s rollback process reverts the variable to its last confirmed state as of the previous bar’s close before the script executes on the bar again. This process ensures that the variable stores only confirmed data at the start of each execution, and not any temporary data from ticks that arrive before the bar closes.

By contrast, a variable declared with [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) is not affected by rollback. If a script modifies a variable declared with [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) while executing on an open bar, the variable preserves its new value or reference without reverting to a previous state after the execution ends. The variable’s new data persists across every subsequent execution on that bar and the bars that follow until the script explicitly changes it again.

The following indicator script demonstrates how [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) variables behave differently from [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) variables on realtime bars. The script declares two global variables named `counter1` and `counter2`. The first declaration uses the [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) keyword, and the second uses [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip). On each execution, the script uses the [+=](https://www.tradingview.com/pine-script-reference/v6/#op_+=) operator to increment the values of both variables by one, and then plots the resulting values on the chart. The script also colors the background when the value of [barstate.isrealtime](https://www.tradingview.com/pine-script-reference/v6/#var_barstate.isrealtime) is `true` to emphasize realtime bars:

```pine
//@version=6
indicator("Persistence across ticks demo")

//@variable A persistent variable whose value increases by one on each bar.
var int counter1 = 0
//@variable A persistent variable whose value increases by one on each execution.
varip int counter2 = 0

// Increase the `counter1` variable&#39;s value by one on each execution. If the current bar is open, the
// system resets the variable to its previous state before the next execution.
// Regardless of how many times the script executes on a realtime bar, the variable&#39;s final value for that bar is
// only one greater than the value on the previous bar.
counter1 += 1

// Increase the `counter2` variable&#39;s value by one on each execution. Unlike the `counter1` variable, the `counter2`
// variable does not reset. If the bar is open, the new value persists into the next execution.
// Therefore, if five executions occur on a realtime bar, the variable&#39;s final value for that bar is five greater
// than the value on the previous bar.
counter2 += 1

// Plot the values of the two variables on the chart. Both plots show the same value on historical bars,
// but they can differ on realtime bars when the script executes more than once per bar.
plot(counter2, "`varip` counter", color.purple, 5)
plot(counter1, "`var` counter",   color.teal,   2)
// Highlight the background of realtime bars for visual reference.
bgcolor(barstate.isrealtime ? color.new(color.orange, 80) : na, title = "Realtime bar highlight")
```

While running on historical bars, the script executes once on each bar’s closing tick. Therefore, the values of both variables consistently increase by one on each bar in that part of the dataset, and the plots for the two variables show the same results. Then, when the script reaches realtime bars, the two plots begin to diverge.

The script executes multiple times on each realtime bar — once for each new tick — to calculate the bar’s results using the latest available data. The [+=](https://www.tradingview.com/pine-script-reference/v6/#op_+=) operations on each execution increase the values of both variables by one. However, while the current bar is open, the change to the `counter1` variable resets before each new execution. The variable preserves only the change that occurs on the bar’s closing tick. Therefore, the variable’s final value increases by only one on each realtime bar, just like it does on historical bars.

By contrast, the `counter2` variable, declared using [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip), does not revert to a previous state on any execution. With each new tick in an open realtime bar, the [+=](https://www.tradingview.com/pine-script-reference/v6/#op_+=) operation increases the variable’s value by one, and the new value for the variable persists into the execution on the next tick. Therefore, the variable’s final value for each realtime bar increases by the number of ticks that are available for that bar:

![image](/pine-script-docs/_astro/Variable-declarations-Declaration-modes-Varip-1.C0gzXtky_ZWGsGQ.webp)

When using the [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) keyword to declare variables that access objects of built-in [reference types](/pine-script-docs/language/type-system/#reference-types), including [chart points](/pine-script-docs/language/type-system/#chart-points) or [collections](/pine-script-docs/language/type-system/#collections) of value types, changes to the values stored by those objects also persist across each tick without resetting to a previous state.

For example, the script below uses [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) to declare a variable named `testPoint` that stores a persistent reference to a [chart.point](https://www.tradingview.com/pine-script-reference/v6/#type_chart.point) object. Then, it uses the [+=](https://www.tradingview.com/pine-script-reference/v6/#op_+=) operator to increase the value of the object’s `price` field by one on each execution and plots the field’s final value for each bar. The plot increments by one across all historical bars, where the script executes only once per bar. On realtime bars, the plot increments by the number of ticks available for each bar, because the chart point’s `price` field does not reset to a previous state after each [+=](https://www.tradingview.com/pine-script-reference/v6/#op_+=) operation while a bar is open:

![image](/pine-script-docs/_astro/Variable-declarations-Declaration-modes-Varip-2.b9aIn9rF_1WiYvN.webp)

```pine
//@version=6
indicator("Persistent built-in object demo")

//@variable Stores a persistent reference to a `chart.point` object. The object&#39;s fields persist across ticks.
varip chart.point testPoint = chart.point.now(0)

// Increment the `price` field of the persistent chart point.
testPoint.price += 1

// Plot the field&#39;s value on the chart.
plot(testPoint.price, "Persistent `price` field value", linewidth = 3)
// Highlight the background of realtime bars for visual reference.
bgcolor(barstate.isrealtime ? color.new(color.orange, 80) : na, title = "Realtime bar highlight")
```

Note that:

- The same persistent behavior applies to built-in objects whose IDs are stored in collections referenced by [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) variables. For example, if a script declares a [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) variable that references an [array](/pine-script-docs/language/arrays/) of [chart.point](https://www.tradingview.com/pine-script-reference/v6/#type_chart.point) IDs, changes to the chart points referenced by the array, and their fields, persist across ticks.

It’s crucial to note that [strategies](/pine-script-docs/concepts/strategies/) execute differently from indicators. By default, a strategy executes strictly once per bar, even on [realtime bars](/pine-script-docs/language/execution-model/#realtime-bars). Therefore, [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) variables in a strategy behave the same as [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) variables by default. However, users can change a strategy’s [calculation behavior](/pine-script-docs/concepts/strategies/#altering-calculation-behavior) to enable additional executions on [each new tick](/pine-script-docs/concepts/strategies/#calc_on_every_tick) or [after order fills](/pine-script-docs/concepts/strategies/#calc_on_order_fills). These settings can cause a strategy’s [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) variables to behave differently on both realtime and historical bars.

For example, the simple strategy below alternates between creating a long and short [market order](/pine-script-docs/concepts/strategies/#market-orders) on each execution. It also declares two persistent variables named `counter1` and `counter2` and increments their values by one with the [+=](https://www.tradingview.com/pine-script-reference/v6/#op_+=) operator. The first declaration uses [var](https://www.tradingview.com/pine-script-reference/v6/#kw_var), and the second uses [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip). The script also colors the background of all realtime bars for visual reference:

```pine
//@version=6
strategy("`varip` vs. `var` in strategies demo")

// This logic creates a new market order on each execution for demonstration purposes.
if strategy.position_size <= 0
    strategy.entry("Long", strategy.long)
else
    strategy.entry("Short", strategy.short)

//@variable A persistent variable whose value increases by one on each bar.
var int counter1 = 0
//@variable A persistent variable whose value increases by one on each execution.
varip int counter2 = 0

// The result of this operation does not vary with the strategy&#39;s calculation behavior.
// The variable&#39;s value consistently increases by one on each bar.
counter1 += 1

// By contrast, this operation&#39;s result does depend on the specified calculation behavior:
// - If the default behavior is used, the value increases by one on each bar, just like the value of `counter1`.
// - If recalculation on each tick is enabled, the value can increase by more than one on each realtime bar.
// - If recalculation after order fills is enabled, the value increases by four on each historical bar by default,
//   and by the number of new ticks on each realtime bar.
counter2 += 1

// Plot the values of the `counter1` and `counter2` variables for comparison.
plot(counter2, "`varip` counter", color.purple, 5)
plot(counter1, "`var` counter",   color.teal,   2)
// Highlight the background of realtime bars.
bgcolor(barstate.isrealtime ? color.new(color.orange, 80) : na, title = "Realtime bar highlight")
```

If we run the script with the default calculation behavior, the strategy executes only once on every closed bar. On realtime bars, it waits for each bar to close before performing a new execution. As such, the values of both variables consistently increment by the same amount across all bars and do not diverge:

![image](/pine-script-docs/_astro/Variable-declarations-Declaration-modes-Varip-3.C02xduNO_1bB5wI.webp)

If we select the “On every tick” checkbox in the strategy’s “Properties” tab, the script executes on each new tick in a realtime bar, similar to an indicator. With this change, the plot for the `counter2` variable diverges from that of the `counter1` variable on realtime bars:

![image](/pine-script-docs/_astro/Variable-declarations-Declaration-modes-Varip-4.DrxeoGF4_2bPzis.webp)

If we select the “After an order is filled” checkbox, the script executes again on any bar where the [broker emulator](/pine-script-docs/concepts/strategies/#broker-emulator) fills an order. By default, the emulator assumes that the open, high, low, and close of historical bars are all valid ticks for filling orders, and our script creates a new order on every available tick. With this change, in addition to incrementing by the number of ticks on each realtime bar, the value of the `counter2` variable increments by four instead of one on each historical bar after the first:

![image](/pine-script-docs/_astro/Variable-declarations-Declaration-modes-Varip-5.3noG8TuR_Z1BQepE.webp)

For more detailed information about this historical behavior, see the [Executions on historical bars](/pine-script-docs/language/execution-model/#executions-on-historical-bars) section of the [Execution model](/pine-script-docs/language/execution-model/) page.

        [ Previous

 
####       Identifiers  

 ](/pine-script-docs/language/identifiers)  [ Next

 
####   Operators      

 ](/pine-script-docs/language/operators)       
## On this page

[- Introduction
](#introduction)[- Single-variable declarations
](#single-variable-declarations)[- Tuple declarations
](#tuple-declarations)[- Using an underscore as an identifier
](#using-an-underscore-as-an-identifier)[- Declaring qualified types
](#declaring-qualified-types)[- Type keywords
](#type-keywords)[- Qualifier keywords
](#qualifier-keywords)[- Variable reassignment
](#variable-reassignment)[- Scopes
](#scopes)[- Shadowing
](#shadowing)[- Declaration modes
](#declaration-modes)[- Default
](#default)[- `var`
](#var)[- `varip`
](#varip) [      ](#top)           -  [Pine Q&A chat](https://www.tradingview.com/chat/#BfmVowG1TZkKO235)  
-  [Stack Overflow](https://stackoverflow.com/questions/tagged/pine-script)  ↗ 
-  [Telegram](https://t.me/PineCodersQA)  ↗ 
-  [Reddit](https://www.reddit.com/r/TradingView/)  ↗ 
   Copyright © 2026 TradingView, Inc.