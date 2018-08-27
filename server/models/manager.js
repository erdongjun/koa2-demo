const dbUtils = require('./../utils/db-util')

const user = {

  /**
   * 数据库创建新用户
   * @param  {object} model 用户数据模型
   * @return {object}       mysql执行结果
   */
  async create ( model ) {
    let result = await dbUtils.query( 'manager', model )
    return result
  },

  /**
   * 根据uid查询用户的数据
   * @param  {number} uid 查找条件参数
   * @return {object|null}        查找结果
   */
  async getUserInfo(uid) {
    let _sql = `
    SELECT * from manager
      where uid='${uid}'
      limit 1`
    let result = await dbUtils.query( _sql )
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },


  /**
   * 查找一个存在用户的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getExistOne(options ) {
    let _sql = `
    SELECT * from manager
      where email="${options.email}" or name="${options.name}"
      limit 1`
    let result = await dbUtils.query( _sql )
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

  /**
   * 根据用户名和密码查找用户
   * @param  {object} options 用户名密码对象
   * @return {object|null}         查找结果
   */
  async getOneByUserNameAndPassword( options ) {
    let _sql = `
      SELECT uid, username, role, super 
      from manager
      where password="${options.password}" and username="${options.username}"
      limit 1`
    let result = await dbUtils.query( _sql )
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

  /**
   * 根据用户名查找用户信息
   * @param  {string} userName 用户账号名称
   * @return {object|null}     查找结果
   */
  async getUserInfoByUserName( userName ) {
    let result = await dbUtils.select(
      'manager',
      ['id', 'email', 'name', 'detail_info', 'create_time', 'modified_time', 'modified_time' ])
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },
  /**
   *
   * @param {*} uid 管理员id
   * @param {*} super 是否是超级管理员
   * @returns [arr] 菜单列表
    * @param {*} param0 
    */
  async getAllMenu(payload){
    let sql = `select * from menu order by id`
    let result = await dbUtils.query(sql)
    // 序列化菜单分类
    let list = sortMenuList (result,0,1)
    return {list,result}
  }
}
//  无极限分类排序
function sortMenuList (arr,pid,level){
  let result = []
  arr.forEach(item => {
    if(item.p_id == pid){
      let subItem = item
      subItem.level = level
      let children = sortMenuList (arr,item.id,++level)
      if(children.length>0){
        subItem.children = children
      }
      result.push(subItem)
    }
  })
  return result
}


module.exports = user
