// 1 means filled, 0 means empty
/** @typedef {0|1} Cell */

/**
 * @param {Cell} cell - cell value to toggle
 * @returns {Cell} - toggled cell value
 */
export function toggle(cell) {
  if (cell == 0 /* Empty */) {
    return 1 /* Filled */;
  } else {
    return 0 /* Empty */;
  }
}
