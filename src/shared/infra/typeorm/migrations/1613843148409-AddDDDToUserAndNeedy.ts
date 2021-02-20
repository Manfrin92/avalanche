import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddDDDToUserAndNeedy1613843148409
  implements MigrationInterface {
  name = 'AddDDDToUserAndNeedy1613843148409';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "ddd" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "needy" ADD "ddd" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "needy" DROP COLUMN "ddd"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "ddd"`);
  }
}
