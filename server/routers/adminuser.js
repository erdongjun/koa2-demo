/**
 * adminuser 管理员管理
 */

const router = require('koa-router')()
const userInfoController = require('./../controllers/adminuser')

  console.log(userInfoController.signIn)
  const routers = router
    .post('/signin', userInfoController.signIn)
  // .get('/adminuser/list', userInfoController.getUserList)
    .get('/getinfo/:uid', userInfoController.getUserInfo)
  // .get('/adminuser/del', userInfoController.delUser)
  // .get('/adminuser/signout', userInfoController.signOut)
  // .post('/adminuser/add', userInfoController.addUser)
  // .post('/adminuser/edit', userInfoController.editUser)
  
module.exports = routers
