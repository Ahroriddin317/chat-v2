import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannelMessages } from '../../redux/reducers/chat'
import ChannelHeader from './channelHeader'
import ChatField from './chatField'
import Write from './write'

const MainWindow = () => {
  const dispatch = useDispatch()
  const { channel, workSpaces } = useSelector((s) => s.chat)
  useEffect(() => {
    if (channel.messages) dispatch(getChannelMessages(channel.id))
  }, [workSpaces, channel])
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
