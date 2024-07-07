import axios from 'axios'
import {
  ALL_USER_INVOICES_REQUEST,
  ALL_USER_INVOICES_SUCCESS,
  ALL_USER_INVOICES_FAIL,
  USER_INVOICE_DETAILS_REQUEST,
  USER_INVOICE_DETAILS_SUCCESS,
  USER_INVOICE_DETAILS_FAIL,
  USER_ADD_INVOICE_REQUEST,
  USER_ADD_INVOICE_SUCCESS,
  USER_ADD_INVOICE_FAIL,
  ALL_ADMIN_INVOICES_REQUEST,
  ALL_ADMIN_INVOICES_SUCCESS,
  ALL_ADMIN_INVOICES_FAIL,
  ADMIN_INVOICE_DETAILS_REQUEST,
  ADMIN_INVOICE_DETAILS_SUCCESS,
  ADMIN_INVOICE_DETAILS_FAIL,
  CLEAR_ERRORS,
} from '../constants/invoiceConstants'

// Get user's invoices - User
export const getUserInvoices = (token, page) => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_INVOICES_REQUEST })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
    }

    const { data } = await axios.get(
      `https://boardinghouse-api.onrender.com/api/v1/invoices/me?page=${page}`,
      config
    )

    dispatch({
      type: ALL_USER_INVOICES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ALL_USER_INVOICES_FAIL,
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
      dispatch({ type: USER_ADD_INVOICE_REQUEST })

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
        type: USER_ADD_INVOICE_SUCCESS,
        payload: data.success,
      })
    } catch (error) {
      dispatch({
        type: USER_ADD_INVOICE_FAIL,
        payload: error.response.data.message,
      })
    }
  }

// Get all invoices - Admin
export const getAllInvoices = (token, page) => async (dispatch) => {
  try {
    dispatch({ type: ALL_ADMIN_INVOICES_REQUEST })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
    }

    const { data } = await axios.get(
      `https://boardinghouse-api.onrender.com/api/v1/invoices?page=${page}`,
      config
    )

    dispatch({
      type: ALL_ADMIN_INVOICES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ALL_ADMIN_INVOICES_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Get invoice details - Admin
export const getInvoiceDetails = (token, id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_INVOICE_DETAILS_REQUEST })

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
      type: ADMIN_INVOICE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ADMIN_INVOICE_DETAILS_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}
