import axios from 'axios';

import type { IJaidRoute } from '@models/';

/**
 * Creates a new route using the given IJaidRoute object.
 * @param   { IJaidRoute }   newData   The IJaidRoute object representing the new route.
 */
export async function createRoute (newData: IJaidRoute): Promise<{ id: string }> {
    const result = await axios.post('api/routes/create-route', { ...newData });
    return result.data;
}

/**
 * Gets all of the custom routes for the site.
 * @returns 
 */
export async function getAllRoutes (): Promise<IJaidRoute[]> {
    const result = await axios.get('api/routes/get-all-routes');
    return result.data;
}

/**
 * Gets a single custom route.
 * @param   { string }   id   The ID of the desired IJaidRoute object.
 */
export async function getRoute (id: string): Promise<IJaidRoute> {
    const result = await axios.get(`api/routes/get-route/${id}`);
    return result.data;
}

/**
 * Updates the given route with the data provided.
 * @param   { Partial<IJaidRoute> }   newData   An object containing IJaidRoute properties with which to
 *                                              update the database.
 */
export async function updateRoute (newData: Partial<IJaidRoute>): Promise<IJaidRoute> {
    if (!newData.id) throw new Error('Attempted to update a route without a valid ID.');
    const result = await axios.patch(`api/routes/update-route/${ newData.id?.toString() }`, newData);
    return result.data;
}

/**
 * Deletes the given custom route.
 * @param   { string }   id   The ID of the route to delete.
 */
export async function deleteRoute (id: string): Promise<void> {
    if (!id) throw new Error('Attempted to delete a route without a valid ID.');
    await axios.delete(`api/routes/delete-route/${id}`);
}
