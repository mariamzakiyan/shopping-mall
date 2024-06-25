import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './repositories/product.repository';
import { CategoryService } from '../category/category.service';
import { CategoryRepository } from '../category/repositories/category.repository';
import { CategoryExistsValidation } from '../category/validations/category-exists.validation';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [
    ProductService,
    CategoryService,
    ProductRepository,
    CategoryRepository,
    CategoryExistsValidation,
  ],
  exports: [ProductService, ProductRepository],
})
export class ProductModule {}
