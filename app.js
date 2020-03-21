const Koa = require('koa');
const app = new Koa();
const { createRouter } = require('./router')
const koaBody = require('koa-bodyparser');
const { readLoacalFile } = require('./utils')
const { examJsonPath } = require('./constant')

global.questions = []

const router = createRouter()

readLoacalFile(examJsonPath)
app.use(async (ctx, next) => {
  ctx.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'content-type,content-length'
  })
 await  next();
});

app.use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(9000, () => {
    console.log('服务9000端口已经启动了');
  });