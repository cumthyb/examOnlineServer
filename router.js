/*
 * @LastEditors: hongyongbo
 * @LastEditTime: 2020-03-21 19:00:53
 * @Description: 
 * @Notice: 
 */

const Router = require('koa-router');

const { addQuestion, deleteQuestion, updateQuestion, getQuestionsWithType } = require('./controls/questions')
const { getPaper } = require('./controls/paper')


exports.createRouter = function () {
  const router = new Router();

  router.post('/examOnline/v1', addQuestion)
    .delete('/examOnline/v1', deleteQuestion)
    .put('/examOnline/v1', updateQuestion)
    .get('/examOnline/v1', getQuestionsWithType)

  router.get('/papers/v1', getPaper)

  return router;
}