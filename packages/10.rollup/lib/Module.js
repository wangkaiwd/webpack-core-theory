const { parse } = require('acorn');
const analyse = require('./ast/analyse');

class Module {
  constructor ({ code, path, bundle }) {
    this.code = code;
    this.path = path;
    this.bundle = bundle;
    this.ast = parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
    this.imports = {};
    this.exports = {};
    this.analyse();
  }

  analyse () {
    this.ast.body.forEach(statement => {
      if (statement.type === 'ImportDeclaration') {
        const source = statement.source.value;
        statement.specifiers.forEach(specifier => {
          const importedName = specifier.imported.name;
          const localName = specifier.local.name;
          // import x as y from './xxx' (may be rename)
          // {y: {localName: y, importedName: x, source: './xxx'}}
          this.imports[localName] = { localName, importedName, source };
        });
      }
      if (statement.type === 'ExportNamedDeclaration') {
        const declaration = statement.declaration;
        if (declaration.type === 'VariableDeclaration') {
          const { declarations } = declaration;
          declarations.forEach(variableDeclarator => {
            const localName = variableDeclarator.id.name;
            this.exports[localName] = { localName, exportName: localName, expression: declaration };
          });
        }
      }
    });
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
