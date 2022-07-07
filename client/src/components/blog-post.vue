<template>
    <article class="article">
        <img class="article__img" :src="blogPost.img">
        <h2 class="article__title">{{ blogPost.title }}</h2>
        <p class="article__date">{{ blogPost.date }}</p>
        <p class="article__content">{{ blogPost.content }}</p>
    </article>
</template>

<script setup lang="ts">

    import type { PropType } from 'vue';
    import { ref } from 'vue';

    import type { IBlogPost } from '@models/';

    const props = defineProps({
        blogPost: { type: Object as PropType<IBlogPost>, required: true }
    });

    const blogPost = ref(props.blogPost);

</script>

<style lang="scss" scoped>

    .article {
        width: 100%;
    
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;

        margin-bottom: 2.2rem;

        &__title,
        &__date,
        &__content {
            margin-bottom: 0.2rem;
        }

        &__img {
            width: 100%;
            max-height: 30rem;

            margin-bottom: 0.8rem;

            object-fit: cover;

            border-radius: 0.5rem;
            box-shadow: rgba(100, 100, 111, 0.2) 0rem 0.4375rem 1.8125rem 0;
        }

        &__date {
            color: var(--color-border-hover)
        }
    }

</style>
