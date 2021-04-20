import React from 'react'
import MainWindow from './mainWindow'
import Navigations from './navigations'

const Chat = () => {
  return (
    <div className="flex w-screen h-screen bg-body-bg overflow-hidden">
      <Navigations/>
      <MainWindow/>
    </div>
  )
}

export default Chat