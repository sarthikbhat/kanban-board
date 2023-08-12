import { configDotenv } from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Schema } from "mongoose";
import { User } from "../types/User";
import UserSchema from "../models/Auth";
import { Error } from "../types/Error";
import { handleError } from "../utils/handleError";

configDotenv()

export interface IRequest extends Request {
  user?: Schema.Types.ObjectId;
}

export async function authenticate(req: IRequest, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;
    if (token) {
      const verify = jwt.verify(token, process.env.TOKEN_KEY) as {
        _id: Schema.Types.ObjectId;
      };
      const user: User | null = await UserSchema.findById(verify._id)
      if (user) {
        req.user = verify._id;
        next();
      }
    }
    else {
      handleError(new Error(401, "Unauthorized"), res);
    }
  } catch (error: Error | any) {
    handleError(new Error(500, error.message ? error.message : "Internal Server Error"), res);
  }
}