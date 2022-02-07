const compilerSfc = require('@vue/compiler-sfc');
const path = require('path');
const fs = require('fs').promises;

function vuePlugin (root) {
  return async (ctx, next) => {
    if (/\.vue$/.test(ctx.path)) {
      const source = await fs.readFile(path.join(root, ctx.path), { encoding: 'utf8' });
      const { parse, compileTemplate } = compilerSfc;
      const { descriptor } = parse(source);
      const render = compileTemplate({
          source: descriptor.template.content,
          id: `data-${descriptor.filename}`,
          filename: descriptor.filename
        }
      );
      ctx.type = 'js';
      let content = descriptor.script.content;
      content = content.replace('export default', 'const script = ');
      ctx.body = `
        ${render.code}
        ${content}
        script.render = render 
        export default script
      `;
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
