import { Schema, model } from "mongoose";
import { User } from "../types/User";

const User = new Schema<User>({
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: (props: string) =>
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                    props
                ),
            message: "Please provide a valid email",
        },
        unique: true
    },
    userName: {
        type: String,
        required: [true, 'Username is required'],
        validate: {
            validator: (props: string) => props.length > 3,
            message: "Length of the username should be > 3",
        },
        unique: true
    },
    fullName: {
        type: String,
        required: [true, 'fullName is required'],
        validate: {
            validator: (props: string) => props.length > 3,
            message: "Length of the fullname should be > 3",
        },
        unique: true
    },
    password: {
        type: String,
        select: false,
        required: [true, 'Password is required'],
        validate: {
            validator: (props: string) => props.length > 6,
            message: "Length of the password should be > 6",
        },
    }
    // { timestamps: true }
})

const UserSchema = model("users", User);

export default UserSchema;