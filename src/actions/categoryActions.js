import axios from 'axios'
import {
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
  ALL_CATEGORIES_FAIL,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  CLEAR_ERRORS,
} from '../constants/categoryConstants'

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORIES_REQUEST })

    const { data } = await axios.get(
      `https://boardinghouse-api.onrender.com/api/v1/categories`
    )

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

// Admin - Add category
export const addCategory = (token, name) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CATEGORY_REQUEST })
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
    }

    const { data } = await axios.post(
      `https://boardinghouse-api.onrender.com/api/v1/categories`,
      { name },
      config
    )
    dispatch({
      type: ADD_CATEGORY_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: ADD_CATEGORY_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Admin - Update category
export const updateCategory =
  (token, categoryId, categoryName) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_CATEGORY_REQUEST })

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.put(
        `https://boardinghouse-api.onrender.com/api/v1/categories/${categoryId}`,
        { name: categoryName },
        config
      )

      dispatch({
        type: UPDATE_CATEGORY_SUCCESS,
        payload: data.success,
      })
    } catch (error) {
      dispatch({
        type: UPDATE_CATEGORY_FAIL,
        payload: error.response.data.message,
      })
    }
  }

// Admin - Delete category
export const deleteCategory = (token, categoryId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
    }

    const { data } = await axios.delete(
      `https://boardinghouse-api.onrender.com/api/v1/categories/${categoryId}`,
      config
    )

    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}
