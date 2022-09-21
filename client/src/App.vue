<script setup lang="ts">

    import { onMounted } from 'vue';
    import { RouterView, useRouter } from 'vue-router'

    import GlobalHeader from '@/components/global-header.vue';
    import { useHeroStore } from './stores/hero';
    import { useRoutesStore } from '@/stores/routes';
    import { useBlogsStore } from '@/stores/blogs';

    // Set up Vue properties.
    const $router = useRouter();

    // Set up stores.
    const heroStore = useHeroStore();
    const routesStore = useRoutesStore();
    const blogStore = useBlogsStore();

    // Mounted hook.
    onMounted(async () => {
        await heroStore.fetchHero();
        await routesStore.getAllRoutes($router);
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
    <div class="sticky-header-container">
        <GlobalHeader class="global-header" @menu-is-open="lockScrolling" @menu-is-closed="unlockScrolling"/>
    </div>
    <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
            <component :is="Component" :key="$router.currentRoute.value.fullPath" />
        </Transition>
    </RouterView>
</template>

<style>

    @import '@/assets/base.css';
    @import '@/assets/inputs.css';
    @import '@/assets/buttons.css';

    #app {
        font-weight: normal;
        padding-top: var(--global-header-height);
    }

    .sticky-header-container {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 100;
    }

    /* Route transition styles */

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        transition-delay: 0.2s;
    }

</style>
