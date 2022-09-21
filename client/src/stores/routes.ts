import { defineStore } from 'pinia';

import { createRoute, getAllRoutes, getRoute, updateRoute, deleteRoute } from '@/api/routesApi';
import type { IJaidRoute } from '@models/';
import CustomViewComponent from '@/views/custom-view.vue';
import type { Router } from 'vue-router';

export const useRoutesStore = defineStore({

    id: 'route',

    state: () => ({
        routes: [] as IJaidRoute[]
    }),

    actions: {

        async createNewRoute (newRoute: IJaidRoute): Promise<{ id: string }> {
            const result = await createRoute(newRoute);
            await this.getAllRoutes();
            return result;
        },

        async getAllRoutes (updateRouter?: Router): Promise<void> {
            const routes = await getAllRoutes();
            this.$patch({ routes });
            if (updateRouter) this.updateRouter(updateRouter);
        },

        async updateExistingRoute (newData: Partial<IJaidRoute>): Promise<IJaidRoute> {
            const route = await updateRoute(newData);
            await this.getAllRoutes();
            return route;
        },

        async deleteExistingRoute (id: string): Promise<void> {
            await deleteRoute(id);
            await getAllRoutes();
        },

        getOneRoute (id: string): IJaidRoute | undefined {
            const route = this.routes.find(route => route?.id === id);
            return route;
        },

        updateRouter (routerObject: Router): void {
            this.routes.forEach(route => routerObject.addRoute({
                path: route.pagePath,
                component: CustomViewComponent,
                meta: { route }
            }));
        }
    }
});
