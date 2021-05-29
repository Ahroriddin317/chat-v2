import React from 'react'
import { useSelector } from 'react-redux'
import User from './user'

const Users = () => {
  const { usersId } = useSelector((s) => s.chat.workSpace)
  const { users } = useSelector((s) => s.chat)
  return (
    <div className="mt-4">
      <header className="flex justify-between font-lato text-gray-400 text-sm uppercase">
        <h1>Users</h1>
        <h6>{usersId ? usersId.length : 0}</h6>
      </header>
      <div>
        {users && users.length !== 0
          ? users.map(({ userId, image, name }) => {
              return <User key={userId} src={image} name={name} />
            })
          : 'loading'}
      </div>
    </div>
  )
}

export default Users
