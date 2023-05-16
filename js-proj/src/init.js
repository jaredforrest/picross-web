import { initLevel } from "./main";
/**
 * @typedef {object} CustomWindowObject
 * @property {unknown} [init] - adding functions to window
 */

/**
 * @typedef {Window & CustomWindowObject} CustomWindow
 */

/** @type {CustomWindow} */ (window).init = initLevel;
