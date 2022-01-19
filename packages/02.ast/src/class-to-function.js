const core = require('@babel/core');
const types = require('@babel/types');

const source = `
  class Person {
    constructor (name) {
      this.name = name;
    }
  
    getName () {
      return this.name;
    }
  }
`;

const pluginTransformClasses = {
  visitor: {
    ClassDeclaration (path) {
      const { node } = path;
      const { id } = node;
      const classMethods = node.body.body;
      let FunctionDeclaration, ExpressionStatement;
      classMethods.forEach(method => {
        if (method.kind === 'constructor') {
          FunctionDeclaration = types.functionDeclaration(id, method.params, method.body, method.generator, method.async);
        } else {
          const member = types.memberExpression(id, types.identifier('prototype'));
          const left = types.memberExpression(member, method.key);
          const right = types.functionExpression(null, method.params, method.body, method.generator, method.async);
          const expression = types.assignmentExpression('=', left, right);
          ExpressionStatement = types.expressionStatement(expression);
        }
      });
      path.replaceWithMultiple([FunctionDeclaration, ExpressionStatement]);
    }
  }
};
const { code } = core.transform(source, { plugins: [pluginTransformClasses] });
console.log('code', code);
