import { Request, Response } from "express";
import { handleError } from "../utils/handleError";
import { Task } from "../types/Task";
import TaskSchema, { CommentSchemaToExp } from "../models/Tasks";
import { Types } from "mongoose";

export const saveTask = async (req: Request, res: Response) => {
    try {
        const task: Task = req.body;
        let savedTaskToObject;
        
        // const comment = await CommentSchemaToExp.
        if (task._id) {
            const savedTask = await TaskSchema.findOneAndUpdate({ _id: task._id }, task);
            savedTaskToObject = savedTask?.toObject();
        }
        else {
            const savedTask = await new TaskSchema(task).save();
            savedTaskToObject = savedTask.toObject();
        }
        // const savedTaskToObject = savedTask.toObject();
        res.json(savedTaskToObject);
    } catch (error: any) {
        console.error(error);
        handleError(error, res);
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.query.taskId;
        const deletedTask = await TaskSchema.deleteOne({ _id: taskId });
        res.json({ deleted: deletedTask.acknowledged });
    } catch (error: any) {
        console.error(error);
        handleError(error, res);
    }
}

// export const fetchTasks = async (req: Request, res: Response) => {
//     try {
//         const task: Task = req.body;
//         const savedTask = await new TaskSchema(task).save();
//         const savedTaskToObject = savedTask.toObject();
//         res.json(savedTaskToObject);
//     } catch (error: any) {
//         console.error(error);
//         handleError(error, res);
//     }
// }
