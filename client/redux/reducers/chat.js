import axios from 'axios'

const GET_WORK_SPACES = 'GET_WORK_SPACES'
const GET_WORK_SPACE = 'GET_WORK_SPACE'
const GET_USERS = 'GET_USERS'
const GET_CHANNEL = 'GET_CHANNEL'

const initialState = {
  users: [],
  workSpaces: [],
  workSpace: {},
  channel: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WORK_SPACES:
      return {
        ...state,
        workSpaces: action.workSpaces,
        workSpace: action.workSpaces[0],
        channel: action.workSpaces[0].channels[0]
      }
    case GET_WORK_SPACE:
      return { ...state, workSpace: action.workSpace }
    case GET_USERS:
      return { ...state, users: action.users }
    case GET_CHANNEL:
      return { ...state, channel: action.channel }

    default:
      return state
  }
}

export function getWorkSpaces() {
  return (dispatch) => {
    axios
      .get('http://localhost:8090/api/v1/getWorkSpaces/')
      .then(({ data: workSpaces }) => dispatch({ type: GET_WORK_SPACES, workSpaces }))
  }
}

export function getWorkSpace(workSpaceId) {
  return (dispatch, getState) => {
    const workSpace = getState().chat.workSpaces.find(({ id }) => id === workSpaceId)
    return dispatch({ type: GET_WORK_SPACE, workSpace })
  }
}

export function getUsers() {
  return (dispatch) => {
    axios
      .get('http://localhost:8090/api/v1/getUsers/')
      .then(({ data: users }) => dispatch({ type: GET_USERS, users }))
  }
}

export function getChannel(channelId) {
  return (dispatch, getState) => {
    const channel = getState().chat.workSpaces.channels.find(({ id }) => id === channelId)
    return dispatch({ type: GET_CHANNEL, channel })
  }
}
