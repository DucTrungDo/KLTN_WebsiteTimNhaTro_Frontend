import {
  ALL_POSTS_REQUEST,
  ALL_POSTS_SUCCESS,
  ALL_POSTS_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  USER_POST_DETAILS_REQUEST,
  USER_POST_DETAILS_SUCCESS,
  USER_POST_DETAILS_FAIL,
  MODERATOR_POST_DETAILS_REQUEST,
  MODERATOR_POST_DETAILS_SUCCESS,
  MODERATOR_POST_DETAILS_FAIL,
  ADMIN_POST_DETAILS_REQUEST,
  ADMIN_POST_DETAILS_SUCCESS,
  ADMIN_POST_DETAILS_FAIL,
  ALL_USER_POSTS_REQUEST,
  ALL_USER_POSTS_SUCCESS,
  ALL_USER_POSTS_FAIL,
  RESET_USER_POST,
  HIDE_USER_POST_REQUEST,
  HIDE_USER_POST_SUCCESS,
  HIDE_USER_POST_FAIL,
  HIDE_USER_POST_RESET,
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
  ALL_MODERATOR_POSTS_REQUEST,
  ALL_MODERATOR_POSTS_SUCCESS,
  ALL_MODERATOR_POSTS_FAIL,
  MODERATOR_APPROVE_POST_REQUEST,
  MODERATOR_APPROVE_POST_SUCCESS,
  MODERATOR_APPROVE_POST_FAIL,
  MODERATOR_APPROVE_POST_RESET,
  MODERATOR_REPORT_POST_REQUEST,
  MODERATOR_REPORT_POST_SUCCESS,
  MODERATOR_REPORT_POST_FAIL,
  MODERATOR_REPORT_POST_RESET,
  DELETE_ADMIN_POST_REQUEST,
  DELETE_ADMIN_POST_SUCCESS,
  DELETE_ADMIN_POST_RESET,
  DELETE_ADMIN_POST_FAIL,
  UPDATE_ADMIN_POST_REQUEST,
  UPDATE_ADMIN_POST_SUCCESS,
  UPDATE_ADMIN_POST_RESET,
  UPDATE_ADMIN_POST_FAIL,
  ADD_NEW_POST_ADMIN_REQUEST,
  ADD_NEW_POST_ADMIN_SUCCESS,
  ADD_NEW_POST_ADMIN_RESET,
  ADD_NEW_POST_ADMIN_FAIL,
  ALL_ADMIN_POSTS_REQUEST,
  ALL_ADMIN_POSTS_SUCCESS,
  ALL_ADMIN_POSTS_FAIL,
  ALL_ADMIN_POSTS_MODERATE_POST_REQUEST,
  ALL_ADMIN_POSTS_MODERATE_POST_SUCCESS,
  ALL_ADMIN_POSTS_MODERATE_POST_FAIL,
  CLEAR_ERRORS,
} from '../constants/postConstants'

export const postsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case ALL_POSTS_REQUEST:
    case ALL_ADMIN_POSTS_REQUEST:
    case ALL_ADMIN_POSTS_MODERATE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case ALL_POSTS_SUCCESS:
    case ALL_ADMIN_POSTS_SUCCESS:
    case ALL_ADMIN_POSTS_MODERATE_POST_SUCCESS:
      return {
        loading: false,
        posts: action.payload.data,
      }

    case ALL_POSTS_FAIL:
    case ALL_ADMIN_POSTS_FAIL:
    case ALL_ADMIN_POSTS_MODERATE_POST_FAIL:
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
    case USER_POST_DETAILS_REQUEST:
    case MODERATOR_POST_DETAILS_REQUEST:
    case ADMIN_POST_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case POST_DETAILS_SUCCESS:
    case USER_POST_DETAILS_SUCCESS:
    case MODERATOR_POST_DETAILS_SUCCESS:
    case ADMIN_POST_DETAILS_SUCCESS:
      return {
        loading: false,
        post: action.payload,
      }

    case POST_DETAILS_FAIL:
    case USER_POST_DETAILS_FAIL:
    case MODERATOR_POST_DETAILS_FAIL:
    case ADMIN_POST_DETAILS_FAIL:
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
        posts: [],
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
    case DELETE_ADMIN_POST_REQUEST:
    case HIDE_USER_POST_REQUEST:
      return {
        ...state,
        postLoading: true,
      }

    case DELETE_USER_POST_SUCCESS:
    case DELETE_ADMIN_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
        isDeleted: true,
      }

    case HIDE_USER_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
        isHided: true,
      }

    case DELETE_USER_POST_FAIL:
    case DELETE_ADMIN_POST_FAIL:
      return {
        ...state,
        postLoading: false,
        postError: action.payload,
      }

    case HIDE_USER_POST_FAIL:
      return {
        ...state,
        postLoading: false,
        postError: action.payload,
      }

    case DELETE_USER_POST_RESET:
    case DELETE_ADMIN_POST_RESET:
      return {
        ...state,
        isDeleted: false,
      }

    case HIDE_USER_POST_RESET:
      return {
        ...state,
        isHided: false,
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
    case ADD_NEW_POST_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ADD_NEW_POST_SUCCESS:
    case ADD_NEW_POST_ADMIN_SUCCESS:
      return {
        loading: false,
        post: action.payload.data,
        isSuccess: action.payload.success,
      }
    case ADD_NEW_POST_RESET:
    case ADD_NEW_POST_ADMIN_RESET:
      return {
        ...state,
        loading: false,
        isSuccess: false,
      }
    case ADD_NEW_POST_FAIL:
    case ADD_NEW_POST_ADMIN_FAIL:
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
    case UPDATE_ADMIN_POST_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case POST_EDIT_SUCCESS:
    case UPDATE_ADMIN_POST_SUCCESS:
      return {
        loading: false,
        post: action.payload.data,
        isSuccess: action.payload.success,
      }
    case POST_EDIT_RESET:
    case UPDATE_ADMIN_POST_RESET:
      return {
        ...state,
        error: action.payload,
        isSuccess: false,
      }
    case POST_EDIT_FAIL:
    case UPDATE_ADMIN_POST_FAIL:
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

export const moderatorPostsReducer = (
  state = { moderatorPosts: [] },
  action
) => {
  switch (action.type) {
    case ALL_MODERATOR_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case ALL_MODERATOR_POSTS_SUCCESS:
      return {
        loading: false,
        moderatorPosts: action.payload.data,
      }

    case ALL_MODERATOR_POSTS_FAIL:
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

export const moderatorPostReducer = (state = {}, action) => {
  switch (action.type) {
    case MODERATOR_APPROVE_POST_REQUEST:
    case MODERATOR_REPORT_POST_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case MODERATOR_APPROVE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        isApproved: action.payload,
      }

    case MODERATOR_REPORT_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        isReported: action.payload,
      }

    case MODERATOR_APPROVE_POST_RESET:
      return {
        ...state,
        isApproved: false,
      }

    case MODERATOR_REPORT_POST_RESET:
      return {
        ...state,
        isReported: false,
      }

    case MODERATOR_APPROVE_POST_FAIL:
    case MODERATOR_REPORT_POST_FAIL:
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
