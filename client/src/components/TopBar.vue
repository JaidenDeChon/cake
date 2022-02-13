<template>
    <div>{{ header }}</div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';

    @Options({
        props: {
            header: String
        }
    })

export default class TopBar extends Vue {
        header!: string
}

</script>

<style lang="scss" scoped>

</style>
