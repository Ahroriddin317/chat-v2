import React from 'react';
import Search from './search';
import PersonalCommunications from './personalCommunications';
import Wave from './wave';
import Waves from './waves';
import Post from './post';

const Navbar = () => {
  return (
    <div className=' flex justify-between items-center w-screen bg-[#1C1C1F] flex-row h-18  text-white '>
      <div className="flex items-center ">
        <Search />
        <PersonalCommunications />
        <div className='bg-[#2C2D31] w-1.5 h-14 ml-2 mr-2 rounded-full' />
        <Waves />
        <Wave />
      </div>
      <Post />
    </div>

  )
}

export default Navbar