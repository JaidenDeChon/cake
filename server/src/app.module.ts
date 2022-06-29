import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogPostModule } from './content/BlogPosts/BlogPost.module';

const mongoDbConnectionString =
    'mongodb+srv://admin:admin@jaid-test-0.oyn3w.mongodb.net/?retryWrites=true&w=majority';

@Module({
    imports: [
        // Expose Mongoose to the app.
        MongooseModule.forRoot(mongoDbConnectionString),
        // Exposes 'BlogPost' module to the app.
        BlogPostModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
