import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { io } from 'socket.io-client'

import rootReducer from './reducers'
import createHistory from './history'
import { updateWorkSpace, updateWorkSpaces } from './reducers/chat'

export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose

const composedEnhancers = composeFunc(applyMiddleware(...middleware), ...enhancers)

const store = createStore(rootReducer(history), initialState, composedEnhancers)
export const socket = io('/')
socket.on('connection', () => {
  console.log('hi')
})
socket.on('updateWorkSpaces', (workSpace) => {
  store.dispatch(updateWorkSpaces(workSpace))
  store.dispatch(updateWorkSpace(workSpace))
})

export default store
