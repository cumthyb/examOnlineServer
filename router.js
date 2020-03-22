/*
 * @LastEditors: hongyongbo
 * @LastEditTime: 2020-03-23 05:57:51
 * @Description: 
 * @Notice: 
 */

const Router = require('koa-router');
const {
  addQuestion,
  deleteQuestion,
  updateQuestion,
  getQuestionsWithType
} = require('./controls/questions')

const {
  getPaper,
  calScore,
  storeQAPaper,
  getQAPaper,
  calQAScore
} = require('./controls/paper')


exports.createRouter = function () {
  const router = new Router();

  router
    .post('/examOnline/v1', addQuestion)
    .delete('/examOnline/v1', deleteQuestion)
    .put('/examOnline/v1', updateQuestion)
    .get('/examOnline/v1', getQuestionsWithType)

  router
    .get('/papers/v1', getPaper)
    .post('/papers/v1', calScore)
    .post('/papersQA/v1', storeQAPaper)
    .post('/scoreQA/v1', calQAScore)
    .get('/papersQA/v1', getQAPaper)
    

  return router;
}