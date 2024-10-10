'use client'
import React, { useState, useEffect } from 'react';

const SwitchButton = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    if (!isToggled) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        setIsToggled(true);
      document.body.classList.add("dark");
    } else {
        setIsToggled(false);
      document.body.classList.remove("dark");
    }
  }, [isToggled]);

  return (
    <div
      onClick={handleToggle}
      className={`inline-block w-[32px] h-[20px] rounded-[15px] cursor-pointer relative transition duration-300   bg-purple-600 `}
    >
      <div
        className={`absolute top-[4px] w-[12px] h-[12px] bg-white rounded-full transition duration-300 ${isToggled ? 'left-[16px]' : 'left-[2px]'}`}
      />
    </div>
  );
};

export default SwitchButton;

