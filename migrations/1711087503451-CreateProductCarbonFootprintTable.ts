import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductCarbonFootprintTable1711087503451 implements MigrationInterface {
    name = 'CreateProductCarbonFootprintTable1711087503451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_carbon_footprint" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "emissionCO2eInKg" double precision NOT NULL, CONSTRAINT "PK_87dc4fdda08bca8d5439f161742" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product_carbon_footprint"`);
    }

}
