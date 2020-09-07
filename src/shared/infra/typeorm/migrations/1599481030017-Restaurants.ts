import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class Restaurants1599481030017 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'restaurants',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'restaurant_name',
            type: 'varchar',
          },
          {
            name: 'contact_name',
            type: 'varchar',
          },
          {
            name: 'phone_code',
            type: 'varchar',
          },
          {
            name: 'phone_number',
            type: 'varchar',
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
    await queryRunner.dropTable('restaurants');
  }
}
