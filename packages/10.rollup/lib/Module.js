const { parse } = require('acorn');
const analyse = require('./ast/analyse');
const path = require('path');

class Module {
  constructor ({ code, path, bundle }) {
    this.code = code;
    this.path = path;
    this.bundle = bundle;
    this.ast = parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
    this.imports = {};
    this.exports = {};
    this.definitions = {};
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
    // 1. generate scope chain
    // 2. collect outside variables
    analyse(this.ast, this.code);
    this.ast.body.forEach(statement => {
      Object.keys(statement._defines).forEach(defineKey => {
        this.definitions[defineKey] = statement;
      });
    });
  }

  expandAllStatements () {
    const allStatements = [];
    this.ast.body.forEach(statement => {
      // no need import statement
      if (statement.type === 'ImportDeclaration') {
        return;
      }
      const statements = this.expandStatement(statement);
      allStatements.push(...statements);
    });
    return allStatements;
  }

  expandStatement (statement) {
    const result = [];
    statement._included = true;
    const dependencies = Object.keys(statement._dependsOn);
    dependencies.forEach(name => {
      const definitions = this.define(name);
      result.push(...definitions);
    });
    result.push(statement);
    return result;
  }

  define (name) {
    if (this.imports.hasOwnProperty(name)) { // outside dependency
      const { localName, importedName, source } = this.imports[name];
      const importedModule = this.bundle.fetchModule(path.resolve(path.dirname(this.path), source));
      const { localName: exportLocalName, exportName, expression } = importedModule.exports[importedName];
      return importedModule.define(exportLocalName);
    } else {
      const statement = this.definitions[name];
      if (statement && !statement._included) {
        return this.expandStatement(statement);
      } else {
        return [];
      }
    }
  }
}

module.exports = Module;
