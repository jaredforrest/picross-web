import { checkEqual } from "./util";
import { toggle } from "./cell";
import { Grid } from "./grid";

export class NonoGrid {
  /**
   * @param {number[][]} sideNums - the sideNums of the solved puzzle
   * @param {number[][]} topNums - the topNums of the solved puzzle
   * @param {HTMLTableCellElement[]} cellDoms - a list of HTMLElements containing all the cells in the grid
   */
  constructor(sideNums, topNums, cellDoms) {
    /** @readonly */
    this.grid_ = new Grid(topNums.length, sideNums.length);
    /** @readonly */
    this.side_nums = sideNums;
    /** @readonly */
    this.top_nums = topNums;
    // This makes the cells state match the inernal state
    this.cellDoms = cellDoms;
  }
  /**
   * @param {number} row - row to toggle the cell at
   * @param {number} column - column to toggle the cell at
   * @returns {void}
   */
  toggleCell(row, column) {
    const idx = row * this.grid_.width_ + column;
    const newCell = toggle(this.grid_.cells_[idx]);
    this.grid_.cells_[idx] = newCell;
    if (newCell == 0) {
      this.cellDoms[idx].classList.replace("filled", "empty");
    } else {
      this.cellDoms[idx].classList.replace("empty", "filled");
    }
  }
  checkComplete() {
    const [sideNums, topNums] = this.grid_.calculateSideNums();
    return (
      checkEqual(this.side_nums, sideNums) && checkEqual(this.top_nums, topNums)
    );
  }
}
