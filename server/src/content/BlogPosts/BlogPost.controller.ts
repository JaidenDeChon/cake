import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';

import { IBlogPost } from '../../models';
import { ControllerNames } from '../../constants';
import { BlogPostService } from './BlogPost.service';

/**
 * Controller for Blog Posts.
 */
@Controller(ControllerNames.BLOG_POSTS.toString())
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

    /**
     * Updates a Blog Post.
     * @param   { id }        id        The ID of the Blog Post to update.
     * @param   { title }     title     The new title of the Blog Post.
     * @param   { content }   content   The new content of the Blog Post.
     * @param   { date }      date      The new date of the Blog Post.
     * @param   { img }       img       The new img of the Blog Post.
     */
    @Patch('update-blog-post/:id')
    async updateBlogPost (
        @Param('id') id: string,
        @Body('title') title: string,
        @Body('content') content: string,
        @Body('date') date: string,
        @Body('img') img: string
    ): Promise<void> {
        await this._blogPostService.updateBlogPost(id, title, content, date, img);
    }

    /**
     * Deletes a blog post.
     * @param   { string }   id   The ID of the Blog Post to update.
     */
    @Delete('delete-blog-post/:id')
    async deleteBlogPost (@Param('id') id: string): Promise<void> {
        await this._blogPostService.deleteBlogPost(id);
    }
}
