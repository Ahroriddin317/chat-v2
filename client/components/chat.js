import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUsers, getWorkSpaces } from '../redux/reducers/chat'
import MainWindow from './mainWindow'
import Navigations from './navigations'

const Chat = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsers())
    dispatch(getWorkSpaces())
  }, [])
  return (
    <div className="flex w-screen h-screen bg-body-bg overflow-hidden">
      <Navigations />
      <MainWindow />
    </div>
  )
}

export default Chat
