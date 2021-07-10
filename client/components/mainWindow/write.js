import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Picker from 'emoji-picker-react'
import { socket } from '../../redux/index'
import File from '../../assets/svg/file.svg'
import Voice from '../../assets/svg/voice.svg'
import Smile from '../../assets/svg/smile.svg'

const Write = () => {
  const [message, setMessage] = useState('')
  const [cursorPosition, setCursorPosition] = useState()
  const [emojiShow, setEmojiShow] = useState(false)

  const inputMessage = useRef(null)

  const { workSpace, channel } = useSelector((s) => s.chat)
  const { userId } = useSelector((s) => s.auth.user)

  const sendMessage = (e) => {
    e.preventDefault()
    socket.emit('message', { message, workSpaceId: workSpace.id, channelId: channel.id, userId })
    setMessage('')
  }

  const handleEmoji = (_, { emoji }) => {
    inputMessage.current.focus()

    const newText = `${message.slice(
      0,
      inputMessage.current.selectionStart
    )}${emoji}${message.slice(inputMessage.current.selectionStart)}`

    setMessage(newText)
    setCursorPosition(inputMessage.current.selectionStart + emoji.length)
  }

  useEffect(() => {
    inputMessage.current.selectionEnd = cursorPosition
  }, [cursorPosition])
  return (
    <>
      {emojiShow && (
        <Picker
          pickerStyle={{ position: 'fixed', top: '230px', left: '76%' }}
          onEmojiClick={handleEmoji}
        />
      )}
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
          ref={inputMessage}
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
        <button
          type="button"
          className="focus:outline-none"
          onClick={() => setEmojiShow(!emojiShow)}
        >
          <Smile />
        </button>
      </form>
    </>
  )
}

export default Write
