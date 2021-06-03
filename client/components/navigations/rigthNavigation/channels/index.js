import React from 'react'
import { useSelector } from 'react-redux'
import Channel from './channel'

const Channels = () => {
  const { channels } = useSelector((s) => s.chat.workSpace)
  return (
    <div className="mt-20">
      <header className="flex justify-between font-lato text-gray-400 text-sm uppercase">
        <h1>Channels</h1>
        <h6>{channels ? channels.length : '...'}</h6>
      </header>
      <div className="flex flex-col mt-3">
        {channels
          ? channels.map(({ name, id }) => {
              return <Channel key={id} channelName={name} id={id} />
            })
          : '...'}
      </div>
    </div>
  )
}

export default Channels
