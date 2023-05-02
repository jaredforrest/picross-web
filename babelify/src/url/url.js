import URLSearchParams from "./urlSearchParams";

 /**
  * Create a URL
  * @constructor
  * @param {string | URL} url
  * @param {string | URL | undefined} [base]
  */
export default function URL(url, base) {
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
