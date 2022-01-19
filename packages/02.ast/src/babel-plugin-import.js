module.exports = function (babel) {
  const { types } = babel;
  const plugin = {
    visitor: {
      ImportDeclaration (path, state) {
        const { node } = path;
        const { opts: { libraryName, libraryDirectory } } = state;
        const { specifiers } = node;
        const { value } = node.source;
        if (value === libraryName && !path.isImportDefaultSpecifier()) {
          const importDeclarations = specifiers.map(specifier => {
            const { name } = specifier.local;
            const newSpecifier = types.importDefaultSpecifier(specifier.local);
            const source = types.stringLiteral(`${value}/${libraryDirectory}/${name}`.replace(/\/{2,}/g, '/'));
            return types.importDeclaration([newSpecifier], source);
          });
          path.replaceWithMultiple(importDeclarations);
        }
      }
    }
  };
  return plugin;
};
