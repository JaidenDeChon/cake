<script setup lang="ts">

    import IconPencil from './icons/icon-pencil.vue';
    import IconX from './icons/icon-x.vue'

    interface Props {
        primaryText?: string;
        secondaryText?: string;
        useEditButton?: boolean;
        useCloseButton?: boolean;
    }

    interface Emits {
        (e: 'edit'): void;
        (e: 'delete'): void;
    }

    const $props = withDefaults(defineProps<Props>(), {
        primaryText: '',
        secondaryText: '',
        useEditButton: false,
        useCloseButton: false
    });

    const $emit = defineEmits<Emits>();

</script>

<template>
    <div class="chip-with-buttons">
        <div class="chip-with-buttons__title-area">
            <span class="chip-with-buttons__primary-text">{{ primaryText }}</span>
            <span class="chip-with-buttons__secondary-text">{{ secondaryText }}</span>
        </div>
        <div class="chip-with-buttons__action-area">
            <button
                v-if="$props.useEditButton"
                @click="$emit('edit')"
                class="icon-button"
            >
                <icon-pencil />
            </button>
            <button
                v-if="$props.useCloseButton"
                @click="$emit('delete')"
                class="icon-button"
            >
                <icon-x />
            </button>
        </div>
    </div>
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
