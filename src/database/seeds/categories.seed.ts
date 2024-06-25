import 'reflect-metadata';
import { CategoryEntity } from '../../modules/category/entities/category.entity';
import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';

const categoriesSeed = async (dataSource: DataSource) => {
  const categoryRepository = dataSource.getRepository(CategoryEntity);

  const categories: CategoryEntity[] = Array.from({ length: 4 }).map(
    (_, index) => {
      const category = new CategoryEntity();
      category.id = index + 1;
      category.title = faker.lorem.word();
      category.description = faker.lorem.text();
      return category;
    },
  );

  await dataSource.query(`ALTER SEQUENCE categories_id_seq RESTART WITH 1`);
  await categoryRepository.save(categories);
  console.log('Seeded 5 categories.');
};

export default categoriesSeed;
