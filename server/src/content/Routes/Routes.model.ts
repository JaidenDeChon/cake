import * as mongoose from 'mongoose';

import { IJaidRoute } from '../../models/IJaidRoute';

/**
 * Mongoose Schema object represting a JaidRoute.
 */
export const JaidRouteSchema = new mongoose.Schema<IJaidRoute>({
    pageTitle: { type: String, required: true },
    pagePath: { type: String, required: true },
    content: { type: Object, required: true }
});

export const JaidRoute = mongoose.model<IJaidRoute>('JaidRoute', JaidRouteSchema);
