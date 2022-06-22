import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlogPostSchema } from './BlogPost.model';
import { JaidModuleNames } from '../../constants';
import { BlogPostController } from './BlogPost.controller';
import { BlogPostService } from './BlogPost.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: JaidModuleNames.BLOG_POST, schema: BlogPostSchema }])
    ],
    controllers: [BlogPostController],
    providers: [BlogPostService]
})
export class BlogPostModule {}
