import { Response } from "express";
import { IRequest } from "../middlewares/AuthMiddleware";
import { handleError } from "../utils/handleError";
import { Columns, DefaultColumns, Project } from "../types/Project";
import UserSchema from "../models/Auth";
import { User } from "../types/User";
import ProjectSchema from "../models/Project";
import { Error } from "../types/Error";
import { log } from "console";

export const saveProject = async (req: IRequest, res: Response) => {
    try {
        const project: Project = req.body;
        const findProject: Project | null = await ProjectSchema.findOne({ projectName: project.projectName });
        if (findProject) throw new Error(409, `Project [ ${project.projectName} ] already exixts`)
        const user: User | null = await UserSchema.findById(req.user);
        if (user) project.users = [user.toObject()];
        if (!project.columns) {
            project.columns = Object.values(DefaultColumns).map((e, index) => { return { columnName: e.toString(), order: index + 1 } as Columns });
        }
        const savedProject = await new ProjectSchema(project).save();
        const savedProjectTobject = savedProject.toObject();
        const projectUsers = await UserSchema.find({ _id: savedProjectTobject.users });
        savedProjectTobject.users = projectUsers;
        res.json(savedProjectTobject);
    } catch (error) {
        console.error(error);
        handleError(error, res);
    }
}

export const getProject = async (req: IRequest, res: Response) => {
    try {
        const project: Project[] = await ProjectSchema.find({ users: { $in: req.user } });
        res.json(project);

    } catch (error) {
        console.error(error);
        handleError(error, res);
    }
}

export const saveProjectUsers = async (req: IRequest, res: Response) => {
    try {
        const project: Project = req.body;
        const findProject: Project | null = await ProjectSchema.findOne({ projectName: project.projectName });
        if (!findProject) throw new Error(500, `Project [ ${project.projectName} ] doesn't exixt`)
        const users = await UserSchema.find({ userName: project.users })
        findProject.users = users;
        const savedProject = await findProject.save();
        const savedProjectToObject = savedProject.toObject();
        res.json(savedProjectToObject);
    } catch (error) {
        console.error(error);
        handleError(error, res);
    }
}
export const updateProjectDetails = async (req: IRequest, res: Response) => {
    try {
        const project: Project = req.body;
        const findProject: Project | null = await ProjectSchema.findOne({ projectName: project.projectName });
        if (!findProject) throw new Error(500, `Project [ ${project.projectName} ] doesn't exixt`)
        const updatedProject = { ...findProject.toObject(), ...project };
        findProject.overwrite(updatedProject)
        const savedProject = await findProject.save();
        const savedProjectToObject: Project = savedProject.toObject();
        const projectUsers = await UserSchema.find({ _id: savedProjectToObject.users });
        savedProjectToObject.users = projectUsers;
        res.json(savedProjectToObject);
    } catch (error) {
        console.error(error);
        handleError(error, res);
    }
}

export const getUsersForProject = async (req: IRequest, res: Response) => {
    try {
        const projectId: string = req.query.projectId as string;
        const findProject: Project | null = await ProjectSchema.findOne({ _id: projectId });
        if (!findProject) throw new Error(500, `Project with id [ ${projectId} ] doesn't exixt`)
        const users = await UserSchema.find({ _id: findProject.users })
        res.json(users);
    } catch (error) {
        console.error(error);
        handleError(error, res);
    }
}
