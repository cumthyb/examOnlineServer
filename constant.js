/*
 * @LastEditors: hongyongbo
 * @LastEditTime: 2020-03-22 08:13:48
 * @Description: 
 * @Notice: 
 */


const path = require('path')

/**
 * 试题json文件路径
 */
exports.examJsonPath = path.join(__dirname, 'questions.json')


/**
 * 服务端口号
 */
exports.serverPort = 9000