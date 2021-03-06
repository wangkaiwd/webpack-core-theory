const { resolveVue } = require('./utils');
const fs = require('fs').promises;
const moduleRegexp = /^\/@module\//;

const moduleResolve = (root) => {
  return async (ctx, next) => {
    if (!moduleRegexp.test(ctx.path)) {
      return await next();
    }
    const id = ctx.path.replace(moduleRegexp, '');
    ctx.type = 'js';
    const resolvedVueMap = resolveVue();
    ctx.body = await fs.readFile(resolvedVueMap[id]);
  };
};
module.exports = moduleResolve;
