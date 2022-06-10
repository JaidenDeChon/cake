<script setup lang="ts">

    // Import Vue stuff.
    import { ref } from 'vue';

    // Import components.
    import MainMenu from '@/components/main-menu.vue';
    import IconMainMenu from '@/components/icons/icon-menu.vue';
    import IconCart from '@/components/icons/icon-cart.vue';

    // App title.
    const appTitle = ref('Lorem Ipsum');

    // Controls whether the main menu is open.
    const mainMenuIsOpen = ref(false);

    // Opens the main menu.
    function openMainMenu (): void {
        mainMenuIsOpen.value = true;
    }

    // Closes the main menu.
    function closeMainMenu (): void {
        mainMenuIsOpen.value = false;
    }

</script>

<template>
    <header class="header">
        <!-- Main menu button -->
        <button class="header__main-menu-button" @click="openMainMenu">
            <IconMainMenu />
        </button>

        <h2>{{ appTitle }}</h2>

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

        height: 5rem;

        padding: var(--global-padding);

        display: flex;
        align-items: center;
        justify-content: space-between;

        background-color: var(--color-background);
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

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

        @media (hover: hover) {
            &__main-menu-button:hover {
                background-color: var(--color-background-mute);
            }
        }

        &__main-menu {
            position: absolute;
            top: 0;
            bottom: 0;
            left: -22rem;
            right: 0;
            width: 100vw;
            height: 100vh;
            max-width: 22rem;
            transition: left 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

            &--open {
                box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
                left: 0;
            }
        }
    }

</style>
