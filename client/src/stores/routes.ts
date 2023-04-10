import { defineStore } from 'pinia';

import { createRoute, getAllRoutes, updateRoute, deleteRoute } from '@/api/routesApi';
import type { IJaidRoute } from '@models/';
import CustomViewComponent from '@/views/custom-view.vue';
import type { Router } from 'vue-router';

export const useRoutesStore = defineStore({

    id: 'route',

    state: () => ({
        // The list of custom routes stored in the database.
        routes: [] as IJaidRoute[]
    }),

    actions: {

        /**
         * Creates a new route via the API and then refreshes the stored list of routes.
         * @param   { IJaidRoute }   newRoute       The IJaidRoute object representing the new route.
         * @param   { Router }       updateRouter   (Optional) Pass the app's Vue Router object to
         *                                          apply these changes to the app routes.
         */
        async createNewRoute (newRoute: IJaidRoute, updateRouter?: Router): Promise<{ id: string }> {
            const result = await createRoute(newRoute);
            await this.getAllRoutes(updateRouter);
            return result;
        },

        /**
         * Gets all of the custom routes stored in the database and then refreshes the stored list of routes.
         * @param   { Router }   updateRouter   (Optional) Pass the app's Vue Router object to
         *                                       apply these changes to the app routes.
         */
        async getAllRoutes (updateRouter?: Router): Promise<void> {
            const routes = await getAllRoutes();
            this.$patch({ routes });
            if (updateRouter) this.updateRouter(updateRouter);
        },

        /**
         * Updates the given route with the new data provided and then refreshes the stored list of routes.
         * @param   { Partial<IJaidRoute> }   newData        An object containing IJaidRoute properties with
         *                                                   which to update the database.
         * @param   { Router }                updateRouter   (Optional) Pass the app's Vue Router object to
         *                                                   apply these changes to the app routes.
         */
        async updateExistingRoute (newData: Partial<IJaidRoute>, updateRouter?: Router): Promise<IJaidRoute> {
            const route = await updateRoute(newData);
            await this.getAllRoutes(updateRouter);
            return route;
        },

        /**
         * Deletes the given route and then refreshes
         * @param   { string }   id             The ID of the route to delete.
         * @param   { Router }   updateRouter   (Optional) Pass the app's Vue Router object to
         *                                      apply these changes to the app routes.
         */
        async deleteExistingRoute (id: string, updateRouter?: Router): Promise<void> {
            await deleteRoute(id);
            await this.getAllRoutes(updateRouter);
        },

        /**
         * Gets a single route using the given ID.
         * @param   { string }   id   The ID of the custom route to get.
         */
        getOneRoute (id: string): IJaidRoute | undefined {
            const route = this.routes.find(route => route?.id === id);
            return route;
        },

        /**
         * Uses the app's existing Vue Router object to update the app's routes with those stored here in the
         * routes store.
         * @param   { Router }   routerObject   (Optional) Pass the app's Vue Router object to
         *                                      apply these changes to the app routes.
         */
        updateRouter (routerObject: Router): void {
            const routerRoutes = routerObject.getRoutes();
            const storeRoutes = this.routes;

            storeRoutes.forEach(sr => {
                const foundName = routerRoutes.find(rr => rr.name === sr.pageTitle)?.name;
                if (foundName) routerObject.removeRoute(foundName);
            });

            this.routes.forEach(route => routerObject.addRoute({
                name: route.pageTitle,
                path: route.pagePath,
                component: CustomViewComponent,
                meta: { route }
            }));
        }
    }
});
