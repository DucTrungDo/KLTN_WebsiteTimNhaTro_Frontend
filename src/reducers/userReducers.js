import {
  REGISTER_USER_SAVE_TEMP_DATA,
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
} from '../constants/userConstants'

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REGISTER_USER_SAVE_TEMP_DATA:
      return {
        user_temp: action.payload,
      }

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
