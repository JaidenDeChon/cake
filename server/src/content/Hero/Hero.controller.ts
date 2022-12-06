import { Controller, Get, Post, Body } from '@nestjs/common';

import { IHero, JustifyOptions } from '../../models';
import { ControllerNames } from 'src/constants';
import { HeroService } from './Hero.service';

/**
 * Controller for Hero.
 */
@Controller(ControllerNames.HERO.toString())
export class HeroController {

    /**
     * Constructor.
     * @param   { HeroService }   _heroService   The Hero service to use for interacting with the database.
     */
    constructor (private readonly _heroService: HeroService) {}

    /**
     * Returns the hero.
     */
    @Get('get-hero')
    async getHero (): Promise<IHero> {
        const hero = await this._heroService.getHero();
        return hero;
    }

    /**
      * Creates or updates the hero. Only one hero configuration can exist at a time.
      * @param   { string }           id                      The `id` property of the Hero object to update.
      * @param   { string }           primaryText             The `primaryText` property of the Hero object to update.
      * @param   { string }           secondaryText           The `secondaryText` property of the Hero object to update.
      * @param   { string }           primaryCallToAction     The `primaryCallToAction` property of the Hero object to update.
      * @param   { string }           secondaryCallToAction   The `secondaryCallToAction` property of the Hero object to update.
      * @param   { JustifyOptions }   justify                 The `justify` property of the Hero object to update.
      * @param   { string }           img                     The `img` property of the Hero object to update.
      */
    @Post('change-hero')
    async changeHero (
        @Body('id') id: string,
        @Body('primaryText') primaryText: string,
        @Body('secondaryText') secondaryText: string,
        @Body('primaryCallToAction') primaryCallToAction: string,
        @Body('secondaryCallToAction') secondaryCallToAction: string,
        @Body('justify') justify: JustifyOptions,
        @Body('img') img: string,
    ): Promise<void> {
        await this._heroService.changeHero(
            id,
            primaryText,
            secondaryText,
            primaryCallToAction,
            secondaryCallToAction,
            justify,
            img
        );
    }
}
