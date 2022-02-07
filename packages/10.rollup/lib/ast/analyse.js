const analyse = (ast, code, module) => {
  ast.body.forEach(statement => {
    Object.defineProperty(statement, '_source', {
      value: code.slice(statement.start, statement.end)
    });
  });
};

module.exports = analyse;
