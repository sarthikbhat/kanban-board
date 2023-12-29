"use client"
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Button from "./Button";
import AutoComplete from "./AutoComplete";
import AUTH_INTERCEPTOR from "@/services/ApiUtil";
import { ITask, IUser } from "@/app/addproject/page";
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import CustomSelect from "./CustomSelect";
import toast from "react-hot-toast";
import { TaskSchemaResolver } from "@/services/FormSchema";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CommentInput from "./CommentInput";

interface IComment {
    comment: string,
    originalValue?: string,
    createdAt?: string,
    updatedAt?: string,
    isChanged?: boolean
}

const IndexToMonthMap: Record<number, string> = {
    0: "Jan", 1: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "June", 7: "July", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"
}

interface IModalProps {
    closeModal: (refresh?: boolean) => void;
    task: ITask;
    projectUsers?: IUser[];
    columnId: string;
}

const TaskModal: FC<IModalProps> = ({ closeModal, task, projectUsers, columnId }) => {

    const {
        register,
        handleSubmit,
        setValue
    } = useForm({ mode: "onTouched", resolver: TaskSchemaResolver });

    const [originalTask, setoriginalTask] = useState({} as ITask);
    const [comments, setcomments] = useState({} as Record<string | number, IComment>);
    const pathName = usePathname()
    useEffect(() => {
        setValue("project", pathName.split("/")[1].split("_")[1]);
        setValue("column", columnId);
    }, [pathName])

    useEffect(() => {
        if (task) {
            setoriginalTask(task);
            Object.entries(task).forEach((val: any) => {
                if (val[0] === "comments") setcomments(Object.assign({}, val[1]));
                else if (val[0] === "assignedTo") setValue(val[0], val[1]?._id);
                else setValue(val[0], val[1]);
            })
        }

    }, [])

    const onData = (type: any, data: IUser | string) => {
        if (type == "assignedTo")
            data = projectUsers?.filter(e => e.fullName == data)[0]._id || "";
        setValue(type, data)

    }

    const onSave = (data: any) => {
        data.comments = Object.values(comments);
        AUTH_INTERCEPTOR
            .post("/task/save-task", data)
            .then((res) => {
                if (res.data) toast.success("Task created successfully")
                closeModal(true);
            })
    }

    const deleteTask = () => {
        AUTH_INTERCEPTOR
            .delete("/task/delete-task/?taskId=" + task._id)
            .then((res) => {
                if (res.data) toast.success("Task deleted successfully")
                closeModal(true);
            })
    }

    const getUpdatedAt = (time: string | undefined) => {
        if (time) {
            const localTime = new Date(time).toLocaleString();
            const now = new Date().getTime();
            const then = new Date(localTime).getTime();
            const diff = (now - then) / 60000;

            if (Math.round(diff) == 0) return " just now";
            else if (Math.round(diff) < 60) {
                const minutes = Math.round(diff);
                return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
            }
            else if (Math.round(diff) > 60 && Math.round(diff) < 60000) return Math.round(diff / 60000) + " hours ago"
            else {
                const date = new Date(localTime);
                const hours = date.getHours() > 12 ? (date.getHours() - 12 < 10 ? "0" : "") + (date.getHours() - 12) : date.getHours();
                const fullDate = `${IndexToMonthMap[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
                return `on ${fullDate} at ${hours}:${date.getSeconds()} ${date.getHours() > 12 ? "PM" : "AM"}`
            }
        }
    }

    const handleChange = (value: string, id: string) => {
        let index;
        if (id.split("comment")[1] == "New") index = "New"
        else index = Number.parseInt(id.split("comment")[1], 10);

        if (index === "New" && !value.trim().length)
            delete comments["New"]
        else if (value) {
            let originalValue;
            if (!comments[index].isChanged) originalValue = comments[index].comment
            else originalValue = comments[index].originalValue
            if (value != originalValue)
                comments[index] = {
                    ...comments[index], ...{ comment: value, originalValue: originalValue, isChanged: true }
                };
            else comments[index] = { ...comments[index], ...{ comment: originalValue, isChanged: false } };
        }
        // else continue;

        setcomments({ ...comments })
    }

    return (
        <div className="absolute flex flex-col gap-2 top-[50%] min-w-[50%] max-h-1/5 left-[50%] -translate-x-[50%] -translate-y-[50%] z-30 w-100 p-4 px-2 rounded-md bg-slate-100 shadow-lg h-[70vh] overflow-hidden">
            <div className="flex flex-col gap-2">
                <div className="text-md text-[#395886] font-semibold flex px-4 relative items-center gap-4">
                    <span className="flex-1 text-2xl">{!!Object.keys(task).length ?  task.taskName : 'Add Task'}</span>
                    {/* <div className="self-end flex gap-2">
                        {
                            !!Object.keys(task).length
                            &&
                            <DeleteIcon onClick={() => deleteTask()} className="self-end cursor-pointer text-red-600 hover:text-red-600 hover:scale-105 transition ease-in" />
                        }
                        <SaveIcon onClick={handleSubmit(data => onSave(data))} className="self-end cursor-pointer hover:scale-105 transition ease-in" />
                    </div> */}
                    <CloseOutlinedIcon onClick={() => closeModal()} className="text-black self-end cursor-pointer" />
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col p-4 gap-4 flex-1">
                        <div className="flex items-center gap-4 justify-center">
                            <CustomSelect setData={onData} showList={false} defaultSelectText={!!Object.keys(task).length ? task?.assignedTo?.fullName : 'Assign User'} options={projectUsers || []} extraCss="pl-5 flex items-center gap-4 bg-white border rounded-md p-[0.3rem] text-sm focus:outline-none shadow-sm shadow-[#B1C9EF] hover:shadow-md hover:shadow-[#D5DEEF] mt-[2px]" />
                            <Input id="taskName" type="text" placeholder="Task Name" register={register} parentPosition="items-start !gap-0 " extraCss="!w-full !p-2 text-sm" />
                        </div>
                        <Input id="taskDesc" type="textarea" placeholder="Add a description for others to know about the task in detail" register={register} parentPosition="items-start !gap-0 " extraCss="!w-full !text-sm" />
                        <div className="relative flex gap-2 flex-col">
                            <div className="font-medium text-base text-[#395886]">Comments</div>
                            <div className="w-[50%] h-px bg-[#395886]/50 mb-2"></div>
                            <div key="outerDiv" className="overflow-scroll min-h-[25vh] h-[20%] pr-[5px] flex flex-col gap-[10px] mb-[2px] pb-[10px] scroll-smooth">
                                <div className="relative">
                                    <CommentInput key="new" value="" id={"commentNew"} handleChange={handleChange} placeholder="Add a comment" parentPosition="items-start !gap-0 " extraCss="!w-full !h-[13vh]" />
                                    {comments["New"] && <SendIcon key="newSend" className="absolute right-[2px] bottom-[5px] text-[#395886] cursor-pointer text-xl" />}
                                </div>
                                {
                                    Object.entries(comments).map((val) => {
                                        return (
                                            val[0] != "New"
                                            &&
                                            <>
                                                <div key={val[0]} className="relative">
                                                    <CommentInput value={val[1].comment} id={"comment" + val[0]} handleChange={handleChange} placeholder="Add a comment" parentPosition="items-start !gap-0 " extraCss="!w-full !h-[13vh] pt-[5%]" />
                                                    {val[1].isChanged && <SendIcon className="absolute right-[2px] bottom-[5px] text-[#395886] cursor-pointer text-xl" />}
                                                    <div className="text-xs absolute top-[7px] left-[10px] text-[#000]/50 flex items-center gap-2"><div className="font-medium text-underline">Sarthik Bhat</div><div>{getUpdatedAt(val[1]?.updatedAt)}</div></div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 items-center justify-start p-4 h-[63vh]">
                        <CustomSelect setData={onData} showList={false} defaultSelectText={!!Object.keys(task).length ? task.priority : 'Priority'} isUser={false} options={['High', 'Medium', 'Low']} extraCss="flex items-center bg-white focus:outline-none border rounded-md p-2 text-sm focus:outline-none shadow-sm shadow-[#B1C9EF] hover:shadow-md hover:shadow-[#D5DEEF] mt-[2px]" />
                        <Input id="estimation" type="number" placeholder="Estimated days to finish" register={register} parentPosition="items-start !gap-0 " extraCss="!w-full !p-2 !text-sm" />
                        <Input id="actual" type="number" placeholder="Actual days taken to finish" register={register} parentPosition="items-start !gap-0 " extraCss="!w-full !p-2 !text-sm" />
                        <div className="flex-1"></div>
                        {/* <div className="flex"> */}
                        {/* <div className="flex-1"></div> */}
                        <div className="flex gap-[10px] w-[100%]">
                            {
                                !!Object.keys(task).length
                                &&
                                <div onClick={() => deleteTask()} className="flex items-center justify-end text-sm font-base text-purple-700 flex-1">
                                    <Button text="Delete" width="!w-[20%] max-w-[160px] !p-2 flex-1 bg-red-600 shadow-red-200
                        hover:text-red-600 !hover:bg-white hover:border hover:border-red-600 active:bg-red-600 active:text-white transition ease-in" />
                                </div>
                            }
                            <div onClick={handleSubmit(data => {
                                console.log(data);
                                onSave(data)
                            })} className="flex items-center justify-end text-sm font-base text-purple-700 flex-1">
                                <Button text="Save" width="!w-[20%] max-w-[160px] !p-2 flex-1" />
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
