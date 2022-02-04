const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const moduleRewrite = require('./moduleRewrite');
const PORT = 3000;
const root = process.cwd();

// handle import statement
app.use(moduleRewrite(root));
// create static http server, find content not execute next middleware
app.use(serve(root));

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
