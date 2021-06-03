import React from 'react'
import { useDispatch } from 'react-redux'
import { getChannel } from '../../../../redux/reducers/chat'

const Channel = ({ channelName, id }) => {
  const dispatch = useDispatch()
  const buttonHandler = (evt) => {
    evt.preventDefault()
    dispatch(getChannel(id))
  }
  return (
    <button
      type="button"
      className="flex text-center text-gray-300 text-sm font-lato pt-1 pb-2 pl-3 rounded hover:text-white hover:bg-gray-500
       focus:outline-none"
       onClick={buttonHandler}
    >{`# ${channelName}`}</button>
  )
}

export default Channel
