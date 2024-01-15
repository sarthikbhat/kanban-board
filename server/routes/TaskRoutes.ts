import express, { Router } from "express";
import { deleteTask, saveComment, saveTask } from "../controllers/TaskController";

const taskRouter: Router = express.Router();

taskRouter.post("/save-task", saveTask)
taskRouter.delete("/delete-task", deleteTask)
taskRouter.post("/save-comment", saveComment)

export default taskRouter;