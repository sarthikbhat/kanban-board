import { Document } from "mongoose";

export interface User extends Document{
    
    userName:string;
    fullName:string;
    email?:string;
    password?:string;
    token?:string;
}