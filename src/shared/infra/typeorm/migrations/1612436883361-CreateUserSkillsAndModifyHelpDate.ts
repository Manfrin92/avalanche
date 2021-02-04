import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateUserSkillsAndModifyHelpDateAndAddTypes1612436883361
  implements MigrationInterface {
  name = 'CreateUserSkillsAndModifyHelpDateAndAddTypes1612436883361';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "AddressId"`);
    await queryRunner.query(
      `ALTER TABLE "help_date" DROP CONSTRAINT "HelpDateUserVolunteer"`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" DROP CONSTRAINT "HelpDateHelp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" DROP CONSTRAINT "HelpDateType"`,
    );
    await queryRunner.query(
      `ALTER TABLE "help" DROP CONSTRAINT "UserManagerId"`,
    );
    await queryRunner.query(`ALTER TABLE "help" DROP CONSTRAINT "NeedyId"`);
    await queryRunner.query(
      `CREATE TABLE "user_skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "other_description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "type_skill_id" character varying(40), CONSTRAINT "REL_6926002c360291df66bb2c5fde" UNIQUE ("user_id"), CONSTRAINT "REL_a92c1d4217cb3d98919f6d2fff" UNIQUE ("type_skill_id"), CONSTRAINT "PK_4d0a72117fbf387752dbc8506af" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address_id"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "address_id" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "needy" DROP CONSTRAINT "UQ_f6cf4b3dcc6fae38390b1e4fe0d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "type" DROP CONSTRAINT "PK_40410d6bf0bedb43f9cadae6fef"`,
    );
    await queryRunner.query(`ALTER TABLE "type" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "type" ADD "id" character varying(40) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "type" ADD CONSTRAINT "PK_40410d6bf0bedb43f9cadae6fef" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "type" ALTER COLUMN "group_name" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "help_date" DROP COLUMN "date"`);
    await queryRunner.query(
      `ALTER TABLE "help_date" ADD "date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" ALTER COLUMN "help_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" ADD CONSTRAINT "UQ_7967de569045fc9b97f23090d22" UNIQUE ("help_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" ALTER COLUMN "user_volunteer_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" ADD CONSTRAINT "UQ_37d150b35dcdbbdbbfa342c6e9a" UNIQUE ("user_volunteer_id")`,
    );
    await queryRunner.query(`ALTER TABLE "help_date" DROP COLUMN "type_id"`);
    await queryRunner.query(
      `ALTER TABLE "help_date" ADD "type_id" character varying(40)`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" ALTER COLUMN "phone_number" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" ALTER COLUMN "email" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" ADD CONSTRAINT "FK_7967de569045fc9b97f23090d22" FOREIGN KEY ("help_id") REFERENCES "help"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" ADD CONSTRAINT "FK_37d150b35dcdbbdbbfa342c6e9a" FOREIGN KEY ("user_volunteer_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" ADD CONSTRAINT "FK_09c003fb56b78b9075d329cd2d1" FOREIGN KEY ("type_id") REFERENCES "type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "help" ADD CONSTRAINT "FK_9361bef88c48f909cb20b3b7306" FOREIGN KEY ("user_manager_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "help" ADD CONSTRAINT "FK_0b8b5b5a4c9f10ca807afc6e9d1" FOREIGN KEY ("needy_id") REFERENCES "needy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "help" ADD CONSTRAINT "FK_71695ebf682217ff1f7f7f69a80" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "help" DROP CONSTRAINT "FK_71695ebf682217ff1f7f7f69a80"`,
    );
    await queryRunner.query(
      `ALTER TABLE "help" DROP CONSTRAINT "FK_0b8b5b5a4c9f10ca807afc6e9d1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "help" DROP CONSTRAINT "FK_9361bef88c48f909cb20b3b7306"`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" DROP CONSTRAINT "FK_09c003fb56b78b9075d329cd2d1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" DROP CONSTRAINT "FK_37d150b35dcdbbdbbfa342c6e9a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" DROP CONSTRAINT "FK_7967de569045fc9b97f23090d22"`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" ALTER COLUMN "email" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" ALTER COLUMN "phone_number" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "help_date" DROP COLUMN "type_id"`);
    await queryRunner.query(
      `ALTER TABLE "help_date" ADD "type_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" DROP CONSTRAINT "UQ_37d150b35dcdbbdbbfa342c6e9a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" ALTER COLUMN "user_volunteer_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" DROP CONSTRAINT "UQ_7967de569045fc9b97f23090d22"`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" ALTER COLUMN "help_id" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "help_date" DROP COLUMN "date"`);
    await queryRunner.query(
      `ALTER TABLE "help_date" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "type" ALTER COLUMN "group_name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "type" DROP CONSTRAINT "PK_40410d6bf0bedb43f9cadae6fef"`,
    );
    await queryRunner.query(`ALTER TABLE "type" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "type" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "type" ADD CONSTRAINT "PK_40410d6bf0bedb43f9cadae6fef" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "needy" ADD CONSTRAINT "UQ_f6cf4b3dcc6fae38390b1e4fe0d" UNIQUE ("email")`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address_id"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "address_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
    await queryRunner.query(`DROP TABLE "user_skills"`);
    await queryRunner.query(
      `ALTER TABLE "help" ADD CONSTRAINT "NeedyId" FOREIGN KEY ("needy_id") REFERENCES "needy"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "help" ADD CONSTRAINT "UserManagerId" FOREIGN KEY ("user_manager_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" ADD CONSTRAINT "HelpDateType" FOREIGN KEY ("type_id") REFERENCES "type"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" ADD CONSTRAINT "HelpDateHelp" FOREIGN KEY ("help_id") REFERENCES "help"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "help_date" ADD CONSTRAINT "HelpDateUserVolunteer" FOREIGN KEY ("user_volunteer_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "AddressId" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
