import {
  ALL_POSTS_REQUEST,
  ALL_POSTS_SUCCESS,
  ALL_POSTS_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  ALL_USER_POSTS_REQUEST,
  ALL_USER_POSTS_SUCCESS,
  ALL_USER_POSTS_FAIL,
  POST_EDIT_REQUEST,
  POST_EDIT_SUCCESS,
  POST_EDIT_RESET,
  POST_EDIT_FAIL,
  ADD_NEW_POST_REQUEST,
  ADD_NEW_POST_SUCCESS,
  ADD_NEW_POST_RESET,
  ADD_NEW_POST_FAIL,
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

export const postDetailsReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case POST_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case POST_DETAILS_SUCCESS:
      return {
        loading: false,
        post: action.payload,
      }

    case POST_DETAILS_FAIL:
      return {
        ...state,
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

export const userPostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case ALL_USER_POSTS_REQUEST:
      return {
        loading: true,
        ...state,
      }

    case ALL_USER_POSTS_SUCCESS:
      return {
        loading: false,
        posts: action.payload.data,
      }

    case ALL_USER_POSTS_FAIL:
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

export const newPostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case ADD_NEW_POST_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case ADD_NEW_POST_SUCCESS:
      return {
        loading: false,
        post: action.payload.data,
        isSuccess: action.payload.success,
      }
    case ADD_NEW_POST_RESET:
      return {
        ...state,
        loading: false,
        isSuccess: false,
      }
    case ADD_NEW_POST_FAIL:
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
export const postEditReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case POST_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case POST_EDIT_SUCCESS:
      return {
        loading: false,
        post: action.payload.data,
        isSuccess: action.payload.success,
      }
    case POST_EDIT_RESET:
      return {
        ...state,
        error: action.payload,
        isSuccess: false,
      }
    case POST_EDIT_FAIL:
      return {
        ...state,
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
