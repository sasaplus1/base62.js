/**
 * dependency object.
 */
var utility;


/**
 * Base62 encode/decode object.
 */
var base62 = (function() {

  /**
   * require for node.js.
   * drop this code when generate minified script with UglifyJS.
   */
  function require_() {
    utility = require('./utility');
  }
  require_();

  /**
   * create Base62 instance.
   *
   * @param {String} table table string.
   * @return {Base62} Base62 instance.
   */
  function createConverter(table) {
    var instance;

    if (arguments.length <= 0) {
      instance = new Base62;
    } else {
      instance = new Base62(table);
    }

    return instance;
  }

  /**
   * Base62 encode/decode class.
   *
   * @constructor
   * @param {String} table table string.
   * @throws {TypeError} table is not a String.
   * @throws {RangeError} table is not 62 length.
   */
  function Base62(table) {
    if (arguments.length <= 0) {
      table = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }

    if (typeof table !== 'string') {
      throw new TypeError('table must be a String: ' + table);
    }
    if (table.length !== 62) {
      throw new RangeError('table must be 62 chars');
    }

    this.Base62 = Base62;
    this.createConverter = createConverter;

    this.table_ = table;
  }

  /**
   * decode to decimal number from base62 string.
   *
   * @param {String} str base62 string.
   * @throws {TypeError} str is not a String.
   * @throws {Error} str is unsupported format.
   * @return {Number} decoded number.
   */
  Base62.prototype.decode = function(str) {
    var table, isNegative, num, i, len;

    if (typeof str !== 'string') {
      throw new TypeError('str must be a String: ' + str);
    }
    if (!/^-?[\dA-Za-z]+$/.test(str)) {
      throw new Error('unsupported format: ' + str);
    }

    table = this.table_;

    // remove minus if negative number
    isNegative = (str[0] === '-');
    isNegative && (str = str.slice(1));

    // convert
    for (num = 0, i = len = str.length; i--;) {
      num += table.indexOf(str[i]) * Math.pow(62, len - i - 1);
    }

    // convert to negative number if source is negative number
    isNegative && (num *= -1);

    return num;
  };

  /**
   * encode to base62 string from number.
   *
   * @param {Number} num integer.
   * @throws {TypeError} num is not an Integer.
   * @return {String} encoded string.
   */
  Base62.prototype.encode = function(num) {
    var table, isNegative, str;

    if (!utility.isInteger(num)) {
      throw new TypeError('num is must be an Integer: ' + num);
    }

    if (num === 0) {
      return '0';
    }

    table = this.table_;

    isNegative = (num < 0);

    // convert
    for (str = '', num = Math.abs(num); num > 0; num = Math.floor(num / 62)) {
      str = table.charAt(num % 62) + str;
    }

    // convert to negative number if source is negative number
    isNegative && (str = '-' + str);

    return str;
  };

  return createConverter();

}());


/**
 * export for node.js.
 * drop this code when generate minified script with UglifyJS.
 */
function export_() {
  module.exports = base62;
}
export_();
