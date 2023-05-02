/*DOMTokenList.prototype.replace = function(oldToken, newToken) {
    if (this.contains(oldToken)){
        this.remove(oldToken)
        this.add(newToken)
        return true
    }
    return false
}*/

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.2.20171210
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

const _arrIndexOf = function (searchElement) {
  for (let i = 0; i < this.length; i++) {
    if (i in this && this[i] === searchElement) {
      return i;
    }
  }
  return -1;
};
Array.prototype.indexOf = Array.prototype.indexOf || _arrIndexOf;

import globalThis from "./global";
//import addProperty from './ieAddProperty'
import { docHijack } from "./docHijack";

if ("document" in globalThis) {
  // Full polyfill for browsers with no classList support
  // Including IE < Edge missing SVGElement.classList
  if (
    !("classList" in document.createElement("_")) ||
    (document.createElementNS &&
      !(
        "classList" in
        document.createElementNS("http://www.w3.org/2000/svg", "g")
      ))
  ) {
    (function () {

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


      if (Object.defineProperty) {
        var classListProperties = {
          get: classListGetter,
          enumerable: true,
          configurable: true,
        };
        try {
          Object.defineProperty(Element.prototype, "classList", classListProperties);
        } catch (ex) {
          // IE 8 doesn't support enumerable:true
          // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
          // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
          if (ex.number === undefined || ex.number === -0x7ff5ec54) {
            classListProperties.enumerable = false;
            Object.defineProperty(
              Element.prototype,
              "classList",
              classListProperties
            );
          }
        }
      } else if (Object.prototype.__defineGetter__) {
        Element.prototype.__defineGetter__("classList", classListGetter);
      }
    })();
  }

  // There is full or partial native classList support, so just check if we need
  // to normalize the add/remove and toggle APIs.

  (function () {
    // replace() polyfill
    if (!("replace" in document.createElement("_").classList)) {
      DOMTokenList.prototype.replace = function (oldToken, newToken) {
        if (this.contains(oldToken)) {
          this.remove(oldToken);
          this.add(newToken);
          return true;
        }
        return false;
      };
    }
  })();
}
