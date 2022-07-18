<script setup lang="ts">

    import { onMounted, watch, ref } from 'vue';
    import { computed } from '@vue/reactivity';

    import { useHeroStore } from '@/stores/hero';
    import type { IHero } from '@models/';
    import LandingHeroComponent from '../../components/landing-hero.vue';

    let primaryText = ref('');
    let secondaryText = ref('');
    let primaryCallToAction = ref('');
    let secondaryCallToAction = ref('');
    let justify = ref('');
    let img = ref('')

    const heroStore = useHeroStore();

    onMounted(async () => {
        await heroStore.fetchHero();
    });

    const hero = computed(() => ({
        primaryText: heroStore.primaryText,
        secondaryText: heroStore.secondaryText,
        primaryCallToAction: heroStore.primaryCallToAction,
        secondaryCallToAction: heroStore.secondaryCallToAction,
        justify: heroStore.justify,
        img: heroStore.img
    } as IHero));

    watch(
        hero,
        () => {
            primaryText.value = hero.value.primaryText;
            secondaryText.value = hero.value.secondaryText;
            primaryCallToAction.value = hero.value.primaryCallToAction;
            secondaryCallToAction.value = hero.value.secondaryCallToAction;
            justify.value = hero.value.justify;
            img.value= hero.value.img;
        },
        {
            deep: true,
            immediate: true
        }
    );

    const newHero = computed(() => ({
        primaryText: primaryText.value,
        secondaryText: secondaryText.value,
        primaryCallToAction: primaryCallToAction.value,
        secondaryCallToAction: secondaryCallToAction.value,
        justify: justify.value,
        img: img.value
    }));

    async function saveChanges (): Promise<void> {
        try {
            await heroStore.changeHero(newHero.value);
        }
        catch (error) {
            alert(error);
            return;
        }

        alert('Your changes have been saved.');
    }

</script>

<template lang="pug">

.admin-config-hero

    .admin-config-hero__title-area.config-title-area
        h2 Configure Hero
        p Here, you can modify the appearance and contents of your site hero, as shown below.

    landing-hero-component.landing-hero-component(v-if="newHero" :hero="newHero")

    .admin-config-hero__form-area

        label.admin-config-hero__label Primary Text
            input.admin-config-hero__input(v-model="primaryText")

        label.admin-config-hero__label Secondary Text
            input.admin-config-hero__input(v-model="secondaryText")

        label.admin-config-hero__label Primary Call to Action
            input.admin-config-hero__input(v-model="primaryCallToAction")

        label.admin-config-hero__label Secondary Call to Action
            input.admin-config-hero__input(v-model="secondaryCallToAction")

        label.admin-config-hero__label Justify
            input.admin-config-hero__input(v-model="justify")

        label.admin-config-hero__label Background image
            input.admin-config-hero__input(v-model="img")

    button.jaid-button(@click="saveChanges") Save

</template>

<style lang="scss" scoped>

    .admin-config-hero {

        .landing-hero-component,
        &__label,
        button.jaid-button {
            margin-bottom: var(--global-padding);
        }

        &__form-area,
        &__label {
            display: flex;
            flex-direction: column;
        }
    }

</style>
