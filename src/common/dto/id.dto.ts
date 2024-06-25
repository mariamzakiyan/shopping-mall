import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class IdRequestDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}