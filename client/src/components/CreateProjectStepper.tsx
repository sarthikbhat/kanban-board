"use client";
import API_UTIL from "@/services/ApiUtil";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import AddUserStepper from "./AddUsersStepper";
import Button from "./Button";
import ProjectStepper from "./ProjectStepper";

const DEFAULT_COLUMNS = ["To Do", "In Progress", "Completed"];


interface ProjectStepperProps {
}

const CreateProjectStepper: FC<ProjectStepperProps> = ({ }) => {
  const [step, setStep] = useState(1);
  const [stage, setstage] = useState("New Project");
  const [columns, setcolumns] = useState(DEFAULT_COLUMNS);
  const [project, setproject] = useState({} as any);

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
  };

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm();

  const onsubmit = (data: any) => {
    console.log(data);

    if (step == 1) {
      let token = "";
      if (typeof window !== "undefined")
        token = window.localStorage.getItem("token") || ""
      API_UTIL.post("/project/save-project", data, { headers: { "authorization": token } }).then(res => {
        setproject(res.data)
        setStep(step + 1)
        setstage("Add Users");
      })
    }
    else {
      router.push("/home")
    }
  }

  const addUserToProject = (project: any) => {
    setproject({ ...project })
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
                control={control}
                removeColumn={removeColumn}
                handleChange={handleChange}
                columns={columns}
                defaultColumns={DEFAULT_COLUMNS}
                register={register}
              />
            ),
            2: <AddUserStepper project={project} addUserToProject={addUserToProject} />,
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
