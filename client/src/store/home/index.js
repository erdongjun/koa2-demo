/*
 * @Author: chenweizhi 
 * @Date: 2018-08-17 17:06:20 
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2018-08-17 20:06:01
 */

import Utilfetch from '../../utils/fetch'
/**
 * 获取后台菜单列表
 * @param {obj} option
 * @return {arr} 
 */
const getMenuList = async (option) => {
  let {uid} = option
  result = await Utilfetch.get(`/manager/list/${uid}`)
  return {}
}


export {
  getMenuList
}