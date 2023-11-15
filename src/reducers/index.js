import { combineReducers } from 'redux'
import home from './home'
import search from './search'
import mine from './mine'
import goodJing from './goodJing'


export default combineReducers({
  home,
  search,
  mine,
  goodJing
})