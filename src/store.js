import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { thunk } from 'redux-thunk'
import { authReducer, userReducer } from './reducers/userReducers'
import {
  postsReducer,
  postDetailsReducer,
  userPostsReducer,
  userPostReducer,
  postEditReducer,
  newPostReducer,
  moderatorPostsReducer,
  moderatorPostReducer,
} from './reducers/postReducers'
import { favoriteReducer } from './reducers/favoriteReducers'
import {
  provinceReducer,
  districtReducer,
  wardReducer,
  googleGeoReducer,
} from './reducers/provinceReducer'
import { categoriesReducer, categoryReducer } from './reducers/categoryReducers'
import { invoicesReducer } from './reducers/invoiceReducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = combineReducers({
  posts: postsReducer,
  postDetails: postDetailsReducer,
  moderatorPosts: moderatorPostsReducer,
  moderatorPost: moderatorPostReducer,
  favorite: favoriteReducer,
  userPosts: userPostsReducer,
  userPost: userPostReducer,
  auth: authReducer,
  user: userReducer,
  invoices: invoicesReducer,
  province: provinceReducer,
  district: districtReducer,
  ward: wardReducer,
  googleGeo: googleGeoReducer,
  categories: categoriesReducer,
  category: categoryReducer,
  postEdit: postEditReducer,
  newPost: newPostReducer,
})

let initialState = {
  favorite: {
    favoritePosts: localStorage.getItem('favoritePosts')
      ? JSON.parse(localStorage.getItem('favoritePosts'))
      : [],
  },
}

const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
)

export default store
