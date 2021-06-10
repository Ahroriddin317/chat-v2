import React from 'react'

const Message = ({ name, date, text, image }) => {
  return (
    <div className="flex items-center mt-1.5">
      <img src={image} alt="profil" className="w-9 h-9 rounded" />
      <div className="ml-2">
        <h1 className="text-gray-400">
          <span className="font-lato text-black">{name}</span> {date}
        </h1>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Message
