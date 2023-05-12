
 /**
  *
  * @param {Object.<string, string>} [options] 
  */
export default function URLSearchParams(options) {
    if(options === undefined){
        options = {}
    }
    /** @type {Object.<string, string>} */
    this.options = options
}

URLSearchParams.prototype.append = function(name, value){
    this.options[name] = value
}

URLSearchParams.prototype.toString = function(){
    let ret = ""
    for(const property in this.options){
        ret += encodeURIComponent(property)
        ret += "="
        ret += encodeURIComponent(this.options[property])
        ret += "&"
    }
    return ret.slice(0,-1)
}
