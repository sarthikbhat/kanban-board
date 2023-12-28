import { Response } from "express";
import { IRequest } from "../middlewares/AuthMiddleware";
import { handleError } from "../utils/handleError";
import { Columns, DefaultColumns, Project } from "../types/Project";
import UserSchema from "../models/Auth";
import { User } from "../types/User";
import ProjectSchema from "../models/Project";
import { Error } from "../types/Error";
import { Task } from "../types/Task";
import TaskSchema from "../models/Tasks";

export const saveProject = async (req: IRequest, res: Response) => {
    try {
        const project: Project = req.body;
        const findProject: Project | null = await ProjectSchema.findOne({ projectName: project.projectName });
        if (findProject) throw new Error(409, `Project [ ${project.projectName} ] already exixts`)
        const user: User | null = await UserSchema.findById(req.user);
        if (user) project.users = [user.toObject()];
        if (!project.columns) {
            project.columns = DefaultColumns as Columns[];
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

export const getProjectByName = async (req: IRequest, res: Response) => {
    try {
        const project: Project | null = await ProjectSchema.findOne({ projectName: { $in: req.query.projectName } }).populate("users");

        if (project) {
            const projectToObject: Project = project.toObject();
            const tasks: Task[] = await TaskSchema.find({ project: project?._id }).populate("assignedTo");
            console.log(tasks);
            

            projectToObject.columns.forEach((column: Columns) => {
                column.tasks = tasks.filter(task => task.column._id.toString() === column._id.toString());
            });
            // console.log(projectToObject);
            
            res.json(projectToObject);
        }
        else {
            res.json(null)
        }
    } catch (error) {
        console.error(error);
        handleError(error, res);
    }
}

export const saveProjectUsers = async (req: IRequest, res: Response) => {
    try {
        const project: any = req.body;
        const findProject: Project | null = await ProjectSchema.findOne({ projectName: project.projectName });
        if (!findProject) throw new Error(500, `Project [ ${project.projectName} ] doesn't exixt`)
        const users = await UserSchema.find({ userName: project.users.map((e: User) => e.userName) })
        findProject.users = users;
        const savedProject = await findProject.save();
        const savedProjectToObject = savedProject.toObject();
        res.json(savedProjectToObject);
    } catch (error) {
        console.error(error);
        handleError(error, res);
    }
}

export const deleteProjectUsers = async (req: IRequest, res: Response) => {
    try {
        const findProject: Project | null = await ProjectSchema.findOne({ projectName: req.query.projectName });
        if (!findProject) throw new Error(500, `Project [ ${req.query.projectName} ] doesn't exixt`)
        findProject.users.splice(findProject.users.findIndex(e => e.toString() === req.query.id),1);
        await findProject.save();
        const users = await UserSchema.find({ _id: findProject.users })
        res.json(users);
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
        const projectName: string = req.query.projectName as string;
        const findProject: Project | null = await ProjectSchema.findOne({ projectName: projectName });
        if (!findProject) throw new Error(500, `Project [ ${projectName} ] doesn't exixt`)
        const users = await UserSchema.find({ _id: findProject.users })
        res.json(users);
    } catch (error) {
        console.error(error);
        handleError(error, res);
    }
}

export const geAllUsers = async (req: IRequest, res: Response) => {
    try {
        const findProject: Project | null = await ProjectSchema.findOne({ projectName: req.body.projectName });
        if (!findProject) throw new Error(500, `Project [ ${req.body.projectName} ] doesn't exixt`)
        const findUsersBefore: User[] | null = await UserSchema.find({ _id: findProject.users });
        const notIncludedUserNames = findUsersBefore.map((e: User) => e.userName);
        const notIncludedFullNames = findUsersBefore.map((e: User) => e.fullName);
        console.log(findUsersBefore);
        const findUsers = await UserSchema.find({
            $or: [
                {
                    userName: {
                        $regex: ".*" + req.body.search + ".*",
                        // $ne: req.body.user.userName,
                        $nin: notIncludedUserNames
                    }
                },
                {
                    fullName: {
                        $regex: ".*" + req.body.search + ".*",
                        // $ne: req.body.user.fullName,
                        $nin: notIncludedFullNames
                    }
                }
            ]
        });
        res.json(findUsers);
    } catch (error) {
        console.error(error);
        handleError(error, res);
    }
}