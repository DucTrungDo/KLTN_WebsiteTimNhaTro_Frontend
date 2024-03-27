import { createStore, applyMiddleware, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { postsReducer } from './reducers/postReducers'

const reducer = combineReducers({
  posts: postsReducer, 
})

const middleware = [thunk]
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
