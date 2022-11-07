import { MigrationInterface, QueryRunner } from "typeorm";

export class init1667062307854 implements MigrationInterface {
    name = 'init1667062307854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "exercise" (
                "id" SERIAL NOT NULL,
                "exerciseType" integer NOT NULL,
                "text" character varying NOT NULL,
                "correctAnswer" character varying,
                CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "exercise"
        `);
    }

}
