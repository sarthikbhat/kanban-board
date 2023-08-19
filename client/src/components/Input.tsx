"use client";
import { FC, HTMLInputTypeAttribute, useState } from "react";

interface InputProps {
  id?: string;
  label?: string;
  type: HTMLInputTypeAttribute | "textarea";
  placeholder: string;
  displayLabel?: boolean;
  extraCss?: string;
  parentPosition?: string;
  handleChange: (value: string, name: string) => void;
}

const Input: FC<InputProps> = ({
  id,
  label,
  type,
  placeholder,
  displayLabel = true,
  extraCss,
  parentPosition = "items-center",
  handleChange,
}) => {
  const [value, setValue] = useState("");

  const handleChangeChild = (e: any, id: string) => {
    setValue(e.target.value);
    if (id === "columns") return;
    handleChange(e.target.value, id);
  };

  return (
    <div className={"flex flex-col gap-2 w-full " + parentPosition}>
      {displayLabel && (
        <label
          htmlFor={id}
          className={
            "text-md text-slate-600 self-start " +
            (parentPosition === "items-center" ? "ml-20" : "")
          }
        >
          {label}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          name={id}
          placeholder={placeholder}
          id={id}
          cols={30}
          rows={5}
          className={
            "w-4/5 border rounded-md p-4 focus:outline-none shadow-sm shadow-purple-300 hover:shadow-md hover:shadow-purple-100 resize-none " +
            (extraCss ? extraCss : "")
          }
        ></textarea>
      ) : (
        <input
          value={value}
          id={id}
          placeholder={placeholder}
          className={
            "w-4/5 border rounded-md p-4 focus:outline-none shadow-sm shadow-purple-300 hover:shadow-md hover:shadow-purple-100 " +
            (extraCss ? extraCss : "")
          }
          type={type}
          onChange={(e) => handleChangeChild(e, id ? id : "")}
          onKeyDown={(e: any) => {
            id === "columns"
              ? e.key === "Enter"
                ? (handleChange(e.target.value, id ? id : ""), setValue(""))
                : null
              : null;
          }}
        ></input>
      )}
    </div>
  );
};

export default Input;
