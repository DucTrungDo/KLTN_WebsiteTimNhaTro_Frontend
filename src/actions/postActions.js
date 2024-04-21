import axios from 'axios'

import {
  ALL_POSTS_REQUEST,
  ALL_POSTS_SUCCESS,
  ALL_POSTS_FAIL,
  CLEAR_ERRORS,
} from '../constants/postConstants'

// Get all posts
export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_POSTS_REQUEST })

    let link = `https://boardinghouse-api.onrender.com/api/v1/posts`

    const { data } = await axios.get(link)

    dispatch({
      type: ALL_POSTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ALL_POSTS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}
