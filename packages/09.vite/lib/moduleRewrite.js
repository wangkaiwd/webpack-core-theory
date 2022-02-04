const { parse } = require('es-module-lexer');
const { readBody } = require('./utils');
const rewriteImports = (source) => {
  let result = source;
  const [imports] = parse(source);
  if (imports && imports.length) {
    imports.forEach(({ n, s, e }, i) => {
      const prefix = `/@module/`;
      const rewriteModuleId = `${prefix}${n}`;
      result = result.slice(0, s + prefix.length * i) + rewriteModuleId + result.slice(e + prefix.length * i);
    });
  }
  return result;
};
const moduleRewrite = (root) => {
  return async (ctx, next) => {
    await next();
    if (ctx.body && ctx.response.is('js')) {
      const source = await readBody(ctx.body);
      ctx.body = rewriteImports(source);
    }
  };
};

module.exports = moduleRewrite;
