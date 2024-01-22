'use client';
import { FC } from 'react';

interface InputProps {}

const Loading: FC<InputProps> = ({}) => {
  return (
    <>
      <div className="absolute w-[100%] h-[100vh] left-[0%] bg-black bg-opacity-[0.5] z-20 top-0" />
      <span className="loader"></span>
    </>
  );
};

export default Loading;
