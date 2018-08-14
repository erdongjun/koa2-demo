/**
 * 主页子路由
 */

const router = require('koa-router')()
const index = require('../controllers/home')

const routers = router
  .get('/', index)

module.exports = routers
