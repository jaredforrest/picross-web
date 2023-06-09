/**
 *
 * @param {globalThis | false} it
 * @returns {false | globalThis}
 */
const check = function (it) {
  return it && it.Math == Math && it;
};

/** @type {globalThis} */
const globalObj =
  check(typeof globalThis == "object" && globalThis) ||
  check(typeof window == "object" && window) ||
  check(typeof self == "object" && self) ||
  (function () {
    return this;
  })() ||
  this ||
  Function("return this")();

export default globalObj;
