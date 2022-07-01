import { Body, Controller, Post, Get, Param } from '@nestjs/common';

import { BlogPostSchema } from './BlogPost.model';
import { BlogPostService } from './BlogPost.service';
import { BlogPost } from 'src/models';

/**
 * Controller for Blog Posts.
 */
@Controller('blog-posts')
export class BlogPostController {

    constructor (private readonly _blogPostService: BlogPostService) {}

    /**
     * Creates a Blog Post.
     * @param      { BlogPostSchema }   newBlogPost   The data for the new Blog Post.
     * @returns    An object containing the ID of the new Blog Post.
     */
    @Post('create-blog-post')
    async createBlogPost (@Body() newBlogPost: BlogPostSchema): Promise<{ id: string }> {
        const id = await this._blogPostService.createBlogPost(newBlogPost);
        return { id };
    }
}
