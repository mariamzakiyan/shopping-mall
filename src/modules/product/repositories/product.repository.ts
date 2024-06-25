import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { IProductData } from '../types/product.type';

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
  constructor(dataSource: DataSource) {
    super(ProductEntity, dataSource.createEntityManager());
  }

  async findAll(limit: number, offset: number) {
    const [data, total] = await this.createQueryBuilder('products')
      .take(limit)
      .skip(offset)
      .getManyAndCount();
    return { products: data, total };
  }

  async findBySku(sku: string): Promise<ProductEntity> {
    return this.findOne({
      where: { sku },
    });
  }

  async createProduct(data: IProductData): Promise<ProductEntity> {
    return this.save(data);
  }
  async findById(id: number): Promise<ProductEntity> {
    return this.findOne({
      where: { id },
    });
  }

  async deleteById(id: number) {
    await this.delete({ id });
  }
  async updateProduct(id: number, data: IProductData) {
    return this.update({ id }, data);
  }

  async getSingleProductWithCategory(id: number): Promise<ProductEntity> {
    return this.findOne({
      where: { id },
      relations: ['category'],
    });
  }
}
