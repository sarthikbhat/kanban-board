"use client";
import CreateProjectStepper from "@/components/CreateProjectStepper";
import { IComment } from "@/components/TaskModal";
import { FC } from "react";

export interface IUser {

  userName: string;
  fullName: string;
  email?: string;
  password?: string;
  token?: string;
  _id: string
}

export interface IProject {

  projectName: string;
  projectDescription: string;
  columns: IColumns[];
  users: IUser[];
  tasks: any[];
  starred?: boolean;
  _id: string
}

export interface IColumns {
  columnName: string;
  order: number;
  color: string;
  tasks: ITask[];
  _id: string
}

export interface ITask {
  taskName: string,
  taskDesc?: string,
  priority: string,
  estimation: number,
  actual?: number,
  assignedTo: IUser,
  project: IProject,
  column: string,
  columnId: string,
  comments: IComment[],
  _id?: string,
  updatedAt?: string
}

const AddProject: FC = ({ }) => {




  return (
    <section className="flex gap-10" style={{ height: "100vh" }}>
      <div className="flex-1 p-20 flex flex-col gap-20">
        <CreateProjectStepper
        />
      </div>
      <div
        className="bg-[#B1C9EF] h-full relative hidden xl:block"
        style={{ flex: "0.4" }}
      >
        <img
          alt="side"
          src="/assets/images/side.png"
          className="absolute !top-1/2 !-translate-y-1/2 !-translate-x-1/4"
          style={{ height: "60vh", objectFit: "cover", width: "50vh" }}
        />
      </div>
    </section>
  );
};

export default AddProject;
