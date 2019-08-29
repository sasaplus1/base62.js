# base62.js

[![test](https://github.com/sasaplus1/base62.js/workflows/test/badge.svg)](https://github.com/sasaplus1/base62.js)
[![npm version](https://badge.fury.io/js/base62.js.svg)](https://badge.fury.io/js/base62.js)
[![Try base62.js on RunKit](https://badge.runkitcdn.com/base62.js.svg)](https://npm.runkit.com/base62.js)
[![renovate](https://badges.renovateapi.com/github/sasaplus1/base62.js)](https://renovatebot.com)

base62 encode/decode library

## Installation

### npm

```console
$ npm install base62.js
```

### yarn

```console
$ yarn add base62.js
```

## Usage

### node.js

```js
const base62 = require('base62.js');
```

### browser

```html
<script src="base62.min.js"></script>
```

if use in Internet Explorer, base62.js needs `Number.isSafeInteger` polyfill:

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=Number.isSafeInteger"></script>
<script src="base62.min.js"></script>
```

### Example

```js
base62.encode(39134); // "abc"
base62.decode('abc'); // 39134

const originalTable = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

base62.encode(39134, originalTable); // "ABC"
base62.decode('ABC', originalTable); // 39134
```

## Functions

see [documents](https://sasaplus1.github.io/base62.js)

## License

The MIT license.
