class HookCodeFactory {
  setup (instance, options) {
    instance._x = options.taps.map(tap => tap.fn);
  }

  create (options) {

  }
}

module.exports = HookCodeFactory;
