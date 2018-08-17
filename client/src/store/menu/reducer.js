
import {MENU_LIST} from './type'

const menuList = (state = {}, action) => {
  switch (action.type) {
    case MENU_LIST:
      return {
        state,
        ...{
          type: action.type,
          ...action.info
        }
      }
    default:
      return state
  }
}
export {
  menuList
}
