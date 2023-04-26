import { Cell } from "./cell";
import { newArray } from "./util";

/*export type Grid = {
  width_: number
  height_: number
  cells_: Cell[]
  calculateSideNums: () => [number[][], number[][]]
}*/

/*type GridConstructor = {
  (width: number, height: number): Grid
  new (width: number, height: number): Grid
}*/

export class Grid {
  readonly width_: number;
  readonly height_: number;
  cells_: Cell[];
  constructor(width: number, height: number) {
    this.width_ = width;
    this.height_ = height;
    this.cells_ = newArray(width * height, () => Cell.Empty);
  }

  calculateSideNums(): [number[][], number[][]] {
    return [
      getSideNums(this.cells_, this.width_, this.height_),
      getTopNums(this.cells_, this.width_, this.height_),
    ];
  }
}

/*export const Grid = (function (this: Grid, width: number, height: number): void {
  this.width_ = width
  this.height_ = height
  this.cells_ = Array<Cell>(width * height).fill(Cell.Empty)
} as GridConstructor);

(Grid.prototype as Grid).calculateSideNums = function (this: Grid): [number[][], number[][]] {
  return [getSideNums(this.cells_, this.width_, this.height_),getTopNums(this.cells_, this.width_, this.height_)]
}*/

function getSideNums(cells: Cell[], width: number, height: number): number[][] {
  return newArray(height, (_, i) =>
    countCellNums(cells.slice(i * width, i * width + width)),
  );
  // return List(height) { i -> this.subList(i * width, i * width + width).countCellNums() }
}

function getTopNums(cells: Cell[], width: number, height: number): number[][] {
  return newArray(width, (_, i) =>
    countCellNums(newArray(height, (_, j) => cells[j * width + i])),
  );
  // return List(width) { i -> List(height) { j -> this[j * width + i]}.countCellNums() }
}

function countCellNums(cells: Cell[]): number[] {
  const ret: number[] = [];
  const final = cells.reduce((acc, curr) => {
    if (curr == Cell.Filled) {
      return acc + 1;
    } else {
      ret.push(acc);
      return 0;
    }
  }, 0);
  ret.push(final);
  return ret.filter((x) => x != 0);
}
/*
    return (this.runningFold(0) { acc, cell ->
        if (cell == CellShade.SHADE) acc + 1
        else 0
    } + 0)
        .zipWithNext { a, b -> if (b == 0) a else 0 }
        .filterNot { it == 0 }
*/
