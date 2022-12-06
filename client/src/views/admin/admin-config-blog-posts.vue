<script setup lang="ts">

    import { onMounted, ref, watch } from 'vue';
    import { computed } from '@vue/reactivity';

    import type { IBlogPost } from '@models/';
    import { useBlogsStore } from '@/stores/blogs';
    import BlogPostComponent from '../../components/blog-post.vue';
    import QuillEditorComponent from '../../components/quill-editor.vue';
    import { useImageUploadingService } from '@/services/useImageUploadingService';

    /** Lifecycle stuff. */

    onMounted(async () => await updateBlogPostsData());

    /** Blog Posts-related stuff. */

    const blogPostsStore = useBlogsStore();
    
    /** Computed property for list of Blog Posts. */
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
    const newBlogPostContent = ref({});

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

    function updateBlogPostQuillContent (newValue: object) {
        newBlogPostContent.value = newValue;
    }

    /**
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
        await blogPostsStore.updateBlogPost(blogPostChanges);
        alert('Your blog post has been updated.');
    }

    async function deleteBlogPost (blogPostId: string | undefined) {
        await blogPostsStore.deleteBlogPost(blogPostId ?? '');
    }

    /** Image upload-related stuff. */

    const { uploadImage, imageUploadProgress } = useImageUploadingService();

    /**
     * Uploads an image to the server and uses it as the Blog Post image.
     * @param   { Event }   event   Passed automatically by Vue - The event containing the image selected by
     *                              the user.
     */
    async function upload (event: Event): Promise<void> {
        const result = await uploadImage(event);
        newBlogPostImage.value = result.url;
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

        //- TODO - Combine the inputs here and in blog-post.vue

        label.admin-config-form__label Title
            input.admin-config-form__input(v-model="newBlogPostTitle")

        label.admin-config-form__label (Optional) Image
            input.admin-config-form__input(type="file" accept="image/*" @change="upload")

        label.admin-config-form__label Content
            quill-editor-component.admin-config-form__input(
                :disabled="false"
                @click.prevent=""
                @contents-changed="updateBlogPostQuillContent"
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
