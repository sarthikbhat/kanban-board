import express, { Router } from "express";
import { deleteTask, saveTask } from "../controllers/TaskController";

const taskRouter: Router = express.Router();

taskRouter.post("/save-task", saveTask)
taskRouter.delete("/delete-task", deleteTask)

export default taskRouter;