import React from 'react'
import Channels from './channels'
import Settings from './settings'
import Users from './users'

const RigthNavigation = () => {
  return (
    <div className="w-64 bg-gray-700 bg-opacity-75 px-6 overflow-auto">
      <Settings />
      <Channels />
      <Users />
    </div>
  )
}

export default RigthNavigation
