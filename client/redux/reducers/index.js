import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import chat from './chat'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    chat
  })

export default createRootReducer
