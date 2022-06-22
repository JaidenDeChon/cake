import { Body, Controller, Post } from "@nestjs/common";
import { BlogPostSchema } from "./BlogPost.model";
import { BlogPostService } from './BlogPost.service';

@Controller('blog-posts')
export class BlogPostController {

    constructor (private readonly _blogPostService: BlogPostService) {}

    @Post('create-blog-post')
    async createBlogPost(@Body() newBlogPost: BlogPostSchema): Promise<string> {
        return await this._blogPostService.createBlogPost(newBlogPost);
    }
}
