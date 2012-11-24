/**
 * @license base62.js Copyright(c) 2012 sasa+1
 * Released under the MIT license
 * http://github.com/sasaplus1/base62.js/blob/master/LICENSE
 */
;(function(){

  var Base62 = (function(){

    var TABLES_ = {
      '09azAZ': '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      '09AZaz': '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    }, tableKey_ = '09azAZ';

    /**
     * 変換に使用するテーブルを切り替えます。
     * @param {string} tableKey テーブルのキー
     * @throws {Error} 存在しないキーが指定された場合
     */
    function changeTable_(tableKey) {
      if (typeof tableKey !== 'string' || TABLES_[tableKey] === void 0) {
        tableKey_ = '';
        throw new Error('unknown table key');
      }
      tableKey_ = tableKey;
    }

    /**
     * 62進数を10進数に変換します。
     * @param {string} str 62進数の文字列
     * @return {number} 10進数に変換された数値
     */
    function decode_(str) {
      var decodedNum = 0,
          column, len, isNegative, table;

      if (typeof str !== 'string' || !/^-?[\da-zA-Z]+$/.test(str)) {
        return NaN;
      }

      isNegative = (str[0] === '-');
      if (isNegative) {
        str = str.slice(1);
      }

      table = getTable_();
      column = len = str.length;
      for (; column--;) {
        decodedNum +=
          table.indexOf(str[column]) * Math.pow(62, len - column - 1);
      }

      if (isNegative) {
        decodedNum *= -1;
      }

      return decodedNum;
    }

    /**
     * 10進数を62進数に変換します。
     * @param {number} num 10進数の数値
     * @return {string} 62進数に変換された文字列
     */
    function encode_(num) {
      var encodedStr, isNegative, table;

      if (typeof num !== 'number' || !isFinite(num)) {
        return '';
      }

      if (num === 0) {
        return '0';
      }

      isNegative = (num < 0);
      num = Math.abs(num);

      table = getTable_();
      encodedStr = '';
      while (num > 0) {
        encodedStr = table.charAt(num % 62) + encodedStr;
        num = Math.floor(num / 62);
      }

      if (isNegative) {
        encodedStr = '-' + encodedStr;
      }

      return encodedStr;
    }

    /**
     * 現在設定されている変換テーブルを返します。
     * @return {string} 変換テーブル
     */
    function getTable_() {
      return TABLES_[tableKey_];
    }

    return {
      changeTable: changeTable_,
      decode: decode_,
      encode: encode_
    };

  }());

  if (typeof window === 'undefined') {
    module.exports = Base62;
  } else {
    window.Base62 = Base62;
  }

}());
