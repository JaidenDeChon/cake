import axios from 'axios';

import type { IJaidRoute } from '@models/';

export async function createRoute (newData: IJaidRoute): Promise<IJaidRoute> {
    const result = await axios.post('api/routes/create-route', { ...newData });
    return result.data;
}

export async function getAllRoutes (): Promise<IJaidRoute[]> {
    const result = await axios.get('api/routes/get-all-routes');
    return result.data;
}

export async function getRoute (id: string): Promise<IJaidRoute> {
    const result = await axios.get(`api/routes/get-route/${id}`);
    return result.data;
}

export async function updateRoute (newData: Partial<IJaidRoute>): Promise<IJaidRoute> {
    if (!newData.id) throw new Error('Attempted to update a route without a valid ID.');
    const result = await axios.patch(`api/routes/update-route/${ newData.id?.toString() }`, newData);
    return result.data;
}

export async function deleteRoute (id: string): Promise<void> {
    if (!id) throw new Error('Attempted to delete a route without a valid ID.');
    await axios.delete(`api/routes/delete-route/${id}`);
}
