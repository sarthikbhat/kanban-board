import { Request, Response } from "express"
import { handleError } from "../utils/handleError";
import UserSchema from "../models/Auth";
import { User } from "../types/User";
import { Error } from "../types/Error";
import { createToken, encPassword, verifyPassword } from "../utils/Password";

export const register = async (req: Request, res: Response) => {
    try {
        if (req.body != null && !!Object.keys(req.body).length) {
            const user: User = req.body;
            const findUser = await UserSchema.findOne({
                $or: [{ email: user.email }, { userName: user.userName }],
            });
            if (findUser) throw new Error(409, "User exists");
            const password = user.password as string
            const hashedPassword = await encPassword(password);
            user.password = hashedPassword;
            const result = await new UserSchema(user).save();
            const resultObject = result.toObject() as User;
            delete resultObject.password;
            resultObject.token = createToken(resultObject);
            res.json(resultObject);
        }
        else throw new Error(400, "Bad Request");

    } catch (error: any) {
        console.error(error);
        handleError(error, res);
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        if (req.body != null && !!Object.keys(req.body).length) {
            const user = req.body;
            const findUser: User = await UserSchema.findOne({
                email: user.email.toLowerCase()
            }).select("+password");
            if (!findUser) throw new Error(500, "User does not exist, please register first")
            const hashedPassword = findUser.password as string;
            if (await verifyPassword(user.password, hashedPassword)) {
                const result: User = findUser.toObject();
                delete result.password;
                const token = await createToken(result);
                res.status(200).json({
                    ...result,
                    token
                });
            }
            else throw new Error(500, "incorrect Password");
        }
        else throw new Error(400, "Bad Request");

    } catch (error: any) {
        console.error(error);
        handleError(error, res);
    }
}
