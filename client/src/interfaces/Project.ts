import { IUser } from './User';

export interface IProject {
  projectName: string;
  projectDescription: string;
  columns: IColumns[];
  users: IUser[];
  tasks: any[];
  starred?: boolean;
  _id: string;
}

export interface IColumns {
  columnName: string;
  order: number;
  color: string;
  tasks: ITask[];
  _id: string;
}

export interface ITask {
  taskName: string;
  taskDesc?: string;
  priority: string;
  estimation: number;
  actual?: number;
  assignedTo: IUser;
  project: IProject;
  column: string;
  columnId: string;
  comments: IComment[];
  _id?: string;
  updatedAt?: string;
}

export interface IComment {
  comment: string;
  commentedBy?: string;
  originalValue?: string;
  createdAt?: string;
  updatedAt?: string;
  isChanged?: boolean;
  _id?: string;
  edit?: string;
}
