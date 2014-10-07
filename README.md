# base62.js

[![Build Status](https://travis-ci.org/sasaplus1/base62.js.svg)](https://travis-ci.org/sasaplus1/base62.js)
[![Dependency Status](https://gemnasium.com/sasaplus1/base62.js.svg)](https://gemnasium.com/sasaplus1/base62.js)
[![NPM version](https://badge.fury.io/js/base62.js.svg)](http://badge.fury.io/js/base62.js)
[![Bower version](https://badge.fury.io/bo/base62.svg)](http://badge.fury.io/bo/base62)

base62 encode/decode library

## Installation

### npm

```sh
$ npm install base62.js
```

### bower

```sh
$ bower install base62
```

## Usage

### node.js

```js
var base62 = require('base62.js');
```

### browser

```html
<script src="base62.min.js"></script>
```

### Basics

```js
base62.encode(39134);  // "abc"
base62.decode('abc');  // 39134
```

if you want use another table:

```js
var b62 = base62.createConverter(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
// or
// var b62 = new base62.Base62(
//     '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');

b62.encode(39134);  // "ABC"
b62.decode('ABC');  // 39134
```

## Functions

### createConverter([table])

* `table`
  * `String` - base62 table string
* `return`
  * `Base62` - Base62 instance

return Base62 instance.

### Base62([table])

* `table`
  * `String` - base62 table string

constructor of Base62 class.

use default base62 table if parameter is empty. default table is `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`.

throw TypeError if table is not a String.

throw RangeError if table length is not equal 62.

### Base62#decode(str)

* `str`
  * `String` - base62 string
* `return`
  * `Number` - decoded number

decode to integer from base62 string.

throw TypeError if str is not a String.

throw Error if str is unsupported format. str must match to `/^-?[\dA-Za-z]+$/`.

### Base62#encode(num)

* `num`
  * `Number` - integer
* `return`
  * `String` - encoded string

encode to base62 string from integer.

throw TypeError if num is not an integer. (ex: `NaN`, `Infinity`, `-Infinity` and floating-point number)

## Test

### node.js

```sh
$ npm install
$ npm test
```

### browser

```sh
$ npm install
$ npm run bower
$ npm run testem
```

## License

The MIT license. Please see LICENSE file.
