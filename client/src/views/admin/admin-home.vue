<script setup lang="ts"></script>

<template lang="pug">

.admin-home
    router-view(v-slot="{ Component }")
        Transition(name="fade" mode="out-in")
            component(:is="Component")

</template>

<style lang="scss"></style>
