import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import * as dotenv from 'dotenv';

import { BlogPostModule } from './content/BlogPosts/BlogPost.module';
import { HeroModule } from './content/Hero/Hero.module';
import { RoutesModule } from './content/Routes/Routes.module';


// Set up environmental variables.
dotenv.config();

// Username to MongoDB deployment.
const mongoUser = process.env.MONGO_USER;

// Password to MongoDB deployment.
const mongoPw = process.env.MONGO_PW;

// Name of MongoDB deployment.
const mongoDbName = process.env.MONGO_DB_NAME;

// Beginning of connection string.
const connectionStringPrepend = 'mongodb+srv://';

// End of connection string.
const connectionStringAppend = '.oyn3w.mongodb.net/?retryWrites=true&w=majority';

// Assembled connection string.
const connectionString =
    `${ connectionStringPrepend }${ mongoUser }:${ mongoPw }@${ mongoDbName }${ connectionStringAppend }`;

@Module({
    imports: [
        // Serve the built front-end.
        ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', '..', 'client/dist') }),
        // Expose Mongoose to the app.
        MongooseModule.forRoot(connectionString),
        // Exposes 'BlogPost' module to the app.
        BlogPostModule,
        // Exposes 'Hero' module to the app.
        HeroModule,
        // Exposes the 'Routes' module to the app.
        RoutesModule
    ]
})
export class AppModule {}
