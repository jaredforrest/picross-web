 /**
  *
  * @template T
  * @param {(value: T, index: number, array: T[]) => void} callbackFn 
  * @returns {void}
  */
Array.prototype.forEach = function(callbackFn) {
    for(let i = 0; i < this.length; i++){
        callbackFn(this[i], i, this)
    }
};

 /**
  *
  * @template T, U
  * @param {ArrayLike<T>} arrayLike 
  * @param {(v: T, k: number) => U} mapFn 
  * @returns {U[]}
  */
Array.from = function(arrayLike, mapFn) {
    const ret = []
    for(let i = 0; i < arrayLike.length; i++){
        ret.push(mapFn(arrayLike[i],i))
    }
    return ret
};

 /**
  *
  * @template T, U
  * @param {(t: T) => U} callbackFn 
  * @returns {U[]}
  */
Array.prototype.map = function(callbackFn) {
    return Array.from(this, callbackFn)
}

 /**
  *
  * @template T, U
  * @param {(accumulator: U, currentValue: T) => U} callbackFn 
  * @param {U} initialValue 
  * @returns {U}
  */
Array.prototype.reduce = function(callbackFn, initialValue) {
    let acc = (initialValue === undefined) ? this[0] : initialValue;
    const start = (initialValue === undefined) ? 1 : 0
    for (let i = start; i < this.length; i++) {
        acc = callbackFn(acc, this[i])
    }
    return acc;
}

 /**
  *
  * @template T
  * @param {(currentValue: T) => boolean} callbackFn 
  * @returns {T[]}
  */
Array.prototype.filter = function(callbackFn) {
    const ret = []
    for(let i = 0; i < this.length; i++){
        if(callbackFn(this[i])){
            ret.push(this[i]);
        }
    }
    return ret;
}
