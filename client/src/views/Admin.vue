<template>
    <div class="route--admin">
        admin
        <router-view />
    </div>
</template>

<script lang="ts">

import { Vue, Options } from 'vue-class-component';

@Options({})
export default class Admin extends Vue{}


</script>
