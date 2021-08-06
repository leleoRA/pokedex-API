import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import User from "./User";

@Entity("pokemons")
export default class Pokemon{
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    name: string;
 
    @Column()
    number: number;
 
    @Column()
    image: string;
 
    @Column()
    weight: number;
 
    @Column()
    height: number;
 
    @Column()
    baseExp: number;
 
    @Column()
    description: string;

    @Column({default: false})
    inMyPokemons: boolean;

    @ManyToMany(() => User, user => user.pokemons)
    @JoinTable()
    users: User[]
  }