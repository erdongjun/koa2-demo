
import {MENU_LIST} from './type'

const menuList = (state = {}, action) => {
  switch (action.type) {
    case MENU_LIST:
      return {
        ...state,
        ...action
      }
    default:
      return state
  }
}
export {
  menuList
}
