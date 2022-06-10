<script setup lang="ts">

    import { ref } from 'vue';
    import type BlogPost from '../../../models/BlogPost';
    import BlogPostComponent from '@/components/blog-post.vue';
    import { useBlogsStore } from '@/stores/blogs';

    const blogStore = useBlogsStore();
    const blogPosts: BlogPost[] = blogStore.posts;
    const blogs = ref(blogPosts);

</script>

<template>
    <BlogPostComponent v-for="blog in blogs" :key="blog.title" :blog-post="blog" />
</template>
