import * as mongoose from 'mongoose';

import { IHostedImage } from '../../models';

export const HostedImageSchema = new mongoose.Schema<IHostedImage>(
    {
        awsKey: { type: String, required: true },
        url: { type: String, required: true },
        fileName: { type: String, required: true },
        fileType: { type: String, required: true },
        fileSize: { type: Number, required: true }
    }
);
