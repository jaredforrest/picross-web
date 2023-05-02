 /**
  *
  * @param {globalThis} it 
  * @returns {boolean | globalThis}
  */
var check = function (it) {
  return it && it.Math == Math && it;
};

 /** @type {globalThis} */
const globalObj =
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  (function () { return this; })() || this || Function('return this')();

export default globalObj
