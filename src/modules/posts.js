import * as postsAPI from '../api/posts'
import { hanldleAsyncActions, hanldleAsyncActionsById, reducerUtils } from '../lib/asyncUtils'
import { call, put, takeEvery } from 'redux-saga/effects'

const GET_POSTS = 'GET_POSTS'
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'

const GET_POST = 'GET_POST'
const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
const GET_POST_ERROR = 'GET_POST_ERROR'

const CLEAR_POST = 'CLEAR_POST'

// thunk 호출함수
// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts)

// export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById)
export const getPosts = () => ({ type: GET_POSTS })
export const getPost = id => ({ type: GET_POST, payload: id, meta: id })

function * getPostsSaga () {
  try {
    const posts = yield call(postsAPI.getPosts)
    yield put({
      type: GET_POSTS_SUCCESS,
      payload: posts
    })
  } catch (e) {
    yield put({
      type: GET_POSTS_ERROR,
      payload: e,
      error: true
    })
  }
}

function * getPostSaga (action) {
  const id = action.payload
  try {
    const post = yield call(postsAPI.getPostById, id)
    yield put({
      type: GET_POST_SUCCESS,
      payload: post,
      meta: id
    })
  } catch (e) {
    yield put({
      type: GET_POST_ERROR,
      payload: e,
      error: true,
      meta: id
    })
  }
}

export function * postSaga () {
  yield takeEvery(GET_POSTS, getPostsSaga)
  yield takeEvery(GET_POST, getPostSaga)
}

export const clearPost = () => ({ type: CLEAR_POST })
export const goHome = () => (dispatch, getState, { history }) => {
  history.push('/')
}

const initialState = {
  posts: reducerUtils.initial(),
  post: {}
}

const getPostsReducer = hanldleAsyncActions(GET_POSTS, 'posts', true)
const getPostReducer = hanldleAsyncActionsById(GET_POST, 'post', true)

export default function posts (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return getPostsReducer(state, action)
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return getPostReducer(state, action)
    case CLEAR_POST:
      return {
        ...state,
        post: reducerUtils.initial()
      }
    default:
      return state
  }
}
