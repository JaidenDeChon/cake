<script setup lang="ts">

    import { kebabCase } from 'lodash';
    import { ref, watchEffect } from 'vue';
    import { useRouter } from 'vue-router';
    import { computed } from '@vue/reactivity';

    import type { IJaidRoute } from '@models/';
    import { useRoutesStore } from '@/stores/routes';
    import chipWithButtons from '@/components/chip-with-buttons.vue';
    import adminConfigRoutesModal from './admin-config-routes-modal.vue';

    // Vue Router and custom routes store.
    // (Routes are added/removed dynamically with Pinia keeping track.)
    const $router = useRouter();
    const routesStore = useRoutesStore();
    const routesStoreRoutes = computed(() => routesStore.routes);

    // Page object and watcher. Watcher updates route when title changes.
    const pageObject = ref({} as IJaidRoute);
    watchEffect(() => pageObject.value.pagePath = `/${kebabCase(pageObject.value.pageTitle)}`);

    // Trackers for whether anything is being worked on API-wise.
    const awaitingCreate = ref(false);
    const awaitingSave = ref(false);
    const awaitingDelete = ref(false);
    const awaitingAnything = computed(() => awaitingCreate.value || awaitingSave.value || awaitingDelete.value);

    // Reactive "create" button text.
    const createRouteButtonText = computed(() =>
        awaitingCreate.value
            ? 'Creating new page...'
            : 'Create new page'
    );

    /** Resets every value of the pageObject variable ref. */
    function resetPageObject (): void {
        pageObject.value._id = undefined;
        pageObject.value.content = undefined;
        pageObject.value.pagePath = '';
        pageObject.value.pageTitle = '';
    }

    /**
     * Updates the page object with the user's inputs.
     * @param   { object }   newContent   The new content for the page object.
     */
    function updateQuillContent (newContent: object): void {
        pageObject.value.content = newContent;
    }

    /**
     * Deletes the route with the given ID.
     * @param   { string }   id   The ID of the route to be deleted.
     */
    async function deleteRoute (id: string): Promise<void> {
        await routesStore.deleteExistingRoute(id, $router);
    }

    /** Handles what happens when the user clicks the save button. */
    async function saveButtonClicked (): Promise<void> {
        if (pageObject.value?._id) await modifyPage();
        else await createNewPage();
    }

    /** Creates a new page/route using the data entered. */
    async function createNewPage (): Promise<void> {
        awaitingCreate.value = true;
        try {
            const { id } = await routesStore.createNewRoute(pageObject.value, $router);
            if (id) {
                alert("New page created.");
                pageObject.value.pageTitle = '';
                pageObject.value.content = undefined;
            }
            closeModal();
        } catch {
            // TODO - Toast system
        } finally {
            awaitingCreate.value = false;
        }
    }

    /** Modifies a page/route using the data entered. */
    async function modifyPage (): Promise<void> {
        awaitingSave.value = true;
        try {
            const updatedRoute = await routesStore.updateExistingRoute(pageObject.value, $router);
            if (updatedRoute) closeModal();
        } catch {
            // TODO - Toast system
        } finally {
            awaitingSave.value = false;
        }
    }

    // Controls whether the page editor modal is currently visible.
    const displayPageEditorModal = ref(false);

    /**
     * Shows the modal. Optional param for providing modal contents.
     * @param   { object }   jaidRoute   (Optional) Allows for passing content to the modal.
     */
    function showModal (jaidRoute?: IJaidRoute): void {
        if (jaidRoute) pageObject.value = jaidRoute;
        displayPageEditorModal.value = true;
    }

    /** Closes the modal. */
    function closeModal (): void {
        displayPageEditorModal.value = false;
        resetPageObject();
    }

    // Determines what the modal header text should say.
    const modalHeaderText = computed(() => {
        if (pageObject.value._id) return 'Edit page contents';
        else return 'Create new page';
    });

    // Determines what the modal subheader text should say.
    const modalSubheaderText = computed(() => {
        if (pageObject.value._id) return 'Use the controls below to modify your page contents.';
        else return 'Use the controls below to create your page.';
    });

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
        v-for="page in routesStoreRoutes"
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
        :jaid-route="pageObject"
        @close="displayPageEditorModal = false"
        @save="saveButtonClicked"
        @contents-changed="updateQuillContent"
        @update-title="$event => pageObject.pageTitle = $event"
    />
</div>

</template>

<style scoped>
.chip-with-buttons {
    margin-bottom: 3rem;
}
</style>
