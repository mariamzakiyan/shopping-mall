import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DatabaseTable } from '../../../common/constants/database';
import { CategoryEntity } from '../../category/entities/category.entity';

@Entity({ name: DatabaseTable.PRODUCTS })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 8, nullable: false, unique: true })
  sku: string;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'int' })
  categoryId: number;

  @ManyToOne(() => CategoryEntity)
  category: CategoryEntity;
}
