import axios from 'axios'
import {
  USER_INVOICE_REQUEST,
  USER_INVOICE_SUCCESS,
  USER_INVOICE_FAIL,
  USER_INVOICE_DETAILS_REQUEST,
  USER_INVOICE_DETAILS_SUCCESS,
  USER_INVOICE_DETAILS_FAIL,
  ADD_USER_INVOICE_REQUEST,
  ADD_USER_INVOICE_SUCCESS,
  ADD_USER_INVOICE_FAIL,
  ALL_INVOICE_REQUEST,
  ALL_INVOICE_SUCCESS,
  ALL_INVOICE_FAIL,
  INVOICE_DETAILS_REQUEST,
  INVOICE_DETAILS_SUCCESS,
  INVOICE_DETAILS_FAIL,
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

// Get user's invoice details - User
export const getUserInvoiceDetails = (token, id) => async (dispatch) => {
  try {
    dispatch({ type: USER_INVOICE_DETAILS_REQUEST })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
    }

    const { data } = await axios.get(
      `https://boardinghouse-api.onrender.com/api/v1/invoices/${id}/me`,
      config
    )

    dispatch({
      type: USER_INVOICE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_INVOICE_DETAILS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Add new invoice - User
export const addNewInvoice =
  (token, postId, packId, fee, method) => async (dispatch) => {
    try {
      dispatch({ type: ADD_USER_INVOICE_REQUEST })

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
        },
      }

      const { data } = await axios.post(
        `https://boardinghouse-api.onrender.com/api/v1/invoices/me`,
        { postId, packId, fee, method },
        config
      )

      dispatch({
        type: ADD_USER_INVOICE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ADD_USER_INVOICE_FAIL,
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

// Get invoice details - Admin
export const getInvoiceDetails = (token, id) => async (dispatch) => {
  try {
    dispatch({ type: INVOICE_DETAILS_REQUEST })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
    }

    const { data } = await axios.get(
      `https://boardinghouse-api.onrender.com/api/v1/invoices/${id}`,
      config
    )

    dispatch({
      type: INVOICE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: INVOICE_DETAILS_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}
