"use client";
import CreateProjectStepper from "@/components/CreateProjectStepper";
import { FC, useEffect, useState } from "react";

const DEFAULT_COLUMNS = ["To Do", "In Progress", "Completed"];

interface IForm {
  projectName: string;
  projectDesc: string;
  columns: string[];
  users: any[];
}

const AddProject: FC = ({}) => {
  const [form, setform] = useState({
    columns: DEFAULT_COLUMNS,
    projectDesc: "",
    projectName: "",
    users: [],
  } as IForm);

  const handleChange = (value: any, name: string) => {
    if (name === "columns") {
      form["columns"] = [...form["columns"], value];
      setform({...form});      
    }
  };

  const removeColumn = (val: string) => {
    form["columns"].splice(
      form["columns"].indexOf(val),
      1
    );
    setform({...form});
  };

  return (
    <section className="flex flex gap-10" style={{ height: "100vh" }}>
      <div className="flex-1 p-20 flex flex-col gap-20">
        <CreateProjectStepper
          columns={form.columns}
          defaultColumns={DEFAULT_COLUMNS}
          handleChange={handleChange}
          removeColumn={removeColumn}
        />
      </div>
      <div
        className="bg-purple-300 h-full relative hidden xl:block"
        style={{ flex: "0.4" }}
      >
        <img
          src="/assets/images/side.png"
          className="absolute !top-1/2 !-translate-y-1/2 !-translate-x-1/4"
          style={{ height: "60vh", objectFit: "cover", width: "50vh" }}
        />
      </div>
    </section>
  );
};

export default AddProject;
