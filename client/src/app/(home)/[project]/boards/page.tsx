"use client"
import { IColumns, IProject, ITask } from "@/app/addproject/page";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import TaskModal from "@/components/TaskModal";
import AUTH_INTERCEPTOR from "@/services/ApiUtil";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const priorityToColor: Record<string, string> = {
    High: "bg-red-600",
    Medium: "bg-orange-600",
    Low: "bg-yellow-600"
}


const Boards: FC = () => {

    const { register } = useForm();

    const router = useRouter();
    const pathName = usePathname();

    const [project, setproject] = useState({} as IProject)
    const [taskModal, setTaskModal] = useState(false)
    const [columnId, setcolumnId] = useState("")
    const [task, settask] = useState({} as ITask)
    const [loading, setloading] = useState(true)

    const openModal = (columnId: string, task: ITask | undefined = undefined) => {
        if (task)
            settask(task);
        setcolumnId(columnId)
        setTaskModal(true);
    }
    const closeModal = (refresh = false) => {
        settask({} as ITask)
        setTaskModal(false);
        if (refresh) {
            setloading(true);
            fetchDetailsByProject();
        }
    }

    useEffect(() => {
        fetchDetailsByProject()
    }, [])

    const fetchDetailsByProject = () => {
        AUTH_INTERCEPTOR.get("/project/get-project-by-name?projectName=" + decodeURI(pathName.split("/")[1].split("_")[0])).then(res => {
            setproject(res.data)
            setloading(false);
        });
    }


    const allTasks = () => {
        let sum = 0;
        project.columns?.forEach((e: IColumns) => sum = sum + e.tasks.length)
        return sum;
    }

    return (
        <section className="flex flex-1">
            {!!loading && <Loading />}
            {taskModal &&
                <>
                    <div className="absolute w-[100%] h-[100%] left-0 bg-black bg-opacity-[0.5] z-20 top-0" />
                    <TaskModal closeModal={closeModal} task={task || {}} projectUsers={project.users} columnId={columnId} />
                </>
            }
            <div className="flex flex-col flex-1  items-stretch py-0 px-3" style={{ maxHeight: '98%', overflowX: 'scroll' }}>
                <div className="flex w-full text-sm items-center justify-center">
                    <div className="flex-1 flex items-center  font-semibold p-4 text-slate-800 group">
                        <div className="hover:bg-slate-200 hover:text-slate-800 rounded p-1 flex gap-2 items-center transition ease cursor-pointer">
                            <FilterListOutlinedIcon className="text-md" />
                            Filter
                        </div>

                    </div>
                    <div onClick={() => router.push("members")} className="flex gap-2 text-xs items-center font-medium p-4 text-slate-800 cursor-pointer">
                        <PeopleAltOutlinedIcon />
                        {project?.users?.length} collaborators
                    </div>
                    <div className="flex gap-2 text-xs items-center font-medium p-4 text-slate-800 ">
                        <AssignmentOutlinedIcon />
                        {project && allTasks()} Workitems
                    </div>
                    <div className="flex gap-2 text-xs items-center font-medium p-4 text-slate-800 ">
                        <TimelineOutlinedIcon />
                        0% Project velocity
                    </div>
                </div>
                <div className="flex flex-1 gap-[20px] items-stretch pb-[20px]" style={{ maxHeight: '100%', overflow: 'scroll' }}>
                    {
                        project && project?.columns?.map((column: IColumns, index: number) => {
                            return (
                                <section key={index} style={{ borderColor: "#B1C9EF" + '99', background: "#B1C9EF0D" }} className={`flex flex-col flex-1 min-w-[150px] max-w-[360px] shadow-lg shadow-[#B1C9EF70] rounded-[10px] p-2 px-2 w-full border bg-opacity-[0.08]  gap-2`}>
                                    <div className={`flex justify-between p-1 px-2 w-full] items-center gap-4`}>
                                        <div className="flex gap-2 items-center flex-[0.7]">
                                            <span style={{ background: column.color }} className={`rounded-full w-4 h-4`}></span>
                                            <span className="relative text-sm text-slate-700 font-bold">{column.columnName}
                                                <span className="text-slate-900 absolute -top-2 -right-7 rounded-full bg-[#D5DEEF] w-6 h-6 text-xs flex items-center justify-center font-bold">{column.tasks.length}</span>
                                            </span>
                                        </div>
                                        {/* <input /> */}
                                        <div className="flex items-center gap-2 flex-[1] w-3/5">
                                            <Input id={"searchColumn"} type={"text"} placeholder={"Search workitems"} register={register} extraCss="!py-[0.3rem] !w-full !text-xs text-slate-500" parentPosition="items-center !w-[100%]" />
                                            <MoreHorizOutlinedIcon className="cursor-pointer mt-2" />
                                        </div>
                                    </div>
                                    <div className=" overflow-y-auto tasks-outer flex flex-col gap-4 mt-6">
                                        {
                                            column.tasks.map((task: ITask, index: number) => {
                                                return (
                                                    <div onClick={() => openModal(column._id, task)} key={index} className={` relative flex gap-4 w-full  group bg-[#5c94e7]/30 rounded-md shadow hover:shadow-md hover:-translate-y-1 mt-1 mb-1 p-4 px-[4.5%] items-center cursor-pointer transition ease`}>
                                                        <MoreHorizOutlinedIcon onClick={() => openModal(column._id, task)} className="absolute top-1 invisible group-hover:visible right-1 transition ease" />
                                                        <div className="p-2 bg-[#5c94e7]/20 border border-[#5c94e7]/20 shadow-xl rounded-full text-sm">
                                                            {task.assignedTo !== null ? task.assignedTo.fullName.split(" ").map((e) => e.charAt(0)).splice(0, 2) : "UA"}
                                                        </div>
                                                        <div className="flex flex-col  text-sm font-regular w-full text-black font-medium ">
                                                            <span className="drop-shadow-lg">{task.taskName}</span>
                                                            <div className="drop-shadow-lg flex gap-2 items-center">
                                                                <div className={"w-2 h-2 rounded-full " + priorityToColor[task.priority]}></div>
                                                                <span className="text-xs">{task.priority}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div onClick={() => openModal(column._id)} className="flex gap-2 hover:bg-slate-200 hover:text-slate-800 rounded transition ease cursor-pointer self-start p-2 text-sm items-center">
                                        <AddOutlinedIcon className="text-lg" />
                                        Add a task</div>
                                </section>
                            )
                        })
                    }
                    <div className="flex p-2 bg-[#395886] rounded-md cursor-pointer shadow-purple-700 hover:ring-2 hover:ring-[#B1C9EF] self-start">
                        <AddOutlinedIcon className="text-white" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Boards;
