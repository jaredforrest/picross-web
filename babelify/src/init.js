import arrayPolyfill from "./array";
import fetch_ from "./fetch";
import classListGetter from "./classList";
import classListReplace from "./classListReplace";
import { URL as URL_, checkURLExists } from "./url/url";
import addEvent from "./addEventListener";

import globalThis from "./global";

arrayPolyfill();

if (!globalThis.fetch) {
  globalThis.fetch = fetch_;
}
if (checkURLExists()) {
  globalThis.URL = URL_;
}

if ("document" in globalThis) {
  if (
    !("classList" in document.createElement("_")) ||
    (document.createElementNS &&
      !(
        "classList" in
        document.createElementNS("http://www.w3.org/2000/svg", "g")
      ))
  ) {
    (function () {
      if (Object.defineProperty) {
        const classListProperties = {
          get: classListGetter,
          enumerable: true,
          configurable: true,
        };
        try {
          Object.defineProperty(
            Element.prototype,
            "classList",
            classListProperties,
          );
        } catch (ex) {
          // IE 8 doesn't support enumerable:true
          // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
          // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
          if (ex.number === undefined || ex.number === -0x7ff5ec54) {
            classListProperties.enumerable = false;
            Object.defineProperty(
              Element.prototype,
              "classList",
              classListProperties,
            );
          }
        }
      } else if (Object.prototype.__defineGetter__) {
        Element.prototype.__defineGetter__("classList", classListGetter);
      }
    })();
  }
}

if (globalThis.DOMTokenList && !DOMTokenList.prototype.replace) {
  DOMTokenList.prototype.replace = classListReplace;
}

if (!globalThis.addEventListener && globalThis.Element) {
  Element.prototype.addEventListener = addEvent;
}

if ("Location" in globalThis) {
  if (Object.defineProperty) {
    try {
      Object.defineProperty(Location.prototype, "origin", {
        get() {
          return `${this.protocol}//${this.hostname}${
            this.port ? `:${this.port}` : ""
          }`;
        },
      });
    } catch (e) {
      Object.defineProperty(document.location, "origin", {
        get() {
          return `${this.protocol}//${this.hostname}${
            this.port ? `:${this.port}` : ""
          }`;
        },
      });
    }
  } else if (Object.prototype.__defineGetter__) {
    try {
      Location.prototype.__defineGetter__("origin", function () {
        return `${
          this.protocol
        }//${this.hostname}${this.port ? `:${this.port}` : ""}`;
      });
    } catch (e) {
      window.location.__defineGetter__("origin", function () {
        return `${
          this.protocol
        }//${this.hostname}${this.port ? `:${this.port}` : ""}`;
      });
    }
  }
}

if (!document.documentElement.style.setProperty) {
  document.documentElement.style.setProperty = function () {};
}
