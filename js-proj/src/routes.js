import { downloadPuzzle } from "./network";
import { Router } from "./router/index";
import { newArray } from "./util";

/** @type {Promise<() => void>} */
export let clean;

export const router = new Router("", {
  "": () => {
    console.log("You are home");
  },
  "/puzzle/add": newPuzzle,
  "/puzzle/:id": openPuzzle,
  "/fakepage": () => {
    console.log(`At fakepage`);
  },
});

/**
 * The function to start a saved level
 * @param {string} id
 */
function openPuzzle(id) {
  const puzzle = import("./puzzle.js");

  clean = downloadPuzzle(id).then((level) =>
    puzzle.then((puzzle) => { console.log(level, level.sideNums, level.topNums);
        return puzzle.init(level.sideNums, level.topNums, false)}),
  );
}

/**
 * The function to start a saved level
 * @this {{width?: string, height?: string}}
 */
function newPuzzle() {
  const puzzle = import("./puzzle.js");

  // @ts-expect-error
  const width = +this.width;
  // @ts-expect-error
  const height = +this.height;

  if (width < 0 || width > 100 || height < 0 || height > 100) {
    throw "Fail";
  }

  const sideNums = newArray(height, () => []);
  const topNums = newArray(width, () => []);

  clean = puzzle.then((puzzle) => puzzle.init(sideNums, topNums, true));
}
