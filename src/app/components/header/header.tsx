import React from 'react';
import { IoSunnyOutline } from 'react-icons/io5';
import { SwitchButton } from '../_molecules';
import { GoMoon } from 'react-icons/go';

const Header = () => {
  return (
    <div className="flex justify-between py-[16px] items-center px-[24px] ">
      <h1 className="text-[#313E51] dark:text-white">Frontend Quiz</h1>
      <div className="flex justify-end items-center gap-[8px]">
        <IoSunnyOutline className="text-[#313E51] dark:text-white" />
        <SwitchButton />
        <GoMoon className="text-[#313E51] dark:text-white" />
      </div>
    </div>
  );
};

export default Header;
