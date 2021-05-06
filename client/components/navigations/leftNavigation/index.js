import React from 'react'
import { useSelector } from 'react-redux'
import LeftNavigationButton from './leftNavigationButton'
import WorkSpaceIcon from './workSpaceIcon'

const LeftNavigation = () => {
  const { workSpaces } = useSelector((s) => s.chat)

  return (
    <div className="w-16 h-full bg-purple-900 bg-opacity-70">
      <div className="mt-5 ml-3">
        {workSpaces.map(({ workSpaceImg, id }) => {
          return <WorkSpaceIcon key={id} imgUrl={workSpaceImg} id={id} />
        })}
      </div>
      <LeftNavigationButton />
    </div>
  )
}

export default LeftNavigation
