import axios from 'axios'
import {
  USER_INVOICE_REQUEST,
  USER_INVOICE_SUCCESS,
  USER_INVOICE_FAIL,
  ALL_INVOICE_REQUEST,
  ALL_INVOICE_SUCCESS,
  ALL_INVOICE_FAIL,
  CLEAR_ERRORS,
} from '../constants/invoiceConstants'

// Get user's invoices - User
export const getUserInvoices = (token) => async (dispatch) => {
  try {
    dispatch({ type: USER_INVOICE_REQUEST })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
    }

    const { data } = await axios.get(
      `https://boardinghouse-api.onrender.com/api/v1/invoices/me`,
      config
    )

    dispatch({
      type: USER_INVOICE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_INVOICE_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Get all invoices - Admin
export const getAllInvoices = (token) => async (dispatch) => {
  try {
    dispatch({ type: ALL_INVOICE_REQUEST })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
    }

    const { data } = await axios.get(
      `https://boardinghouse-api.onrender.com/api/v1/invoices`,
      config
    )

    dispatch({
      type: ALL_INVOICE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ALL_INVOICE_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}
