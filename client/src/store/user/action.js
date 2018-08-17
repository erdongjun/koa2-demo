
import {USER_LOGIN,USER_SIGNSIGNOUT,USER_UPDATE} from './type'

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
