const { readBody } = require('./utils');
const dedent = require('dedent');
const injectProcess = () => {
  const injection = dedent`
    <script>
      window.process = {
        env: {NODE_ENV: 'development'}
      }
    </script>
  `;
  return async (ctx, next) => {
    await next();
    if (ctx.response.is('html')) {
      const html = await readBody(ctx.body);
      let headContent = html.match(/<head>(.*)<\/head>/s)[1];
      headContent += injection;
      ctx.body = html.replace(/<head>(.*)<\/head>/s, dedent`<head>${headContent}</head>`);
    }
  };
};
module.exports = injectProcess;
