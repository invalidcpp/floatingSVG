# floatingSVG

A simple JQuery plugin that makes SVG's float around the screen.

# Installing

### 1) Download or copy and paste the code into a file in your working directory
### 2) Add the link to the js file in your html
```html
<script src="jquery.min.js"></script>
<script src="your/file/path.js"></script>
```
#### Note: Make sure you put the script tag beneath the JQuery library

# Usage

### 1) Attach to an existing element, preferably a div tag
```javascript
$(".test").floatingSVG({});
```
#### Within the parameters of the floatingSVG object you enter JSON data Using the following table:
| Key | Value |
|-----|-------|
| SVGs | ['path/to/svg/or/image'] |
