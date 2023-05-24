import "./array";

/**
 *
 * @this {ClassList & string[]}
 * @param {Element} elem
 */
function ClassList(elem) {
  const trimmedClasses = elem.getAttribute("class") || "";
  const classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [];
  //this.classes = classes
  for (let i = 0; i < classes.length; i++) {
    this.push(classes[i]);
  }
  this._updateClassName = function () {
    elem.setAttribute("class", this.toString());
  };
}

/**
 * @type {string[]}
 */
ClassList.prototype = [];

/**
 * @this {ClassList & string[]}
 * @param {string} token
 * @returns {boolean}
 */
ClassList.prototype.contains = function (token) {
  return !!~this.indexOf(token);
};

/**
 * @this {ClassList & string[]}
 * @param {string} token
 */
ClassList.prototype.add = function (token) {
  this.push(token);
  this._updateClassName();
};

/**
 * @this {ClassList & string[]}
 * @param {string} token
 */
ClassList.prototype.remove = function (token) {
  let index = this.indexOf(token);
  while (~index) {
    this.splice(index, 1);
    index = this.indexOf(token);
  }
  this._updateClassName();
};

/**
 * @this {ClassList & string[]}
 * @param {string} token
 * @param {boolean} force
 */
ClassList.prototype.toggle = function (token, force) {
  const result = this.contains(token);
  const method = result ? force !== true && "remove" : force !== false && "add";
  if (method) {
    this[method](token);
  }

  if (force === true || force === false) {
    return force;
  } else {
    return !result;
  }
};

/**
 * @this {ClassList & string[]}
 * @param {string} oldToken
 * @param {string} newToken
 */
ClassList.prototype.replace = function (oldToken, newToken) {
  const index = this.indexOf(oldToken);
  if (~index) {
    this.splice(index, 1, newToken);
    this._updateClassName();
  }
};

/**
 * @this {ClassList & string[]}
 */
ClassList.prototype.toString = function () {
  return this.join(" ");
};

/**
 * @this {Element}
 * @returns {ClassList}
 */
export default function () {
  return new ClassList(this);
}
