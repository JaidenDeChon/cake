<script setup lang="ts">

import { onActivated, onMounted, ref, type PropType } from 'vue';
import Quill, { type QuillOptionsStatic } from 'quill';

import { uploadImage } from '@/api/imagesApi';
import type { IHostedImage } from '@models/';

// Set up component props.
const props = defineProps(
    {
        disabled: { type: Boolean, default: true },
        contents: { type: Object as PropType<object | undefined>, default:  undefined }
    }
)

// Set up component emits.
const $emit = defineEmits(['contents-changed']);

// Set up QuillJS-related variables.
let editor!: Quill;
const editorElement = ref(null as null | Element);
const editorOptions: QuillOptionsStatic = {
    debug: 'error',
    placeholder: 'Blog post content here...',
    theme: 'snow',
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image']
        ]
    }
};

// Vue `mounted` lifecycle hook.
onMounted(() => { buildQuill(); });

// Vue `activated` lifecycle hook.
onActivated(() => setQuillContents());

/**
 * Sets up the Quill editor. Disables if `disabled` prop is true.
 */
function buildQuill (): void {
    editor = new Quill(editorElement.value as Element, editorOptions);
    setQuillContents();

    if (props.disabled) {
        editor.disable();
        return;
    }

    editor.getModule('toolbar').addHandler('image', () => { selectLocalImage(); });
    editor.on('text-change', emitContentsChanged);
}

/**
 * Passes the `contents` prop into the Quill instance.
 */
function setQuillContents () {
    if (props.contents) editor.setContents(props.contents);
}

/**
 * Informs the parent of a change in the content of the Quill instance.
 */
function emitContentsChanged (): void {
    $emit('contents-changed', editor.getContents());
}

/**
 * Prompts the user to select an image for use in this Quill document. Once chosen, the image is uploaded
 * to the server and then placed within the editor.
 */
async function selectLocalImage (): Promise<void> {

    // Create and click an input element to prompt the user to select a file.
    const input: HTMLInputElement = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();

    // Listen for when the user has selected a file.
    input.onchange = async () => {

        // Ensure there is a file before continuing.
        if (!input.files || !input.files[0]) return;

        const file: File = input.files[0];

        // Ensure the file is an image.
        if (!/^image\//.test(file.type)) alert('You may only upload images.');

        // Upload the image and then place it within the editor.
        const hostedImageData = await sendImageToServer(file);
        insertImageWithinQuill(hostedImageData);
    }

    // Remove the newly-created input element from the DOM as we no longer need it.
    input.remove();
}

/**
 * Sends an image, selected by the user, to the server for storage.
 * @param   { File }   file   The file that is to be uploaded for storage.
 */
async function sendImageToServer (file: File): Promise<IHostedImage> {
    const formData = new FormData();
    formData.append('file', file);
    const returnValue = await uploadImage(formData);
    return returnValue;
}

/**
 * Uses the URL within an IHostedImage object to place the user's selected image into the Quill instance.
 * @param   { IHostedImage }   hostedImageData   An object containing information about the uploaded image.
 */
function insertImageWithinQuill (hostedImageData: IHostedImage): void {
    let currentIndex = editor.getSelection()?.index;
    if (currentIndex === undefined) currentIndex = 0;
    editor.insertEmbed(currentIndex, 'image', hostedImageData.url);
    editor.setSelection(currentIndex + 1, 0);
}

</script>

<template lang="pug">

.quill-editor-container(:class="{ 'quill-editor-container--disabled': props.disabled }")

    .quill-editor(ref="editorElement" :class="{ 'has-input-border': !props.disabled }")

</template>

<style lang="scss">
    @import 'quill/dist/quill.snow.css';

    // Enabled styles
    .quill-editor-container:not(.quill-editor-container--disabled) {

        .quill-editor {

            border-radius: 
                0
                0
                var(--content-block-border-radius--small)
                var(--content-block-border-radius--small);

            strong {
                font-weight: bold !important;
            }
        }

        .ql-toolbar,
        .quill-editor {
            border: 0.1rem solid var(--vt-c-indigo) !important;
        }

        .ql-toolbar {
            min-height: 2.5rem;
            display: flex;
            border-bottom: none !important;
            border-radius: 
                var(--content-block-border-radius--small)
                var(--content-block-border-radius--small)
                0
                0;
        }

        .ql-editor.ql-blank::before {
            color: var(--color-text) !important;
        }

        .ql-toolbar .ql-stroke {
            stroke: var(--color-text) !important;
        }

        .ql-editor p {
            color: var(--vt-c-indigo);
        }

        button {
            margin-right: 0.25rem;
            border-radius: var(--content-block-border-radius--small);
            &.ql-active {
                background-color: var(--color-text);
                .ql-stroke, .ql-fill {
                    stroke: var(--vt-c-white) !important;
                }
            }
            &:not(.ql-active) {
                .ql-stroke, .ql-fill {
                    stroke: var(--vt-c-indigo) !important;
                }
            }
        }

        @media (prefers-color-scheme: dark) {

            .quill-editor {
                background-color: var(--color-background--inverted) !important;
            }

            .ql-editor.ql-blank::before {
                color: var(--color-text--inverted) !important;
            }

            button {
                &.ql-active {
                    background-color: var(--vt-c-white);
                    .ql-stroke, .ql-fill {
                        stroke: var(--vt-c-indigo) !important;
                    }
                }
                &:not(.ql-active) {
                    .ql-stroke, .ql-fill {
                        stroke: var(--vt-c-white) !important;
                    }
                }
            }
        }
    }

    // Disabled styles
    .quill-editor-container--disabled {

        .quill-editor {
            border: none;
        }

        .ql-toolbar {
            display: none;
        }

        .ql-editor {
            padding: 0;

            &::before {
                display: none;
            }
        }
    }
</style>
