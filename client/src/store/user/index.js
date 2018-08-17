/*
 * @Author: chenweizhi 
 * @Date: 2018-08-17 17:16:23 
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2018-08-17 19:16:15
 */

// 发起登陆请求
// Utilfetch.post('/adminuser/signin',{
//   username: values.userName,
//   password: values.password
// }).then((res) => {
//   localStorage.setItem('MYTOKEN',res.extra.token)
//   localStorage.setItem('USERINFO',JSON.stringify(res.data))
//   this.props.history.push('/')
// })


import {Utilfetch} from '../../utils/fetch'
/**
 * 用户登陆
 * @param {obj} option
 * @return {obj}  信息
 */
const userLogin = async (option) => {
  let result = await  Utilfetch.post(`/manager/signin`,option).then((res) => res)
  return result
}


export {
  userLogin
} 