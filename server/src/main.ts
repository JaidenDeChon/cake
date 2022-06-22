import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { CliMessagePreface } from './constants';

/**
 * Sets up and mounts the app.
 */
async function bootstrap() {

  // Set up variables pertaining to global concerns of the app.
  const portNumber = 3000;
  const app = await NestFactory.create(AppModule);

  // Set up Swagger.
  const swaggerConfig = new DocumentBuilder()
    .setTitle('BlogPosts')
    .setDescription('API calls relating to blog posts.')
    .setVersion('1.0')
    .addTag('blog-posts')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Mount the app.
  console.log(`${ CliMessagePreface.INFO } App running on port ${ portNumber }.`);
  await app.listen(portNumber);
}

bootstrap();

// @TODO - Find out why the create-blog-post controller isn't working.
