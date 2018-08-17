/*
 * @Author: chenweizhi 
 * @Date: 2018-08-17 17:06:20 
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2018-08-17 17:37:38
 */

import Utilfetch from '../../utils/fetch'
/**
 * 获取后台菜单列表
 * @param {obj} option
 * @return {arr} 
 */
const getMenuList = async (option) => {
  result = await Utilfetch.get(`/adminmenu/list/${uid}`)
  console.log(result)
  return {}
}


export {
  getMenuList
}