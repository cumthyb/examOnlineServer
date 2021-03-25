/*
 * @LastEditors: hongyongbo
 * @LastEditTime: 2020-03-22 16:40:44
 * @Description: 
 * @Notice: 
 */
const { updateLocalFile } = require('../utils')
const { usersJsonPath } = require('../constant')

exports.addUser = async (ctx, next) => {
  try {
    let questionObj = JSON.parse(ctx.request.rawBody)
    global.users.push(questionObj.newUser)
    await updateLocalFile(usersJsonPath, global.users)

    ctx.status = 200;
    ctx.res.$$result = 'success';
    next();
  } catch (error) {
    ctx.status = 500;
    ctx.res.$$result = error;
    next();
  }
}

exports.addUsers = async (ctx, next) => {
  try {
    let questionObj = JSON.parse(ctx.request.rawBody)
    global.users=global.users.concat(questionObj.batchUsers)
    await updateLocalFile(usersJsonPath, global.users)

    ctx.status = 200;
    ctx.res.$$result = 'success';
    next();
  } catch (error) {
    ctx.status = 500;
    ctx.res.$$result = error;
    next();
  }
}

exports.deleteUser = async (ctx, next) => {
  try {
    let idx = global.users.findIndex(item => item === ctx.query.name)
    if (idx !== -1) {
      global.users.splice(idx, 1)
      await updateLocalFile(usersJsonPath, global.users)

      ctx.status = 200;
      ctx.res.$$result = 'success';

    }
    else {
      ctx.status = 200;
      ctx.res.$$result = '资源不存在！';

    }
    next();


  } catch (error) {
    ctx.status = 500;
    ctx.res.$$result = error;

    next();

  }
}

exports.updateUser = async (ctx, next) => {
  try {
    let questionObj = JSON.parse(ctx.request.rawBody)
    let idx = global.users.findIndex(item => item.id === questionObj.id)
    if (idx !== -1) {
      global.users.splice(idx, 1, questionObj)

      await updateLocalFile(usersJsonPath, global.users)

      ctx.status = 200;
      ctx.res.$$result = 'success';
    }
    else {
      ctx.status = 200;
      ctx.res.$$result = '资源不存在！';
    }
    next();
  } catch (error) {
    ctx.status = 500;
    ctx.res.$$result = error;
    next();
  }
}

exports.getUsers = async (ctx, next) => {
  try {
    let questionType = ctx.query.type
    let objs = [];
    if (!questionType) {
      objs = global.users;
    }
    else {
      objs = global.users.filter(item => item.type === questionType)
    }

    ctx.status = 200;
    ctx.res.$$result = objs;
    next();
  } catch (error) {
    ctx.status = 500;
    ctx.res.$$result = error;
    next();
  }
}


exports.login = async (ctx, next) => {
  try {
    let { name, pwd } = JSON.parse(ctx.request.rawBody)
    if (name === 'jw' && pwd === 'weijin') {
      ctx.status = 200;
      ctx.res.$$result = 'success';
    } else {
      ctx.status = 403;
      ctx.res.$$result = 'invaild user';
    }

    next();

  } catch (error) {
    ctx.status = 500;
    ctx.res.$$result = error;
    next();
  }
}