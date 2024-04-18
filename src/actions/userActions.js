import axios from 'axios'
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
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
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
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: REGISTER_USER_VERIFY_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Save the email temporarily to perform the registration account authentication process
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
      payload: error.response.data.message,
    })
  }
}

// User Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      'https://boardinghouse-api.onrender.com/api/v1/auth/login',
      { email, password },
      config
    )
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.data,
    })
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Load user
export const loadUser = (token) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
    }

    const { data } = await axios.get(
      'https://boardinghouse-api.onrender.com/api/v1/users/me',
      config // Truyền config chứa thông tin header vào hàm axios.get
    )

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.data,
    })
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.message,
    })
  }
}

// Logout user
export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
    })
  }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}

// Send Otp when perform Fogot password
export const forgotPasswordSendOtp = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_SEND_OTP_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      'https://boardinghouse-api.onrender.com/api/v1/auth/password/forgot',
      { email },
      config
    )
    dispatch({
      type: FORGOT_PASSWORD_SEND_OTP_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_SEND_OTP_FAIL,
      payload: error.message,
    })
  }
}

// Verify Otp when perform Fogot password
export const forgotPasswordVerifyOtp = (email, otp) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_VERIFY_OTP_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      'https://boardinghouse-api.onrender.com/api/v1/auth/password/verify',
      { email, otp },
      config
    )
    dispatch({
      type: FORGOT_PASSWORD_VERIFY_OTP_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_VERIFY_OTP_FAIL,
      payload: error.message,
    })
  }
}

// Reset password after verify success
export const forgotPasswordReset =
  (email, otp, password) => async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_RESET_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        'https://boardinghouse-api.onrender.com/api/v1/auth/password/reset',
        { email, otp, password },
        config
      )
      dispatch({
        type: FORGOT_PASSWORD_RESET_SUCCESS,
        payload: data.message,
      })
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_RESET_FAIL,
        payload: error.message,
      })
    }
  }

// Update profile
export const updateProfile = (token, name) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.put(
      'https://boardinghouse-api.onrender.com/api/v1/users/me',
      { name },
      config
    )

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Update password
export const updatePassword =
  (token, oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST })

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.patch(
        'https://boardinghouse-api.onrender.com/api/v1/users/me/password',
        { oldPassword, newPassword },
        config
      )

      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data.success,
      })
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      })
    }
  }
