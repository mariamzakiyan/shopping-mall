import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CategoryService } from '../category.service';

export function CategoryExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'CategoryExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CategoryExistsValidation,
    });
  };
}

@Injectable()
@ValidatorConstraint({ name: 'CategoryExists', async: true })
export class CategoryExistsValidation implements ValidatorConstraintInterface {
  constructor(private readonly categoryService: CategoryService) {}

  async validate(id: number) {
    const category = await this.categoryService.getById(id);

    return !!category;
  }

  defaultMessage(args: ValidationArguments) {
    return `Category with id ${args.value} doesn't exist`;
  }
}
