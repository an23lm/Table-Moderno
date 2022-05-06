# Table-Moderno

A simple, powerful, and modern implementation of tables for the web.

### [Demo](https://an23lm.github.io/Table-Moderno/)
<img width="1680" alt="Screenshot 2022-05-06 at 20 37 15@2x" src="https://user-images.githubusercontent.com/5507600/167161309-1bdbe776-5a58-4b12-b348-83a7c4c7f7b0.png">

### [Releases](https://github.com/an23lm/Table-Moderno/releases/)

## Installation

### Requirements

- [jQuery version 3.x](https://code.jquery.com/)
- `position: sticky` [browser support](https://developer.mozilla.org/en-US/docs/Web/CSS/position#Browser_compatibility) is required to enable sticky headers and columns.

#### Clone

Clone the repository and import `table-moderno.js` and `table-moderno.css` into your project

### OR

#### CDN

```html
<!-- Always get the latest version -->
<!-- Not recommended for production sites! -->
<script src="https://cdn.jsdelivr.net/gh/an23lm/table-moderno/dist/table-moderno.js"></script>
<link
	rel="stylesheet"
	type="text/css"
	href="https://cdn.jsdelivr.net/gh/an23lm/table-moderno/dist/table-moderno.css"
/>

<!-- Get minor updates and patch fixes within a major version -->
<script src="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@{major-version-number}/dist/table-moderno.js"></script>
<link
	rel="stylesheet"
	type="text/css"
	href="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@{major-version-number}/dist/table-moderno.css"
/>

<!-- Get patch fixes within a minor version -->
<script src="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@{major-version-number}.{minor-version-number}/dist/table-moderno.js"></script>
<link
	rel="stylesheet"
	type="text/css"
	href="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@{major-version-number}.{minor-version-number}/dist/table-moderno.css"
/>

<!-- Get a specific version -->
<script src="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@{major-version-number}.{minor-version-number}.{patch-number}/dist/table-moderno.js"></script>
<link
	rel="stylesheet"
	type="text/css"
	href="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@{major-version-number}.{minor-version-number}.{patch-number}/dist/table-moderno.css"
/>
```

#### Example

Get version 1 with latest minor version and patch

```HTML
<script src="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@1/dist/table-moderno.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@1/dist/table-moderno.css">
```

#### **_Note: It is important to get the same version for both `.js` and `.css`_**

## Usage

### Example

Clone the repository and open _demo1.html_ in the _demo_ folder with your favourite browser.

### Configuration

**Default Configuration**

```javascript
{
    defaultWidth: 300,
    widthByColumn: [],
    scrollBarType: "default",
    stickHeader: true,
    stickColumnsLeft: [1],
    stickColumnsRight: [6],
    singleLineRows: false,
    highlightHeaderColor: true,
    highlightBodyColor: true,
    tooltip: true,
    convertToLocaleString: false,
    locale: 'en-US',
    maximumFractionDigits: 2,
    lazyLoad: false,
    lazyLoadTrigger: 75,
};
```

- `defaultWidth`: All columns are set to default width unless overridden by `widthByRow`
- `widthByColumn`: Set column-wise width starting from the left
- `scrollBarType`: Can be set to `default` and `always`
  - `default`: Browser default
  - `always`: Always show horizontal and vertical scrollbar (displayed outside of bounds `moderno-table-wrapper`)
- `stickHeader`: Makes the header sticky (header freeze)
- `stickColumnsLeft`: Specify array of column numbers that need to stick to the left side of the table (column freeze)
- `stickColumnsRight`: Specify array of column numbers that need to stick to the right side of the table (column freeze)
- `singleLineRows`: Any data overflowing to a new line will be hidden.
- `highlightHeaderColor`: Enable hover and select for header cells
- `highlightBodyColor`: Enable hover and select for body cells.
- `tooltop`: Works along with `singleLineRows`. If any overflowing data is clipped, then a tooltip is appear over hover.
- `convertToLocaleString`: Display numbers with commas and decimal point placed according to your region. Eg: currency.
- `locale`: Your locale setting
- `maximumFractionDigits`: Number of digits visible after the decimal point.
- `lazyLoad`: Enable or disable lazy loading.
- `lazyLoadTrigger`: Percentage at which the callback is triggered to insert new data.

Default values will be assumed for unspecified keys.

_Specify your own default values by overriding the `TableModerno.default_config` variable._

### HTML

Create a `div` with the class `moderno-table-wrapper` with a unique `id` following the template below:

```html
<div class="moderno-table-wrapper" id="table1">
	<div class="moderno-table">
		<div class="moderno-table-header">
			<div class="moderno-table-row">
				<div class="moderno-table-item">ID</div>
				<div class="moderno-table-item">Name</div>
				<div class="moderno-table-item">Email</div>
				<div class="moderno-table-item">Phone</div>
				<div class="moderno-table-item">Profession</div>
				<div class="moderno-table-item">Hobbies</div>
			</div>
		</div>
		<div class="moderno-table-body">
			<div class="moderno-table-row">
				<div class="moderno-table-item">1</div>
				<div class="moderno-table-item">Patrick</div>
				<div class="moderno-table-item">thisispatrick@krustykrab.com</div>
				<div class="moderno-table-item">+1800-krusty-krab</div>
				<div class="moderno-table-item">
					Uh, that's the name of the restaurant
				</div>
				<div class="moderno-table-item">Sleeping</div>
			</div>
		</div>
	</div>
</div>
```

### CSS

```css
#table1 {
	height: /* height of your table */ ;
	width: /* width of your table */ ;
}
```

### JavaScript

Insert the following script at the end of the `body` tag

```javascript
const config = {
	scrollBarType: "always",
	widthByColumn: [100, 400, 500, 100, 100, 100],
	stickColumnsLeft: [1],
	stickColumnsRight: [4],
};
var moderno = new TableModerno("table1", config);
```

## Populate your table with JS Objects

- Create an attribute - `data-key` on the header columns as shown below.
- The value of the `data-key` attribute should represent the name of the _key_ on the js object. The corresponding _value_ of the _key_ will be displayed in that column.

### Example

```html
<div class="moderno-table-wrapper" id="table1">
	<div class="moderno-table">
		<div class="moderno-table-header">
			<div class="moderno-table-row">
				<div class="moderno-table-item" data-key="id">ID</div>
				<div class="moderno-table-item" data-key="name">Name</div>
				<div class="moderno-table-item" data-key="mail">Email</div>
				<div class="moderno-table-item" data-key="ph">Phone</div>
				<div class="moderno-table-item" data-key="prof">Profession</div>
				<div class="moderno-table-item" data-key="hobbs">Hobbies</div>
			</div>
		</div>
		<div class="moderno-table-body">
			<!-- body will be loaded from js object -->
		</div>
	</div>
</div>
```

```javascript
const config = {
	scrollBarType: "always",
	widthByColumn: [100, 400, 500, 100, 100, 100],
	stickColumnsLeft: [1],
	stickColumnsRight: [4],
};
var moderno = new TableModerno("table1", config);
// newData is an array of objects to be displayed on `table1`
// newData has 2 rows.
// Each row is represented by an object.
const row1 = {
	id: 1,
	name: "SquarePants",
	mail: "squrepants@krustykrab.com",
	ph: "+1800-partick",
	prof: "pineapple",
	hobbs: "ff?",
};
const row2 = {
	id: 2,
	name: "Homer",
	mail: "homer@donuts.com",
	ph: "+1800-doh",
	prof: "springfield",
	hobbs: "gg?",
};
const newData = [row1, row2];
moderno.reloadTableWithData(newData);
```

## Customization

The following CSS variables can be set to make your table fit your theme.

_The CSS variables should be created in the `:root` tag, and should be linked after `table-moderno.css` to override the default values._

**Default Theme Values**

```css
:root {
	--moderno-background-color: #ffffff;
	--moderno-border-color: #434343;

	/* header colors */
	--moderno-header-color: #113537;
	--moderno-header-text-color: #f3f3f3;

	/* body colors */
	--moderno-body-odd-row-color: #ffead0;
	--moderno-body-even-row-color: #a8b5b6;
	--moderno-body-odd-row-text-color: #434343;
	--moderno-body-even-row-text-color: #f3f3f3;

	/* fonts */
	--moderno-header-font-family: -apple-system, system-ui, BlinkMacSystemFont,
		Roboto, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
	--moderno-header-font-weight: 500;
	--moderno-header-font-size: 1.1em;

	--moderno-body-font-family: -apple-system, system-ui, BlinkMacSystemFont,
		Roboto, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
	--moderno-body-font-weight: 300;
	--moderno-body-font-size: 1em;

	/* hover colors */
	--moderno-header-hover-color: #96616b;
	--moderno-header-hover-text-color: #f3f3f3;
	--moderno-body-hover-color: #b28c93;
	--moderno-body-hover-text-color: #f3f3f3;

	/* highlight colors */
	--moderno-header-highlight-color: #f889a2;
	--moderno-header-highlight-text-color: #434343;
	--moderno-body-highlight-color: #f996ac;
	--moderno-body-highlight-text-color: #434343;

	/* center content */
	--moderno-table-item-vertical-center: center; /* flex properties - flex-start, center, flex-end */
	--moderno-table-item-horizontal-center: center; /* flex properties - flex-start, center, flex-end */
	--moderno-table-item-text-align: justify; /* text-align properties - use justify or none */
}
```

#### Example

`YourTheme.css`

```css
:root {
	--moderno-header-color: teal;
	--moderno-header-text-color: black;
}
```

## Lazy Loading

##### The new big feature in v1.5.0 is _drum roll please_ **lazy loading**!

- Two new `config` keys added -
  - lazyLoad (Boolean) _default: false_ - Enable or disable lazy loading.
  - lazyLoadTrigger (Number) _default: 75_- The percentage at which the callback is triggered to add new data.
- `registerLazyLoadTriggerCallback(callback)` _callback: function_ - The callback function is invoked when the `lazyLoadTrigger` threshold is reached. The callback function is invoked with one parameter - `callback(this.scrollDoneLoad.bind(this))`, which is also a callback. This parameter function should be invoked when the new data is done loading and is inserted into the table. Optionally, `scrollDoneLoad` can be directly called on the table object.
- `scrollDoneLoad` - Function is used to indicate that a new set of data from a lazy load is inserted. It is crucial to call this function after lazy loading is done for the operation of lazy load trigger callback.

## Documentation

<a name="TableModerno"></a>

## TableModerno

**Kind**: global class

- [TableModerno](#TableModerno)
  - [new TableModerno(id, n_config)](#new_TableModerno_new)
  - [.initHeaderDefaultEventResponders()](#TableModerno+initHeaderDefaultEventResponders)
  - [.initLoadingIndicator()](#TableModerno+initLoadingIndicator)
  - [.initSortingView()](#TableModerno+initSortingView)
  - [.initBodyDefaultEventResponders()](#TableModerno+initBodyDefaultEventResponders)
  - [.setScrollBarType(type)](#TableModerno+setScrollBarType)
  - [.toggleStickyHeader(flag)](#TableModerno+toggleStickyHeader)
  - [.registerStickyColumnsLeft(columns)](#TableModerno+registerStickyColumnsLeft)
  - [.registerStickyColumnsRight(columns)](#TableModerno+registerStickyColumnsRight)
  - [.openSortView()](#TableModerno+openSortView)
  - [.closeSortView()](#TableModerno+closeSortView)
  - [.addToSortList()](#TableModerno+addToSortList)
  - [.setSortDirection()](#TableModerno+setSortDirection)
  - [.applySortList()](#TableModerno+applySortList)
  - [.sort()](#TableModerno+sort)
  - [.scrollEventResponderOnLeft(event)](#TableModerno+scrollEventResponderOnLeft)
  - [.scrollEventResponderOnRight(event)](#TableModerno+scrollEventResponderOnRight)
  - [.calculateWidthForColumns(widths)](#TableModerno+calculateWidthForColumns)
  - [.reloadTableWithData(data)](#TableModerno+reloadTableWithData)
  - [.appendData(data)](#TableModerno+appendData)
  - [.getRowString(row)](#TableModerno+getRowString) ⇒ <code>string</code>
  - [.getHeaderColumnDataKeys()](#TableModerno+getHeaderColumnDataKeys) ⇒ <code>Array(string)</code>

<a name="new_TableModerno_new"></a>

### new TableModerno(id, n_config)

Init the table.

| Param    | Type                | Description                                                                          |
| -------- | ------------------- | ------------------------------------------------------------------------------------ |
| id       | <code>string</code> | id of div with class moderno-table-wrapper to create table on                        |
| n_config | <code>Object</code> | User configuration for table, refer `TableModerno.default_config` for default config |

<a name="TableModerno+initHeaderDefaultEventResponders"></a>

### tableModerno.initHeaderDefaultEventResponders()

Register `hover` and `click` events on `moderno-table-header`s `moderno-table-item`s

**Kind**: instance method of [<code>TableModerno</code>](#TableModerno)  
<a name="TableModerno+initLoadingIndicator"></a>

### tableModerno.initLoadingIndicator()

Init loading indicator

**Kind**: instance method of [<code>TableModerno</code>](#TableModerno)  
<a name="TableModerno+initSortingView"></a>

### tableModerno.initSortingView()

Init sorting view

**Kind**: instance method of [<code>TableModerno</code>](#TableModerno)  
<a name="TableModerno+initBodyDefaultEventResponders"></a>

### tableModerno.initBodyDefaultEventResponders()

Register `hover` and `click` events on `moderno-table-body`s `moderno-table-row`s

**Kind**: instance method of [<code>TableModerno</code>](#TableModerno)  
<a name="TableModerno+setScrollBarType"></a>

### tableModerno.setScrollBarType(type)

Set table's scroll bar type

**Kind**: instance method of [<code>TableModerno</code>](#TableModerno)

| Param | Type                | Description                         |
| ----- | ------------------- | ----------------------------------- |
| type  | <code>string</code> | can either be 'always' or 'default' |

<a name="TableModerno+toggleStickyHeader"></a>

### tableModerno.toggleStickyHeader(flag)

Toggle sticky header

**Kind**: instance method of [<code>TableModerno</code>](#TableModerno)

| Param | Type                 | Description                       |
| ----- | -------------------- | --------------------------------- |
| flag  | <code>boolean</code> | to toggle on or off sticky header |

<a name="TableModerno+registerStickyColumnsLeft"></a>

### tableModerno.registerStickyColumnsLeft(columns)

Register the columns to stick to the left and register scroll responder.

**Kind**: instance method of [<code>TableModerno</code>](#TableModerno)

| Param   | Type                    | Description                        |
| ------- | ----------------------- | ---------------------------------- |
| columns | <code>Array(int)</code> | to toggle on or off sticky columns |

<a name="TableModerno+registerStickyColumnsRight"></a>

### tableModerno.registerStickyColumnsRight(columns)

Register the columns to stick to the right and register scroll responder.

**Kind**: instance method of [<code>TableModerno</code>](#TableModerno)

| Param   | Type                       | Description                        |
| ------- | -------------------------- | ---------------------------------- |
| columns | <code>Array(number)</code> | to toggle on or off sticky columns |

<a name="TableModerno+openSortView"></a>

### tableModerno.openSortView()

Open sorting view

**Kind**: instance method of [<code>TableModerno</code>](#TableModerno)  
<a name="TableModerno+closeSortView"></a>

### tableModerno.closeSortView()

Close sorting view and save or cancel

**Kind**: instance method of [<code>TableModerno</code>](#TableModerno)  
<a name="TableModerno+addToSortList"></a>

### tableModerno.addToSortList()

Add a header to the sort list

**Kind**: instance method of [<code>TableModerno</code>](#TableModerno)  
<a name="TableModerno+setSortDirection"></a>

### tableModerno.setSortDirection()

Select sort type for header

**Kind**: instance method of [<code>TableModerno</code>](#TableModerno)  
<a name="TableModerno+applySortList"></a>

### tableModerno.applySortList()

Apply the sort list

**Kind**: instance method of [<code>TableModerno</code>](#TableModerno)  
<a name="TableModerno+sort"></a>

### tableModerno.sort()

Sort by header

**Kind**: instance method of [<code>TableModerno</code>](#TableModerno)  
<a name="TableModerno+scrollEventResponderOnLeft"></a>

### tableModerno.scrollEventResponderOnLeft(event)

Handler for scroll left on table wrapper. Registered left sticky elements will be toggled to `postition: sticky` when appropriate.

**Kind**: instance method of [<code>TableModerno</code>](#TableModerno)

| Param | Type                | Description  |
| ----- | ------------------- | ------------ |
| event | <code>Object</code> | Scroll event |

<a name="TableModerno+scrollEventResponderOnRight"></a>

### tableModerno.scrollEventResponderOnRight(event)

Handler for scroll right on table wrapper. Registered right sticky elements will be toggled to `postition: sticky` when appropriate.

**Kind**: instance method of [<code>TableModerno</code>](#TableModerno)

| Param | Type                | Description  |
| ----- | ------------------- | ------------ |
| event | <code>Object</code> | Scroll event |

<a name="TableModerno+calculateWidthForColumns"></a>

### tableModerno.calculateWidthForColumns(widths)

Set the widths of existing `.moderno-table-items` elements

**Kind**: instance method of [<code>TableModerno</code>](#TableModerno)

| Param  | Type                       | Description                                                                                     |
| ------ | -------------------------- | ----------------------------------------------------------------------------------------------- |
| widths | <code>Array(number)</code> | Array of widths of columns from left to right, if not sepecified, default width will be applied |

<a name="TableModerno+reloadTableWithData"></a>

### tableModerno.reloadTableWithData(data)

Reload table with new data and re-set widths for new items

**Kind**: instance method of [<code>TableModerno</code>](#TableModerno)

| Param | Type                | Description                     |
| ----- | ------------------- | ------------------------------- |
| data  | <code>Object</code> | New data to load the table with |

<a name="TableModerno+appendData"></a>

### tableModerno.appendData(data)

Load more data into table and re-set widths for new items

**Kind**: instance method of [<code>TableModerno</code>](#TableModerno)

| Param | Type                | Description                     |
| ----- | ------------------- | ------------------------------- |
| data  | <code>Object</code> | New data to load the table with |

<a name="TableModerno+getRowString"></a>

### tableModerno.getRowString(row) ⇒ <code>string</code>

Create a HTML string for new row to be inserted

**Kind**: instance method of [<code>TableModerno</code>](#TableModerno)  
**Returns**: <code>string</code> - HTML string

| Param | Type                | Description                                   |
| ----- | ------------------- | --------------------------------------------- |
| row   | <code>Object</code> | Object containing the information of row data |

<a name="TableModerno+getHeaderColumnDataKeys"></a>

### tableModerno.getHeaderColumnDataKeys() ⇒ <code>Array(string)</code>

Get the `data-key` attribute specified in header columns. This attribute holds the key name for the respective column in the JS Object of row data.

**Kind**: instance method of [<code>TableModerno</code>](#TableModerno)  
**Returns**: <code>Array(string)</code> - an array of keys for the respective columns will be returned in order from left to right

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[GNU GPLv3 ](https://choosealicense.com/licenses/gpl-3.0/)
