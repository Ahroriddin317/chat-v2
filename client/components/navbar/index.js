import React from 'react';
import Search from './search';
import PersonalCommunications from './personalCommunications';
import Wave from './wave';
import Waves from './waves';

const Navbar = () => {
  return (
    <div className="flex flex-col h-screen w-18 bg-[#1C1C1F] text-white items-center">
      <Search />
      <PersonalCommunications />
      <div className='bg-[#2C2D31] w-14 h-1.5 mt-2 mb-2 rounded-full' />
      <Waves />
      <Wave />
    </div>
  )
}

export default Navbar