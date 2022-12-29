import * as mongoose from 'mongoose';

import { IToken } from 'src/models';

export const TokenSchema = new mongoose.Schema<IToken>({
    userId: { type: String, required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true },
    expiredAt: { type: Date, required: true }
});
