import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { DatabaseTable } from '../../common/constants/database';

export class CreateProductsTable1719317453388 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DatabaseTable.PRODUCTS,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'sku',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'price',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'categoryId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      DatabaseTable.PRODUCTS,
      new TableForeignKey({
        columnNames: ['categoryId'],
        referencedTableName: DatabaseTable.CATEGORIES,
        referencedColumnNames: ['id'],
        onDelete: 'cascade',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DatabaseTable.PRODUCTS);
  }
}
