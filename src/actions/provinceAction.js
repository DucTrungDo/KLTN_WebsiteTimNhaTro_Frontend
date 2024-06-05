import axios from 'axios'

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
import { GOOGLE_MAPS_APT_KEY } from '../../src/env'
export const getProvince = () => async (dispatch) => {
  try {
    dispatch({ type: PROVINCE_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(
      'https://esgoo.net/api-tinhthanh/1/0.htm',
      config
    )

    dispatch({
      type: PROVINCE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PROVINCE_FAIL,
      payload: error.message,
    })
  }
}
export const getdistrict = (province_id) => async (dispatch) => {
  try {
    dispatch({ type: PROVINCE_DISTRICT_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(
      `https://esgoo.net/api-tinhthanh/2/${province_id}.htm`,
      config
    )

    dispatch({
      type: PROVINCE_DISTRICT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PROVINCE_DISTRICT_FAIL,
      payload: error.message,
    })
  }
}
export const getWard = (district_id) => async (dispatch) => {
  try {
    dispatch({ type: PROVINCE_DISTRICT_WARD_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(
      `https://esgoo.net/api-tinhthanh/3/${district_id}.htm`,
      config
    )

    dispatch({
      type: PROVINCE_DISTRICT_WARD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PROVINCE_DISTRICT_WARD_FAIL,
      payload: error.message,
    })
  }
}
export const getlocation = (lat, lng, key) => async (dispatch) => {
  try {
    dispatch({ type: API_GOOGLE_GEO_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_APT_KEY}`,
      config
    )

    dispatch({
      type: API_GOOGLE_GEO_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: API_GOOGLE_GEO_FAIL,
      payload: error.response.data.message,
    })
  }
}
