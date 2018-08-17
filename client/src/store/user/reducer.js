
import {USER_LOGIN,USER_SIGNSIGNOUT,USER_UPDATE} from './type'

const userInfo = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        ...{
          type: action.type,
          ...action.info
        }
      }
    case USER_SIGNSIGNOUT:
      return {
          type: action.type,
          info: {}
      }
    default:
      return state
  }
}

export {
  userInfo
}
