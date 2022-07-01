import * as mongoose from 'mongoose';

/**
 * Interface representing the Mongoose schema for blog posts.
 * @TODO - Find a way to utilize this property in the object given to mongoose.Schema constructor below.
 */
export interface BlogPostSchema {
    id?: string;
    title: string;
    content: string;
    date: string;
    img?: string;
}

/**
 * Mongoose Schema object representing a BlogPost.
 */
export const BlogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true },
    img: { type: String, required: false }
});
