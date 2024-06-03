import axios from 'axios'

import {
  ALL_POSTS_REQUEST,
  ALL_POSTS_SUCCESS,
  ALL_POSTS_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  USER_POST_DETAILS_REQUEST,
  USER_POST_DETAILS_SUCCESS,
  USER_POST_DETAILS_FAIL,
  MODERATOR_POST_DETAILS_REQUEST,
  MODERATOR_POST_DETAILS_SUCCESS,
  MODERATOR_POST_DETAILS_FAIL,
  ADMIN_POST_DETAILS_REQUEST,
  ADMIN_POST_DETAILS_SUCCESS,
  ADMIN_POST_DETAILS_FAIL,
  ALL_USER_POSTS_REQUEST,
  ALL_USER_POSTS_SUCCESS,
  ALL_USER_POSTS_FAIL,
  RESET_USER_POST,
  HIDE_USER_POST_REQUEST,
  HIDE_USER_POST_SUCCESS,
  HIDE_USER_POST_FAIL,
  DELETE_USER_POST_REQUEST,
  DELETE_USER_POST_SUCCESS,
  DELETE_USER_POST_FAIL,
  POST_EDIT_REQUEST,
  POST_EDIT_SUCCESS,
  POST_EDIT_FAIL,
  ADD_NEW_POST_REQUEST,
  ADD_NEW_POST_SUCCESS,
  ADD_NEW_POST_FAIL,
  ALL_MODERATOR_POSTS_REQUEST,
  ALL_MODERATOR_POSTS_SUCCESS,
  ALL_MODERATOR_POSTS_FAIL,
  MODERATOR_APPROVE_POST_REQUEST,
  MODERATOR_APPROVE_POST_SUCCESS,
  MODERATOR_APPROVE_POST_FAIL,
  MODERATOR_REPORT_POST_REQUEST,
  MODERATOR_REPORT_POST_SUCCESS,
  MODERATOR_REPORT_POST_FAIL,
  DELETE_ADMIN_POST_REQUEST,
  DELETE_ADMIN_POST_SUCCESS,
  DELETE_ADMIN_POST_FAIL,
  UPDATE_ADMIN_POST_REQUEST,
  UPDATE_ADMIN_POST_SUCCESS,
  UPDATE_ADMIN_POST_FAIL,
  ADD_NEW_POST_ADMIN_REQUEST,
  ADD_NEW_POST_ADMIN_SUCCESS,
  ADD_NEW_POST_ADMIN_FAIL,
  ALL_ADMIN_POSTS_REQUEST,
  ALL_ADMIN_POSTS_SUCCESS,
  ALL_ADMIN_POSTS_FAIL,
  ALL_ADMIN_POSTS_MODERATE_POST_REQUEST,
  ALL_ADMIN_POSTS_MODERATE_POST_SUCCESS,
  ALL_ADMIN_POSTS_MODERATE_POST_FAIL,
  CLEAR_ERRORS,
} from '../constants/postConstants'

// Get all posts
export const getPosts = (currentPage, FilterData) => async (dispatch) => {
  try {
    console.log(FilterData)
    dispatch({ type: ALL_POSTS_REQUEST })
    let link = `https://boardinghouse-api.onrender.com/api/v1/posts?page=${currentPage}`

    if (JSON.stringify(FilterData) !== '{}') {
      link =
        link +
        `&minPrice=${FilterData.minPrice}&maxPrice=${FilterData.maxPrice}&minArea=${FilterData.minArea}&maxArea=${FilterData.maxArea}&city=${FilterData.province}&district=${FilterData.district}&ward=${FilterData.ward}`
    }

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

// Get user's post details (User)
export const getUserPostDetails = (slug, token) => async (dispatch) => {
  try {
    dispatch({ type: USER_POST_DETAILS_REQUEST })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(
      `https://boardinghouse-api.onrender.com/api/v1/posts/${slug}/me`,
      config
    )

    dispatch({
      type: USER_POST_DETAILS_SUCCESS,
      payload: data.data.post,
    })
  } catch (error) {
    dispatch({
      type: USER_POST_DETAILS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Get user's post details (Moderator)
export const getPostDetailsByModerator = (slug, token) => async (dispatch) => {
  try {
    dispatch({ type: MODERATOR_POST_DETAILS_REQUEST })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(
      `https://boardinghouse-api.onrender.com/api/v1/posts/${slug}/moderator`,
      config
    )

    dispatch({
      type: MODERATOR_POST_DETAILS_SUCCESS,
      payload: data.data.post,
    })
  } catch (error) {
    dispatch({
      type: MODERATOR_POST_DETAILS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Get user's post details (Admin)
export const getPostDetailsByAdmin = (slug, token) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_POST_DETAILS_REQUEST })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(
      `https://boardinghouse-api.onrender.com/api/v1/posts/${slug}/admin`,
      config
    )

    dispatch({
      type: ADMIN_POST_DETAILS_SUCCESS,
      payload: data.data.post,
    })
  } catch (error) {
    dispatch({
      type: ADMIN_POST_DETAILS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Get all user's posts (User)
export const getUserPosts =
  (token, currentPage, FilterData) => async (dispatch) => {
    try {
      dispatch({ type: ALL_USER_POSTS_REQUEST })

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await axios.get(
        `https://boardinghouse-api.onrender.com/api/v1/posts/me?page=${currentPage}&search=${FilterData.search}&categoryId=${FilterData.categoryId}&city=${FilterData.province}&district=${FilterData.district}&tab=${FilterData.tab}`,
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

// Hide user's post (User)
export const hideUserPost = (slug, token) => async (dispatch) => {
  try {
    dispatch({ type: HIDE_USER_POST_REQUEST })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.patch(
      `https://boardinghouse-api.onrender.com/api/v1/posts/${slug}/hide/me`,
      {},
      config
    )

    dispatch({
      type: HIDE_USER_POST_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: HIDE_USER_POST_FAIL,
      payload: error.response.data.message,
    })
  }
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

// Get all post (Moderator)
export const getModeratorPosts =
  (token, currentPage, FilterData) => async (dispatch) => {
    try {
      dispatch({ type: ALL_MODERATOR_POSTS_REQUEST })

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
        },
      }

      const { data } = await axios.get(
        `https://boardinghouse-api.onrender.com/api/v1/posts/moderators?page=${currentPage}&search=${FilterData.search}&categoryId=${FilterData.categoryId}&city=${FilterData.province}&district=${FilterData.district}&tab=${FilterData.tab}&moderatedFilter=${FilterData.moderatedFilter}`,
        config
      )

      dispatch({
        type: ALL_MODERATOR_POSTS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ALL_MODERATOR_POSTS_FAIL,
        payload: error.response.data.message,
      })
    }
  }

// Approve post (Moderator)
export const approvePost = (slug, token) => async (dispatch) => {
  try {
    dispatch({ type: MODERATOR_APPROVE_POST_REQUEST })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.patch(
      `https://boardinghouse-api.onrender.com/api/v1/posts/${slug}/approved`,
      {},
      config
    )

    dispatch({
      type: MODERATOR_APPROVE_POST_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: MODERATOR_APPROVE_POST_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Report violating post (Moderator)
export const reportViolatingPost =
  (slug, token, violation) => async (dispatch) => {
    try {
      dispatch({ type: MODERATOR_REPORT_POST_REQUEST })

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await axios.patch(
        `https://boardinghouse-api.onrender.com/api/v1/posts/${slug}/violated`,
        { violation },
        config
      )

      dispatch({
        type: MODERATOR_REPORT_POST_SUCCESS,
        payload: data.success,
      })
    } catch (error) {
      dispatch({
        type: MODERATOR_REPORT_POST_FAIL,
        payload: error.response.data.message,
      })
    }
  }

// Delete post (Admin)
export const deleteAdminPost = (token, slug) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ADMIN_POST_REQUEST })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.delete(
      `https://boardinghouse-api.onrender.com/api/v1/posts/${slug}`,
      {},
      config
    )

    dispatch({
      type: DELETE_ADMIN_POST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DELETE_ADMIN_POST_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Edit post user Admin
export const editPostAdmin = (token, slug, post) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ADMIN_POST_REQUEST })
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
    }
    const { data } = await axios.put(
      `https://boardinghouse-api.onrender.com/api/v1/posts/${slug}`,
      post,
      config
    )
    dispatch({
      type: UPDATE_ADMIN_POST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_ADMIN_POST_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Add new post (Admin)
export const newPostAdmin = (token, post) => async (dispatch) => {
  try {
    dispatch({ type: ADD_NEW_POST_ADMIN_REQUEST })
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
    }

    const { data } = await axios.post(
      `https://boardinghouse-api.onrender.com/api/v1/posts`,
      post,
      config
    )
    dispatch({
      type: ADD_NEW_POST_ADMIN_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ADD_NEW_POST_ADMIN_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Get all posts ADMIN
export const getPostsAdmin =
  (token, currentPage, FilterData) => async (dispatch) => {
    try {
      dispatch({ type: ALL_ADMIN_POSTS_REQUEST })

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
        },
      }

      const { data } = await axios.get(
        `https://boardinghouse-api.onrender.com/api/v1/posts/admin?page=${currentPage}&search=${FilterData.search}&categoryId=${FilterData.categoryId}&city=${FilterData.province}&district=${FilterData.district}&tab=${FilterData.tab}`,
        config
      )

      dispatch({
        type: ALL_ADMIN_POSTS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ALL_ADMIN_POSTS_FAIL,
        payload: error.response.data.message,
      })
    }
  }
// Get all posts ADMIN Moderate
export const getPostsAdminModerate =
  (token, currentPage, FilterData) => async (dispatch) => {
    try {
      dispatch({ type: ALL_ADMIN_POSTS_MODERATE_POST_REQUEST })
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
        },
      }

      const { data } = await axios.get(
        `https://boardinghouse-api.onrender.com/api/v1/posts/admin/moderators?page=${currentPage}&search=${FilterData.search}&categoryId=${FilterData.categoryId}&city=${FilterData.province}&district=${FilterData.district}&tab=${FilterData.tab}&moderatedFilter=${FilterData.moderatedFilter}`,
        config
      )

      dispatch({
        type: ALL_ADMIN_POSTS_MODERATE_POST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ALL_ADMIN_POSTS_MODERATE_POST_FAIL,
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
