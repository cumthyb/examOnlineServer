const Koa = require('koa');
const koaBody = require('koa-bodyparser');
const { createRouter } = require('./router')
const { readLoacalFile } = require('./utils')
const { examJsonPath,serverPort } = require('./constant')

const app = new Koa();
const router = createRouter()

global.questions = []
readLoacalFile(examJsonPath)


/**
 * 捕捉未处理的异常，以免服务崩溃
 * TODO:处理错误，上报异常，重启服务，
 */
process.on('uncaughtException', function (err) { 
  //打印出错误 
  console.log(err); 
  //打印出错误的调用栈方便调试 
  console.log(err.stack);
});


/**
 * 允许跨域
 */
app.use(async (ctx, next) => {
  ctx.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'content-type,content-length'
  })
  await next();
});


app.use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(serverPort, () => {
  console.log(`服务在${serverPort}端口启动！`);
});