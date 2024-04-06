import {
  REGISTER_USER_SAVE_TEMP_DATA,
  REGISTER_USER_SEND_OTP_REQUEST,
  REGISTER_USER_SEND_OTP_SUCCESS,
  REGISTER_USER_SEND_OTP_FAIL,
  REGISTER_USER_VERIFY_REQUEST,
  REGISTER_USER_VERIFY_SUCCESS,
  REGISTER_USER_VERIFY_FAIL,
  CLEAR_ERRORS,
} from '../constants/userConstants'

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REGISTER_USER_SAVE_TEMP_DATA:
      return {
        user: action.payload,
      }

    case REGISTER_USER_SEND_OTP_REQUEST:
    case REGISTER_USER_VERIFY_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case REGISTER_USER_SEND_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      }
    case REGISTER_USER_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null,
      }
    case REGISTER_USER_SEND_OTP_FAIL:
    case REGISTER_USER_VERIFY_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
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
