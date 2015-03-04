# ng-name-loader

Webpack loader to export angular.js module name

## Usage

```javascript
require('ng-name?file!./file.js');
// adds following code to file.js source:
//  module.exports = 'file';
```

## Example

``` javascript
// foo.js
angular.module('foo', []).controller('Foo', function Foo () {});

// app.js
angular.module('app', [
  require('ng-name?foo!./foo.js')
]);
```

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
