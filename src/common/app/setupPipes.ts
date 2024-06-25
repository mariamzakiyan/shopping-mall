import {
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationException } from '../exceptions/validation.exception';

export const setupPipes = (application: INestApplication) => {
  application.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new ValidationException(errors),
    }),
  );
};
