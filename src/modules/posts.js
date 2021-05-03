import * as postsAPI from '../api/posts'
import { createPromiseThunk, reducerUtils } from '../lib/asyncUtils'

const GET_POSTS = 'GET_POSTS'
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'

const GET_POST = 'GET_POST'
const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
const GET_POST_ERROR = 'GET_POST_ERROR'

// thunk 호출함수
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts)

export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById)

const initialState = {
  posts: reducerUtils.initial,
  post: reducerUtils.initial
}

export default function posts (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        // posts: reducerUtils.loading(state.posts.data) // 기존의 데이터 값을 유지하고 로딩값만 변경하고 싶을 떄
        posts: reducerUtils.loading()
      }
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: reducerUtils.success(action.payload)
      }
    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: reducerUtils.error(action.payload)
      }
    case GET_POST:
      return {
        ...state,
        post: reducerUtils.loading()
      }
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: reducerUtils.success(action.payload)
      }
    case GET_POST_ERROR:
      return {
        ...state,
        post: reducerUtils.error(action.payload)
      }
    default:
      return state
  }
}
