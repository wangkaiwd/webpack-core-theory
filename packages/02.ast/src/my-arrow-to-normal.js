const core = require('@babel/core');
const types = require('@babel/types');

const getScopeInformation = (path) => {
  const thisPaths = [];
  path.traverse({
    ThisExpression (path) {
      thisPaths.push(path);
    }
  });
  return thisPaths;
};
const hoistFunctionEnvironment = (path) => {
  const thisPaths = getScopeInformation(path);
  if (thisPaths.length) {
    const thisEnvNode = path.findParent(p => p.isFunctionExpression() || p.isProgram());
    const thisBinding = '_this';
    const thisIdentifier = types.identifier(thisBinding);
    thisEnvNode.scope.push({
      type: 'VariableDeclaration',
      id: thisIdentifier,
      init: types.thisExpression()
    });
    thisPaths.forEach(p => p.replaceWith(thisIdentifier));
  }
};
const babelPluginTransformES2015ArrowFunctions = {
  visitor: {
    ArrowFunctionExpression (path) {
      const node = path.node;
      node.type = 'FunctionExpression';
      hoistFunctionEnvironment(path);
    }
  }
};

const source = `
  const sum = (a,b) => {
    console.log(this)
    return a + b
  }
`;

const { code } = core.transformSync(source, { plugins: [babelPluginTransformES2015ArrowFunctions] });
console.log('code', code);
