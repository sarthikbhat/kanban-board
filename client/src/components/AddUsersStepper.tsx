"use client";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import { FC, useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import AutoComplete from "./AutoComplete";
import { UseFormRegister, useForm } from "react-hook-form";

interface AddUserStepperProps {
  handleChange: (value: string, name: string) => void;
}

export interface IUser {
  name: string;
  username: string;
  email: string;
}

const USERS: IUser[] = [
  {
    email: "abc@gmai.com",
    name: "Sarthik Bhat",
    username: "sarthik",
  },
  {
    email: "abc@gmai.com",
    name: "Sarthik Bhat",
    username: "sarthik28",
  },
  {
    email: "abc@gmai.com",
    name: "Sarthik Bhat",
    username: "sarthik28",
  },
  {
    email: "abc@gmai.com",
    name: "Sarthik Bhat",
    username: "sarthik28",
  },
  {
    email: "abc@gmai.com",
    name: "Sarthik Bhat",
    username: "sarthik28",
  },
  {
    email: "abc@gmai.com",
    name: "Sarthik Bhat",
    username: "sarthik28",
  },
  {
    email: "abc@gmai.com",
    name: "Sarthik Bhat",
    username: "sarthik28",
  },
  {
    email: "abc@gmai.com",
    name: "Sarthik Bhat",
    username: "sarthik28",
  },
  {
    email: "abc@gmai.com",
    name: "Sarthik Bhat",
    username: "sarthik28",
  },
  {
    email: "abc@gmai.com",
    name: "Sarthik Bhat",
    username: "sarthik28",
  },
  {
    email: "abc@gmai.com",
    name: "Akash Koul",
    username: "akhh",
  },
  {
    email: "abc@gmai.com",
    name: "Akhil Bhat",
    username: "Akhil",
  },
];

const AddUserStepper: FC<AddUserStepperProps> = ({ handleChange }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [value, setvalue] = useState("");
  const [suggestions, setsuggestions] = useState([] as IUser[]);

  const getUserData = (value: string, name: string) => {
    setvalue(value);
  };

  useEffect(() => { }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (value.length >= 3) {
        setsuggestions([
          ...USERS.filter(
            (e) =>
              e.username.toLowerCase().includes(value.toLowerCase()) ||
              e.name.toLowerCase().includes(value.toLowerCase())
          ),
        ]);
      } else {
        setsuggestions([]);
      }
    }, 200);

    return () => clearTimeout(timeOut);
  }, [value]);

  return (
    <>
      <Input
        type="text"
        placeholder="John Doe"
        parentPosition="items-start"
        label="Add Users"
        extraCss="!w-3/5"
        handleChange={getUserData}
        id="users"
        register={register}
      />
      <AutoComplete suggestions={suggestions} />
      <div className="text-md text-slate-600">Collaborators</div>
      <div className="border p-4 border-1 shadow shadow-slate-100 w-3/5 max-h-72 overflow-hidden overflow-y-auto -mt-8 border rounded scroll-smooth ">
        {USERS.map((e, index) => {
          return (
            <div
              key={index}
              className=" group px-4 py-2 flex gap-4 items-center"
            >
              <div className="rounded-full p-2 text-sm border border-slate-400 shadow-lg text-slate-700">
                {e.name.split(" ").map((e) => e.charAt(0))}
              </div>
              <div className="flex flex-col w-[50%]">
                <span className="text-sm">{e.name}</span>
                <span className="text-slate-400 text-xs">{e.username}</span>
              </div>
              <div className="text-sm font-medium text-slate-600 flex-1">
                Admin {index === 0 ? "(It's You)" : ""}
              </div>
              <div className="text-sm flex group items-center font-medium p-2 text-slate-600 hover:text-red-500 hover:bg-slate-100 transition ease-in hover:rounded--md cursor-pointer">
                Remove
                <DeleteOutlineTwoToneIcon className="text-[1.1rem] ml-1" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AddUserStepper;
