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

        if (!token) {
            return res.status(401).json({ msg: "No Token" })
        }

        const payload = jwtSimple.decode(token, jwt.jwtSecret);
        const userId = payload.userId
        const user = (await knex.table("users").where("id", userId))[0]

        console.log(token)
        console.log(payload)

        if (!user) {
            return res.status(401).json({ msg: "Permission Denied" });
        }

        req.users = {
            userId: user.id,
            role: user.role,
            username: user.username
        }
        return next()

    } catch (e) {
        return res.status(401).json({ msg: e.message });
    }
}