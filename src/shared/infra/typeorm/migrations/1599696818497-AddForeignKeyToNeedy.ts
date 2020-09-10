import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddForeignKeyToNeedy1599696818497
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'needy',
      new TableForeignKey({
        name: 'NeedyType',
        columnNames: ['type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'type',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('needy', 'UserManagerId');
  }
}
