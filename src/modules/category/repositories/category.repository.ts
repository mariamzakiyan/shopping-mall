import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoryRepository extends Repository<CategoryEntity> {
  constructor(dataSource: DataSource) {
    super(CategoryEntity, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<CategoryEntity> {
    return this.findOne({
      where: { id },
    });
  }
}
