import * as mongoose from 'mongoose';

import { IHero, JustifyOptions } from '../../models';

export const HeroSchema = new mongoose.Schema<IHero>(
    {
        primaryText: { type: String, required: false },
        secondaryText: { type: String, required: false },
        primaryCallToAction: { type: String, required: false },
        secondaryCallToAction: { type: String, required: false },
        img: { type: String, required: false },
        justify: {
            type: String,
            enum: [
                JustifyOptions.LEFT,
                JustifyOptions.CENTER,
                JustifyOptions.RIGHT
            ],
            required: false
        }
    }
);
