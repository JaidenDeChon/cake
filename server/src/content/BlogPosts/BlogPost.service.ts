import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';

import { BlogPost } from './BlogPost.model';
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
        private readonly blogPostModel: Model<BlogPost>
    ) {}

    /**
     * Inserts a BlogPost into the database.
     * @param   { BlogPost }   blogPost   The BlogPost object to insert into the database.
     */
    async createBlogPost (blogPost: BlogPost) {

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
    async getAllBlogPosts (): Promise<BlogPost[]> {
        const blogPosts = await this.blogPostModel.find().exec();
        return this.mapToBlogPostModel(blogPosts);
    }

    /**
     * Gets a single BlogPost by its ID.
     * @param   { string }   id   The ID of the BlogPost to get.
     */
    async getBlogPost (id: string): Promise<BlogPost> {
        const blogPost = await this.blogPostModel.findById(id);
        console.log(blogPost);
        if (!blogPost) throw new NotFoundException('Could not find BlogPost.');
        return this.mapToBlogPostModel(blogPost)[0];
    }

    /**
     * Updates a Blog Post.
     * @param   { id }        id        The ID of the Blog Post to update.
     * @param   { title }     title     The new title of the Blog Post.
     * @param   { content }   content   The new content of the Blog Post.
     * @param   { date }      date      The new date of the Blog Post.
     * @param   { img }       img       The new img of the Blog Post.
     */
    async updateBlogPost (id: string, title: string, content: string, date: string, img: string): Promise<void> {

        const blogPostToUpdate: BlogPost = await this.getBlogPost(id);
        console.log(blogPostToUpdate);

        if (title) blogPostToUpdate.title = title;
        if (content) blogPostToUpdate.content = content;
        if (date) blogPostToUpdate.date = date;
        if (img) blogPostToUpdate.img = img;

        blogPostToUpdate.save();
    }

    /**
     * Maps BlogPostSchema interface objects (or just one of them) to an array of BlogPost interface objects.
     * @param   { BlogPostSchema | BlogPostSchema[] }   toBeMapped   The object or array of objects to be mapped.
     */
    private mapToBlogPostModel (toBeMapped: BlogPost | BlogPost[]): BlogPost[] {

        const candidate = Array.isArray(toBeMapped)
            ? [...toBeMapped]
            : [toBeMapped];

        return candidate.map((blogPost) => ({
            id: blogPost.id,
            title: blogPost.title,
            content: blogPost.content,
            date: blogPost.date,
            img: blogPost.img
        })) as BlogPost[];
    }
}
