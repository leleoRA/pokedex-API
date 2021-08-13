import { Request, Response } from "express";
import * as pokemonService from "../services/pokemonService";
import * as userService from "../services/userService";

export async function GetPokemons (req: Request, res: Response) {
    try {
        const userId = res.locals.userId;
        const pokemons = await pokemonService.GetPokemons(userId);
        res.status(200).send(pokemons);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

export async function catchPokemons(req: Request, res: Response) {
try {
    const userId = res.locals.userId;
    const id = parseInt(req.params.id);
    await pokemonService.catchPokemons(id, userId);
    res.sendStatus(200);
} catch(err) {
    console.log(err);
    res.status(500).send(err);
}    
}
  