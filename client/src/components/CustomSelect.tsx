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
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

interface IModalProps {
    showList: boolean;
    defaultSelectText: string,
    options: any[],
    isUser?: boolean
    extraCss?: string,
    setData: (type: string, value: string | IUser) => void
}

const CustomSelect: FC<IModalProps> = ({ showList = false, defaultSelectText, options, isUser = true, extraCss, setData }) => {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();
    const [defaultSelectTextState, setdefaultSelectText] = useState("");
    const [showOptionList, setshowOptionList] = useState(false);
    const [optionsList, setoptionsList] = useState(options);

    useEffect(() => {

        console.log(defaultSelectText);
        document.addEventListener("mousedown", handleClickOutside);
        setdefaultSelectText(defaultSelectText);


        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])


    const handleClickOutside = (e: any) => {
        if (
            !e.target.classList.contains("custom-select-option") &&
            !e.target.classList.contains("selected-text")
        ) {
            setshowOptionList(false);
        }
    };

    // This method handles the display of option list
    const handleListDisplay = () => {
        setshowOptionList(!showOptionList);
    };

    // This method handles the setting of name in select text area
    // and list display on selection
    const handleOptionClick = (e: any) => {
        setdefaultSelectText(e.target.getAttribute("data-name"))
        setshowOptionList(false);
        setData(isUser ? "assignedTo" : "priority", e.target.getAttribute("data-name"));
    };

    return (
        <div className="custom-select-container text-ellipsis">
            <div
                className={(showOptionList ? "selected-text active" : "selected-text") + " text-ellipsis overflow-hidden cursor-pointer " + extraCss}
                onClick={handleListDisplay}
            >
                {isUser && <div className={"text-xs p-[0.3rem] bg-white border drop-shadow-lg rounded-full self-start" + (defaultSelectTextState === "Assign User" ? " !text-white !drop-shadow-none" : "")}>
                    {defaultSelectTextState?.split(" ").map((e) => e.charAt(0)).splice(0,2)}
                </div>}
                {defaultSelectTextState}
                {/* <div className="flex-[0.3]" /> */}
                <ArrowDropDownOutlinedIcon className="justify-self-end absolute right-2 text-sm z-10" />
            </div>
            {showOptionList && (
                <ul className="select-options bg-white mt-1 shadow">
                    {optionsList.map((option: any) => {
                        return (
                            <li
                                className="custom-select-option p-2 px-5 border-b-2 flex gap-4 items-center cursor-pointer hover:bg-[#B1C9EF]/50 text-sm"
                                data-name={option.fullName || option}
                                key={option.userName || option}
                                onClick={handleOptionClick}
                            >
                                {isUser && <div className="p-[0.3rem] bg-white border drop-shadow-lg text-xs rounded-full self-start">
                                    {option.fullName.split(" ").map((e: any) => e.charAt(0))}
                                </div>}
                                {option?.fullName || option}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;
