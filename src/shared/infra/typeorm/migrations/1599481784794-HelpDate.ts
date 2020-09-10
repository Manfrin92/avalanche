import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class HelpDate1599481784794 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'help_date',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
          },
          {
            name: 'help_id',
            type: 'uuid',
          },
          {
            name: 'user_volunteer_id',
            type: 'uuid',
          },
          {
            name: 'type_id',
            type: 'varchar',
          },
          {
            name: 'restaurant_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('help_date');
  }
}
