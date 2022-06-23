import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogPostModule } from './content/BlogPosts/BlogPost.module';
// import { BlogPostController } from './content/BlogPosts/BlogPost.controller';
// import { BlogPostService } from './content/BlogPosts/BlogPost.service';

const mongoDbConnectionString = 'mongodb+srv://admin:admin@cluster0.uwwvphx.mongodb.net/jaid-test-0?retryWrites=true'

@Module({
  imports: [
    // Expose Mongoose to app.
    MongooseModule.forRoot(mongoDbConnectionString),
    // Exposes 'BlogPost' module to the app.
    BlogPostModule
  ],
  controllers: [AppController, /* BlogPostController */],
  providers: [AppService, /* BlogPostService */]
})
export class AppModule {}
