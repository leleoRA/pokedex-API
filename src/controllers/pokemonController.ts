import { Request, Response } from "express";
import * as pokemonService from "../services/pokemonService";
import * as userService from "../services/userService";

export async function GetPokemons (req: Request, res: Response) {
    try {
        const pokemons = await pokemonService.GetPokemons();
        res.status(200).send(pokemons);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
  