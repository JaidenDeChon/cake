<script setup lang="ts">

    import { ref, watch } from 'vue';
    import { useRoute } from 'vue-router';

    import MainMenu from '@/components/main-menu.vue';
    import IconMainMenu from '@/components/icons/icon-menu.vue';
    import IconCart from '@/components/icons/icon-cart.vue';
    import { routeNames } from '@/router';

    const $route = useRoute();

    const appTitle = ref('Lorem Ipsum');

    const emitToParent = defineEmits(['menu-is-open', 'menu-is-closed']);

    const mainMenuIsOpen = ref(false);

    function openMainMenu (): void {
        mainMenuIsOpen.value = true;
        emitToParent('menu-is-open');
    }

    function closeMainMenu (): void {
        mainMenuIsOpen.value = false;
        emitToParent('menu-is-closed');
    }

    /**
     * Close main menu whenever route path changes.
     */

    watch(() => $route.path, () => {
        if (mainMenuIsOpen.value) closeMainMenu();
    });

</script>

<template>
    <header class="header">
        <!-- Main menu button -->
        <button class="header__main-menu-button" @click="openMainMenu">
            <IconMainMenu />
        </button>

        <router-link :to="{ name: routeNames.HOME }" class="header__home-link">
            <h2>{{ appTitle }}</h2>
        </router-link>

        <!-- Cart button -->
        <button class="header__main-menu-button">
            <IconCart />
        </button>

        <MainMenu
            :class="['header__main-menu', { 'header__main-menu--open': mainMenuIsOpen }]"
            @close-main-menu="closeMainMenu"
        />
    </header>
</template>

<style lang="scss" scoped>

    .header {
        position: relative;
        z-index: 100;

        height: var(--global-header-height);

        padding: var(--global-padding);

        display: flex;
        align-items: center;
        justify-content: space-between;

        background-color: var(--color-background);
        box-shadow: rgba(100, 100, 111, 0.2) 0rem 0.4375rem 1.8125rem 0;

        &__main-menu-button {
            height: 2.2rem;
            width: 2.2rem;

            padding: 0;

            outline: none;
            border-radius: .2rem;
            background-color: transparent;
            border: 0.1rem solid var(--color-border);
            cursor: pointer;
            transition: 0.4s;

            svg {
                fill: var(--color-text);
                margin: 0;
                width: 1rem;
            }
        }

        &__home-link {
            color: var(--color-text);
            text-decoration: none;
        }

        @media (hover: hover) {
            &__main-menu-button:hover {
                background-color: var(--color-background-mute);
            }
        }

        &__main-menu {
            position: absolute;
            top: 0;
            left: -22rem;
            right: 0;
            width: 100vw;
            height: 100vh;
            max-width: 22rem;
            transition: left 0.3s ease, box-shadow 0.3s ease;

            &--open {
                box-shadow: rgba(100, 100, 111, 0.2) 0rem 0.4375rem 1.8125rem 0;
                left: 0;
            }
        }
    }

</style>
