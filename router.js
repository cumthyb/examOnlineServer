/*
 * @LastEditors: hongyongbo
 * @LastEditTime: 2020-03-21 22:39:52
 * @Description: 
 * @Notice: 
 */

const Router = require('koa-router');

const { addQuestion, deleteQuestion, updateQuestion, getQuestionsWithType } = require('./controls/questions')
const { getPaper, calScore } = require('./controls/paper')


exports.createRouter = function () {
  const router = new Router();

  router.post('/examOnline/v1', addQuestion)
    .delete('/examOnline/v1', deleteQuestion)
    .put('/examOnline/v1', updateQuestion)
    .get('/examOnline/v1', getQuestionsWithType)

  router.get('/papers/v1', getPaper)
    .post('/papers/v1', calScore)
    
  return router;
}