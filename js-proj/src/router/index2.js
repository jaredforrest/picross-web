/**
 * @template {{ toString: () => string }} T
 * @param {T} path
 * @returns {string}
 */
function clearSlashes(path) {
  return path.toString().replace(/\/$/, "").replace(/^\//, "");
}

const Router = {
  /** @type {{re: string | RegExp, handler: (...args: unknown[]) => void}[]} */
  routes: [],
  root: "/",
  /**
   * @param {string} [root]
   * @returns {Router}
   */
  config(root) {
    this.root = root ? `/${clearSlashes(root)}/` : "/";
    return this;
  },
  getFragment() {
    let fragment = clearSlashes(decodeURI(location.pathname + location.search));
    fragment = fragment.replace(/\\?(.*)$/, "");
    fragment = this.root != "/" ? fragment.replace(this.root, "") : fragment;
    return clearSlashes(fragment);
  },
  /**
   * @param {RegExp | string} [re]
   * @param {() => void} [handler]
   * @returns {Router}
   */
  add(re, handler) {
    if (typeof re == "function") {
      handler = re;
      re = "";
    }
    this.routes.push({ re, handler });
    return this;
  },
  //remove(param) {
  //    for(let i=0, r; i < this.routes.length, r = this.routes[i]; i++) {
  //        if(r.handler === param || r.re.toString() === param.toString()) {
  //            this.routes.splice(i, 1);
  //            return this;
  //        }
  //    }
  //    return this;
  //},
  //flush() {
  //    this.routes = [];
  //    this.mode = null;
  //    this.root = '/';
  //    return this;
  //},
  /**
   * @param {string} f
   * @returns {Router}
   */
  check(f) {
    const fragment = f || this.getFragment();
    console.log(fragment);
    for (let i = 0; i < this.routes.length; i++) {
      const match = fragment.match(this.routes[i].re);
      if (match) {
        match.shift();
        this.routes[i].handler.apply({}, match);
        return this;
      }
    }
    return this;
  },
  listen() {
    const self = this;
    let current = self.getFragment();
    const fn = function () {
      if (current !== self.getFragment()) {
        current = self.getFragment();
        self.check(current);
      }
    };
    clearInterval(this.interval);
    this.interval = setInterval(fn, 50);
    return this;
  },
  /**
   * @param {string} [path]
   * @returns {Router}
   */
  navigate(path) {
    path = path ? path : "";
    history.pushState(null, "", this.root + clearSlashes(path));
    return this;
  },
};

export function startRouter() {
  // configuration
  Router.config();

  // returning the user to the initial state
  Router.navigate();

  // adding routes
  Router.add(/about/, () => {
    console.log("about");
  })
    .add(/products\/(.*)\/edit\/(.*)/, (args) => {
      console.log("products", ...args);
    })
    .listen();
}
//.add(() => {
//    console.log('default');
//})
//.check('/products/12/edit/22').listen();

// forwarding
//Router.navigate('/about');
