import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { PAGINATION_LIMIT, PAGINATION_OFFSET } from '../constants/orm';

export class PaginationDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit: number = PAGINATION_LIMIT;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  offset: number = PAGINATION_OFFSET;
}
