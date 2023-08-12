import { Document } from "mongoose";
import { User } from "./User";

export interface Project extends Document {

    projectName: string;
    projectDescription: string;
    columns: Columns[];
    users: User[];
}

export interface Columns extends Document {
    columnName: string;
    order: number;
}

export enum DefaultColumns {
    TODO="To Do",
    INPROGRESS="In Progress",
    COMPLETED="Completed"
}