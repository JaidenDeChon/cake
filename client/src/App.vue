<template>
    <router-view/>
</template>

<style lang="scss">

    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');

    body {

        padding: 0;
        margin: 0;

        background: rgb(234,228,233);
        background: linear-gradient(
            -45deg,
            rgba(234,228,233,1) 0%,
            rgba(234,228,233,1) 12%,
            rgba(255,241,230,1) 12%,
            rgba(255,241,230,1) 24%,
            rgba(253,226,228,1) 24%,
            rgba(253,226,228,1) 36%,
            rgba(250,210,225,1) 36%,
            rgba(250,210,225,1) 48%,
            rgba(226,236,233,1) 48%,
            rgba(226,236,233,1) 60%,
            rgba(190,225,230,1) 60%,
            rgba(190,225,230,1) 72%,
            rgba(240,239,235,1) 72%,
            rgba(240,239,235,1) 84%,
            rgba(223,231,253,1) 84%,
            rgba(223,231,253,1) 100%,
            rgba(205,218,253,1) 100%);
    }

    #app {
        height: 100vh;
        box-sizing: border-box;
    }

</style>
