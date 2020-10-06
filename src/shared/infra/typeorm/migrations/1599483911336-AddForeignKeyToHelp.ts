import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddForeignKeyToHelp1599483911336
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'help',
      new TableForeignKey({
        name: 'UserManagerId',
        columnNames: ['user_manager_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'help',
      new TableForeignKey({
        name: 'NeedyId',
        columnNames: ['needy_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'needy',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('help', 'NeedyId');
    await queryRunner.dropForeignKey('help', 'UserManagerId');
  }
}
