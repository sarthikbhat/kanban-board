"use client";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import { FC, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import ProjectStepper from "./ProjectStepper";
import AddUserStepper from "./AddUsersStepper";

interface ProjectStepperProps {
  removeColumn: (value: string) => void;
  handleChange: (value: string, name: string) => void;
  // handleStepper: (value: string, name: string) => void;
  columns: string[];
  defaultColumns: string[];
}

const CreateProjectStepper: FC<ProjectStepperProps> = ({
  removeColumn,
  handleChange,
  columns,
  defaultColumns,
}) => {
  const [step, setStep] = useState(1);
  const [stage, setstage] = useState("New Project");

  const handleStepper = () => {
    if (step < 2) setStep(step + 1);
    setstage("Add Users");
  };

  return (
    <>
      <div className="flex items-center text-slate-500 gap-2">
        <CloseTwoToneIcon />
        <div className="text-xl text-slate-500">
          Create a project - {stage} (Step {step} of 2)
          {step == 2 ? " (Optional)" : ""}
        </div>
      </div>
      <section className="flex flex-col gap-10">
        {
          {
            1: (
              <ProjectStepper
                removeColumn={removeColumn}
                handleChange={handleChange}
                columns={columns}
                defaultColumns={defaultColumns}
              />
            ),
            2: <AddUserStepper handleChange={handleChange} />,
          }[step]
        }
        <div className="flex gap-4">
          {step == 2 && (
            <Button
              text="Skip"
              type="outlined"
              width="w-1/5"
              onClick={handleStepper}
            />
          )}
          <Button
            text="Save Project"
            type="outlined"
            width="w-1/5"
            onClick={handleStepper}
          />
        </div>
      </section>
    </>
  );
};

export default CreateProjectStepper;
