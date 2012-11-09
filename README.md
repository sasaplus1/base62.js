# base62.js

base62 encode/decode library

## Install

### for npm

    $ npm install base62-node

### for bower

    $ bower install base62

## Usage

### for node.js

``` js
var base62 = require('base62-node');

base62.encode(3843);  // 'ZZ'
base62.decode('ZZ');  // 3843
```

### for browser

``` js
Base62.encode(3843);  // 'ZZ'
Base62.decode('ZZ');  // 3843
```

## License

MIT License

## Test

### for node.js

    $ make setup
    $ make test

or

    $ npm install
    $ npm test

### for browser

    $ npm install -g bower
    $ make setup
    $ open ./test/test-base62.html

or

    $ npm install -g bower
    $ bower install 'chai#~1.3' 'jquery#~1.8' 'mocha#~1.6'
    $ open ./test/test-base62.html
