import React from 'react'
import ChannelHeader from './channelHeader'
import ChatField from './chatField'
import Write from './write'

const MainWindow = () => {
  return (
    <div className="bg-white w-full">
      <ChannelHeader />
      <hr className="mt-3" />
      <ChatField />
      <hr />
      <Write />
    </div>
  )
}

export default MainWindow
