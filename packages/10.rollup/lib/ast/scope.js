class Scope {
  constructor (options) {
    this.name = options.name;
    this.parent = options.parent; // Scope instance
    this.names = options.params || [];
  }

  add (name) {
    this.names.push(name);
  }

  findDefineScope (name) {
    // find own scope
    if (this.names.includes(name)) {
      return this;
    }
    // find parent scope
    if (this.parent) {
      return this.parent.findDefineScope(name);
    }
  }
}

module.exports = Scope;
