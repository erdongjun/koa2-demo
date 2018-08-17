/**
 * 整合所有子路由
 */

const router = require('koa-router')()

const home = require('./home')
const api = require('./api')
const manager = require('./manager')


router.use('/', home.routes(), home.allowedMethods())
router.use('/manager', manager.routes(), manager.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())


module.exports = router


