/*
 * @LastEditors: hongyongbo
 * @LastEditTime: 2020-03-23 06:57:09
 * @Description: 
 * @Notice: 
 */

const { papersJsonPath } = require('../constant')
const { updateLocalFile, getUUID } = require('../utils')
const cloneDeep = require('lodash.clonedeep');

const getRandom = (arr, count) => {
  const getIndex = (len) => Math.floor(Math.random() * len)
  const res = []
  for (var i = 0; i < count && arr.length > 0; i++) {
    var index = getIndex(arr.length)
    res.push(arr[index])
    arr[index] = arr[arr.length - 1]
    arr.pop()
  }
  return res;
}

/**
 * 获取所有试题
 * TODO:随机抽取
 */
exports.getPaper = async (ctx, next) => {
  try {
    const { type } = ctx.query

    var res = []
    if (type === 'qa') {
      res = global.questions.filter(item => item["type"] == 'qa')
    } else {
      res = global.questions.filter(item => item["type"] != 'qa')
    }

    const questions = cloneDeep(res)

    const random10 = getRandom(questions, 10)
    // 过滤掉试题的答案
    random10.forEach(item => {
      delete item.answer
      if (item.options) {
        item.options.forEach(op => {
          delete op.correct
        })
      }
      return item
    })

    ctx.status = 200;
    ctx.res.end(JSON.stringify(random10));
  } catch (error) {
    ctx.status = 500;
    ctx.res.end(error);
  }
}


/**
 * 计算选择题答题分数
 */
exports.calScore = async (ctx, next) => {
  try {
    let answers = JSON.parse(ctx.request.rawBody)
    let totalScore = 0;
    answers.forEach(item => {
      var question = global.questions.filter(q => q.id === item.id)[0]
      var _answers = []
      question.options.map((opt, index) => {
        if (opt.correct) {
          _answers.push(index)
        }
      })
      correct = _answers.join()
      if (item.answer.toString() === correct
        || (item.answer.toString() && (item.answer.toString().includes(question.answer)))) {
        totalScore += Number(question.score)
      }

    })
    ctx.status = 200;
    ctx.res.end(totalScore.toString());
  } catch (error) {
    ctx.status = 500;
    ctx.res.end(error);
  }


}


/**
 * 存储问答题
 */
exports.storeQAPaper = async (ctx, next) => {
  try {

    let paperObj = JSON.parse(ctx.request.rawBody)

    let { questions, stName } = paperObj

    let res = questions.map(item => {
      var { id, type, answer, questionDesc } = item
      return { id, type, answer, questionDesc }
    })

    global.papers.push({
      id: getUUID(),
      stName,
      commitTime: Date.now(),
      questions: res
    })


    await updateLocalFile(papersJsonPath, global.papers)

    ctx.status = 200;
    ctx.res.end('Success');

  } catch (error) {
    ctx.status = 500;
    ctx.res.end(error);
  }
}


/**
 * 问答题试卷
 */
exports.getQAPaper = (ctx, next) => {
  let res = []
  let { id } = ctx.query
  if (id) {
    res = global.papers.filter(item => item.id === id)
  } else {
    res = global.papers
  }
  ctx.status = 200;
  ctx.res.end(JSON.stringify(res))
}

exports.calQAScore = async (ctx, next) => {

  let paperObj = JSON.parse(ctx.request.rawBody)


  let sum=paperObj.questions.reduce((sum,item)=>sum+=(item.score||0),0)

  paperObj.score=sum

  let paper=global.papers.filter(item=>item.id===paperObj.id)[0]
  paper.score=sum
  paper.correctTime=Date.now()
  await updateLocalFile(papersJsonPath, global.papers)

  ctx.status = 200;
  ctx.res.end(sum.toString())
}