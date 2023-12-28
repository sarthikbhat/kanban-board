"use client";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import { FC, useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { IUser } from "@/app/addproject/page";

interface AutoCompleteProps {
  suggestions: IUser[];
  addUser: (user: any) => void;
  extraCss?: string
}


const AutoComplete: FC<AutoCompleteProps> = ({ suggestions, addUser,extraCss="" }) => {
  const clickHandler = (user: any) => {
    addUser(user)
  }
  return (
    <section
      id="autocomplete"
      className={
        "border border-2 shadow-2xl shadow-slate-100 w-3/5 max-h-40 overflow-hidden overflow-y-auto -mt-9 border rounded scroll-smooth z-10" +
        (!!suggestions.length ? "opacity-100 visible" : "opacity-0 invisible") +
        " transition ease-in duration-200 " + extraCss
      }
    >
      {suggestions.map((e, index) => {
        return (
          <div
            key={index}
            onClick={() => clickHandler(e)}
            className=" group px-4 py-2 flex gap-4 items-center  hover:bg-[#B1C9EF] transition ease-in cursor-pointer"
          >
            <div className="rounded-full p-2 text-sm border border-slate-400 shadow-lg text-slate-700">
              {e.fullName.split(" ").map((e) => e.charAt(0)).splice(0,2)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm">{e.fullName}</span>
              <span className="text-slate-400 text-xs">{e.userName}</span>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default AutoComplete;
