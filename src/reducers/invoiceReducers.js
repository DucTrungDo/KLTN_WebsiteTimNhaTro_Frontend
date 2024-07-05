import { faL } from '@fortawesome/free-solid-svg-icons'
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

export const invoicesReducer = (state = { invoices: [] }, action) => {
  switch (action.type) {
    case ALL_USER_INVOICES_REQUEST:
    case ALL_ADMIN_INVOICES_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case ALL_USER_INVOICES_SUCCESS:
    case ALL_ADMIN_INVOICES_SUCCESS:
      return {
        loading: false,
        invoices: action.payload.data,
      }

    case ALL_USER_INVOICES_FAIL:
    case ALL_ADMIN_INVOICES_FAIL:
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

export const invoiceReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADD_INVOICE_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case USER_ADD_INVOICE_SUCCESS:
      return {
        ...state,
        loading: true,
        isAdded: action.payload,
      }

    case USER_ADD_INVOICE_FAIL:
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

export const invoiceDetailsReducer = (state = { invoice: {} }, action) => {
  switch (action.type) {
    case USER_INVOICE_DETAILS_REQUEST:
    case ADMIN_INVOICE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case USER_INVOICE_DETAILS_SUCCESS:
    case ADMIN_INVOICE_DETAILS_SUCCESS:
      return {
        loading: false,
        invoice: action.payload,
      }

    case USER_INVOICE_DETAILS_FAIL:
    case ADMIN_INVOICE_DETAILS_FAIL:
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
