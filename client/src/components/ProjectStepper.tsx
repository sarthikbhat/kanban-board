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
    </>
  );
};

export default ProjectStepper;
