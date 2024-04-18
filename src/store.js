import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { thunk } from 'redux-thunk'
import { authReducer } from './reducers/userReducers'
import { postsReducer } from './reducers/postReducers'
import {
  provinceReducer,
  districtReducer,
  wardReducer,
  googleGeoReducer,
} from './reducers/provinceReducer'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
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
