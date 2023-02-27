<script setup lang="ts">

    import QuillEditorComponent from '../../components/quill-editor.vue';
    import modalBase from '@/components/modal-base.vue';

    export interface Props {
        visible: boolean;
        pageContent?: object;
        header?: string;
        subheader?: string;
    }

    export interface Emits {
        (e: 'save'): void,
        (e: 'update-title', newTitle: string): void
    }

    const $props = defineProps<Props>();

    const $emit = defineEmits<Emits>();

</script>

<template>
    <modal-base
        :visible="$props.visible"
        :header="$props.header"
        :subheader="$props.subheader"
    >
        <div class="modal-slot-content">
            <!-- Title input. -->
            <label class="admin-config-form__label">
                Title
                <input class="admin-config-form__input" @change="$emit('update-title', $event)"/>
            </label>

            <!-- Editor for quill content. -->
            <quill-editor-component :disabled="false" @contents-changed="$emit('contents-changed', $event)" />

            <!-- Submit button. -->
            <button class="jaid-button" @click="$emit('save')">Done</button>
        </div>
    </modal-base>
</template>

<style scoped>
    .modal-slot-content {
        display: flex;
        flex-direction: column;
    }
    button {
        margin-left: auto;
        margin-top: var(--global-padding);
    }
</style>
