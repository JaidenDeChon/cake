<template>
    <div class="custom-view">
        <h1>{{ customTitle }}</h1>
        <quill-editor-component :contents="customContent" :disabled="true" />
    </div>
</template>

<script setup lang="ts">

    import { useRoute } from 'vue-router';
    import { ref } from '@vue/reactivity';

    import type { IJaidRoute } from '@models/';
    import QuillEditorComponent from '@/components/quill-editor.vue';

    const $route = useRoute();
    const routeJaidObject = $route.meta.route as IJaidRoute;

    let customTitle = ref(routeJaidObject.pageTitle);
    let customContent = ref(routeJaidObject.content);

</script>

<style>

    .custom-view {
        padding: var(--global-padding);
    }
</style>
