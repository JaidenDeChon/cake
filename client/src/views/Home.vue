<template>
  <div class="home">
    <top-bar header="Sweet Peach Cupcakery" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TopBar from '@/components/TopBar.vue';

@Options({
    components: {
        TopBar
    },
})
export default class Home extends Vue {}
</script>
