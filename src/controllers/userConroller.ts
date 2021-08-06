import { Request, Response } from "express";
import SignUpInterface from "../interfaces/SignUpInterface";
import SignInInterface from "../interfaces/SignInInterface";

import * as userService from "../services/userService";

export async function SignUp (req: Request, res: Response) {
  try {
    const user:SignUpInterface = req.body;

    if(user.password !== user.confirmPassword) return res.sendStatus(400);
 
    const userAdded = await userService.SignUp(user)
    
    if(!userAdded) return res.sendStatus(409)
    
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function SignIn (req: Request, res: Response) {
  try {
    const user:SignInInterface = req.body;
 
    const token = await userService.SignIn(user)

    if(token === null) return res.sendStatus(400);
   
    if(!token) return res.sendStatus(401);
    
    res.status(200).send(token);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}