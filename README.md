# Table-Moderno
A simple, powerful, and modern implementation of tables for the web.

## [Releases](https://github.com/an23lm/Table-Moderno/releases/)
* [v1.0.1-beta](https://github.com/an23lm/Table-Moderno/releases/tag/v1.0.1-beta)

## Installation
### Requirements
* [jQuery version 3.x](https://code.jquery.com/)
* `position: sticky` [browser support](https://developer.mozilla.org/en-US/docs/Web/CSS/position#Browser_compatibility) is required to enable sticky headers and columns.

#### Clone
Clone the repository and import `table-moderno.js` and `table-moderno.css` into your project
### OR
#### CDN

```html
<!-- Always get the latest version -->
<!-- Not recommended for production sites! -->
<script src="https://cdn.jsdelivr.net/gh/an23lm/table-moderno/dist/able-moderno.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/an23lm/table-moderno/dist/table-moderno.css">

<!-- Get minor updates and patch fixes within a major version -->
<script src="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@{major-version-number}/dist/table-moderno.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@{major-version-number}/dist/table-moderno.css">

<!-- Get patch fixes within a minor version -->
<script src="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@{major-version-number}.{minor-version-number}/dist/table-moderno.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@{major-version-number}.{minor-version-number}/dist/table-moderno.css">

<!-- Get a specific version -->
<script src="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@{major-version-number}.{minor-version-number}.{patch-number}/dist/table-moderno.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@{major-version-number}.{minor-version-number}.{patch-number}/dist/table-moderno.css">
```

#### Example
Get version 1 with latest minor version and patch
```HTML
<script src="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@1/dist/table-moderno.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@1/dist/table-moderno.css">
```

#### ***Note: It is important to get the same version for both `.js` and `.css`***

## Usage

### Example
Clone the repository and open *demo1.html* in the *demo* folder with your favourite browser.

### Configuration
**Default Configuration**
```javascript
{
    defaultWidth: 300,
    widthByColumn: [],
    scrollBarType: 'default',
    stickHeader: true,
    stickColumnsLeft: [1],
    stickColumnsRight: [6]
};
```
* `defaultWidth`: All columns are set to default width unless overridden by `widthByRow`
* `widthByColumn`: Set column-wise width starting from the left
* `scrollBarType`: Can be set to `default` and `always`
    * `default`: Browser default 
    * `always`: Always show horizontal and vertical scrollbar (displayed outside of bounds  `moderno-table-wrapper`)
* `stickHeader`: Makes the header sticky (header freeze)
* `stickColumnsLeft`: Specify array of column numbers that need to stick to the left side of the table (column freeze)
* `stickColumnsRight`: Specify array of column numbers that need to stick to the right side of the table (column freeze)

Default values will be assumed for unspecified keys.

*Specify your own default values by overriding the `TableModerno.default_config` variable.*

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
				<div class="moderno-table-item">Uh, that's the name of the restaurant</div>
				<div class="moderno-table-item">Sleeping</div>
			</div>
		</div>
	</div>
</div>
```

### CSS
```css
#table1 {
    height: 80vh; //or whatever you want :)
    width: 50vw;
}
```

### JavaScript
Insert the following script at the end of the `body` tag
```javascript
const config = {
    scrollBarType: 'always',
    widthByColumn: [100, 400, 500, 100, 100, 100],
    stickColumnsLeft: [1],
    stickColumnsRight: [4]
};
var moderno = new TableModerno("table1", config);
```

## Customization
The following CSS variables can be set to make your table fit your theme.

*The CSS variables should be created in the `:root` tag, and should be linked after `table-moderno.css` to override the default values.*

**Default Theme Values**
```css
:root {
    --moderno-background-color: #FFFFFF;
    --moderno-border-color: #434343;

    /* header colors */
    --moderno-header-color: #113537;
    --moderno-header-text-color: #F3F3F3;

    /* body colors */
    --moderno-body-odd-row-color: #FFEAD0;
    --moderno-body-even-row-color: #A8B5B6;
    --moderno-body-odd-row-text-color: #434343;
    --moderno-body-even-row-text-color: #F3F3F3;

    /* fonts */
    --moderno-header-font-family: -apple-system,system-ui,BlinkMacSystemFont,Roboto,"Segoe UI","Helvetica Neue",Arial,sans-serif;
    --moderno-header-font-weight: 500;
    --moderno-header-font-size: 1.1em;

    --moderno-body-font-family: -apple-system,system-ui,BlinkMacSystemFont,Roboto,"Segoe UI","Helvetica Neue",Arial,sans-serif;
    --moderno-body-font-weight: 300;
    --moderno-body-font-size: 1em;

    /* hover colors */
    --moderno-header-hover-color: #96616B;
    --moderno-header-hover-text-color: #F3F3F3;
    --moderno-body-hover-color: #B28C93;
    --moderno-body-hover-text-color: #F3F3F3;

    /* highlight colors */
    --moderno-header-highlight-color: #F889A2;
    --moderno-header-highlight-text-color: #434343;
    --moderno-body-highlight-color: #F996AC;
    --moderno-body-highlight-text-color: #434343;
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

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[GNU GPLv3 ](https://choosealicense.com/licenses/gpl-3.0/)
