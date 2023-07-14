import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // CORS
  app.use(express.static(".")) // định vị lại đường dẫn để load tài nguyên


  // swagger 
  // yarn add @nestjs/swagger swagger-ui-express
  const config = new DocumentBuilder().setTitle("Node 32").build();
  const document = SwaggerModule.createDocument(app, config);
  // localhost:8080/swagger
  SwaggerModule.setup("/swagger", app, document);

  await app.listen(8080);
}
bootstrap();
