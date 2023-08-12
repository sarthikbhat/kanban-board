import express, { Router } from "express";

const authRouter: Router = express.Router();

import { login, register } from "../controllers/AuthControllers";

authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter