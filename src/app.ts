import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userConroller";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.SignUp);
app.post("/sign-in", userController.SignIn);

export async function init () {
  await connectDatabase();
}

export default app;
