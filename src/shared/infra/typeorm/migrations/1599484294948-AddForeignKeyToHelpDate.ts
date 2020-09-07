import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddForeignKeyToHelpDate1599484294948
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'help_date',
      new TableForeignKey({
        name: 'HelpId',
        columnNames: ['help_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'helps',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'help_date',
      new TableForeignKey({
        name: 'TypeId',
        columnNames: ['type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'types',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'help_date',
      new TableForeignKey({
        name: 'RestaurantId',
        columnNames: ['restaurant_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'restaurants',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('help_date', 'HelpId');
    await queryRunner.dropForeignKey('help_date', 'TypeId');
    await queryRunner.dropForeignKey('help_date', 'RestaurantId');
  }
}
