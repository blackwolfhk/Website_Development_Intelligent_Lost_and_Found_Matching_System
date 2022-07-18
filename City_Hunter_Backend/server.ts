import express from 'express'
import cors from "cors"
import Knex from 'knex'
import * as knexConfig from "./knexfile";
export default knexConfig;

console.log("process.env.NODE_ENV : ", process.env.NODE_ENV)
export const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);

import { PostRoutes, postRoutes } from './routes/postRoutes'
import { ChatroomRoutes, chatroomRoutes } from './routes/chatroomRoutes'
import { UserRoutes, userRoutes } from "./routes/userRoutes";
// import { PostRoutes, postRoutes } from "./routes/userRoutes";
// import { ChatroomRoutes, chatroomRoutes } from "./routes/chatroomRoutes";

import { Request, Response } from "express";
import IncomingForm from 'formidable/Formidable'
import formidable, { Options } from "formidable";

export let app = express();
app.use(cors());

// server handling request from json data
app.use(express.json());
app.use('/upload', express.static('upload'))
// post setting
app.use(postRoutes);
PostRoutes.InitializePostRoutes(knex);

// chatroom setting
app.use(chatroomRoutes);
ChatroomRoutes.InitializeChatroomRoutes(knex);

// user setting
UserRoutes.InitializeUserRoutes(knex)
declare global {
    namespace Express {
        interface Request {
            users?: {
                userId: number;
                role: string;
                username: string;
            };
        }
    }
}

export const initFormidable = (): IncomingForm => {
    let param: Partial<Options> = {
        keepExtensions: true,
        maxFiles: 1,
        maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
        filter: (part) => {
            console.log(part)
            return part.mimetype?.startsWith('text/csv') || false
        },
    }
    const form = new formidable.IncomingForm(param)
    return form
}

app.get("/fail", (req: Request, res: Response) => {
    res.send("Failed attempt");
});


app.get("/", (req: Request, res: Response) => {
    res.send("Success");
});

app.use('/user', userRoutes)

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
    console.log(`Node ENV - ${process.env.NODE_ENV}`)
    console.log(`POSTGRES_HOST - ${process.env.POSTGRES_HOST}`)
})
