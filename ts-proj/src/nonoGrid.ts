//import type { StringNumber } from "./util";

import { checkEqual, DEBUG } from "./util";
import { Cell, toggle } from "./cell";
import { Grid } from "./grid";

export class NonoGrid {
  readonly grid_: Grid;
  readonly side_nums: number[][];
  readonly top_nums: number[][];
  readonly cellDoms: HTMLTableCellElement[];
  constructor(sideNums: number[][], topNums: number[][], cellDoms: HTMLTableCellElement[]) {
    this.grid_ = new Grid(topNums.length, sideNums.length);
    this.side_nums = sideNums;
    this.top_nums = topNums;

    // This keeps makes the cells state match the inernal state
    //this.addHandler(cellDoms);

    // Without proxies
    this.cellDoms = cellDoms
  }

  toggleCell(row: number, column: number): void {
    const idx = row * this.grid_.width_ + column;
    if (DEBUG) {
      if (idx in this.grid_.cells_) {
        const newCell = toggle(this.grid_.cells_[idx])
        this.grid_.cells_[idx] = newCell;

        if (newCell == Cell.Empty) {
          this.cellDoms[idx].classList.replace("filled", "empty");
        } else {
          this.cellDoms[idx].classList.replace("empty", "filled");
        }
      }
    } else {
      const newCell = toggle(this.grid_.cells_[idx]);
      this.grid_.cells_[idx] = newCell;

      if (newCell == Cell.Empty) {
        this.cellDoms[idx].classList.replace("filled", "empty");
      } else {
        this.cellDoms[idx].classList.replace("empty", "filled");
      }
    }
  }

  /*addHandler(cellDoms: HTMLTableCellElement[]): void {
    const handler = {
      set(
        target: Cell[],
        prop: StringNumber,
        value: Cell,
        receiver: unknown,
      ): boolean {
        if (value == Cell.Empty) {
          cellDoms[prop].classList.replace("filled", "empty");
        } else {
          cellDoms[prop].classList.replace("empty", "filled");
        }
        target[prop] = value;
        return Reflect.set(target, prop, value, receiver);
      },
    };

    this.grid_.cells_ = new Proxy(this.grid_.cells_, handler);
  }*/

  checkComplete(): boolean {
    const [sideNums, topNums] = this.grid_.calculateSideNums();
    return (
      checkEqual(this.side_nums, sideNums) && checkEqual(this.top_nums, topNums)
    );
  }
}

/*
export type NonoGrid = {
    grid_: Grid
    side_nums: number[][]
    top_nums: number[][]
    toggleCell: (row: number, column: number) => void
    addHandler: (cellDoms: HTMLTableCellElement[]) => void 
    checkComplete: () => boolean
}

type NonoGridConstructor = {
  (sideNums: number[][], topNums: number[][]): NonoGrid
  new (sideNums: number[][], topNums: number[][]): NonoGrid
}

export const NonoGrid = (function(this: NonoGrid, sideNums: number[][], topNums: number[][]): void {
    this.grid_ = new Grid(topNums.length, sideNums.length);
    this.side_nums = sideNums;
    this.top_nums = topNums;
} as NonoGridConstructor);


(NonoGrid.prototype as NonoGrid).toggleCell = function (this: NonoGrid, row: number, column: number): void {
    const idx = row * this.grid_.width_ + column;
    if (DEBUG) {
      if (idx in this.grid_.cells_) {
        this.grid_.cells_[idx] = toggle(this.grid_.cells_[idx]);
      }
    } else {
      this.grid_.cells_[idx] = toggle(this.grid_.cells_[idx]);
    }
};

(NonoGrid.prototype as NonoGrid).addHandler = function(this: NonoGrid, cellDoms: HTMLTableCellElement[]): void {
    const handler = {
      set(
        target: Cell[],
        prop: string,
        value: Cell,
        receiver: unknown,
      ): boolean {
        if (value == Cell.Empty) {
          cellDoms[+prop].classList.replace("filled", "empty");
        } else {
          cellDoms[+prop].classList.replace("empty", "filled");
        }
        return Reflect.set(target, prop, value, receiver);
      },
    };

    this.grid_.cells_ = new Proxy(this.grid_.cells_, handler);
};

(NonoGrid.prototype as NonoGrid).checkComplete = function(this: NonoGrid): boolean {
    const [sideNums, topNums] = this.grid_.calculateSideNums();
    return (
      checkEqual(this.side_nums, sideNums) && checkEqual(this.top_nums, topNums)
    );
};*/

/*
export function iterOverCells (nono_grid: NonoGrid): [Cell, Point][] {
  const c = nono_grid.grid_.cells_.map(function (cell: Cell, idx: number): [Cell, Point] {
    return [cell, { row: (idx / nono_grid.grid_.width_) | 0, column: idx % nono_grid.grid_.width_ }]
  })
  return c
}

export function drawBg (width: number, height: number, ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = GRID_COLOR
  ctx.fillRect(0, 0, width, height)
}

export function drawCells (nono_grid: NonoGrid, context: CanvasRenderingContext2D): void {
  context.beginPath()

  for (const [cell, ] of iterOverCells(nono_grid)) {
    let color: string
    if (cell == Cell.Empty) {
      color = EMPTY_COLOR
    } else {
      color = FILLED_COLOR
    }
    context.fillStyle = color
  }
  context.stroke()
}
*/
