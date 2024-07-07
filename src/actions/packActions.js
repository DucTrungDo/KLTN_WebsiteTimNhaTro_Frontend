import axios from 'axios'
import {
  ALL_PACKS_REQUEST,
  ALL_PACKS_SUCCESS,
  ALL_PACKS_FAIL,
  ADMIN_ADD_PACK_REQUEST,
  ADMIN_ADD_PACK_SUCCESS,
  ADMIN_ADD_PACK_FAIL,
  ADMIN_UPDATE_PACK_REQUEST,
  ADMIN_UPDATE_PACK_SUCCESS,
  ADMIN_UPDATE_PACK_FAIL,
  ADMIN_DELETE_PACK_REQUEST,
  ADMIN_DELETE_PACK_SUCCESS,
  ADMIN_DELETE_PACK_FAIL,
  CLEAR_ERRORS,
} from '../constants/packConstants'

// Get all packs
export const getPacks = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PACKS_REQUEST })

    const { data } = await axios.get(
      `https://boardinghouse-api.onrender.com/api/v1/packs`
    )

    dispatch({
      type: ALL_PACKS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ALL_PACKS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Admin - Add pack
export const addPack =
  (token, name, description, priority, fee) => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_ADD_PACK_REQUEST })

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
        },
      }

      const { data } = await axios.post(
        `https://boardinghouse-api.onrender.com/api/v1/packs`,
        { name, description, priority, fee },
        config
      )
      dispatch({
        type: ADMIN_ADD_PACK_SUCCESS,
        payload: data.success,
      })
    } catch (error) {
      dispatch({
        type: ADMIN_ADD_PACK_FAIL,
        payload: error.response.data.message,
      })
    }
  }

// Admin - Update pack
export const updatePack =
  (token, packId, name, description, priority, fee) => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_UPDATE_PACK_REQUEST })

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.put(
        `https://boardinghouse-api.onrender.com/api/v1/packs/${packId}`,
        { name, description, priority, fee },
        config
      )

      dispatch({
        type: ADMIN_UPDATE_PACK_SUCCESS,
        payload: data.success,
      })
    } catch (error) {
      dispatch({
        type: ADMIN_UPDATE_PACK_FAIL,
        payload: error.response.data.message,
      })
    }
  }

// Admin - Delete pack
export const deletePack = (token, packId) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DELETE_PACK_REQUEST })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
    }

    const { data } = await axios.delete(
      `https://boardinghouse-api.onrender.com/api/v1/packs/${packId}`,
      config
    )

    dispatch({
      type: ADMIN_DELETE_PACK_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_PACK_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}
