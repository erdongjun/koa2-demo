const dbUtils = require('./../utils/db-util')

const sexpost = {
  /**
   * 批量插入数据
   * @param  {number} uid 查找条件参数
   * @return {object|null}        查找结果
   */
  async addPost(arr) {
    let arrstr = arr.map((item,index)=>( index ==0 ?('("'+index+item.title+'","'+item.url+'")'):(',("'+index+item.title+'","'+item.url+'")') )).join('')
    let _sql = `
    insert into 91post 
    (title, url)
    values
    ${arrstr}
    `
    let result = await dbUtils.query( _sql )
    console.log(result)
    return result
  },
  /**
   * 批量插入数据
   * @param  {number} uid 查找条件参数
   * @return {object|null}        查找结果
   */
  async getPost(arr) {
    let _sql = `
    select * from 91post `
    let result = await dbUtils.query( _sql )
    return result
  },
}

module.exports = sexpost
