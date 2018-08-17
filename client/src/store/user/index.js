/*
 * @Author: chenweizhi 
 * @Date: 2018-08-17 17:16:23 
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2018-08-17 20:59:09
 */
import {Utilfetch} from '../../utils/fetch'
/**
 * 用户登陆
 * @param {obj} option
 * @return {obj}  信息
 */
const asyncuserLogin = async (option) => {
  let result = await Utilfetch.post(`/manager/signin`,option).then(res => res)
  return result
}


export {
  asyncuserLogin
} 