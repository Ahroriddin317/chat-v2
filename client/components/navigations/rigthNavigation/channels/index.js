import React from 'react'
import Channel from './channel'

const Channels = () => {
  return (
    <div className="mt-20">
      <header className="flex justify-between font-lato text-gray-400 text-sm uppercase">
        <h1>Channels</h1>
        <h6>11</h6>
      </header>
      <Channel channelName="general" />
    </div>
  )
}

export default Channels
