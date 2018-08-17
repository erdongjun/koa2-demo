
import {MENU_SUC,MENU_RES} from './type'

const userLogin = (info) =>({
  type: USER_LOGIN,
  info
})
const userSignout = () =>({
  type: USER_SIGNSIGNOUT
})

export {
  userLogin,
  userSignout
}
