<script setup lang="ts">

    import { ref } from 'vue';
    import { computed } from '@vue/reactivity';
    import { kebabCase } from 'lodash';
    import { useRouter } from 'vue-router';

    import type { IJaidRoute } from '@models/';
    import { useRoutesStore } from '@/stores/routes';
    import adminConfigRoutesModal from './admin-config-routes-modal.vue';
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
        pagePath: `/${kebabCase(newPageTitle.value)}`,
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
    function updateNewPageQuillContent (newContent: object): void {
        newPageContent.value = newContent;
    }

    /**
     * Deletes the route with the given ID.
     */
    async function deleteRoute (id: string): Promise<void> {
        await routesStore.deleteExistingRoute(id, $router);
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
        closeModal();
    }

    /**
     * Existing routes / pages.
     */

     const allCurrentPages = computed(() => routesStore.routes);

     /**
      * Modal functionality.
      */

    // Controls whether the page editor modal is currently visible.
    const displayPageEditorModal = ref(false);

    // Holds the contents of the page to be edited or `undefined` if none. 
    const selectedPage = ref(undefined as object | undefined);

    /**
     * Shows the modal. Optional param for providing modal contents.
     * @param   { object }   data   (Optional) Allows for passing content to the modal.
     */
    function showModal (data?: object): void {
        selectedPage.value = data;
        displayPageEditorModal.value = true;
    }

    /**
     * Closes the modal.
     */
    function closeModal (): void {
        displayPageEditorModal.value = false;
        selectedPage.value = undefined;
    }

    // Determines what the modal header text should say.
    const modalHeaderText = computed(
        () => selectedPage.value === undefined
            ? 'Create new page'
            : 'Edit page contents'
    );

    // Determines what the modal subheader text should say.
    const modalSubheaderText = computed(
        () => selectedPage.value === undefined
            ? 'Use the controls below to create your page.'
            : 'Use the controls below to modify your page contents.'
    );

</script>

<template>

<div class="admin-config-routes">

    <div class="admin-config-title-area">
        <h2>Configure Pages</h2>
        <p>On this page, you can add, remove, and modify the pages of your site.</p>
    </div>

    <hr class="admin-config-hr" />

    <div class="admin-config-title-area">
        <h3>Create a new page</h3>
    </div>

    <div class="admin-config-form">
        <button
            class="jaid-button"
            :disabled="awaitingAnything"
            @click="showModal(undefined)"
        >
            {{ createRouteButtonText }}
        </button>
    </div>

    <hr class="admin-config-hr" />

    <div class="admin-config-title-area">
        <h3>Manage existing pages</h3>
    </div>

    <chip-with-buttons
        v-for="page in allCurrentPages"
        :primary-text="page.pageTitle"
        :secondary-text="page._id ?? '[no id]'"
        :use-edit-button="true"
        :use-close-button="true"
        @delete="!!page._id ? deleteRoute(page._id) : undefined"
        @edit="showModal(page)"
    />

    <!-- Modal which is displayed when editing or creating a page. -->
    <admin-config-routes-modal
        :visible="displayPageEditorModal"
        :header="modalHeaderText"
        :subheader="modalSubheaderText"
        :page-content="selectedPage"
        @close="displayPageEditorModal = false"
        @save="createNewPage"
        @contents-changed="updateNewPageQuillContent"
        @update-title="newPageTitle = $event"
    />
</div>

</template>

<style scoped>
.chip-with-buttons {
    margin-bottom: 3rem;
}
</style>
