import { Request, Response } from "express";

import * as userService from "../services/userService";

export async function SignUp (req: Request, res: Response) {
  try {
    const user = req.body;

    //validar o user com https://joi.dev/api/?v=17.4.2
    
    const userAdded = await userService.SignUp(user)
    
    if(!userAdded) return res.sendStatus(401)
    
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function getUsers (req: Request, res: Response) {
  try {
    const users = await userService.getUsers();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}