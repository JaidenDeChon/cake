import * as mongoose from 'mongoose';

/**
 * The shape of a Blog Post throughout the app.
 * @TODO - Move this to a place availabale globally (client and server)
 */
 export interface BlogPost extends mongoose.Document {
    id: string;
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
