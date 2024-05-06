import {
  ADD_TO_FARORITE,
  REMOVE_POST_FAVORITE,
} from '../constants/favoriteConstants'

export const favoriteReducer = (state = { favoritePosts: [] }, action) => {
  switch (action.type) {
    case ADD_TO_FARORITE:
      const post = action.payload

      const isPostExist = state.favoritePosts.find((i) => i.slug === post.slug)

      if (isPostExist) {
        return {
          ...state,
          favoritePosts: state.favoritePosts.map((i) =>
            i.slug === isPostExist.slug ? post : i
          ),
        }
      } else {
        return {
          ...state,
          favoritePosts: [...state.favoritePosts, post],
        }
      }

    case REMOVE_POST_FAVORITE:
      return {
        ...state,
        favoritePosts: state.favoritePosts.filter(
          (i) => i.slug !== action.payload
        ),
      }

    default:
      return state
  }
}
