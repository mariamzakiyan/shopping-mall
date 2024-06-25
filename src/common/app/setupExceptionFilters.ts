import { INestApplication } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilter } from '../filters/all-exception.filter';

export const setupExceptionFilters = (application: INestApplication) => {
  application.useGlobalFilters(
    new AllExceptionsFilter(application.get(HttpAdapterHost)),
  );
};
