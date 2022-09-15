import { defineStore } from 'pinia';

import { createRoute, getAllRoutes, getRoute, updateRoute, deleteRoute } from '@/api/routesApi';
import type { IJaidRoute } from '@models/';

export const useRoutesStore = defineStore({

    id: 'route',

    state: () => ({
        routes: [] as IJaidRoute[]
    }),

    actions: {

        async createNewRoute (newRoute: IJaidRoute): Promise<void> {
            await createRoute(newRoute);
            await this.getAllRoutes();
        },

        async getAllRoutes (): Promise<void> {
            const routes = await getAllRoutes();
            this.$patch({ routes });
        },

        async getOneRoute (id: string): Promise<IJaidRoute> {
            const route = await getRoute(id);
            await this.getAllRoutes();
            return route;
        },

        async updateExistingRoute (newData: Partial<IJaidRoute>): Promise<IJaidRoute> {
            const route = await updateRoute(newData);
            await this.getAllRoutes();
            return route;
        },

        async deleteExistingRoute (id: string): Promise<void> {
            await deleteRoute(id);
            await getAllRoutes();
        }
    }
});
