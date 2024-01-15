"use client";
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { FC, useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const SideMenu: FC = ({ }) => {

    const [styles, setstyles] = useState("open");
    const [activeRoute, setactiveRoute] = useState("");
    const [projectName, setprojectName] = useState("");

    const router = useRouter()
    const pathName = usePathname()

    const clickHandle = (type = "closed") => {
        setstyles(type)
    }

    useEffect(() => {
        setactiveRoute(pathName.split("/").slice(-1)[0])
        setprojectName(decodeURI(pathName.split("/")[1].split("_")[0]))
    }, [pathName])

    const route = (pathName: string) => {
        router.push(pathName)
    }


    return (
        <>
            {styles === "open" && <div className={(styles === "open" ? "opacity-100 flex flex-col bg-[#395886] border-r items-center border-t-[0.1px] border-[#ffffff54] min-w-[30vh]" : "opacity-0 relative -left-[300%] ") + " transition ease-in duration-200 "}>
                <div className="flex gap-2 justify-between items-center font-medium text-white p-3 w-full">
                    <div className='flex gap-3 items-center justify-center text-base'>
                        <div className="flex p-2 bg-[#1B3358] rounded-full w-9 h-9 items-center justify-center">
                            {projectName?.split(" ").map((e) => e.charAt(0)).splice(0, 2).join("") + (projectName.split(" ").length === 1 ? projectName.split("").pop() || "" : "")}
                        </div>
                        <div>{projectName}</div>
                    </div>
                    <div onClick={() => clickHandle()} className='bg-[#1B3358] rounded-full w-[1.6vw] h-[1.6vw] flex items-center justify-center cursor-pointer'>
                        <KeyboardDoubleArrowLeftIcon className='text-[1rem] ' />
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <div onClick={() => route("boards")} className={"flex gap-2 text-xs items-center cursor-pointer font-medium text-white m-2 p-4 py-2 rounded-md " + (activeRoute === "boards" ? "bg-[#1B3358]/50 shadow text-base" : "")}>
                        <AssignmentTurnedInOutlinedIcon className='text-md' />
                        Boards
                    </div>
                    <div onClick={() => route("members")} className={"flex gap-2 text-xs items-center cursor-pointer font-medium text-white m-2 p-4 py-2 rounded-md " + (activeRoute === "members" ? "bg-[#1B3358]/50 shadow text-base" : "")}>
                        <PeopleAltOutlinedIcon className='text-md' />
                        Add Members
                    </div>
                    <div onClick={() => route("settings")} className={"flex gap-2 text-xs items-center cursor-pointer font-medium text-white m-2 p-4 py-2 rounded-md " + (activeRoute === "settings" ? "bg-[#1B3358]/50 shadow text-base" : "")}>
                        <SettingsOutlinedIcon className='text-md' />
                        Project Settings
                    </div>

                </div>
            </div>}
            {styles === "closed" && <div className='opacity-100 relative flex flex-col bg-[#395886] border-r items-center border-t-[0.1px] w-[10vh]'>
                <div className="flex p-2 bg-[#1B3358] rounded-full w-9 h-9 items-center justify-center text-white mt-[2vh] mb-4">
                    {projectName?.split(" ").map((e) => e.charAt(0)).splice(0, 2).join("") + (projectName.split(" ").length === 1 ? projectName.split("").pop() || "" : "")}
                </div>
                <div className="flex flex-col w-full">
                    <div onClick={() => route("boards")} className={"flex gap-2 text-xs items-center cursor-pointer font-medium text-white m-2 p-4 py-2 rounded-md " + (activeRoute === "boards" ? "bg-[#1B3358]/50 shadow text-base" : "")}>
                        <AssignmentTurnedInOutlinedIcon className='text-md' />
                    </div>
                    <div onClick={() => route("members")} className={"flex gap-2 text-xs items-center cursor-pointer font-medium text-white m-2 p-4 py-2 rounded-md " + (activeRoute === "members" ? "bg-[#1B3358]/50 shadow text-base" : "")}>
                        <PeopleAltOutlinedIcon className='text-md' />
                    </div>
                    <div onClick={() => route("settings")} className={"flex gap-2 text-xs items-center cursor-pointer font-medium text-white m-2 p-4 py-2 rounded-md " + (activeRoute === "settings" ? "bg-[#1B3358]/50 shadow text-base" : "")}>
                        <SettingsOutlinedIcon className='text-md' />
                    </div>
                </div>
                <div onClick={() => clickHandle("open")} className='bg-[#1B3358] shadow-lg absolute -right-[2vh] top-[2.6vh] z-11 rounded-full w-[1.8vw] h-[1.8vw] flex items-center justify-center cursor-pointer'>
                    <KeyboardDoubleArrowRightIcon className='text-[1rem] text-white' />
                </div>
            </div>}
        </>
    );
};

export default SideMenu;
