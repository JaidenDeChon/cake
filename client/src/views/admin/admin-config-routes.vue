<script setup lang="ts">

    import { ref } from 'vue';
    import { computed } from '@vue/reactivity';
    import { kebabCase } from 'lodash';
    import { useRouter } from 'vue-router';

    import type { IJaidRoute } from '@models/';
    import { useRoutesStore } from '@/stores/routes';
    import QuillEditorComponent from '../../components/quill-editor.vue';
    import chipWithButtons from '@/components/chip-with-buttons.vue';

    // Vue things.

    const $router = useRouter();

    // Stores.

    const routesStore = useRoutesStore();


    /**
     * Route / page Creation.
     */

    // Variables / computed properties for holding the content of the new page.

    const newPageTitle = ref('');
    const newPageContent = ref({});

    const newPageObject = computed((): IJaidRoute => ({
        pagePath: `/${kebabCase(newPageTitle.value)}`, // START HERE
        pageTitle: newPageTitle.value,
        content: newPageContent.value
    }));

    // Statuses for whether we're awaiting creation, deletion, or modification of a page, and related
    // variables/computed properties.

    const awaitingCreate = ref(false);
    const awaitingSave = ref(false);
    const awaitingDelete = ref(false);

    const awaitingAnything = computed(() => awaitingCreate.value || awaitingSave.value || awaitingDelete.value);
    const createRouteButtonText = computed(() =>
        awaitingCreate.value
            ? 'Creating new page...'
            : 'Create new page'
    );

    /**
     * Updates the newPageContent variable with the user's inputs.
     */
    function updateNewPageQuillContent (newValue: object): void {
        newPageContent.value = newValue;
    }

    /**
     * Creates a new page/route using the data entered.
     */
    async function createNewPage (): Promise<void> {

        awaitingCreate.value = true;

        const { id } = await routesStore.createNewRoute(newPageObject.value, $router);

        if (id) {
            alert("New page created.");
            newPageTitle.value = '';
            newPageContent.value = '';
        }

        awaitingCreate.value = false;
    }

    /**
     * Existing routes / pages.
     */

     const allCurrentPages = computed(() => routesStore.routes);

</script>

<template lang="pug">

.admin-config-routes

    .admin-config-title-area
        h2 Configure Pages
        p On this page, you can add, remove, and modify the pages of your site.

    hr.admin-config-hr

    .admin-config-title-area
        h3 Create a new page

    .admin-config-form

        label.admin-config-form__label Title
            input.admin-config-form__input(v-model="newPageTitle")

        label.admin-config-form__label Content
            quill-editor-component.admin-config-form__input(
                :disabled="false"
                @click.prevent=""
                @contents-changed="updateNewPageQuillContent"
            )

        button.jaid-button(
            :disabled="awaitingAnything"
            @click="createNewPage"
        ) {{ createRouteButtonText }}

    hr.admin-config-hr

    .admin-config-title-area
        h3 Manage existing pages

    chip-with-buttons(
        v-for="page in allCurrentPages"
        :primary-text="page.pageTitle"
        :secondary-text="page._id ?? '[no id]'"
        :use-edit-button="true"
        :use-close-button="true"
    )


</template>

<style scoped>
.chip-with-buttons {
    margin-bottom: 3rem;
}
</style>
