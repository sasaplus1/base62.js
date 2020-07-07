/*!
 * Number.isSafeInteger polyfill
 *
 * @see https://mdn.io/isSafeInteger#Polyfill
 * @see https://developer.mozilla.org/en-US/docs/MDN/About#Copyrights_and_licenses
 */
Number.isSafeInteger =
  Number.isSafeInteger ||
  function (value) {
    return (
      Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER
    );
  };
