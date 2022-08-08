import axios from 'axios';

import type { IBlogPost } from '@models/';

export async function fetchBlogPosts (): Promise<IBlogPost[]> {
    let result;
    try { result = await axios.get('api/blog-posts/get-all-blog-posts'); }
    catch (e) { throw e; }
    return result.data;
}

export async function createBlogPost (newData: IBlogPost): Promise<{ id: string }> {
    let result;
    try { result = await axios.post('api/blog-posts/create-blog-post', { ...newData }) }
    catch (e) { throw e; }
    return result.data;
}

export async function updateBlogPost (newData: Partial<IBlogPost>): Promise<void> {
    if (!newData.id) throw new Error('Attempted to update Blog Post with invalid ID.');
    try { await axios.patch(`api/blog-posts/update-blog-post/${ newData.id?.toString() }`, newData) }
    catch (e) { throw e; }
}

export async function deleteBlogPost (blogPostId: string): Promise<void> {
    if (!blogPostId) throw new Error('Attempted to delete a Blog Post without a valid ID.');
    try { await axios.delete(`api/blog-posts/delete-blog-post/${ blogPostId.toString() }`) }
    catch (e) { throw e; }
}
