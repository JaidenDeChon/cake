<template>
    <article class="article">
        <img class="article__img" :src="blogPost.img">
        <h3 class="article__title">{{ blogPost.title }}</h3>
        <p class="article__date">{{ blogPost.date }}</p>
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

    const blogPost = ref(props.blogPost);

</script>

<style lang="scss" scoped>

    .article {
        width: 100%;
    
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;

        &__title,
        &__date,
        &__content {
            margin-bottom: 0.4rem;
        }

        &__img {
            width: 100%;
            max-height: 30rem;

            margin-bottom: 2.2rem;

            object-fit: cover;

            border-radius: 0.5rem;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }
    }

</style>
