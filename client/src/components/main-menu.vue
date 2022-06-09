<script setup lang="ts">

    import { routeNames } from '@/router';
    import IconClose from '../components/icons/icon-close.vue';

    const emit = defineEmits(['close-main-menu']);

    const homeText = "Home"

    function closeMainMenu(): void {
        emit('close-main-menu');
    }

</script>

<template>
    <nav class="main-menu">
        <!-- Close Main Menu -->
        <button
            @click="closeMainMenu"
            class="main-menu__menu-item main-menu__menu-item--skinny main-menu__menu-item--align-right"
        >
            <IconClose />
        </button>
        <ul>
            <li>
                <!-- Home -->
                <router-link class="main-menu__menu-item" :to="{ name: routeNames.HOME }">{{ homeText }}</router-link>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>

    .main-menu {

        // width: 100%;

        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;

        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        &,
        & * {
            background: var(--color-background);
        }

        // Unordered list for nav links.
        ul {
            width: 100%;
            margin: 0;
            padding: 0;

            li {
                list-style-type: none;
                display: block;
                width: 100%;
            }
        }

        &__menu-item {

            display: flex;
            align-items: center;
            justify-content: center;

            padding: 2rem;

            width: 100%;
            height: 4rem;

            outline: none;
            background-color: transparent;
            border: none;
            border-bottom: 0.02rem solid var(--color-border);
            cursor: pointer;

            svg {
                height: 1.8rem;
                fill: var(--color-text);
                background-color: transparent;
            }

            &--skinny {
                height: 2.5rem;
            }

            &--align-right {
                justify-content: flex-end;
            }
        }

        a {
            text-decoration: none;
            color: hsla(160, 100%, 37%, 0.2);
            transition: 0.4s;

            &.router-link-exact-active {
                color: var(--color-text);
            }
        }

        @media (hover: hover) {
            .main-menu__menu-item:hover {
                background-color: var(--color-background-mute);
            }

            a:hover {
                background-color: hsla(160, 100%, 37%, 0.2);
            }
        }
    }

</style>
