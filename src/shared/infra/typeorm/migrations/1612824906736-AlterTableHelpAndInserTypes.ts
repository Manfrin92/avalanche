import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterTableHelpAndInserTypes1612824906736
  implements MigrationInterface {
  name = 'AlterTableHelpAndInserTypes1612824906736';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "help" ADD "image_name" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "help" ADD "type_status_id" character varying(40)`,
    );
    await queryRunner.query(
      `ALTER TABLE "help" ADD CONSTRAINT "FK_c896570e7b7bc4b61aa1164087c" FOREIGN KEY ("type_status_id") REFERENCES "type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `
      INSERT INTO public."type" ("name",group_name,id) VALUES ('Aguardando aprovação','typeStatus','waiting approval');
      INSERT INTO public."type" ("name",group_name,id) VALUES ('Aprovado','typeStatus','approved');
      INSERT INTO public."type" ("name",group_name,id) VALUES ('Completo','typeStatus','completed');
      INSERT INTO public."type" ("name",group_name,id) VALUES ('Cancelado','typeStatus','canceled');
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "help" DROP CONSTRAINT "FK_c896570e7b7bc4b61aa1164087c"`,
    );
    await queryRunner.query(`ALTER TABLE "help" DROP COLUMN "type_status_id"`);
    await queryRunner.query(`ALTER TABLE "help" DROP COLUMN "image_name"`);
  }
}
