import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Icon from '../../../assets/svg/icon.svg'
import SettingChannelIcon from '../../../assets/svg/settingChannelIcon.svg'

const Settings = () => {
  const [setting, setsetting] = useState(false)
  const { workSpaceName } = useSelector(s => s.chat.workSpace)

  const buttonHandler = () => {
    setsetting(!setting)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={buttonHandler}
          className="flex mt-4 text-xl text-white focus:outline-none"
        >
          <span className="font-lato">{workSpaceName}</span>
          <Icon className="ml-3 mt-3" />
        </button>
        <SettingChannelIcon className="mt-3" />
      </div>
      <div
        className={`${
          setting ? 'visible' : 'hidden'
        } flex flex-col fixed w-40 h-30 px-1 bg-gray-700 ml-4 mt-3 rounded text-white`}
      >
        <button type="button" className="focus:outline-none">
          add frends
        </button>
        <button type="button" className="focus:outline-none">
          {`in out is ${workSpaceName}`}
        </button>
      </div>
    </>
  )
}

export default Settings
