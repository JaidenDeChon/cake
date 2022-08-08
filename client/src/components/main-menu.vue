<script setup lang="ts">

    import { routeNames } from '@/router';
    import IconCloseComponent from '../components/icons/icon-close.vue';

    export interface MainMenuLink {
        routeName: string,
        linkText: string
    }

    const props = defineProps<{
        viewingAdminRoute: boolean,
        nonAdminRoutes: Array<MainMenuLink>,
        adminRoutes: Array<MainMenuLink>
    }>();

    const emit = defineEmits(['close-main-menu']);

    const homeText = "Home";
    const aboutText = "About";
    const adminText = "Admin";

    function closeMainMenu(): void {
        emit('close-main-menu');
    }

</script>

<template lang="pug">

nav.main-menu

    // Close Main Menu button
    button.main-menu__menu-item.main-menu__menu-item--align-right(
        @click="closeMainMenu"
    )
        IconCloseComponent.main-menu__menu-item-icon

    // Main Menu links list (admin)
    ul(v-if="viewingAdminRoute")
        li(v-for="item in adminRoutes")
            router-link.main-menu__menu-item(:to="{ name: item.routeName }") {{ item.linkText }}

    // Main Menu links list (non-admin)
    ul(v-else)
        li(v-for="item in nonAdminRoutes")
            router-link.main-menu__menu-item(:to="{ name: item.routeName }") {{ item.linkText }}

</template>

<style lang="scss" scoped>

    .main-menu {

        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;

        position: absolute;
        top: 0;
        bottom: 0;

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

            padding: var(--global-padding);

            width: 100%;
            height: 4rem;

            outline: none;
            background-color: transparent;
            border: none;
            border-bottom: 0.02rem solid var(--color-border);
            cursor: pointer;

            .main-menu__menu-item-icon {
                height: 1.8rem;
                fill: var(--color-text);
                background-color: transparent;
            }

            &--align-right {
                justify-content: flex-end;
            }
        }

        a {
            text-decoration: none;
            color: var(--color-text);
            transition: 0.4s;

            &.router-link-exact-active {
                color: var(--color-text);
            }
        }

        @media (hover: hover) {
            .main-menu__menu-item:hover {
                background-color: var(--color-background-mute);
            }
        }
    }

</style>
