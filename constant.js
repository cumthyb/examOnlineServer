/*
 * @LastEditors: hongyongbo
 * @LastEditTime: 2020-03-22 16:14:02
 * @Description: 
 * @Notice: 
 */


const path = require('path')

/**
 * 试题json文件路径
 */
exports.examJsonPath = path.join(__dirname, 'questions.json')


exports.papersJsonPath = path.join(__dirname, 'papers.json')



/**
 * 服务端口号
 */
exports.serverPort = 9000