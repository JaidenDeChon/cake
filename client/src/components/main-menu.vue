<script setup lang="ts">

    import { computed } from '@vue/reactivity';
    import { useRoute } from 'vue-router';

    import type { IJaidRoute } from '@models/';
    import { routeRoutes } from '@/router';
    import { useRoutesStore } from '@/stores/routes';
    import IconCloseComponent from '../components/icons/icon-close.vue';

    const emit = defineEmits(['close-main-menu']);
    const routesStore = useRoutesStore();
    const $route = useRoute();

    const onAdminRoute = computed(() => $route.matched.some(({ path }) => path === routeRoutes.ADMIN_HOME));

    const adminRoutes: IJaidRoute[] = [
        { pagePath: routeRoutes.ADMIN_CONFIG_HERO, pageTitle: 'Configure Hero' },
        { pagePath: routeRoutes.ADMIN_CONFIG_BLOG_POSTS, pageTitle: 'Configure Blog Posts' },
        { pagePath: routeRoutes.ADMIN_CONFIG_ROUTES, pageTitle: 'Configure Pages' },
        { pagePath: routeRoutes.ADMIN_LOGOUT, pageTitle: 'Log Out' }
    ];

    const nonAdminRoutes = computed(() => {
        const routes: IJaidRoute[] = [];
        const homePath: IJaidRoute = { pagePath: routeRoutes.HOME, pageTitle: 'Home' };
        const adminLoginPath: IJaidRoute = { pagePath: routeRoutes.ADMIN_LOGIN, pageTitle: 'Admin' };

        routes.push(homePath);
        routesStore.routes.forEach(route => routes.push(route));
        routes.push(adminLoginPath);

        return routes;
    });

    function closeMainMenu(): void {
        emit('close-main-menu');
    }

</script>

<template>

    <nav class="main-menu">

        <button
            class="main-menu__menu-item main-menu__menu-item--align-right"
            @click="closeMainMenu"
        >
            <IconCloseComponent class="main-menu__menu-item-icon"></IconCloseComponent>
        </button>

        <ul v-if="onAdminRoute">
            <li v-for="item in adminRoutes">
                <router-link
                    class="main-menu__menu-item"
                    :to="{ path: item.pagePath }"
                >
                    {{ item.pageTitle }}
                </router-link>
            </li>
        </ul>

        <ul v-else>
            <li v-for="item in nonAdminRoutes">
                <router-link
                    class="main-menu__menu-item"
                    :to="{ path: item.pagePath }"
                >
                    {{ item.pageTitle }}
                </router-link>
            </li>
        </ul>
    </nav>

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
