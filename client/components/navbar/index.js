import React from 'react';
import Search from './search';

const Navbar = () => {
  return(
    <div className="flex content-between justify-center h-full w-20 bg-black text-white content-center">
        <Search />
    </div>
  )
}

export default Navbar