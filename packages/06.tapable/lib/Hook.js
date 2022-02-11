// this.call = CALL_DELEGATE
// const hook = new SyncHook()
// hook.call() -> this: SyncHook instance
function CALL_DELEGATE (...args) {
  this.call = this._createCall('sync');
  // 1. first execute this.call method will reassign value for this.call
  // 2. subsequent execute this.call method will execute recreate method which first execute created
  return this.call(...args);
}

class Hook {
  constructor (args) {
    this.args = args;
    this.taps = [];
    this.call = CALL_DELEGATE;
  }

  compile (options) {
    throw new Error('Abstract: should be overridden');
  }

  tap (options, fn) {
    this._tap('sync', options, fn);
  }

  _tap (type, options, fn) {
    if (typeof options === 'string') {
      options = { name: options };
    }
    options = { type, fn, ...options };
    this._insert(options);
  }

  _insert (options) {
    this.taps.push(options);
  }

  _createCall (type) {
    return this.compile({
      type,
      taps: this.taps,
      args: this.args
    });
  }
}

module.exports = Hook;
