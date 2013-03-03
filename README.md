# base62.js [![Build Status](https://travis-ci.org/sasaplus1/base62.js.png)](https://travis-ci.org/sasaplus1/base62.js)

base62 encode/decode library

## Installation

### from npm

    $ npm install base62-node

### from bower

    $ bower install base62

## Usage

### for node.js

``` js
var Base62 = require('base62-node');
```

### for the browser

``` js
var Base62 = window.Base62;
```

### basis usage

``` js
var base62 = new Base62;

base62.encode(39134);  // "abc"
base62.decode('abc');  // 39134
```

``` js
var base62 = new Base62('09AZaz');

base62.encode(39134);  // "ABC"
base62.decode('ABC');  // 39134
```

## Functions

### constructor(tableKeyStr)

* `tableKeyStr` string - base62 convert table key

`tableKeyStr` can set values below.

* "09azAZ"
* "09AZaz"

if not parameter, value is "09azAZ".

if parameter is not string types, throws TypeError.

if unknown tableKey, throws Error.

``` js
new Base62;            // use "09azAZ" table
new Base62('09azAZ');  // use "09azAZ" table
new Base62('09AZaz');  // use "09AZaz" table

new Base62(12345678);  // throws TypeError
new Base62('AZaz09');  // throws Error
```

### decode(str)

* `str` string - base62 string

convert to decimal number from base62 string.

if parameter is not string types, throws TypeError.

if unsupported string format, throws Error.
string format should be match for regexp of `^-?[\da-zA-Z]+$`.

``` js
// "09azAZ" table
base62.decode('Z');    //  61
base62.decode('10');   //  62
base62.decode('-10');  // -62

base62.decode(12345);  // throws TypeError
base62.decode('!@=');  // throws Error
```

### encode(num)

* `num` number - number value

convert to base62 string from decimal number.

if parameter is not number types, throws TypeError.

if not a finite number(NaN, Infinity, -Infinity), throws Error.

``` js
// "09azAZ" table
base62.encode(61);    // "Z"
base62.encode(62);    // "10"
base62.encode(-62);   // "-10"

base62.encode('1');  // throws TypeError
base62.encode(NaN);  // throws Error
```

## Test

    $ npm install
    $ npm test

## License

The MIT License. Please see LICENSE file.
