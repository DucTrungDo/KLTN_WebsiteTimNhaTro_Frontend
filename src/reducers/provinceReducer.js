import {
  PROVINCE_REQUEST,
  PROVINCE_SUCCESS,
  PROVINCE_FAIL,
  PROVINCE_DISTRICT_REQUEST,
  PROVINCE_DISTRICT_SUCCESS,
  PROVINCE_DISTRICT_FAIL,
  PROVINCE_DISTRICT_WARD_REQUEST,
  PROVINCE_DISTRICT_WARD_SUCCESS,
  PROVINCE_DISTRICT_WARD_FAIL,
} from '../constants/provinceContants'
export const provinceReducer = (state = { provinces: [] }, action) => {
  switch (action.type) {
    case PROVINCE_REQUEST:
      return {
        loading: true,
        provinces: [],
      }

    case PROVINCE_SUCCESS:
      return {
        loading: false,
        provinces: action.payload.results,
      }

    case PROVINCE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
export const districtReducer = (state = { districts: [] }, action) => {
  switch (action.type) {
    case PROVINCE_DISTRICT_REQUEST:
      return {
        loading: true,
        districts: [],
      }

    case PROVINCE_DISTRICT_SUCCESS:
      return {
        loading: false,
        districts: action.payload.results,
      }

    case PROVINCE_DISTRICT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
export const wardReducer = (state = { wards: [] }, action) => {
  switch (action.type) {
    case PROVINCE_DISTRICT_WARD_REQUEST:
      return {
        loading: true,
        wards: [],
      }

    case PROVINCE_DISTRICT_WARD_SUCCESS:
      return {
        loading: false,
        wards: action.payload.results,
      }

    case PROVINCE_DISTRICT_WARD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
