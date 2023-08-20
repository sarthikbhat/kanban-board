"use client";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import { FC, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { UseFormRegister, useForm } from "react-hook-form";

interface ProjectStepperProps {
  removeColumn: (value: string) => void;
  handleChange: (value: string, name: string) => void;
  columns: string[];
  defaultColumns: string[];
  register: UseFormRegister<any>;
}

const ProjectStepper: FC<ProjectStepperProps> = ({
  removeColumn,
  handleChange,
  columns,
  defaultColumns,
  register
}) => {


  return (
    <>
      <Input
        type="text"
        placeholder="Project Name"
        parentPosition="items-start"
        label="Project Name"
        extraCss="!w-3/5"
        handleChange={() => { }}
        id="projectName"
        register={register}
      />
      <Input
        type="textarea"
        placeholder="Tell something about your project..."
        parentPosition="items-start"
        label="Project Description"
        extraCss="!w-3/5"
        handleChange={() => { }}
        id="projectDescription"
        register={register}
      />
      {/* <div className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="e.g., Test In Progress, Ready To Test..."
          parentPosition="items-start"
          label="Columns"
          extraCss="!w-3/5"
          id="columns"
          handleChange={handleChange}
          register={register}
        />
        <span className="ml-2 text-red-500">
          Note: Incase no columns is added,{" "}
          <span className="font-semibold mr-1">
            [{defaultColumns.join(", ")}]
          </span>
          default columns will be added
        </span>
      </div>
      <div
        className={
          "flex w-4/5 max-w-6xl " +
          (!!columns.length ? "overflow-x-scroll py-3" : "")
        }
      >
        {columns.map((elm, index) => {
          return (
            <div
              key={index}
              className="bg-purple-400 m-1 p-2 rounded-2xl shadow-md shadow-purple-300 text-white flex gap-2 grow-0 font-regular flex items-center"
            >
              <div>{elm}</div>
              <span onClick={() => removeColumn(elm)}>
                <CloseTwoToneIcon className="cursor-pointer" />
              </span>
            </div>
          );
        })}
      </div> */}
    </>
  );
};

export default ProjectStepper;
