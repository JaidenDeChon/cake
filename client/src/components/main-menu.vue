<script setup lang="ts">

import { routeNames } from '@/router';
import IconClose from '../components/icons/icon-close.vue';

const msg = "a link to nowhere"

</script>

<template>
    <div class="main-menu">
        <!-- Close Main Menu -->
        <div class="main-menu__menu-item"><IconClose /></div>
        <!-- Home -->
        <router-link class="main-menu__menu-item" :to="{ name: routeNames.HOME }">{{ msg }}</router-link>
    </div>
</template>

<style lang="scss" scoped>

    .main-menu {
        border: 1px solid white;

        height: 100vh;
        width: 100vw;

        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;

        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        svg {
            fill: #fff;
        }

        &__menu-item {
            border: 1px solid white;

            width: 100%;
            height: 6rem;

            svg {
                height: 1.8rem;
            }
        }
    }

</style>
