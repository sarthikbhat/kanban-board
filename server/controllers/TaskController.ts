import { Request, Response } from "express";
import { IRequest } from "../middlewares/AuthMiddleware";
import TaskSchema from "../models/Tasks";
import { Task } from "../types/Task";
import { handleError } from "../utils/handleError";

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

export const saveComment = async (req: IRequest, res: Response) => {
    try {
        let CommentId: string;
        let commentToSend;
        const body = req.body
        if (body.comment._id) {
            CommentId = body.comment._id;
            const task = await TaskSchema.findOneAndUpdate(
                { _id: body.taskId, "comments._id": body.comment._id },
                {
                    $set: {
                        "comments.$.comment": body.comment.comment,
                        "comments.$.commentedBy": body.comment.commentedBy
                    }
                }
            );
            commentToSend = await TaskSchema.findOne({ _id: body.taskId })
            commentToSend = commentToSend?.comments.filter(comment => comment._id.toString() === CommentId)[0]
        } else {
            const task = await TaskSchema.findOne({ _id: body.taskId });
            task?.comments.push(body.comment);
            task?.markModified("comments")
            await task?.save();
            CommentId = task?.comments.at(-1)?._id
            commentToSend = task?.comments.at(-1);
        }
        res.json(commentToSend?.toObject())
    } catch (error: any) {
        console.error(error);
        handleError(error, res)
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
