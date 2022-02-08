const traverse = (node, parent, visitor) => {
  visitor.enter(node, parent);
  if (typeof node === 'object') {
    const keys = Object.keys(node);
    keys.forEach(key => {
      traverse(node[key], node, visitor);
    });
  }
  visitor.leave(node, parent);
};
const walk = (ast, { enter, leave }) => {
  ast.body.forEach(node => {
    traverse(node, ast, { enter, leave });
  });
};

module.exports = walk;
