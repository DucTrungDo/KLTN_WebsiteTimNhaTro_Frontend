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
} from '../constants/provinceContants'

export const getProvince = () => async (dispatch) => {
  try {
    dispatch({ type: PROVINCE_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(
      'https://vapi.vnappmob.com/api/province',
      config
    )

    dispatch({
      type: PROVINCE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PROVINCE_FAIL,
      payload: error.response.data.message,
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
      `https://vapi.vnappmob.com/api/province/district/${province_id}`,
      config
    )

    dispatch({
      type: PROVINCE_DISTRICT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PROVINCE_DISTRICT_FAIL,
      payload: error.response.data.message,
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
      `https://vapi.vnappmob.com/api/province/ward/${district_id}`,
      config
    )

    dispatch({
      type: PROVINCE_DISTRICT_WARD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PROVINCE_DISTRICT_WARD_FAIL,
      payload: error.response.data.message,
    })
  }
}
