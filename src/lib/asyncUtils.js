import { call, put } from 'redux-saga/effects'

export const createPromiseSaga = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]

  return function * (action) {
    try {
      const result = yield call(promiseCreator, action.meta)
      yield put({
        type: SUCCESS,
        payload: result
      })
    } catch (e) {
      yield put({
        type: ERROR,
        payload: e,
        error: true
      })
    }
  }
}

export const createPromiseSagaById = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]
  return function * (action) {
    try {
      const result = yield call(promiseCreator, action.meta)
      yield put({
        type: SUCCESS,
        payload: result,
        meta: action.meta
      })
    } catch (e) {
      yield put({
        type: ERROR,
        payload: e,
        error: true,
        meta: action.meta
      })
    }
  }
}

export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]

  const thunkCreator = param => async dispatch => {
    dispatch({ type })
    try {
      const payload = await promiseCreator(param)
      dispatch({
        type: SUCCESS,
        payload
      })
    } catch (e) {
      dispatch({
        type: ERROR,
        payload: e,
        error: true
      })
    }
  }

  return thunkCreator
}

const defaultSelector = param => param
export const createPromiseThunkById = (type, promiseCreator, idSelector = defaultSelector) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]

  const thunkCreator = param => async dispatch => {
    const id = defaultSelector(param)
    dispatch({ type, meta: id })
    try {
      const payload = await promiseCreator(param)
      dispatch({
        type: SUCCESS,
        payload,
        meta: id
      })
    } catch (e) {
      dispatch({
        type: ERROR,
        payload: e,
        error: true,
        meta: id
      })
    }
  }

  return thunkCreator
}

export const hanldleAsyncActions = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].data : null)
        }
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload)
        }
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload)
        }
      default:
        return state
    }
  }
}

export const hanldleAsyncActionsById = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]
  return (state, action) => {
    const id = action.meta
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.loading(keepData ? (state[key][id] && state[key][id].data) : null)
          }
        }
      case SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.success(action.payload)
          }
        }
      case ERROR:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.error(action.payload)
          }
        }
      default:
        return state
    }
  }
}

export const reducerUtils = {
  initial: (data = null) => ({
    loading: false,
    data,
    error: null
  }),
  loading: (prevState = null) => ({
    data: prevState,
    loading: true,
    error: null
  }),
  success: (data) => ({
    data,
    loading: false,
    error: null
  }),
  error: (error) => ({
    data: null,
    loading: false,
    error
  })
}
