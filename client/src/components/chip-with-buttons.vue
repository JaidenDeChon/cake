<script setup lang="ts">

    import IconPencil from './icons/icon-pencil.vue';
    import IconX from './icons/icon-x.vue'

    const $props = defineProps({
        primaryText: { type: String, required: false },
        secondaryText: { type: String, required: false },
        useEditButton: { type: Boolean, default: false },
        useCloseButton: { type: Boolean, default: false },
    });

    const $emit = defineEmits(['edit', 'delete']);

</script>

<template lang="pug">

.chip-with-buttons

    .chip-with-buttons__title-area

        span.chip-with-buttons__primary-text {{ primaryText }}
        span.chip-with-buttons__secondary-text {{ secondaryText }}

    .chip-with-buttons__action-area

        button.icon-button(v-if="useEditButton")
            icon-pencil
        button.icon-button(v-if="useCloseButton")
            icon-x

</template>

<style lang="scss">

    .chip-with-buttons {
        display: flex;
        padding: var(--global-padding--half);
        background-color: var(--color-background);
        border-radius: var(--content-block-border-radius);
        box-shadow: rgba(100, 100, 111, 0.2) 0rem 0.4375rem 1.8125rem 0;
    }

    .chip-with-buttons__title-area,
    .chip-with-buttons__action-area {
        width: 100%;
    }

    .chip-with-buttons__title-area {
        display: flex;
        align-items: flex-start;
        justify-content: space-around;
        flex-direction: column;
    }

    .chip-with-buttons__primary-text {
        font-size: 1.6rem;
    }

    .chip-with-buttons__secondary-text {
        opacity: 0.75;
    }

    .chip-with-buttons__action-area {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: var(--global-padding--half);
    }

</style>
