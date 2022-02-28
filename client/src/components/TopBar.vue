<template>

        <header class="header">

            <!-- Left section; contains menu button -->
            <div class="header__section header__section--left">
                <button class="header__button" @click="toggleMenu">
                    <i class="fas fa-bars" />
                </button>
            </div>

            <!-- Center section; contains clickable logo -->
            <div class="header__section header__section--center">
                <router-link :to="{ name: 'Home' }" @click="closeSidebars">
                    <h1 class="header__primary-text">Sweet Peach Cakery</h1>
                </router-link>
                <p class="header__secondary-text">by Desirae Sechrest</p>
            </div>

            <!-- Right section; contains cart button -->
            <div class="header__section header__section--right">
                <button class="header__button" @click="toggleCart">
                    <i class="fas fa-shopping-cart" />
                    <span v-if="cartItemCount" class="button-badge">{{ cartItemCount }}</span>
                </button>
            </div>

            <!-- Navigation menu -->
            <transition name="slide-from-left">

                <nav class="sidebar sidebar--from-left" v-if="menuIsOpen">

                    <!-- Close button -->
                    <button @click="toggleMenu" class="sidebar__option sidebar__option--close">
                        Close menu
                        <i class="fas fa-times" />
                    </button>

                    <!-- Home link -->
                    <router-link
                        :to="{ name: 'Home' }"
                        class="sidebar__option sidebar__option--disabled"
                    >
                        Home
                    </router-link>

                    <!-- A dropdown button for each product category -->
                    <div class="sidebar__option" v-for="category in productCategories" :key="category.name">

                        <button class="sidebar__option">
                        {{ category.name }}
                        <i class="fas fa-caret-down" />
                        </button>

                        <!-- Ivisible at first; contains dropdown options (droptions) -->
                        <div class="sidebar__dropdown-container" >

                        <!-- Link to the category's page -->
                        <router-link 
                            :to="{ name: 'category', params: { categoryName: category.name } }"
                            class="sidebar__option"
                        >
                            All {{ category.name }}
                        </router-link>

                        <!-- A link for each item in the category -->
                        <router-link 
                            :to="{ name: 'item', params: { categoryName: category.name, itemTitle: item.title } }" 
                            v-for="item in category.items" 
                            :key="item.title"
                            class="sidebar__option"
                        >
                            {{ item.title }}
                        </router-link>

                    </div>
                    </div>

                    <!-- Contact-us link -->
                    <router-link
                        :to="{ name: 'Contact Us' }"
                        class="sidebar__option"
                    >
                        Contact Us
                    </router-link>

                    <!-- About-us link -->
                    <router-link
                        :to="{ name: 'About' }"
                        class="sidebar__option sidebar__option--disabled"
                    >
                        About
                    </router-link>
                </nav>
            </transition>

            <!-- Cart -->
            <transition name="slide-from-right">

                <div class="sidebar sidebar--from-right" v-if="cartIsOpen">

                    <!-- Close button -->
                    <button @click="toggleCart" class="sidebar__option sidebar__option--close">
                        Close cart
                        <i class="fas fa-times" />
                    </button>

                    <!-- Sticky to bottom of div -->
                    <div class="sidebar__bottom">

                        <!-- Cart Total -->
                        <div class="sidebar__option sidebar__option--no-pointer sidebar__option--alt-background">
                            <p>Cart Total: ${{ cartTotalPrice }}</p>
                        </div>

                        <!-- Checkout link -->
                        <router-link :to="'/'" class="sidebar__option sidebar__option--action">
                            Checkout
                            <i class="fas fa-arrow-right" />
                        </router-link>

                    </div>

                </div>
            </transition>

            <!-- Dark overlay for when menus are opened -->
            <div v-if="menuIsOpen || cartIsOpen" @click="closeSidebars" class="overlay" />

        </header>

</template>

<script lang="ts">

import { Watch } from 'vue-property-decorator';
import { Vue } from 'vue-class-component';
import { useRoute } from 'vue-router';

export default class TopBar extends Vue {

    menuIsOpen = false;
    cartIsOpen = false;

    mounted (): void {
        useRoute();
    }

    toggleMenu (): void {
        this.menuIsOpen = !this.menuIsOpen;
    }

    toggleCart (): void {
        this.cartIsOpen = !this.cartIsOpen;
    }

    closeSidebars (): void {
        this.menuIsOpen = false;
        this.cartIsOpen = false;
    }

    get currentRoute (): string {
        return this.$route.fullPath;
    }

    get productCategories (): Array<unknown> {
        // TODO - Return the product categories stored in state and update signature return type
        return [];
    }

    get cartItemCount (): number {
        // TODO - Return the amount of numbers in the cart
        return 0;
    }

    get cartTotalPrice (): number {
        // TODO - Return the sum of all of the items in the cart (cart shit should be in localStorage)
        return 0.00;
    }

    @Watch('currentRoute')
    onPropertyChanged (): void {
        this.closeSidebars();
    }
}

</script>

<style lang="scss" scoped>

    .header {
        --global-padding: 1rem;

        font-family: 'Poppins', sans-serif;

        padding: 0 var(--global-padding);

        display: flex;
        align-items: center;
        justify-content: space-between;

        height: 6rem;

        background-color: rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(6px);
    }

    .header__section {
        margin-left: auto;
        margin-right: auto;

        &--left {
            margin-left: 0;
        }

        &--right {
            margin-right: 0;
        }
    }

    a {
        text-decoration: none;
        color: salmon;
    }

    .header__primary-text {
        font-size: 1.6rem;
        font-family: 'Dancing Script', cursive;
        letter-spacing: .06rem;
    }

    .header__secondary-text {
        margin-top: 0.4rem;
        font-size: 0.8rem;
        color: #555;
    }

    h1, p {
        margin: 0;
    }

    .header__section--center {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .header__button {

        height: 3.125rem;
        width: 3.125rem;

        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: transparent;
        border: none;
        outline: none;
        border-radius: 0.3125rem;
        cursor: pointer;

        transition: background-color 0.1s ease-in-out;

        i {
            color: #555;
            font-size: 1rem;
        }

        &:hover {
            background-color: white;
        }
    }

    .button-badge {
        --dimensions: 1rem;

        font-size: 0.6rem;

        position: absolute;
        top: 0;
        right: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        width: var(--dimensions);
        height: var(--dimensions);

        border-radius: calc(var(--dimensions) / 2);
        background-color: white;
    }

    .sidebar {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        display: flex;
        flex-direction: column;

        width: 100vw;
        height: 100vh;

        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 0 10px rgba(0, 0, 0, 0.22);
        background-color: white;
    }

    .sidebar__bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;

        width: 100%;

        box-shadow: 0 -10px 30px rgb(0 0 0 / 10%), 0 6px 6px rgb(0 0 0 / 23%)
    }

    .sidebar__option {

        color: #555;
        font-size: 1.4rem;

        height: 6rem;

        padding: 0 var(--global-padding);

        display: flex;
        align-items: center;
        justify-content: flex-start;

        cursor: pointer;
        background: transparent;
        outline: none;
        border: none;
        transition: background-color 0.1s ease-in-out, color 0.1s ease-in-out;

        &--action {
            color: green;
            background-color: #99e8aa;
        }

        &--close:focus,
        &--close:hover {
            color: white;
            background-color: #e89999
        }

        &--disabled {
            opacity: 0.5;
            pointer-events: none;
        }

        &--no-pointer,
        &--disabled {
            cursor: initial;
        }
    }

    .sidebar--alt-background,
    .sidebar__option--alt-background {
        background-color: #f2f2f2;
    }

    .sidebar__option i {
        margin-left: auto;
    }

    .slide-from-left-enter-active,
    .slide-from-left-leave-active,
    .slide-from-right-enter-active,
    .slide-from-right-leave-active {
        transition: transform 0.2s ease-in-out;
    }

    .slide-from-left-enter-from,
    .slide-from-left-leave-to,
    .slide-from-right-enter-from,
    .slide-from-right-leave-to {
        transition: all 0.2s ease-in-out;
    }

    .slide-from-left-enter-from,
    .slide-from-left-leave-to {
        transform: translateX(-100%);
    }

    .slide-from-right-enter-from,
    .slide-from-right-leave-to {
        transform: translateX(100%);
    }

    @media (min-width: 400px) {

        .sidebar {
            min-width: 400px;
            max-width: 420px;

            top: 0;
            bottom: 0;
            left: auto;
            right: auto;

            &--from-left {
                left: 0;
            }

            &--from-right {
                right: 0;
            }
        }

        .sidebar__option--close,
        .sidebar__option--action {
            color: #555;
            background-color: transparent;
        }

        .sidebar__option--close:hover {
            color: white;
            background-color: #e89999
        }

        .sidebar__option--action:hover {
            background-color: #99e8aa;
            color: green;
        }
    }

</style>
