/*!
 * base62.js Copyright(c) 2012-2014 sasa+1
 * https://github.com/sasaplus1/base62.js
 * Released under the MIT license.
 */


var base62 = require('./lib/base62'),
    utility = require('./lib/utility');


/**
 * export.
 */
if (process.env.NODE_ENV === 'test') {
  base62.isInteger = function() {
    return utility.isInteger.apply(utility, arguments);
  };
}

module.exports = base62;
