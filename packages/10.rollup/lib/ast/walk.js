const traverse = (node, parent, visitor) => {
  if (typeof node === 'object' && node != null) {
    if (visitor.enter) {
      visitor.enter(node, parent);
    }
    const keys = Object.keys(node);
    keys.forEach(key => {
      if (!key.startsWith('_')) {
        traverse(node[key], node, visitor);
      }
    });
    if (visitor.leave && node) {
      visitor.leave(node, parent);
    }
  }
};
const walk = (ast, { enter, leave }) => {
  ast.body.forEach(node => {
    traverse(node, ast, { enter, leave });
  });
};

module.exports = {
  walk,
  traverse
};
