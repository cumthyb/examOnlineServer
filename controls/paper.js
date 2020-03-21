/*
 * @LastEditors: hongyongbo
 * @LastEditTime: 2020-03-21 19:36:03
 * @Description: 
 * @Notice: 
 */


const { examJsonPath } = require('../constant')
const cloneDeep = require('lodash.clonedeep');

/**
 * 获取所有试题
 * TODO:随机抽取
 */
exports.getPaper = async (ctx, next) => {
  try {
    const questions=cloneDeep(global.questions)

    // 过滤掉试题的答案
    questions.forEach(item=>{
      delete item.answer
      if(item.options){
        item.options.forEach(op=>{
          delete op.correct
        })
      }
      return item
    })

    ctx.status = 200;
    ctx.res.end(JSON.stringify(questions));
  } catch (error) {
    ctx.status = 500;
    ctx.res.end(error);
  }
}