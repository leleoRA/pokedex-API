import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemon";

export async function GetPokemons() {
    const pokemonRepository = getRepository(Pokemon);

    const pokemons = pokemonRepository.find();
    return pokemons;
}

export async function catchPokemons(id:number, userId: number) {
    const repository = getRepository("pokemons_users_users");
    await repository.insert({pokemonsId: id, usersId: userId})
}