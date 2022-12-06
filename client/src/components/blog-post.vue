<template lang="pug">

.article(:class="{ 'article--edit-mode': isModifiable && currentlyEditing }")

    template(v-if="currentlyEditing")

        label.admin-config-form__label Title
            input.admin-config-form__input(v-model="blogPostUpdate.title")

        label.admin-config-form__label (Optional) Image
            input.admin-config-form__input(type="file" accept="image/*" @change="upload")

        label.admin-config-form__label Content
            quill-editor-component.admin-config-form__input(
                :disabled="false"
                :contents="props.blogPost.content"
                @click.prevent=""
                @contents-changed="updateBlogPostQuillContent"
            )

        .article__edit-controls

            // Save modifications
            button.jaid-button(
                :disabled="!changesHaveBeenMade || awaitingAnything"
                @click="saveChanges"
            ) {{ saveButtonText }}

            // Cancel modifications
            button.jaid-button(
                @click="cancelChanges"
            ) {{ cancelButtonChanges }}

    template(v-else)

        img.article__img(v-if="props.blogPost.img" :src="props.blogPost.img")
        h2.article__title {{ props.blogPost.title }}
        p.article__date {{ props.blogPost.date }}
        quill-editor-component.admin-config-form__input(
            :contents="props.blogPost.content"
            @click.prevent=""
            @contents-changed="updateBlogPostQuillContent"
        )

        .article__edit-controls(v-if="isModifiable && !currentlyEditing")

            button.jaid-button(
                :disabled="awaitingAnything"
                @click="enableEditMode"
            ) {{ editButtonText }}

            button.jaid-button(
                :disabled="awaitingAnything"
                @click="deleteBlogPost"
            ) {{ deleteButtonText }}

</template>

<script setup lang="ts">

    import { onMounted, ref, watch, type PropType } from 'vue';
    import { computed } from '@vue/reactivity';

    import type { IBlogPost } from '@models/';
    import quillEditorComponent from './quill-editor.vue';
    import { useImageUploadingService } from '@/services/useImageUploadingService';

    /** Set up props. */

    const props = defineProps({
        blogPost: { type: Object as PropType<IBlogPost>, required: true },
        isModifiable: { type: Boolean, required: false },
        awaitingCreate: { type: Boolean, required: false },
        awaitingSave: { type: Boolean, required: false },
        awaitingDelete: { type: Boolean, required: false },
        showContent: { type: Boolean, required: false, default: true }
    });

    /** Set up emits. */

    const emitToParent = defineEmits(['update-blog-post', 'delete-blog-post']);

    /** Lifecycle hooks. */

    onMounted(() => setupBlogPostUpdateVModels());

    /** Blog Post configuration-related functionality.  */

    const blogPostUpdate = ref({} as IBlogPost);

    const currentlyEditing = ref(false);

    const editButtonText = 'Edit Blog Post';
    const deleteButtonText = computed(() => props.awaitingDelete ? 'Deleting...' : 'Delete Blog Post');
    const saveButtonText = computed(() => props.awaitingSave ? 'Saving...' : 'Save Changes');
    const cancelButtonChanges = 'Cancel';
    const changesHaveBeenMade = computed(() => Object.keys(modifiedFields.value).length);

    const modifiedFields = computed((): Partial<IBlogPost> => {

        const modifiedBlogPostFields = {} as Partial<IBlogPost>;

        if (blogPostUpdate.value.title !== props.blogPost.title)
            modifiedBlogPostFields.title = blogPostUpdate.value.title;

        if (blogPostUpdate.value.img !== props.blogPost.img)
            modifiedBlogPostFields.img = blogPostUpdate.value.img;

        if (blogPostUpdate.value.content !== props.blogPost.content)
            modifiedBlogPostFields.content = blogPostUpdate.value.content;

        return modifiedBlogPostFields;

    });

    const awaitingAnything = computed(() =>
        props.awaitingCreate || props.awaitingSave || props.awaitingDelete
    );

    function enableEditMode (): void {
        currentlyEditing.value = true;
    }

    /**
     * Updates the v-model object of this component to make editing a smoother process.
     */
    function setupBlogPostUpdateVModels () {
        blogPostUpdate.value.id = props.blogPost.id;
        blogPostUpdate.value.title = props.blogPost.title;
        blogPostUpdate.value.content = props.blogPost.content;
        blogPostUpdate.value.date = props.blogPost.date;
        blogPostUpdate.value.img = props.blogPost.img;
    }

    /**
     * Updates the content of the blog post with the contents of the Quill editor.
     * @param   { object }   newValue   Delta object representing the Quill editor contents.
     */
    function updateBlogPostQuillContent (newValue: object) {
        blogPostUpdate.value.content = newValue;
    }

    /**
     * Emits to the parent that the changes to the Blog Post should be saved.
     */
    function saveChanges () {
        if (!changesHaveBeenMade.value) return;
        emitToParent('update-blog-post', { id: props.blogPost.id, ...modifiedFields.value });
        currentlyEditing.value = false;
    }

    /**
     * Ends editing and resets all fields to their original values.
     */
    function cancelChanges () {
        currentlyEditing.value = false;
        setupBlogPostUpdateVModels();
    }

    /**
     * Emits to the parent that the changes to the Blog Post should be deleted.
     */
    function deleteBlogPost () {
        emitToParent('delete-blog-post');
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
        blogPostUpdate.value.img = result.url;
    }

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

            border-radius: var(--content-block-border-radius);
            box-shadow: rgba(100, 100, 111, 0.2) 0rem 0.4375rem 1.8125rem 0;
        }

        &__date {
            color: var(--color-border-hover)
        }

        &__content {
            margin-bottom: var(--global-padding);
        }

        &__edit-controls {
            margin-top: calc(var(--global-padding) / 2);
            button:not(:last-child) {
                margin-right: var(--global-padding)
            }
        }

        &--edit-mode {
            label {
                display: flex;
                flex-direction: column;

                width: 100%;
            }
        }
    }

</style>
