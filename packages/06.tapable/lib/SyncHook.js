const { Hook } = require('./Hook');
const HookCodeFactory = require('./HookCodeFactory');

class SyncHookCodeFactory extends HookCodeFactory {
  content () {

  }
}

const factory = new SyncHookCodeFactory();

class SyncHook extends Hook {
  constructor (args) {
    super(args); // calls parent constructor
  }

  compile (options) {
    factory.setup(this, options);
    return factory.create(options);
  }
}

module.exports = SyncHook;
