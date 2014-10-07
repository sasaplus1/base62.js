/*!
 * @license base62.js Copyright(c) 2012-2014 sasa+1
 * https://github.com/sasaplus1/base62.js
 * Released under the MIT license.
 */
!function(t){var e,e=function(){function t(t){return"number"==typeof t&&isFinite(t)&&9007199254740992>t&&t>-9007199254740992&&t===Math.floor(t)}return{isInteger:t}}(),base62=function(){function t(t){var e;return e=arguments.length<=0?new r:new r(t)}function r(e){if(arguments.length<=0&&(e="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"),"string"!=typeof e)throw new TypeError("table must be a String: "+e);if(62!==e.length)throw new RangeError("table must be 62 chars");this.Base62=r,this.createConverter=t,this.table_=e}return r.prototype.decode=function(t){var e,r,n,o,i;if("string"!=typeof t)throw new TypeError("str must be a String: "+t);if(!/^-?[\dA-Za-z]+$/.test(t))throw new Error("unsupported format: "+t);for(e=this.table_,r="-"===t[0],r&&(t=t.slice(1)),n=0,o=i=t.length;o--;)n+=e.indexOf(t[o])*Math.pow(62,i-o-1);return r&&(n*=-1),n},r.prototype.encode=function(t){var r,n,o;if(!e.isInteger(t))throw new TypeError("num is must be an Integer: "+t);if(0===t)return"0";for(r=this.table_,n=0>t,o="",t=Math.abs(t);t>0;t=Math.floor(t/62))o=r.charAt(t%62)+o;return n&&(o="-"+o),o},t()}();base62.isInteger=function(){return e.isInteger.apply(e,arguments)},"function"==typeof define&&define.amd?define(function(){return base62}):t.base62=base62}(this);