import React from 'react'
import { useSelector } from 'react-redux'
import Message from './message'

const ChatField = () => {
  const { channelMessages } = useSelector((s) => s.chat)
  return (
    <div className=" h-4/5 overflow-y-auto overflow-x-hidden px-5">
      {channelMessages.map(({ messageId, name, timeZone, text, image }) => {
        return <Message key={messageId} name={name} date={timeZone} text={text} image={image} />
      })}
    </div>
  )
}

export default ChatField
