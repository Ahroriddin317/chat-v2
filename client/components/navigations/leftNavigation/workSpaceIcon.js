import React from 'react'
import { useDispatch } from 'react-redux'
import { getWorkSpace } from '../../../redux/reducers/chat'

const WorkSpaceIcon = ({ imgUrl, id }) => {
  const dispatch = useDispatch()
   const workSpaceHandler = () => {
     dispatch(getWorkSpace(id))
   }
  return (
    <button type="button" className="focus:outline-none mb-4" onClick={workSpaceHandler}>
      <img src={`${imgUrl}`} className="rounded-full h-10 w-10" alt="Work space icon" />
    </button>
  )
}

export default WorkSpaceIcon
