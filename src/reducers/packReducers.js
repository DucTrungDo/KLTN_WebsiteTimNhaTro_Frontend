import {
  ALL_PACKS_REQUEST,
  ALL_PACKS_SUCCESS,
  ALL_PACKS_FAIL,
  ADMIN_ADD_PACK_REQUEST,
  ADMIN_ADD_PACK_SUCCESS,
  ADMIN_ADD_PACK_FAIL,
  ADMIN_ADD_PACK_RESET,
  ADMIN_UPDATE_PACK_REQUEST,
  ADMIN_UPDATE_PACK_SUCCESS,
  ADMIN_UPDATE_PACK_FAIL,
  ADMIN_UPDATE_PACK_RESET,
  ADMIN_DELETE_PACK_REQUEST,
  ADMIN_DELETE_PACK_SUCCESS,
  ADMIN_DELETE_PACK_FAIL,
  ADMIN_DELETE_PACK_RESET,
  CLEAR_ERRORS,
} from '../constants/packConstants'

export const packsReducer = (state = { packs: [] }, action) => {
  switch (action.type) {
    case ALL_PACKS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case ALL_PACKS_SUCCESS:
      return {
        loading: false,
        packs: action.payload.data,
      }

    case ALL_PACKS_FAIL:
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

export const packReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ADD_PACK_REQUEST:
    case ADMIN_UPDATE_PACK_REQUEST:
    case ADMIN_DELETE_PACK_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case ADMIN_ADD_PACK_SUCCESS:
      return {
        ...state,
        loading: false,
        isAdded: action.payload,
      }

    case ADMIN_UPDATE_PACK_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      }

    case ADMIN_DELETE_PACK_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      }

    case ADMIN_ADD_PACK_RESET:
      return {
        ...state,
        isAdded: false,
      }

    case ADMIN_UPDATE_PACK_RESET:
      return {
        ...state,
        isUpdated: false,
      }

    case ADMIN_DELETE_PACK_RESET:
      return {
        ...state,
        isDeleted: false,
      }

    case ADMIN_ADD_PACK_FAIL:
    case ADMIN_UPDATE_PACK_FAIL:
    case ADMIN_DELETE_PACK_FAIL:
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
