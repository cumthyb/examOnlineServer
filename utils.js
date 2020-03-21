/*
 * @LastEditors: hongyongbo
 * @LastEditTime: 2020-03-21 17:52:27
 * @Description: 
 * @Notice: 
 */

const fs=require('fs-extra')

const readLoacalFile = (filePath) => {
  fs.readFile(filePath, function (err, data) {
    if (err) {
      return console.error(err);
    }
    var questions = data.toString();//将二进制的数据转换为字符串
    if (!questions) {
      questions = []
    }
    else {
      questions = JSON.parse(questions);//将字符串转换为json对象
    }
    global.questions = questions
  })
}

const updateLocalFile = (filePath, list) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(list), function (err) {
      if (err) {
        reject(err)
        throw err;
      }
      else {
        resolve()
      }
    });
  })
}


module.exports ={
  updateLocalFile,
  readLoacalFile
}