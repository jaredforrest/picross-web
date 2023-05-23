/**
 * Find the length of the longest list in a list of lists
 * @template T
 * @param {T[][]} arr - the list of lists
 * @returns {number} - the length
 */
export function maxSubArray(arr) {
  return Math.max(...arr.map((x) => x.length));
}
/**
 * Takes and m x n list of lists and returns an transposed n x m list of lists
 * @template T
 * @param {T[][]} matrix - the original list
 * @returns {T[][]} - the transposed list
 */
export function transpose(matrix) {
  return matrix[0].map((_, i) => matrix.map((row) => row[i]));
}
/**
 * Adds padding of 0 to the start of each list in input
 * @param {number[][]} input - the list of list to pad
 * @param {number} padding - the maximum padding to add
 * @returns {number[][]} - the padded list of list
 */
export function padToMatrix(input, padding) {
  return input.map((x) => newArray(padding - x.length, () => 0).concat(x));
}
/**
 * Checks if two lists are equal
 * @template T
 * @param {T[]} array1 - first list
 * @param {T[]} array2 - second list
 * @returns {boolean} - if they are the same
 */
export function checkEqual(array1, array2) {
  if (array1.length != array2.length) return false;
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] instanceof Array) {
      // array1 has same type as array2
      if (
        !checkEqual(
          /**@type{unknown[]}*/ (array1[i]),
          /**@type{unknown[]}*/ (array2[i]),
        )
      )
        return false;
    } else if (array1[i] != array2[i]) {
      return false;
    }
  }
  return true;
}
/**
 * A helper function to create a new Array with a map function
 * @template T
 * @param {number} length - the length of the Array
 * @param {(v: unknown, index: number) => T} mapFn - each element will be initialized with this using its index
 * @returns {T[]} - the new Array
 */
export function newArray(length, mapFn) {
  return Array.from({ length }, mapFn);
}
/**
 * A function to throw an error
 * @param {string | undefined} message -
 * @param {ErrorOptions | undefined} options -
 * @returns {never} -
 */
export function throwErr(message, options) {
  throw Error(message, options);
}

/** The current webpage */
export const origin = new URL(document.location.origin);
