import React from 'react'

const User = ({ src, name }) => {
  return (
    <div className="flex items-center my-3">
      <div className="w-2 h-2 bg-green-600 rounded-full" />
      <button
        type="button"
        className="flex items-center ml-2 text-sm text-gray-300 focus:outline-none"
      >
        <img src={src} alt="user" className="h-8 w-8 rounded" />
        <h6 className="ml-3">{name}</h6>
      </button>
    </div>
  )
}

export default User
