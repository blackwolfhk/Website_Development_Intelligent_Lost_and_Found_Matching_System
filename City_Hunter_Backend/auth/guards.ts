import { Request, Response, NextFunction } from "express";
import { Bearer } from 'permit';
import jwtSimple from 'jwt-simple'
import jwt from "./jwt";
import { knex } from "../server"

const permit = new Bearer({
    query: "access_token"
})



export async function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    try {
        const token = permit.check(req)
        console.log({ token })

        if (!token) {
            return res.status(401).json({ msg: "No Token" })
        }

        const payload = jwtSimple.decode(token, jwt.jwtSecret);
        const userId = payload.userId
        const user = (await knex.table("users").where("id", userId))[0]
        console.log({ payload })
        console.log({ userId })
        console.log({ user })


        if (!user) {
            return res.status(401).json({ msg: "Permission Denied, User does not exist" });
        }

        req.users = {
            userId: user.id,
            role: user.role,
            username: user.username
        }
        return next()

    } catch (e) {
        console.error(e.message)
        return res.status(401).json({ msg: e.message });
    }
}