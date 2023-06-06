/**
 * @typedef {(...args: string[]) => void} RouterCallback
 */

const namedParam = /:\w+/g;

/**
 * @param {string} route
 * @returns {string}
 */
function prepareRoute(route) {
  return route.replace(namedParam, "([^/]+)");
}

export class Router {
  /**
   * Do not use a trailing slash
   * @param {string} [base]
   * @param {{[k: string]: RouterCallback}} [routes]
   */
  constructor(base = "", routes = {}) {
    /** @type {Map<RegExp, RouterCallback>} */
    this.routes = new Map();
    for (const route in routes) {
      const newRoute = RegExp(`^${base}${prepareRoute(route)}$`);
      this.routes.set(newRoute, routes[route]);
    }
  }

  /**
   * @param {string} path
   * @param {{[k: string]: string}} params
   */
  dispatchRoute(path, params) {
    for (const [root, callback] of this.routes.entries()) {
      const matchFound = path.match(root);
      if (matchFound) {
        const [, ...args] = matchFound;
        callback.call(params, ...args);
        return;
      }
    }
  }
}
