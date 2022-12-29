import * as mongoose from 'mongoose';

import { IReset } from 'src/models';

export const ResetSchema = new mongoose.Schema<IReset>({
    email: { type: String, required: true },
    token: { type: String, required: true }
});
