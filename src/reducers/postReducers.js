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
  RESET_USER_POST,
  DELETE_USER_POST_REQUEST,
  DELETE_USER_POST_SUCCESS,
  DELETE_USER_POST_RESET,
  DELETE_USER_POST_FAIL,
  POST_EDIT_REQUEST,
  POST_EDIT_SUCCESS,
  POST_EDIT_RESET,
  POST_EDIT_FAIL,
  ADD_NEW_POST_REQUEST,
  ADD_NEW_POST_SUCCESS,
  ADD_NEW_POST_RESET,
  ADD_NEW_POST_FAIL,
  ALL_UNAPPROVED_POSTS_REQUEST,
  ALL_UNAPPROVED_POSTS_SUCCESS,
  ALL_UNAPPROVED_POSTS_FAIL,
  CLEAR_ERRORS,
} from '../constants/postConstants'

export const postsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case ALL_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
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
        ...state,
        loading: true,
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

    case RESET_USER_POST:
      return {
        loading: false,
        posts: null,
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

export const userPostReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_POST_REQUEST:
      return {
        ...state,
        postLoading: true,
      }

    case DELETE_USER_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
        isDeleted: action.payload,
      }

    case DELETE_USER_POST_FAIL:
      return {
        ...state,
        postError: action.payload,
      }

    case DELETE_USER_POST_RESET:
      return {
        ...state,
        isDeleted: false,
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        postError: null,
      }

    default:
      return state
  }
}

export const newPostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case ADD_NEW_POST_REQUEST:
      return {
        ...state,
        loading: true,
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

export const unapprovedPostsReducer = (state = { unapprovedPosts: [] }, action) => {
  switch (action.type) {
    case ALL_UNAPPROVED_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case ALL_UNAPPROVED_POSTS_SUCCESS:
      return {
        loading: false,
        unapprovedPosts: action.payload.data,
      }

    case ALL_UNAPPROVED_POSTS_FAIL:
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
