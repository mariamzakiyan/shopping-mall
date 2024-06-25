import {
  IsNotEmpty,
  IsString,
  IsAlphanumeric,
  Length,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { CategoryExists } from '../../../category/validations/category-exists.validation';

export class ProductDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Expose()
  @IsNotEmpty()
  @Length(8, 8)
  @IsAlphanumeric()
  sku: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @CategoryExists()
  categoryId: number;
}
