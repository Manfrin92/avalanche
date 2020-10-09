import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddForeignKeyToHelpDate1599484294948
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'help_date',
      new TableForeignKey({
        name: 'HelpDateUserVolunteer',
        columnNames: ['user_volunteer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'help_date',
      new TableForeignKey({
        name: 'HelpDateHelp',
        columnNames: ['help_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'help',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'help_date',
      new TableForeignKey({
        name: 'HelpDateType',
        columnNames: ['type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'type',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('help_date', 'HelpDateType');
    await queryRunner.dropForeignKey('help_date', 'HelpDateHelp');
    await queryRunner.dropForeignKey('help_date', 'HelpDateUserVolunteer');
  }
}
