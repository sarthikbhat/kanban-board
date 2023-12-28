import { Document, Types } from "mongoose";
import { User } from "./User";

export interface Task extends Document {
    taskName: string,
    taskDesc?: string,
    priority: string,
    estimation: number,
    actual?: number,
    assignedTo: User,
    project: Types.ObjectId,
    column: Types.ObjectId,
    comments: Comments[]
}

export interface Comments extends Document {
    comment: string,
    commentedBy:string
}