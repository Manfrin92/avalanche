import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddType1602014194033 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO public."type" (id,"name",group_name)
      VALUES ('ride','Carona','helpedDateType');`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM public."type" where id = 'ride'`,
      undefined,
    );
  }
}
