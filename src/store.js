import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { thunk } from 'redux-thunk'
import { authReducer, userReducer } from './reducers/userReducers'
import {
  postsReducer,
  postDetailsReducer,
  userPostsReducer,
  postEditReducer,
  newPostReducer,
} from './reducers/postReducers'
import {
  provinceReducer,
  districtReducer,
  wardReducer,
  googleGeoReducer,
} from './reducers/provinceReducer'
import { categoriesReducer } from './reducers/categoriesReducer'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = combineReducers({
  posts: postsReducer,
  postDetails: postDetailsReducer,
  userPosts: userPostsReducer,
  auth: authReducer,
  user: userReducer,
  province: provinceReducer,
  district: districtReducer,
  ward: wardReducer,
  googleGeo: googleGeoReducer,
  categories: categoriesReducer,
  postEdit: postEditReducer,
  newPost: newPostReducer,
})

const middleware = [thunk]
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
)

export default store
