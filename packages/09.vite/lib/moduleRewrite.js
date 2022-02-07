const { parse } = require('es-module-lexer');
const { readBody, isBrowserSupportPath } = require('./utils');
const rewriteImports = (source) => {
  let result = source;
  // console.log('source----', source);
  const [imports] = parse(source);
  if (imports && imports.length) {
    let j = 0;
    imports.forEach(({ n, s, e }, i) => {
      if (!isBrowserSupportPath(n)) {
        const prefix = `/@module/`;
        const rewriteModuleId = `${prefix}${n}`;
        result = result.slice(0, s + prefix.length * j) + rewriteModuleId + result.slice(e + prefix.length * j);
        j++;
      }
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
