import { combineReducers } from 'redux'
import counter, { counterSaga } from './counter'
import posts, { postSaga } from './posts'
// import todos from './todos'
import { all } from 'redux-saga/effects'

// 루트 리듀서만들기
const rootReducer = combineReducers({
  counter,
  posts
})

export function * rootSaga () {
  yield all([counterSaga(), postSaga()])
}

export default rootReducer
