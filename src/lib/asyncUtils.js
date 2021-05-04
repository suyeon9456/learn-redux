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
