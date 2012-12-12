/**
 * @license base62.js Copyright(c) 2012 sasa+1
 * https://github.com/sasaplus1/base62.js
 * Released under the MIT license.
 */

;(function() {

  var TABLES_ = {
    '09azAZ': '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    '09AZaz': '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  };

  // XXX: please call from Function.call with Base62 instance object.
  function changeTable_(tableKeyStr) {
    'use strict';

    var tableKeyStrType = typeof tableKeyStr;

    if (tableKeyStrType !== 'string') {
      throw new TypeError('Parameter "tableKeyStr" must be a string, not ' +
          tableKeyStrType);
    }

    if (TABLES_[tableKeyStr] === void 0) {
      throw new Error(tableKeyStr + ' is unknown table key');
    }

    if (Object.defineProperty) {
      Object.defineProperty(this, 'tableKey_', { value: tableKeyStr });
    } else {
      this.tableKey_ = tableKeyStr;
    }
  }

  function Base62(tableKeyStr) {
    changeTable_.call(
        this, (arguments.length <= 0) ? '09azAZ' : tableKeyStr);
  }

  Base62.prototype.decode = function(str) {
    var strType = typeof str,
        decodedNum, column, len, isNegative, table;

    if (strType !== 'string') {
      throw new TypeError('Parameter "str" must be a string, not ' + strType);
    }

    if (!/^-?[\da-zA-Z]+$/.test(str)) {
      throw new Error('"' + str + '" is unsupported string format');
    }

    isNegative = (str[0] === '-');
    if (isNegative) {
      str = str.slice(1);
    }

    table = TABLES_[this.tableKey_];
    decodedNum = 0;
    column = len = str.length;
    for (; column--;) {
      decodedNum +=
          table.indexOf(str[column]) * Math.pow(62, len - column - 1);
    }

    if (isNegative) {
      decodedNum *= -1;
    }

    return decodedNum;
  };

  Base62.prototype.encode = function(num) {
    var numType = typeof num,
        encodedStr, isNegative, table;

    if (numType !== 'number') {
      throw new TypeError('Parameter "num" must be a number, not ' + numType);
    }

    if (!isFinite(num)) {
      throw new Error(String(num) + ' is not a finite number');
    }

    if (num === 0) {
      return '0';
    }

    isNegative = (num < 0);
    num = Math.abs(num);

    table = TABLES_[this.tableKey_];
    encodedStr = '';
    while (num > 0) {
      encodedStr = table.charAt(num % 62) + encodedStr;
      num = Math.floor(num / 62);
    }

    if (isNegative) {
      encodedStr = '-' + encodedStr;
    }

    return encodedStr;
  };

  // export class
  if (typeof window === 'undefined') {
    module.exports = Base62;
  } else {
    window.Base62 = Base62;
  }

}());
