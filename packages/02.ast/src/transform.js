const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');
const source = `function ast() { }`;
const ast = esprima.parse(source);

console.log('ast', ast);

const transform = (sourceCode) => {
  const ast = esprima.parse(sourceCode);
  estraverse.traverse(ast, {
    enter (node) {
      if (node.type === 'ArrowFunctionExpression') {
        node.type = 'FunctionExpression';
      }
    },
  });
  const code = escodegen.generate(ast);
  return { code };
};

module.exports = transform;
