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
  RESET_USER_POST,
  DELETE_USER_POST_REQUEST,
  DELETE_USER_POST_SUCCESS,
  DELETE_USER_POST_FAIL,
  POST_EDIT_REQUEST,
  POST_EDIT_SUCCESS,
  POST_EDIT_FAIL,
  ADD_NEW_POST_REQUEST,
  ADD_NEW_POST_SUCCESS,
  ADD_NEW_POST_FAIL,
  ALL_UNAPPROVED_POSTS_REQUEST,
  ALL_UNAPPROVED_POSTS_SUCCESS,
  ALL_UNAPPROVED_POSTS_FAIL,
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

// Get all user's posts (User)
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

// Reset user's posts
export const resetUserPosts = () => async (dispatch) => {
  dispatch({
    type: RESET_USER_POST,
  })
}

// Delete user's post (User)
export const deleteUserPost = (slug, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_POST_REQUEST })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.delete(
      `https://boardinghouse-api.onrender.com/api/v1/posts/${slug}/me`,
      config
    )

    dispatch({
      type: DELETE_USER_POST_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: DELETE_USER_POST_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Edit user's post (User)
export const editPost = (token, slug, post) => async (dispatch) => {
  try {
    dispatch({ type: POST_EDIT_REQUEST })
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
    }
    const { data } = await axios.put(
      `https://boardinghouse-api.onrender.com/api/v1/posts/${slug}/me`,
      post,
      config
    )
    dispatch({
      type: POST_EDIT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_EDIT_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Add new post (User)
export const newPost = (token, post) => async (dispatch) => {
  try {
    dispatch({ type: ADD_NEW_POST_REQUEST })
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
    }

    const { data } = await axios.post(
      `https://boardinghouse-api.onrender.com/api/v1/posts/me`,
      post,
      config
    )
    dispatch({
      type: ADD_NEW_POST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ADD_NEW_POST_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Get all unapproved post (Moderator)
export const getUnapprovedPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: ALL_UNAPPROVED_POSTS_REQUEST })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
    }

    const { data } = await axios.get(
      `https://boardinghouse-api.onrender.com/api/v1/posts/moderators`,
      config
    )

    dispatch({
      type: ALL_UNAPPROVED_POSTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ALL_UNAPPROVED_POSTS_FAIL,
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
