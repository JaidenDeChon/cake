import { defineStore } from 'pinia';

import { fetchBlogPosts, createBlogPost } from '@/api/blogApi';
import type { IBlogPost } from '@models/';

export const useBlogsStore = defineStore({

    id: 'blog',

    state: () => ({
        posts: [] as IBlogPost[]
    }),

    actions: {

        async fetchBlogPosts (): Promise<void> {
            const posts = await fetchBlogPosts();
            this.$patch({ posts });
        },

        async createBlogPost (newBlogPost: IBlogPost): Promise<{ id: string }> {
            const result = await createBlogPost(newBlogPost);
            await this.fetchBlogPosts();
            return result;
        }
    }
});
