import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddForeignKeyToHelpDateUsers1599484722149
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'help_date_users',
      new TableForeignKey({
        name: 'HelpDateId',
        columnNames: ['help_date_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'help_date',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'help_date_users',
      new TableForeignKey({
        name: 'UserId',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('help_date_users', 'HelpDateId');
    await queryRunner.dropForeignKey('help_date_users', 'UserId');
  }
}
