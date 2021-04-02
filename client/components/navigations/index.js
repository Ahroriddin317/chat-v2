import React from 'react';
import LeftNavigation from './leftNavigation/index';
import RigthNavigation from './rigthNavigation/index';

const Navigations = () => {
  return(
    <div className="flex content-between h-full">
    <LeftNavigation/>
    <RigthNavigation/>
    </div>
  )
}

export default Navigations