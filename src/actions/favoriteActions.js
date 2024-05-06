import axios from 'axios'
import {
  ADD_TO_FARORITE,
  REMOVE_POST_FAVORITE,
} from '../constants/favoriteConstants'

export const addPostToFavorite = (slug) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `https://boardinghouse-api.onrender.com/api/v1/posts/${slug}`
  )

  dispatch({
    type: ADD_TO_FARORITE,
    payload: data.data.post,
  })

  localStorage.setItem(
    'favoritePosts',
    JSON.stringify(getState().favorite.favoritePosts)
  )
}

export const removePostFromFavorite = (slug) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_POST_FAVORITE,
    payload: slug,
  })

  localStorage.setItem(
    'favoritePosts',
    JSON.stringify(getState().favorite.favoritePosts)
  )
}
