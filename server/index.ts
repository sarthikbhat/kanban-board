import express, { Express, Request, Response } from 'express';
import cors from "cors";
import path from "path";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
dotenv.config();

export default class App {
    public indexRouter = require("./routes/routes");

    public dir = path.join(__dirname, "public");
    public app: Express;
    public port: any;

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.initialiseRoutes();
    }

    private initialiseRoutes() {
        this.app.use(bodyParser.json({ limit: '10mb' }));
        this.app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
        this.app.use(express.static(this.dir));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use("/", this.indexRouter);
    }

    public listen() {

        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}⚡️`);
        });
    }
}

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log(`Connected with database 🎉`);
    const app = new App().listen();
}).catch(error => {
    console.error("Error Starting The server, Cannot Connect to DB");
    console.error(error);
})
