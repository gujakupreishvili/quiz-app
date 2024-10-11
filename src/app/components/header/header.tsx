'use client';
import React, { useEffect, useState } from 'react';
import { IoSunnyOutline } from 'react-icons/io5';
import { SwitchButton } from '../_molecules';
import { GoMoon } from 'react-icons/go';

const Header = () => {
  const [selectedSubject, setSelectedSubject] = useState('Frontend Quiz');

  useEffect(() => {
    const storedSubject = localStorage.getItem('selectedSubject');
    if (storedSubject) {
      setSelectedSubject(storedSubject);
    }
  }, []);

  console.log(selectedSubject);

  return (
    <div className="flex justify-between py-[16px] items-center px-[24px] lg:px-[140px] lg:py-[90px]">
      <h1>{selectedSubject}</h1>
      <div className="flex justify-end items-center gap-[8px]">
        <IoSunnyOutline className="text-[#313E51] dark:text-white lg:text-[24px]" />
        <SwitchButton />
        <GoMoon className="text-[#313E51] dark:text-white lg:text-[24px]" />
      </div>
    </div>
  );
};

export default Header;

