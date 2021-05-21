import React from 'react'

const Channel = ({ channelName }) => {
  return (
    <button
      type="button"
      className="flex text-center text-gray-300 text-sm font-lato pt-1 pb-2 pl-3 rounded hover:text-white hover:bg-gray-500
       focus:outline-none"
    >{`# ${channelName}`}</button>
  )
}

export default Channel
