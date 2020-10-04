import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddAddressIdColumnToUser1601809871975
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'address_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'address_id');
  }
}
