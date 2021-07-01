import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { socket } from '../../redux/index'
import File from '../../assets/svg/file.svg'
import Voice from '../../assets/svg/voice.svg'
import Smile from '../../assets/svg/smile.svg'

const Write = () => {
  const [message, setMessage] = useState('')
  const { workSpace, channel } = useSelector((s) => s.chat)
  const { userId } = useSelector((s) => s.auth.user)
  const sendMessage = (e) => {
    e.preventDefault()
    socket.emit('message', { message, workSpaceId: workSpace.id, channelId: channel.id, userId})
    setMessage('')
  }
  return (
    <form className="flex justify-between items-center mt-6 px-5" onSubmit={sendMessage}>
      <button type="button" className="focus:outline-none">
        <File />
      </button>
      <button type="button" className="focus:outline-none">
        <Voice />
      </button>
      <input
        type="text"
        placeholder="Message in #general"
        className="w-11/12 h-5 focus:outline-none"
        value={message}
        onChange={({target}) => setMessage(target.value)}
      />
      <button type="button" className="focus:outline-none">
        <Smile />
      </button>
    </form>
  )
}

export default Write
