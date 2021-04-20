import React from 'react'

const Message = ({ name, date, text }) => {
  return (
    <div className="flex items-center mt-1.5">
      <img
        src="https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
        alt="profil"
        className="w-9 h-9 rounded"
      />
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
