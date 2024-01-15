import bcrypt from 'bcrypt';
import { Error } from '../types/Error';
import { User } from '../types/User';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken"

dotenv.config();

const saltRounds = 10;
export const encPassword = async (
    password: string
): Promise<string> => {
    try {

        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        let message = 'Encryption Failed';
        if (error instanceof Error) message = error.message;
        throw { status: 500, message } as Error;
    }
};

export const verifyPassword = async (
    userPassword: string,
    hashedPassword: string
) => {
    try {
        const isMatch = await bcrypt.compare(userPassword, hashedPassword);
        if (isMatch) {
            return true;
        }
        // else {
        return false;
        // }
    } catch (error) {
        console.error('Password comparison error:', error);
        let message = 'Password comparison error';
        if (error instanceof Error) message = error.message;
        throw { status: 500, message } as Error;
    }
};

export const createToken = (user: User) => {

    return jwt.sign(user, process.env.TOKEN_KEY, {
        expiresIn: "30d",
    });
};