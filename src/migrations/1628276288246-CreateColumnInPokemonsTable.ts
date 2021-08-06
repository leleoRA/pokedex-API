import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateColumnInPokemonsTable1628276288246 implements MigrationInterface {
    name = 'CreateColumnInPokemonsTable1628276288246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "inMyPokemons" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "inMyPokemons"`);
    }

}
