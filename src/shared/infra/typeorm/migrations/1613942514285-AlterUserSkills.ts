import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterUserSkills1613942514285
  implements MigrationInterface {
  name = 'AlterUserSkills1613942514285';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_skills" DROP CONSTRAINT "FK_6926002c360291df66bb2c5fdeb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_skills" DROP CONSTRAINT "FK_a92c1d4217cb3d98919f6d2ffff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_skills" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_skills" DROP CONSTRAINT "REL_6926002c360291df66bb2c5fde"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_skills" ALTER COLUMN "type_skill_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_skills" DROP CONSTRAINT "REL_a92c1d4217cb3d98919f6d2fff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_skills" ADD CONSTRAINT "FK_6926002c360291df66bb2c5fdeb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_skills" ADD CONSTRAINT "FK_a92c1d4217cb3d98919f6d2ffff" FOREIGN KEY ("type_skill_id") REFERENCES "type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_skills" DROP CONSTRAINT "FK_a92c1d4217cb3d98919f6d2ffff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_skills" DROP CONSTRAINT "FK_6926002c360291df66bb2c5fdeb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_skills" ADD CONSTRAINT "REL_a92c1d4217cb3d98919f6d2fff" UNIQUE ("type_skill_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_skills" ALTER COLUMN "type_skill_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_skills" ADD CONSTRAINT "REL_6926002c360291df66bb2c5fde" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_skills" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_skills" ADD CONSTRAINT "FK_a92c1d4217cb3d98919f6d2ffff" FOREIGN KEY ("type_skill_id") REFERENCES "type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_skills" ADD CONSTRAINT "FK_6926002c360291df66bb2c5fdeb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
