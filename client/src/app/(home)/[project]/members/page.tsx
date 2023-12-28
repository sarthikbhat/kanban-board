"use client"
import { FC, useEffect, useState } from "react";
import { RegisterOptions, UseFormRegisterReturn, useForm } from "react-hook-form";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Input from "@/components/Input";
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AddMembersModal from "@/components/AddMemberModal";
import { IProject, IUser } from "@/app/addproject/page";
import { usePathname } from "next/navigation";
import AUTH_INTERCEPTOR from "@/services/ApiUtil";
import Loading from "@/components/Loading";
const ITEMS_PER_PAGE = 8
const INITIAL_OFFSET = 0

const Members: FC = () => {

    const { register } = useForm();
    const pathName = usePathname();

    const [users, setUsers] = useState([] as IUser[])

    const [filteredUsers, setfilteredUsers] = useState([] as IUser[])
    const [currentPage, setcurrentPage] = useState(1)
    const [addMembersOpen, setaddMembersOpen] = useState(false)
    const [loading, setloading] = useState(true)
    const [currentUser, setcurrentUser] = useState({} as IUser)

    useEffect(() => {
        AUTH_INTERCEPTOR.get("/project/get-project-users?projectName=" + decodeURI(pathName.split("/")[1].split("_")[0])).then(res => {
            setUsers([...res.data]);
            setloading(false);
            // setfilteredUsers([...users?.slice(INITIAL_OFFSET, ITEMS_PER_PAGE)]);
            // navigateToPage(INITIAL_OFFSET, 1, 1)
            // console.log(filteredUsers);
            // console.log(users);
            setcurrentUser(JSON.parse(window.localStorage.getItem("user") || "{}"))

        });
    }, [])

    useEffect(() => {
        setfilteredUsers([...users?.slice(INITIAL_OFFSET, ITEMS_PER_PAGE)]);
        navigateToPage(INITIAL_OFFSET, 1, 1)
    }, [users])

    const navigateToPage = (offset: number, cPage: number, type: number) => {
        if (type == 1 && getOffsetLength() == users?.length) return;
        if (offset < 0) return;

        setfilteredUsers([...users?.slice(offset, offset + ITEMS_PER_PAGE)])
        setcurrentPage(cPage)
    }

    const getOffsetLength = () => {
        return (filteredUsers?.length + ((currentPage - 1) * ITEMS_PER_PAGE));
    }

    const closeModal = () => {
        setaddMembersOpen(false);
    }

    const addUserToProject = (user: IUser) => {
        // const
        const payload = { ...{ projectName: decodeURI(pathName.split("/")[1].split("_")[0]) }, users: [...users, user] }
        AUTH_INTERCEPTOR.post("http://localhost:8080/project/save-project-users", payload).then((res) => {
            setUsers(res.data.users)
        })
    }

    const deleteUser = (user: IUser) => {
        AUTH_INTERCEPTOR.delete(`http://localhost:8080/project/delete-project-user?projectName=${decodeURI(pathName.split("/")[1].split("_")[0])}&id=${user._id}`).then(res => {
            setUsers(res.data);
        })
    }

    return (
        <section className="flex flex-col gap-2 p-4 px-6 w-full">
            {!!loading && <Loading />}
            {addMembersOpen &&
                <>
                    <div className="absolute w-[100%] h-[100%] top-[0%] left-[0%] bg-black bg-opacity-[0.5] z-20 top-0" />
                    <AddMembersModal closeModal={closeModal} addUserToProject={addUserToProject} projectName={decodeURI(pathName.split("/")[1].split("_")[0])} />
                </>
            }
            <div className="flex flex-[0.1] w-full">
                <div className="flex flex-col">
                    <div className="text-2xl font-medium text-[#395886]">
                        Test Project's Collaborators
                    </div>
                    <div className="text-sm font-medium px-1 text-[#000000]/60">
                        Project members can view and join the project's visible boards and create new boards in the Workspace
                    </div>
                </div>
                <div className="flex-1" />
                <div onClick={() => setaddMembersOpen(true)} className="flex text-sm gap-2 items-center p-3 px-4 bg-[#395886] h-fit h-fit rounded text-white cursor-pointer">
                    <PersonAddOutlinedIcon className="text-lg" />
                    Add Members
                </div>
            </div>
            <div className="h-full flex flex-col gap-4 flex-1 w-4/5 text-sm" style={{ maxHeight: '100%', overflowX: 'scroll' }}>
                <Input id="searchMembers" type="text" placeholder="Search Members" register={register} parentPosition="flex-start" extraCss="!text-slate-700 !w-1/3 !p-2 !text-sm" />
                <div className=" group px-4 py-3 flex gap-4 items-center bg-[#395886] rounded text-white">
                    <div className="flex gap-2 flex-[0.6] text-sm items-center">
                        <AccountCircleOutlinedIcon className="text-lg" />
                        User
                    </div>
                    <div className="flex gap-2 text-sm items-center">
                        <AdminPanelSettingsOutlinedIcon className="text-lg"/>
                        Role
                    </div>
                    <div className="text-sm flex group items-center font-medium p-2 text-slate-600 hover:text-red-500 hover:bg-slate-100 transition ease-in hover:rounded--md cursor-pointer">

                    </div>
                </div>
                <div className="members-outer flex flex-col gap-2" style={{ maxHeight: '82%', overflowX: 'scroll' }}>
                    {
                        filteredUsers?.map((e, index) => {
                            return (
                                <div
                                    key={index}
                                    className=" group px-4 py-2 flex gap-4 items-center bg-[#B1C9EF]/50"
                                >
                                    <div className="rounded-full p-2 text-xs border border-slate-400 shadow-lg text-slate-700">
                                        {e.fullName.split(" ").map((e: any) => e.charAt(0))}
                                    </div>
                                    <div className="flex flex-col w-[50%]">
                                        <span className="text-sm">{e.fullName}</span>
                                        <span className="text-slate-400 text-xs">@{e.userName}</span>
                                    </div>
                                    <div className="text-sm font-medium text-slate-600 flex-1">
                                        Admin {e.fullName === currentUser?.fullName ? "(It's You)" : ""}
                                    </div>
                                    <div onClick={()=>deleteUser(e)} className="text-sm flex group items-center font-medium p-2 text-slate-600 hover:text-red-500 hover:bg-slate-100 transition ease-in hover:rounded--md cursor-pointer">
                                        Remove
                                        <DeleteOutlinedIcon className="text-lg ml-1" />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {!users?.length && <div className="flex justify-center items-center bg-[#D5DEEF] p-2 rounded text-[#395886] font-semibold">No Users</div>}
                {!!users?.length && <div className="text-slate-400 flex items-center gap-2 justify-center ml-[15%]">
                    <SkipPreviousOutlinedIcon className={((currentPage - 1) * ITEMS_PER_PAGE) - ITEMS_PER_PAGE < 0 ? "text-slate-300/80 cursor-pointer" : "cursor-pointer"} onClick={() => navigateToPage(0, 1, -1)} />
                    <NavigateBeforeOutlinedIcon className={((currentPage - 1) * ITEMS_PER_PAGE) - ITEMS_PER_PAGE < 0 ? "text-slate-300/80 cursor-pointer" : "cursor-pointer"} onClick={() => navigateToPage((((currentPage - 1)) * ITEMS_PER_PAGE) - ITEMS_PER_PAGE, currentPage - 1, -1)} />
                    Showing items {getOffsetLength()} of {users?.length}
                    <NavigateNextOutlinedIcon className={getOffsetLength() == users?.length ? "text-slate-300/80 cursor-pointer" : "cursor-pointer"} onClick={() => navigateToPage(currentPage * ITEMS_PER_PAGE, currentPage + 1, 1)} />
                    <SkipNextOutlinedIcon className={getOffsetLength() == users?.length ? "text-slate-300/80 cursor-pointer" : "cursor-pointer"} onClick={() => navigateToPage(users?.length - ITEMS_PER_PAGE, Math.ceil(users?.length / ITEMS_PER_PAGE), 1)} />
                </div>}
            </div>
        </section >
    );
};

export default Members;
