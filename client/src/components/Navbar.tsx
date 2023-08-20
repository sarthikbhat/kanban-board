"use client"
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import PowerSettingsNewTwoToneIcon from '@mui/icons-material/PowerSettingsNewTwoTone';
import { useRouter } from 'next/navigation';
import { FC, HTMLInputTypeAttribute, useEffect, useState } from "react";
import toast from 'react-hot-toast';

interface InputProps {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
}

const Navbar: FC = ({ }) => {

  const [user, setuser] = useState(JSON.parse(localStorage.getItem("user") || "{}"))
  const [openPopUp, setopenPopUp] = useState(false)

  const router = useRouter();

  useEffect(() => {

    const handleClick = (e: any) => {
      let id = true;
      [...e.target.attributes].forEach(elm => {

        if (elm.name === 'id' && elm.value === "popup") {
          id = false;
        }
        
      })
      console.log(id);
      
      id && setopenPopUp(false)
    }

    const body = document.querySelector("body");

    body?.addEventListener("click", handleClick)

    return () => body?.removeEventListener("click", handleClick)
  }, [])


  const performLogout = () => {
    router.push("login")
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("logout successful")
  }

  return (
    <header className="flex bg-purple-400 p-3 gap-6 px-5 shadow items-center">
      <div className="flex gap-4 ">
        <img src="/assets/images/icon-filled.png" className="w-8 h-8" />
        <h1 className="text-2xl text-white font-semibold">KanBan Board</h1>
      </div>
      <div className="flex-1"></div>
      <NotificationsNoneTwoToneIcon fontSize='large' htmlColor='white' className='text-white' />
      <div className='flex gap-2 items-center' onClick={() => setopenPopUp(true)}>
        <div className='flex flex-col'>
          <div className='text-white font-semibold text-xl'>{user.fullName}</div>
          <div className='text-white font-regular text-xs self-end'>@{user.userName}</div>
        </div>
        <div className="rounded-full p-2 text-sm border border-slate-400 shadow-lg text-slate-700 bg-white">{user.fullName.toString().split(" ").map((e: any) => e.charAt(0))}</div>
        {openPopUp && <div id='popup' onClick={performLogout} className='absolute bg-white shadow-lg rounded p-3 text-slate-800  border-[0.1px] border-slate-300 flex gap-2 right-[0.5%] top-[6.5%] cursor-pointer'>
          <PowerSettingsNewTwoToneIcon id='popup' />
          Logout
        </div>}
      </div>
    </header>
  );
};

export default Navbar;
