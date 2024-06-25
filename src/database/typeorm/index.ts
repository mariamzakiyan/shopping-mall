import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { Environment } from '../../common/constants/environment';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { CategoryEntity } from '../../modules/category/entities/category.entity';
import { ProductEntity } from '../../modules/product/entities/product.entity';

export const TypeOrmModule = NestTypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    return {
      type: 'postgres',
      host: configService.get(Environment.DATABASE_HOST),
      port: +configService.get(Environment.DATABASE_PORT),
      username: configService.get(Environment.DATABASE_USER),
      password: configService.get(Environment.DATABASE_PASSWORD),
      database: configService.get(Environment.DATABASE_NAME),
      synchronize: false,
      entities: [CategoryEntity, ProductEntity],
      useUTC: true,
      timezone: 'UTC',
    };
  },
  dataSourceFactory: async (options) => {
    if (!options) {
      throw new Error('Data Source options not provided');
    }

    return addTransactionalDataSource(new DataSource(options));
  },
  inject: [ConfigService],
});
