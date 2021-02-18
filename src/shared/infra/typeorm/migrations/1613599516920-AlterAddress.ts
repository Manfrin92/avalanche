import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterAddress1613599516920 implements MigrationInterface {
  name = 'AlterAddress1613599516920';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" DROP COLUMN "address_number"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD "address_number" character varying(6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" DROP COLUMN "address_number"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD "address_number" integer`,
    );
  }
}
