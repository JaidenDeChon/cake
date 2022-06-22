import { Injectable } from "@nestjs/common";
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

    // Private variable for holding full list of BlogPosts.
    private _allBlogPosts: BlogPost[] = [];

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
    async createBlogPost(blogPost: BlogPostSchema) {

        const title = blogPost.title;
        const content = blogPost.content;
        const data = blogPost.date;
        const img = blogPost.img;

        const newBlogPost = new this.blogPostModel({ title, content, data, img });
        const result = await newBlogPost.save();
        console.log(result);
        return 'this is a fake result';
    }


}
