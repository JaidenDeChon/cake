<script setup lang="ts">

    // Import Vue stuff.
    import { RouterView } from 'vue-router'

    // Import components.
    import GlobalHeader from '@/components/global-header.vue';

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
