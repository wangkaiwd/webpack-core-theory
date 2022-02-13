class HookMap {
  constructor (factory) {
    this._factory = factory;
    this._map = new Map();
  }

  for (key) {
    const hook = this.get(key);
    if (hook) {return hook;}
    const newHook = this._factory(key);
    this._map.set(key, newHook);
    return newHook;
  }

  get (key) {
    return this._map.get(key);
  }
}

module.exports = HookMap;
