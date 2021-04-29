import { combineReducers } from 'redux'
import counter from './counter'
// import todos from './todos'

// 루트 리듀서만들기
const rootReducer = combineReducers({
  counter
})

export default rootReducer
