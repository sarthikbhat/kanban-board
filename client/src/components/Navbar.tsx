"use client"
import { IUser } from '@/app/addproject/page';
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import PowerSettingsNewTwoToneIcon from '@mui/icons-material/PowerSettingsNewTwoTone';
import { useRouter } from 'next/navigation';
import { FC, HTMLInputTypeAttribute, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import Input from './Input';
import { useForm } from 'react-hook-form';


const Navbar: FC = () => {

  const [user, setuser] = useState({} as IUser)
  const [openPopUp, setopenPopUp] = useState(false)
  const { register,control } = useForm();

  const router = useRouter();

  useEffect(() => {

    if (typeof window !== "undefined")
      setuser(JSON.parse(window.localStorage.getItem("user") || "{}"))

    const handleClick = (e: any) => {
      let id = true;
      [...e.target.attributes].forEach(elm => {

        if (elm.name === 'id' && elm.value === "popup") {
          id = false;
        }

      })
      id && setopenPopUp(false)
    }

    const body = document.querySelector("body");

    body?.addEventListener("click", handleClick)

    return () => body?.removeEventListener("click", handleClick)
  }, [])


  const performLogout = () => {
    if (typeof window !== "undefined") {
      router.push("/login")
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      toast.success("logout successful")
    }
  }

  return (
    <header className="flex bg-[#395886] p-3 gap-4 px-5 items-center " style={{ height: '8vh' }}>
      <div onClick={() => router.push("/home")} className="flex gap-2 cursor-pointer">
        <img alt="icon" src="/assets/images/icon-filled.png" className="w-8 h-6" />
        <h1 className="text-xl text-white font-semibold">KanBan Board</h1>
      </div>
      <h1 className="text-xs text-white font bg-[#A0A8B5]/10 hover:bg-[#A0A8B5]/30  cursor-pointer transition ease-in p-2 rounded">Starred Projects</h1>
      <h1 className="text-xs text-white font bg-[#A0A8B5]/10 hover:bg-[#A0A8B5]/30  cursor-pointer transition ease-in p-2 rounded">All Projects</h1>
      <div className="flex-1"></div>
      {/* <div className='text-md text-white'>
        Home/Projects
      </div> */}
      <Input control={control} id={"search"} type={"text"} placeholder={"Search workitems"} displayLabel={false} register={register} extraCss="!p-1.5 !text-sm text-slate-500 !w-full !shadow-none" parentPosition="items-center !w-1/5" />
      <NotificationsNoneTwoToneIcon htmlColor='white' className='text-white text-3xl'  />
      <div className='flex gap-2 items-center' onClick={() => setopenPopUp(true)}>
        <div className='flex flex-col'>
          <div className='text-white font-semibold text-base'>{user.fullName}</div>
          <div className='text-white font-regular text-xs self-end'>@{user.userName}</div>
        </div>
        <div className="rounded-full p-2 text-sm border border-slate-400 shadow-lg text-slate-700 bg-white">{user.fullName && user?.fullName.split(" ").map((e: any) => e.charAt(0))}</div>
        {openPopUp && <div id='popup' onClick={performLogout} className='absolute bg-white shadow-lg rounded p-3 text-slate-800 z-[111] border-[0.1px] border-slate-300 flex gap-2 right-[0.5%] top-[6.5%] cursor-pointer'>
          <PowerSettingsNewTwoToneIcon id='popup' />
          Logout
        </div>}
      </div>
    </header>
  );
};

export default Navbar;
