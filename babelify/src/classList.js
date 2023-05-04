import './array'

/**
 *
 * @this {ClassList}
 * @param {Element} elem
 */
function ClassList(elem) {
  let trimmedClasses = elem.getAttribute("class") || "";
  let classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [];
  //this.classes = classes
  for (let i = 0; i < classes.length; i++) {
    this.push(classes[i]);
  }
  this._updateClassName = function () {
    elem.setAttribute("class", this.toString());
  };
}

ClassList.prototype = [];

var classListGetter = function () {
  return new ClassList(this);
};

ClassList.prototype.contains = function (token) {
  return !!~this.indexOf(token);
};

ClassList.prototype.add = function (token) {
  this.push(token);
  this._updateClassName();
};
ClassList.prototype.remove = function () {
  index = this.indexOf(token);
  while (~index) {
    this.splice(index, 1);
    index = this.indexOf(token);
  }
  this._updateClassName();
};
ClassList.prototype.toggle = function (token, force) {
  var result = this.contains(token);
  var method = result
      ? force !== true && "remove"
      : force !== false && "add";
  if (method) {
    this[method](token);
  }

  if (force === true || force === false) {
    return force;
  } else {
    return !result;
  }
};
ClassList.prototype.replace = function (oldToken, newToken) {
  var index = this.indexOf(oldToken);
  if (~index) {
    this.splice(index, 1, newToken);
    this._updateClassName();
  }
};
ClassList.prototype.toString = function () {
  return this.join(" ");
};

export default classListGetter;
