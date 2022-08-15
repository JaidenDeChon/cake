<script setup lang="ts">

    import { onMounted, ref } from 'vue';
    import { computed } from '@vue/reactivity';

    import type { IBlogPost } from '@models/';
    import { useBlogsStore } from '@/stores/blogs';
    import BlogPostComponent from '../../components/blog-post.vue';
    import QuillEditorComponent from '../../components/quill-editor.vue'

    /** Lifecycle stuff. */

    onMounted(async () => await updateBlogPostsData());

    /** Blog Posts-related stuff. */

    /** Computed property for list of Blog Posts. */

    const blogPostsStore = useBlogsStore();

    const blogPosts = computed(() => blogPostsStore.posts);

    const awaitingCreate = ref(false);
    const awaitingSave = ref(false);
    const awaitingDelete = ref(false);

    const awaitingAnything = computed(() => awaitingCreate.value || awaitingSave.value || awaitingDelete.value);

    /**
     * Ensures the list of Blog Posts is up-to-date.
     */
    async function updateBlogPostsData () {
        await blogPostsStore.fetchBlogPosts();
    }

    /** Blog Post creation-related stuff. */

    const newBlogPostTitle = ref('');
    const newBlogPostImage = ref('');
    const newBlogPostContent = ref('');

    const createBlogPostButtonText = computed(() => awaitingCreate.value ? 'Creating Blog Post...' : 'Create Blog Post');

    const newBlogPostObject = computed((): IBlogPost => ({
        title: newBlogPostTitle.value,
        content: newBlogPostContent.value,
        date: new Date().toString(),
        img: newBlogPostImage.value
    }));

    const canCreateBlogPost = computed(() => {
        const currentlyAwaitingSomething = awaitingAnything.value;
        const titleIsPopulated = !!newBlogPostObject.value.title;
        const contentIsPopulated = !!newBlogPostObject.value.content;

        return !currentlyAwaitingSomething
            && titleIsPopulated
            && contentIsPopulated;
    });

    /**
     * TODO
     * Creates a new blog post using the data entered.
     */
    async function createNewBlogPost () {

        awaitingCreate.value = true;

        const { id } = await blogPostsStore.createBlogPost(newBlogPostObject.value);

        if (id) {
            alert('New blog post created.');
            newBlogPostTitle.value = '';
            newBlogPostImage.value = '';
            newBlogPostContent.value = '';
        }

        awaitingCreate.value = false;
    }

    async function updateBlogPost (blogPostChanges: Partial<IBlogPost>) {
        // Try/catch is here because the updateBlogPost function has no return value to check.
        try {
            await blogPostsStore.updateBlogPost(blogPostChanges);
            alert('Your blog post has been updated.')
        }
        catch (e) { throw e; }
    }

    async function deleteBlogPost (blogPostId: string | undefined) {
        await blogPostsStore.deleteBlogPost(blogPostId ?? '');
    }

</script>

<template lang="pug">

.admin-config-blog-posts

    .admin-config-title-area
        h2 Configure Blog Posts
        p On this page, blog posts can be created, modified, and deleted.

    hr.admin-config-hr

    .admin-config-title-area
        h3 Create a new Blog Post

    .admin-config-form

        label.admin-config-form__label Title
            input.admin-config-form__input(v-model="newBlogPostTitle")

        label.admin-config-form__label (Optional) Image
            input.admin-config-form__input(v-model="newBlogPostImage")

        label.admin-config-form__label Content
            quill-editor-component.admin-config-form__input(
                v-model="newBlogPostContent"
                @click.prevent=""
            )

        button.jaid-button(
            :disabled="!canCreateBlogPost"
            @click="createNewBlogPost"
        ) {{ createBlogPostButtonText }}

    hr.admin-config-hr

    .admin-config-title-area
        h3 Manage Blog Posts

    blog-post-component.admin-config-live-component.admin-config-live-component--double-margin(
        v-for="blogPost in blogPosts"
        :blog-post="blogPost"
        :is-modifiable="true"
        :show-content="false"
        :awaiting-create="awaitingCreate"
        :awaiting-save="awaitingSave"
        :awaiting-delete="awaitingDelete"
        @update-blog-post="updateBlogPost"
        @delete-blog-post="deleteBlogPost(blogPost.id)"
    )

</template>
