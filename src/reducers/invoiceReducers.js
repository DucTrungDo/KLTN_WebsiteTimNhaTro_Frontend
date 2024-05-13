import {
  USER_INVOICE_REQUEST,
  USER_INVOICE_SUCCESS,
  USER_INVOICE_FAIL,
  ALL_INVOICE_REQUEST,
  ALL_INVOICE_SUCCESS,
  ALL_INVOICE_FAIL,
  CLEAR_ERRORS,
} from '../constants/invoiceConstants'

export const invoicesReducer = (state = { invoices: [] }, action) => {
  switch (action.type) {
    case USER_INVOICE_REQUEST:
    case ALL_INVOICE_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case USER_INVOICE_SUCCESS:
    case ALL_INVOICE_SUCCESS:
      return {
        loading: false,
        invoices: action.payload.data,
      }

    case USER_INVOICE_FAIL:
    case ALL_INVOICE_FAIL:
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
