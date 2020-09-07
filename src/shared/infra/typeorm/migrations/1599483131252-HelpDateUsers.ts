import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class HelpDateUsers1599483131252 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'help_date_users',
        columns: [
          {
            name: 'help_date_id',
            type: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('help_date_users');
  }
}
