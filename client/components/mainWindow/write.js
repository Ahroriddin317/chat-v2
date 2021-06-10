import React from 'react'
import File from '../../assets/svg/file.svg'
import Voice from '../../assets/svg/voice.svg'
import Smile from '../../assets/svg/smile.svg'

const Write = () => {
  return (
    <div className="flex justify-between items-center mt-6 px-5">
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
      />
      <button type="button" className="focus:outline-none">
        <Smile />
      </button>
    </div>
  )
}

export default Write
