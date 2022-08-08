<script setup lang="ts">

    import { computed } from 'vue';

    import BlogPostComponent from '@/components/blog-post.vue';
    import LandingHeroComponent from '@/components/landing-hero.vue'
    import { useHeroStore } from '@/stores/hero';
    import { useBlogsStore } from '@/stores/blogs';

    // Get hero.
    const heroStore = useHeroStore();
    const hero = computed(() => heroStore.hero);

    // Get blog posts.
    const blogStore = useBlogsStore();
    const blogs = computed(() => blogStore.posts);

</script>

<template>
    <div class="home-content">
        <landing-hero-component
            v-if="hero"
            :hero="hero"
            class="landing-hero-component"
        />
        <blog-post-component
            v-for="blog in blogs"
            :key="blog.title"
            :blog-post="blog"
            class="blog-post-component"
        />
    </div>
</template>

<style lang="scss" scoped>

    .home-content {
        padding: var(--global-padding);
    }

    .landing-hero-component {
        margin-bottom: var(--global-padding);
    }

</style>
