'use client';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { FC, useState } from 'react';
import Button from './Button';
import Input from './Input';
import { Control, UseFormRegister, useForm } from 'react-hook-form';

interface ProjectStepperProps {
  removeColumn: (value: string) => void;
  handleChange: (value: string, name: string) => void;
  columns: string[];
  defaultColumns: string[];
  control: Control<any>;
}

const ProjectStepper: FC<ProjectStepperProps> = ({
  removeColumn,
  handleChange,
  columns,
  defaultColumns,
  control
}) => {
  return (
    <>
      <Input
        type="text"
        placeholder="Project Name"
        parentPosition="items-start"
        label="Project Name"
        extraCss="!w-3/5"
        id="projectName"
        control={control}
      />
      <Input
        type="textarea"
        placeholder="Tell something about your project..."
        parentPosition="items-start"
        label="Project Description"
        extraCss="!w-3/5"
        id="projectDescription"
        control={control}
      />
    </>
  );
};

export default ProjectStepper;
