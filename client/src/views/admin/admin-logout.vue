<script setup lang="ts">
    import { onBeforeMount } from 'vue';
    import { useRouter } from 'vue-router';

    import { useAuthenticationStore } from '../../stores/authentication';
    import { routeNames } from '@/router';

    const authenticationStore = useAuthenticationStore();
    const router = useRouter();

    onBeforeMount(() => {
        // todo - actually deauthenticate
        authenticationStore.userIsAuthenticated = false;
        router.push({ name: routeNames.HOME });
    });

</script>

<template>
    <div class="logout"></div>
</template>
