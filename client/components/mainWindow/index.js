import React from 'react'
import ChannelHeader from './channelHeader'
import ChatField from './chatField'

const MainWindow = () => {
  return (
    <div className="bg-white w-full">
      <ChannelHeader />
      <hr className="mt-3" />
      <ChatField />
    </div>
  )
}

export default MainWindow
