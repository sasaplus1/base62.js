/**
 * export for the browser.
 * export helper functions if test env.
 */
if (typeof Mocha !== 'undefined') {
  base62.isInteger = function() {
    return utility.isInteger.apply(utility, arguments);
  };
}


/**
 * export base62.
 *
 * export as amd module if define() implemented.
 * otherwise export in global.
 */
if (typeof define === 'function' && !!define.amd) {
  define(function() {
    return base62;
  });
} else {
  global.base62 = base62;
}
