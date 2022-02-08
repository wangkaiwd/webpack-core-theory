const walk = require('./walk');
const Scope = require('./scope');
const analyse = (ast, code, module) => {
  let scope = new Scope();
  // can implement by stack
  // there take advantage of global variable
  ast.body.forEach(statement => {
    Object.defineProperties(statement, {
      _defines: { value: {} },
      _included: { value: false, writable: true }, // whether occur in bundle or not
      _dependsOn: { value: {} },
      _source: { value: code.slice(statement.start, statement.end) }
    });
    const addToScope = (name) => {
      scope.add(name);
      if (!scope.parent) {
        statement._defines[name] = true;
      }
    };
    walk(ast, {
      enter (node) {
        let newScope = undefined;
        if (node.type === 'FunctionDeclaration') {
          const name = node.id.name;
          const params = node.params.map(param => param.name);
          newScope = new Scope({ name, parent: scope, params });
          addToScope(name);
        }
        if (node.type === 'VariableDeclarator') {
          const name = node.id.name;
          addToScope(name);
        }
        node._scope = scope;
        if (newScope) {
          node._scope = newScope;
          scope = newScope;
        }
      },
      leave (node) {
        if (node.type === 'FunctionDeclaration') {
          if (node.hasOwnProperty('_scope')) { // back parent scope when leave node
            scope = scope.parent;
          }
        }
      }
    });
  });

};

module.exports = analyse;
