/*
 * @Author: chenweizhi 
 * @Date: 2018-08-17 20:06:51 
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2018-08-17 20:45:37
 */

import {Utilfetch} from '../../utils/fetch'
/**
 * 获取后台菜单列表
 * @param {obj} option
 * @return {obj||null} 
 */
const asyncMenuList = (option) => {
  let {uid} = option
  let result
  Utilfetch.get(`/manager/list/${uid}`)
  .then((res) => {
    result = res
  })
  return result
}
export {
  asyncMenuList
}