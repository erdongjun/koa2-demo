/**
 * 整合所有子路由
 */

const router = require('koa-router')()

const home = require('./home')
const api = require('./api')
const adminuser = require('./adminuser')


router.use('/', home.routes(), home.allowedMethods())
router.use('/adminuser', adminuser.routes(), adminuser.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())


module.exports = router


