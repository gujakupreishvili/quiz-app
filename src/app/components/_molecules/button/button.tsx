import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text,onClick}) => {
  return (
    <button onClick={onClick} className='w-[327px] h-[56px] bg-[#A729F5] hover:bg-purple-300 transition-[0.4s] rounded-[12px] text-white text-[18px] font-medium md:w-[616px] md:h-[56px] md:p-[12px] lg:w-[524px] lg:h-[74px] lg:text-[28px] lg:rounded-[24px]  '>{text}</button>
  );
}

export default Button;
