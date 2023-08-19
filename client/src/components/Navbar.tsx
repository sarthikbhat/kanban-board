import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import { FC, HTMLInputTypeAttribute } from "react";

interface InputProps {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
}

const Navbar: FC = ({}) => {
  return (
    <header className="flex bg-purple-400 p-3 gap-3 px-5 shadow items-center">
      <div className="flex gap-4 ">
        <img src="/assets/images/icon-filled.png" className="w-8 h-8" />
        <h1 className="text-2xl text-white font-semibold">KanBan Board</h1>
      </div>
      <div className="flex-1"></div>
      <NotificationsNoneTwoToneIcon  fontSize='large' htmlColor='white' className='text-white'/>
      <div className="bg-white w-8 h-8 rounded-full flex justify-center items-center text-slate-500 text-xl">S</div>
    </header>
  );
};

export default Navbar;
