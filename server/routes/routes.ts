import express, { Express, Request, Response } from 'express';

const routes: Express = express();

import authRouter from "./AuthRoutes";
import { authenticate } from '../middlewares/AuthMiddleware';
import projectRouter from './ProjectRoutes';
import taskRouter from './TaskRoutes';

routes.use("/auth", authRouter)
routes.use("/project", authenticate, projectRouter);
routes.use("/task", taskRouter);

module.exports = routes;