/*
 * @LastEditors: hongyongbo
 * @LastEditTime: 2020-03-22 16:40:44
 * @Description: 
 * @Notice: 
 */
const { updateLocalFile } = require('../utils')
const { examJsonPath } = require('../constant')

exports.addQuestion = async (ctx, next) => {
  try {
    let questionObj = JSON.parse(ctx.request.rawBody)
    global.questions.push(questionObj)
    await updateLocalFile(examJsonPath, global.questions)

    ctx.status = 200;
    ctx.res.end('Success');
  } catch (error) {
    ctx.status = 500;
    ctx.res.end(error);
  }
}


exports.deleteQuestion = async (ctx, next) => {
  try {
    let idx = global.questions.findIndex(item => item.id === ctx.query.id)
    if (idx !== -1) {
      global.questions.splice(idx, 1)
      await updateLocalFile(examJsonPath, global.questions)

      ctx.status = 200;
      ctx.res.end('Success');
    }
    else {
      ctx.status = 200;
      ctx.res.end('资源不存在');
    }

  } catch (error) {
    ctx.status = 500;
    ctx.res.end(error);
  }
}

exports.updateQuestion = async (ctx, next) => {
  try {
    let questionObj = JSON.parse(ctx.request.rawBody)
    let idx = global.questions.findIndex(item => item.id === questionObj.id)
    if (idx !== -1) {
      global.questions.splice(idx, 1, questionObj)

      await updateLocalFile(examJsonPath, global.questions)

      ctx.status = 200;
      ctx.res.end('Success');
    }
    else {
      ctx.status = 200;
      ctx.res.end('资源不存在');
    }

  } catch (error) {
    ctx.status = 500;
    ctx.res.end(error);
  }
}

exports.getQuestionsWithType = async (ctx, next) => {
  try {
    let questionType = ctx.query.type

    let objs = global.questions.filter(item => item.type === questionType)

    ctx.status = 200;
    ctx.res.end(JSON.stringify(objs));
  } catch (error) {
    ctx.status = 500;
    ctx.res.end(error);
  }
}