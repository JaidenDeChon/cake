import axios from 'axios';

import type { IBlogPost } from '@models/';

export async function fetchBlogPosts (): Promise<IBlogPost[]> {
    const result = await axios.get('api/blog-posts/get-all-blog-posts');
    return result.data;
}

export async function createBlogPost (newData: IBlogPost): Promise<{ id: string }> {
    const result = await axios.post('api/blog-posts/create-blog-post', { ...newData })
    return result.data;
}

export async function updateBlogPost (newData: Partial<IBlogPost>): Promise<void> {
    if (!newData.id) throw new Error('Attempted to update Blog Post with invalid ID.');
    await axios.patch(`api/blog-posts/update-blog-post/${ newData.id?.toString() }`, newData);
}

export async function deleteBlogPost (blogPostId: string): Promise<void> {
    if (!blogPostId) throw new Error('Attempted to delete a Blog Post without a valid ID.');
    await axios.delete(`api/blog-posts/delete-blog-post/${ blogPostId.toString() }`);
}
