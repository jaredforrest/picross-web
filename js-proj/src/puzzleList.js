/**
 * @param innerContainerElement {HTMLElement}
 * @param puzzleList {{id: number, name: string, author: string, width: number, height: number}[]}
 */
function puzzleListInit(innerContainerElement, puzzleList) {
  for (const puzzle of puzzleList) {
    const text = `name: ${puzzle.name}, author: ${puzzle.author}, width: ${puzzle.width}, height: ${puzzle.height}`;
    const url = `../puzzle/${puzzle.id}`;

    const element = /** @type {DocumentFragment} */ (
      /** @type {HTMLTemplateElement} */ (
        document.querySelector("#element-template")
      ).content.cloneNode(true)
    );

    const elementLink = /** @type {HTMLAnchorElement} */ (
      element.querySelector("a")
    );
    const elementText = /** @type {HTMLElement} */ (
      element.querySelector("div")
    );

    elementLink.href = url;
    elementText.innerText = text;

    innerContainerElement.appendChild(element);
  }
}

/**
 * @param puzzleList {{id: number, name: string, author: string, width: number, height: number}[]}
 * @returns {() => void}
 */
export function init(puzzleList) {
  const innerContainerElement = /** @type {HTMLElement} */ (
    document.querySelector("#inner-container")
  );

  puzzleListInit(innerContainerElement, puzzleList);

  return () => {
    innerContainerElement.innerHTML = "";
  };
}
