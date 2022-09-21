/**
 * An object representing a route.
 * Implements the RouteRecordRaw interface so that whole Vue Router
 * route object can be stored and reproduced dynamically. 
 */
export interface IJaidRoute {

    // Database ID for this route.
    id?: string;

    // The path that will lead to this route.
    pagePath: string;

    // The title that will show up in the tab for this route.
    pageTitle: string;

    // The content of this page represented in a QuillJS Delta object.
    content?: object;
}
