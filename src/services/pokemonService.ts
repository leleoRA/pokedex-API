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

    console.log(typeof(pokes))
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


    // const pokemonTrainer = await getRepository(User).findOne({
    //     where: {id: userId}, relations: ['pokemons']
    // });

    // const pokemonRepository = getRepository(Pokemon);

    // const pokemons = await pokemonRepository.find();
    // pokemons.map((pokemon:newPokemon) => {
    //     if(pokemonTrainer.pokemons.includes(pokemon)) {
    //         pokemon.inMyPokemons = true;
    //     } else {
    //         pokemon.inMyPokemons = false;
    //     }
    // });

    // return pokemons;


// =====

// const pokemons = await getRepository(Pokemon).createQueryBuilder("pokemon")
// .leftJoinAndSelect("pokemon.users", "users", "user.id = :userId", {
//     userId: userId
// }).getMany();

// console.log(pokemons)

// const newPokemons = pokemons.map((pokemon: Pokemon) => {
// return {
//     id: pokemon.id,
//     name: pokemon.name,
//     number: pokemon.number,
//     image: pokemon.image,
//     weight: pokemon.weight,
//     height: pokemon.height,
//     baseExp: pokemon.baseExp,
//     description: pokemon.description,
//     inMyPokemons: (pokemon.users.length > 0)
// }
// })
// console.log(newPokemons[3]);
