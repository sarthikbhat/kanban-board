import { FC } from 'react';

interface InputProps {
  text: string;
  width?: string;
  type?: 'filled' | 'outlined';
}

const Button: FC<InputProps> = ({ text, width = 'w-4/5 ', type = 'filled' }) => {
  return (
    <input
      value={text}
      type="submit"
      className={
        (type === 'filled'
          ? 'bg-[#395886] text-white shadow-lg shadow-[#B1C9EF] hover:text-[#395886] hover:bg-white hover:border hover:border-[#395886] active:bg-[#395886] active:text-white transition ease-in'
          : 'text-[#395886] border border-[#395886] hover:bg-[#395886] hover:text-white active:text-[#395886] active:bg-white transition ease-in') +
        ' p-4 rounded-md focus:outline-none mt-2 cursor-pointer ' +
        width
      }
    />
  );
};

export default Button;
