/**
 * utility object.
 * it has polyfill functions.
 */
var utility = (function() {

  function isInteger(val) {
    return (typeof val === 'number' && isFinite(val) &&
        val < 9007199254740992 && val > -9007199254740992 &&
        val === Math.floor(val));
  }

  /**
   * export.
   */
  return (
      typeof Mocha !== 'undefined' ||
      typeof process !== 'undefined' && process.env.NODE_ENV === 'test'
  ) ? {
    isInteger: isInteger
  } : {
    isInteger: (!Number.isInteger) ? isInteger : function(val) {
      return Number.isInteger(val);
    }
  };

}());


/**
 * export for node.js.
 * drop this code when generate minified script with UglifyJS.
 */
function export_() {
  module.exports = utility;
}
export_();
