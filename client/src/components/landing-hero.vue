<script setup lang="ts">

    /* eslint-disable @typescript-eslint/no-unused-vars */

    import { computed, type PropType, onMounted } from 'vue';

    import type { IHero } from '@models/';

    // Set up viewport (workaround for iOS Safari devices not behaving as expected when using vh).
    onMounted(() => {
        // Bail out if this is not safari.
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${ vh }px`);
    });

    // Props for this component.
    const props = defineProps({
        hero: Object as PropType<IHero>
    });

    // The justify classname for the root element.
    const landingHeroJustifyClassname = computed(() => {

        const rootElementClassnameBase = 'landing-hero';

        switch (props.hero?.justify) {
            case 'right':
                return `${rootElementClassnameBase}--justify-right`;
            case 'center':
                return `${rootElementClassnameBase}--justify-center`;
            case 'left':
            default:
                return `${rootElementClassnameBase}--justify-left`;
        }
    });

    // Computed property for hero background image.
    const backgroundImage = computed(() => props.hero?.img);

</script>

<template lang="pug">

.landing-hero(:class="landingHeroJustifyClassname", :style="{ backgroundImage: `url(${ backgroundImage })`}")

    .landing-hero__content

        // Primary text.
        p.landing-hero__primary-text(v-if="props.hero?.primaryText") {{ props.hero.primaryText }}

        // Secondary text.
        p.landing-hero__secondary-text(v-if="props.hero?.secondaryText") {{ props.hero.secondaryText }}

        // Call-to-action buttons.
        .landing-hero__cta-buttons

            // Primary call to action.
            button.landing-hero__primary-cta(v-if="props.hero?.primaryCallToAction") {{ props.hero.primaryCallToAction }}

            // Secondary call to action.
            button.landing-hero__secondary-cta(v-if="props.hero?.secondaryCallToAction") {{ props.hero.secondaryCallToAction }}

</template>

<style lang="scss">

    .landing-hero {

        position: relative;
        z-index: 1;

        height: 100vh; // fallback for browsers that do not support custom properties.
        height: calc((var(--vh, 1vh) * 100) - var(--global-padding) * 2 - var(--global-header-height));
        width: 100%;

        display: flex;
        align-items: center;

        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;

        border-radius: var(--content-block-border-radius);
        overflow: hidden;

        // Create pseudo-element for semi-transparent overlay.

        &::after {

            content: "";

            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;

            height: 100%;
            width: 100%;

            background-color: var(--color-background-soft--inverted);
            opacity: 0.4;
        }

        // Handle justification configuration.

        &--justify-left { justify-content: flex-start }
        &--justify-center { justify-content: center }
        &--justify-right { justify-content: flex-end }

        // Style hero content.

        &__content,
        &__content * {
            opacity: 1;
        }

        &__content {
            z-index: 3;
            padding: var(--global-padding);
        }

        &__primary-text,
        &__secondary-text {
            color: var(--color-text--inverted);
            line-height: 1em;

            margin-bottom: 1.25rem;
        }

        &__primary-text {
            font-size: 4rem;
            line-height: 1em;
        }

        &__secondary-text {
            font-size: 1.25rem;
        }

        &__cta-buttons {
            button:first-child {
                margin-right: 1.5rem;
            }
        }

        &__primary-cta,
        &__secondary-cta {
            height: 3rem;
            padding: 0 1rem;
            border: 0.2rem solid;
            outline: none;
            border-radius: var(--content-block-border-radius);
            cursor: pointer;
        }

        &__primary-cta {
            background-color: var(--color-text--inverted);
            color: var(--color-text);
            border-color: var(--color-text);
        }

        &__secondary-cta {
            background-color: var(--color-heading);
            color: var(--color-text--inverted);
            border-color: var(--color-text--inverted);
        }
    }

</style>
