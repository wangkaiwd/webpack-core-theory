const compilerSfc = require('@vue/compiler-sfc');
const path = require('path');
const fs = require('fs').promises;

function vuePlugin (root) {
  return async (ctx, next) => {
    if (/\.vue$/.test(ctx.path)) {
      const source = await fs.readFile(path.join(root, ctx.path), { encoding: 'utf8' });
      const { descriptor } = compilerSfc.parse(source);
      ctx.type = 'js';
      ctx.body = descriptor.script.content;
    } else {
      await next();
    }
  };
}

// fs.readFile(path.resolve(__dirname, '../src/App.vue')).then((data) => {
//   const source = data.toString();
//   const { descriptor } = compilerSfc.parse(source);
// });

module.exports = vuePlugin;
