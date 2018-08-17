import { combineReducers } from 'redux'
import { userInfo } from './user/reducer'
import { menuList } from './menu/reducer'

export default combineReducers({
  userInfo,
  menuList
})