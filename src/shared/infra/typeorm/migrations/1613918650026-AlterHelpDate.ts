import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterHelpDate1613918650026 implements MigrationInterface {
  name = 'AlterHelpDate1613918650026';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "help_date" DROP CONSTRAINT "FK_37d150b35dcdbbdbbfa342c6e9a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" DROP CONSTRAINT "UQ_37d150b35dcdbbdbbfa342c6e9a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" ADD CONSTRAINT "FK_37d150b35dcdbbdbbfa342c6e9a" FOREIGN KEY ("user_volunteer_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "help_date" DROP CONSTRAINT "FK_37d150b35dcdbbdbbfa342c6e9a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" ADD CONSTRAINT "UQ_37d150b35dcdbbdbbfa342c6e9a" UNIQUE ("user_volunteer_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" ADD CONSTRAINT "FK_37d150b35dcdbbdbbfa342c6e9a" FOREIGN KEY ("user_volunteer_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
