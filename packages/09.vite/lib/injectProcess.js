const { readBody } = require('./utils');
const dedent = require('dedent');
const injectProcess = () => {
  const injection = `
    <script>
      window.process = {
        env: {NODE_ENV: 'development'}
      }
    </script>
  `;
  return async (ctx, next) => {
    await next();
    if (ctx.response.is('html')) {
      // fixme: ast can do it ?
      const html = await readBody(ctx.body);
      let headContent = html.match(/<head>(.*)<\/head>/s)[1];
      headContent += injection;
      // todo: optimize html format after replace
      ctx.body = html.replace(/<head>(.*)<\/head>/s, dedent(`
        <head>
          ${headContent}
        </head>
      `));
    }
  };
};
module.exports = injectProcess;
