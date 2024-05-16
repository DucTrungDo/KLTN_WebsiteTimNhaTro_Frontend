import {
  REGISTER_USER_SEND_OTP_REQUEST,
  REGISTER_USER_SEND_OTP_SUCCESS,
  REGISTER_USER_SEND_OTP_FAIL,
  REGISTER_USER_VERIFY_REQUEST,
  REGISTER_USER_VERIFY_SUCCESS,
  REGISTER_USER_VERIFY_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
  FORGOT_PASSWORD_SEND_OTP_REQUEST,
  FORGOT_PASSWORD_SEND_OTP_SUCCESS,
  FORGOT_PASSWORD_SEND_OTP_FAIL,
  FORGOT_PASSWORD_VERIFY_OTP_REQUEST,
  FORGOT_PASSWORD_VERIFY_OTP_SUCCESS,
  FORGOT_PASSWORD_VERIFY_OTP_FAIL,
  FORGOT_PASSWORD_RESET_REQUEST,
  FORGOT_PASSWORD_RESET_SUCCESS,
  FORGOT_PASSWORD_RESET_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAIL,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAIL,
  UPDATE_PROFILE_USER_ADMIN_REQUEST,
  UPDATE_PROFILE_USER_ADMIN_SUCCESS,
  UPDATE_PROFILE_USER_ADMIN_RESET,
  UPDATE_PROFILE_USER_ADMIN_FAIL,
  BLOCK_USER_REQUEST,
  BLOCK_USER_SUCCESS,
  BLOCK_USER_RESET,
  BLOCK_USER_FAIL,
  UN_BLOCK_USER_REQUEST,
  UN_BLOCK_USER_SUCCESS,
  UN_BLOCK_USER_RESET,
  UN_BLOCK_USER_FAIL,
  GET_USER_ADMIN_REQUEST,
  GET_USER_ADMIN_SUCCESS,
  GET_USER_ADMIN_FAIL,
} from '../constants/userConstants'

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REGISTER_USER_SEND_OTP_REQUEST:
    case REGISTER_USER_VERIFY_REQUEST:
    case FORGOT_PASSWORD_SEND_OTP_REQUEST:
    case FORGOT_PASSWORD_VERIFY_OTP_REQUEST:
    case FORGOT_PASSWORD_RESET_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case REGISTER_USER_SEND_OTP_SUCCESS:
    case FORGOT_PASSWORD_SEND_OTP_SUCCESS:
    case FORGOT_PASSWORD_VERIFY_OTP_SUCCESS:
    case FORGOT_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      }
    case REGISTER_USER_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        user_temp: null,
        message: action.payload,
      }
    case REGISTER_USER_SEND_OTP_FAIL:
    case REGISTER_USER_VERIFY_FAIL:
    case FORGOT_PASSWORD_SEND_OTP_FAIL:
    case FORGOT_PASSWORD_VERIFY_OTP_FAIL:
    case FORGOT_PASSWORD_RESET_FAIL:
      return {
        ...state,
        loading: false,
        message: null,
        error: action.payload,
      }

    case LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      }

    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.code,
      }

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      }
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
      }
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      }
    case LOGOUT_FAIL:
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

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case BLOCK_USER_REQUEST:
    case UN_BLOCK_USER_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
    case BLOCK_USER_SUCCESS:
    case UN_BLOCK_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      }

    case UPDATE_PROFILE_RESET:
    case UPDATE_PROFILE_USER_ADMIN_RESET:
    case UPDATE_PASSWORD_RESET:
    case BLOCK_USER_RESET:
    case UN_BLOCK_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      }

    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case BLOCK_USER_FAIL:
    case UN_BLOCK_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case GET_ALL_USER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.data,
      }

    case GET_ALL_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case UPDATE_PROFILE_USER_ADMIN_REQUEST:
    case GET_USER_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_PROFILE_USER_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.data,
        isUpdated: true,
      }
    case GET_USER_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.data,
      }
    case UPDATE_PROFILE_USER_ADMIN_FAIL:
    case GET_USER_ADMIN_FAIL:
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
