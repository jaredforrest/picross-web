import { maxSubArray, transpose, padToMatrix, newArray } from "./util";
import { NonoGrid } from "./nonoGrid";
import { checkUsername, uploadPuzzle } from "./network";
import {setQrCode} from "./qrcode";

/**
 * @param {HTMLTableElement} sideNumsElement - HTMLElement refering to SideNums
 * @param {number[][]} sideNumsPadded - sideNums padded with 0 so they each row/columns is the same width/height
 * @returns {void}
 */
function createSideNums(sideNumsElement, sideNumsPadded) {
  sideNumsElement.innerText = "";
  sideNumsElement.textContent = "";
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
/**
 * @param {number[][]} sideNums - the numbers on the left side of the grid
 * @param {HTMLTableElement} sideNumsElement - the HTMLElement refering to the sideNums
 * @param {number[][]} topNums - the numbers on the top of the grid
 * @param {HTMLTableElement} topNumsElement - the HTMLElement refering to the topNums
 * @param {boolean} fullPadding - true if you want the sideNums/topNums to be fully padded (ie when creating a new puzzle)
 * @returns {void}
 */
function createSideTopNums(
  sideNums,
  sideNumsElement,
  topNums,
  topNumsElement,
  fullPadding,
) {
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
/**
 * @param {number[][]} sideNums - the numbers on the left side of the grid
 * @param {HTMLTableElement} sideNumsElement - the HTMLElement refering to the sideNums
 * @param {number[][]} topNums - the numbers on the top of the grid
 * @param {HTMLTableElement} topNumsElement - the HTMLElement refering to the topNums
 * @param {HTMLTableElement} gridElement - the HTMLElement containing the main grid
 * @param {boolean} isNew - true if creating a new puzzle
 * @returns {void}
 */
function gridInit(
  sideNums,
  sideNumsElement,
  topNums,
  topNumsElement,
  gridElement,
  isNew,
) {
  // The internal representation of the grid
  // Create the grid cells in the DOM
  const cellDoms = newArray(sideNums.length * topNums.length, () =>
    document.createElement("td"),
  );
  const nonoGrid = new NonoGrid(sideNums, topNums, cellDoms);

  // Create the qrCode for the grid
  if(!isNew){
    setQrCode(nonoGrid.toNonFile())
  }

  // The cell are added to the page
  gridElement.innerText = "";
  gridElement.textContent = "";
  sideNums.forEach((_, row) => {
    const rowDom = document.createElement("tr");
    topNums.forEach((_, column) => {
      const cellDom = cellDoms[row * topNums.length + column];
      cellDom.classList.add("empty");
      cellDom.addEventListener(
        "click",
        () => {
          nonoGrid.toggleCell(row, column);
          // TODO This is too computationally intensive
          // need to find a better way without recreating everything
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
        },
        false,
      );
      rowDom.appendChild(cellDom);
    });
    gridElement.appendChild(rowDom);
  });
  createSideTopNums(sideNums, sideNumsElement, topNums, topNumsElement, isNew);
  // TODO maybe clean this code up a bit
  if (isNew) {
    const submitButton = /** @type {HTMLButtonElement} */ (
      document.querySelector("#submit-button")
    );
    const levelNameElement = /** @type {HTMLInputElement} */ (
      document.querySelector("#level-name")
    );
    const validPassword = /** @type {HTMLElement} */ (
      document.querySelector("#error-msg")
    );
    levelNameElement.addEventListener(
      "keyup",
      function () {
        void checkUsername(this.value).then((value) => {
          if (value) {
            submitButton.disabled = true;
          } else {
            submitButton.disabled = false;
          }
          validPassword.textContent = value;
          validPassword.innerText = value;
        });
      },
      false,
    );
    submitButton.addEventListener(
      "click",
      () => {
        void uploadPuzzle(
          levelNameElement.value,
          nonoGrid.grid_.calculateSideNums(),
        );
      },
      false,
    );
  }
}
/**
 * @param {number[][]} sideNums - the numbers on the left side of the grid
 * @param {number[][]} topNums - the numbers on the top of the grid
 * @param {boolean} [isNew] - true if creating a new puzzle
 * @returns {void}
 */
export function initLevel(sideNums, topNums, isNew = false) {
  const root = document.documentElement;
  root.style.setProperty(
    "--cell-size",
    `${Math.max(10, (300 / topNums.length) | 0)}px`,
  );

  const grid = /** @type {HTMLTableElement} */ (
    document.querySelector("#nono-grid")
  );
  const sideNumsElement = /** @type {HTMLTableElement} */ (
    document.querySelector("#side-nums")
  );
  const topNumsElement = /** @type {HTMLTableElement} */ (
    document.querySelector("#top-nums")
  );
  gridInit(sideNums, sideNumsElement, topNums, topNumsElement, grid, isNew);
}
