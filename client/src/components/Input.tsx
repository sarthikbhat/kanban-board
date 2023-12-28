"use client";
import { FC, HTMLInputTypeAttribute, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label?: string;
  type: HTMLInputTypeAttribute | "textarea";
  placeholder: string;
  displayLabel?: boolean;
  extraCss?: string;
  extraCssForLabel?: string;
  parentPosition?: string;
  handleChange?: (value: string, name: string) => void;
  customChange?: (value: string) => void;
  register: UseFormRegister<any>;
  error?: any;
}

const Input: FC<InputProps> = ({
  id,
  label,
  type,
  placeholder,
  displayLabel = true,
  extraCss,
  extraCssForLabel,
  parentPosition = "items-center",
  handleChange,
  customChange,
  register,
  error,
}) => {

  const handleChangeChild = (e: any, id: string) => {
    if (id === "columns") return;
    if (customChange) {
      customChange(e.target.value)
    }
    else {

      handleChange && handleChange(e.target.value, id);
    }
  };

  return (
    <div className={"flex flex-col gap-2 w-full relative " + parentPosition}>
      {displayLabel && (
        <label
          htmlFor={id}
          className={
            "text-md text-slate-600 self-start " +
            (parentPosition === "items-center" ? "ml-20" : "") + (error && error[id]?.message ? " !text-red-500" : "" +" "+extraCssForLabel )
          }
        >
          {label}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          id={id}
          cols={30}
          rows={5}
          {...register(id)}
          className={
            "w-4/5 border rounded-md p-4 focus:outline-none shadow-sm shadow-[#B1C9EF] hover:shadow-md hover:shadow-[#D5DEEF] resize-none " +
            (extraCss ? extraCss : "") + (error && error[id]?.message ? " border-red-500" : "")
          }
        ></textarea>
      ) : (
        <input
          id={id}
          placeholder={placeholder}
          className={
            "w-4/5 border rounded-md p-4 focus:outline-none shadow-sm shadow-[#B1C9EF] hover:shadow-md hover:shadow-[#D5DEEF] " +
            (extraCss ? extraCss : "") + (error && error[id]?.message ? " border-red-500" : "")
          }
          type={type}
          {...register(id)}
          onChange={(e) => handleChangeChild(e, id ? id : "")}
          onKeyDown={(e: any) => {
            id === "columns"
              ? e.key === "Enter"
                ? (e.preventDefault(),handleChange && handleChange(e.target.value, id ? id : ""))
                : null
              : null;
          }}
        ></input>
      )}
      <span className="absolute top-[100%] mt-1 text-sm text-red-500 px-2 rounded roundex-sm">
        {error && error[id]?.message}
      </span>
    </div>
  );
};

export default Input;
