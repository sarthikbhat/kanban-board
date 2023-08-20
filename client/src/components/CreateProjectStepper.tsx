"use client";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import { FC, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import ProjectStepper from "./ProjectStepper";
import AddUserStepper from "./AddUsersStepper";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const DEFAULT_COLUMNS = ["To Do", "In Progress", "Completed"];


interface ProjectStepperProps {
  //   removeColumn: (value: string) => void;
  //   handleChange: (value: string, name: string) => void;
  //   // handleStepper: (value: string, name: string) => void;
  //   columns: string[];
  //   defaultColumns: string[];
}

interface IForm {
  projectName: string;
  projectDesc: string;
  columns: string[];
  users: any[];
}

const CreateProjectStepper: FC<ProjectStepperProps> = ({
  // removeColumn,
  // handleChange,
  // columns,
  // defaultColumns,
}) => {
  const [step, setStep] = useState(1);
  const [stage, setstage] = useState("New Project");
  const [columns, setcolumns] = useState(DEFAULT_COLUMNS);

  const handleChange = (value: any, name: string) => {
    if (name === "columns") {
      setcolumns([...columns, value]);
    }
  };

  const removeColumn = (val: string) => {
    columns.splice(
      columns.indexOf(val),
      1
    );
    setcolumns([...columns]);
  };
  const router = useRouter();

  const handleStepper = () => {
    // if (step == 1) {
    //   console.log("save project");
    //   setStep(step + 1)
    //   setstage("Add Users");
    // }
    // else {
    //   router.push("/home")
    // }
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onsubmit = (data: any) => {
    console.log(data);
    if (step == 1) {
      console.log("save project");
      setStep(step + 1)
      setstage("Add Users");
    }
    else {
      router.push("/home")
    }
  }

  return (
    <>
      <div className="flex items-center text-slate-500 gap-2">
        <CloseTwoToneIcon className="cursor-pointer" onClick={() => router.push("/home")} />
        <div className="text-xl text-slate-500">
          Create a project - {stage} (Step {step} of 2)
          {step == 2 ? " (Optional)" : ""}
        </div>
      </div>
      <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-10">
        {
          {
            1: (
              <ProjectStepper
                removeColumn={removeColumn}
                handleChange={handleChange}
                columns={columns}
                defaultColumns={DEFAULT_COLUMNS}
                register={register}
              />
            ),
            2: <AddUserStepper handleChange={handleChange} />,
          }[step]
        }
        <div className="flex gap-4">
          <Button
            text={step == 1 ? "Save Project" : "Done"}
            type="outlined"
            width="w-1/5"
            onClick={handleStepper}
          />
        </div>
      </form>
    </>
  );
};

export default CreateProjectStepper;
