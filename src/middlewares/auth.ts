import {Request, Response, NextFunction} from "express";
import * as userService from "../services/userService";

export default async function checkToken(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers["authorization"];
    const token = authorization.split("Bearer ")[1];

    const user = await userService.authenticate(token);
    if(user === null) return res.sendStatus(401);

    next()
}