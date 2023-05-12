import URLSearchParams from "./urlSearchParams";

 /**
  * Create a URL
  * @constructor
  * @param {string | URL} url
  * @param {string | URL | undefined} [base]
  */
export function URL(url, base) {
    /** @type {string} */
    this.core = ""

    if(base !== undefined){
        this.core += base;
    }
    this.core += url;
    this.searchParams = new URLSearchParams()
}

URL.prototype.toString = function() {
    if ("" + this.searchParams){
        return this.core + "?" + this.searchParams
    } else {
        return this.core
    }
};

/** 
 * Checks if URL exists
 * @returns {boolean}
 */
export function checkURLExists(){
  try {
    let u = new URL("http://a");
    return true
  } catch {
    return false;
  }
}
