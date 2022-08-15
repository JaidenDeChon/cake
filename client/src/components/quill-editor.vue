<script setup lang="ts">

import { onActivated, onMounted, ref, type PropType } from 'vue';

import Quill, { type QuillOptionsStatic } from 'quill';

const props = defineProps(
    {
        disabled: { type: Boolean, default: true },
        contents: { type: Object as PropType<object | undefined>, default:  undefined }
    }
)

const editorElement = ref(null as null | Element);
let editor!: Quill;

const $emit = defineEmits(['contents-changed']);

const editorOptions: QuillOptionsStatic = {
    debug: 'error',
    placeholder: 'Blog post content here...',
    theme: 'snow',
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }]
        ]
    }
};

onMounted(() => {

    editor = new Quill(editorElement.value as Element, editorOptions);

    setContents();

    if (props.disabled) {
        editor.disable();
        return;
    }

    editor.on('text-change', emitContentsChanged);
});

onActivated(() => setContents());

function setContents () {
    if (props.contents) {
        // TODO - Figure out Delta type for this error
        editor.setContents(props.contents);
    }
}

function emitContentsChanged (): void {
    $emit('contents-changed', editor.getContents());
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
            height: 2.5rem;
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

        @media (prefers-color-scheme: dark) {

            .quill-editor {
                background-color: var(--color-background--inverted) !important;
            }

            .ql-editor.ql-blank::before {
                color: var(--color-text--inverted) !important;
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
