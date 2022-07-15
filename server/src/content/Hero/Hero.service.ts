import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IHero, JustifyOptions } from '../../models';
import { JaidModuleNames } from '../../constants';

/**
 * Injects server dependency HeroService.
 */
@Injectable()
export class HeroService {

    /**
     * Constructor.
     * @param   { Model<IHero> }   heroModel   The shape of a Hero throughout the app.
     */
    constructor(
        // Injects the Hero Mongoose model for use in this service.
        @InjectModel(JaidModuleNames.HERO)
        private readonly heroModel: Model<IHero>
    ) {}

    /**
     * Gets the hero.
     */
    async getHero (): Promise<IHero> {
        const hero = await this.heroModel.findOne().exec();
        if (!hero) throw new NotFoundException('Could not find hero.');
        return hero;
     }

     /**
      * Creates or updates the hero. Only one hero configuration can exist at a time.
      * @param   { string }           _id                     The `id` property of the Hero object to update.
      * @param   { string }           primaryText             The `primaryText` property of the Hero object to update.
      * @param   { string }           secondaryText           The `secondaryText` property of the Hero object to update.
      * @param   { string }           primaryCallToAction     The `primaryCallToAction` property of the Hero object to update.
      * @param   { string }           secondaryCallToAction   The `secondaryCallToAction` property of the Hero object to update.
      * @param   { JustifyOptions }   justify                 The `justify` property of the Hero object to update.
      * @param   { string }           img                     The `img` property of the Hero object to update.
      */
     async changeHero (
        _id?: string,
        primaryText?: string,
        secondaryText?: string,
        primaryCallToAction?: string,
        secondaryCallToAction?: string,
        justify?: JustifyOptions,
        img?: string
    ): Promise<void> {

        // Remove all heros.
        await this.heroModel.deleteMany();

        // Create new hero.
        await new this.heroModel({
            primaryText,
            secondaryText,
            primaryCallToAction,
            secondaryCallToAction,
            justify,
            img
        }).save();
    }
}
