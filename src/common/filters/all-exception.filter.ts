import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    console.log('AllExceptionsFilter', { exception });

    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const response = exception?.getResponse && exception.getResponse();

    const responseBody = {
      statusCode,
      ...response,
      message: exception?.message,
      stack: exception?.stack?.split && exception.stack.split('\n    '),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
