import { defineStore } from 'pinia';

import { fetchBlogPosts } from '@/api/blogApi';
import type { IBlogPost } from '@models/';

export const useBlogsStore = defineStore({

    id: 'blog',

    state: () => ({
        posts: [] as IBlogPost[]
    }),

    actions: {
        async fetchBlogPosts(): Promise<void> {
            const posts = await fetchBlogPosts();
            this.$patch({ posts });
        }
    }
});
