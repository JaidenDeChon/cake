import { RouteRecordRaw } from 'vue-router';

/**
 * An object representing a route.
 * Implements the RouteRecordRaw interface so that whole Vue Router
 * route object can be stored and reproduced dynamically. 
 */
export interface IJaidRoute {

    // Database ID for this route.
    id?: string;

    // The title that will show up in the tab for this route.
    pageTitle: string;

    // The content of this page represented in a QuillJS Delta object.
    content: object;

    // The Vue Router route object association with this JaID route.
    vueRouterObject: RouteRecordRaw;
}
