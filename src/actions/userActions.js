import axios from 'axios'
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

// Verify User for register
export const verifyRegister = (email, otp) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_VERIFY_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    console.log({ email, otp })
    const { data } = await axios.post(
      'https://boardinghouse-api.onrender.com/api/v1/auth/verify',
      { email, otp },
      config
    )

    dispatch({
      type: REGISTER_USER_VERIFY_SUCCESS,
      payload: data.user,
    })
  } catch (error) {
    dispatch({
      type: REGISTER_USER_VERIFY_FAIL,
      payload: error,
    })
  }
}

// Lưu email tạm thời để thực hiện quá trình xác thực tài khoản đăng ký
export const saveTempEmail = (email) => (dispatch) => {
  dispatch({
    type: REGISTER_USER_SAVE_TEMP_DATA,
    payload: { email },
  })
}

// Save temp user data for verify register
export const registerSendOTP = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_SEND_OTP_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      'https://boardinghouse-api.onrender.com/api/v1/auth/register',
      { name, email, password },
      config
    )

    dispatch({
      type: REGISTER_USER_SEND_OTP_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: REGISTER_USER_SEND_OTP_FAIL,
      payload: error.message,
    })
  }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}
