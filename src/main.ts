import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { setupExceptionFilters } from './common/app/setupExceptionFilters';
import { setupPipes } from './common/app/setupPipes';
import { ConfigService } from '@nestjs/config';
import { Environment } from './common/constants/environment';
import { useContainer } from 'class-validator';
import { AppEnvironment } from './common/constants/app-environment';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
  });

  const configService = app.get(ConfigService);
  const environment = configService.get<AppEnvironment>(
    Environment.ENVIRONMENT,
  );
  const port = configService.get(Environment.PORT);

  app.enableCors();

  setupPipes(app);
  setupExceptionFilters(app);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(port);

  return {
    port,
    environment,
  };
}

bootstrap().then(({ port, environment }) => {
  console.log('-----------------------------------------------------------');
  console.log(
    `   Shopping Mall API (${environment}) started on port ${port}`,
  );
  console.log('-----------------------------------------------------------');
});
