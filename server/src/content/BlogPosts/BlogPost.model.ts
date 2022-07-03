import * as mongoose from 'mongoose';

import { IBlogPost } from '../../models';

/**
 * Mongoose Schema object representing a BlogPost.
 */
export const BlogPostSchema = new mongoose.Schema<IBlogPost>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true },
    img: { type: String, required: false }
});

export const BlogPost = mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
