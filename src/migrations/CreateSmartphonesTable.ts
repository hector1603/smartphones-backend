import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSmartphonesTable1634227160617 implements MigrationInterface {
    name = 'CreateSmartphonesTable1634227160617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "smartphone" (
          "id" SERIAL NOT NULL,
          "nombre" character varying NOT NULL,
          "modelo" character varying NOT NULL,
          "precio_referencial" integer NOT NULL,
          "precio_venta" integer NOT NULL,
          "anio_modelo" integer NOT NULL,
          "datos_auditoria" json NOT NULL,
          CONSTRAINT "PK_0a8b2c3f9f6e8a0c4f1a4b5a9c6" PRIMARY KEY ("id")
        )`);
      }
      

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "smartphone"`);
    }

}
