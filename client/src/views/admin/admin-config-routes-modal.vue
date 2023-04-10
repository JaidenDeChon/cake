<script setup lang="ts">

    import { computed } from 'vue';

    import type { IJaidRoute } from '@models/';
    import QuillEditorComponent from '../../components/quill-editor.vue';
    import modalBase from '@/components/modal-base.vue';

    export interface Props {
        visible: boolean;
        jaidRoute?: IJaidRoute;
        header?: string;
        subheader?: string;
    }

    export interface Emits {
        (e: 'save'): void,
        (e: 'update-title', newTitle: string): void,
        (e: 'contents-changed', newContent: object): void
    }

    const $props = defineProps<Props>();

    const $emit = defineEmits<Emits>();

    const titleComputed = computed(() => $props.jaidRoute?.pageTitle ?? undefined);

    const quillContentComputed = computed(() => $props.jaidRoute?.content ?? undefined)

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
                <input
                    :value="titleComputed"
                    class="admin-config-form__input"
                    @input="$emit('update-title', ($event.target as any).value ?? 'New Page')"
                />
            </label>

            <!-- Editor for quill content. -->
            <quill-editor-component
                :disabled="false"
                :contents="quillContentComputed"
                @contents-changed="$emit('contents-changed', $event)"
            />

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
