"use client"
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Button from "./Button";
import AutoComplete from "./AutoComplete";
import AUTH_INTERCEPTOR from "@/services/ApiUtil";
import { IUser } from "@/app/addproject/page";
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';

interface IModalProps {
    closeModal: () => void;
    addUserToProject: (user: IUser) => void;
    projectName: string
}

const AddMembersModal: FC<IModalProps> = ({ closeModal ,addUserToProject, projectName}) => {

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();
    const [value, setvalue] = useState("");

    const [users, setusers] = useState([]);
    const [suggestions, setsuggestions] = useState([] as IUser[]);

    const addUser = (user: IUser) => {
        setvalue("")
        setValue("addMembers","")
        addUserToProject(user);
    }

    // const [users, setUsers] = useState([]);

    const router = useRouter();

    const getUserData = (value: string, name: string) => {
        setvalue(value);
    };

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (value.length >= 3) {
                let payload = {
                    search: value,
                    user: JSON.parse(window.localStorage.getItem("user") || "{}"),
                    projectName
                }
                AUTH_INTERCEPTOR.post("http://localhost:8080/project/get-all-users", payload).then(res => {
                    setsuggestions(res.data);
                })

            } else {
                setsuggestions([]);
            }
        }, 200);

        return () => clearTimeout(timeOut);
    }, [value]);

    return (
        <div className="absolute flex flex-col gap-2 top-[50%] min-w-[40%] max-h-1/4 left-[50%] -translate-x-[50%] -translate-y-[70%] z-30 w-100 p-4 rounded-md bg-slate-100 shadow-lg ">
            <div className="flex flex-col">
                <div className="text-2xl text-[#395886] font-semibold flex px-4 relative">
                    <span className="flex-1">Add Collaborators</span>
                    <CloseOutlinedIcon onClick={closeModal} className="text-black self-end cursor-pointer" />
                </div>
                <Input id="addMembers" type="text" placeholder="Add Members" register={register} handleChange={getUserData} />
                <AutoComplete addUser={addUser} suggestions={suggestions} extraCss="!mt-1 self-center w-4/5 !bg-white" />
            </div>
            <div className="flex items-center justify-between px-4 text-md font-base text-purple-700">
                You can also invite someone to this project with this link:
                <div className={"p-2 px-4 bg-[#395886] w-fit rounded text-white text-sm self-end shadow-lg flex gap-2"}><InsertLinkOutlinedIcon />Invite</div>
            </div>

        </div>
    );
};

export default AddMembersModal;
