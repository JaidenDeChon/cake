import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';

import { BlogPost } from "src/models";
import { JaidModuleNames } from "src/constants";
import { BlogPostSchema } from "./BlogPost.model";

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
    async createBlogPost (blogPost: BlogPostSchema) {

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
        if (!blogPost) throw new NotFoundException('Could not find BlogPost.');
        return this.mapToBlogPostModel(blogPost)[0];
    }

    /**
     * Maps BlogPostSchema interface objects (or just one of them) to an array of BlogPost interface objects.
     * @param   { BlogPostSchema | BlogPostSchema[] }   toBeMapped   The object or array of objects to be mapped.
     */
    private mapToBlogPostModel (toBeMapped: BlogPostSchema | BlogPostSchema[]): BlogPost[] {

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
