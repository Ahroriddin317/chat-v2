import React from 'react'

const Channel = ({ channelName }) => {
  return (
    <button
      type="button"
      className="text-center text-gray-300 text-sm font-lato pt-1 pl-2 pb-2 pr-35 rounded hover:text-white hover:bg-gray-500
       focus:outline-none"
    >{`# ${channelName}`}</button>
  )
}

export default Channel
