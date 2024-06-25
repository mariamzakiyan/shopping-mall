import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DatabaseTable } from '../../../common/constants/database';
import { ProductEntity } from '../../product/entities/product.entity';

@Entity({ name: DatabaseTable.CATEGORIES })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: false, unique: true })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
