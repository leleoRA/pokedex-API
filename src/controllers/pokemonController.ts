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
      const pokemonId = parseInt(req.params.id);
      const action = "add";
      await pokemonService.catchPokemons(pokemonId, userId, action);
      res.sendStatus(200);
  } catch(err) {
      console.log(err);
      res.status(500).send(err);
  }    
};

export async function removePokemons(req: Request, res: Response) {
  try {
      const userId = res.locals.userId;
      const pokemonId = parseInt(req.params.id);
      const action = "remove";
      await pokemonService.catchPokemons(pokemonId, userId, action);
      res.sendStatus(200);
  } catch(err) {
      console.log(err);
      res.status(500).send(err);
  }    
};
  