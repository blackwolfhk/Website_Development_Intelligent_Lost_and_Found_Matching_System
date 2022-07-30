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
import formidable, { Options, Files, File } from "formidable";
import fs from 'fs'
export let app = express();
app.use(cors());

// server handling request from json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

export const initFormidable = (uploadDir: string = ""): IncomingForm => {
    let param: Partial<Options> = {
        keepExtensions: true,
        maxFiles: 1,
        maxFileSize: 2000 * 1024 ** 2, // the default limit is 200KB
        filter: (part) => {
            console.log(part)
            return part.mimetype?.startsWith('image') || false
        },
    }
    const form = new formidable.IncomingForm(param)

    if (uploadDir) {
        fs.existsSync(uploadDir) || fs.mkdirSync(uploadDir, { recursive: true })
        param.uploadDir = uploadDir
    }
    return form
}

export const uploadFormidable = async (uploadDir: string, files: Files) => {
    if (uploadDir) {
        fs.existsSync(uploadDir) || fs.mkdirSync(uploadDir, { recursive: true })
    }
    let file: File = Array.isArray(files.image) ? files.image[0] : files.image
    let image = file ? file.newFilename : undefined

    const old = file.filepath
    const newPath = `${uploadDir}/${file.newFilename}`
    if (image) {
        fs.renameSync(old, newPath)
    }

    return file.newFilename
}

app.get("/test", (req: Request, res: Response) => {
    res.json({ msg: "CICD 12345" })
})

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
    // console.log(`Node ENV - ${process.env.NODE_ENV}`)
    // console.log(`POSTGRES_HOST - ${process.env.POSTGRES_HOST}`)
})
