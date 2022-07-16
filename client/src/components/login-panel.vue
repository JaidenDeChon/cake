<script setup lang="ts">
    
    import { ref } from 'vue';

    let username = ref('');
    let password = ref('');

    function handleLogin(): void {
        // todo - try authentication
        // todo - route to next page if auth successful
    }

</script>

<template lang="pug">

form.login-panel

    label.login-panel__label Username
        input.login-panel__input(v-model="username")

    label.login-panel__label Password
        input.login-panel__input(v-model="password")

    button.login-panel__submit-button(@click.prevent="handleLogin") Submit

</template>

<style lang="scss">

    .login-panel {
        padding: var(--global-padding);

        color: var(--color-text);

        border-radius: var(--content-block-border-radius);
        box-shadow: rgba(100, 100, 111, 0.2) 0rem 0.4375rem 1.8125rem 0;
    }

    .login-panel,
    .login-panel__label {
        display: flex;
        flex-direction: column;

        width: 100%;
    }

    .login-panel__label {
        margin-bottom: var(--global-padding);
    }

    .login-panel__input {}

    .login-panel__submit-button {
        margin-top: calc(var(--global-padding) / 2);
    }

</style>
