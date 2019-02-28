# Table-Moderno
A simple, powerful, and modern implementation of tables for the web.

## Installation
### Requirements
* [jQuery version 3.x](https://code.jquery.com/)
#### Clone
Clone the repository and import `table-moderno.js` and `table-moderno.css` into your project
### OR
#### CDN

```html
<!-- Always get the latest version -->
<!-- Not recommended for production sites! -->
<script src="https://cdn.jsdelivr.net/gh/an23lm/table-moderno/table-moderno.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/an23lm/table-moderno/table-moderno.css">

<!-- Get minor updates and patch fixes within a major version -->
<script src="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@{major-version-number}/table-moderno.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@{major-version-number}/table-moderno.css">

<!-- Get patch fixes within a minor version -->
<script src="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@{major-version-number}.{minor-version-number}/table-moderno.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@{major-version-number}.{minor-version-number}/table-moderno.css">

<!-- Get a specific version -->
<script src="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@{major-version-number}.{minor-version-number}.{patch-number}/table-moderno.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@{major-version-number}.{minor-version-number}.{patch-number}/table-moderno.css">
```

#### Example
Get version 1 with latest minor version and patch
```HTML
<script src="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@1/table-moderno.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/an23lm/table-moderno@1/table-moderno.css">
```

#### ***Note: It is important to get the same version for both `.js` and `.css`***

## Usage

### Example
Clone the repository and open `example.html` with your favourite browser.

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
Create the table with a unique `id` following the template below
```html
<div class="moderno-table-wrapper" id="table1">
    <div class="moderno-table">
        <div class="moderno-table-header">
            <div class="moderno-table-row">
                <div class="moderno-table-item">ID</div>
                <div class="moderno-table-item">Name</div>
                <div class="moderno-table-item">Email</div>
                <div class="moderno-table-item">ID</div>
                <div class="moderno-table-item">Name</div>
                <div class="moderno-table-item">Email</div>
            </div>
        </div>
        <div class="moderno-table-body">
            <div class="moderno-table-row">
                <div class="moderno-table-item">1</div>
                <div class="moderno-table-item">Anselm</div>
                <div class="moderno-table-item">anselmjosephs@gmail.com</div>
                <div class="moderno-table-item">1</div>
                <div class="moderno-table-item">Anselm</div>
                <div class="moderno-table-item">anselmjosephs@gmail.com</div>
            </div>
        </div>
    </div>
</div>
```

### CSS
```css
#table1 {
    height: {your required height};
    width: {your required width};
}
```

### JavaScript
Insert the following script at the end of the `body` tag
```javascript
const config = {
    scrollBarType: 'always',
    widthByRow: [100, 400, 500, 100, 100, 100],
    stickColumnsLeft: [1],
    stickColumnsRight: [4]
};
var moderno = new TableModerno("table1", config);
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[GNU GPLv3 ](https://choosealicense.com/licenses/gpl-3.0/)
