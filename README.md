# floatingSVG

A simple JQuery plugin that makes SVG's float around the screen.

# Installing

### 1) Download or copy and paste the code into a file in your working directory
### 2) Add the link to the js file in your html
```html
<script src="jquery.min.js"></script>
<script src="your/file/path.js"></script>
```
**Note:** Make sure you put the script tag beneath the JQuery library

# Usage

### Attach to an existing element, preferably a div tag
```javascript
$(".test").floatingSVG({});
```
#### Within the parameters of the floatingSVG object you enter JSON data Using the following table (The values in this table are also default):
| Key | Value | Description |
|-----|-------|-------------|
| SVGs | ['path/to/svg/or/image'] | You can add as many paths to the array as you want |
| min_speed | -5 | This is the minimum speed the SVG's will travel |
| max_speed | 5 | This is the maximum speed the SVG's will travel |
| rotation | false | Set to true if you want the SVG's to rotate while moving |
| rotation_min_speed | 0 | The minimum speed the SVG's rotate |
| rotation_max_speed | 0 | The maximum speed the SVG's rotate |
| scaling | false | Set to true if you want the SVG's to scale up and down |
| scale | 0 | The size the SVG's incremement by |
| min_scale | 0 | The minimum scale you want the SVG's to shrink to |
| max_scale | 0 | The maximum scale you wrant the SVG's to grow to |

**Note:** For the min and max speeds and scale, it will choose a random number between.
# Example

### Movement and Scaling
```javascript
$(".test").floatingSVG({
  "SVGs": ["image1.png", "image2.png", "image3.png", "image4.svg", "image5.jpg"],
  "min_speed": -2,
  "max_speed": 4,
  "scaling": true,
  "scale": 0.2,
  "min_scale": 300,
  "max_scale": 700
});
```

### Movement, Scaling and Rotation
```javascript
$(".test").floatingSVG({
  "SVGs": ["image1.png", "image2.png", "image3.png", "image4.svg", "image5.jpg"],
  "min_speed": -2,
  "max_speed": 4,
  "scaling": true,
  "scale": 0.2,
  "min_scale": 300,
  "max_scale": 700
  "rotation": true,
  "rotation_min_speed": -0.5,
  "rotation_max_speed": 0.6
});
```
