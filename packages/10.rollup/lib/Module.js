const { parse } = require('acorn');
const analyse = require('./ast/analyse');

class Module {
  constructor ({ code, path, bundle }) {
    this.code = code;
    this.path = path;
    this.bundle = bundle;
    this.ast = parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
    this.analyse();
  }

  analyse () {
    analyse(this.ast, this.code);
  }

  expandAllStatements () {
    const allStatements = [];
    this.ast.body.forEach(statement => {
      // todo: such as move statement
      allStatements.push(statement);
    });
    return allStatements;
  }
}

module.exports = Module;
