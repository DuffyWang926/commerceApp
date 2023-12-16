import { combineReducers } from 'redux'
import home from './home'
import search from './search'
import mine from './mine'
import goodJing from './goodJing'
import group from './group'


export default combineReducers({
  home,
  search,
  mine,
  goodJing,
  group
})