import { Schema, model } from "mongoose";
import { Columns, Project } from "../types/Project";

const ColumnSchema = new Schema<Columns>({
    columnName: String,
    order: Number
}, { _id: false });

const Project = new Schema<Project>({
    projectName: {
        type: String,
        required: [true, "Project Name is required"]
    },
    projectDescription: {
        type: String,
        required: [true, "Project Description is required"]
    },
    columns: [ColumnSchema],
    users: [{ type: Schema.ObjectId, ref: "users" }]

}, { timestamps: true })

const ProjectSchema = model("projects", Project)

export default ProjectSchema;