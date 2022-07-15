<script setup lang="ts">

    import { onMounted, ref } from 'vue';
    import { RouterView } from 'vue-router'

    import GlobalHeader from '@/components/global-header.vue';
    import { useHeroStore } from './stores/hero';
    import { useBlogsStore } from '@/stores/blogs';

    // Set up stores.
    const heroStore = useHeroStore();
    const blogStore = useBlogsStore();

    // Mounted hook.
    onMounted(async () => {
        await heroStore.fetchHero();
        await blogStore.fetchBlogPosts();
    });

    // Prevents default and stops propagation of the given event.
    function stopEvent(e: Event): boolean {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    // Disables scrolling on body.
    function lockScrolling (): void {
        document.getElementById('app')?.addEventListener('scroll', stopEvent);
        document.getElementById('app')?.addEventListener('mousewheel', stopEvent);
        document.getElementById('app')?.addEventListener('touchmove', stopEvent);
    }

    // Enables scrolling on body.
    function unlockScrolling (): void {
        document.getElementById('app')?.removeEventListener('scroll', stopEvent);
        document.getElementById('app')?.removeEventListener('mousewheel', stopEvent);
        document.getElementById('app')?.removeEventListener('touchmove', stopEvent);
    }

</script>

<template>
    <GlobalHeader @menu-is-open="lockScrolling" @menu-is-closed="unlockScrolling"/>
    <RouterView />
</template>

<style>

    @import '@/assets/base.css';

    #app {
        font-weight: normal;
    }

</style>
