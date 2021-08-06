import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemon";

export async function GetPokemons() {
    const pokemonRepository = getRepository(Pokemon);

    const pokemons = pokemonRepository.find();
    return pokemons;
}