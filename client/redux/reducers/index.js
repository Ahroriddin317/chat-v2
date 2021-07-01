import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import chat from './chat'
import auth from './auth'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    chat,
    auth
  })

export default createRootReducer
