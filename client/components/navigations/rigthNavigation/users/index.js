import React from 'react'
import User from './user'

const Users = () => {

  return (
    <div className="mt-4">
      <header className="flex justify-between font-lato text-gray-400 text-sm uppercase">
        <h1>Users</h1>
        <h6>82</h6>
      </header>
      <div>
        <User />
      </div>
    </div>
  )
}

export default Users
