//import promiseFinally from './finally';
//import allSettled from './allSettled';
//import any from './any';

/**
 * @param {(args: void) => void} fn
 */
let _immediateFn = function(fn) {
    setTimeout(fn, 0);
};

 /**
  * @param {unknown} err 
  */
let _unhandledRejectionFn = function (err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

function noop() {}

// Polyfill for Function.prototype.bind
 /**
  * @template T
  * @typedef {T extends (this: infer U, ...args: never) => any ? U : unknown} ThisParameterType
  */
 /**
  * @template T
  * @typedef {unknown extends ThisParameterType<T> ? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T} OmitThisParameter
  */
 /**
  *
  * @template {Function} T
  * @param {T} fn 
  * @param {ThisParameterType<T>} thisArg 
  * @returns OmitThisParameter<T>
  */
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

/**
 * @template T
 *
 * @constructor
 * @param {(resolve: (value: T) => void, reject: (reason?: any) => void) => void} fn
 */

function Promise(fn) {
  //if (typeof fn !== 'function') throw new TypeError('not a function');
  /** @type {number} */
  this._state = 0;
  /** @type {boolean} */
  this._handled = false;
  /** @type {Promise<T>|undefined} */
  this._value = undefined;
  /** @type {Array<Handler<T>>} */
  this._deferreds = [];

  doResolve(fn, this);
}

 /**
  * @template T
  *
  * @param {Promise<T>} self 
  * @param {Handler<T>} deferred 
  * @returns void 
  */
function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  _immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

 /**
  *
  * @template T
  * @param {Promise<T>} self 
  * @param {Promise<T>} newValue 
  * @returns void 
  */
function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

 /**
  *
  * @template T
  * @param {Promise<T>} self 
  * @param {unknown} newValue 
  * @returns void 
  */
function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

 /**
  *
  * @template T
  * @param {Promise<T>} self 
  */
function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    _immediateFn(function() {
      if (!self._handled) {
        _unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

 /**
  *
  * @template T
  *
  * @constructor
  * @param {(value: T) => T} onFulfilled 
  * @param {(reason?: any) => never} onRejected 
  * @param {Promise<T>} promise 
  */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
 /**
  * @template T
  *
  * @param {(resolve: (value: T) => void, reject: (reason?: any) => void) => void} fn
  * @param {Promise<T>} self 
  * @returns {void} 
  */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

 /**
  *
  * @param {(reason?: any) => never} onRejected 
  * @returns {Promise<T>}
  */
Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

 /**
  *
  * @param {(value: T) => T} [onFulfilled]
  * @param {(reason?: any) => never} [onRejected]
  * @returns 
  */
Promise.prototype.then = function(onFulfilled, onRejected) {
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

 /**
  * @template T
  *
  * @param {T | Promise<T>} value 
  * @returns {Promise<T>}
  */
Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

//function isArray(x) {
//  return Boolean(x && typeof x.length !== 'undefined');
//}

/*Promise.prototype['finally'] = promiseFinally;

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.all accepts an array'));
    }

    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.any = any;

Promise.allSettled = allSettled;
*/

/*

Promise.race = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.race accepts an array'));
    }

    for (var i = 0, len = arr.length; i < len; i++) {
      Promise.resolve(arr[i]).then(resolve, reject);
    }
  });
};
*/



export default Promise;
