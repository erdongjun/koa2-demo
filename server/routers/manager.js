/**
 * manager 管理员管理
 */

const router = require('koa-router')()
const userInfoController = require('./../controllers/manager')
const routers = router
  .post('/signin', userInfoController.signIn)
// .get('/manager/list', userInfoController.getUserList)
  .get('/getinfo/:uid', userInfoController.getUserInfo)
// .get('/manager/del', userInfoController.delUser)
// .get('/manager/signout', userInfoController.signOut)
// .post('/manager/add', userInfoController.addUser)
// .post('/manager/edit', userInfoController.editUser)

module.exports = routers
