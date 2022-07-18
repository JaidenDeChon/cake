<script setup lang="ts">

    import LoginPanelComponent from '@/components/login-panel.vue';

</script>

<template lang="pug">

.admin-login-view

    login-panel-component.login-panel-component

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
