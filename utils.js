/*
 * @LastEditors: hongyongbo
 * @LastEditTime: 2020-03-22 17:19:48
 * @Description: 
 * @Notice: 
 */

const fs = require('fs-extra')
const uuid = require('uuid')

/**
 *
 * 读取本地文件,并将对象挂载在global对象上
 * @param {*} filePath
 */
const readLoacalFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, function (err, data) {
      if (err) {
        return console.error(err);
      }
      var arrStr = data.toString();//将二进制的数据转换为字符串
      var arr = []
      if (!arrStr) {
        arr = []
      }
      else {
        arr = JSON.parse(arrStr);//将字符串转换为json对象
      }
      resolve(arr)
    })
  })

}


/**
 *  
 * 将list数组json写入到文件中
 * @param {*} filePath
 * @param {*} list
 * @returns promise
 */
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



const getUUID = () => {
  return uuid.v1()
}


module.exports = {
  updateLocalFile,
  readLoacalFile,
  getUUID
}