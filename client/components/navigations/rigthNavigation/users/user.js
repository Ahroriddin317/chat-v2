import React from 'react'

const User = () => {
  return (
    <div className="flex items-center my-3">
      <div className="w-2 h-2 bg-green-600 rounded-full" />
      <button
        type="button"
        className="flex items-center ml-2 text-sm text-gray-300 focus:outline-none"
      >
        <img src="/images/user.png" alt="user" />
        <h6 className="ml-3">Orlando Diggs</h6>
      </button>
    </div>
  )
}

export default User
