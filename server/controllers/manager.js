// 权限验证
const JwtUtil = require('../utils/jwt')
const userCode = require('./../codes/user')
const managerModel = require('../models/manager')

module.exports = {
  /**
   *
   * @param {obejct} ctx 上下文对象
   */
  async getUserInfo (ctx) {
    // let uid = ctx.params.uid
    // let result = await  userModel.getUserInfo(uid)
    // ctx.body = {
    //   code: 200,
    //   result,
    //   params: ctx.params,
    //   query: ctx.query
    // }
    const token = ctx.header.authorization  // 获取jwt
    let payload
    if (token) {
      payload = JwtUtil.getJWTPayload(token)  // // 解密，获取payload
      ctx.body = {
        payload
      }
    } else {
      ctx.body = {
        message: 'token 错误',
        code: -1
      }
    }
  },

  /**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */
  async signIn( ctx ) {
    let user = ctx.request.body
    console.log(ctx)
    // 验证账号密码是否匹配
    let result = await managerModel.getOneByUserNameAndPassword(user)
    console.log(result)
    if (result) {
      // 密码加密
      // JwtUtil.cryptPwd(user.password)
      let userToken = {
        ...result
      }
      const token = JwtUtil.getToken(userToken)  //token签名 有效期为1小时
      ctx.body = {
        code: 1,
        data:result,
        msg: '登陆成功',
        extra:{
          token
        },
      }
    } else {
      ctx.body = {
        code: 0,
        msg: '登陆失败',
      }
    }
    
  },

  /**
   * 注册操作
   * @param   {obejct} ctx 上下文对象
   */
  async signUp( ctx ) {
    let formData = ctx.request.body
    let result = {
      success: false,
      message: '',
      data: null
    }

    let validateResult = userInfoService.validatorSignUp( formData )

    if ( validateResult.success === false ) {
      result = validateResult
      ctx.body = result
      return
    }

    let existOne  = await userInfoService.getExistOne(formData)
    console.log( existOne )

    if ( existOne  ) {
      if ( existOne .name === formData.userName ) {
        result.message = userCode.FAIL_USER_NAME_IS_EXIST
        ctx.body = result
        return
      }
      if ( existOne .email === formData.email ) {
        result.message = userCode.FAIL_EMAIL_IS_EXIST
        ctx.body = result
        return
      }
    }


    let userResult = await userInfoService.create({
      email: formData.email,
      password: formData.password,
      name: formData.userName,
      create_time: new Date().getTime(),
      level: 1,
    })

    console.log( userResult )

    if ( userResult && userResult.insertId * 1 > 0) {
      result.success = true
    } else {
      result.message = userCode.ERROR_SYS
    }

    ctx.body = result
  },

  /**
   * 获取用户信息
   * @param    {obejct} ctx 上下文对象
   */
  async getLoginUserInfo( ctx ) {
    let session = ctx.session
    let isLogin = session.isLogin
    let userName = session.userName

    console.log( 'session=', session )

    let result = {
      success: false,
      message: '',
      data: null,
    }
    if ( isLogin === true && userName ) {
      let userInfo = await userInfoService.getUserInfoByUserName( userName )
      if ( userInfo ) {
        result.data = userInfo
        result.success = true
      } else {
        result.message = userCode.FAIL_USER_NO_LOGIN
      }
    } else {
      // TODO
    }

    ctx.body = result
  },

  /**
   * 校验用户是否登录
   * @param  {obejct} ctx 上下文对象
   */
  validateLogin( ctx ) {
    let result = {
      success: false,
      message: userCode.FAIL_USER_NO_LOGIN,
      data: null,
      code: 'FAIL_USER_NO_LOGIN',
    } 
    let session = ctx.session
    if( session && session.isLogin === true  ) {
      result.success = true
      result.message = ''
      result.code = ''
    }
    return result
  },

  /**
   *
   *
   * @param {obejct} ctx
   */
  async getMenuList (ctx) {
    const token = ctx.header.authorization  // 获取jwt
    let payload
    if (token) {
      let payload = JwtUtil.getJWTPayload(token)  // // 解密，获取payload
      // 拉取所有菜单
      let result = await managerModel.getAllMenu(payload)

      ctx.body = {
       code: 1,
       data:result,
       msg: '获取菜单列表成功',
       extra:{}
      }
    } else {
      ctx.body = {
        message: '获取菜单列表错误',
        code: 0
      }
    }
  }


}
