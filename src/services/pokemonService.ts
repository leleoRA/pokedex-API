import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemon";
import User from "../entities/User";

interface newPokemon extends Pokemon {
    inMyPokemons: boolean,
}

export async function GetPokemons(userId: number) {
    const pokemonTrainer = await getRepository(User).findOne({
        where: {id: userId}, relations: ['pokemons']
    });

    const pokemonRepository = getRepository(Pokemon);

    const pokemons = await pokemonRepository.find();
    pokemons.map((pokemon:newPokemon) => {
        if(pokemonTrainer.pokemons.includes(pokemon)) {
            pokemon.inMyPokemons = true;
        } else {
            pokemon.inMyPokemons = false;
        }
    })
    return pokemons;
}

export async function catchPokemons(id:number, userId: number) {
    const repository = getRepository("pokemons_users_users");
    await repository.insert({pokemonsId: id, usersId: userId})
}