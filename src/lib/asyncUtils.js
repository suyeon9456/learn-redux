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
