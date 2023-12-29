import { Schema, model } from "mongoose";
import { Comments, Task } from "../types/Task";

const CommentSchema = new Schema<Comments>({
    comment: String,
    commentedBy: String,
}, { timestamps: true, });

const Task = new Schema<Task>({
    taskName: {
        type: String,
        required: [true, "Task Name is required"]
    },
    taskDesc: {
        type: String
    },
    priority: {
        type: String,
        required: [true, "Estimation is required"]
    },
    estimation: {
        type: Number,
        required: [true, "Estimation is required"]
    },
    actual: {
        type: Number
    },
    assignedTo: {
        type: Schema.ObjectId,
        ref: "users",
        default: null
    },
    project: Schema.ObjectId,
    column: Schema.ObjectId,
    comments: [CommentSchema]

}, { timestamps: true })

const TaskSchema = model("tasks", Task)

export default TaskSchema;