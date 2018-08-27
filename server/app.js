const Koa = require('koa')
const path = require('path')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const koaLogger = require('koa-logger')
const jwtKoa = require('koa-jwt')
const config = require('./config/sqlconfig')
const routers = require('./routers/index')
// 权限验证相关
const JwtUtil = require('./utils/jwt')

const app = new Koa()

// 配置控制台日志中间件
app.use(koaLogger())

// 使用ctx.body解析中间件
app.use(bodyParser())
// jwt验证
app.use(jwtKoa({secret:JwtUtil.secret}).unless({
  path: [/^\/manager\/signin/,/^\/manager\/get91/] //数组中的路径不需要通过jwt验证
}))

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'
app.use(static(
  path.join( __dirname,  staticPath)
))
// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

console.log(process.env.NODE_ENV);

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 监听端口
app.listen(config.port)

console.log(`sever is starting at port ${config.port}`)
