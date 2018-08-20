/*
 * @Author: chenweizhi 
 * @Date: 2018-08-17 20:06:51 
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2018-08-20 22:26:16
 */

import {Utilfetch} from '../../utils/fetch'
/**
 * 获取后台菜单列表
 * @param {obj} option
 * @return {obj||null} 
 */
const asyncMenuList = async (option) => {
  let {uid} = option
  let result = Utilfetch.get(`/manager/list/${uid}`).then((res) => res)
  return result
}
export {
  asyncMenuList
}