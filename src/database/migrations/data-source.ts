import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { CreateCategoriesTable1719314563927 } from './1719314563927-create-categories-table';
import * as path from 'path';
import { CreateProductsTable1719317453388 } from './1719317453388-create-products-table';

dotenv.config({
  path: '.env',
});

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: true,
  entities: [path.join(__dirname, '../../modules/**/*.entity.{js,ts}')],
  migrations: [
    CreateCategoriesTable1719314563927,
    CreateProductsTable1719317453388,
  ],
  synchronize: false,
});
