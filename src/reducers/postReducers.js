import {
  ALL_POSTS_REQUEST,
  ALL_POSTS_SUCCESS,
  ALL_POSTS_FAIL,
  CLEAR_ERRORS,
} from '../constants/postConstants'

export const postsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case ALL_POSTS_REQUEST:
      return {
        loading: true,
        ...state,
      }

    case ALL_POSTS_SUCCESS:
      return {
        loading: false,
        posts: action.payload.data,
      }

    case ALL_POSTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}
