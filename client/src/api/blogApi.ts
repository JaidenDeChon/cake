import axios from 'axios';

import type { IBlogPost } from '@models/';

export async function fetchBlogPosts(): Promise<IBlogPost[]> {
    const result = await axios.get('api/blog-posts/get-all-blog-posts');
    return result.data;
}
