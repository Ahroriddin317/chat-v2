import React from "react"
import LeftNavigationButton from "./leftNavigationButton"
import WorkSpaceIcon from "./workSpaceIcon"

const LeftNavigation = () => {
  const imagesUrl = [1, 2, 3, 4, 5, 6, 7]
  return (
    <div className="w-16 h-full bg-gradient-to-b from-gray-700 to-black">
      <div>
        {imagesUrl.map((url) => {
          return <WorkSpaceIcon key={url} imgUrl={`/images/${url}.png`} />
        })}
      </div>
      <LeftNavigationButton />
    </div>
  )
}

export default LeftNavigation