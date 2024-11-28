import React from 'react';
import Search from './search';
import PersonalCommunications from './personalCommunications';

const Navbar = () => {
  return (
    <div className="flex flex-col h-full w-18 bg-[#1C1C1F] text-white items-center">
      <Search />
      <PersonalCommunications />
      <div className='bg-[#2C2D31] w-14 h-1 mt-2 mb-2 rounded-full' />
    </div>
  )
}

export default Navbar