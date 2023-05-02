import type { Constructor } from "./util";

import {
  DEBUG,
  maxSubArray,
  transpose,
  padToMatrix,
  newArray,
  //len,
  throwErr,
} from "./util";
import { NonoGrid } from "./nonoGrid";
import { checkUsername, uploadPuzzle } from "./network";

function createSideNums(
  sideNumsElement: HTMLTableElement,
  sideNumsPadded: number[][],
): void {
  sideNumsElement.textContent = "";
  sideNumsElement.innerText = "";
  sideNumsPadded.forEach((row) => {
    const rowElement = document.createElement("tr");
    row.forEach((num) => {
      const cell = document.createElement("td");
      if (num) {
        const text = document.createTextNode(`${num}`);
        cell.appendChild(text);
      }
      rowElement.appendChild(cell);
    });
    sideNumsElement.appendChild(rowElement);
  });
}

function createSideTopNums(
  sideNums: number[][],
  sideNumsElement: HTMLTableElement,
  topNums: number[][],
  topNumsElement: HTMLTableElement,
  fullPadding: boolean,
): void {
  // Create the sideNums
  const snMax = fullPadding
    ? ((topNums.length + 3) / 2) | 0
    : maxSubArray(sideNums) + 1;
  const sideNumsPadded = padToMatrix(sideNums, snMax);
  createSideNums(sideNumsElement, sideNumsPadded);

  // Create the topNums
  const tnMax = fullPadding
    ? ((sideNums.length + 3) / 2) | 0
    : maxSubArray(topNums) + 1;
  const topNumsPadded = padToMatrix(topNums, tnMax);
  createSideNums(topNumsElement, transpose(topNumsPadded));
}

function gridInit(
  sideNums: number[][],
  topNums: number[][],
  grid: HTMLTableElement,
  sideNumsElement: HTMLTableElement,
  topNumsElement: HTMLTableElement,
  isNew: boolean,
): void {
  // The internal representation of the grid

  // Create the grid cells in the DOM
  const cellDoms: HTMLTableCellElement[] = newArray(
    sideNums.length * topNums.length,
    () => {
      return document.createElement("td");
    },
  );

  const nonoGrid: NonoGrid = new NonoGrid(sideNums, topNums, cellDoms);

  // The cell are added to the page
  sideNums.forEach((_, row) => {
    const rowDom = document.createElement("tr");
    topNums.forEach((_, column) => {
      const cellDom = cellDoms[row * topNums.length + column];
      cellDom.classList.add("empty");
      cellDom.addEventListener("click", () => {
        nonoGrid.toggleCell(row, column);
        if (isNew) {
          const [sideNums, topNums] = nonoGrid.grid_.calculateSideNums();
          createSideTopNums(
            sideNums,
            sideNumsElement,
            topNums,
            topNumsElement,
            true,
          );
        } else if (nonoGrid.checkComplete()) {
          alert("Hooray");
        }
      }, false);
      rowDom.appendChild(cellDom);
    });
    grid.appendChild(rowDom);
  });

  createSideTopNums(sideNums, sideNumsElement, topNums, topNumsElement, isNew);

  // TODO maybe clean this code up a bit
  if (isNew) {
    const submitButton = $safeElementById!("submit-button", HTMLButtonElement);
    const levelNameElement = $safeElementById!("level-name", HTMLInputElement);
    const validPassword = $safeElementById!("error-msg", HTMLElement);

    levelNameElement.addEventListener("keyup", function () {
      void checkUsername(this.value).then((value) => {
        if (value) {
          submitButton.disabled = true;
        } else {
          submitButton.disabled = false;
        }
        validPassword.textContent = value;
        validPassword.innerText = value;
      });
    }, false);

    submitButton.addEventListener("click", () => {
      void uploadPuzzle(
        levelNameElement.value,
        nonoGrid.grid_.calculateSideNums(),
      );
    }, false);
  }
}

export function initLevel(
  sideNums: number[][],
  topNums: number[][],
  isNew = false,
): void {
  const grid = $safeElementById!("nono-grid", HTMLTableElement);
  const sideNumsElement = $safeElementById!("side-nums", HTMLTableElement);
  const topNumsElement = $safeElementById!("top-nums", HTMLTableElement);
  /*let grid: HTMLTableElement;
  if (DEBUG) {
    const tmp = getElementById("nono-grid");
    if (!(tmp instanceof HTMLTableElement)) {
      throwErr("Could not get nono-grid");
    } else {
      grid = tmp;
    }
  } else {
    grid = getElementById("nono-grid") as HTMLTableElement;
  }

  let sideNumsElement: HTMLTableElement;
  if (DEBUG) {
    const tmp = getElementById("side-nums");
    if (!(tmp instanceof HTMLTableElement)) {
      throwErr("Could not get side-nums");
    } else {
      sideNumsElement = tmp;
    }
  } else {
    sideNumsElement = getElementById("side-nums") as HTMLTableElement;
  }

  let topNumsElement: HTMLTableElement;
  if (DEBUG) {
    const tmp = getElementById("top-nums");
    if (!(tmp instanceof HTMLTableElement)) {
      throwErr("Could not get top-nums");
    } else {
      topNumsElement = tmp;
    }
  } else {
    topNumsElement = getElementById("top-nums") as HTMLTableElement;
  }*/

  gridInit(sideNums, topNums, grid, sideNumsElement, topNumsElement, isNew);
}

export function $safeElementById<T extends HTMLElement>(
  name: string,
  filterType: Constructor<T>,
): T {
  if (DEBUG) {
    const tmp = document.getElementById(name);
    if (!(tmp instanceof filterType)) {
      throwErr("Could not get level-name");
    } else {
      return tmp;
    }
  } else {
    return document.getElementById(name) as T;
  }
}
