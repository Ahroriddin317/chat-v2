import React from 'react'
import Message from './message'

const ChatField = () => {
  return (
    <div className=" h-4/5 overflow-y-auto overflow-x-hidden px-5">
      <Message />
    </div>
  )
}

export default ChatField
