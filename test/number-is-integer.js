/*!
 * Number.isInteger polyfill
 *
 * @see https://mdn.io/Number/isInteger#Polyfill
 * @see https://developer.mozilla.org/en-US/docs/MDN/About#Copyrights_and_licenses
 */
Number.isInteger =
  Number.isInteger ||
  function(value) {
    return (
      typeof value === 'number' &&
      isFinite(value) &&
      Math.floor(value) === value
    );
  };
