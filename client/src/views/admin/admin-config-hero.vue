<script setup lang="ts">

    import { onMounted, ref } from 'vue';
    import { computed } from '@vue/reactivity';
    import { isEqual } from 'lodash';

    import type { IHero } from '@models/';
    import { useHeroStore } from '../../stores/hero';
    import LandingHeroComponent from '../../components/landing-hero.vue';

    /** Lifecycle stuff. */

    onMounted(async () => await updateHeroData());

    /** Save-button stuff. */

    let currentlySaving = ref(false);
    const saveButtonText = computed(() => currentlySaving.value ? 'Saving...' : 'Save Changes');
    const changesHaveBeenMade = computed(() => !isEqual(heroStore.hero, heroFormData.value));

    /** Hero-related stuff. */

    const heroStore = useHeroStore();

    let primaryText = ref('' as string | undefined);
    let secondaryText = ref('' as string | undefined);
    let primaryCallToAction = ref('' as string | undefined);
    let secondaryCallToAction = ref('' as string | undefined);
    let justify = ref('' as string | undefined);
    let img = ref('' as string | undefined);

    const justifyOptions = { left: 'left', center: 'center', right: 'right' };

    const heroFormData = computed((): IHero => ({
        primaryText: primaryText.value,
        secondaryText: secondaryText.value,
        primaryCallToAction: primaryCallToAction.value,
        secondaryCallToAction: secondaryCallToAction.value,
        justify: justify.value,
        img: img.value
    }));

    /**
     * Updates the component data with the Hero data saved in the DB.
     */
    async function updateHeroData (): Promise<void> {
        const updatedHero = await heroStore.fetchHero();
        primaryText.value = updatedHero.primaryText ?? '';
        secondaryText.value = updatedHero.secondaryText ?? '';
        primaryCallToAction.value = updatedHero.primaryCallToAction ?? '';
        secondaryCallToAction.value = updatedHero.secondaryCallToAction ?? '';
        justify.value = updatedHero.justify ?? justifyOptions.left;
        img.value = updatedHero.img ?? '';
    }

    /**
     * Saves the data currently in the fields to the DB.
     */
    async function saveChanges (): Promise<void> {
        currentlySaving.value = true;
        await heroStore.changeHero(heroFormData.value);
        alert('Your changes have been saved.');
        currentlySaving.value = false;
    }

</script>

<template lang="pug">

.admin-config-hero

    .admin-config-title-area
        h2 Configure Hero
        p Here, you can modify the appearance and contents of your site hero, as shown below.

    hr.admin-config-hr

    landing-hero-component.admin-config-live-component(
        v-if="heroStore"
        :hero="{ primaryText, secondaryText, primaryCallToAction, secondaryCallToAction, justify, img }"
    )

    .admin-config-form

        label.admin-config-form__label Primary Text
            input.admin-config-form__input(v-model="primaryText")

        label.admin-config-form__label Secondary Text
            input.admin-config-form__input(v-model="secondaryText")

        label.admin-config-form__label Primary Call to Action
            input.admin-config-form__input(v-model="primaryCallToAction")

        label.admin-config-form__label Secondary Call to Action
            input.admin-config-form__input(v-model="secondaryCallToAction")

        label.admin-config-form__label Justify
            select.admin-config-form__input(v-model="justify")
                option(v-for="item in Object.values(justifyOptions)") {{ item }}

        label.admin-config-form__label Background image
            input.admin-config-form__input(v-model="img")

    button.jaid-button(
        :disabled="!changesHaveBeenMade || currentlySaving"
        @click="saveChanges"
    ) {{ saveButtonText }}

</template>
