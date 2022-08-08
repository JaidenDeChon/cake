
<template lang="pug">

.admin
    router-view(v-slot="{ Component }" class="admin-config")
        Transition(name="fade" mode="out-in")
            component(:is="Component")

</template>

<style lang="scss">

    .admin {
        padding: var(--global-padding);
    }

    .admin-config {

        .admin-config-title-area {
            margin-bottom: var(--global-padding);
            padding-bottom: var([--global-padding]);
        }

        .admin-config-live-component,
        .admin-config-form__label,
        .admin-config-form button,
        .admin-config-hr {
            margin-bottom: var(--global-padding);
        }

        .admin-config-form,
        .admin-config-form__label {
            display: flex;
            flex-direction: column;
        }

        .admin-config-live-component--double-margin {
            margin-bottom: calc(var(--global-padding) * 2);
        }
    }

</style>
