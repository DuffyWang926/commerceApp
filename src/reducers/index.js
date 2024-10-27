import { combineReducers } from 'redux'
import home from './home'
import product from './product'
import search from './search'
import mine from './mine'
import group from './group'
import welfare from './welfare'


export default combineReducers({
  home,
  search,
  mine,
  group,
  product,
  welfare
})