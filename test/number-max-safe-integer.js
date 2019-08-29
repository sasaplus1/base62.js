/*!
 * Number.MAX_SAFE_INTEGER polyfill
 *
 * @see https://mdn.io/MAX_SAFE_INTEGER#Polyfill
 * @see https://developer.mozilla.org/en-US/docs/MDN/About#Copyrights_and_licenses
 */
if (!Number.MAX_SAFE_INTEGER) {
  Number.MAX_SAFE_INTEGER = 9007199254740991; // Math.pow(2, 53) - 1;
}
