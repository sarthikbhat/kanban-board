import express, { Express, Request, Response } from 'express';

const routes: Express = express();

import authRouter from "./AuthRoutes";
import { authenticate } from '../middlewares/AuthMiddleware';
import projectRouter from './ProjectRoutes';

routes.use("/auth", authRouter)
routes.use("/project", authenticate, projectRouter);

module.exports = routes;