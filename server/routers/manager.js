/**
 * manager 管理员管理
 */

const router = require('koa-router')()
const managerController = require('./../controllers/manager')
const routers = router
  .post('/signin', managerController.signIn)
  .get('/list/:uid', managerController.getMenuList)
  .get('/get91', managerController.get91post)
// .get('/manager/del', managerController.delUser)
// .get('/manager/signout', managerController.signOut)
// .post('/manager/add', managerController.addUser)
// .post('/manager/edit', managerController.editUser)

module.exports = routers
