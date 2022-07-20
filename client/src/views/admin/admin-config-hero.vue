<script setup lang="ts">

    import { onMounted, ref } from 'vue';

    import type { IHero } from '@models/';
    import { useHeroStore } from '../../stores/hero';
    import LandingHeroComponent from '../../components/landing-hero.vue';

    let primaryText = ref('' as string | undefined);
    let secondaryText = ref('' as string | undefined);
    let primaryCallToAction = ref('' as string | undefined);
    let secondaryCallToAction = ref('' as string | undefined);
    let justify = ref('' as string | undefined);
    let img = ref('' as string | undefined)

    const heroStore = useHeroStore();

    onMounted(async () => {
        const updatedHero = await heroStore.fetchHero();
        primaryText.value = updatedHero.primaryText ?? '';
        secondaryText.value = updatedHero.secondaryText ?? '';
        primaryCallToAction.value = updatedHero.primaryCallToAction ?? '';
        secondaryCallToAction.value = updatedHero.secondaryCallToAction ?? '';
        justify.value = updatedHero.justify ?? 'left';
        img.value = updatedHero.img ?? '';
    });

    async function saveChanges (): Promise<void> {
        const hero = {
            primaryText: primaryText.value,
            secondaryText: secondaryText.value,
            primaryCallToAction: primaryCallToAction.value,
            secondaryCallToAction: secondaryCallToAction.value,
            justify: justify.value,
            img: img.value
        } as IHero;
        await heroStore.changeHero(hero);
        alert('Your changes have been saved.');
    }

</script>

<template lang="pug">

.admin-config-hero

    .admin-config-hero__title-area.config-title-area
        h2 Configure Hero
        p Here, you can modify the appearance and contents of your site hero, as shown below.

    landing-hero-component.landing-hero-component(
        v-if="heroStore"
        :hero="{ primaryText, secondaryText, primaryCallToAction, secondaryCallToAction, justify, img }"
    )

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
