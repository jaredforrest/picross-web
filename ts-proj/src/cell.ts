/*export type Point = {
  row: number
  column: number
}
*/

// Less verbose but less precise
// export type Point = [row: number, column: number];

export const enum Cell {
  Empty = 0,
  Filled = 1,
}

export function toggle(cell: Cell): Cell {
  if (cell == Cell.Empty) {
    return Cell.Filled;
  } else {
    return Cell.Empty;
  }
}
