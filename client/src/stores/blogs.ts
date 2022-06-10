import { defineStore } from 'pinia';
import { fetchBlogPosts } from '@/api/blogApi';
import type BlogPost from '../../../models/BlogPost';

export const useBlogsStore = defineStore({

    id: 'blog',

    state: () => ({
        posts: [] as BlogPost[]
    }),

    actions: {
        async fetchBlogPosts() {
            const posts = await fetchBlogPosts();
            this.$patch({ posts });
        }
    }
});
