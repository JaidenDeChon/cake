import { Body, Controller, Post, Get, Param, Patch } from '@nestjs/common';

import { BlogPostService } from './BlogPost.service';
import { IBlogPost } from './BlogPost.model';

/**
 * Controller for Blog Posts.
 */
@Controller('blog-posts')
export class BlogPostController {

    constructor (private readonly _blogPostService: BlogPostService) {}

    /**
     * Creates a Blog Post.
     * @param      { BlogPost }   newBlogPost   The data for the new Blog Post.
     * @returns    An object containing the ID of the new Blog Post.
     */
    @Post('create-blog-post')
    async createBlogPost (@Body() newBlogPost: IBlogPost): Promise<{ id: string }> {
        const id = await this._blogPostService.createBlogPost(newBlogPost);
        return { id };
    }

    /**
     * Gets all of the Blog Posts.
     * @returns   All of the blog posts.
     */
    @Get('get-all-blog-posts')
    async getAllBlogPosts (): Promise<IBlogPost[]> {
        const blogPosts = await this._blogPostService.getAllBlogPosts();
        return blogPosts;
    }

    /**
     * Gets a single Blog Post.
     * @param     { string }   blogPostId   The ID of the Blog Post to find.
     * @returns   The Blog Post with the given ID.
     */
    @Get('get-blog-post/:id')
    async getBlogPost (@Param('id') blogPostId: string): Promise<IBlogPost> {
        const blogPost = await this._blogPostService.getBlogPost(blogPostId);
        return blogPost;
    }

    @Patch('update-blog-post/:id')
    async updateBlogPost (
        @Param('id') id: string,
        @Param('title') title: string,
        @Param('content') content: string,
        @Param('date') date: string,
        @Param('img') img: string
    ): Promise<void> {
        console.log('attempting to update blog post');
        await this._blogPostService.updateBlogPost(id, title, content, date, img);
    }
}
