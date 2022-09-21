<template lang="pug">

.custom-view

    h1 {{ customTitle }}

    quill-editor-component(:contents="customContent" :disabled="true")

</template>

<script setup lang="ts">

    import { onActivated } from 'vue';
    import { useRoute } from 'vue-router';
    import { ref } from '@vue/reactivity';

    import type { IJaidRoute } from '@models/';
    import QuillEditorComponent from '@/components/quill-editor.vue';

    const $route = useRoute();
    const routeJaidObject = $route.meta.route as IJaidRoute;

    let customTitle = ref(routeJaidObject.pageTitle);
    let customContent = ref(routeJaidObject.content);

    onActivated(() => {
        customTitle.value = routeJaidObject.pageTitle;
        customContent.value = routeJaidObject.content ?? {};
    })

</script>

<style></style>
