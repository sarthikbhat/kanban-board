 import express, { Router } from "express"
import { getProject, getUsersForProject, saveProject, saveProjectUsers, updateProjectDetails } from "../controllers/ProjectControllers";

 const projectRouter: Router = express.Router();

 projectRouter.post("/save-project",saveProject)
 projectRouter.post("/save-project-users",saveProjectUsers)
 projectRouter.get("/get-project",getProject)
 projectRouter.get("/get-project-users",getUsersForProject)
 projectRouter.post("/update-project",updateProjectDetails)

 export default projectRouter;