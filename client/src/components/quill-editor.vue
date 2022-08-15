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
        strong {
            font-weight: bold !important;
        }
    }

    .ql-toolbar,
    .quill-editor {
        border: 0.1rem solid var(--vt-c-indigo) !important;
    }
</style>
