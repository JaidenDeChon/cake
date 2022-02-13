<template>
    <div class="top-bar">
        <h1 class="top-bar__header">Sweet Peach Cakery</h1>
    </div>
</template>

<script lang="ts">

import { Vue } from 'vue-class-component';

export default class TopBar extends Vue {
        header!: string
}

</script>

<style lang="scss" scoped>

    .top-bar {

        padding: 1.8rem;

        background-color: white;
    }

    .top-bar__header {

        font-family: 'Dancing Script', cursive;
        letter-spacing: .06rem;
        color: salmon;

        margin: 0;
        padding: 0;
    }

</style>
