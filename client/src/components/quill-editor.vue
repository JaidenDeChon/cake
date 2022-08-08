<script setup lang="ts">

import { ref, watchEffect } from 'vue';

import Quill, { type QuillOptionsStatic } from 'quill';

const editorElement = ref(null as null | Element);
let editor: Quill;
const editorOptions: QuillOptionsStatic = {
    debug: 'info',
    placeholder: 'This is a placeholder',
    theme: 'snow'
};

watchEffect(() => {
    const newValue = editorElement.value;
    if (newValue) editor = new Quill(editorElement.value as Element, editorOptions);
});

</script>

<template lang="pug">

.quill-editor(ref="editorElement")

</template>

<style lang="scss">
    @import 'quill/dist/quill.snow.css'
</style>
