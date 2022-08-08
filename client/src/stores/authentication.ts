import { defineStore } from 'pinia';

export const useAuthenticationStore = defineStore({

    id: 'authentication',

    state: () => ({
        userIsAuthenticated: false
    }),

    actions: {
        setUserIsAuthenticated (userIsAuthenticated: boolean): void {
            this.$patch({ userIsAuthenticated });
        }
    }
});
