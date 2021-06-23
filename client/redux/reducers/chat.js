import axios from 'axios'

const GET_WORK_SPACES = 'GET_WORK_SPACES'
const GET_WORK_SPACE = 'GET_WORK_SPACE'
const GET_USERS = 'GET_USERS'
const GET_CHANNEL = 'GET_CHANNEL'
const GET_CHANNEL_MESSAGES = 'GET_CHANNEL_MESSAGES'
const UPDATE_WORK_SPACES = 'UPDATE_WORK_SPACES'
const UPDATE_WORK_SPACE = 'UPDATE_WORK_sPACE'

const initialState = {
  users: [],
  workSpaces: [],
  workSpace: {},
  channel: {},
  channelMessages: []
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
    case GET_CHANNEL_MESSAGES:
      return { ...state, channelMessages: action.messages }
    case UPDATE_WORK_SPACES:
      return { ...state, workSpaces: action.workSpaces }

    case UPDATE_WORK_SPACE:
      return { ...state, workSpace: action.workSpace }

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
    const channel = getState().chat.workSpace.channels.find(({ id }) => id === channelId)
    return dispatch({ type: GET_CHANNEL, channel })
  }
}

export function getChannelMessages(channelId) {
  return (dispatch, getState) => {
    const channel = getState().chat.workSpace.channels.find(({id}) => id === channelId)
    const messages = channel.messages.reduce((initState, message) => {
      const user = getState().chat.users.find((usr) => usr.userId === message.userId)
      return [
        ...initState,
        {
          ...message,
          name: user.name,
          image: user.image,
          userName: user.userName,
          email: user.email,
          tymeZona: user.tymeZona
        }
      ]
    }, [])
    return dispatch({ type: GET_CHANNEL_MESSAGES, messages })
  }
}

export function updateWorkSpaces(workSpace) {
  return (dispatch, getState) => {
   const workSpaces = getState().chat.workSpaces.map((item) => {
    if(item.id === workSpace.id) {
      return workSpace
    }
   return item
  })
  return dispatch({ type: UPDATE_WORK_SPACES, workSpaces })
  }
}

export function updateWorkSpace(workSpace) {
  return { type: UPDATE_WORK_SPACE, workSpace }
}