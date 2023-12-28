import { Document } from "mongoose";
import { User } from "./User";
import { Task } from "./Task";

export interface Project extends Document {

    projectName: string;
    projectDescription: string;
    columns: Columns[];
    users: User[];
}

export interface Columns extends Document {
    columnName: string;
    order: number;
    color: string;
    tasks?: Task[];
}

export const DefaultColumns = [
    {
        columnName: 'To Do',
        color: '#f87171',
        order: 1
    },
    {
        columnName: 'In Progress',
        color: '#71f8d4',
        order: 2
    },
    {
        columnName: 'Completed',
        color: '#ebb95b',
        order: 3
    }
]