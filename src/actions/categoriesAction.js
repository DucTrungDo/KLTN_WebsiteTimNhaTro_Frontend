import axios from 'axios'
import {
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
  ALL_CATEGORIES_FAIL,
  CLEAR_ERRORS,
} from '../constants/categoryConstants'

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORIES_REQUEST })

    let link = `https://boardinghouse-api.onrender.com/api/v1/categories`

    const { data } = await axios.get(link)

    dispatch({
      type: ALL_CATEGORIES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ALL_CATEGORIES_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}
