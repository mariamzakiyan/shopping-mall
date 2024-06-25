import categoriesSeed from './categories.seed';
import dataSource from '../migrations/data-source';
import * as process from 'process';

(async () => {
  try {
    console.log('Starting to seed...');

    await dataSource.initialize();

    console.log('Connection initialized with database...');

    await categoriesSeed(dataSource);
    console.log('Categories have been seeded successfully.');

    console.log('Successfully seeded');

    process.exit();
  } catch (e) {
    console.error('Error during seeding:', e);
    process.exit(1);
  }
})();
