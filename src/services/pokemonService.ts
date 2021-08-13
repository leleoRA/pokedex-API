import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemon";
import User from "../entities/User";

interface newPokemon extends Pokemon {
    inMyPokemons: boolean,
}

export async function GetPokemons(userId: number) {

    const pokemonTrainer = await getRepository(User).findOne({
        where: {id: userId}
    });

    const pokemons = await getRepository(Pokemon).find({
        relations: ['users']
    })
    
    const pokes = pokemons.map((pokemon) => {
        return(
            {
                id: pokemon.id,
                name: pokemon.name,
                number: pokemon.number,
                image: pokemon.image, 
                weight: pokemon.weight,
                height: pokemon.height,
                baseExp: pokemon.baseExp,
                description: pokemon.description,
                inMyPokemons: pokemon.users.includes(pokemonTrainer) 
            }
        )
    })

    return pokes;

}

export async function catchPokemons(pokemonId:number, userId: number, action: string) {
    const trainer = await getRepository(User).findOne({
        where: {id: userId}
    })
    const pokemon = await getRepository(Pokemon).findOne({
        where: {id: pokemonId},
        relations: ['users']
    });

    if(action === "add") {
        pokemon.users.push(trainer);
    } else {
        pokemon.users.filter(user => user.id !== userId);
    }
    console.log(pokemon);

    await getRepository(Pokemon).save(pokemon);
}