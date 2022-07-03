import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';

import { IBlogPost } from '../../../../models';

import { JaidModuleNames } from "src/constants";

/**
 * Injects server dependency BlogPostService.
 */
@Injectable()
export class BlogPostService {

    /**
     * Constructor.
     * @param   { Model<BlogPost> }   blogPostModel   The shape of a Blog Post throughout the app.
     */
    constructor(
        // Injects the BlogPost Mongoose model for use in this service.
        @InjectModel(JaidModuleNames.BLOG_POST)
        private readonly blogPostModel: Model<IBlogPost>
    ) {}

    /**
     * Inserts a BlogPost into the database.
     * @param   { BlogPost }   blogPost   The BlogPost object to insert into the database.
     */
    async createBlogPost (blogPost: IBlogPost) {

        const title = blogPost.title;
        const content = blogPost.content;
        const date = blogPost.date;
        const img = blogPost.img;

        const newBlogPost = new this.blogPostModel({ title, content, date, img });

        const result = await newBlogPost.save();
        return result.id as string;
    }

    /**
     * Gets all blogposts from the database.
     */
    async getAllBlogPosts (): Promise<IBlogPost[]> {
        const blogPosts = await this.blogPostModel.find().exec();
        return this.mapToBlogPostModel(blogPosts);
    }

    /**
     * Gets a single BlogPost by its ID.
     * @param   { string }   id   The ID of the BlogPost to get.
     */
    async getBlogPost (id: string): Promise<IBlogPost> {
        const blogPost = await this.blogPostModel.findById(id);
        console.log(blogPost);
        if (!blogPost) throw new NotFoundException('Could not find BlogPost.');
        return this.mapToBlogPostModel(blogPost)[0];
    }

    /**
     * Updates a Blog Post.
     * @param   { id }        _id       The ID of the Blog Post to update.
     * @param   { title }     title     The new title of the Blog Post.
     * @param   { content }   content   The new content of the Blog Post.
     * @param   { date }      date      The new date of the Blog Post.
     * @param   { img }       img       The new img of the Blog Post.
     */
    async updateBlogPost (
        _id: string,
        title: string,
        content: string,
        date: string,
        img: string
    ): Promise<IBlogPost> {
        const post = await this.blogPostModel.findByIdAndUpdate({ _id }, { title, content, date, img }).exec();
        if (!post) throw new NotFoundException('Could not find BlogPost to update.');
        return post;
    }

    /**
     * Deletes a blog post.
     * @param   { string }   _id   The ID of the Blog Post to update.
     */
    async deleteBlogPost (_id: string): Promise<void> {
        await this.blogPostModel.deleteOne({ _id }).exec();
    }

    /**
     * Maps BlogPostSchema interface objects (or just one of them) to an array of BlogPost interface objects.
     * @param   { BlogPostSchema | BlogPostSchema[] }   toBeMapped   The object or array of objects to be mapped.
     */
    private mapToBlogPostModel (toBeMapped: IBlogPost | IBlogPost[]): IBlogPost[] {

        const candidate = Array.isArray(toBeMapped)
            ? [...toBeMapped]
            : [toBeMapped];

        return candidate.map((blogPost) => ({
            id: blogPost.id,
            title: blogPost.title,
            content: blogPost.content,
            date: blogPost.date,
            img: blogPost.img
        })) as IBlogPost[];
    }
}
