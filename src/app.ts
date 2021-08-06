import "./setup";
import express from "express";
import cors from "cors";
import "reflect-metadata";
import connectDatabase from "./database";
import axios from "axios";
import Pokemon from "./entities/Pokemon";
import { getRepository } from "typeorm";
import * as userController from "./controllers/userConroller";
import * as pokemonController from "./controllers/pokemonController";
import auth from "./middlewares/auth";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.SignUp);
app.post("/sign-in", userController.SignIn);
app.get("/pokemons", auth, pokemonController.GetPokemons);
app.post("/my-pokemons/:id/add", auth, pokemonController.catchPokemons);

export async function init () {
  await connectDatabase();
}

export default app;
