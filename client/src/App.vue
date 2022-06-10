<script setup lang="ts">

    import { onMounted } from 'vue';
    import { RouterView } from 'vue-router'
    import GlobalHeader from '@/components/global-header.vue';
    import { useBlogsStore } from '@/stores/blogs';

    // Set up stores.
    const blogStore = useBlogsStore();

    // Mounted hook.
    onMounted(async () => {
        await blogStore.fetchBlogPosts();
    });

</script>

<template>
    <GlobalHeader />
    <RouterView />
</template>

<style>

    @import '@/assets/base.css';

    #app {
        font-weight: normal;
    }

</style>
