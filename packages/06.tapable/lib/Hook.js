// this.call = CALL_DELEGATE
// const hook = new SyncHook()
// hook.call() -> this: SyncHook instance
function CALL_DELEGATE (...args) {
  this.call = this._createCall('sync');
  // 1. first execute this.call method will reassign value for this.call
  // 2. subsequent execute this.call method will execute recreate method which first execute created
  return this.call(...args);
}

function CALL_ASYNC_DELEGATE (args) {
  this.callAsync = this._createCall('async');
  return this.callAsync(...args);
}

function PROMISE_DELEGATE (args) {
  this.promise = this._createCall('promise');
  return this.promise(...args);
}

class Hook {
  constructor (args) {
    this.args = args;
    this.taps = [];
    this.call = CALL_DELEGATE;
    this.callAsync = CALL_ASYNC_DELEGATE;
    this.promise = PROMISE_DELEGATE;
    this.interceptors = [];
  }

  compile (options) {
    throw new Error('Abstract: should be overridden');
  }

  tap (options, fn) {
    this._tap('sync', options, fn);
  }

  tapPromise (options, fn) {
    this._tap('promise', options, fn);
  }

  tapAsync (options, fn) {
    this._tap('async', options, fn);
  }

  _tap (type, options, fn) {
    if (typeof options === 'string') {
      options = { name: options };
    }
    options = { type, fn, ...options };
    options = this._runRegisterInterceptor(options);
    this._insert(options);
  }

  _insert (options) {
    this.taps.push(options);
  }

  intercept (interceptor) {
    this.interceptors.push(interceptor);
  }

  _createCall (type) {
    return this.compile({
      type,
      taps: this.taps,
      args: this.args,
      interceptors: this.interceptors
    });
  }

  _runRegisterInterceptor (tapInfo) {
    this.interceptors.forEach(interceptor => {
      if (interceptor.register) {
        tapInfo = interceptor.register(tapInfo);
      }
    });
    return tapInfo;
  }
}

module.exports = Hook;
