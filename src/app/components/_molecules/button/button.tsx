import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text,onClick}) => {
  return (
    <button onClick={onClick} className='w-[327px] h-[56px] bg-[#A729F5] rounded-[12px] text-white text-[18px] font-medium'>{text}</button>
  );
}

export default Button;
