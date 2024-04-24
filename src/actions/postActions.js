import axios from 'axios'

import {
  ALL_POSTS_REQUEST,
  ALL_POSTS_SUCCESS,
  ALL_POSTS_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  ALL_USER_POSTS_REQUEST,
  ALL_USER_POSTS_SUCCESS,
  ALL_USER_POSTS_FAIL,
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

// Get post details
export const getPostDetails = (slug) => async (dispatch) => {
  try {
    dispatch({ type: POST_DETAILS_REQUEST })

    const { data } = await axios.get(
      `https://boardinghouse-api.onrender.com/api/v1/posts/${slug}`
    )

    dispatch({
      type: POST_DETAILS_SUCCESS,
      payload: data.data.post,
    })
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Get all user's posts
export const getUserPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_POSTS_REQUEST })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(
      `https://boardinghouse-api.onrender.com/api/v1/posts/me`,
      config
    )

    dispatch({
      type: ALL_USER_POSTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ALL_USER_POSTS_FAIL,
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
