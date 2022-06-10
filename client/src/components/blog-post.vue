<template>
    <article class="article">
        <img class="article__img" :src="blogPost.title">
        <h1 class="article__title">{{ blogPost.title }}</h1>
        <p class="article__content">{{ blogPost.content }}</p>
    </article>
</template>

<script setup lang="ts">

    import type { PropType } from 'vue';
    import { ref } from 'vue';
    import type BlogPost from '../../../models/BlogPost';

    const props = defineProps({
        blogPost: { type: Object as PropType<BlogPost>, required: true }
    });

    const blogPost = ref(props);

</script>

<style lang="scss" scoped>
</style>
