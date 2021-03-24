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
exports.usersJsonPath = path.join(__dirname, 'db','users.json')


exports.luckersJsonPath = path.join(__dirname,'db', 'luckers.json')



/**
 * 服务端口号
 */
exports.serverPort = 9000