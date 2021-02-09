import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterTableUser1612824149692 implements MigrationInterface {
  name = 'AlterTableUser1612824149692';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address_id"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "address_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_302d96673413455481d5ff4022a" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_302d96673413455481d5ff4022a"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address_id"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "address_id" character varying`,
    );
  }
}
