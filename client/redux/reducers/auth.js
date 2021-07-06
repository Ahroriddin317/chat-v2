import Cookies from 'universal-cookie'
import axios from 'axios'
import { history } from '..'

const UPDATE_LOGIN = 'UPDATE_LOGIN'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const LOGIN = 'LOGIN'
const UPDATE_NAME = 'UPDATE_NAME'
const UPDATE_USER = 'UPDATE_USER'

const cookies = new Cookies()
const initialState = {
  email: '',
  password: '',
  name: '',
  token: cookies.get('token'),
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NAME:
      return { ...state, name: action.name }
    case UPDATE_LOGIN: {
      return { ...state, email: action.email }
    }
    case LOGIN:
      return { ...state, token: action.token, password: '', user: action.user }
    case UPDATE_PASSWORD: {
      return { ...state, password: action.password }
    }
    case UPDATE_USER:
      return { ...state, user: action.user }
    default:
      return state
  }
}

export function updateLoginField(email) {
  return { type: UPDATE_LOGIN, email }
}

export function updatePasswordField(password) {
  return { type: UPDATE_PASSWORD, password }
}

export function updateNameField(name) {
  return { type: UPDATE_NAME, name }
}

export function updateUser(user) {
  return { type: UPDATE_USER, user }
}

export function trySignIn() {
  return (dispatch) => {
    axios('/api/v1/auth').then(({data}) => {
      dispatch({ type: LOGIN, token: data.token, user: data.user })
      history.push('/private')
    })
  }
}

export function tryGetUserInfo() {
  return () => {
    axios('/api/v1/user-info').then((data) => {
      console.log(data)
    })
  }
}

export function signIn() {
  return (dispatch, getState) => {
    const { email, password } = getState().auth
    axios.post('/api/v1/auth', { email, password }).then(({data}) => {
      dispatch({ type: LOGIN, token: data.token, user: data.user })
      history.push('/private')
    })
  }
}

export function signUp() {
  return (_, getState) => {
    const { email, password, name } = getState().auth
    axios.post('/api/v1/registration', { email, password, name })
  }
}
