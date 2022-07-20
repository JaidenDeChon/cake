<script setup lang="ts">

    import { useRouter } from 'vue-router';

    import { useAuthenticationStore } from '@/stores/authentication';
    import { routeNames } from '@/router';
    import LoginPanelComponent from '@/components/login-panel.vue';

    const $router = useRouter();
    const authenticationStore = useAuthenticationStore();

    /**
     * Attempts to log the user in. If successful, sends the user to the admin home.
     */
    function attemptLogin({ username, password }: { username: string, password: string }): void {
        try {
            // todo - actually authenticate
            authenticationStore.userIsAuthenticated = true;
        } catch {
            // todo - handle error with auth
        }
        $router.push({ name: routeNames.ADMIN_HOME });
    }

</script>

<template lang="pug">

.admin-login-view

    login-panel-component.login-panel-component(@attempt-login="attemptLogin")

</template>

<style lang="scss" scoped>

    .admin-login-view {
        height: calc(100vh - var(--global-header-height));

        padding: var(--global-padding);

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .login-panel-component {
        height: auto;
        width: 100%;
        max-width: 24rem;
    }

</style>
