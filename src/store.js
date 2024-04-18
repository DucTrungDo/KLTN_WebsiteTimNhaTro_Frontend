import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { thunk } from 'redux-thunk'
import { authReducer, userReducer } from './reducers/userReducers'
import { postsReducer } from './reducers/postReducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
  user: userReducer,
})

const middleware = [thunk]
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
)

export default store
