import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '../../database/typeorm';
import { validate } from '../../common/validations/env.validation';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CategoryModule } from '../category/category.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate,
    }),
    EventEmitterModule.forRoot(),
    TypeOrmModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
