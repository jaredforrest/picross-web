/** @typedef { import("./cell").Cell } Cell */
import { newArray } from "./util";

export class Grid {
  /**
   * @param {number} width - width of the grid
   * @param {number} height - height of the grid
   */
  constructor(width, height) {
    this.width_ = width;
    this.height_ = height;
    this.cells_ = newArray(
      width * height,
      /** @type {() => Cell} */
      () => 0,
    );
  }
  /** @returns {[number[][], number[][]]} - a tuple containing [sideNums, topNums] */
  calculateSideNums() {
    return [
      getSideNums(this.cells_, this.width_, this.height_),
      getTopNums(this.cells_, this.width_, this.height_),
    ];
  }
}
/**
 * @param {Cell[]} cells - the list of cells to calculate the sideNums from
 * @param {number} width - the width of the grid
 * @param {number} height - the height of the grid
 * @returns {number[][]} - the sideNums for the list of cells
 */
function getSideNums(cells, width, height) {
  return newArray(height, (_, i) =>
    countCellNums(cells.slice(i * width, i * width + width)),
  );
}
/**
 * @param {Cell[]} cells - the list of cells to calculate the topNums from
 * @param {number} width - the width of the grid
 * @param {number} height - the height of the grid
 * @returns {number[][]} - the topNums for the list of cells
 */
function getTopNums(cells, width, height) {
  return newArray(width, (_, i) =>
    countCellNums(newArray(height, (_, j) => cells[j * width + i])),
  );
}
/**
 * @param {Cell[]} cells - the cells to get the cellNums from
 * @returns {number[]} - the caluclated cellNums
 */
function countCellNums(cells) {
  const ret = [];
  const final = cells.reduce((/**@type{number}*/ acc, curr) => {
    if (curr == 1) {
      return acc + 1;
    } else {
      ret.push(acc);
      return 0;
    }
  }, 0);
  ret.push(final);
  return ret.filter((x) => x != 0);
}
