import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { history } from '../redux'
import {
  updateNameField,
  updateLoginField,
  updatePasswordField,
  signUp,
  signIn
} from '../redux/reducers/auth'

const Registration = () => {
  const { name, password, email } = useSelector((s) => s.auth)
  const dispatch = useDispatch()
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const creatAccount = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('password')
      setConfirmPassword('')
    }
    if (email.indexOf('@') <= -1) {
      setError('email')
    }
    if (name === '') {
      setError('name')
    }
    if (password === confirmPassword && email.indexOf('@') >= -1 && name !== '') {
      dispatch(signUp())
      dispatch(signIn())
      setError('')
    }
  }
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            className="block border border-gray-600 w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Full Name"
            value={name}
            onChange={(e) => dispatch(updateNameField(e.target.value))}
          />

          <input
            type="text"
            className="block border border-gray-600 w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => dispatch(updateLoginField(e.target.value))}
          />

          <input
            type="password"
            className="block border border-gray-600 w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => dispatch(updatePasswordField(e.target.value))}
          />
          <input
            type="password"
            className="block border border-gray-600 w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error === 'password' && <p className="text-red-500 text-xs italic">Password eror</p>}
          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-500 focus:outline-none my-1"
            onClick={creatAccount}
          >
            Create Account
          </button>
        </div>

        <div className="text-gray-700 mt-6">
          Already have an account?
          <button
            type="button"
            className="no-underline border-b border-blue-700 text-blue-700 ml-1 outline-none"
            onClick={() => {
              history.push('/login')
            }}
          >
            Log in
          </button>
          .
        </div>
      </div>
    </div>
  )
}

export default Registration