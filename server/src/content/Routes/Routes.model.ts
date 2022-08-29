import * as mongoose from 'mongoose';
import { RouteRecordRaw } from 'vue-router';

import { IJaidRoute } from '../../models/IRoute';

/**
 * Mongoose Schema object representing a VueRouter route object.
 */
export const VueRouteSchema = new mongoose.Schema<RouteRecordRaw>({
    alias: { required: false },
    beforeEnter: { required: false },
    children: { required: false },
    component: { required: false },
    components: { required: false },
    end: { required: false },
    meta: { required: false },
    name: { required: false },
    path: { required: false },
    props: { required: false },
    redirect: { required: false },
    sensitive: { required: false },
    strict: { required: false }
});

/**
 * Mongoose Schema object represting a JaidRoute.
 */
export const JaidRouteSchema = new mongoose.Schema<IJaidRoute>({
    pageTitle: { type: String, required: true },
    content: { type: Object, required: true },
    vueRouterObject: { type: VueRouteSchema, required: true }
});

export const JaidRoute = mongoose.model<IJaidRoute>('JaidRoute', JaidRouteSchema);
