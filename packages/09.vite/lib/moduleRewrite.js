const readBody = require('./body-parser');
const { parse } = require('es-module-lexer');
const moduleRewrite = (root) => {
  return async (ctx, next) => {
    await next();
    if (ctx.body && ctx.response.is('js')) {
      const source = await readBody(ctx.body);
      const [imports] = parse(source);
      if (imports && imports.length) {
        const { n, s, e } = imports[0];
        const rewriteModuleId = `@module/${n}`;
        // koa send ctx.body after execute all middlewares
        ctx.body = source.slice(0, s) + rewriteModuleId + source.slice(e);
      }
    }
  };
};

module.exports = moduleRewrite;
