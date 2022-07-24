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
    try { await axios.patch(`api/blog-posts/update-blog-post/${ newData.id?.toString() }`, newData) }
    catch (e) { throw e; }
}
