import express, { Router } from "express"
import { deleteProjectUsers, geAllUsers, getProject, getProjectByName, getUsersForProject, saveProject, saveProjectUsers, updateProjectDetails } from "../controllers/ProjectControllers";

const projectRouter: Router = express.Router();

projectRouter.post("/save-project", saveProject)
projectRouter.post("/save-project-users", saveProjectUsers)
projectRouter.get("/get-project", getProject)
projectRouter.get("/get-project-by-name", getProjectByName)
projectRouter.get("/get-project-users", getUsersForProject)
projectRouter.post("/get-all-users", geAllUsers)
projectRouter.post("/update-project", updateProjectDetails)
projectRouter.delete("/delete-project-user", deleteProjectUsers)

export default projectRouter;