import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  CLEAR_ERRORS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from '../constants/userContants';
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      'https://boardinghouse-api.onrender.com/api/v1/auth/login',
      { email, password },
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load user
export const loadUser = (token) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
    };

    const { data } = await axios.get(
      'https://boardinghouse-api.onrender.com/api/v1/users/me',
      config // Truyền config chứa thông tin header vào hàm axios.get
    );

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.message,
    });
  }
};

// Logout user
export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
