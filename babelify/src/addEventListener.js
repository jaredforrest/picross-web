import globalThis from "./global";

/**
 * @typedef {{ attachEvent: (on: string, fn: (ev: Event) => void) => void }} IEElement
 */

/**
 * @template {keyof ElementEventMap} K
 * @param {K} on
 * @this {Element & IEElement}
 * @param {(this: Element, ev: ElementEventMap[K]) => any} fn
 * @returns
 */
export default function addEvent(on, fn) {
  return this.attachEvent(`on${on}`, (/** @type {Event} */ e) => {
    e = e || globalThis.event;
    e.preventDefault =
      e.preventDefault ||
      function () {
        e.returnValue = false;
      };
    e.stopPropagation =
      e.stopPropagation ||
      function () {
        e.cancelBubble = true;
      };
    fn.call(this, e);
  });
}
