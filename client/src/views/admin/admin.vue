
<template lang="pug">

.admin
    router-view(v-slot="{ Component }")
        Transition(name="fade" mode="out-in")
            component(:is="Component")

</template>
