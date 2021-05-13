import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects'

const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'
const INCREASE_ASYNC = 'INCREASE_ASYNC'
const DECREASE_ASYNC = 'DECREASE_ASYNC'

export const increase = () => ({ type: INCREASE })
export const decrease = () => ({ type: DECREASE })

// saga는 액션을 모니터링 하다가 특정 액션이 발생하면 특정 코드를 실행함
export const increaseAsync = () => ({ type: INCREASE_ASYNC })

export const decreaseAsync = () => ({ type: DECREASE_ASYNC })

function * increaseSaga () { // INCREASE_ASYNC 액션이 발생하면 실행됨
  yield delay(1000)
  yield put(increase())
}

function * decreaseSaga () { // DECREASE_ASYNC 액션이 발생하면 실행됨
  yield delay(1000)
  yield put(decrease())
}

// 이제 { type: INCREASE_ASYNC } 액션이 실행됐을 때 increaseSaga, { type: DECREASE_ASYNC } 액션이 실행됐을 때 decreaseSaga 함수를 실행하도록 해보자
export function * counterSaga () {
  yield takeEvery(INCREASE_ASYNC, increaseSaga)
  yield takeLatest(DECREASE_ASYNC, decreaseSaga)
}

const initialState = 0

export default function counter (state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1
    case DECREASE:
      return state - 1
    default:
      return state
  }
}
