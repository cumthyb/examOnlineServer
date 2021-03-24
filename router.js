/*
 * @LastEditors: hongyongbo
 * @LastEditTime: 2020-03-23 05:57:51
 * @Description: 
 * @Notice: 
 */

const Router = require('koa-router');
const {
  addUser,
  deleteUser,
  // updateUser,
  getUsers
} = require('./controls/user')

const {
  getLucker,
  // calScore,
  // storeQAPaper,
  // getQAPaper,
  // calQAScore
} = require('./controls/lucker')


exports.createRouter = function () {
  const router = new Router();

  router
    .post('/participants/v1', addUser)
    .delete('/participants/v1', deleteUser)
    // .put('/participants/v1', updateUser)
    .get('/participants/v1', getUsers)

  router
    .get('/luckers/v1', getLucker)
    // .post('/luckers/v1', calScore)
    // .post('/luckers/v1', storeQAPaper)
    // .post('/luckers/v1', calQAScore)
    // .get('/luckers/v1', getQAPaper)
    

  return router;
}