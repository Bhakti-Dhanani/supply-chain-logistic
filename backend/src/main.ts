import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestMiddleware, Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void): void {
    console.log('Request...', req.headers);
    next();
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Supply Chain Logistics API')
    .setDescription('API documentation for Supply Chain Logistics Management System')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api'); // Add a global prefix for all routes
  app.enableCors(); // Enable CORS for frontend integration
  app.use(new AuthMiddleware().use); // Add the AuthMiddleware globally
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: http://localhost:${process.env.PORT ?? 3000}/api`);
}
bootstrap();
