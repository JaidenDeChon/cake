<script setup lang="ts">

    import iconX from './icons/icon-x.vue';

    export interface Props {
        visible: boolean;
        header?: string | undefined;
        subheader?: string | undefined;
    }

    export interface Emits {
        (e: 'close'): void,
        (e: 'save'): void
    }

    const $props = defineProps<Props>();

    const $emit = defineEmits<Emits>();

</script>

<template>
    <!-- Whole component is teleported to #modal-portal so that any modals using this base component will
    automatically display in the proper place. -->
    <teleport to="#modal-portal">

        <!-- Whole component is wrapped in a transition tag for easy animating -->
        <transition name="modal">

            <!-- Semi-transparent background. -->
            <div
                class="modal__background"
                v-if="visible"
                @click="$emit('close')"
            >

                <!-- Wrapper for applying reused modal styles. -->
                <div class="modal__styles-wrapper admin-config" @click.stop>

                    <!-- Close button. -->
                    <button class="modal__close-button icon-button" @click="$emit('close')">
                        <icon-x />
                    </button>
                    
                    <!-- Use props to supply a header and subheader. -->
                    <template v-if="$props.header || $props.subheader">
                        <div class="modal__header-area">
                            <h2 class="modal__header">{{ $props.header }}</h2>
                            <p class="modal__subheader">{{ $props.subheader }}</p>
                        </div>

                        <hr>
                    </template>

                    <!-- Container for slotted content. -->
                    <div class="modal__slotted-content-container">
                        <slot />
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<style>

    .modal__background {
        position: fixed;
        top: 0;
        left: 0;

        height: 100vh;
        width: 100vw;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: rgba(0, 0, 0, 0.5);
    }

    .modal__styles-wrapper {
        position: relative;

        margin: var(--global-padding);

        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.3) 0rem 0.4375rem 1.8125rem 0;
        border-radius: var(--content-block-border-radius);
    }

    .modal__close-button {
        position: absolute;
        top: var(--global-padding--half);
        right: var(--global-padding--half);
        z-index: 102;
    }

    .modal__header-area {
        padding: var(--global-padding--half)
                 var(--global-padding)
                 var(--global-padding--half)
                 var(--global-padding);
    }

    .modal__slotted-content-container {
        padding: var(--global-padding)
                 var(--global-padding)
                 var(--global-padding)
                 var(--global-padding);
    }

    /* Vue transition styles. */

    .modal-enter-active,
    .modal-leave-active {
        transition: all 0.2s ease;
    }

    .modal-enter-from,
    .modal-leave-to {
        opacity: 0;
        transform: scale(1.05);
    }

</style>
