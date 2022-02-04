const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const moduleRewrite = require('./moduleRewrite');
const moduleResolve = require('./moduleResolve');
const injectProcess = require('./injectProcess');
const PORT = 3000;
const root = process.cwd();

app.use(injectProcess());

// handle import statement
app.use(moduleRewrite(root));

app.use(moduleResolve(root));

// create static http server, find content not execute next middleware
app.use(serve(root));

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
