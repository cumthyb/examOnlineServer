/*
 * @LastEditors: hongyongbo
 * @LastEditTime: 2020-03-22 00:15:52
 * @Description: 
 * @Notice: 
 */


const { examJsonPath } = require('../constant')
const cloneDeep = require('lodash.clonedeep');


const getRandom = (arr, count) => {
  const getIndex = (len) => Math.floor(Math.random() * len)
  const res = []
  for (var i = 0; i < count&& arr.length > 0; i++) {
    var index = getIndex(arr.length)
    res.push(arr[index])
    [arr[index], arr[arr.length - 1]] = [arr[arr.length - 1], arr[index]]
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
    const questions = cloneDeep(global.questions)

    const random10=getRandom(questions,10)
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
 * 计算答题分数
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