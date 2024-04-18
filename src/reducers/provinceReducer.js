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
  API_GOOGLE_GEO_REQUEST,
  API_GOOGLE_GEO_SUCCESS,
  API_GOOGLE_GEO_FAIL,
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
export const googleGeoReducer = (state = { Geos: [] }, action) => {
  switch (action.type) {
    case API_GOOGLE_GEO_REQUEST:
      return {
        loading: true,
        Geos: [],
      }

    case API_GOOGLE_GEO_SUCCESS:
      return {
        loading: false,
        Geos: action.payload.results,
      }

    case API_GOOGLE_GEO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
