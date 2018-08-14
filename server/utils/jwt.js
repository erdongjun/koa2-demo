

const jwt = require('jsonwebtoken')
const crypto=require("crypto")
/* jwt密钥 */
const secret = 'xifancode'
const salt = 'xifan'

const JwtUtil = {
  secret,
  // 获取token
  getToken(payload = {}) {
    return jwt.sign(payload, secret, { expiresIn: '12h' })
  },
  /* 通过token获取JWT的payload部分 */
  getJWTPayload(token) {
    // 验证并解析JWT
    return jwt.verify(token.split(' ')[1], secret)
  },
  cryptPwd(password) {
    // 密码“加盐”
    let saltPassword = password+':'+salt
    console.log('原始密码:%s',password)
    console.log('加盐后的密码:%s',saltPassword)
    // 密码“加盐”的md5
    let md5 = crypto.createHash("md5")
    let result = md5.update(saltPassword).digest("hex")
    console.log('加盐密码的md5值：%s', result)
    return result
  }
}


module.exports = JwtUtil