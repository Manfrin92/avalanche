import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAddressEntity1601292093555
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'address',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'address_zip_code',
            type: 'varchar',
            isNullable: true,
            length: '11',
          },
          {
            name: 'address_street',
            type: 'varchar',
            length: '70',
          },
          {
            name: 'address_number',
            type: 'int4',
          },
          {
            name: 'address_complement',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'address_area',
            type: 'varchar',
            length: '60',
          },
          {
            name: 'address_city',
            type: 'varchar',
            length: '60',
          },
          {
            name: 'address_state',
            type: 'varchar',
            length: '2',
          },
          {
            name: 'address_country',
            type: 'varchar',
            length: '60',
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
    await queryRunner.dropTable('address');
  }
}
