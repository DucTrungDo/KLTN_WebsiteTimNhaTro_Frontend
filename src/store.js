import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { thunk } from 'redux-thunk'
import { authReducer, userReducer } from './reducers/userReducers'
import {
  postsReducer,
  postDetailsReducer,
  userPostsReducer,
  userPostReducer,
} from './reducers/postReducers'
import {
  provinceReducer,
  districtReducer,
  wardReducer,
  googleGeoReducer,
} from './reducers/provinceReducer'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = combineReducers({
  posts: postsReducer,
  postDetails: postDetailsReducer,
  userPosts: userPostsReducer,
  userPost: userPostReducer,
  auth: authReducer,
  user: userReducer,
  province: provinceReducer,
  district: districtReducer,
  ward: wardReducer,
  googleGeo: googleGeoReducer,
})

const middleware = [thunk]
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
)

export default store
