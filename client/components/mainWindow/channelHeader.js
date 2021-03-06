import React from 'react'
import { useSelector } from 'react-redux'
import Star from '../../assets/svg/star.svg'
import ManIcon from '../../assets/svg/manIcon.svg'
import Search from '../../assets/svg/search.svg'
import Notification from '../../assets/svg/notification.svg'
import Options from '../../assets/svg/options.svg'

const ChannelHeader = () => {
  const { name } = useSelector((s) => s.chat.channel)
  const { users } = useSelector((s) => s.chat)
  return (
    <div className="flex justify-between mt-3 px-5">
      <div className="flex items-center text-xl font-lato">
        <span>{`#${name}`}</span>
        <Star className="ml-2 cursor-pointer" />
      </div>
      <div className="flex justify-between w-96 h-8">
        <div className="flex items-center">
          <ManIcon />
          <span className="text-gray-400 ml-2">{users.length}</span>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded border-gray-400 z-10 w-60 h-8 px-2 py-2 focus:outline-none"
          />
          <button
            type="button"
            className="absolute top-2 right-4 ml-56 focus:outline-none border-r-0"
          >
            <Search />
          </button>
        </div>
        <button type="button" className="focus:outline-none">
          <Notification />
        </button>
        <button type="button" className="focus:outline-none">
          <Options />
        </button>
      </div>
    </div>
  )
}

export default ChannelHeader
