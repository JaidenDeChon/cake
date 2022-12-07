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

    // Enable CORS when in dev environment.
    if (process.env.NODE_ENV === 'production') app.enableCors();

    // Set up global prefix so that client is accessible from root path.
    app.setGlobalPrefix('api');

    // Set up Swagger.
    const swaggerConfig = new DocumentBuilder()
        .setTitle('JaID API')
        .setDescription('API endpoints related to content, users, and authentication')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/swagger', app, document);

    // Mount the app.
    console.log(`${ CliMessagePreface.INFO } App running on port ${ portNumber }.`);
    await app.listen(portNumber);
}

bootstrap();
