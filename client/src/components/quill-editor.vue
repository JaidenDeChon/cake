<script setup lang="ts">

import { onMounted, ref } from 'vue';

import Quill, { type QuillOptionsStatic } from 'quill';

const editorElement = ref(null as null | Element);
let editor: Quill;

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

onMounted(() => editor = new Quill(editorElement.value as Element, editorOptions));

</script>

<template lang="pug">

.quill-editor.has-input-border(ref="editorElement")

</template>

<style lang="scss">
    @import 'quill/dist/quill.snow.css';

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
</style>
