# base62.js [![Build Status](https://travis-ci.org/sasaplus1/base62.js.png)](https://travis-ci.org/sasaplus1/base62.js)

base62 encode/decode library

## License

MIT License

## Install

### from npm

    $ npm install base62-node

### from bower

    $ bower install base62

## Usage

### for node.js

``` js
var base62 = require('base62-node');
```

### for the browser

``` js
window.Base62;
```

### common

``` js
// use default "09azAZ" table
base62.encode(3843);  // 'ZZ'
base62.decode('ZZ');  // 3843

// change "09AZaz" table
base62.changeTable('09AZaz');
base62.encode(3843);  // 'zz'
base62.decode('zz');  // 3843

// change "09azAZ" table
base62.changeTable('09azAZ');
base62.encode(3843);  // 'ZZ'
base62.decode('ZZ');  // 3843
```

## Test

### for node.js

    $ npm install
    $ npm test

### for the browser

    $ npm install -g bower
    $ make setup
    $ open ./test/test-base62.html

## Functions

### changeTable(tableKey)

* `tableKey` string - table key

change a convert table.
can set values below.

* "09azAZ"
* "09AZaz"

default value is "09azAZ".

throw error if unknown table key.

``` js
base62.changeTable('09AZaz');
base62.changeTable('09azAZ');

base62.changeTable('AZaz09');  // throws error!
```

### decode(str)

* `str` string - base 62 string

convert to decimal number from base 62 string.
return NaN if cannot convert value.

``` js
base62.decode('Z');    //  61
base62.decode('10');   //  62
base62.decode('-10');  // -62

base62.decode(10);     // NaN
```

### encode(num)

* `num` number - number value

convert to base 62 string from decimal number.
return empty string if cannot convert value.

``` js
base62.encode(61);    // "Z"
base62.encode(62);    // "10"
base62.encode(-62);   // "-10"

base62.encode('10');  // ""
```
