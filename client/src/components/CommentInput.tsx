"use client";
import { FC, HTMLInputTypeAttribute, useEffect, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    id: string
    label?: string;
    placeholder: string;
    displayLabel?: boolean;
    extraCss?: string;
    parentPosition?: string;
    value: string;
    handleChange: (value: string, name: string) => void;
}

const CommentInput: FC<InputProps> = ({
    id,
    label,
    placeholder,
    displayLabel = true,
    extraCss,
    value,
    parentPosition = "items-center",
    handleChange
}) => {

    const handleChangeChild = (e: any, id: string) => {
        handleChange(e.target.value, id);
    };

    useEffect(()=>{
        // console.log(process.env. );
        
    },[])

    return (
        <div className={"flex flex-col gap-2 w-full relative " + parentPosition}>
            {displayLabel && (
                <label
                    htmlFor={id}
                    className={
                        "text-xs text-slate-600 self-start " +
                        (parentPosition === "items-center" ? "ml-20" : "")
                    }
                >
                    {label}
                </label>
            )}
            <textarea
                placeholder={placeholder}
                id={id}
                cols={30}
                rows={5}
                defaultValue={value}
                onChange={(e) => handleChangeChild(e, id)}
                className={
                    "w-4/5 border rounded-md p-4 focus:outline-none shadow-sm shadow-[#B1C9EF] hover:shadow-md hover:shadow-[#D5DEEF] resize-none text-sm " +
                    (extraCss ? extraCss : "")
                }
            ></textarea>

        </div >
    );
};

export default CommentInput;
