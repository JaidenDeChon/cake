
<template lang="pug">

.admin
    router-view(v-slot="{ Component }")
        Transition(name="fade" mode="out-in")
            component(:is="Component")

</template>

<style lang="scss">

    .admin {
        padding: var(--global-padding);
    }

    .config-title-area {
        margin-bottom: var(--global-padding);
    }

</style>
