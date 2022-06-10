<script setup lang="ts">

    import { ref, computed } from 'vue';
    import BlogPostComponent from '@/components/blog-post.vue';
    import { useBlogsStore } from '@/stores/blogs';

    const blogStore = useBlogsStore();
    const blogs = computed(() => blogStore.posts);

</script>

<template>
    <div class="home-content">
        <BlogPostComponent v-for="blog in blogs" :key="blog.title" :blog-post="blog" />
    </div>
</template>

<style lang="scss" scoped>

    .home-content {
        padding: 4rem var(--global-padding);
    }

</style>
